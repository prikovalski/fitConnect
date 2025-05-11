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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PatientService = class PatientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientWorkouts(patientId) {
        const patient = await this.prisma.user.findUnique({
            where: { id: patientId },
            select: {
                id: true,
                name: true,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
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
                id: true,
                email: true,
                name: true,
                gender: true,
                birthDate: true,
                peso: true,
                patientProfile: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const profile = user.patientProfile;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            gender: user.gender,
            birthDate: user.birthDate,
            peso: user.peso,
            height: (profile === null || profile === void 0 ? void 0 : profile.height) || null,
            city: (profile === null || profile === void 0 ? void 0 : profile.city) || '',
            goal: (profile === null || profile === void 0 ? void 0 : profile.goal) || '',
            chronicDisease: (profile === null || profile === void 0 ? void 0 : profile.chronicDisease) || '',
            medicalRestriction: (profile === null || profile === void 0 ? void 0 : profile.medicalRestriction) || '',
            foodAllergy: (profile === null || profile === void 0 ? void 0 : profile.foodAllergy) || '',
            avoidFood: (profile === null || profile === void 0 ? void 0 : profile.avoidFood) || '',
            physicalActivity: (profile === null || profile === void 0 ? void 0 : profile.physicalActivity) || '',
            activityFrequency: (profile === null || profile === void 0 ? void 0 : profile.activityFrequency) || '',
            fixedMealTimes: (profile === null || profile === void 0 ? void 0 : profile.fixedMealTimes) || '',
            mustHaveFood: (profile === null || profile === void 0 ? void 0 : profile.mustHaveFood) || '',
            neckCircumference: (profile === null || profile === void 0 ? void 0 : profile.neckCircumference) || null,
            waistCircumference: (profile === null || profile === void 0 ? void 0 : profile.waistCircumference) || null,
            hipCircumference: (profile === null || profile === void 0 ? void 0 : profile.hipCircumference) || null,
            profileImageUrl: (profile === null || profile === void 0 ? void 0 : profile.profileImageUrl) || null,
        };
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
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientService);
//# sourceMappingURL=patient.service.js.map