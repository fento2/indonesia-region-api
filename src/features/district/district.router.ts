import { Router } from "express";
import DistrictController from "./district.controller";
import { validatorSchema } from "../../middleware/validatorSchema";
import { districtSchema } from "./district.model";

class DistrictRouter {
  private router = Router();

  private districtController = new DistrictController();

  constructor() {
    this.initializeRouter();
  }
  initializeRouter = (): void => {
    this.router.get(
      "/",
      validatorSchema(districtSchema, "query"),
      this.districtController.getDistrits,
    );
    this.router.get(
      "/detail",
      validatorSchema(districtSchema, "query"),
      this.districtController.getDetailDistrict,
    );
  };

  getRouter = () => {
    return this.router;
  };
}
export default DistrictRouter;
