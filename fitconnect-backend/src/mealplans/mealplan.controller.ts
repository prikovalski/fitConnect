import { Controller, Post, Body, Get, Param, Query, Put, Req } from '@nestjs/common';
import { MealPlanService } from './mealplan.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('mealplans')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Roles('NUTRITIONIST')
  @Post()
  create(@Body() body: {
    title: string;
    description: string;
    observations?: string;
    validFrom: string;
    validUntil: string;
    isActive?: boolean;
    nutritionistId: number;
    patientId: number;
  }) {
    return this.mealPlanService.createMealPlan({
      ...body,
      validFrom: new Date(body.validFrom),
      validUntil: new Date(body.validUntil),
      isActive: body.isActive ?? true,
    });
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
  @Roles('NUTRITIONIST')
  @Get('patient/:patientId')
  getPlansByPatient(@Param('patientId') patientId: string) {
    return this.mealPlanService.getPlansByPatient(Number(patientId));
  }
  @Roles('NUTRITIONIST')
  @Get(':planId')
  getMealPlanDetail(@Param('planId') planId: string) {
    return this.mealPlanService.getMealPlanDetail(Number(planId));
  }
  @UseGuards(JwtAuthGuard)
  @Roles('NUTRITIONIST')
  @Put(':planId')
  updateMealPlan(
    @Param('planId') planId: string,
    @Body() body: any,
    @Req() req: any
  ) {
    console.log('Nutritionist ID:', req.user.sub);
    return this.mealPlanService.updateMealPlan(Number(planId), body, req.user.sub);
  }
}