import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { WorkoutModule } from './workouts/workout.module';
import { MealPlanModule } from './mealplans/mealplan.module';
import { AssessmentModule } from './assessments/assessment.module';

@Module({
  imports: [AuthModule, WorkoutModule, MealPlanModule, AssessmentModule],
  controllers: [AppController],
})
export class AppModule {}
