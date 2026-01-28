import { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import { HttpStatus } from "../constants/httpStatus";
import { result } from "../types/shared";

export const errorCallback = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.httpStatus).json({
      result: {
        erorr: error.message,
        ...result,
      },
    });
  }
  const message = error instanceof Error ? error.message : "Unknown Error";
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    result: {
      error: message,
      ...result,
    },
  });
};
