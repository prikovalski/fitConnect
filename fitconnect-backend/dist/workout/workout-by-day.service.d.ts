import { PrismaService } from 'src/prisma.service';
export declare class WorkoutByDayService {
    private prisma;
    constructor(prisma: PrismaService);
    getWorkoutByDay(patientId: number, day: string): Promise<{
        planTitle: any;
        day: any;
        muscleGroup: any;
        exercises: any;
    } | null>;
}
