import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateBatchDto {
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
