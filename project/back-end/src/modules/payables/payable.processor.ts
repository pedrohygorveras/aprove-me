import { Injectable } from '@nestjs/common';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from '../../database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { BatchEntity } from '../batchs/entities/batch.entity';

interface HandleProcessPayableProps {
  payables: CreatePayableDto[];
  batch: BatchEntity;
}

@Injectable()
export class PayableProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @RabbitSubscribe({
    exchange: 'payablesExchange',
    routingKey: 'payable.create',
    queue: 'payablesQueue',
  })
  async handleProcessPayable(
    @RabbitPayload() payload: HandleProcessPayableProps,
  ) {
    return payload;
  }
}
