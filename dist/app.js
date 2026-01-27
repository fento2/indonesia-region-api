"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const httpStatus_1 = require("./constants/httpStatus");
const errorCallback_1 = require("./errors/errorCallback");
const province_router_1 = __importDefault(require("./features/province/province.router"));
const appError_1 = __importDefault(require("./errors/appError"));
const regency_router_1 = __importDefault(require("./features/regency/regency.router"));
const district_router_1 = __importDefault(require("./features/district/district.router"));
const village_router_1 = __importDefault(require("./features/village/village.router"));
const cron_router_1 = __importDefault(require("./features/cron/cron.router"));
const PORT = process.env.PORT || 8181;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure = () => {
            this.app.use((0, cors_1.default)());
            this.app.use(express_1.default.json());
        };
        this.router = () => {
            this.app.get("/", (req, res, next) => {
                return res
                    .status(httpStatus_1.HttpStatus.OK)
                    .send(`Welcome to Indonesia Region API running in ${process.env.NODE_DEV}`);
            });
            const provinceRouter = new province_router_1.default();
            const regencyRouter = new regency_router_1.default();
            const districtRouter = new district_router_1.default();
            const villageRouter = new village_router_1.default();
            const cronRouter = new cron_router_1.default();
            this.app.use("/province", provinceRouter.getRouter());
            this.app.use("/regency", regencyRouter.getRouter());
            this.app.use("/district", districtRouter.getRouter());
            this.app.use("/village", villageRouter.getRouter());
            this.app.use("/cron", cronRouter.getRouter());
            this.app.use((req, res, next) => {
                throw new appError_1.default("route not found", httpStatus_1.HttpStatus.NOT_FOUND);
            });
        };
        this.errorHandler = () => {
            this.app.use(errorCallback_1.errorCallback);
        };
        this.start = () => {
            this.app.listen(PORT, () => {
                console.log(`Server Is Running on http://localhost:${PORT}`);
            });
        };
        this.configure();
        this.router();
        this.errorHandler();
    }
}
exports.default = App;
