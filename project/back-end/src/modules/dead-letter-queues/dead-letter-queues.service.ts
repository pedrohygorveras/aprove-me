import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateDeadLetterQueueDto } from './dto/create-dead-letter-queue.dto';
import { UpdateDeadLetterQueueDto } from './dto/update-dead-letter-queue.dto';

@Injectable()
export class DeadLetterQueuesService {
  constructor(private prisma: PrismaService) {}

  async create(createDeadLetterQueueDto: CreateDeadLetterQueueDto) {
    return this.prisma.deadLetterQueue.create({
      data: {
        payableId: createDeadLetterQueueDto.payableId,
        errorMessage: createDeadLetterQueueDto.errorMessage,
      },
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
    const whereClause = search
      ? { payableId: { contains: search, mode: 'insensitive' } }
      : {};

    const [deadLetterQueues, total] = await Promise.all([
      this.prisma.deadLetterQueue.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          payableId: true,
          errorMessage: true,
          createdAt: true,
          updatedAt: true,
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

  findOne(id: string) {
    return this.prisma.deadLetterQueue.findUnique({
      where: { id },
    });
  }

  update(id: string, updateDeadLetterQueueDto: UpdateDeadLetterQueueDto) {
    return this.prisma.deadLetterQueue.update({
      where: { id },
      data: {
        ...updateDeadLetterQueueDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.deadLetterQueue.delete({
      where: { id },
    });
  }
}
