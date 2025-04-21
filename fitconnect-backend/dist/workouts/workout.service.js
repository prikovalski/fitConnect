"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let WorkoutService = class WorkoutService {
    async createWorkout(data) {
        return prisma.workoutPlan.create({
            data: Object.assign(Object.assign({}, data), { validFrom: new Date(data.validFrom), validUntil: new Date(data.validUntil) }),
        });
    }
    async getWorkoutsByPatient(patientId) {
        return prisma.workoutPlan.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getWorkoutById(id) {
        if (!id) {
            throw new Error('ID do plano não foi fornecido.');
        }
        return prisma.workoutPlan.findUnique({ where: { id } });
    }
    async getExercisesByPlan(planId) {
        return prisma.workoutDay.findMany({
            where: { workoutPlanId: planId },
            orderBy: { id: 'asc' },
            include: {
                exercises: {
                    orderBy: { order: 'asc' },
                    include: {
                        sets: {
                            orderBy: { setNumber: 'asc' },
                        },
                    },
                },
            },
        });
    }
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)()
], WorkoutService);
//# sourceMappingURL=workout.service.js.map