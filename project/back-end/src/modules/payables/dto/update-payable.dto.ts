import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';
import {
  PAYABLE_ASSIGNOR_ID_INVALID,
  PAYABLE_VALUE_INVALID,
  PAYABLE_EMISSION_DATE_INVALID,
} from '../../common/constants/payables/validation-messages';

export class UpdatePayableDto {
  /**
   * assignorId
   */
  @IsUUID('4', {
    message: PAYABLE_ASSIGNOR_ID_INVALID,
  })
  @IsOptional()
  assignorId?: string;

  /**
   * value
   */
  @IsNumber(
    {},
    {
      message: PAYABLE_VALUE_INVALID,
    },
  )
  @IsOptional()
  @Min(0, {
    message: 'The value must be greater than or equal to 0.',
  })
  value?: number;

  /**
   * emissionDate
   */
  @IsDateString(
    {},
    {
      message: PAYABLE_EMISSION_DATE_INVALID,
    },
  )
  @IsOptional()
  emissionDate?: string;
}
