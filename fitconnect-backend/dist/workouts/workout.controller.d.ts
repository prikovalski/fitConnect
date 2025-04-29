import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    create(body: {
        title: string;
        description: string;
        trainerId: number;
        patientId: number;
        validFrom: string;
        validUntil: string;
        workoutDays: {
            dayOfWeek: string;
            muscleGroup: string;
            exercises: {
                name: string;
                sets: {
                    targetReps: number;
                    targetLoad: number;
                }[];
            }[];
        }[];
    }): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    } | null>;
    getExercises(id: string): Promise<({
        exercises: ({
            sets: {
                id: number;
                setNumber: number;
                targetReps: number;
                targetLoad: number;
                exerciseId: number;
            }[];
        } & {
            id: number;
            name: string;
            order: number;
            workoutDayId: number;
        })[];
    } & {
        id: number;
        dayOfWeek: string;
        muscleGroup: string;
        workoutPlanId: number;
    })[]>;
    updateWorkout(id: string, body: any): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
}
