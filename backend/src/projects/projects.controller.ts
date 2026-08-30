import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ProjectsService, Project } from './projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects(@Query('tech') tech?: string): Project[] {
    return this.projectsService.getAllProjects(tech);
  }

  @Get(':id')
  getProjectById(@Param('id') id: string): Project {
    const project = this.projectsService.getProjectById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID '${id}' not found`);
    }
    return project;
  }
}
