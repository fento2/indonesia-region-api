import { PrismaClient } from "../../prisma/generated";

const isDev = process.env.NODE_ENV === "development";

export const prisma = new PrismaClient({
  log: isDev ? ["query", "info", "warn", "error"] : ["error"],
});
