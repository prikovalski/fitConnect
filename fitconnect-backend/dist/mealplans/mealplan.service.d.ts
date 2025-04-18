export declare class MealPlanService {
    createMealPlan(data: {
        title: string;
        description: string;
        nutritionistId: number;
        patientId: number;
    }): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        patientId: number;
        nutritionistId: number;
    }>;
    getMealPlansByPatient(patientId: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        patientId: number;
        nutritionistId: number;
    }[]>;
    getMealPlanById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        patientId: number;
        nutritionistId: number;
    } | null>;
}
