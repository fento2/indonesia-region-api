import { NextFunction, Request, Response } from "express";
import ProvinceService from "./province.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";

class ProvinceController {
  private provinceService = new ProvinceService();

  getProvinces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = res.locals.data;
      const data = await this.provinceService.getProvinces(query);
      return sendResponse(
        res,
        "list province success",
        HttpStatus.OK,
        data.data,
        data.meta,
      );
    } catch (error) {
      next(error);
    }
  };

  getDetailProvince = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const query = res.locals.data;
      const data = await this.provinceService.getDetailProvince(query);
      return sendResponse(
        res,
        `detail province code: ${data.code} success`,
        HttpStatus.OK,
        data,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}

export default ProvinceController;
