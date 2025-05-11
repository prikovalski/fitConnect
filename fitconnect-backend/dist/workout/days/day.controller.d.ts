export declare class DayController {
    create(body: {
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    }): Promise<{
        id: number;
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    }>;
}
