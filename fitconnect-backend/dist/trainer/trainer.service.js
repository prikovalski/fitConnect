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
    async getDashboardSummary(trainerId) {
        const students = await this.prisma.dataSharing.findMany({
            where: {
                shareWorkoutWith: true,
            },
            select: {
                patientId: true,
            },
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
            expiringWorkouts
        };
    }
    async getStudents(trainerId) {
        const sharedPatients = await this.prisma.dataSharing.findMany({
            where: {
                shareWorkoutWith: true
            },
            select: {
                patientId: true
            }
        });
        const patientIds = sharedPatients.map(p => p.patientId);
        const patients = await this.prisma.user.findMany({
            where: {
                id: { in: patientIds }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return patients;
    }
};
exports.TrainerService = TrainerService;
exports.TrainerService = TrainerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrainerService);
//# sourceMappingURL=trainer.service.js.map