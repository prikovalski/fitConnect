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
        email: string;
        name: string;
        birthDate: Date;
        gender: import(".prisma/client").$Enums.Gender;
        peso: number | null;
    }[]>;
    getStudentWorkouts(studentId: number, trainerId: number): Promise<{
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
    getStudentAssessments(patientId: number, trainerId: number): Promise<{
        createdById: number;
        id: number;
        patientId: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getUpcomingAssessments(trainerId: number): Promise<{
        createdById: number;
        id: number;
        patientId: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getTrainerAssessments(trainerId: number): Promise<{
        createdById: number;
        id: number;
        patientId: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    getPatientBasicInfo(patientId: number): Promise<{
        name: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
    }>;
    getTrainerWorkouts(trainerId: number): Promise<{
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
