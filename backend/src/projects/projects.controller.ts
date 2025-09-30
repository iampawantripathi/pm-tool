import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() body: any) {
    // owner from token
    const owner = req.user?.userId;
    return this.projectsService.create({ ...body, owner });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  list(@Req() req: any) {
    const owner = req.user?.userId;
    
    return this.projectsService.findByOwner(owner);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  get(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
