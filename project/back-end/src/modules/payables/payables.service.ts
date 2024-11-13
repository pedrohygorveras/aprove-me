import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayablesService {
  constructor(private prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    return this.prisma.payable.create({
      data: {
        assignorId: createPayableDto.assignorId,
        value: createPayableDto.value,
        emissionDate: new Date(createPayableDto.emissionDate),
      },
    });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10) {
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

  findOne(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
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

  remove(id: string) {
    return this.prisma.payable.delete({
      where: { id },
    });
  }
}
