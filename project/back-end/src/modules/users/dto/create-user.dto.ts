import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/constants/permissions/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(140)
  readonly name: string;

  @ApiProperty({ description: 'Username', example: 'aproveme' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9]+$/)
  username: string;

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

  @ApiProperty({ description: 'User role', example: 'Admin' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
