import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PatientWithActiveWorkouts } from './patient.types'; // importar corretamente o tipo

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getPatientWorkouts(patientId: number): Promise<PatientWithActiveWorkouts> {
    const patient = await this.prisma.user.findUnique({
      where: { id: patientId },
      select: {
        id: true,         
        name: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const workoutPlans = await this.prisma.workoutPlan.findMany({
      where: { patientId, isActive: true },
      include: {
        workoutDays: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });
    return {
      id: patient.id,       
      name: patient.name,
      workoutPlans,
    };
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
        id: true,
        email: true,
        name: true,
        gender: true,
        birthDate: true,
        peso: true,
        patientProfile: true, // <- Traz o PatientProfile associado
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const profile = user.patientProfile;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birthDate: user.birthDate,
      peso: user.peso,
      height: profile?.height || null,
      city: profile?.city || '',
      goal: profile?.goal || '',
      chronicDisease: profile?.chronicDisease || '',
      medicalRestriction: profile?.medicalRestriction || '',
      foodAllergy: profile?.foodAllergy || '',
      avoidFood: profile?.avoidFood || '',
      physicalActivity: profile?.physicalActivity || '',
      activityFrequency: profile?.activityFrequency || '',
      fixedMealTimes: profile?.fixedMealTimes || '',
      mustHaveFood: profile?.mustHaveFood || '',
      neckCircumference: profile?.neckCircumference || null,
      waistCircumference: profile?.waistCircumference || null,
      hipCircumference: profile?.hipCircumference || null,
      profileImageUrl: profile?.profileImageUrl || null,
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

}
