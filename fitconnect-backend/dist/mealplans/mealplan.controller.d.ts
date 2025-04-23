import { MealPlanService } from './mealplan.service';
export declare class MealPlanController {
    private readonly mealPlanService;
    constructor(mealPlanService: MealPlanService);
    create(body: {
        title: string;
        description: string;
        observations?: string;
        validFrom: string;
        validUntil: string;
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
    getByPatient(patientId: string): Promise<{
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
    getOne(id: string): Promise<({
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
    getPlansByPatient(patientId: string): Promise<{
        id: number;
        title: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
    }[]>;
    getMealPlanDetail(planId: string): Promise<({
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
    updateMealPlan(planId: string, body: any, req: any): Promise<{
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
