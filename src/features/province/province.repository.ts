import { prisma } from "../../configs/prisma";
import { ProvinceQuery } from "./province.model";

class ProvinceRepository {
  getProvinceByCode = async (code: string) => {
    return await prisma.provinces.findUnique({
      where: { code },
      include: {
        regencies: {
          include: {
            districts: {
              include: {
                villages: true,
              },
            },
          },
        },
      },
    });
  };

  getProvinceById = async (id: string) => {
    return await prisma.provinces.findUnique({
      where: { id },
      include: {
        regencies: {
          include: {
            districts: {
              include: {
                villages: true,
              },
            },
          },
        },
      },
    });
  };

  async getAllProvinces(params: ProvinceQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = "code",
      sortOrder = "desc",
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
        toatlPage: Math.ceil(total / limit),
      },
    };
  }
}
export default ProvinceRepository;
