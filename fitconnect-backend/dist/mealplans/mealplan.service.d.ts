export declare class MealPlanService {
    createMealPlan(data: {
        title: string;
        description: string;
        observations?: string;
        validFrom: Date;
        validUntil: Date;
        isActive?: boolean;
        nutritionistId: number;
        patientId: number;
    }): Promise<{
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
    getMealPlansByPatient(patientId: number): Promise<{
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
    }[]>;
    getMealPlanById(id: number): Promise<({
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
            name: string;
            order: number;
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
    }) | null>;
}
