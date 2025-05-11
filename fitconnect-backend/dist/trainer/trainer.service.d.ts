import { PrismaService } from '../prisma.service';
export declare class TrainerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardSummary(trainerId: number): Promise<{
        studentsCount: number;
        upcomingAssessments: number;
        expiringWorkouts: number;
    }>;
    getStudents(trainerId: number): Promise<{
        id: number;
        name: string;
        email: string;
        birthDate: Date | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        peso: number | null;
    }[]>;
    getStudentWorkouts(studentId: number, trainerId: number): Promise<{
        name: string;
        workouts: {
            id: number;
            title: string;
            description: string;
            validFrom: Date;
            validUntil: Date;
        }[];
    }>;
    getStudentAssessments(patientId: number, trainerId: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getUpcomingAssessments(trainerId: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getTrainerAssessments(trainerId: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getPatientBasicInfo(patientId: number): Promise<{
        id: number;
        name: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        age: number | null;
        peso: number | null;
    }>;
    getTrainerWorkouts(trainerId: number): Promise<{
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
    getWorkoutPlanById(id: number, trainerId: number): Promise<{
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
}
