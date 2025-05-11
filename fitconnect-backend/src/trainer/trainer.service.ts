// src/trainer/trainer.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrainerService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary(trainerId: number) {
    const studentsCount = await this.prisma.user.count({
      where: {
        professionalDataSharing: {
          some: {
            professionalId: trainerId,
            role: 'TRAINER',
            shareWorkoutWith: true,
          },
        },
      },
    });

    const upcomingAssessments = await this.prisma.physicalAssessment.count({
      where: {
        createdById: trainerId,
        nextAssessment: {
          gte: new Date(),
        },
      },
    });

    const expiringWorkouts = await this.prisma.workoutPlan.count({
      where: {
        trainerId,
        isActive: true,
        validUntil: {
          lte: new Date(new Date().setDate(new Date().getDate() + 7)), // Próximos 7 dias
        },
      },
    });

    return {
      studentsCount,
      upcomingAssessments,
      expiringWorkouts,
    };
  }

  async getStudents(trainerId: number) {
    const students = await this.prisma.user.findMany({
      where: {
        patientPlans: {
          some: {
            trainerId: trainerId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        birthDate: true,
        peso: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  
    return students;
  }
  

  async getStudentWorkouts(studentId: number, trainerId: number) {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: {
        name: true,
        patientPlans: {
          where: {
            trainerId: trainerId,
            isActive: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            validFrom: true,
            validUntil: true,
          },
        },
      },
    });
  
    if (!student) {
      throw new Error('Aluno não encontrado');
    }
  
    return {
      name: student.name,
      workouts: student.patientPlans || [], 
    };
  }
  

  async getStudentAssessments(patientId: number, trainerId: number) {
    const assessments = await this.prisma.physicalAssessment.findMany({
      where: {
        patientId,
        createdById: trainerId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return assessments;
  }

  async getUpcomingAssessments(trainerId: number) {
    return this.prisma.physicalAssessment.findMany({
      where: {
        createdById: trainerId,
        nextAssessment: {
          gte: new Date(),
        },
      },
      orderBy: {
        nextAssessment: 'asc',
      },
    });
  }

  async getTrainerAssessments(trainerId: number) {
    return this.prisma.physicalAssessment.findMany({
      where: {
        createdById: trainerId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getPatientBasicInfo(patientId: number) {
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        name: true,
        gender: true,
        birthDate: true,
        peso: true, // Já adicionando o peso, pois pode ser útil
      },
    });
  
    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }
  
    let finalAge = null;
    if (patient.birthDate) {
      const birthDate = new Date(patient.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
  
      const birthdayThisYearNotYetHappened =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  
      if (birthdayThisYearNotYetHappened) {
        age -= 1;
      }
  
      finalAge = age;
    }
  
    return {
      id: patient.id,
      name: patient.name,
      gender: patient.gender,
      age: finalAge,
      peso: patient.peso ?? null,
    };
  }
  

  async getTrainerWorkouts(trainerId: number) {
    return this.prisma.workoutPlan.findMany({
      where: {
        trainerId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getWorkoutPlanById(id: number, trainerId: number) {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: {
        id,
        trainerId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        validFrom: true,
        validUntil: true,
        isActive: true,
        patient: {
          select: {
            name: true,
            peso: true, // Agora inclui peso
          },
        },
        workoutDays: {
          select: {
            id: true,
            dayOfWeek: true,
            muscleGroup: true,
            exercises: {
              select: {
                id: true,
                name: true,
                sets: {
                  select: {
                    id: true,
                    setNumber: true,
                    targetReps: true,
                    targetLoad: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!plan) {
      throw new NotFoundException('Plano de treino não encontrado.');
    }

    return {
      id: plan.id,
      title: plan.title,
      description: plan.description,
      validFrom: plan.validFrom,
      validUntil: plan.validUntil,
      isActive: plan.isActive,
      patientName: plan.patient.name,
      patientPeso: plan.patient.peso,
      workoutDays: plan.workoutDays,
    };
  }
  
}
