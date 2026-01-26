"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(_message, _httpStatus) {
        this.httpStatus = _httpStatus;
        this.message = _message;
    }
}
exports.default = AppError;
