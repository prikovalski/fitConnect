import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

interface WorkoutSetInput {
  setNumber?: number;
  targetReps: number;
  targetLoad: number;
}

interface WorkoutExerciseInput {
  name: string;
  sets: WorkoutSetInput[];
}

interface WorkoutDayInput {
  dayOfWeek: string;
  muscleGroup: string;
  exercises: WorkoutExerciseInput[];
}

interface UpdateWorkoutInput {
  title: string;
  description: string;
  validFrom: string; // ISO string
  validUntil: string;
  workoutDays: WorkoutDayInput[];
}

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  async createWorkout(data: {
    title: string;
    description: string;
    validFrom: string;
    validUntil: string;
    trainerId: number;
    patientId: number;
    workoutDays: WorkoutDayInput[];
  }) {
    return this.prisma.workoutPlan.create({
      data: {
        title: data.title,
        description: data.description,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
        trainerId: data.trainerId,
        patientId: data.patientId,
        workoutDays: {
          create: data.workoutDays.map((day) => ({
            dayOfWeek: day.dayOfWeek,
            muscleGroup: day.muscleGroup,
            exercises: {
              create: day.exercises.map((exercise, exerciseIndex) => ({
                name: exercise.name,
                order: exerciseIndex + 1,
                sets: {
                  create: exercise.sets.map((set, setIndex) => ({
                    setNumber: setIndex + 1,
                    targetReps: set.targetReps,
                    targetLoad: set.targetLoad,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  async getWorkoutsByPatient(patientId: number) {
    return this.prisma.workoutPlan.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWorkoutById(id: number) {
    if (!id) {
      throw new Error('ID do plano não foi fornecido.');
    }

    return this.prisma.workoutPlan.findUnique({ where: { id } });
  }

  async getExercisesByPlan(planId: number) {
    return this.prisma.workoutDay.findMany({
      where: { workoutPlanId: planId },
      orderBy: { id: 'asc' },
      include: {
        exercises: {
          orderBy: { order: 'asc' },
          include: {
            sets: {
              orderBy: { setNumber: 'asc' },
            },
          },
        },
      },
    });
  }

  async updateWorkout(id: number, data: UpdateWorkoutInput) {
    const existing = await this.prisma.workoutPlan.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Plano de treino não encontrado.');
    }

    // 1. Deletar logs primeiro
    await this.prisma.workoutLog.deleteMany({
      where: {
        workoutSet: {
          exercise: {
            workoutDay: {
              workoutPlanId: id,
            },
          },
        },
      },
    });

    // 2. Deletar sets
    await this.prisma.workoutSet.deleteMany({
      where: {
        exercise: {
          workoutDay: {
            workoutPlanId: id,
          },
        },
      },
    });

    // 3. Deletar exercícios
    await this.prisma.workoutExercise.deleteMany({
      where: {
        workoutDay: {
          workoutPlanId: id,
        },
      },
    });

    // 4. Deletar dias
    await this.prisma.workoutDay.deleteMany({
      where: { workoutPlanId: id },
    });

    // 5. Atualizar o plano recriando todos os dados
    return this.prisma.workoutPlan.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
        workoutDays: {
          create: data.workoutDays.map((day) => ({
            dayOfWeek: day.dayOfWeek,
            muscleGroup: day.muscleGroup,
            exercises: {
              create: day.exercises.map((exercise, exerciseIndex) => ({
                name: exercise.name,
                order: exerciseIndex + 1,
                sets: {
                  create: exercise.sets.map((set, setIndex) => ({
                    setNumber: setIndex + 1,
                    targetReps: set.targetReps,
                    targetLoad: set.targetLoad,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  async getWorkoutByPatientAndId(patientId: number, workoutId: number) {
    const workout = await this.prisma.workoutPlan.findFirst({
      where: {
        id: workoutId,
        patientId: patientId,
      },
      include: {
        workoutDays: {
          include: {
            exercises: {
              include: {
                sets: true
              }
            }
          }
        },
        patient: {
          select: { 
            id: true,
            name: true,
            peso: true }
        }
      }
    });
  
    if (!workout) throw new NotFoundException('Treino não encontrado.');
  
    return {
      ...workout,
      patientName: workout.patient.name,
      patientPeso: workout.patient.peso
    };
  }
  
}
