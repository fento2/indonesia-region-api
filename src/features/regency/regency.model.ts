import { z } from "zod";
import { RegencyType } from "../../../generated/prisma";

const type = z
  .string()
  .optional()
  .transform((val) => {
    if (!val) return undefined;

    const upper = val.toUpperCase();

    if (upper === "KOTA") return RegencyType.Kota;
    if (upper === "KABUPATEN" || upper === "KAB") return RegencyType.Kabupaten;

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
    }),
});

export type RegencyQueryType = z.infer<typeof regencySchema>;
