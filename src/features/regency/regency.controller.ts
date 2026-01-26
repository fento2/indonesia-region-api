import { NextFunction, Request, Response } from "express";
import RegencyService from "./regency.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";

class RegencyController {
  private regencyService = new RegencyService();

  getRegecies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = res.locals.data;
      const regency = await this.regencyService.getRegencies(query);
      return sendResponse(
        res,
        "success",
        HttpStatus.OK,
        regency.data,
        regency.meta,
      );
    } catch (error) {
      next(error);
    }
  };

  getDetailRegency = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const query = res.locals.data;
      const regency = await this.regencyService.getDetailRegency(query);
      sendResponse(res, "success", HttpStatus.OK, regency, undefined);
    } catch (error) {
      next(error);
    }
  };
}
export default RegencyController;
