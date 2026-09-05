import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalyticsDocument = Analytics & Document;

@Schema({ timestamps: true, collection: 'analytics' })
export class Analytics {
  @Prop({ required: true })
  path: string;

  @Prop()
  userAgent?: string;

  @Prop()
  referrer?: string;

  @Prop()
  ipAddress?: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
