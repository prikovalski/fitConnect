import { PrismaService } from '../prisma.service';
export declare class PatientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMealPlanById(patientId: number, mealPlanId: number): Promise<{
        meals: ({
            items: {
                id: number;
                mealId: number;
                foodName: string;
                quantity: string;
                notes: string | null;
            }[];
        } & {
            id: number;
            order: number;
            name: string;
            mealPlanId: number;
        })[];
    } & {
        id: number;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        nutritionistId: number;
        patientId: number;
    }>;
    getAllMealPlans(patientId: number): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
    }[]>;
}
