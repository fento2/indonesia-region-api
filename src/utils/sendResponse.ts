import { Response } from "express";
import { result } from "../types/shared";

export const sendResponse = <DataType, MetaType>(
  res: Response,
  message: string,
  statusCode: number,
  data: DataType,
  meta: MetaType,
) => {
  return res.status(statusCode).json({
    result: { message, data, meta, ...result },
  });
};
