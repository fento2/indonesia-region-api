import { HttpStatus } from "../../constants/httpStatus";
import { ExpressCbFn } from "../../types/shared";
import { sendResponse } from "../../utils/sendResponse";
import VillageService from "./village.service";

class VillageController {
  private villageService = new VillageService();

  getVillages: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const villages = await this.villageService.getVillages(query);
      return sendResponse(
        res,
        "list villages success",
        HttpStatus.OK,
        villages.data,
        villages.meta,
      );
    } catch (error) {
      next(error);
    }
  };

  getDetailVillage: ExpressCbFn = async (req, res, next) => {
    try {
      const query = res.locals.data;
      const village = await this.villageService.getDetailVillage(query);
      return sendResponse(
        res,
        `detail village code: ${village.code} success`,
        HttpStatus.OK,
        village,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}

export default VillageController;
