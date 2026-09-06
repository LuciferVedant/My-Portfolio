import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

export interface ContactLog {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  submittedAt: string;
  ipAddress?: string;
  emailNotificationSent: boolean;
  webhookPushSent: boolean;
  isSpamThrottled?: boolean;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;
  private readonly dbFilePath = path.join(process.cwd(), 'data', 'contacts-db.json');

  // Cooldown map to prevent duplicate emails from the same IP or Email (5 minutes cooldown)
  private readonly cooldownMap = new Map<string, number>();
  private readonly COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

  // Save base64 file to MongoDB GridFS Bucket
  async saveFileToGridFS(filename: string, base64Content: string): Promise<string | null> {
    if (!this.contactModel || !this.contactModel.db) return null;
    try {
      const db = this.contactModel.db.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });
      const cleanBase64 = base64Content.includes('base64,')
        ? base64Content.split('base64,')[1]
        : base64Content;
      const buffer = Buffer.from(cleanBase64, 'base64');

      return new Promise((resolve) => {
        const uploadStream = bucket.openUploadStream(filename);
        uploadStream.on('finish', () => {
          this.logger.log(`GridFS file saved: ${filename} (ID: ${uploadStream.id.toString()})`);
          resolve(uploadStream.id.toString());
        });
        uploadStream.on('error', (err) => {
          this.logger.error(`Failed uploading file ${filename} to GridFS:`, err);
          resolve(null);
        });
        uploadStream.end(buffer);
      });
    } catch (err) {
      this.logger.error('GridFS Bucket upload error:', err);
      return null;
    }
  }

  // Get GridFS download stream for file ID
  getAttachmentStream(fileId: string) {
    if (!this.contactModel || !this.contactModel.db) return null;
    try {
      const db = this.contactModel.db.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'fs' });
      const objectId = new mongoose.Types.ObjectId(fileId);
      return bucket.openDownloadStream(objectId);
    } catch (err) {
      this.logger.error(`Failed creating GridFS download stream for file ${fileId}:`, err);
      return null;
    }
  }

  constructor(
    @Optional()
    @InjectModel(Contact.name)
    private readonly contactModel?: Model<ContactDocument>,
  ) {
    // Ensure data directory exists for local DB storage fallback
    const dataDir = path.dirname(this.dbFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.dbFilePath)) {
      fs.writeFileSync(this.dbFilePath, JSON.stringify([], null, 2), 'utf-8');
    }

    // Configure transporter using SMTP env vars
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log('Nodemailer SMTP transporter initialized');
    } else {
      this.logger.warn(
        'No SMTP credentials configured. Contact submissions will be logged to local Database & Webhook dispatched.',
      );
    }
  }

  // Get all contact submission logs stored in database
  async getContactLogs(): Promise<ContactLog[]> {
    if (this.contactModel) {
      try {
        const mongoLogs = await this.contactModel.find().sort({ createdAt: -1 }).exec();
        if (mongoLogs && mongoLogs.length > 0) {
          return mongoLogs.map((item) => ({
            id: (item as any)._id.toString(),
            name: item.name,
            email: item.email,
            subject: item.subject,
            message: item.message,
            company: item.company,
            submittedAt: item.submittedAt ? item.submittedAt.toISOString() : new Date().toISOString(),
            ipAddress: item.ipAddress,
            emailNotificationSent: item.emailNotificationSent,
            webhookPushSent: item.webhookPushSent,
            isSpamThrottled: item.isSpamThrottled,
          }));
        }
      } catch (err) {
        this.logger.warn('Failed to query MongoDB contact collection, using local file DB:', err);
      }
    }

    try {
      if (fs.existsSync(this.dbFilePath)) {
        const fileData = fs.readFileSync(this.dbFilePath, 'utf-8');
        return JSON.parse(fileData) as ContactLog[];
      }
    } catch (err) {
      this.logger.error('Failed to read contact logs DB file:', err);
    }
    return [];
  }

  async handleContactSubmission(dto: CreateContactDto, clientIp?: string) {
    const timestamp = new Date().toISOString();
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const emailKey = dto.email.toLowerCase().trim();
    const ipKey = clientIp || '127.0.0.1';
    const now = Date.now();

    // Check if sender email or IP is in cooldown (submitted in last 5 minutes)
    const lastEmailTime = this.cooldownMap.get(`email:${emailKey}`) || 0;
    const lastIpTime = this.cooldownMap.get(`ip:${ipKey}`) || 0;

    const isEmailInCooldown = now - lastEmailTime < this.COOLDOWN_MS;
    const isIpInCooldown = now - lastIpTime < this.COOLDOWN_MS;

    let emailSent = false;
    let webhookSent = false;
    const isSpamThrottled = isEmailInCooldown || isIpInCooldown;

    if (isSpamThrottled) {
      this.logger.warn(
        `[SPAM GUARD] Rapid submission detected from email: ${dto.email} (IP: ${clientIp}). Notifications suppressed for 5 min cooldown.`,
      );
    } else {
      // Record new submission timestamp for cooldown guard
      this.cooldownMap.set(`email:${emailKey}`, now);
      this.cooldownMap.set(`ip:${ipKey}`, now);

      // 1. Send Email Notification (Resend API or Nodemailer SMTP)
      const resendApiKey = process.env.RESEND_API_KEY;
      const formattedAttachments = dto.attachments?.map((att) => {
        const cleanBase64 = att.content.includes('base64,')
          ? att.content.split('base64,')[1]
          : att.content;
        return {
          filename: att.filename,
          content: cleanBase64,
        };
      });

      if (resendApiKey) {
        try {
          const targetEmail = process.env.NOTIFICATION_EMAIL || 'vedrocks2000@gmail.com';
          const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: `Vedant Portfolio <${fromEmail}>`,
              to: [targetEmail],
              reply_to: dto.email,
              subject: `⚡ Portfolio Contact: ${dto.subject} (from ${dto.name})`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #333; background: #0b0f19; color: #fff; border-radius: 10px;">
                  <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Portfolio Contact</h2>
                  <p><strong>Name:</strong> ${dto.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${dto.email}" style="color: #38bdf8;">${dto.email}</a></p>
                  ${dto.company ? `<p><strong>Company:</strong> ${dto.company}</p>` : ''}
                  <p><strong>Subject:</strong> ${dto.subject}</p>
                  <div style="background: #1e293b; padding: 15px; border-radius: 6px; margin-top: 15px;">
                    <p style="margin: 0; white-space: pre-wrap;">${dto.message}</p>
                  </div>
                  ${
                    dto.attachments && dto.attachments.length > 0
                      ? `<p><strong>Attached Files (${dto.attachments.length}):</strong> ${dto.attachments.map((a) => a.filename).join(', ')}</p>`
                      : ''
                  }
                  <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">Sent at ${timestamp} • Client IP: ${clientIp || '127.0.0.1'}</p>
                </div>
              `,
              attachments: formattedAttachments && formattedAttachments.length > 0 ? formattedAttachments : undefined,
            }),
          });

          if (res.ok) {
            emailSent = true;
            this.logger.log(`Resend API email notification sent to ${targetEmail} (Attachments: ${dto.attachments?.length || 0})`);
          } else {
            const errData = await res.json();
            this.logger.error('Resend API call failed:', errData);
          }
        } catch (err) {
          this.logger.error('Failed to send email via Resend API:', err);
        }
      } else if (this.transporter) {
        try {
          const targetEmail = process.env.NOTIFICATION_EMAIL || 'vedrocks2000@gmail.com';
          await this.transporter.sendMail({
            from: `"Vedant Portfolio" <${dto.email}>`,
            to: targetEmail,
            subject: `⚡ Portfolio Contact: ${dto.subject} (from ${dto.name})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #333; background: #0b0f19; color: #fff; border-radius: 10px;">
                <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Portfolio Contact</h2>
                <p><strong>Name:</strong> ${dto.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${dto.email}" style="color: #38bdf8;">${dto.email}</a></p>
                ${dto.company ? `<p><strong>Company:</strong> ${dto.company}</p>` : ''}
                <p><strong>Subject:</strong> ${dto.subject}</p>
                <div style="background: #1e293b; padding: 15px; border-radius: 6px; margin-top: 15px;">
                  <p style="margin: 0; white-space: pre-wrap;">${dto.message}</p>
                </div>
                <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">Sent at ${timestamp} • Client IP: ${clientIp || '127.0.0.1'}</p>
              </div>
            `,
          });
          emailSent = true;
          this.logger.log(`Email notification sent to ${targetEmail}`);
        } catch (err) {
          this.logger.error('Failed to send email notification:', err);
        }
      }

      // 2. Dispatch Webhook push alert
      const webhookUrl = dto.webhookUrl || process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'Portfolio Alert Bot',
              embeds: [
                {
                  title: `📩 New Contact Submission: ${dto.subject}`,
                  color: 0x6366f1,
                  fields: [
                    { name: 'Name', value: dto.name, inline: true },
                    { name: 'Email', value: dto.email, inline: true },
                    { name: 'Company', value: dto.company || 'N/A', inline: true },
                    { name: 'Message', value: dto.message },
                    { name: 'Attachments', value: dto.attachments?.map((a) => a.filename).join(', ') || 'None' },
                  ],
                  footer: { text: `ID: ${contactId} • ${timestamp}` },
                },
              ],
            }),
          });
          webhookSent = true;
          this.logger.log('Discord webhook push alert dispatched');
        } catch (err) {
          this.logger.error('Failed to dispatch webhook notification:', err);
        }
      }
    }

    // Process attachments for MongoDB GridFS
    const savedAttachmentMeta: Array<{ filename: string; contentType?: string; sizeBytes?: number; gridFsId?: string; downloadUrl?: string }> = [];
    if (dto.attachments && dto.attachments.length > 0) {
      for (const att of dto.attachments) {
        const gridFsId = await this.saveFileToGridFS(att.filename, att.content);
        savedAttachmentMeta.push({
          filename: att.filename,
          contentType: att.contentType,
          sizeBytes: att.sizeBytes,
          gridFsId: gridFsId || undefined,
          downloadUrl: gridFsId ? `http://localhost:5001/api/contact/attachment/${gridFsId}` : undefined,
        });
      }
    }

    // 3. Persist Record to MongoDB using Mongoose ODM
    let savedToMongo = false;
    if (this.contactModel) {
      try {
        const mongoRecord = new this.contactModel({
          name: dto.name,
          email: dto.email,
          subject: dto.subject,
          message: dto.message,
          company: dto.company,
          ipAddress: clientIp || '127.0.0.1',
          emailNotificationSent: emailSent,
          webhookPushSent: webhookSent,
          isSpamThrottled,
          attachments: savedAttachmentMeta,
          submittedAt: new Date(),
        });
        await mongoRecord.save();
        savedToMongo = true;
        this.logger.log(`Contact record persisted to MongoDB collection [contacts] with ${savedAttachmentMeta.length} attachment records.`);
      } catch (err) {
        this.logger.warn('Failed to persist contact record to MongoDB, using local file DB fallback:', err);
      }
    }

    // 4. Save Record to Local File DB Fallback ONLY if MongoDB is offline or save failed
    if (!savedToMongo) {
      const newRecord: ContactLog = {
        id: contactId,
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
        company: dto.company,
        submittedAt: timestamp,
        ipAddress: clientIp || '127.0.0.1',
        emailNotificationSent: emailSent,
        webhookPushSent: webhookSent,
        isSpamThrottled,
      };

      try {
        const existingLogs = await this.getContactLogs();
        existingLogs.unshift(newRecord);
        fs.writeFileSync(this.dbFilePath, JSON.stringify(existingLogs, null, 2), 'utf-8');
        this.logger.log(`Contact record [${contactId}] persisted to local JSON fallback database.`);
      } catch (err) {
        this.logger.error('Failed to save record to fallback file database:', err);
      }
    }

    return {
      success: true,
      message: isSpamThrottled
        ? 'Thank you! Your message has been received and saved.'
        : 'Thank you! Your message has been sent successfully.',
      details: {
        id: contactId,
        submittedAt: timestamp,
        savedToDatabase: true,
        emailNotificationSent: emailSent,
        webhookPushSent: webhookSent,
        isSpamThrottled,
      },
    };
  }
}
