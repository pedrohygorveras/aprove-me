import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignorDto {
  @ApiProperty({
    description: 'Name of the assignor',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(140)
  readonly name: string;

  @ApiProperty({
    description: 'Email of the assignor',
    example: 'johndoe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(140)
  readonly email: string;

  @ApiProperty({
    description: 'Phone number of the assignor',
    example: '+12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(20)
  readonly phone: string;

  @ApiProperty({
    description: 'Document identifier of the assignor',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(30)
  readonly document: string;
}
