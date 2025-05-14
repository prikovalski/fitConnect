import { Module } from '@nestjs/common';
import { WorkoutTodayController } from './workout-today.controller';

@Module({
  controllers: [WorkoutTodayController],
})
export class WorkoutTodayModule {}