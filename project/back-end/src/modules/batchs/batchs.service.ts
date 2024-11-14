import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchsService {
  constructor(private prisma: PrismaService) {}

  async create(createBatchDto: CreateBatchDto) {
    return this.prisma.batch.create({
      data: {
        status: createBatchDto.status,
        totalSuccess: createBatchDto.totalSuccess || 0,
        totalFailed: createBatchDto.totalFailed || 0,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [batches, total] = await Promise.all([
      this.prisma.batch.findMany({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          status: true,
          totalSuccess: true,
          totalFailed: true,
          createdAt: true,
          updatedAt: true,
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

  findOne(id: string) {
    return this.prisma.batch.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBatchDto: UpdateBatchDto) {
    return this.prisma.batch.update({
      where: { id },
      data: {
        ...updateBatchDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.batch.delete({
      where: { id },
    });
  }
}
