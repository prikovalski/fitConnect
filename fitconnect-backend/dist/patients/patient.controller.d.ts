import { PatientService } from './patient.service';
import { WorkoutService } from '../workouts/workout.service';
export declare class PatientController {
    private readonly patientService;
    private readonly workoutService;
    constructor(patientService: PatientService, workoutService: WorkoutService);
    getMealPlanById(req: any, id: string): Promise<{
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
            order: number;
            name: string;
            mealPlanId: number;
        })[];
    } & {
        id: number;
        title: string;
        description: string;
        observations: string | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        nutritionistId: number;
        patientId: number;
    }>;
    getAllMealPlans(req: any): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
    }[]>;
}
