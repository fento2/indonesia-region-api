"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, message, statusCode, data, meta) => {
    return res.status(statusCode).json({
        result: { message, data, meta },
    });
};
exports.sendResponse = sendResponse;
