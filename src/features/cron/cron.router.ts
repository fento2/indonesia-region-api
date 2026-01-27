import { Router } from "express";
import CronController from "./cron.controller";

class CronRouter {
  private router = Router();

  private cronController = new CronController();

  constructor() {
    this.initializeRouter();
  }
  private initializeRouter = (): void => {
    this.router.get("/keep-alive", this.cronController.keepDbAlive);
  };

  getRouter = () => {
    return this.router;
  };
}
export default CronRouter;
