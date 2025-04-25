import { Controller, Post, Body, Get, Query, Param, Put, Req } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { Roles } from '../auth/roles.decorator';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Roles('TRAINER', 'NUTRITIONIST')
  @Post()
  create(@Body() body: any) {
    return this.assessmentService.createAssessment(body);
  }
  

  @Roles('PATIENT', 'TRAINER', 'NUTRITIONIST')
  @Get()
  getByPatient(@Query('patientId') patientId: string) {
    return this.assessmentService.getAssessmentsByPatient(Number(patientId));
  }

  @Roles('PATIENT', 'TRAINER', 'NUTRITIONIST')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.assessmentService.getAssessmentById(Number(id));
  }

  @Roles('TRAINER', 'NUTRITIONIST')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { method?: string; data?: any; nextAssessment?: Date }
  ) {
    return this.assessmentService.updateAssessment(Number(id), body);
  }
}