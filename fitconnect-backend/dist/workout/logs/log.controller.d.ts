export declare class LogController {
    create(body: {
        workoutSetId: number;
        date: string;
        actualReps: number;
        actualLoad: number;
    }): Promise<{
        id: number;
        workoutSetId: number;
        date: Date;
        actualReps: number;
        actualLoad: number;
    }>;
    update(id: string, body: {
        actualReps: number;
        actualLoad: number;
    }): Promise<{
        id: number;
        workoutSetId: number;
        date: Date;
        actualReps: number;
        actualLoad: number;
    }>;
}
