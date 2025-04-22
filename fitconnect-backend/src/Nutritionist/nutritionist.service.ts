import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NutritionistService {
  constructor(private readonly prisma: PrismaService) {}

  async getSharedPatients(nutritionistId: number) {
    console.log("🔍 Nutritionist ID:", nutritionistId);
    const patients = await this.prisma.dataSharing.findMany({
      where: { shareMealWith: true },
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
    console.log("Entrou Service");
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: { id: true, name: true, email: true }
    });
  
    if (!patient) throw new Error('Paciente não encontrado');
  
    const latestMealPlan = await this.prisma.mealPlan.findFirst({
      where: { patientId, nutritionistId },
      orderBy: { createdAt: 'desc' }
    });
  
    const dataSharing = await this.prisma.dataSharing.findUnique({
      where: { patientId }
    });
  
    let latestWorkout = null;
    if (dataSharing?.shareWorkoutWith) {
      latestWorkout = await this.prisma.workoutPlan.findFirst({
        where: { patientId, isActive: true },
        orderBy: { createdAt: 'desc' }
      });
    }
  
    return {
      ...patient,
      latestMealPlan: latestMealPlan ? { id: latestMealPlan.id, title: latestMealPlan.title } : null,
      latestWorkout: latestWorkout ? { id: latestWorkout.id, title: latestWorkout.title } : null
    };
  }
}