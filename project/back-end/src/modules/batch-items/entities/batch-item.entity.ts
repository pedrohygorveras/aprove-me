import { ApiProperty } from '@nestjs/swagger';

export class BatchItemEntity {
  @ApiProperty({
    description: 'Unique identifier of the batch item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'UUID of the batch associated with this item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  batchId: string;

  @ApiProperty({
    description: 'UUID of the payable associated with this item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  payableId: string;

  @ApiProperty({ description: 'Status of the batch item', example: 'pending' })
  status: string;

  @ApiProperty({
    description: 'Number of retry attempts for processing this item',
    example: 0,
  })
  retryCount: number;

  @ApiProperty({
    description: 'Date when the batch item was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the batch item was last updated',
    example: '2024-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
