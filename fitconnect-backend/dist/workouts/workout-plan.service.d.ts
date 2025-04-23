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
        patientId: number;
        createdAt: Date;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    })[]>;
}
