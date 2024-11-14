import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateBatchDto {
  @ApiProperty({
    description: 'UUID of the batch',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Status of the batch',
    example: 'pending',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Total number of successful items in the batch',
    example: 0,
  })
  @IsInt()
  @Min(0)
  totalSuccess: number = 0;

  @ApiProperty({
    description: 'Total number of failed items in the batch',
    example: 0,
  })
  @IsInt()
  @Min(0)
  totalFailed: number = 0;
}
