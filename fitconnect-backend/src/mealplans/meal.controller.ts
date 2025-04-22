import { Controller, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Roles('NUTRITIONIST')
  @Post(':planId/meals')
  async addMeal(
    @Param('planId') planId: string,
    @Body() body: {
      name: string;
      order: number;
      items: { foodName: string; quantity: string; notes?: string }[];
    }
  ) {
    return this.mealService.createMealWithItems(Number(planId), body);
  }
  @Roles('NUTRITIONIST')
  @Put(':mealId/items')
  async updateMealWithItems(
    @Param('mealId') mealId: string,
    @Body() body: { name: string; order: number; items: { foodName: string; quantity: string; notes?: string }[] }
  ) {
    return this.mealService.updateMealWithItems(Number(mealId), body);
  }

}