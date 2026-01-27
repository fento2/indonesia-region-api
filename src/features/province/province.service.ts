import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { ProvinceQueryType } from "./province.model";
import ProvinceRepository from "./province.repository";

class ProvinceService {
  private provinceRepository = new ProvinceRepository();

  getProvinces = async (params: ProvinceQueryType) => {
    const provinces = await this.provinceRepository.getProvinces(params);
    if (!provinces) {
      throw new AppError("provinces not found", HttpStatus.NOT_FOUND);
    }
    return provinces;
  };

  getDetailProvince = async (params: ProvinceQueryType) => {
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

    const data = await this.provinceRepository.getDetailProvince(params);

    if (!data) {
      throw new AppError("province not found", HttpStatus.NOT_FOUND);
    }

    return data;
  };
}
export default ProvinceService;
