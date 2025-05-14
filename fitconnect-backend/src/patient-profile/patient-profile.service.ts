// src/patient-profile/patient-profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PatientProfileService {
  constructor(private readonly prisma: PrismaService) {}
  
  private mapGenderToEnum(genderString: string): 'MALE' | 'FEMALE' | 'OTHER' {
    switch (genderString.toLowerCase()) {
      case 'masculino':
        return 'MALE';
      case 'feminino':
        return 'FEMALE';
      case 'outro':
        return 'OTHER';
      default:
        throw new Error('Gênero inválido');
    }
  }

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
    // Atualizar User (peso, nascimento, gênero)
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        gender: this.mapGenderToEnum(data.gender),
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        peso: data.weight ? parseFloat(data.weight) : null,
      },
    });
  
    // Atualizar PatientProfile (outros campos)
    return this.prisma.patientProfile.update({
      where: { userId },
      data: {
        height: parseFloat(data.height),
        city: data.city,
        goal: data.goal,
        chronicDisease: data.chronicDisease,
        medicalRestriction: data.medicalRestriction,
        foodAllergy: data.foodAllergy,
        avoidFood: data.avoidFood,
        physicalActivity: data.physicalActivity,
        activityFrequency: data.activityFrequency,
        fixedMealTimes: data.fixedMealTimes,
        mustHaveFood: data.mustHaveFood,
        neckCircumference: data.neckCircumference ? parseFloat(data.neckCircumference) : null,
        waistCircumference: data.waistCircumference ? parseFloat(data.waistCircumference) : null,
        hipCircumference: data.hipCircumference ? parseFloat(data.hipCircumference) : null,
        profileImageUrl: data.profileImageUrl || null,
      },
    });
  }
  
  async saveProfile(userId: number, data: any) {
    return this.prisma.patientProfile.upsert({
      where: { userId },
      update: {
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        city: data.city,
        goal: data.goal,
        chronicDisease: data.chronicDisease,
        medicalRestriction: data.medicalRestriction,
        foodAllergy: data.foodAllergy,
        avoidFood: data.avoidFood,
        physicalActivity: data.physicalActivity,
        activityFrequency: data.activityFrequency,
        fixedMealTimes: data.fixedMealTimes,
        mustHaveFood: data.mustHaveFood,
        neckCircumference: parseFloat(data.neckCircumference),
        waistCircumference: parseFloat(data.waistCircumference),
        hipCircumference: parseFloat(data.hipCircumference),
        profileImageUrl: data.profileImageUrl || null, // Caso você adicione a foto depois
      },
      create: {
        userId,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        city: data.city,
        goal: data.goal,
        chronicDisease: data.chronicDisease,
        medicalRestriction: data.medicalRestriction,
        foodAllergy: data.foodAllergy,
        avoidFood: data.avoidFood,
        physicalActivity: data.physicalActivity,
        activityFrequency: data.activityFrequency,
        fixedMealTimes: data.fixedMealTimes,
        mustHaveFood: data.mustHaveFood,
        neckCircumference: parseFloat(data.neckCircumference),
        waistCircumference: parseFloat(data.waistCircumference),
        hipCircumference: parseFloat(data.hipCircumference),
        profileImageUrl: data.profileImageUrl || null,
      },
    });
  }

  // Dentro de patient.service.ts
  async getPatientProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        gender: true,
        birthDate: true,
        peso: true,
        patientProfile: {
          select: {
            height: true,
            city: true,
            goal: true,
            chronicDisease: true,
            medicalRestriction: true,
            foodAllergy: true,
            avoidFood: true,
            physicalActivity: true,
            activityFrequency: true,
            fixedMealTimes: true,
            mustHaveFood: true,
            neckCircumference: true,
            waistCircumference: true,
            hipCircumference: true,
            profileImageUrl: true,
          }
        }
      }
    });
  
    if (!user || !user.patientProfile) {
      throw new Error('Perfil do paciente não encontrado');
    }
  
    return {
      gender: user.gender,
      birthDate: user.birthDate,
      weight: user.peso,
      ...user.patientProfile
    };
  }
  
  async savePatientPhoto(patientId: number, imageUrl: string) {
    // Verifica se o paciente existe
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    // Salva a foto
    const photo = await this.prisma.patientPhoto.create({
      data: {
        url: imageUrl,
        patientId: patientId,
      },
    });

    return photo;
  }

  async getPatientPhotos(userId: number) {
    return this.prisma.patientPhoto.findMany({
      where: {
        patientId: userId,
      },
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }
  async deletePatientPhoto(userId: number, photoId: number) {
    const photo = await this.prisma.patientPhoto.findFirst({
      where: {
        id: photoId,
        patient: { id: userId},
      },
    });
  
    if (!photo) {
      throw new Error('Foto não encontrada.');
    }
  
    try {
      // Monta o caminho físico do arquivo
      const photoPath = join(__dirname, '..', '..', 'uploads', 'patient-photos', photo.url);
  
      // Verifica se o arquivo existe antes de tentar apagar
      if (existsSync(photoPath)) {
        unlinkSync(photoPath);
      }
  
      // Agora deleta do banco
      await this.prisma.patientPhoto.delete({
        where: { id: photoId },
      });
  
      return { message: 'Foto deletada com sucesso.' };
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      throw new Error('Erro ao deletar foto.');
    }
  }
  
}
