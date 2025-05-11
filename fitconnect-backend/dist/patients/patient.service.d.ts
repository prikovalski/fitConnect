import { PrismaService } from '../prisma.service';
import { PatientWithActiveWorkouts } from './patient.types';
export declare class PatientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPatientWorkouts(patientId: number): Promise<PatientWithActiveWorkouts>;
    saveProfile(userId: number, data: any): Promise<{
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
    getPatientProfile(userId: number): Promise<{
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
    savePatientPhoto(patientId: number, imageUrl: string): Promise<{
        id: number;
        url: string;
        uploadedAt: Date;
        patientId: number;
    }>;
    getPatientPhotos(userId: number): Promise<{
        id: number;
        url: string;
        uploadedAt: Date;
        patientId: number;
    }[]>;
}
