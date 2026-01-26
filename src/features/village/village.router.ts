import { Router } from "express";
import { validatorSchema } from "../../middleware/validatorSchema";
import VillageController from "./village.controller";
import { villageSchema } from "./village.model";

class VillageRouter {
  private router = Router();

  private villageController = new VillageController();

  constructor() {
    this.initializeRouter();
  }
  private initializeRouter = (): void => {
    this.router.get(
      "/",
      validatorSchema(villageSchema, "query"),
      this.villageController.getVillages,
    );
    this.router.get(
      "/detail",
      validatorSchema(villageSchema, "query"),
      this.villageController.getDetailVillage,
    );
  };

  getRouter = () => {
    return this.router;
  };
}

export default VillageRouter;
