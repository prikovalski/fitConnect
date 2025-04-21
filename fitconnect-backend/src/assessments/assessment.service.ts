import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AssessmentService {
  async createAssessment(data: { method: string; data: any; patientId: number; createdById: number }) {
    return prisma.physicalAssessment.create({ data });
  }

  async getAssessmentsByPatient(patientId: number) {
    return prisma.physicalAssessment.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });
  }

  async getAssessmentById(id: number) {
    return prisma.physicalAssessment.findUnique({ where: { id } });
  }
}