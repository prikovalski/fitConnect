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
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    })[]>;
}
