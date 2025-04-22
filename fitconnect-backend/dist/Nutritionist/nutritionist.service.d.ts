import { PrismaService } from '../prisma.service';
export declare class NutritionistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSharedPatients(nutritionistId: number): Promise<{
        id: number;
        name: string;
        email: string;
        latestMealPlan: {
            title: string;
        } | null;
        latestWorkout: {
            title: string;
        } | null;
    }[]>;
}
