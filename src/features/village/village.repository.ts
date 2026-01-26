import { prisma } from "../../configs/prisma";
import { VillageQueryType } from "./village.model";

class VillageRepository {
  getVillages = async (params: VillageQueryType) => {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "code",
      sortOrder = "asc",
      postalCode,
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
        {
          postalCode: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (postalCode) where.postalCode = postalCode;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      await prisma.villages.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      await prisma.villages.count({
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

  getVillageByCode = async (params: VillageQueryType) => {
    const { code, include: includeQuery } = params;
    const include: any = includeQuery
      ? {
          district: includeQuery.includes("district")
            ? {
                include: {
                  regency: includeQuery.includes("regency")
                    ? includeQuery.includes("province")
                      ? { include: { province: true } }
                      : true
                    : undefined,
                },
              }
            : undefined,
        }
      : undefined;

    return await prisma.villages.findUnique({
      where: { code },
      include,
    });
  };

  getVillageById = async (params: VillageQueryType) => {
    const { id, include: includeQuery } = params;
    const include: any = includeQuery
      ? {
          district: includeQuery.includes("district")
            ? {
                include: {
                  regency: includeQuery.includes("regency")
                    ? includeQuery.includes("province")
                      ? { include: { province: true } }
                      : true
                    : undefined,
                },
              }
            : undefined,
        }
      : undefined;

    return await prisma.villages.findUnique({
      where: { id },
      include,
    });
  };
}

export default VillageRepository;
