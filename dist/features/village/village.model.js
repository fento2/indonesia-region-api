"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.villageSchema = void 0;
const zod_1 = require("zod");
const includeEnum = zod_1.z.enum(["district", "regency", "province"]);
exports.villageSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    sortBy: zod_1.z.enum(["name", "createdAt", "code"]).optional(),
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
    code: zod_1.z.string().min(1).optional(),
    id: zod_1.z.string().min(1).optional(),
    postalCode: zod_1.z.string().optional(),
    include: zod_1.z
        .string()
        .optional()
        .transform((val) => {
        if (!val)
            return undefined;
        return val.split(",").map((v) => v.trim());
    })
        .pipe(zod_1.z.array(includeEnum).optional()),
});
