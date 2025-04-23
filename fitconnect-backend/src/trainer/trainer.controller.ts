import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('trainer')
@UseGuards(JwtAuthGuard)
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
  async getStudents(@Req() req: any) {
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
  @Get('students/:id/assessments')
  async getStudentAssessments(@Param('id') id: string, @Req() req: any) {
    const trainerId = req.user.id;
    return this.trainerService.getStudentAssessments(Number(id), trainerId);
  }
} 
