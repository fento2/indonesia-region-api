import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { RegencyQueryType } from "./regency.model";
import RegencyRepository from "./regency.repository";

class RegencyService {
  private regencyRepository = new RegencyRepository();

  getRegencies = async (params: RegencyQueryType) => {
    const regencies = await this.regencyRepository.getRegencies(params);
    if (!regencies) {
      throw new AppError("regencies not found", HttpStatus.NOT_FOUND);
    }
    return regencies;
  };

  getDetailRegency = async (params: RegencyQueryType) => {
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

    const data = await this.regencyRepository.getDetailRegency(params);

    if (!data) {
      throw new AppError("regency not found", HttpStatus.NOT_FOUND);
    }

    return data;
  };
}
export default RegencyService;
