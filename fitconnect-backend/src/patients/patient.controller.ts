// src/patients/patient.controller.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { PatientService } from './patient.service';
import { WorkoutService } from '../workouts/workout.service';

@UseGuards(JwtAuthGuard)
@Controller('nutritionist/patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly workoutService: WorkoutService
  ) {}

  @Roles('NUTRITIONIST')
  @Get(':id/workouts')
  async getPatientWorkouts(@Param('id') id: string) {
    return this.patientService.getPatientWorkouts(Number(id));
  }

  @Roles('NUTRITIONIST')
  @Get(':patientId/workouts/:workoutId/detail')
  async getWorkoutDetailByPatient(
    @Param('patientId') patientId: string,
    @Param('workoutId') workoutId: string
    
  ) {
    return this.workoutService.getWorkoutByPatientAndId(
      Number(patientId),
      Number(workoutId)
    );
  }
}
