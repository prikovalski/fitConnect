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
    }): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        patientId: number;
        trainerId: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        patientId: number;
        trainerId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        patientId: number;
        trainerId: number;
    } | null>;
    getExercises(id: string): Promise<({
        exercises: ({
            sets: {
                id: number;
                setNumber: number;
                exerciseId: number;
                targetReps: number;
                targetLoad: number;
            }[];
        } & {
            id: number;
            name: string;
            order: number;
            workoutDayId: number;
        })[];
    } & {
        id: number;
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    })[]>;
}
