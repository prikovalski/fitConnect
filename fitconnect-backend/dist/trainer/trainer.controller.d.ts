import { TrainerService } from './trainer.service';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    getDashboardSummary(req: any): Promise<{
        studentsCount: number;
        activeWorkouts: number;
        expiringWorkouts: number;
    }>;
    getStudents(req: any): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
    getStudentWorkouts(id: string, req: any): Promise<{
        id: number;
        title: string;
        validUntil: Date;
    }[]>;
    getStudentAssessments(id: string, req: any): Promise<{
        id: number;
        method: string;
        date: Date;
    }[]>;
}
