"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    token: String,
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cart",
    },
    profile: {
        email: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: Number,
        dateOfBirth: Date,
        shippingInformation: {
            address: String,
            apt: String,
            city: String,
            country: String,
            state: String,
            zipcode: String,
            stateShortName: String,
        },
        billingInformation: {
            address: String,
            apt: String,
            city: String,
            country: String,
            state: String,
            zipcode: String,
            stateShortName: String,
        },
        orders: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Order",
        },
    },
}, {
    timestamps: true,
});
exports.userSchema.pre("save", next => {
    //do whatever
    next();
});
exports.userSchema.methods.fullName = function () {
    return this.profile.firstName.trim() + " " + this.profile.lastName.trim();
};
const User = mongoose_1.model("User", exports.userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map