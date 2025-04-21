import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { WorkoutModule } from './workouts/workout.module';
import { MealPlanModule } from './mealplans/mealplan.module';
import { AssessmentModule } from './assessments/assessment.module';
import { DayModule } from './workout/days/day.module';
import { ExerciseModule } from './workout/exercises/exercise.module';
import { SetModule } from './workout/sets/set.module';
import { LogModule } from './workout/logs/log.module';
import { WorkoutTodayModule } from './workout/workout-today.module';
import { PrismaService } from './prisma.service';
import { WorkoutPlanModule } from './workouts/workout-plan.module';

@Module({
  imports: [
    WorkoutModule,
    AssessmentModule,
    MealPlanModule,
    DayModule,
    ExerciseModule,
    SetModule,
    LogModule,
    WorkoutTodayModule,
    WorkoutPlanModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
