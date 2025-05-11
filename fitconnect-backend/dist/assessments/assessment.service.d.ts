import { PrismaService } from 'prisma.service';
export declare class AssessmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAssessment(body: any): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    } | null>;
    updateAssessment(id: number, body: {
        method?: string;
        data?: any;
        nextAssessment?: Date;
    }): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }>;
}
