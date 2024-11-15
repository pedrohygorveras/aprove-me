import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from '../../database/prisma.service';
import { PayableProcessor } from './payable.processor';
import { UsersService } from '../users/users.service';
import { DeadLetterQueuesService } from '../dead-letter-queues/dead-letter-queues.service';
import { EmailService } from './email.service';
import { BatchsService } from '../batchs/batchs.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'payablesExchange',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URI,
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [PayablesController],
  providers: [
    PayablesService,
    PrismaService,
    PayableProcessor,
    DeadLetterQueuesService,
    EmailService,
    UsersService,
    BatchsService,
  ],
  exports: [PayablesService],
})
export class PayablesModule {}
