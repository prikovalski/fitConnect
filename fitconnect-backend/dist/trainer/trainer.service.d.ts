import { PrismaService } from '../prisma.service';
export declare class TrainerService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardSummary(trainerId: number): Promise<{
        studentsCount: number;
        activeWorkouts: number;
        expiringWorkouts: number;
    }>;
}
