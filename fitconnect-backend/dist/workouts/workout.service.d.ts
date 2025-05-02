import { PrismaService } from 'prisma.service';
interface WorkoutSetInput {
    setNumber?: number;
    targetReps: number;
    targetLoad: number;
}
interface WorkoutExerciseInput {
    name: string;
    sets: WorkoutSetInput[];
}
interface WorkoutDayInput {
    dayOfWeek: string;
    muscleGroup: string;
    exercises: WorkoutExerciseInput[];
}
interface UpdateWorkoutInput {
    title: string;
    description: string;
    validFrom: string;
    validUntil: string;
    workoutDays: WorkoutDayInput[];
}
export declare class WorkoutService {
    private prisma;
    constructor(prisma: PrismaService);
    createWorkout(data: {
        title: string;
        description: string;
        validFrom: string;
        validUntil: string;
        trainerId: number;
        patientId: number;
        workoutDays: WorkoutDayInput[];
    }): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
    getWorkoutsByPatient(patientId: number): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }[]>;
    getWorkoutById(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    } | null>;
    getExercisesByPlan(planId: number): Promise<({
        exercises: ({
            sets: {
                id: number;
                setNumber: number;
                targetReps: number;
                targetLoad: number;
                exerciseId: number;
            }[];
        } & {
            id: number;
            name: string;
            order: number;
            workoutDayId: number;
        })[];
    } & {
        id: number;
        dayOfWeek: string;
        muscleGroup: string;
        workoutPlanId: number;
    })[]>;
    updateWorkout(id: number, data: UpdateWorkoutInput): Promise<{
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
    getWorkoutByPatientAndId(patientId: number, workoutId: number): Promise<{
        patientName: string;
        patientPeso: number | null;
        patient: {
            id: number;
            name: string;
            peso: number | null;
        };
        workoutDays: ({
            exercises: ({
                sets: {
                    id: number;
                    setNumber: number;
                    targetReps: number;
                    targetLoad: number;
                    exerciseId: number;
                }[];
            } & {
                id: number;
                name: string;
                order: number;
                workoutDayId: number;
            })[];
        } & {
            id: number;
            dayOfWeek: string;
            muscleGroup: string;
            workoutPlanId: number;
        })[];
        id: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        createdAt: Date;
        trainerId: number;
        patientId: number;
    }>;
}
export {};
