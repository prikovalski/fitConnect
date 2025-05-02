import { PatientService } from './patient.service';
import { WorkoutService } from '../workouts/workout.service';
export declare class PatientController {
    private readonly patientService;
    private readonly workoutService;
    constructor(patientService: PatientService, workoutService: WorkoutService);
    getPatientWorkouts(id: string): Promise<import("./patient.types").PatientWithActiveWorkouts>;
    getWorkoutDetailByPatient(patientId: string, workoutId: string): Promise<{
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
