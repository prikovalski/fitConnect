export declare class MealPlanService {
    createMealPlan(data: {
        title: string;
        description: string;
        nutritionistId: number;
        patientId: number;
    }): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        nutritionistId: number;
    }>;
    getMealPlansByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        nutritionistId: number;
    }[]>;
    getMealPlanById(id: number): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        nutritionistId: number;
    } | null>;
}
