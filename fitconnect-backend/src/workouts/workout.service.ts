import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class WorkoutService {
  async createWorkout(data: { title: string; description: string; trainerId: number; patientId: number }) {
    return prisma.workoutPlan.create({ data });
  }

  async getWorkoutsByPatient(patientId: number) {
    return prisma.workoutPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWorkoutById(id: number) {
    return prisma.workoutPlan.findUnique({ where: { id } });
  }
}