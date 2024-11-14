import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorsModule } from './modules/assignors/assignors.module';
import { PayablesModule } from './modules/payables/payables.module';
import { BatchsModule } from './modules/batchs/batchs.module';
import { BatchItemsModule } from './modules/batch-items/batch-items.module';
import { DeadLetterQueuesModule } from './modules/dead-letter-queues/dead-letter-queues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    AssignorsModule,
    PayablesModule,
    BatchsModule,
    BatchItemsModule,
    DeadLetterQueuesModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
