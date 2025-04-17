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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutByDayController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let WorkoutByDayController = class WorkoutByDayController {
    async getWorkoutByDay(patientId, day) {
        const activePlan = await prisma.workoutPlan.findFirst({
            where: {
                patientId: Number(patientId),
                isActive: true,
            },
        });
        if (!activePlan) {
            return { message: 'Nenhum plano de treino ativo encontrado para o paciente.' };
        }
        const workoutDay = await prisma.workoutDay.findFirst({
            where: {
                workoutPlanId: activePlan.id,
                dayOfWeek: day.toUpperCase(),
            },
            include: {
                exercises: {
                    include: {
                        sets: {
                            include: {
                                logs: {
                                    where: { date: { lte: new Date() } },
                                    orderBy: { date: 'desc' },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!workoutDay) {
            return { message: 'Nenhum treino encontrado para esse dia.' };
        }
        return {
            planTitle: activePlan.title,
            day: workoutDay.dayOfWeek,
            muscleGroup: workoutDay.muscleGroup,
            exercises: workoutDay.exercises.map((exercise) => ({
                name: exercise.name,
                sets: exercise.sets.map((set) => ({
                    setNumber: set.setNumber,
                    targetReps: set.targetReps,
                    targetLoad: set.targetLoad,
                    lastLog: set.logs[0]
                        ? {
                            actualReps: set.logs[0].actualReps,
                            actualLoad: set.logs[0].actualLoad,
                        }
                        : null,
                })),
            })),
        };
    }
};
exports.WorkoutByDayController = WorkoutByDayController;
__decorate([
    (0, common_1.Get)('by-day'),
    __param(0, (0, common_1.Query)('patientId')),
    __param(1, (0, common_1.Query)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkoutByDayController.prototype, "getWorkoutByDay", null);
exports.WorkoutByDayController = WorkoutByDayController = __decorate([
    (0, common_1.Controller)('workout')
], WorkoutByDayController);
//# sourceMappingURL=workout-by-day.controller.js.map