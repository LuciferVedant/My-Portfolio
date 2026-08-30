import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { AiModule } from './ai-assistant/ai.module';
import { HealthController } from './health/health.controller';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 10, // 10 requests per minute
      },
    ]),
    ContactModule,
    ProjectsModule,
    ExperienceModule,
    AiModule,
    AnalyticsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
