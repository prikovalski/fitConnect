import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  create(@Body() body: { method: string; data: any; patientId: number; createdById: number }) {
    return this.assessmentService.createAssessment(body);
  }

  @Get()
  getByPatient(@Query('patientId') patientId: string) {
    return this.assessmentService.getAssessmentsByPatient(Number(patientId));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.assessmentService.getAssessmentById(Number(id));
  }
}