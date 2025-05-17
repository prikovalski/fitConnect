// src/patients/patient.controller.ts

import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { PatientService } from './patient.service';
import { WorkoutService } from '../workouts/workout.service';
@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly workoutService: WorkoutService
  ) {}

  @Roles('PATIENT')
  @Get('mealplans/:id')
  async getMealPlanById(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.patientService.getMealPlanById(userId, Number(id));
  }

  @Roles('PATIENT')
  @Get('mealplans')
  async getAllMealPlans(@Req() req: any) {
    const userId = req.user.id;
    return this.patientService.getAllMealPlans(userId);
  }


  
}
