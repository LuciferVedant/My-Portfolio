import { Body, Controller, Get, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, Req, Param, Res } from '@nestjs/common';
import { ContactService, ContactLog } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Request, Response } from 'express';

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

  @Get('attachment/:fileId')
  async downloadAttachment(@Param('fileId') fileId: string, @Res() res: Response) {
    const downloadStream = this.contactService.getAttachmentStream(fileId);
    if (!downloadStream) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Attachment file not found in MongoDB GridFS' });
    }
    downloadStream.on('error', () => {
      if (!res.headersSent) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Attachment stream error' });
      }
    });
    downloadStream.pipe(res);
  }
}
