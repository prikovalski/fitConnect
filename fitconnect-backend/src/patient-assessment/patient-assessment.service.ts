import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PatientAssessmentService {
  constructor(private prisma: PrismaService) {}

  async getAssessments(patientId: number) {
    return this.prisma.physicalAssessment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
      select: {
        id: true,
        method: true,
        date: true,
        nextAssessment: true,
        createdBy: {
          select: { name: true }
        }
      },
    });
  }

  async getAssessmentDetails(patientId: number, assessmentId: number) {
    const assessment = await this.prisma.physicalAssessment.findFirst({
      where: { id: assessmentId, patientId },
    });

    if (!assessment) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return assessment;
  }
}
