import { Module } from '@nestjs/common';
import { BatchsService } from './batchs.service';
import { BatchsController } from './batchs.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [BatchsController],
  providers: [BatchsService, PrismaService],
  exports: [BatchsService],
})
export class BatchsModule {}
