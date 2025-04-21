import { WorkoutByDayService } from './workout-by-day.service';
export declare class WorkoutByDayController {
    private readonly workoutByDayService;
    constructor(workoutByDayService: WorkoutByDayService);
    getWorkoutByDay(patientId: string, day: string): Promise<{
        message: string;
        planTitle: null;
        day: string;
        muscleGroup: null;
        exercises: never[];
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
