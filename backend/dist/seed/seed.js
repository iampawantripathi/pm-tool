"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const userModel_1 = require("../models/userModel");
const projectModel_1 = require("../models/projectModel");
const taskModel_1 = require("../models/taskModel");
async function run() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/pm-tool';
    await (0, mongoose_1.connect)(uri);
    console.log('connected', uri);
    await userModel_1.default.deleteMany({ email: 'test@example.com' });
    const hashed = await bcrypt.hash('Test@123', 10);
    const user = await userModel_1.default.create({ email: 'test@example.com', password: hashed });
    for (let p = 1; p <= 2; p++) {
        const proj = await projectModel_1.default.create({ title: `Seed Project ${p}`, description: 'seed', status: 'active', owner: user._id });
        for (let t = 1; t <= 3; t++) {
            await taskModel_1.default.create({ title: `Task ${t} P${p}`, description: 'seed', status: t % 3 === 0 ? 'done' : t % 3 === 1 ? 'todo' : 'in-progress', dueDate: new Date(), project: proj._id });
        }
    }
    console.log('seed done');
    process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
//# sourceMappingURL=seed.js.map