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
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        nutritionistId: number;
    }>;
    getMealPlansByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        nutritionistId: number;
    }[]>;
    getMealPlanById(id: number): Promise<({
        meals: ({
            items: {
                id: number;
                foodName: string;
                quantity: string;
                notes: string | null;
                mealId: number;
            }[];
        } & {
            id: number;
            name: string;
            order: number;
            mealPlanId: number;
        })[];
    } & {
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        nutritionistId: number;
    }) | null>;
    getPlansByPatient(patientId: number): Promise<{
        id: number;
        title: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
    }[]>;
    getMealPlanDetail(planId: number): Promise<({
        meals: ({
            items: {
                id: number;
                foodName: string;
                quantity: string;
                notes: string | null;
                mealId: number;
            }[];
        } & {
            id: number;
            name: string;
            order: number;
            mealPlanId: number;
        })[];
    } & {
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        nutritionistId: number;
    }) | null>;
    updateMealPlan(planId: number, data: any, nutritionistId: number): Promise<{
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        nutritionistId: number;
    }>;
}
