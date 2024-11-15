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
exports.BatchItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let BatchItemsService = class BatchItemsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBatchItemDto) {
        return this.prisma.batchItem.create({
            data: {
                batchId: createBatchItemDto.batchId,
                payableId: createBatchItemDto.payableId,
                status: createBatchItemDto.status,
                retryCount: createBatchItemDto.retryCount || 0,
            },
        });
    }
    async findAll(batchId, page = 1, limit = 10) {
        const whereClause = batchId ? { batchId } : {};
        const [batchItems, total] = await Promise.all([
            this.prisma.batchItem.findMany({
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    batchId: true,
                    payableId: true,
                    status: true,
                    retryCount: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.batchItem.count({ where: whereClause }),
        ]);
        return {
            data: batchItems,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    findOne(id) {
        return this.prisma.batchItem.findUnique({
            where: { id },
        });
    }
    update(id, updateBatchItemDto) {
        return this.prisma.batchItem.update({
            where: { id },
            data: {
                ...updateBatchItemDto,
            },
        });
    }
    remove(id) {
        return this.prisma.batchItem.delete({
            where: { id },
        });
    }
};
exports.BatchItemsService = BatchItemsService;
exports.BatchItemsService = BatchItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BatchItemsService);
//# sourceMappingURL=batch-items.service.js.map