export declare class WorkoutByDayController {
    getWorkoutByDay(patientId: string, day: string): Promise<{
        message: string;
        planTitle?: undefined;
        day?: undefined;
        muscleGroup?: undefined;
        exercises?: undefined;
    } | {
        planTitle: string;
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
