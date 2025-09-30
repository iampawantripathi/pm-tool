import { connect } from 'mongoose';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';
import ProjectModel from '../models/projectModel';
import TaskModel from '../models/taskModel';
// dotenv.config();
async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/pm-tool';
  await connect(uri);
  console.log('connected', uri);
  await UserModel.deleteMany({ email: 'test@example.com' });
  const hashed = await bcrypt.hash('Test@123', 10);
  const user = await UserModel.create({ email: 'test@example.com', password: hashed });
  for (let p = 1; p <= 2; p++) {
    const proj = await ProjectModel.create({ title: `Seed Project ${p}`, description: 'seed', status: 'active', owner: user._id });
    for (let t = 1; t <= 3; t++) {
      await TaskModel.create({ title: `Task ${t} P${p}`, description: 'seed', status: t % 3 === 0 ? 'done' : t % 3 === 1 ? 'todo' : 'in-progress', dueDate: new Date(), project: proj._id });
    }
  }
  console.log('seed done'); process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
