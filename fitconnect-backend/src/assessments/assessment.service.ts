import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma.service';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}
  
  async createAssessment(body: any) {
    const { method, data, patientId, createdById, nextAssessment } = body;
  
    console.log('createdById no Service:', createdById);
  
    if (!createdById) {
      throw new Error('ID do criador não fornecido');
    }
  
    return this.prisma.physicalAssessment.create({
      data: {
        method,
        data,
        patientId,
        createdById,
        nextAssessment: new Date(nextAssessment)
      }
    });
  }
  

  async getAssessmentsByPatient(patientId: number) {
    return this.prisma.physicalAssessment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });
  }

  async getAssessmentById(id: number) {
    return this.prisma.physicalAssessment.findUnique({ where: { id } });
  }

  async updateAssessment(id: number, body: { method?: string; data?: any; nextAssessment?: Date }) {
    const existing = await this.prisma.physicalAssessment.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException('Avaliação não encontrada para atualização.');
    }

    return this.prisma.physicalAssessment.update({
      where: { id },
      data: {
        method: body.method ?? existing.method,
        data: body.data ?? existing.data,
        nextAssessment: body.nextAssessment ?? existing.nextAssessment
      }
    });
  }
}