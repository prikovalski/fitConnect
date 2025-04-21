import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class WorkoutPlanService {
  constructor(private prisma: PrismaService) {}

  async getPlansByPatientId(patientId: number) {
    return this.prisma.workoutPlan.findMany({
      where: { patientId },
      include: {
        trainer: {
          select: { name: true },
        },
      },
      orderBy: { validFrom: 'desc' },
    });
  }
}