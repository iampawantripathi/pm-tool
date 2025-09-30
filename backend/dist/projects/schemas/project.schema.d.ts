import mongoose, { Document } from 'mongoose';
export declare class Project extends Document {
    title: string;
    description?: string;
    status: string;
    owner: mongoose.Types.ObjectId;
}
export declare const ProjectSchema: mongoose.Schema<Project, mongoose.Model<Project, any, any, any, mongoose.Document<unknown, any, Project> & Project & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Project, mongoose.Document<unknown, {}, mongoose.FlatRecord<Project>> & mongoose.FlatRecord<Project> & {
    _id: mongoose.Types.ObjectId;
}>;
