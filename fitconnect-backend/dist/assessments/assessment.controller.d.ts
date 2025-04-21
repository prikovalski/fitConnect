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
        data: import("@prisma/client/runtime/library").JsonValue;
        method: string;
        date: Date;
        createdById: number;
    }>;
    getByPatient(patientId: string): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        method: string;
        date: Date;
        createdById: number;
    }[]>;
    getOne(id: string): Promise<{
        id: number;
        patientId: number;
        data: import("@prisma/client/runtime/library").JsonValue;
        method: string;
        date: Date;
        createdById: number;
    } | null>;
}
