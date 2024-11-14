import { PartialType } from '@nestjs/swagger';
import { CreateDeadLetterQueueDto } from './create-dead-letter-queue.dto';

export class UpdateDeadLetterQueueDto extends PartialType(
  CreateDeadLetterQueueDto,
) {}
