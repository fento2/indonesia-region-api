import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { HttpStatus } from "./constants/httpStatus";
import { errorCallback } from "./errors/errorCallback";
import ProvinceRouter from "./features/province/province.router";
import AppError from "./errors/appError";
import RegencyRouter from "./features/regency/regency.router";
import DistrictRouter from "./features/district/district.router";
import VillageRouter from "./features/village/village.router";

const PORT = process.env.PORT || 8181;

class App {
  app = express();

  constructor() {
    this.configure();
    this.router();
    this.errorHandler();
  }

  private configure = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };
  private router = () => {
    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      return res
        .status(HttpStatus.OK)
        .send(
          `Welcome to Indonesia Region API running in ${process.env.NODE_DEV}`,
        );
    });

    const provinceRouter = new ProvinceRouter();
    const regencyRouter = new RegencyRouter();
    const districtRouter = new DistrictRouter();
    const villageRouter = new VillageRouter();

    this.app.use("/province", provinceRouter.getRouter());
    this.app.use("/regency", regencyRouter.getRouter());
    this.app.use("/district", districtRouter.getRouter());
    this.app.use("/village", villageRouter.getRouter());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      throw new AppError("route not found", HttpStatus.NOT_FOUND);
    });
  };

  private errorHandler = () => {
    this.app.use(errorCallback);
  };

  start = () => {
    this.app.listen(PORT, () => {
      console.log(`Server Is Running on http://localhost:${PORT}`);
    });
  };
}
export default App;
