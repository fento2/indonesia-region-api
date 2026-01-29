import { prisma } from "../../configs/prisma";
import { DistrictQueryType } from "./district.model";

class DistrictRepository {
  getDistricts = async (params: DistrictQueryType) => {
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
      await prisma.districts.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
        omit: {
          id: true,
          regencyId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      await prisma.districts.count({
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

  getDetailDistrict = async (params: DistrictQueryType) => {
    const { code, id, include: includeQuery } = params;

    const where: any = {};
    const include: any = {};

    if (includeQuery) {
      if (includeQuery.includes("regency")) {
        include.regency = {
          omit: {
            id: true,
            provinceId: true,
            createdAt: true,
            updatedAt: true,
          },
        };

        if (includeQuery.includes("province")) {
          include.regency.include = {
            province: {
              omit: {
                id: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          };
        }
      }

      if (includeQuery.includes("villages")) {
        include.villages = {
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

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return await prisma.districts.findUnique({
      where,
      include,
      omit: {
        id: true,
        regencyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}

export default DistrictRepository;
