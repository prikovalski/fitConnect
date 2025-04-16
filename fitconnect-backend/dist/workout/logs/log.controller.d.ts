export declare class LogController {
    create(body: {
        workoutSetId: number;
        date: string;
        actualReps: number;
        actualLoad: number;
    }): Promise<{
        id: number;
        date: Date;
        workoutSetId: number;
        actualReps: number;
        actualLoad: number;
    }>;
}
