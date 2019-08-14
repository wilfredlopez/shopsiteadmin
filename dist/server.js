"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //db
        mongoose_1.default.set("useFindAndModify", true);
        mongoose_1.default
            .connect(process.env.MONGO_DB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
        })
            .then(db => console.log("conected to dabatase"))
            .catch(e => console.log(e));
        //Settings
        this.app.set("port", process.env.PORT || 5000);
        //middleware
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(morgan_1.default("dev"));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
    }
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api/users", userRoutes_1.default);
        this.app.use("/api/products", productRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Listening on port ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map