import RegencyService from "./regency.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";
import { ExpressCbFn } from "../../types/shared";

class RegencyController {
  private regencyService = new RegencyService();

  getRegecies: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const regency = await this.regencyService.getRegencies(query);
      return sendResponse(
        res,
        "list regencies success",
        HttpStatus.OK,
        regency.data,
        regency.meta,
      );
    } catch (error) {
      next(error);
    }
  };

  getDetailRegency: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const data = await this.regencyService.getDetailRegency(query);
      return sendResponse(
        res,
        `detail regency code: ${data.code} success`,
        HttpStatus.OK,
        data,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}
export default RegencyController;
