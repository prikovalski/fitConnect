import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
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
  
  @Roles('NUTRITIONIST')
  @Get('patient/:id')
  async getPatientDetail(@Param('id') id: string, @Req() req: any) {
    const nutritionistId = req.user.sub;
    console.log("🔍 Nutritionist ID Controller:", nutritionistId);
    return this.nutritionistService.getPatientDetail(Number(id), nutritionistId);
  }
}