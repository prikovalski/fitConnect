export declare class AssessmentService {
    createAssessment(data: {
        method: string;
        data: any;
        patientId: number;
        createdById: number;
    }): Promise<{
        id: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    } | null>;
}
