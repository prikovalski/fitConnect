import { AssessmentService } from './assessment.service';
export declare class AssessmentController {
    private readonly assessmentService;
    constructor(assessmentService: AssessmentService);
    create(body: {
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
    getByPatient(patientId: string): Promise<{
        id: number;
        patientId: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        createdById: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        patientId: number;
        method: string;
        date: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        createdById: number;
    } | null>;
}
