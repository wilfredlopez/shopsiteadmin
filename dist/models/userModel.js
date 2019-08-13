"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    fistname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("User", userModel);
//# sourceMappingURL=userModel.js.map