import { PrismaService } from '../prisma.service';
export declare class WorkoutPlanService {
    private prisma;
    constructor(prisma: PrismaService);
    getPlansByPatientId(patientId: number): Promise<({
        trainer: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        patientId: number;
        trainerId: number;
    })[]>;
}
