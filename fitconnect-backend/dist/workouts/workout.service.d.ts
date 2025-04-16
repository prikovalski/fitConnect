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
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
    getWorkoutsByPatient(patientId: number): Promise<{
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
    getWorkoutById(id: number): Promise<{
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
}
