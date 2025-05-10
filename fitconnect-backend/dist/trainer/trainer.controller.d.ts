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
        id: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        date: Date;
        method: string;
        createdById: number;
        nextAssessment: Date | null;
    }[]>;
    getUpcomingAssessments(req: any): Promise<{
        id: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        date: Date;
        method: string;
        createdById: number;
        nextAssessment: Date | null;
    }[]>;
    getTrainerWorkouts(req: any): Promise<{
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
