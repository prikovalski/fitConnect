import { Module } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { MealPlanController } from './mealplan.controller';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
@Module({
  controllers: [MealPlanController, MealController],
  providers: [MealPlanService, MealService]
})
export class MealPlanModule {}