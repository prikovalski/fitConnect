export declare class WorkoutService {
    createWorkout(data: {
        title: string;
        description: string;
        trainerId: number;
        patientId: number;
        validFrom: string;
        validUntil: string;
    }): Promise<{
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }>;
    getWorkoutsByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }[]>;
    getWorkoutById(id: number): Promise<{
        id: number;
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    } | null>;
    getExercisesByPlan(planId: number): Promise<({
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
