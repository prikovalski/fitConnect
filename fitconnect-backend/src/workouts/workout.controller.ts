import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@Body() body: { title: string; description: string; trainerId: number; patientId: number; validFrom: string; validUntil: string }) {
    return this.workoutService.createWorkout(body);
  }
  

  @Get()
  getByPatient(@Query('patientId') patientId: string) {
    return this.workoutService.getWorkoutsByPatient(Number(patientId));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.workoutService.getWorkoutById(Number(id));
  }
}