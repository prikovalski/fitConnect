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
            foodName: string;
            quantity: string;
            notes: string | null;
            mealId: number;
        }[];
    } & {
        id: number;
        mealPlanId: number;
        name: string;
        order: number;
    }>;
}
