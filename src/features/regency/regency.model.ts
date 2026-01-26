import { z } from "zod";
import { RegencyType } from "../../../prisma/generated";

const includeEnum = z.enum(["province", "districts", "villages"]);
const type = z
  .string()
  .optional()
  .transform((val) => {
    if (!val) return undefined;

    const upper = val.toUpperCase();

    if (upper === "KOTA") return RegencyType.KOTA;
    if (upper === "KABUPATEN" || upper === "KAB") return RegencyType.KABUPATEN;

    return undefined;
  });

export const regencySchema = z.object({
  search: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  sortBy: z.enum(["name", "createdAt", "code"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  code: z.string().min(1).optional(),
  id: z.string().min(1).optional(),
  type,
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
