import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workouts/plans')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @Get()
  getWorkoutPlansByPatient(@Query('patientId') patientId: string) {
    return this.workoutPlanService.getPlansByPatientId(Number(patientId));
  }
}