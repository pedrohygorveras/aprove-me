import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';
import {
  ASSIGNOR_NAME_REQUIRED,
  ASSIGNOR_NAME_MIN_LENGTH,
  ASSIGNOR_NAME_MAX_LENGTH,
  ASSIGNOR_EMAIL_REQUIRED,
  ASSIGNOR_EMAIL_MIN_LENGTH,
  ASSIGNOR_EMAIL_MAX_LENGTH,
  ASSIGNOR_EMAIL_INVALID,
  ASSIGNOR_PHONE_REQUIRED,
  ASSIGNOR_PHONE_MIN_LENGTH,
  ASSIGNOR_PHONE_MAX_LENGTH,
  ASSIGNOR_DOCUMENT_REQUIRED,
  ASSIGNOR_DOCUMENT_MIN_LENGTH,
  ASSIGNOR_DOCUMENT_MAX_LENGTH,
} from '../../common/constants/assignors/validation-messages';

export class CreateAssignorDto {
  /**
   * name
   */
  @IsString()
  @IsNotEmpty({
    message: ASSIGNOR_NAME_REQUIRED,
  })
  @MinLength(3, {
    message: ASSIGNOR_NAME_MIN_LENGTH,
  })
  @MaxLength(140, {
    message: ASSIGNOR_NAME_MAX_LENGTH,
  })
  readonly name: string;

  /**
   * email
   */
  @IsString()
  @IsNotEmpty({
    message: ASSIGNOR_EMAIL_REQUIRED,
  })
  @IsEmail(undefined, {
    message: ASSIGNOR_EMAIL_INVALID,
  })
  @MinLength(5, {
    message: ASSIGNOR_EMAIL_MIN_LENGTH,
  })
  @MaxLength(140, {
    message: ASSIGNOR_EMAIL_MAX_LENGTH,
  })
  readonly email: string;

  /**
   * phone
   */
  @IsString()
  @IsNotEmpty({
    message: ASSIGNOR_PHONE_REQUIRED,
  })
  @MinLength(11, {
    message: ASSIGNOR_PHONE_MIN_LENGTH,
  })
  @MaxLength(20, {
    message: ASSIGNOR_PHONE_MAX_LENGTH,
  })
  readonly phone: string;

  /**
   * document
   */
  @IsString()
  @IsNotEmpty({
    message: ASSIGNOR_DOCUMENT_REQUIRED,
  })
  @MinLength(11, {
    message: ASSIGNOR_DOCUMENT_MIN_LENGTH,
  })
  @MaxLength(30, {
    message: ASSIGNOR_DOCUMENT_MAX_LENGTH,
  })
  readonly document: string;
}
