import { Controller, Post, Body, Put, Param, Get, Query} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout/logs')
export class LogController {
  @Post()
  async create(@Body() body: { workoutSetId: number; date: string; actualReps: number; actualLoad: number }) {
    return prisma.workoutLog.create({ data: { ...body, date: new Date(body.date) } });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { actualReps: number; actualLoad: number }) {
    return prisma.workoutLog.update({
      where: { id: Number(id) },
      data: {
        actualReps: body.actualReps,
        actualLoad: body.actualLoad,
      },
    });
  }

  @Post('bulk')
  async createMany(
    @Body() logs: { workoutSetId: number; actualLoad: number }[]
  ) {
    const date = new Date();

    const payload = await Promise.all(
      logs.map(async (log) => {
        const set = await prisma.workoutSet.findUnique({
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

    return prisma.workoutLog.createMany({ data: payload });
  }

  @Get('latest')
  async getLatestLogs(@Query('planId') planId: string) {
    const plan = await prisma.workoutPlan.findUnique({
      where: { id: Number(planId) },
      include: {
        workoutDays: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    const logs: Record<number, number> = {};

    for (const day of plan?.workoutDays || []) {
      for (const ex of day.exercises) {
        for (const set of ex.sets) {
          const latest = await prisma.workoutLog.findFirst({
            where: { workoutSetId: set.id },
            orderBy: { date: 'desc' },
          });

          if (latest) {
            logs[set.id] = latest.actualLoad;
          }
        }
      }
    }

    return logs;
  }
}