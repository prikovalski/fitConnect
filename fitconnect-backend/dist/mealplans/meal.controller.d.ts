import { MealService } from './meal.service';
export declare class MealController {
    private readonly mealService;
    constructor(mealService: MealService);
    addMeal(planId: string, body: {
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
    updateMealWithItems(mealId: string, body: {
        name: string;
        order: number;
        items: {
            foodName: string;
            quantity: string;
            notes?: string;
        }[];
    }): Promise<{
        message: string;
    }>;
}
