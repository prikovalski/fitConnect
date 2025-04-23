import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { addDays } from 'date-fns';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  async getDashboardSummary(trainerId: number) {
    const students = await this.prisma.dataSharing.findMany({
      where: {
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
}
