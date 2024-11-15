import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly jwtSecret;
    private readonly accessTokenExpiration;
    private readonly refreshTokenExpiration;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(login: string, password: string): Promise<{
        name: string;
        login: string;
        email: string;
        password: string;
        role: string;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: any;
            email: any;
            role: any;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        user: {
            name: string;
            email: string;
            role: string;
        };
    }>;
}
