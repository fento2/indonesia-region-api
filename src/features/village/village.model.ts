import { z } from "zod";

const includeEnum = z.enum(["district", "regency", "province"]);

export const villageSchema = z.object({
  search: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  sortBy: z.enum(["name", "createdAt", "code"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  code: z.string().min(1).optional(),
  id: z.string().min(1).optional(),
  postalCode: z.string().optional(),
  include: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val.split(",").map((v) => v.trim());
    })
    .pipe(z.array(includeEnum).optional()),
});

export type VillageQueryType = z.infer<typeof villageSchema>;
