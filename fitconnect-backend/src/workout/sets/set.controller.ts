import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('workout/sets')
export class SetController {
  @Post()
  async create(@Body() body: { exerciseId: number; setNumber: number; targetReps: number; targetLoad: number }) {
    return prisma.workoutSet.create({ data: body });
  }
}