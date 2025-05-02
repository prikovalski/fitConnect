import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PatientWithActiveWorkouts } from './patient.types'; // importar corretamente o tipo

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getPatientWorkouts(patientId: number): Promise<PatientWithActiveWorkouts> {
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: {
        id: true,         
        name: true,
      },
    });
    console.log('Patient: ',patient )

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const workoutPlans = await this.prisma.workoutPlan.findMany({
      where: { patientId, isActive: true },
      include: {
        workoutDays: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });
    console.log('WorkoutPlans: ',workoutPlans)
    return {
      id: patient.id,       
      name: patient.name,
      workoutPlans,
    };
  }
}
