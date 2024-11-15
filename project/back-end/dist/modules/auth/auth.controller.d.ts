import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
