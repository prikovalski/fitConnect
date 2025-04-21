import { Controller, Get, Query } from '@nestjs/common';
import { WorkoutByDayService } from './workout-by-day.service';

@Controller('workout')
export class WorkoutByDayController {
  constructor(private readonly workoutByDayService: WorkoutByDayService) {}

  @Get('by-day')
  async getWorkoutByDay(
    @Query('patientId') patientId: string,
    @Query('day') day: string,
  ) {
    return this.workoutByDayService.getWorkoutByDay(
      Number(patientId),
      day.toUpperCase(),
    );
  }
}
