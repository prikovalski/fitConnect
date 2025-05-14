import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    createWorkout(body: any, req: any): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    } | null>;
    getExercises(id: string): Promise<({
        exercises: ({
            sets: {
                id: number;
                exerciseId: number;
                setNumber: number;
                targetReps: number;
                targetLoad: number;
            }[];
        } & {
            id: number;
            name: string;
            workoutDayId: number;
            order: number;
        })[];
    } & {
        id: number;
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    })[]>;
    updateWorkout(id: string, body: any): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }>;
}
