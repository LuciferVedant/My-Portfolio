import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  trackView(@Body('path') path: string, @Headers('user-agent') ua: string) {
    return this.analyticsService.trackPageView(path || '/', ua);
  }

  @Get('stats')
  getStats() {
    return this.analyticsService.getStats();
  }
}
