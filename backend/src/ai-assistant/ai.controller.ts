import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async chatWithAi(
    @Body('query') query: string,
    @Body('attachments') attachments?: any[],
    @Body('history') history?: Array<{ role: 'user' | 'assistant'; content: string }>,
  ) {
    if (!query || typeof query !== 'string') {
      return { answer: 'Please provide a valid question about Vedant Khatri.', relevantSkills: [] };
    }
    return this.aiService.processUserQuery(query, attachments, history);
  }
}
