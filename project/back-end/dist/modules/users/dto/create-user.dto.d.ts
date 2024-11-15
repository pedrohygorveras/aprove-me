import { UserRole } from 'src/modules/common/constants/permissions/role.enum';
export declare class CreateUserDto {
    readonly name: string;
    login: string;
    readonly email: string;
    password: string;
    role: UserRole;
}
