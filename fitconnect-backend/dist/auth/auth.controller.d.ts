import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        name: string;
        role: Role;
    }): Promise<string>;
    login(body: {
        email: string;
        password: string;
    }): Promise<string>;
}
