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
exports.PayablesService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const prisma_service_1 = require("../../database/prisma.service");
const batchs_service_1 = require("../batchs/batchs.service");
let PayablesService = class PayablesService {
    constructor(prisma, amqpConnection, batchsService) {
        this.prisma = prisma;
        this.amqpConnection = amqpConnection;
        this.batchsService = batchsService;
        this.BATCH_LIMIT = 10000;
    }
    async createBatchWithQueue(batchItems) {
        const totalItems = batchItems.length;
        if (totalItems > this.BATCH_LIMIT) {
            throw new common_1.BadRequestException(`Batch size cannot exceed ${this.BATCH_LIMIT} payables`);
        }
        const batch = await this.batchsService.create({
            processing: true,
            totalSuccess: 0,
            totalFailed: 0,
            total: totalItems,
        });
        await this.amqpConnection.publish('payablesExchange', 'payable.create', {
            payables: batchItems,
            batch,
        });
        return { message: 'Batch received and queued successfully' };
    }
    async create(createPayableDto) {
        return this.prisma.payable.create({
            data: {
                assignorId: createPayableDto.assignorId,
                value: createPayableDto.value,
                emissionDate: new Date(createPayableDto.emissionDate),
            },
        });
    }
    async findAll(search, page = 1, limit = 10) {
        const whereClause = search
            ? {
                OR: [
                    { assignorId: { contains: search, mode: 'insensitive' } },
                    { value: { equals: parseFloat(search) || undefined } },
                ],
            }
            : {};
        const [payables, total] = await Promise.all([
            this.prisma.payable.findMany({
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    assignorId: true,
                    value: true,
                    emissionDate: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.payable.count({ where: whereClause }),
        ]);
        return {
            data: payables,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    findOne(id) {
        return this.prisma.payable.findUnique({
            where: { id },
        });
    }
    update(id, updatePayableDto) {
        return this.prisma.payable.update({
            where: { id },
            data: {
                ...updatePayableDto,
                emissionDate: updatePayableDto.emissionDate
                    ? new Date(updatePayableDto.emissionDate)
                    : undefined,
            },
        });
    }
    remove(id) {
        return this.prisma.payable.delete({
            where: { id },
        });
    }
};
exports.PayablesService = PayablesService;
exports.PayablesService = PayablesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_rabbitmq_1.AmqpConnection,
        batchs_service_1.BatchsService])
], PayablesService);
//# sourceMappingURL=payables.service.js.map