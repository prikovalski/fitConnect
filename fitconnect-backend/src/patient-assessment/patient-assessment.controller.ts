import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { PatientAssessmentService } from './patient-assessment.service';

@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientAssessmentController {
  constructor(private readonly service: PatientAssessmentService) {}

  @Roles('PATIENT')
  @Get('assessments')
  async listAssessments(@Req() req: any) {
    const userId = req.user.id;
    return this.service.getAssessments(userId);
  }

  @Roles('PATIENT')
  @Get('assessments/:id')
  async getAssessmentById(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.id;
    return this.service.getAssessmentDetails(userId, Number(id));
  }
}
