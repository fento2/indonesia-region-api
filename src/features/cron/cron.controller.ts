import { prisma } from "../../configs/prisma";
import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { ExpressCbFn } from "../../types/shared";
import { sendResponse } from "../../utils/sendResponse";
import DistrictRepository from "../district/district.repository";
import ProvinceRepository from "../province/province.repository";
import RegencyRepository from "../regency/regency.repository";
import VillageRepository from "../village/village.repository";

class CronController {
  private provinceRepository = new ProvinceRepository();
  private regencyRepository = new RegencyRepository();
  private villageReposiroty = new VillageRepository();
  private districtRepository = new DistrictRepository();
  keepDbAlive: ExpressCbFn = async (req, res, next) => {
    try {
      const isVercelCron = req.headers["x-vercel-cron"];

      if (!isVercelCron) {
        throw new AppError("Unauthorized", HttpStatus.UNAUTHORIZED);
      }
      const pingDbFunctions = [
        () => this.provinceRepository.getProvinces({ include: [] }),
        () =>
          this.regencyRepository.getRegencies({
            include: [],
            type: "Kabupaten",
          }),
        () => this.villageReposiroty.getVillages({ include: [] }),
        () => this.districtRepository.getDistricts({ include: [] }),
      ];

      const randomIndex = Math.floor(Math.random() * pingDbFunctions.length);

      await pingDbFunctions[randomIndex]();

      return sendResponse(
        res,
        "DB pinged successfully",
        HttpStatus.OK,
        undefined,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}
export default CronController;
