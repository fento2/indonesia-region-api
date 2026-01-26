import DistrictService from "./district.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";
import { ExpressCbFn } from "../../types/shared";

class DistrictController {
  private distritService = new DistrictService();

  getDistrits: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const districts = await this.distritService.getDistricts(query);
      return sendResponse(
        res,
        "list district success",
        HttpStatus.OK,
        districts.data,
        districts.meta,
      );
    } catch (error) {
      next(error);
    }
  };

  getDetailDistrict: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const district = await this.distritService.getDetailDistrict(query);
      return sendResponse(
        res,
        `detail district code: ${district.code} success`,
        HttpStatus.OK,
        district,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}
export default DistrictController;
