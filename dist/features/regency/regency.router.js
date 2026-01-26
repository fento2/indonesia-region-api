"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorSchema_1 = require("../../middleware/validatorSchema");
const regency_controller_1 = __importDefault(require("./regency.controller"));
const regency_model_1 = require("./regency.model");
class RegencyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.regencyController = new regency_controller_1.default();
        this.initializeRouter = () => {
            this.router.get("/", (0, validatorSchema_1.validatorSchema)(regency_model_1.regencySchema, "query"), this.regencyController.getRegecies);
            this.router.get("/detail", (0, validatorSchema_1.validatorSchema)(regency_model_1.regencySchema, "query"), this.regencyController.getDetailRegency);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.initializeRouter();
    }
}
exports.default = RegencyRouter;
