import { ApiProperty } from '@nestjs/swagger';

export class DeadLetterQueueEntity {
  @ApiProperty({
    description: 'Unique identifier of the dead letter queue item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'UUID of the payable associated with this dead letter item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  batchId: string;

  @ApiProperty({
    description: 'UUID of the assignor associated with the payable',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  assignorId: string;

  @ApiProperty({ description: 'Value of the payable', example: 1000.0 })
  value: number;

  @ApiProperty({
    description: 'Emission date of the payable',
    example: '2024-01-01T00:00:00Z',
  })
  emissionDate: Date;

  @ApiProperty({
    description: 'Error message associated with this dead letter item',
    example: 'Failed to process the payable due to network timeout.',
  })
  errorMessage: string;

  @ApiProperty({
    description: 'Date when the dead letter item was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the dead letter item was last updated',
    example: '2024-01-02T00:00:00Z',
  })
  updatedAt: Date;
}
