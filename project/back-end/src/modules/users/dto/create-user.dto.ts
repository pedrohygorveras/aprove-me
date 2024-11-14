import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/common/constants/permissions/role.enum';

export class CreateUserDto {
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

  @ApiProperty({ description: 'User role', example: 'Admin' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
