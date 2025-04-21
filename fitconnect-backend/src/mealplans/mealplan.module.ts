import { Module } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { MealPlanController } from './mealplan.controller';

@Module({
  controllers: [MealPlanController],
  providers: [MealPlanService]
})
export class MealPlanModule {}