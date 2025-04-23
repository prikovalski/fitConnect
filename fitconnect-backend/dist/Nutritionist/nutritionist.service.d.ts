import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
export declare class NutritionistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validateAccess(patientId: number, professionalId: number, role: Role): Promise<{
        id: number;
        patientId: number;
        professionalId: number;
        role: import(".prisma/client").$Enums.Role;
        shareWorkoutWith: boolean;
        shareMealWith: boolean;
    }>;
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
