import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';

@Controller('mealplans')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post()
  create(@Body() body: { title: string; description: string; nutritionistId: number; patientId: number }) {
    return this.mealPlanService.createMealPlan(body);
  }

  @Get()
  getByPatient(@Query('patientId') patientId: string) {
    return this.mealPlanService.getMealPlansByPatient(Number(patientId));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.mealPlanService.getMealPlanById(Number(id));
  }
}