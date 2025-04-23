import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { addDays } from 'date-fns';
import { Role } from '@prisma/client';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  async validateAccess(patientId: number, professionalId: number, role: Role) {
    const sharing = await this.prisma.dataSharing.findFirst({
      where: {
        patientId,
        professionalId,
        role
      }
    });
  
    if (!sharing) {
      throw new ForbiddenException('Você não tem permissão para acessar os dados deste paciente.');
    }
  
    return sharing;
  }

  async getDashboardSummary(trainerId: number) {
    const students = await this.prisma.dataSharing.findMany({
      where: {
        professionalId: trainerId,
        role: 'TRAINER',
        shareWorkoutWith: true,
      },
      select: {
        patientId: true,
      },
    });

    const studentIds = students.map(s => s.patientId);
    const activeWorkouts = await this.prisma.workoutPlan.count({
      where: {
        trainerId,
        isActive: true,
        patientId: { in: studentIds },
      },
    });

    const expiringWorkouts = await this.prisma.workoutPlan.count({
      where: {
        trainerId,
        isActive: true,
        validUntil: { lte: addDays(new Date(), 7) },
        patientId: { in: studentIds },
      },
    });

    return {
      studentsCount: studentIds.length,
      activeWorkouts,
      expiringWorkouts
    };
  }

  async getStudents(trainerId: number) {
    const sharedPatients = await this.prisma.dataSharing.findMany({
      where: {
        professionalId: trainerId,
        role: 'TRAINER',
        shareWorkoutWith: true
      },
      select: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return sharedPatients.map(s => s.patient);
  }

  async getStudentWorkouts(studentId: number, trainerId: number) {
    await this.validateAccess(studentId, trainerId, 'TRAINER');

    return this.prisma.workoutPlan.findMany({
      where: { patientId: studentId },
      select: {
        id: true,
        title: true,
        validUntil: true
      }
    });
  }
  
  async getStudentAssessments(studentId: number, trainerId: number) {
    await this.validateAccess(studentId, trainerId, 'TRAINER');

    return this.prisma.physicalAssessment.findMany({
      where: { patientId: studentId },
      select: {
        id: true,
        method: true,
        date: true
      }
    });
  }
} 