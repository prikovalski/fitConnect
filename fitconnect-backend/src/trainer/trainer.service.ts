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

    const upcomingAssessments = await this.prisma.physicalAssessment.count({
      where: {
        nextAssessment: {
          gte: new Date(),
          lte: addDays(new Date(), 30)
        }
      }
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
      expiringWorkouts,
      upcomingAssessments
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

    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: { name: true }
    });
  
    if (!student) {
      throw new Error('Paciente não encontrado');
    }

      // Buscar avaliações do paciente
    const assessments = await this.prisma.physicalAssessment.findMany({
      where: { patientId: studentId },
      select: {
        id: true,
        method: true,
        date: true,
        nextAssessment: true
      },
      orderBy: { date: 'desc' }
    });

    return {
      studentName: student.name,
      assessments
    };
  }

  async getUpcomingAssessments(trainerId: number) {
    const today = new Date();
    const limitDate = addDays(today, 30);
  
    const sharedPatients = await this.prisma.dataSharing.findMany({
      where: {
        professionalId: trainerId,
        role: 'TRAINER',
        shareWorkoutWith: true
      },
      select: { patientId: true }
    });
  
    const patientIds = sharedPatients.map(p => p.patientId);
  
    if (patientIds.length === 0) return [];
  
    const assessments = await this.prisma.physicalAssessment.findMany({
      where: {
        patientId: { in: patientIds },
        nextAssessment: {
          gte: today,
          lte: limitDate
        }
      },
      select: {
        id: true,
        method: true,
        nextAssessment: true,
        patient: {
          select: {
            name: true
          }
        }
      },
      orderBy: { nextAssessment: 'asc' }
    });
  
    return assessments.map(a => ({
      id: a.id,
      method: a.method,
      nextAssessment: a.nextAssessment,
      patientName: a.patient.name
    }));
  }

  async getTrainerAssessments(trainerId: number) {
    const sharedPatients = await this.prisma.dataSharing.findMany({
      where: {
        professionalId: trainerId,
        role: 'TRAINER',
        shareWorkoutWith: true
      },
      select: {
        patientId: true,
        patient: {
          select: {
            name: true
          }
        }
      }
    });
  
    const patientIds = sharedPatients.map(p => p.patientId);
  
    const assessments = await this.prisma.physicalAssessment.findMany({
      where: {
        patientId: { in: patientIds }
      },
      select: {
        id: true,
        method: true,
        date: true,
        patientId: true
      },
      orderBy: { date: 'desc' }
    });
  
    // Mapear para incluir o nome do paciente
    const result = assessments.map(a => {
      const patientInfo = sharedPatients.find(p => p.patientId === a.patientId);
      return {
        id: a.id,
        method: a.method,
        date: a.date,
        patientName: patientInfo?.patient.name || 'Paciente'
      };
    });
  
    return result;
  }  
  
  async getPatientBasicInfo(patientId: number) {
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        name: true,
        birthDate: true,
        gender: true
      }
    });
  
    if (!patient) throw new Error('Paciente não encontrado');
  
    // Calcular idade
    const today = new Date();
    const birthDate = new Date(patient.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const adjustedAge = m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  
    return {
      name: patient.name,
      gender: patient.gender,
      age: adjustedAge
    };
  }
  
} 