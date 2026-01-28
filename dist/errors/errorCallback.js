"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCallback = void 0;
const appError_1 = __importDefault(require("./appError"));
const httpStatus_1 = require("../constants/httpStatus");
const shared_1 = require("../types/shared");
const errorCallback = (error, req, res, next) => {
    if (error instanceof appError_1.default) {
        return res.status(error.httpStatus).json({
            result: Object.assign({ erorr: error.message }, shared_1.result),
        });
    }
    const message = error instanceof Error ? error.message : "Unknown Error";
    return res.status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
        result: Object.assign({ error: message }, shared_1.result),
    });
};
exports.errorCallback = errorCallback;
