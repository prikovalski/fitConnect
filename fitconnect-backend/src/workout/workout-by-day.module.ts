import { Module } from '@nestjs/common';
import { WorkoutByDayController } from './workout-by-day.controller';
import { PrismaService } from './../prisma.service';

@Module({
  controllers: [WorkoutByDayController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class WorkoutByDayModule {}