import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WorkoutDay, Prisma } from '@prisma/client';

@Injectable()
export class WorkoutByDayService {
  constructor(private prisma: PrismaService) {}

  async getWorkoutByDay(patientId: number, day: string) {
    const workoutDay = await this.prisma.workoutDay.findFirst({
      where: {
        workoutPlan: {
          patientId,
          isActive: true,
        },
        dayOfWeek: day,
      },
      include: {
        exercises: {
          include: {
            sets: {
              include: {
                logs: {
                  orderBy: { date: 'desc' },
                  take: 1,
                },
              },
            },
          },
        },
        workoutPlan: true,
      },
    });

    if (!workoutDay) {
      return {
        message: 'Nenhum plano ativo encontrado para este paciente neste dia.',
        planTitle: null,
        day,
        muscleGroup: null,
        exercises: [],
      };
    }

    return {
      planTitle: workoutDay.workoutPlan.title,
      day: workoutDay.dayOfWeek,
      muscleGroup: workoutDay.muscleGroup,
      exercises: workoutDay.exercises.map(
        (exercise: Prisma.WorkoutExerciseGetPayload<{
          include: {
            sets: {
              include: {
                logs: true;
              };
            };
          };
        }>) => ({
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
        }),
      ),
    };
  }
}