import { Router } from "express";
import DistrictController from "./district.controller";

class DistrictRouter {
  private router = Router();

  private districtController = new DistrictController();

  constructor() {
    this.initializeRouter();
  }
  initializeRouter = (): void => {};

  getRouter = () => {
    return this.router;
  };
}
export default DistrictRouter;
