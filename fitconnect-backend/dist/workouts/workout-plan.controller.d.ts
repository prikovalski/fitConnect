import { WorkoutPlanService } from './workout-plan.service';
export declare class WorkoutPlanController {
    private readonly workoutPlanService;
    constructor(workoutPlanService: WorkoutPlanService);
    getWorkoutPlansByPatient(patientId: string): Promise<({
        trainer: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    })[]>;
}
