export declare class AssessmentService {
    createAssessment(data: {
        method: string;
        data: any;
        patientId: number;
        createdById: number;
    }): Promise<{
        id: number;
        patientId: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        createdById: number;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        patientId: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        createdById: number;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        patientId: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        createdById: number;
    } | null>;
}
