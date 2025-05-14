import { PrismaService } from '../prisma.service';
export declare class NutritionistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSharedPatients(nutritionistId: number): Promise<any>;
}
