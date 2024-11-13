import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import {
  PAYABLE_ASSIGNOR_ID_REQUIRED,
  PAYABLE_ASSIGNOR_ID_INVALID,
  PAYABLE_VALUE_REQUIRED,
  PAYABLE_VALUE_INVALID,
  PAYABLE_EMISSION_DATE_REQUIRED,
  PAYABLE_EMISSION_DATE_INVALID,
} from '../../common/constants/payables/validation-messages';

export class CreatePayableDto {
  /**
   * assignorId
   */
  @IsUUID('4', {
    message: PAYABLE_ASSIGNOR_ID_INVALID,
  })
  @IsNotEmpty({
    message: PAYABLE_ASSIGNOR_ID_REQUIRED,
  })
  assignorId: string;

  /**
   * value
   */
  @IsNumber(undefined, {
    message: PAYABLE_VALUE_INVALID,
  })
  @IsNotEmpty({
    message: PAYABLE_VALUE_REQUIRED,
  })
  @Min(0, {
    message: 'The value must be greater than or equal to 0.',
  })
  value: number;

  /**
   * emissionDate
   */
  @IsDateString(undefined, {
    message: PAYABLE_EMISSION_DATE_INVALID,
  })
  @IsNotEmpty({
    message: PAYABLE_EMISSION_DATE_REQUIRED,
  })
  emissionDate: string;
}
