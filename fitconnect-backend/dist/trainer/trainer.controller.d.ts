import { TrainerService } from './trainer.service';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    getDashboardSummary(req: any): Promise<{
        studentsCount: number;
        activeWorkouts: number;
        expiringWorkouts: number;
        upcomingAssessments: number;
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
        studentName: string;
        assessments: {
            id: number;
            method: string;
            date: Date;
            nextAssessment: Date | null;
        }[];
    }>;
    getUpcomingAssessments(req: any): Promise<{
        id: number;
        method: string;
        nextAssessment: Date | null;
        patientName: string;
    }[]>;
    getAssessments(req: any): Promise<{
        id: number;
        method: string;
        date: Date;
        patientName: string;
    }[]>;
    getPatientBasicInfo(id: string): Promise<{
        name: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
    }>;
}
