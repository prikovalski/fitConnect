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
        createdById: number;
        nextAssessment: Date | null;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        createdById: number;
        nextAssessment: Date | null;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        createdById: number;
        nextAssessment: Date | null;
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
        createdById: number;
        nextAssessment: Date | null;
    }>;
}
