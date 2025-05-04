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
const date_fns_1 = require("date-fns");
let TrainerService = class TrainerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateAccess(patientId, professionalId, role) {
        const sharing = await this.prisma.dataSharing.findFirst({
            where: {
                patientId,
                professionalId,
                role
            }
        });
        if (!sharing) {
            throw new common_1.ForbiddenException('Você não tem permissão para acessar os dados deste paciente.');
        }
        return sharing;
    }
    async getDashboardSummary(trainerId) {
        const students = await this.prisma.dataSharing.findMany({
            where: {
                professionalId: trainerId,
                role: 'TRAINER',
                shareWorkoutWith: true,
            },
            select: {
                patientId: true,
            },
        });
        const upcomingAssessments = await this.prisma.physicalAssessment.count({
            where: {
                nextAssessment: {
                    gte: new Date(),
                    lte: (0, date_fns_1.addDays)(new Date(), 30)
                }
            }
        });
        const studentIds = students.map(s => s.patientId);
        const activeWorkouts = await this.prisma.workoutPlan.count({
            where: {
                trainerId,
                isActive: true,
                patientId: { in: studentIds },
            },
        });
        const expiringWorkouts = await this.prisma.workoutPlan.count({
            where: {
                trainerId,
                isActive: true,
                validUntil: { lte: (0, date_fns_1.addDays)(new Date(), 7) },
                patientId: { in: studentIds },
            },
        });
        return {
            studentsCount: studentIds.length,
            activeWorkouts,
            expiringWorkouts,
            upcomingAssessments
        };
    }
    async getStudents(trainerId) {
        const sharedPatients = await this.prisma.dataSharing.findMany({
            where: {
                professionalId: trainerId,
                role: 'TRAINER',
                shareWorkoutWith: true
            },
            select: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        return sharedPatients.map(s => s.patient);
    }
    async getStudentWorkouts(studentId, trainerId) {
        await this.validateAccess(studentId, trainerId, 'TRAINER');
        const plan = await this.prisma.workoutPlan.findFirst({
            where: {
                patientId: studentId,
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
    async getStudentAssessments(studentId, trainerId) {
        await this.validateAccess(studentId, trainerId, 'TRAINER');
        const student = await this.prisma.user.findUnique({
            where: { id: studentId },
            select: { name: true }
        });
        if (!student) {
            throw new Error('Paciente não encontrado');
        }
        const assessments = await this.prisma.physicalAssessment.findMany({
            where: { patientId: studentId },
            select: {
                id: true,
                method: true,
                date: true,
                nextAssessment: true
            },
            orderBy: { date: 'desc' }
        });
        return {
            studentName: student.name,
            assessments
        };
    }
    async getUpcomingAssessments(trainerId) {
        const today = new Date();
        const limitDate = (0, date_fns_1.addDays)(today, 30);
        const sharedPatients = await this.prisma.dataSharing.findMany({
            where: {
                professionalId: trainerId,
                role: 'TRAINER',
                shareWorkoutWith: true
            },
            select: { patientId: true }
        });
        const patientIds = sharedPatients.map(p => p.patientId);
        if (patientIds.length === 0)
            return [];
        const assessments = await this.prisma.physicalAssessment.findMany({
            where: {
                patientId: { in: patientIds },
                nextAssessment: {
                    gte: today,
                    lte: limitDate
                }
            },
            select: {
                id: true,
                method: true,
                nextAssessment: true,
                patient: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: { nextAssessment: 'asc' }
        });
        return assessments.map(a => ({
            id: a.id,
            method: a.method,
            nextAssessment: a.nextAssessment,
            patientName: a.patient.name
        }));
    }
    async getTrainerAssessments(trainerId) {
        const sharedPatients = await this.prisma.dataSharing.findMany({
            where: {
                professionalId: trainerId,
                role: 'TRAINER',
                shareWorkoutWith: true
            },
            select: {
                patientId: true,
                patient: {
                    select: {
                        name: true
                    }
                }
            }
        });
        const patientIds = sharedPatients.map(p => p.patientId);
        const assessments = await this.prisma.physicalAssessment.findMany({
            where: {
                patientId: { in: patientIds }
            },
            select: {
                id: true,
                method: true,
                date: true,
                patientId: true
            },
            orderBy: { date: 'desc' }
        });
        const result = assessments.map(a => {
            const patientInfo = sharedPatients.find(p => p.patientId === a.patientId);
            return {
                id: a.id,
                method: a.method,
                date: a.date,
                patientName: (patientInfo === null || patientInfo === void 0 ? void 0 : patientInfo.patient.name) || 'Paciente'
            };
        });
        return result;
    }
    async getPatientBasicInfo(patientId) {
        const patient = await this.prisma.user.findUnique({
            where: { id: patientId },
            select: {
                id: true,
                name: true,
                birthDate: true,
                gender: true
            }
        });
        if (!patient)
            throw new Error('Paciente não encontrado');
        const today = new Date();
        const birthDate = new Date(patient.birthDate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const adjustedAge = m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
        return {
            name: patient.name,
            gender: patient.gender,
            age: adjustedAge
        };
    }
    async getTrainerWorkouts(trainerId) {
        const plans = await this.prisma.workoutPlan.findMany({
            where: {
                trainerId,
                isActive: true,
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
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return plans.map(plan => {
            var _a;
            return ({
                id: plan.id,
                title: plan.title,
                description: plan.description,
                validFrom: plan.validFrom,
                validUntil: plan.validUntil,
                isActive: plan.isActive,
                patientName: ((_a = plan.patient) === null || _a === void 0 ? void 0 : _a.name) || 'Paciente',
            });
        });
    }
    async getWorkoutPlanById(patientId, trainerId) {
        return this.prisma.workoutPlan.findMany({
            where: { patientId: patientId },
            select: {
                id: true,
                title: true,
                validUntil: true
            }
        });
    }
    async getWorkoutsByStudent(studentId) {
        return this.prisma.workoutPlan.findMany({
            where: { patientId: studentId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                validFrom: true,
                validUntil: true,
                createdAt: true,
            },
        });
    }
};
exports.TrainerService = TrainerService;
exports.TrainerService = TrainerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainerService);
//# sourceMappingURL=trainer.service.js.map