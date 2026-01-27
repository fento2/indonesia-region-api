"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cron_controller_1 = __importDefault(require("./cron.controller"));
class CronRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.cronController = new cron_controller_1.default();
        this.initializeRouter = () => {
            this.router.get("/keep-alive", this.cronController.keepDbAlive);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.initializeRouter();
    }
}
exports.default = CronRouter;
