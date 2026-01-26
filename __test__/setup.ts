import dotenv from "dotenv";
dotenv.config();
import { pool, prisma } from "../src/configs/prisma";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
  await pool.end();
});
