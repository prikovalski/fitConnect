import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        birthDate: Date | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        peso: number | null;
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
    register({ name, email, password, role, birthDate, gender }: {
        name: string;
        email: string;
        password: string;
        role: string;
        birthDate: string;
        gender: 'MALE' | 'FEMALE';
    }): Promise<{
        token: string;
    }>;
}
