"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    status: String,
    owner: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Project', ProjectSchema);
//# sourceMappingURL=projectModel.js.map