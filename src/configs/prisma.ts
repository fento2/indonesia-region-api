import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../generated/prisma";

const isDev = process.env.NODE_ENV === "development";

export const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: isDev ? ["query", "info", "warn", "error"] : ["error"],
});
