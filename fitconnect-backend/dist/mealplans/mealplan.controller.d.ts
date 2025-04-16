import { MealPlanService } from './mealplan.service';
export declare class MealPlanController {
    private readonly mealPlanService;
    constructor(mealPlanService: MealPlanService);
    create(body: {
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
    getByPatient(patientId: string): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        nutritionistId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        nutritionistId: number;
    } | null>;
}
