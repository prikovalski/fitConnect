import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MealPlanService {
  async createMealPlan(data: {
    title: string;
    description: string;
    observations?: string;
    validFrom: Date;
    validUntil: Date;
    isActive?: boolean;
    nutritionistId: number;
    patientId: number;
  }) {
    return prisma.mealPlan.create({ data });
  }

  async getMealPlansByPatient(patientId: number) {
    return prisma.mealPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMealPlanById(id: number) {
    return prisma.mealPlan.findUnique({
      where: { id },
      include: {
        meals: {
          orderBy: { order: 'asc' },
          include: {
            items: true,
          },
        },
      },
    });
  }
  async getPlansByPatient(patientId: number) {
    return prisma.mealPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        validFrom: true,
        validUntil: true,
        isActive: true,
      },
    });
  }
  async getMealPlanDetail(planId: number) {
    return prisma.mealPlan.findUnique({
      where: { id: planId },
      include: {
        meals: {
          include: { items: true },
          orderBy: { order: 'asc' }
        }
      }
    });
  }
  async updateMealPlan(planId: number, data: any, nutritionistId: number) {
    
    const plan = await prisma.mealPlan.findUnique({ where: { id: planId } });
    console.log("🔍 Nutri: ", nutritionistId);
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
  
    if (!plan.isActive) {
      throw new Error('Apenas planos ativos podem ser editados.');
    }
  
    if (plan.nutritionistId !== nutritionistId) {
      throw new Error('Você não tem permissão para editar este plano.');
    }
  
    return prisma.mealPlan.update({
      where: { id: planId },
      data
    });
  }
  
}