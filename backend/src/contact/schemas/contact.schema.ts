import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true, collection: 'contacts' })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  company?: string;

  @Prop()
  ipAddress?: string;

  @Prop({ default: false })
  emailNotificationSent: boolean;

  @Prop({ default: false })
  webhookPushSent: boolean;

  @Prop({ default: false })
  isSpamThrottled: boolean;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
