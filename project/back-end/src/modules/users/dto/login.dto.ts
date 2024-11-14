import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User login', example: 'aproveme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9]+$/)
  login: string;

  @ApiProperty({ description: 'User password', example: 'aproveme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  password: string;
}
