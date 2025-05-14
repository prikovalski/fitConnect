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
        patientId: number;
        trainerId: number;
        workoutDays: WorkoutDayInput[];
    }): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }>;
    getWorkoutsByPatient(patientId: number): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }[]>;
    getWorkoutById(id: number): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    } | null>;
    getExercisesByPlan(planId: number): Promise<({
        exercises: ({
            sets: {
                id: number;
                exerciseId: number;
                setNumber: number;
                targetReps: number;
                targetLoad: number;
            }[];
        } & {
            id: number;
            name: string;
            workoutDayId: number;
            order: number;
        })[];
    } & {
        id: number;
        workoutPlanId: number;
        dayOfWeek: string;
        muscleGroup: string;
    })[]>;
    updateWorkout(id: number, data: UpdateWorkoutInput): Promise<{
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
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
                sets: ({
                    logs: {
                        id: number;
                        date: Date;
                        workoutSetId: number;
                        actualReps: number;
                        actualLoad: number;
                    }[];
                } & {
                    id: number;
                    exerciseId: number;
                    setNumber: number;
                    targetReps: number;
                    targetLoad: number;
                })[];
            } & {
                id: number;
                name: string;
                workoutDayId: number;
                order: number;
            })[];
        } & {
            id: number;
            workoutPlanId: number;
            dayOfWeek: string;
            muscleGroup: string;
        })[];
        id: number;
        createdAt: Date;
        patientId: number;
        title: string;
        description: string;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        trainerId: number;
    }>;
}
export {};
