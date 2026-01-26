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
const httpStatus_1 = require("../../constants/httpStatus");
const appError_1 = __importDefault(require("../../errors/appError"));
const regency_repository_1 = __importDefault(require("./regency.repository"));
class RegencyService {
    constructor() {
        this.regencyRepository = new regency_repository_1.default();
        this.getRegencies = (params) => __awaiter(this, void 0, void 0, function* () {
            const regencies = yield this.regencyRepository.getRegencies(params);
            if (!regencies) {
                throw new appError_1.default("regencies not found", httpStatus_1.HttpStatus.NOT_FOUND);
            }
            return regencies;
        });
        this.getDetailRegency = (params) => __awaiter(this, void 0, void 0, function* () {
            if (params.id && params.code) {
                throw new appError_1.default("use only one unique field: id or code", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            if (!params.id && !params.code) {
                throw new appError_1.default("unique value required (id or code)", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            const data = params.id
                ? yield this.regencyRepository.getRegencyById(params)
                : yield this.regencyRepository.getRegencyByCode(params);
            if (!data) {
                throw new appError_1.default("regency not found", httpStatus_1.HttpStatus.NOT_FOUND);
            }
            return data;
        });
    }
}
exports.default = RegencyService;
