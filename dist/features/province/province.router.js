"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const province_controller_1 = __importDefault(require("./province.controller"));
const validatorSchema_1 = require("../../middleware/validatorSchema");
const province_model_1 = require("./province.model");
class ProvinceRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.provinceController = new province_controller_1.default();
        this.initializeRouter = () => {
            this.router.get("/", (0, validatorSchema_1.validatorSchema)(province_model_1.provinceSchema, "query"), this.provinceController.getProvinces);
            this.router.get("/detail", (0, validatorSchema_1.validatorSchema)(province_model_1.provinceSchema, "query"), this.provinceController.getDetailProvince);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.initializeRouter();
    }
}
exports.default = ProvinceRouter;
