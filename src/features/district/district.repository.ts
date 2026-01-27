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

    const include: any = includeQuery
      ? {
          regency: includeQuery.includes("regency")
            ? includeQuery.includes("province")
              ? { include: { province: true } }
              : true
            : undefined,

          villages: includeQuery.includes("villages")
            ? { orderBy: { code: "asc" } }
            : undefined,
        }
      : undefined;

    if (!code && !id) return null;

    if (id) where.id = id;
    else if (code) where.code = code;

    return await prisma.districts.findUnique({
      where,
      include,
    });
  };
}

export default DistrictRepository;
