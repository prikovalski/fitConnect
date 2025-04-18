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
exports.WorkoutByDayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkoutByDayService = class WorkoutByDayService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWorkoutByDay(patientId, day) {
        const workoutDay = await this.prisma.workoutDay.findFirst({
            where: {
                workoutPlan: {
                    patientId,
                    isActive: true,
                },
                dayOfWeek: day,
            },
            include: {
                exercises: {
                    include: {
                        sets: {
                            include: {
                                logs: {
                                    orderBy: { date: 'desc' },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                workoutPlan: true,
            },
        });
        if (!workoutDay) {
            return {
                message: 'Nenhum plano ativo encontrado para este paciente neste dia.',
                planTitle: null,
                day,
                muscleGroup: null,
                exercises: [],
            };
        }
        return {
            planTitle: workoutDay.workoutPlan.title,
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
exports.WorkoutByDayService = WorkoutByDayService;
exports.WorkoutByDayService = WorkoutByDayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutByDayService);
//# sourceMappingURL=workout-by-day.service.js.map