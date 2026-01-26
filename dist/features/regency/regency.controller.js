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
const regency_service_1 = __importDefault(require("./regency.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatus_1 = require("../../constants/httpStatus");
class RegencyController {
    constructor() {
        this.regencyService = new regency_service_1.default();
        this.getRegecies = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const regency = yield this.regencyService.getRegencies(query);
                return (0, sendResponse_1.sendResponse)(res, "list regencies success", httpStatus_1.HttpStatus.OK, regency.data, regency.meta);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDetailRegency = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const data = yield this.regencyService.getDetailRegency(query);
                return (0, sendResponse_1.sendResponse)(res, `detail regency code: ${data.code} success`, httpStatus_1.HttpStatus.OK, data, undefined);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = RegencyController;
