import { Controller, Get, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout')
export class WorkoutTodayController {
  @Get('today')
  async getTodaysWorkout(@Query('patientId') patientId: string) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();

    // Encontrar plano ativo
    const activePlan = await prisma.workoutPlan.findFirst({
      where: {
        patientId: Number(patientId),
        isActive: true,
      },
    });

    if (!activePlan) return { message: 'Nenhum plano de treino ativo encontrado.' };

    // Encontrar o dia correspondente
    const workoutDay = await prisma.workoutDay.findFirst({
      where: {
        workoutPlanId: activePlan.id,
        dayOfWeek: today,
      },
      include: {
        exercises: {
          include: {
            sets: {
              include: {
                logs: {
                  where: { date: { lte: new Date() } },
                  orderBy: { date: 'desc' },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!workoutDay) return { message: 'Nenhum treino cadastrado para hoje.' };

    return {
      planTitle: activePlan.title,
      validFrom: activePlan.validFrom,
      validUntil: activePlan.validUntil,
      day: workoutDay.dayOfWeek,
      muscleGroup: workoutDay.muscleGroup,
      exercises: workoutDay.exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets.map((set) => ({
          setNumber: set.setNumber,
          targetReps: set.targetReps,
          targetLoad: set.targetLoad,
          lastLog: set.logs[0]
            ? {
                actualReps: set.logs[0].actualReps,
                actualLoad: set.logs[0].actualLoad,
              }
            : null,
        })),
      })),
    };
  }
}