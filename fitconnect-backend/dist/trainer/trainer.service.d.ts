import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
export declare class TrainerService {
    private prisma;
    constructor(prisma: PrismaService);
    validateAccess(patientId: number, professionalId: number, role: Role): Promise<{
        id: number;
        patientId: number;
        professionalId: number;
        role: import(".prisma/client").$Enums.Role;
        shareWorkoutWith: boolean;
        shareMealWith: boolean;
    }>;
    getDashboardSummary(trainerId: number): Promise<{
        studentsCount: number;
        activeWorkouts: number;
        expiringWorkouts: number;
        upcomingAssessments: number;
    }>;
    getStudents(trainerId: number): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
    getStudentWorkouts(studentId: number, trainerId: number): Promise<{
        id: number;
        title: string;
        validUntil: Date;
    }[]>;
    getStudentAssessments(studentId: number, trainerId: number): Promise<{
        id: number;
        method: string;
        date: Date;
    }[]>;
    getUpcomingAssessments(trainerId: number): Promise<{
        id: number;
        method: string;
        nextAssessment: Date | null;
        patientName: string;
    }[]>;
    getTrainerAssessments(trainerId: number): Promise<{
        id: number;
        method: string;
        date: Date;
        patientName: string;
    }[]>;
    getPatientBasicInfo(patientId: number): Promise<{
        name: string;
        gender: import(".prisma/client").$Enums.Gender;
        age: number;
    }>;
}
