import {
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/common/constants/permissions/role.enum';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User login',
    example: 'aproveme',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9]+$/)
  login?: string;

  @ApiProperty({
    description: 'User password',
    example: 'aproveme',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(40)
  password?: string;

  @ApiProperty({
    description: 'User role',
    example: 'Admin',
    required: false,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
