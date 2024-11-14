import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';

@Injectable()
export class PayableProcessor {
  private readonly logger = new Logger(PayableProcessor.name);

  constructor(private readonly prisma: PrismaService) {}

  @RabbitSubscribe({
    exchange: 'payablesExchange',
    routingKey: 'payable.create',
    queue: 'payablesQueue',
  })
  async handleProcessPayable(payableData: CreatePayableDto) {
    try {
      await this.createPayableRecord(payableData);
      this.logger.log(`Payable processed successfully: ${payableData.id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Processing skipped: ${error.message}`);
      } else {
        this.logger.error(`Error processing payable: ${error.message}`);
      }
    }
  }

  private async createPayableRecord(payableData: CreatePayableDto) {
    const assignorExists = await this.prisma.assignor.findUnique({
      where: { id: payableData.assignorId },
    });
    if (!assignorExists) {
      throw new NotFoundException(
        `Assignor with ID ${payableData.assignorId} does not exist`,
      );
    }

    await this.prisma.payable.create({
      data: {
        assignorId: payableData.assignorId,
        value: payableData.value,
        emissionDate: payableData.emissionDate,
      },
    });
  }
}
