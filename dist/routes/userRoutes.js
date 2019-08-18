"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = __importDefault(require("../models/userModel"));
const requiredHeaderToken_1 = __importDefault(require("../middlewares/requiredHeaderToken"));
const ordersModel_1 = __importDefault(require("../models/ordersModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const userModel_2 = __importDefault(require("../models/userModel"));
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userModel_1.default.find({}).select("-password");
            res.send(users);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            const emailReg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            const isValidEmail = emailReg.test(email);
            if (!isValidEmail) {
                return res.status(422).json({ error: "Invalid Email" });
            }
            try {
                const exist = yield userModel_1.default.find({ email });
                if (exist.length > 0) {
                    return res.status(401).json({ error: "Already Exist" });
                }
                const hash = yield bcrypt.hashSync(password, 10);
                const newUser = yield new userModel_1.default(Object.assign({}, req.body, { profile: Object.assign({}, req.body.profile, { email: req.body.email, password: hash }), password: hash }));
                const user = yield newUser.save();
                const token = yield jwt.sign({
                    userId: user._id,
                }, process.env.JWT_SECRET, { expiresIn: "7 days" });
                const createdUser = yield userModel_1.default.findById(user._id);
                createdUser.token = token;
                yield createdUser.save();
                res.send(newUser);
            }
            catch (e) {
                res.status(500).json(Object.assign({ error: "Error creating user" }, e));
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield userModel_1.default.findById(id)
                    .select("-password")
                    .populate("orders");
                let Orders = [];
                try {
                    Orders = yield ordersModel_1.default.find({ user: user._id });
                }
                catch (error) { }
                if (!user) {
                    res.status(400).json({ error: "User Not Found" });
                }
                res.json({ user, Orders });
            }
            catch (e) {
                res.status(500).json(Object.assign({ error: "Server Error" }, e));
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const user = yield userModel_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true });
                if (!user) {
                    return res.status(404).json({ error: "Not Found" });
                }
                res.send(user);
            }
            catch (e) {
                res.json(Object.assign({ error: "Server Error" }, e));
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield userModel_1.default.findByIdAndDelete(id, { rawResult: true });
                if (!user.value) {
                    return res.status(404).json({ error: "User Not Found" });
                }
                res.json({ message: "User Deleted", user: user.value });
            }
            catch (e) {
                res.status(500).json(Object.assign({ error: "Errors deleting" }, e));
            }
            res.send("user route");
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userModel_1.default.findOne({ email: email });
                if (!user) {
                    throw new Error("Authentication Failed");
                }
                const isMatch = yield bcrypt.compareSync(password, user.password); // true
                if (isMatch) {
                    const token = yield jwt.sign({
                        userId: user.id,
                    }, process.env.JWT_SECRET, { expiresIn: "7 days" });
                    user.token = token;
                    return res.send(user);
                }
                res.status(401).send({ error: "Authentication Failed" });
            }
            catch (err) {
                res.status(500).send({ error: "Authentication Failed" });
            }
        });
    }
    getUserCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const cart = yield cartModel_1.default.find({ userId: id });
                res.json(cart);
            }
            catch (e) {
                res.json(Object.assign({ error: "Not Found" }, e));
            }
        });
    }
    addUserCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                let options = { upsert: true, new: true, setDefaultsOnInsert: true };
                const cart = yield cartModel_1.default.findOneAndUpdate({ userId: id }, Object.assign({}, req.body), options);
                res.json(cart);
            }
            catch (e) {
                res.json(Object.assign({ error: "Server Error" }, e));
            }
        });
    }
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            if (!token) {
                return res.json({ error: "Token must be provided in url parameters" });
            }
            try {
                const verify = yield jwt.verify(token, process.env.JWT_SECRET);
                try {
                    const user = yield userModel_2.default.findById(verify.userId);
                    return res.json(user);
                }
                catch (e) {
                    return res.status(404).json(Object.assign({ error: "Not Found" }, e));
                }
            }
            catch (e) {
                res.status(401).json(Object.assign({ error: "You are not Authorized" }, e));
            }
        });
    }
    routes() {
        this.router.get("/verify/:token", this.verifyToken);
        this.router.post("/login", this.login);
        //GET: api/users/
        this.router.get("/", this.getUsers);
        this.router.post("/", [
            check("email", "Invalid Email").isEmail(),
            check("password", "Password lenght most be at least 5").isLength({
                min: 5,
            }),
        ], this.createUser);
        this.router.get("/:id", this.getUser);
        this.router.get("/cart/:id", this.getUserCart);
        this.router.post("/cart/:id", this.addUserCart);
        this.router.delete("/:id", requiredHeaderToken_1.default, this.deleteUser);
        this.router.put("/:id", [
            check("email", "Invalid Email").isEmail(),
            check("password", "Password lenght most be at least 5").isLength({
                min: 5,
            }),
            check("_id")
                .not()
                .exists(),
            check("token")
                .not()
                .exists(),
        ], this.updateUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map