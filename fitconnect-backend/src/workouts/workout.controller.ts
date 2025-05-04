import { Controller, Post, Body, Get, Param, Query, UseGuards, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@Body() body: {
    title: string;
    description: string;
    trainerId: number;
    patientId: number;
    validFrom: string;
    validUntil: string;
    workoutDays: {
      dayOfWeek: string;
      muscleGroup: string;
      exercises: {
        name: string;
        sets: {
          targetReps: number;
          targetLoad: number;
        }[];
      }[];
    }[];
  }) {
    return this.workoutService.createWorkout(body); 
  }

  @Get('plans')
  getByPatient(@Query('patientId') patientId: string) {
    return this.workoutService.getWorkoutsByPatient(Number(patientId));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.workoutService.getWorkoutById(Number(id));
  }

  @Get(':id/exercises')
  getExercises(@Param('id') id: string) {
    return this.workoutService.getExercisesByPlan(Number(id));
  }

  @Put(':id')
  updateWorkout(@Param('id') id: string, @Body() body: any) {
    return this.workoutService.updateWorkout(Number(id), body);
  }
}
