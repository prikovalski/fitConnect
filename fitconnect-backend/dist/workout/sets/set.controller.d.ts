export declare class SetController {
    create(body: {
        exerciseId: number;
        setNumber: number;
        targetReps: number;
        targetLoad: number;
    }): Promise<{
        id: number;
        setNumber: number;
        targetReps: number;
        targetLoad: number;
        exerciseId: number;
    }>;
}
