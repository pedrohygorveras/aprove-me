import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateBatchItemDto {
  @ApiProperty({
    description: 'UUID of the batch associated with this item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  batchId: string;

  @ApiProperty({
    description: 'UUID of the payable associated with this item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  payableId: string;

  @ApiProperty({ description: 'Status of the batch item', example: 'pending' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Number of retry attempts for processing this item',
    example: 0,
  })
  @IsInt()
  @Min(0)
  retryCount: number = 0;
}
