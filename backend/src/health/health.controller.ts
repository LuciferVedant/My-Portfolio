import { Controller, Get } from '@nestjs/common';

@Controller('api/health')
export class HealthController {
  private readonly startTime = Date.now();

  @Get()
  getHealth() {
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    return {
      status: 'ok',
      service: 'Vedant Portfolio NestJS API',
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };
  }
}
