"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorSchema_1 = require("../../middleware/validatorSchema");
const village_controller_1 = __importDefault(require("./village.controller"));
const village_model_1 = require("./village.model");
class VillageRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.villageController = new village_controller_1.default();
        this.initializeRouter = () => {
            this.router.get("/", (0, validatorSchema_1.validatorSchema)(village_model_1.villageSchema, "query"), this.villageController.getVillages);
            this.router.get("/detail", (0, validatorSchema_1.validatorSchema)(village_model_1.villageSchema, "query"), this.villageController.getDetailVillage);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.initializeRouter();
    }
}
exports.default = VillageRouter;
