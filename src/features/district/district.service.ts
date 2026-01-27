import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { DistrictQueryType } from "./district.model";
import DistrictRepository from "./district.repository";

class DistrictService {
  private districtRepository = new DistrictRepository();

  getDistricts = async (params: DistrictQueryType) => {
    const districts = this.districtRepository.getDistricts(params);

    if (!districts) {
      throw new AppError("distrits not found", HttpStatus.NOT_FOUND);
    }

    return districts;
  };

  getDetailDistrict = async (params: DistrictQueryType) => {
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

    const data = await this.districtRepository.getDetailDistrict(params);

    if (!data) {
      throw new AppError("district not found", HttpStatus.NOT_FOUND);
    }

    return data;
  };
}

export default DistrictService;
