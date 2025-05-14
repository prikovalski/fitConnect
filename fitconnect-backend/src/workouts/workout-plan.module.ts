import { Module } from '@nestjs/common';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanService } from './workout-plan.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService, PrismaService],
})
export class WorkoutPlanModule {}