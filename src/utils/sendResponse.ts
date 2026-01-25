import { Response } from "express";

export const sendResponse = <DataType>(
  res: Response,
  message: string,
  statusCode: number,
  data: DataType,
) => {
  return res.status(statusCode).json({
    result: { message, data },
  });
};
