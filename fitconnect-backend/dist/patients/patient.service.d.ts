import { PrismaService } from '../prisma.service';
import { PatientWithActiveWorkouts } from './patient.types';
export declare class PatientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPatientWorkouts(patientId: number): Promise<PatientWithActiveWorkouts>;
}
