import { NutritionistService } from './nutritionist.service';
export declare class NutritionistController {
    private readonly nutritionistService;
    constructor(nutritionistService: NutritionistService);
    getPatients(req: any): Promise<{
        id: number;
        name: string;
        email: string;
        latestMealPlan: {
            title: string;
        } | null;
        latestWorkout: {
            title: string;
        } | null;
    }[]>;
    getPatientDetail(id: string, req: any): Promise<{
        latestMealPlan: {
            id: number;
            title: string;
        } | null;
        latestWorkout: {
            id: number;
            title: string;
        } | null;
        id: number;
        name: string;
        email: string;
    }>;
}
