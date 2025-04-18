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
    update(id: string, body: {
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
