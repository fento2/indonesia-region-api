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
        omit: {
          id: true,
          provinceId: true,
          createdAt: true,
          updatedAt: true,
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

    const include: any = {};

    if (includeQuery) {
      if (includeQuery.includes("province")) {
        include.province = {
          omit: {
            id: true,
            createdAt: true,
            updatedAt: true,
          },
        };
      }

      if (includeQuery.includes("districts")) {
        include.districts = {
          orderBy: { code: "asc" },
          omit: {
            id: true,
            regencyId: true,
            createdAt: true,
            updatedAt: true,
          },
          include: {},
        };

        if (includeQuery.includes("villages")) {
          include.districts.include.villages = {
            orderBy: { code: "asc" },
            omit: {
              id: true,
              districtId: true,
              createdAt: true,
              updatedAt: true,
            },
          };
        }
      }
    }

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return prisma.regencies.findUnique({
      where,
      include,
      omit: {
        id: true,
        provinceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}
export default RegencyRepository;
