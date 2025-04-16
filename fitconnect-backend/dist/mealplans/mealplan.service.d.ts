export declare class MealPlanService {
    createMealPlan(data: {
        title: string;
        description: string;
        nutritionistId: number;
        patientId: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        patientId: number;
        nutritionistId: number;
    }>;
    getMealPlansByPatient(patientId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        patientId: number;
        nutritionistId: number;
    }[]>;
    getMealPlanById(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        patientId: number;
        nutritionistId: number;
    } | null>;
}
