// src/trainer/trainer.controller.ts

import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Roles('TRAINER')
  @Get('summary')
  getDashboardSummary(@Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getDashboardSummary(trainerId);
  }

  @Roles('TRAINER')
  @Get('students')
  getStudents(@Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getStudents(trainerId);
  }
  
  @Roles('TRAINER')
  @Get('students/:id/workouts')
  async getStudentWorkouts(@Param('id') id: string, @Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getStudentWorkouts(Number(id), trainerId);
  }

  @Roles('TRAINER')
  @Get('students/:studentId/assessments')
  getStudentAssessments(@Param('studentId') studentId: string, @Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getStudentAssessments(Number(studentId), trainerId);
  }

  @Roles('TRAINER')
  @Get('assessments')
  getUpcomingAssessments(@Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getUpcomingAssessments(trainerId);
  }

  @Roles('TRAINER')
  @Get('workouts')
  getTrainerWorkouts(@Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getTrainerWorkouts(trainerId);
  }

  @Roles('TRAINER')
  @Get('workouts/:id')
  getWorkoutPlanById(@Param('id') id: string, @Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getWorkoutPlanById(Number(id), trainerId);
  }

  @Roles('TRAINER')
  @Get('students/:studentId/basic-info')
  getStudentBasicInfo(@Param('studentId') studentId: string) {
    return this.trainerService.getPatientBasicInfo(Number(studentId));
  }
}
