import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: any) { return this.tasksService.create(body); }

  @UseGuards(AuthGuard('jwt'))
  @Get('project/:projectId')
  list(@Param('projectId') projectId: string, @Query('status') status?: string) {
    const filter = status ? { status } : {};
    return this.tasksService.findByProject(projectId, filter);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) { return this.tasksService.update(id, body); }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.delete(id); }
}
