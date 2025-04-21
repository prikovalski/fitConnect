import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(logs: { workoutSetId: number; actualLoad: number }[]) {
    const date = new Date();

    const payload = await Promise.all(
      logs.map(async (log) => {
        const set = await this.prisma.workoutSet.findUnique({
          where: { id: log.workoutSetId },
          select: { targetReps: true },
        });

        return {
          workoutSetId: log.workoutSetId,
          date,
          actualReps: set?.targetReps || 0,
          actualLoad: log.actualLoad,
        };
      })
    );

    return this.prisma.workoutLog.createMany({ data: payload });
  }
}
