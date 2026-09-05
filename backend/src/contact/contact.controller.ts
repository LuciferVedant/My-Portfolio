import { Body, Controller, Get, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { ContactService, ContactLog } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Request } from 'express';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async submitContact(@Body() createContactDto: CreateContactDto, @Req() req: Request) {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '127.0.0.1';
    return this.contactService.handleContactSubmission(createContactDto, clientIp);
  }

  @Get('logs')
  async getLogs(): Promise<{ total: number; logs: ContactLog[] }> {
    const logs = await this.contactService.getContactLogs();
    return {
      total: logs.length,
      logs,
    };
  }
}
