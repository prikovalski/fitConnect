import { PrismaService } from '../prisma.service';
export declare class MealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMealWithItems(planId: number, data: {
        name: string;
        order: number;
        items: {
            foodName: string;
            quantity: string;
            notes?: string;
        }[];
    }): Promise<{
        items: {
            id: number;
            mealId: number;
            foodName: string;
            quantity: string;
            notes: string | null;
        }[];
    } & {
        id: number;
        name: string;
        order: number;
        mealPlanId: number;
    }>;
    updateMealWithItems(mealId: number, data: {
        name: string;
        order: number;
        items: any[];
    }): Promise<{
        message: string;
    }>;
}
