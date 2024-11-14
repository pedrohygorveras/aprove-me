import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDeadLetterQueueDto {
  @ApiProperty({
    description: 'UUID of the payable associated with this dead letter item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  payableId: string;

  @ApiProperty({
    description: 'Error message associated with this dead letter item',
    example: 'Failed to process the payable due to network timeout.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  errorMessage: string;
}
