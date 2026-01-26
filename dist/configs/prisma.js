"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.pool = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const prisma_1 = require("../../generated/prisma");
const isDev = process.env.NODE_ENV === "development";
exports.pool = new pg_1.Pool({
    connectionString: process.env["DATABASE_URL"],
});
const adapter = new adapter_pg_1.PrismaPg(exports.pool);
exports.prisma = new prisma_1.PrismaClient({
    adapter,
    log: isDev ? ["query", "info", "warn", "error"] : ["error"],
});
