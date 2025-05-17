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
import { NutritionistModule } from 'nutritionist/nutritionist.module';
import { MealModule } from 'mealplans/meal.module'; 
import { TrainerModule } from 'trainer/trainer.module';
import { PatientModule } from 'patients/patient.module';
import { PatientProfileModule } from 'patient-profile/patient-profile.module';
import { NutritionistPatientModule} from 'nutritionist-patient/nutritionist-patient.module';
import { PatientAssessmentModule } from 'patient-assessment/patient-assessment.module';

@Module({
  imports: [
    PatientModule,
    PatientProfileModule,
    PatientAssessmentModule,
    NutritionistPatientModule,
    TrainerModule,
    MealModule,
    NutritionistModule,
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
