"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: { type: String, required: true },
    token: String,
}, {
    timestamps: true,
});
exports.userSchema.methods.fullName = function () {
    return this.firstName.trim() + " " + this.lastName.trim();
};
const User = mongoose_1.model("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map