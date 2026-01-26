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
const sendResponse_1 = require("../../utils/sendResponse");
const village_service_1 = __importDefault(require("./village.service"));
class VillageController {
    constructor() {
        this.villageService = new village_service_1.default();
        this.getVillages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const villages = yield this.villageService.getVillages(query);
                return (0, sendResponse_1.sendResponse)(res, "list villages success", httpStatus_1.HttpStatus.OK, villages.data, villages.meta);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDetailVillage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = res.locals.data;
                const village = yield this.villageService.getDetailVillage(query);
                return (0, sendResponse_1.sendResponse)(res, `detail village code: ${village.code} success`, httpStatus_1.HttpStatus.OK, village, undefined);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = VillageController;
