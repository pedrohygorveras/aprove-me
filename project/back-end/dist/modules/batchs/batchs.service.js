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
exports.BatchsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let BatchsService = class BatchsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBatchDto) {
        return this.prisma.batch.create({
            data: {
                ...createBatchDto,
            },
        });
    }
    async findAll(page = 1, limit = 10) {
        const [batches, total] = await Promise.all([
            this.prisma.batch.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.batch.count(),
        ]);
        return {
            data: batches,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    findOne(id) {
        return this.prisma.batch.findUnique({
            where: { id },
        });
    }
    update(id, updateBatchDto) {
        return this.prisma.batch.update({
            where: { id },
            data: {
                ...updateBatchDto,
            },
        });
    }
    remove(id) {
        return this.prisma.batch.delete({
            where: { id },
        });
    }
};
exports.BatchsService = BatchsService;
exports.BatchsService = BatchsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BatchsService);
//# sourceMappingURL=batchs.service.js.map