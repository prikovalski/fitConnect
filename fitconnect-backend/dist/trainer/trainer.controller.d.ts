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
        email: string;
        name: string;
        birthDate: Date;
        gender: import(".prisma/client").$Enums.Gender;
        peso: number | null;
    }[]>;
    getStudentWorkouts(id: string, req: any): Promise<{
        student: {
            name: string;
        };
        workouts: {
            id: number;
            title: string;
            description: string;
            validFrom: Date;
            validUntil: Date;
        }[];
    }>;
    getStudentAssessments(studentId: string, req: any): Promise<{
        createdById: number;
        id: number;
        patientId: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getUpcomingAssessments(req: any): Promise<{
        createdById: number;
        id: number;
        patientId: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getTrainerWorkouts(req: any): Promise<{
        trainerId: number;
        isActive: boolean;
        id: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        patientId: number;
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
        name: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
    }>;
}
