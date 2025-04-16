export declare class WorkoutService {
    createWorkout(data: {
        title: string;
        description: string;
        trainerId: number;
        patientId: number;
    }): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        trainerId: number;
    }>;
    getWorkoutsByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        trainerId: number;
    }[]>;
    getWorkoutById(id: number): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        trainerId: number;
    } | null>;
}
