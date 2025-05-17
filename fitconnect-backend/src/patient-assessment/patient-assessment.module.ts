import { Module } from '@nestjs/common';
import { PatientAssessmentController } from './patient-assessment.controller';
import { PatientAssessmentService } from './patient-assessment.service';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [PatientAssessmentController],
  providers: [PatientAssessmentService, PrismaService],
})
export class PatientAssessmentModule {}
