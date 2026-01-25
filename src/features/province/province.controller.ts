import { NextFunction, Request, Response } from "express";
import { ProvinceQuery } from "./province.model";
import ProvinceService from "./province.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";

class ProvinceController {
  private provinceService = new ProvinceService();
  getDetailProvince = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const query = res.locals.data;
      const data = await this.provinceService.getDetailProvince(query);
      return sendResponse(res, "success", HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };

  getProvinces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = res.locals.data;
      const data = await this.provinceService.getProvinces(query);
      return sendResponse(res, "success", HttpStatus.OK, data);
    } catch (error) {
      next(error);
    }
  };
}
export default ProvinceController;
