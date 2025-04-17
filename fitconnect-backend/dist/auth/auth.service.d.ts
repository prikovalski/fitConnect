export declare class AuthService {
    register(data: {
        email: string;
        password: string;
        name: string;
        role: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } | null>;
}
