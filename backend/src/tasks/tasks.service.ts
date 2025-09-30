import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}
  async create(data: any) { return this.taskModel.create(data); }
  async findByProject(project: string, filter: any = {}) { return this.taskModel.find({ project, ...filter }).exec(); }
  async update(id: string, data: any) { return this.taskModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async delete(id: string) { return this.taskModel.findByIdAndDelete(id).exec(); }
}
