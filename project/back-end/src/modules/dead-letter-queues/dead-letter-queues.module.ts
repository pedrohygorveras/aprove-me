import { Module } from '@nestjs/common';
import { DeadLetterQueuesService } from './dead-letter-queues.service';
import { DeadLetterQueuesController } from './dead-letter-queues.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [DeadLetterQueuesController],
  providers: [DeadLetterQueuesService, PrismaService],
  exports: [DeadLetterQueuesService],
})
export class DeadLetterQueuesModule {}
