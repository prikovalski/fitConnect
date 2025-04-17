import { Controller, Get, Query } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout')
export class WorkoutByDayController {
  @Get('by-day')
  async getWorkoutByDay(@Query('patientId') patientId: string, @Query('day') day: string) {
    const activePlan = await prisma.workoutPlan.findFirst({
      where: {
        patientId: Number(patientId),
        isActive: true,
      },
    });

    if (!activePlan) {
      return { message: 'Nenhum plano de treino ativo encontrado para o paciente.' };
    }

    const workoutDay = await prisma.workoutDay.findFirst({
      where: {
        workoutPlanId: activePlan.id,
        dayOfWeek: day.toUpperCase(),
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

    if (!workoutDay) {
      return { message: 'Nenhum treino encontrado para esse dia.' };
    }

    return {
      planTitle: activePlan.title,
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