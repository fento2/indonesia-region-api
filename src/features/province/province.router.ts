import { Router } from "express";
import ProvinceController from "./province.controller";
import { validatorSchema } from "../../middleware/validatorSchema";
import { provinceSchema } from "./province.model";

class ProvinceRouter {
  private router = Router();
  private provinceController = new ProvinceController();
  constructor() {
    this.initializeRouter();
  }
  private initializeRouter = (): void => {
    this.router.get(
      "/",
      validatorSchema(provinceSchema, "query"),
      this.provinceController.getProvinces,
    );
    this.router.get(
      "/detail",
      validatorSchema(provinceSchema, "query"),
      this.provinceController.getDetailProvince,
    );
  };

  getRouter = () => {
    return this.router;
  };
}

export default ProvinceRouter;
