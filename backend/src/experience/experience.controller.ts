import { Controller, Get } from '@nestjs/common';
import { ExperienceService, WorkExperience } from './experience.service';

@Controller('api/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getExperience(): WorkExperience[] {
    return this.experienceService.getExperience();
  }
}
