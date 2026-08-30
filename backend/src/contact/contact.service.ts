import { Injectable, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
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
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;
  private readonly dbFilePath = path.join(process.cwd(), 'data', 'contacts-db.json');

  constructor() {
    // Ensure data directory exists for local DB storage
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
  getContactLogs(): ContactLog[] {
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
    this.logger.log(`Received contact submission [ID: ${contactId}] from: ${dto.name} (${dto.email})`);

    // 1. Send Email Notification
    let emailSent = false;
    if (this.transporter) {
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
    let webhookSent = false;

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

    // 3. Save Record into Local Database Storage
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
    };

    try {
      const existingLogs = this.getContactLogs();
      existingLogs.unshift(newRecord);
      fs.writeFileSync(this.dbFilePath, JSON.stringify(existingLogs, null, 2), 'utf-8');
      this.logger.log(`Contact record [${contactId}] persisted to database logs.`);
    } catch (err) {
      this.logger.error('Failed to save record to database:', err);
    }

    return {
      success: true,
      message: 'Thank you! Your message has been saved and sent successfully.',
      details: {
        id: contactId,
        submittedAt: timestamp,
        savedToDatabase: true,
        emailNotificationSent: emailSent,
        webhookPushSent: webhookSent,
      },
    };
  }
}
