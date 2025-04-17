import { Controller, Post, Body, Put, Param } from '@nestjs/common';
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
}