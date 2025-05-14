import { TrainerService } from './trainer.service';
export declare class TrainerController {
    private readonly trainerService;
    constructor(trainerService: TrainerService);
    getDashboardSummary(req: any): Promise<{
        studentsCount: number;
        upcomingAssessments: number;
        expiringWorkouts: number;
    }>;
    getStudents(req: any): Promise<{
        id: number;
        name: string;
        email: string;
        birthDate: Date | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        peso: number | null;
    }[]>;
    getStudentWorkouts(id: string, req: any): Promise<{
        name: string;
        workouts: {
            id: number;
            title: string;
            description: string;
            validFrom: Date;
            validUntil: Date;
        }[];
    }>;
    getStudentAssessments(studentId: string, req: any): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getUpcomingAssessments(req: any): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getTrainerWorkouts(req: any): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }[]>;
    getWorkoutPlanById(id: string, req: any): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        patientName: string;
        patientPeso: number | null;
        workoutDays: {
            id: number;
            dayOfWeek: string;
            muscleGroup: string;
            exercises: {
                id: number;
                name: string;
                sets: {
                    id: number;
                    setNumber: number;
                    targetReps: number;
                    targetLoad: number;
                }[];
            }[];
        }[];
    }>;
    getStudentBasicInfo(studentId: string): Promise<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        age: number | null;
        peso: number | null;
    }>;
}
