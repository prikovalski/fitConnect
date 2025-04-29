export declare class DayController {
    create(body: {
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    }): Promise<{
        id: number;
        dayOfWeek: string;
        muscleGroup: string;
        workoutPlanId: number;
    }>;
}
