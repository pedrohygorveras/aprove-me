import { BadRequestException, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { BatchsService } from '../batchs/batchs.service';

@Injectable()
export class PayablesService {
  private readonly BATCH_LIMIT = 10000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly amqpConnection: AmqpConnection,
    private readonly batchsService: BatchsService,
  ) {}

  async createBatchWithQueue(batchItems: CreatePayableDto[]) {
    const totalItems = batchItems.length;

    if (totalItems > this.BATCH_LIMIT) {
      throw new BadRequestException(
        `Batch size cannot exceed ${this.BATCH_LIMIT} payables`,
      );
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
            { assignorId: { contains: search } },
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
