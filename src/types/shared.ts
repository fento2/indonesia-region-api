import { NextFunction, Request, Response } from "express";

export type ExpressCbFn<T = any> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T> | T;
