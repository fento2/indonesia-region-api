import { prisma } from "../../configs/prisma";
import { HttpStatus } from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import { ExpressCbFn } from "../../types/shared";
import { sendResponse } from "../../utils/sendResponse";

class CronController {
  keepDbAlive: ExpressCbFn = async (req, res, next) => {
    try {
      const isVercelCron = req.headers["x-vercel-cron"];

      if (!isVercelCron) {
        throw new AppError("Unauthorized", HttpStatus.UNAUTHORIZED);
      }

      const resDb = await prisma.$queryRaw`SELECT 1`;

      return sendResponse(
        res,
        "DB pinged successfully",
        HttpStatus.OK,
        undefined,
        undefined,
      );
    } catch (error) {
      next(error);
    }
  };
}
export default CronController;
