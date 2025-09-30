"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    status: String,
    dueDate: Date,
    project: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Project'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Task', TaskSchema);
//# sourceMappingURL=taskModel.js.map