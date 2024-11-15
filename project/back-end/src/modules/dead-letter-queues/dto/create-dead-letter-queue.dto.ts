import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateDeadLetterQueueDto {
  @ApiProperty({
    description: 'UUID of the batch associated with this dead letter item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  batchId: string;

  @ApiProperty({
    description: 'UUID of the assignor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  assignorId: string;

  @ApiProperty({
    description: 'Value of the payable',
    example: 1000.0,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  value: number;

  @ApiProperty({
    description: 'Emission date of the payable',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  emissionDate: Date;

  @ApiProperty({
    description: 'Error message associated with this dead letter item',
    example: 'Failed to process the payable due to network timeout.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  errorMessage: string;
}
