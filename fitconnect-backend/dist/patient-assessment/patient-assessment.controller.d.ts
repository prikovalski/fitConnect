import { PatientAssessmentService } from './patient-assessment.service';
export declare class PatientAssessmentController {
    private readonly service;
    constructor(service: PatientAssessmentService);
    listAssessments(req: any): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        createdBy: {
            name: string;
        };
    }[]>;
    getAssessmentById(req: any, id: string): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
}
