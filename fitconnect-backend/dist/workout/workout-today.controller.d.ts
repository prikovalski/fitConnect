export declare class WorkoutTodayController {
    getTodaysWorkout(patientId: string): Promise<{
        message: string;
        planTitle?: undefined;
        validFrom?: undefined;
        validUntil?: undefined;
        day?: undefined;
        muscleGroup?: undefined;
        exercises?: undefined;
    } | {
        planTitle: string;
        validFrom: Date;
        validUntil: Date;
        day: string;
        muscleGroup: string;
        exercises: {
            name: string;
            sets: {
                setNumber: number;
                targetReps: number;
                targetLoad: number;
                lastLog: {
                    actualReps: number;
                    actualLoad: number;
                } | null;
            }[];
        }[];
        message?: undefined;
    }>;
}
