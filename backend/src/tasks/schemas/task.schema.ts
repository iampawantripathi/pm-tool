import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true }) title: string;
  @Prop() description?: string;
  @Prop({ required: true, enum: ['todo','in-progress','done'], default: 'todo' }) status: string;
  @Prop() dueDate?: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }) project: mongoose.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
