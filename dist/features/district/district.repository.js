"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../configs/prisma");
class DistrictRepository {
    constructor() {
        this.getDistricts = (params) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, search, sortBy = "code", sortOrder = "asc", } = params;
            const where = {};
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
            const [data, total] = yield Promise.all([
                yield prisma_1.prisma.districts.findMany({
                    skip,
                    take: limit,
                    where,
                    orderBy: {
                        [sortBy]: sortOrder,
                    },
                }),
                yield prisma_1.prisma.districts.count({
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
        });
        this.getDetailDistrictByCode = (params) => __awaiter(this, void 0, void 0, function* () {
            const { code, include: includeQuery } = params;
            const include = includeQuery
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
            return yield prisma_1.prisma.districts.findUnique({
                where: {
                    code,
                },
                include,
            });
        });
        this.getDetailDistrictById = (params) => __awaiter(this, void 0, void 0, function* () {
            const { id, include: includeQuery } = params;
            const include = includeQuery
                ? {
                    regency: includeQuery.includes("regency")
                        ? {
                            include: includeQuery.includes("province")
                                ? {
                                    province: undefined,
                                }
                                : undefined,
                        }
                        : undefined,
                    villages: includeQuery.includes("villages")
                        ? {
                            orderBy: {
                                code: "asc",
                            },
                        }
                        : undefined,
                }
                : undefined;
            return yield prisma_1.prisma.districts.findUnique({
                where: {
                    id,
                },
                include,
            });
        });
    }
}
exports.default = DistrictRepository;
