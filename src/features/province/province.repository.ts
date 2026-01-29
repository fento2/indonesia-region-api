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
        omit: {
          id: true,
          createdAt: true,
          updatedAt: true,
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

    const include: any = {};

    if (includeQuery) {
      if (includeQuery.includes("regencies")) {
        include.regencies = {
          orderBy: { code: "asc" },
          omit: {
            id: true,
            provinceId: true,
            createdAt: true,
            updatedAt: true,
          },
          include: {},
        };

        if (includeQuery.includes("districts")) {
          include.regencies.include.districts = {
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
            include.regencies.include.districts.include.villages = {
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
    }

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return await prisma.provinces.findUnique({
      where,
      include,
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}
export default ProvinceRepository;
