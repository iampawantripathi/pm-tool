import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(data: any) { return this.projectModel.create(data); }
  async findByOwner(owner: string) { return this.projectModel.find({ owner }).exec(); }
  async findById(id: string) { return this.projectModel.findById(id).exec(); }
  async update(id: string, data: any) { return this.projectModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async remove(id: string) { return this.projectModel.findByIdAndDelete(id).exec(); }
}
