import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    register(data: {
        email: string;
        password: string;
        name: string;
        role: Role;
    }): Promise<string>;
    login(email: string, password: string): Promise<string>;
}
