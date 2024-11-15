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
exports.DeadLetterQueuesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let DeadLetterQueuesService = class DeadLetterQueuesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDeadLetterQueueDto) {
        return this.prisma.deadLetterQueue.create({
            data: {
                ...createDeadLetterQueueDto,
            },
        });
    }
    async findAll(search, page = 1, limit = 10) {
        const whereClause = search
            ? { batchId: { contains: search, mode: 'insensitive' } }
            : {};
        const [deadLetterQueues, total] = await Promise.all([
            this.prisma.deadLetterQueue.findMany({
                where: whereClause,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.deadLetterQueue.count({ where: whereClause }),
        ]);
        return {
            data: deadLetterQueues,
            total,
            total_pages: Math.ceil(total / limit),
        };
    }
    findOne(id) {
        return this.prisma.deadLetterQueue.findUnique({
            where: { id },
        });
    }
    update(id, updateDeadLetterQueueDto) {
        return this.prisma.deadLetterQueue.update({
            where: { id },
            data: {
                ...updateDeadLetterQueueDto,
            },
        });
    }
    remove(id) {
        return this.prisma.deadLetterQueue.delete({
            where: { id },
        });
    }
};
exports.DeadLetterQueuesService = DeadLetterQueuesService;
exports.DeadLetterQueuesService = DeadLetterQueuesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeadLetterQueuesService);
//# sourceMappingURL=dead-letter-queues.service.js.map