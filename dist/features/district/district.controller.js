"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const district_service_1 = __importDefault(require("./district.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatus_1 = require("../../constants/httpStatus");
class DistrictController {
    constructor() {
        this.distritService = new district_service_1.default();
        this.getDistrits = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const districts = yield this.distritService.getDistricts(query);
                return (0, sendResponse_1.sendResponse)(res, "list district success", httpStatus_1.HttpStatus.OK, districts.data, districts.meta);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDetailDistrict = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const district = yield this.distritService.getDetailDistrict(query);
                return (0, sendResponse_1.sendResponse)(res, `detail district code: ${district.code} success`, httpStatus_1.HttpStatus.OK, district, undefined);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DistrictController;
