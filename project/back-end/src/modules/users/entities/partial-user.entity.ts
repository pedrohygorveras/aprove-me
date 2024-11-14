import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from './user.entity';

export class PartialUserEntity extends PartialType(UserEntity) {}
