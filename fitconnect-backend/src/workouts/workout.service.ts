import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class WorkoutService {
  async createWorkout(data: {
    title: string;
    description: string;
    trainerId: number;
    patientId: number;
    validFrom: string;
    validUntil: string;
  }) {
    return prisma.workoutPlan.create({
      data: {
        ...data,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
      },
    });
  }

  async getWorkoutsByPatient(patientId: number) {
    return prisma.workoutPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWorkoutById(id: number) {
    if (!id) {
      throw new Error('ID do plano não foi fornecido.');
    }
    
    return prisma.workoutPlan.findUnique({ where: { id } });
  }
}