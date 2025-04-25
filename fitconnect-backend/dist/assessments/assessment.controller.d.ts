import { AssessmentService } from './assessment.service';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    create(body: any): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        method: string;
        date: Date;
        nextAssessment: Date | null;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: number;
        createdById: number;
    } | null>;
    update(id: string, body: {
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
