import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop({ required: true, enum: ['active', 'completed'], default: 'active' }) status: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }) owner: mongoose.Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
