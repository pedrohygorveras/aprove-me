import { PartialType } from '@nestjs/swagger';
import { CreateBatchItemDto } from './create-batch-item.dto';

export class UpdateBatchItemDto extends PartialType(CreateBatchItemDto) {}
