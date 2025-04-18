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
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
        patientId: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
        patientId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
        patientId: number;
    } | null>;
}
