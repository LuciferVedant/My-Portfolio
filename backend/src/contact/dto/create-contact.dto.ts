import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;

  @IsString()
  @MinLength(10, { message: 'Message must be at least 10 characters long' })
  message: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  webhookUrl?: string; // Optional custom Discord / Telegram webhook to dispatch alert
}
