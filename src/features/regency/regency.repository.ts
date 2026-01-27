import { prisma } from "../../configs/prisma";
import { RegencyQueryType } from "./regency.model";

class RegencyRepository {
  getRegencies = async (params: RegencyQueryType) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "code",
      sortOrder = "asc",
      type,
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

    if (type) where.type = type;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      await prisma.regencies.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),

      await prisma.regencies.count({
        where,
      }),
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

  getDetailRegency = async (params: RegencyQueryType) => {
    const { id, code, include: includeQuery } = params;

    const where: any = {};

    const include: any = includeQuery
      ? {
          province: includeQuery.includes("province"),
          districts: includeQuery.includes("districts")
            ? {
                include: {
                  villages: includeQuery.includes("villages")
                    ? {
                        orderBy: {
                          code: "asc",
                        },
                      }
                    : false,
                },
                orderBy: {
                  code: "asc",
                },
              }
            : false,
        }
      : undefined;

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return prisma.regencies.findUnique({
      where,
      include,
    });
  };
}
export default RegencyRepository;
