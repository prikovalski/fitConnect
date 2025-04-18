import { PrismaService } from '../prisma.service';
export declare class WorkoutByDayService {
    private prisma;
    constructor(prisma: PrismaService);
    getWorkoutByDay(patientId: number, day: string): Promise<{
        message: string;
        planTitle: null;
        day: string;
        muscleGroup: null;
        exercises: never[];
    } | {
        planTitle: string;
        day: string;
        muscleGroup: string;
        exercises: {
            name: string;
            sets: {
                setNumber: number;
                targetReps: number;
                targetLoad: number;
                lastLog: {
                    actualReps: number;
                    actualLoad: number;
                } | null;
            }[];
        }[];
        message?: undefined;
    }>;
}
