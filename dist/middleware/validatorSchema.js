"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorSchema = void 0;
const appError_1 = __importDefault(require("../errors/appError"));
const httpStatus_1 = require("../constants/httpStatus");
const validatorSchema = (schema, type) => (req, res, next) => {
    try {
        const result = schema.safeParse(req[type]);
        if (!result.success) {
            throw new appError_1.default(result.error.issues, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        res.locals.data = result.data;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validatorSchema = validatorSchema;
