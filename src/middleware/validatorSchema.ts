import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../errors/appError";
import { HttpStatus } from "../constants/httpStatus";

export const validatorSchema =
  (schema: ZodObject, type: "body" | "params" | "query" | "cookies") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("test", req[type]);
      const result = schema.safeParse(req[type]);
      console.log(result);

      if (!result.success) {
        throw new AppError(result.error.issues as any, HttpStatus.BAD_REQUEST);
      }
      res.locals.data = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
