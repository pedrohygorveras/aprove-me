import {
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { UserRole } from 'src/modules/common/constants/users/user-role.enum';
import {
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  LOGIN_PATTERN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  ROLE_INVALID,
} from '../../common/constants/users/validation-messages';

export class UpdateUserDto {
  /**
   * login
   */
  @IsString()
  @IsOptional()
  @MinLength(4, {
    message: LOGIN_MIN_LENGTH,
  })
  @MaxLength(50, {
    message: LOGIN_MAX_LENGTH,
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: LOGIN_PATTERN,
  })
  login?: string;

  /**
   * password
   */
  @IsString()
  @IsOptional()
  @MinLength(8, {
    message: PASSWORD_MIN_LENGTH,
  })
  @MaxLength(32, {
    message: PASSWORD_MAX_LENGTH,
  })
  password?: string;

  /**
   * role
   */
  @IsEnum(UserRole, {
    message: ROLE_INVALID(Object.values(UserRole).join(', ')),
  })
  @IsOptional()
  role?: UserRole;
}
