import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MealPlanService {
  async createMealPlan(data: { title: string; description: string; nutritionistId: number; patientId: number }) {
    return prisma.mealPlan.create({ data });
  }

  async getMealPlansByPatient(patientId: number) {
    return prisma.mealPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMealPlanById(id: number) {
    return prisma.mealPlan.findUnique({ where: { id } });
  }
}