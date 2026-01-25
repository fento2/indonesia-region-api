import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { GetProvinceType, ProvinceQuery } from "./province.model";
import ProvinceRepository from "./province.repository";

class ProvinceService {
  private provinceRepository = new ProvinceRepository();

  getDetailProvince = async (params: ProvinceQuery) => {
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
      ? await this.provinceRepository.getProvinceById(params.id)
      : await this.provinceRepository.getProvinceByCode(params.code!);

    if (!data) {
      throw new AppError("province not found", HttpStatus.NOT_FOUND);
    }

    return data;
  };

  getProvinces = async (params: ProvinceQuery) => {
    const provinces = await this.provinceRepository.getAllProvinces(params);
    if (!provinces) {
      throw new AppError(
        "cannot provinces, something went wrong",
        HttpStatus.NOT_FOUND,
      );
    }
    return provinces;
  };
}
export default ProvinceService;
