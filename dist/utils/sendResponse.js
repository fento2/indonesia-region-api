"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const shared_1 = require("../types/shared");
const sendResponse = (res, message, statusCode, data, meta) => {
    return res.status(statusCode).json({
        result: Object.assign({ message, data, meta }, shared_1.result),
    });
};
exports.sendResponse = sendResponse;
