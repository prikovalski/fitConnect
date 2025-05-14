import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout/days')
export class DayController {
  @Post()
  async create(@Body() body: { workoutPlanId: number; dayOfWeek: string; muscleGroup: string }) {
    return prisma.workoutDay.create({ data: body });
  }
}