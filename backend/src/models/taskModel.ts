import { model, Schema, Types } from 'mongoose';
const TaskSchema = new Schema(
    {
        title: String,
        description: String,
        status: String,
        dueDate: Date,
        project: {
            type: Types.ObjectId,
            ref: 'Project'
        }
    },
    { timestamps: true });
export default model('Task', TaskSchema);
