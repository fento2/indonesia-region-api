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
const village_repository_1 = __importDefault(require("./village.repository"));
class VillageService {
    constructor() {
        this.villageRepository = new village_repository_1.default();
        this.getVillages = (params) => __awaiter(this, void 0, void 0, function* () {
            const villages = yield this.villageRepository.getVillages(params);
            if (!villages) {
                throw new appError_1.default("villages not found", httpStatus_1.HttpStatus.NOT_FOUND);
            }
            return villages;
        });
        this.getDetailVillage = (params) => __awaiter(this, void 0, void 0, function* () {
            if (params.id && params.code) {
                throw new appError_1.default("use only one unique field: id or code", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            if (!params.id && !params.code) {
                throw new appError_1.default("unique value required (id or code)", httpStatus_1.HttpStatus.BAD_REQUEST);
            }
            const data = params.id
                ? yield this.villageRepository.getVillageById(params)
                : yield this.villageRepository.getVillageByCode(params);
            if (!data) {
                throw new appError_1.default("village not found", httpStatus_1.HttpStatus.NOT_FOUND);
            }
            return data;
        });
    }
}
exports.default = VillageService;
