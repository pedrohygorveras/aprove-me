import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { EmailService } from './email.service';
import { DeadLetterQueuesService } from '../dead-letter-queues/dead-letter-queues.service';

@Injectable()
export class PayablesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly amqpConnection: AmqpConnection,
    private readonly deadLetterService: DeadLetterQueuesService,
    private readonly emailService: EmailService,
  ) {}

  async enqueueBatch(batch: CreatePayableDto[]) {
    const results = [];

    for (const payable of batch) {
      try {
        await this.enqueuePayable(payable);
        results.push({ id: payable.id, status: 'queued' });
      } catch (error) {
        results.push({
          id: payable.id,
          status: 'error',
          message: error.message,
        });
      }
    }

    return { message: 'Batch received', results };
  }

  private async enqueuePayable(payable: CreatePayableDto, retryCount = 0) {
    try {
      await this.amqpConnection.publish(
        'payablesExchange',
        'payable.create',
        payable,
      );
    } catch (error) {
      if (retryCount < 4) {
        await this.enqueuePayable(payable, retryCount + 1);
      } else {
        await this.moveToDeadLetter(payable, error.message);
      }
    }
  }

  private async moveToDeadLetter(
    payable: CreatePayableDto,
    errorMessage: string,
  ) {
    await this.deadLetterService.create({
      payableId: payable.id,
      errorMessage,
    });

    const message = `Payable ID ${payable.id} failed after 4 retries and has been moved to the dead letter queue.`;
    await this.emailService.notifyUsersByRoles(message, ['Admin', 'Operator']);
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
