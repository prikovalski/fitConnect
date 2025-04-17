import { Module } from '@nestjs/common';
import { WorkoutByDayController } from './workout-by-day.controller';

@Module({
  controllers: [WorkoutByDayController],
})
export class WorkoutByDayModule {}