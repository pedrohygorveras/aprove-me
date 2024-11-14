import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBatchItemDto } from './dto/create-batch-item.dto';
import { UpdateBatchItemDto } from './dto/update-batch-item.dto';

@Injectable()
export class BatchItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createBatchItemDto: CreateBatchItemDto) {
    return this.prisma.batchItem.create({
      data: {
        batchId: createBatchItemDto.batchId,
        payableId: createBatchItemDto.payableId,
        status: createBatchItemDto.status,
        retryCount: createBatchItemDto.retryCount || 0,
      },
    });
  }

  async findAll(batchId?: string, page: number = 1, limit: number = 10) {
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

  findOne(id: string) {
    return this.prisma.batchItem.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBatchItemDto: UpdateBatchItemDto) {
    return this.prisma.batchItem.update({
      where: { id },
      data: {
        ...updateBatchItemDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.batchItem.delete({
      where: { id },
    });
  }
}
