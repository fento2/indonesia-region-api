import ProvinceService from "./province.service";
import { sendResponse } from "../../utils/sendResponse";
import { HttpStatus } from "../../constants/httpStatus";
import { ExpressCbFn } from "../../types/shared";

class ProvinceController {
  private provinceService = new ProvinceService();

  getProvinces: ExpressCbFn = async (req, res, next) => {
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

  getDetailProvince: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const province = await this.provinceService.getDetailProvince(query);
      return sendResponse(
        res,
        `detail province code: ${province.code} success`,
        HttpStatus.OK,
        province,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}

export default ProvinceController;
