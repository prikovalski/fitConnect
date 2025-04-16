import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { Roles } from '../auth/roles.decorator';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Roles('TRAINER', 'NUTRITIONIST')
  @Post()
  create(@Body() body: { method: string; data: any; patientId: number; createdById: number }) {
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
}