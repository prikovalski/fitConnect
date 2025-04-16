import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { WorkoutModule } from './workouts/workout.module';

@Module({
  imports: [AuthModule, WorkoutModule],
  controllers: [AppController],
})
export class AppModule {}
