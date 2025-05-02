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
                sets: ({
                    logs: {
                        id: number;
                        date: Date;
                        actualReps: number;
                        actualLoad: number;
                        workoutSetId: number;
                    }[];
                } & {
                    id: number;
                    setNumber: number;
                    targetReps: number;
                    targetLoad: number;
                    exerciseId: number;
                })[];
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
