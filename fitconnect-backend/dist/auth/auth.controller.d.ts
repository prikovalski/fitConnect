import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
        role: string;
    }): Promise<{
        token: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
}
