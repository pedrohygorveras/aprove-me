import { Module } from '@nestjs/common';
import { BatchItemsService } from './batch-items.service';
import { BatchItemsController } from './batch-items.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [BatchItemsController],
  providers: [BatchItemsService, PrismaService],
  exports: [BatchItemsService],
})
export class BatchItemsModule {}
