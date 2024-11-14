import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayableDto {
  @ApiProperty({
    description: 'UUID of the assignor',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID('4')
  @IsOptional()
  assignorId?: string;

  @ApiProperty({
    description: 'Value of the payable',
    example: 1000.0,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  value?: number;

  @ApiProperty({
    description: 'Emission date of the payable',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  emissionDate?: Date;
}
