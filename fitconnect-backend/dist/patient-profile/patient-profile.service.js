"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
let PatientProfileService = class PatientProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapGenderToEnum(genderString) {
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
    async create(userId, data) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.role !== 'PATIENT') {
            throw new common_1.NotFoundException('Usuário paciente não encontrado.');
        }
        return this.prisma.patientProfile.create({
            data: Object.assign({ userId }, data),
        });
    }
    async getByUserId(userId) {
        return this.prisma.patientProfile.findUnique({
            where: { userId },
        });
    }
    async update(userId, data) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                gender: this.mapGenderToEnum(data.gender),
                birthDate: data.birthDate ? new Date(data.birthDate) : null,
                peso: data.weight ? parseFloat(data.weight) : null,
            },
        });
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
    async saveProfile(userId, data) {
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
                profileImageUrl: data.profileImageUrl || null,
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
    async getPatientProfile(userId) {
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
        return Object.assign({ gender: user.gender, birthDate: user.birthDate, weight: user.peso }, user.patientProfile);
    }
    async savePatientPhoto(patientId, imageUrl) {
        const patient = await this.prisma.user.findUnique({
            where: { id: patientId },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        const photo = await this.prisma.patientPhoto.create({
            data: {
                url: imageUrl,
                patientId: patientId,
            },
        });
        return photo;
    }
    async getPatientPhotos(userId) {
        return this.prisma.patientPhoto.findMany({
            where: {
                patientId: userId,
            },
            orderBy: {
                uploadedAt: 'desc',
            },
        });
    }
    async deletePatientPhoto(userId, photoId) {
        const photo = await this.prisma.patientPhoto.findFirst({
            where: {
                id: photoId,
                patient: { id: userId },
            },
        });
        if (!photo) {
            throw new Error('Foto não encontrada.');
        }
        try {
            const photoPath = (0, path_1.join)(__dirname, '..', '..', 'uploads', 'patient-photos', photo.url);
            if ((0, fs_1.existsSync)(photoPath)) {
                (0, fs_1.unlinkSync)(photoPath);
            }
            await this.prisma.patientPhoto.delete({
                where: { id: photoId },
            });
            return { message: 'Foto deletada com sucesso.' };
        }
        catch (error) {
            console.error('Erro ao deletar foto:', error);
            throw new Error('Erro ao deletar foto.');
        }
    }
};
exports.PatientProfileService = PatientProfileService;
exports.PatientProfileService = PatientProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientProfileService);
//# sourceMappingURL=patient-profile.service.js.map