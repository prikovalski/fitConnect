export declare class AssessmentService {
    createAssessment(data: {
        method: string;
        data: any;
        patientId: number;
        createdById: number;
    }): Promise<{
        id: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        method: string;
        date: Date;
        createdById: number;
    }>;
    getAssessmentsByPatient(patientId: number): Promise<{
        id: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        method: string;
        date: Date;
        createdById: number;
    }[]>;
    getAssessmentById(id: number): Promise<{
        id: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        method: string;
        date: Date;
        createdById: number;
    } | null>;
}
