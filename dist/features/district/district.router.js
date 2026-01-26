"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const district_controller_1 = __importDefault(require("./district.controller"));
const validatorSchema_1 = require("../../middleware/validatorSchema");
const district_model_1 = require("./district.model");
class DistrictRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.districtController = new district_controller_1.default();
        this.initializeRouter = () => {
            this.router.get("/", (0, validatorSchema_1.validatorSchema)(district_model_1.districtSchema, "query"), this.districtController.getDistrits);
            this.router.get("/detail", (0, validatorSchema_1.validatorSchema)(district_model_1.districtSchema, "query"), this.districtController.getDetailDistrict);
        };
        this.getRouter = () => {
            return this.router;
        };
        this.initializeRouter();
    }
}
exports.default = DistrictRouter;
