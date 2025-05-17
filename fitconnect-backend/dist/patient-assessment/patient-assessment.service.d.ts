import { PrismaService } from 'prisma.service';
export declare class PatientAssessmentService {
    private prisma;
    constructor(prisma: PrismaService);
    getAssessments(patientId: number): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        createdBy: {
            name: string;
        };
    }[]>;
    getAssessmentDetails(patientId: number, assessmentId: number): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
}
