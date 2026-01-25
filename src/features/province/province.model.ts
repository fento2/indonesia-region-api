import { z } from "zod";
import ProvinceRepository from "./province.repository";

export const provinceSchema = z.object({
  search: z.string().min(1).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  sortBy: z.enum(["name", "createdAt", "code"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  code: z.string().min(1).optional(),
  id: z.string().min(1).optional(),
});

export type ProvinceQuery = z.infer<typeof provinceSchema>;

export type GetProvinceType = Awaited<
  ReturnType<
    | ProvinceRepository["getProvinceById"]
    | ProvinceRepository["getProvinceByCode"]
  >
>;
