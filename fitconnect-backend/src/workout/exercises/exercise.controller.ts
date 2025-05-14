import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout/exercises')
export class ExerciseController {
  @Post()
  async create(@Body() body: { workoutDayId: number; name: string; order: number }) {
    return prisma.workoutExercise.create({ data: body });
  }
}