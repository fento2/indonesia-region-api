"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCallback = void 0;
const appError_1 = __importDefault(require("./appError"));
const httpStatus_1 = require("../constants/httpStatus");
const errorCallback = (error, req, res, next) => {
    if (error instanceof appError_1.default) {
        return res.status(error.httpStatus).json({
            result: {
                erorr: error.message,
            },
        });
    }
    const message = error instanceof Error ? error.message : "Unknown Error";
    return res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
        result: {
            error: message,
        },
    });
};
exports.errorCallback = errorCallback;
