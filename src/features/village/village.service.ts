import { prisma } from "../../configs/prisma";
import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { VillageQueryType } from "./village.model";
import VillageRepository from "./village.repository";

class VillageService {
  private villageRepository = new VillageRepository();

  getVillages = async (params: VillageQueryType) => {
    const villages = await this.villageRepository.getVillages(params);
    if (!villages) {
      throw new AppError("villages not found", HttpStatus.NOT_FOUND);
    }
    return villages;
  };

  getDetailVillage = async (params: VillageQueryType) => {
    if (params.id && params.code) {
      throw new AppError(
        "use only one unique field: id or code",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!params.id && !params.code) {
      throw new AppError(
        "unique value required (id or code)",
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = params.id
      ? await this.villageRepository.getVillageById(params)
      : await this.villageRepository.getVillageByCode(params);

    if (!data) {
      throw new AppError("village not found", HttpStatus.NOT_FOUND);
    }

    return data;
  };
}

export default VillageService;
