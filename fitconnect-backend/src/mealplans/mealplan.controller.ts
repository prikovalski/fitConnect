import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { Roles } from '../auth/roles.decorator';

@Controller('mealplans')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Roles('NUTRITIONIST')
  @Post()
  create(@Body() body: { title: string; description: string; nutritionistId: number; patientId: number }) {
    return this.mealPlanService.createMealPlan(body);
  }

  @Roles('PATIENT')
  @Get()
  getByPatient(@Query('patientId') patientId: string) {
    return this.mealPlanService.getMealPlansByPatient(Number(patientId));
  }

  @Roles('PATIENT', 'NUTRITIONIST')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.mealPlanService.getMealPlanById(Number(id));
  }
}