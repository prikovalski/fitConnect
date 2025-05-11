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
    savePatientProfile(req: any, body: any): Promise<{
        id: number;
        userId: number;
        height: number;
        weight: number;
        city: string;
        goal: string;
        chronicDisease: string | null;
        medicalRestriction: string | null;
        foodAllergy: string | null;
        avoidFood: string | null;
        physicalActivity: string | null;
        activityFrequency: string | null;
        fixedMealTimes: string | null;
        mustHaveFood: string | null;
        neckCircumference: number | null;
        waistCircumference: number | null;
        hipCircumference: number | null;
        profileImageUrl: string | null;
    }>;
    getPatientProfile(req: any): Promise<{
        id: number;
        email: string;
        name: string;
        gender: import(".prisma/client").$Enums.Gender | null;
        birthDate: Date | null;
        peso: number | null;
        height: number | null;
        city: string;
        goal: string;
        chronicDisease: string;
        medicalRestriction: string;
        foodAllergy: string;
        avoidFood: string;
        physicalActivity: string;
        activityFrequency: string;
        fixedMealTimes: string;
        mustHaveFood: string;
        neckCircumference: number | null;
        waistCircumference: number | null;
        hipCircumference: number | null;
        profileImageUrl: string | null;
    }>;
    uploadPhoto(req: any, file: Express.Multer.File): Promise<{
        id: number;
        url: string;
        uploadedAt: Date;
        patientId: number;
    }>;
    getPhotos(req: any): Promise<{
        id: number;
        url: string;
        uploadedAt: Date;
        patientId: number;
    }[]>;
}
