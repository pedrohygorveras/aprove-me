import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePayableDto {
  @ApiProperty({
    description: 'UUID of the payable',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsOptional()
  id: string;

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
}
