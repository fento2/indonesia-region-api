import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { HttpStatus } from "./constants/httpStatus";
import { errorCallback } from "./errors/errorCallback";

const PORT = process.env.PORT || 8181;

class App {
  private app = express();

  constructor() {
    this.configure();
    this.router();
    this.errorHandler();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  private router() {
    this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
      return res
        .status(HttpStatus.OK)
        .send("<h1>Welcome to Indonesia Region API</h1>");
    });
  }

  private errorHandler() {
    this.app.use(errorCallback);
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Server Is Running on http://localhost:${PORT}`);
    });
  }
}
export default App;
