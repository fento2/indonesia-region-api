import { Response } from "express";

export const sendResponse = <DataType, MetaType>(
  res: Response,
  message: string,
  statusCode: number,
  data: DataType,
  meta: MetaType,
) => {
  return res.status(statusCode).json({
    result: { message, data, meta },
  });
};
