import { z } from "zod";

const includeEnum = z.enum(["regencies", "districts", "villages"]);

export const provinceSchema = z.object({
  search: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  sortBy: z.enum(["name", "createdAt", "code"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  code: z.string().min(1).optional(),
  id: z.string().min(1).optional(),
  include: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val.split(",").map((v) => v.trim());
    })
    .pipe(z.array(includeEnum).optional()),
});

export type ProvinceQueryType = z.infer<typeof provinceSchema>;
