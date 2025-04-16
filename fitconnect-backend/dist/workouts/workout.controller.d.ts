import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    create(body: {
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
    getByPatient(patientId: string): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        trainerId: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        patientId: number;
        title: string;
        description: string;
        createdAt: Date;
        trainerId: number;
    } | null>;
}
