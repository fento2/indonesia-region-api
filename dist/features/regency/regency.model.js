"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regencySchema = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../../generated/prisma");
const type = zod_1.z
    .string()
    .optional()
    .transform((val) => {
    if (!val)
        return undefined;
    const upper = val.toUpperCase();
    if (upper === "KOTA")
        return prisma_1.RegencyType.Kota;
    if (upper === "KABUPATEN" || upper === "KAB")
        return prisma_1.RegencyType.Kabupaten;
    return undefined;
});
exports.regencySchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    sortBy: zod_1.z.enum(["name", "createdAt", "code"]).optional(),
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
    code: zod_1.z.string().min(1).optional(),
    id: zod_1.z.string().min(1).optional(),
    type,
    include: zod_1.z
        .string()
        .optional()
        .transform((val) => {
        if (!val)
            return undefined;
        return val.split(",").map((v) => v.trim());
    }),
});
