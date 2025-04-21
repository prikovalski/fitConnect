import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    } | null>;
    login({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    resetPassword(email: string, newPassword: string): Promise<{
        message: string;
    }>;
    register({ name, email, password, role, }: {
        name: string;
        email: string;
        password: string;
        role: string;
    }): Promise<{
        token: string;
    }>;
}
