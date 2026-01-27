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
const prisma_1 = require("../../configs/prisma");
const httpStatus_1 = require("../../constants/httpStatus");
const appError_1 = __importDefault(require("../../errors/appError"));
const sendResponse_1 = require("../../utils/sendResponse");
class CronController {
    constructor() {
        this.keepDbAlive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isVercelCron = req.headers["x-vercel-cron"];
                if (!isVercelCron) {
                    throw new appError_1.default("Unauthorized", httpStatus_1.HttpStatus.UNAUTHORIZED);
                }
                yield prisma_1.prisma.$queryRaw `SELECT 1`;
                return (0, sendResponse_1.sendResponse)(res, "DB pinged successfully", httpStatus_1.HttpStatus.OK, undefined, undefined);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CronController;
