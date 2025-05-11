import { AssessmentService } from './assessment.service';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    create(body: any): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        date: Date;
        method: string;
        nextAssessment: Date | null;
        createdById: number;
    } | null>;
    update(id: string, body: {
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
