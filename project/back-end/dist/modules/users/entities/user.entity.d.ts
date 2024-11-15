export declare class UserEntity {
    id: string;
    name: string;
    login: string;
    email: string;
    password?: string;
    role: string;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}
