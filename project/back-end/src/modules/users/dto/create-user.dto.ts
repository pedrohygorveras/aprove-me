import {
  IsEnum,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { UserRole } from 'src/modules/common/constants/users/user-role.enum';
import {
  LOGIN_REQUIRED,
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  LOGIN_PATTERN,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  ROLE_REQUIRED,
  ROLE_INVALID,
} from '../../common/constants/users/validation-messages';

export class CreateUserDto {
  /**
   * login
   */
  @IsString()
  @IsNotEmpty({
    message: LOGIN_REQUIRED,
  })
  @MinLength(4, {
    message: LOGIN_MIN_LENGTH,
  })
  @MaxLength(50, {
    message: LOGIN_MAX_LENGTH,
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: LOGIN_PATTERN,
  })
  login: string;

  /**
   * password
   */
  @IsString()
  @IsNotEmpty({
    message: PASSWORD_REQUIRED,
  })
  @MinLength(8, {
    message: PASSWORD_MIN_LENGTH,
  })
  @MaxLength(32, {
    message: PASSWORD_MAX_LENGTH,
  })
  password: string;

  /**
   * role
   */
  @IsEnum(UserRole, {
    message: ROLE_INVALID(Object.values(UserRole).join(', ')),
  })
  @IsNotEmpty({
    message: ROLE_REQUIRED,
  })
  role: UserRole;
}
