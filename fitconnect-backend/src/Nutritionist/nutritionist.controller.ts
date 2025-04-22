import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('nutritionist')
@UseGuards(JwtAuthGuard)
export class NutritionistController {
  constructor(private readonly nutritionistService: NutritionistService) {}

  @Roles('NUTRITIONIST')
  @Get('patients')
  getPatients(@Req() req: any) {
    const nutritionistId = req.user.sub;
    console.log("🔍 req.user:", req.user);
    return this.nutritionistService.getSharedPatients(nutritionistId);
  }
}