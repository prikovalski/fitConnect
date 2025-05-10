// src/patient-profile/patient-profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PatientProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'PATIENT') {
      throw new NotFoundException('Usuário paciente não encontrado.');
    }

    return this.prisma.patientProfile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async getByUserId(userId: number) {
    return this.prisma.patientProfile.findUnique({
      where: { userId },
    });
  }

  async update(userId: number, data: any) {
    return this.prisma.patientProfile.update({
      where: { userId },
      data,
    });
  }
}
