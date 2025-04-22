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
    getPatientDetail(patientId: number, nutritionistId: number): Promise<{
        latestMealPlan: {
            id: number;
            title: string;
        } | null;
        latestWorkout: {
            id: number;
            title: string;
        } | null;
        id: number;
        name: string;
        email: string;
    }>;
}
