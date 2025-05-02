import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PrismaService } from '../prisma.service';
import { WorkoutModule } from 'workouts/workout.module';

@Module({
  imports: [WorkoutModule],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
})
export class PatientModule {}
