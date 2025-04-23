import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class NutritionistService {
  constructor(private readonly prisma: PrismaService) {}

  async validateAccess(patientId: number, professionalId: number, role: Role) {
    const sharing = await this.prisma.dataSharing.findFirst({
      where: {
        patientId,
        professionalId,
        role
      }
    });
  
    if (!sharing) {
      throw new ForbiddenException('Você não tem permissão para acessar os dados deste paciente.');
    }

    return sharing;
  }

  async getSharedPatients(nutritionistId: number) {
    const patients = await this.prisma.dataSharing.findMany({
      where: {
        professionalId: nutritionistId,
        role: 'NUTRITIONIST',
        shareMealWith: true
      },
      include: {
        patient: true
      }
    });

    const result = await Promise.all(patients.map(async (sharing) => {
      const latestMealPlan = await this.prisma.mealPlan.findFirst({
        where: { patientId: sharing.patientId, nutritionistId },
        orderBy: { createdAt: 'desc' }
      });

      const latestWorkout = await this.prisma.workoutPlan.findFirst({
        where: { patientId: sharing.patientId, isActive: true },
        orderBy: { createdAt: 'desc' }
      });

      return {
        id: sharing.patient.id,
        name: sharing.patient.name,
        email: sharing.patient.email,
        latestMealPlan: latestMealPlan ? { title: latestMealPlan.title } : null,
        latestWorkout: latestWorkout ? { title: latestWorkout.title } : null
      };
    }));

    return result;
  }

  async getPatientDetail(patientId: number, nutritionistId: number) {
    await this.validateAccess(patientId, nutritionistId, 'NUTRITIONIST');

    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: { id: true, name: true, email: true }
    });
  
    if (!patient) throw new Error('Paciente não encontrado');
  
    const latestMealPlan = await this.prisma.mealPlan.findFirst({
      where: { patientId, nutritionistId },
      orderBy: { createdAt: 'desc' }
    });
  
    const latestWorkout = await this.prisma.workoutPlan.findFirst({
      where: { patientId, isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  
    return {
      ...patient,
      latestMealPlan: latestMealPlan ? { id: latestMealPlan.id, title: latestMealPlan.title } : null,
      latestWorkout: latestWorkout ? { id: latestWorkout.id, title: latestWorkout.title } : null
    };
  }
} 