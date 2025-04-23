import { TrainerService } from '././trainer.service';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    getDashboardSummary(req: any): Promise<{
        studentsCount: number;
        activeWorkouts: number;
        expiringWorkouts: number;
    }>;
}
