import { ApiProperty } from '@nestjs/swagger';

export class BatchEntity {
  @ApiProperty({
    description: 'Unique identifier of the batch',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Status of the batch',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Total number of successful items in the batch',
    example: 0,
  })
  totalSuccess: number;

  @ApiProperty({
    description: 'Total number of failed items in the batch',
    example: 0,
  })
  totalFailed: number;

  @ApiProperty({
    description: 'Date when the batch was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the batch was last updated',
    example: '2024-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
