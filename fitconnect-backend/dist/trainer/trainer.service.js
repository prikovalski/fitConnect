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
exports.TrainerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TrainerService = class TrainerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardSummary(trainerId) {
        const studentsCount = await this.prisma.user.count({
            where: {
                professionalDataSharing: {
                    some: {
                        professionalId: trainerId,
                        role: 'TRAINER',
                        shareWorkoutWith: true,
                    },
                },
            },
        });
        const upcomingAssessments = await this.prisma.physicalAssessment.count({
            where: {
                createdById: trainerId,
                nextAssessment: {
                    gte: new Date(),
                },
            },
        });
        const expiringWorkouts = await this.prisma.workoutPlan.count({
            where: {
                trainerId,
                isActive: true,
                validUntil: {
                    lte: new Date(new Date().setDate(new Date().getDate() + 7)),
                },
            },
        });
        return {
            studentsCount,
            upcomingAssessments,
            expiringWorkouts,
        };
    }
    async getStudents(trainerId) {
        const students = await this.prisma.user.findMany({
            where: {
                patientPlans: {
                    some: {
                        trainerId: trainerId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                gender: true,
                birthDate: true,
                peso: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return students;
    }
    async getStudentWorkouts(studentId, trainerId) {
        const student = await this.prisma.user.findUnique({
            where: { id: studentId },
            select: {
                name: true,
                patientPlans: {
                    where: {
                        trainerId: trainerId,
                        isActive: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        validFrom: true,
                        validUntil: true,
                    },
                },
            },
        });
        if (!student) {
            throw new Error('Aluno não encontrado');
        }
        return {
            name: student.name,
            workouts: student.patientPlans || [],
        };
    }
    async getStudentAssessments(patientId, trainerId) {
        const assessments = await this.prisma.physicalAssessment.findMany({
            where: {
                patientId,
                createdById: trainerId,
            },
            orderBy: {
                date: 'desc',
            },
        });
        return assessments;
    }
    async getUpcomingAssessments(trainerId) {
        return this.prisma.physicalAssessment.findMany({
            where: {
                createdById: trainerId,
                nextAssessment: {
                    gte: new Date(),
                },
            },
            orderBy: {
                nextAssessment: 'asc',
            },
        });
    }
    async getTrainerAssessments(trainerId) {
        return this.prisma.physicalAssessment.findMany({
            where: {
                createdById: trainerId,
            },
            orderBy: {
                date: 'desc',
            },
        });
    }
    async getPatientBasicInfo(patientId) {
        var _a;
        const patient = await this.prisma.user.findUnique({
            where: { id: patientId },
            select: {
                id: true,
                name: true,
                gender: true,
                birthDate: true,
                peso: true,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException('Paciente não encontrado');
        }
        let finalAge = null;
        if (patient.birthDate) {
            const birthDate = new Date(patient.birthDate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const birthdayThisYearNotYetHappened = today.getMonth() < birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
            if (birthdayThisYearNotYetHappened) {
                age -= 1;
            }
            finalAge = age;
        }
        return {
            id: patient.id,
            name: patient.name,
            gender: patient.gender,
            age: finalAge,
            peso: (_a = patient.peso) !== null && _a !== void 0 ? _a : null,
        };
    }
    async getTrainerWorkouts(trainerId) {
        return this.prisma.workoutPlan.findMany({
            where: {
                trainerId,
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getWorkoutPlanById(id, trainerId) {
        const plan = await this.prisma.workoutPlan.findFirst({
            where: {
                id,
                trainerId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                validFrom: true,
                validUntil: true,
                isActive: true,
                patient: {
                    select: {
                        name: true,
                        peso: true,
                    },
                },
                workoutDays: {
                    select: {
                        id: true,
                        dayOfWeek: true,
                        muscleGroup: true,
                        exercises: {
                            select: {
                                id: true,
                                name: true,
                                sets: {
                                    select: {
                                        id: true,
                                        setNumber: true,
                                        targetReps: true,
                                        targetLoad: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!plan) {
            throw new common_1.NotFoundException('Plano de treino não encontrado.');
        }
        return {
            id: plan.id,
            title: plan.title,
            description: plan.description,
            validFrom: plan.validFrom,
            validUntil: plan.validUntil,
            isActive: plan.isActive,
            patientName: plan.patient.name,
            patientPeso: plan.patient.peso,
            workoutDays: plan.workoutDays,
        };
    }
};
exports.TrainerService = TrainerService;
exports.TrainerService = TrainerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainerService);
//# sourceMappingURL=trainer.service.js.map