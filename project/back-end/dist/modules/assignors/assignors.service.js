"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AssignorsService = class AssignorsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAssignorDto) {
        return this.prisma.assignor.create({
            data: { ...createAssignorDto },
        });
    }
    async findAll(search, page = 1, limit = 10) {
        const whereClause = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { document: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [assignors, total] = await Promise.all([
            this.prisma.assignor.findMany({
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    document: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.assignor.count({ where: whereClause }),
        ]);
        return {
            data: assignors,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        return this.prisma.assignor.findUniqueOrThrow({
            where: { id },
        });
    }
    async update(id, updateAssignorDto) {
        return this.prisma.assignor.update({
            where: { id },
            data: { ...updateAssignorDto },
        });
    }
    async remove(id) {
        return this.prisma.assignor.delete({
            where: { id },
        });
    }
};
exports.AssignorsService = AssignorsService;
exports.AssignorsService = AssignorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignorsService);
//# sourceMappingURL=assignors.service.js.map