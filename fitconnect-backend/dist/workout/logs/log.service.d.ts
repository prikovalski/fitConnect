import { PrismaService } from '../../prisma.service';
export declare class LogService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMany(logs: {
        workoutSetId: number;
        actualLoad: number;
    }[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
