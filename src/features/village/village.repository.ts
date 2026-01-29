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
        omit: {
          id: true,
          districtId: true,
          createdAt: true,
          updatedAt: true,
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

  getDetailVillage = async (params: VillageQueryType) => {
    const { code, id, include: includeQuery } = params;

    const where: any = {};

    const include: any = {};

    if (includeQuery) {
      if (includeQuery.includes("district")) {
        include.district = {
          include: {},
          omit: { id: true, regencyId: true, createdAt: true, updatedAt: true },
        };

        if (includeQuery.includes("regency")) {
          include.district.include.regency = {
            include: {},
            omit: {
              id: true,
              provinceId: true,
              createdAt: true,
              updatedAt: true,
            },
          };

          if (includeQuery.includes("province")) {
            include.district.include.regency.include.province = {
              omit: { id: true, createdAt: true, updatedAt: true },
            };
          }
        }
      }
    }

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return await prisma.villages.findUnique({
      where,
      include,
      omit: {
        id: true,
        districtId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}

export default VillageRepository;
