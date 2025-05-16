import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getMealPlanById(patientId: number, mealPlanId: number) {
  const plan = await this.prisma.mealPlan.findFirst({
    where: {
      id: mealPlanId,
      patientId: patientId,
    },
    include: {
      meals: {
        orderBy: { order: 'asc' },
        include: {
          items: {
            orderBy: { id: 'asc' }
          }
        }
      }
    }
  });

  if (!plan) {
    throw new NotFoundException('Plano alimentar não encontrado.');
  }

  return plan;
}

async getAllMealPlans(patientId: number) {
  return this.prisma.mealPlan.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      validFrom: true,
      validUntil: true,
      isActive: true,
      createdAt: true,
    }
  });
}



}
