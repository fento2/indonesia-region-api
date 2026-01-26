import { z } from "zod";

const includeEnum = z.enum(["province", "districts", "villages"]);

export const regencySchema = z.object({
  search: z.string().min(1).optional(),
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

export type RegencyQueryType = z.infer<typeof regencySchema>;
