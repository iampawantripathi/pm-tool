import { model, Schema, Types } from 'mongoose';
const ProjectSchema = new Schema(
    {
        title: String,
        description: String,
        status: String,
        owner: {
            type: Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true });
export default model('Project', ProjectSchema);
