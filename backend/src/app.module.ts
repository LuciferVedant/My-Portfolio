import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperienceModule } from './experience/experience.module';
import { AiModule } from './ai-assistant/ai.module';
import { HealthController } from './health/health.controller';
import { AnalyticsModule } from './analytics/analytics.module';

const logger = new Logger('AppModule');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 10, // 10 requests per minute
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI') || 'mongodb://127.0.0.1:27017/portfolio_db';
        logger.log(`Initializing Mongoose ODM connection to MongoDB: ${uri}`);
        return {
          uri,
          serverSelectionTimeoutMS: 3000,
          retryAttempts: 3,
          retryDelay: 2000,
          connectionErrorFactory: (error) => {
            logger.warn(
              `[MongoDB Connection Warning] Unable to connect to MongoDB (${error.message}). Local JSON file DB fallback is active for contact logs & analytics.`,
            );
            return error;
          },
        };
      },
    }),
    ContactModule,
    ProjectsModule,
    ExperienceModule,
    AiModule,
    AnalyticsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
