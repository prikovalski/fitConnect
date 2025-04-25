import { PrismaService } from 'prisma.service';
export declare class AssessmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAssessment(body: any): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    } | null>;
    updateAssessment(id: number, body: {
        method?: string;
        data?: any;
        nextAssessment?: Date;
    }): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
}
