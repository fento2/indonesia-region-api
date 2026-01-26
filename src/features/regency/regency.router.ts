import { Router } from "express";
import { validatorSchema } from "../../middleware/validatorSchema";
import RegencyController from "./regency.controller";
import { regencySchema } from "./regency.model";

class RegencyRouter {
  private router = Router();

  private regencyController = new RegencyController();

  constructor() {
    this.initializeRouter();
  }
  private initializeRouter = (): void => {
    this.router.get(
      "/",
      validatorSchema(regencySchema, "query"),
      this.regencyController.getRegecies,
    );
    this.router.get(
      "/detail",
      validatorSchema(regencySchema, "query"),
      this.regencyController.getDetailRegency,
    );
  };

  getRouter = () => {
    return this.router;
  };
}

export default RegencyRouter;
