import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(140)
  readonly name: string;

  @ApiProperty({ description: 'User login', example: 'aproveme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9]+$/)
  login: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  @MaxLength(140)
  readonly email: string;

  @ApiProperty({ description: 'User password', example: 'aproveme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
