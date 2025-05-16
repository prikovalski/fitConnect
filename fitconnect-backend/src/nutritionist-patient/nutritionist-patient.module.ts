import { Module } from '@nestjs/common';
import { NutritionistPatientController } from './nutritionist-patient.controller';
import { NutritionistPatientService } from './nutritionist-patient.service';
import { PrismaService } from '../prisma.service';
import { WorkoutModule } from 'workouts/workout.module';

@Module({
  imports: [WorkoutModule],
  controllers: [NutritionistPatientController],
  providers: [NutritionistPatientService, PrismaService],
})
export class NutritionistPatientModule {}
