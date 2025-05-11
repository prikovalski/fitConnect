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
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        observations: string | null;
        nutritionistId: number;
    }>;
    getMealPlansByPatient(patientId: number): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        observations: string | null;
        nutritionistId: number;
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
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        observations: string | null;
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
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        observations: string | null;
        nutritionistId: number;
    }) | null>;
    updateMealPlan(planId: number, data: any, nutritionistId: number): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        observations: string | null;
        nutritionistId: number;
    }>;
}
