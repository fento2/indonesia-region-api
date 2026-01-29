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
class RegencyRepository {
    constructor() {
        this.getRegencies = (params) => __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, search, sortBy = "code", sortOrder = "asc", type, } = params;
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
            if (type)
                where.type = type;
            const skip = (page - 1) * limit;
            const [data, total] = yield Promise.all([
                yield prisma_1.prisma.regencies.findMany({
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
                yield prisma_1.prisma.regencies.count({
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
        this.getDetailRegency = (params) => __awaiter(this, void 0, void 0, function* () {
            const { id, code, include: includeQuery } = params;
            const where = {};
            const include = {};
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
            if (!code && !id)
                return null;
            if (id)
                where.id = id;
            else if (code)
                where.code = code;
            return prisma_1.prisma.regencies.findUnique({
                where,
                include,
                omit: {
                    id: true,
                    provinceId: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });
    }
}
exports.default = RegencyRepository;
