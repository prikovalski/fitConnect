export declare class ExerciseController {
    create(body: {
        workoutDayId: number;
        name: string;
        order: number;
    }): Promise<{
        id: number;
        name: string;
        workoutDayId: number;
        order: number;
    }>;
}
