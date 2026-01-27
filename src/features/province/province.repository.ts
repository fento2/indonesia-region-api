import { prisma } from "../../configs/prisma";
import { ProvinceQueryType } from "./province.model";

class ProvinceRepository {
  getProvinces = async (params: ProvinceQueryType) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "code",
      sortOrder = "asc",
    } = params;

    const where: any = {};
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          code: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      await prisma.provinces.findMany({
        take: limit,
        skip,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),

      await prisma.provinces.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  };

  getDetailProvince = async (params: ProvinceQueryType) => {
    const { id, code, include: includeQuery } = params;

    const where: any = {};

    const include: any = includeQuery
      ? {
          regencies: includeQuery.includes("regencies")
            ? {
                include: {
                  districts: includeQuery.includes("districts")
                    ? {
                        include: {
                          villages: includeQuery.includes("villages")
                            ? {
                                orderBy: { code: "asc" },
                              }
                            : undefined,
                        },
                        orderBy: { code: "asc" },
                      }
                    : undefined,
                },
                orderBy: { code: "asc" },
              }
            : undefined,
        }
      : undefined;

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return await prisma.provinces.findUnique({
      where,
      include,
    });
  };
}
export default ProvinceRepository;
