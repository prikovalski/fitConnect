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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutByDayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma.service");
let WorkoutByDayService = class WorkoutByDayService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWorkoutByDay(patientId, day) {
        const workoutDay = await this.prisma.workoutDay.findFirst({
            where: {
                workoutPlan: {
                    patientId,
                    active: true,
                },
                dayOfWeek: day,
            },
            include: {
                exercises: {
                    include: {
                        sets: {
                            include: {
                                logs: {
                                    orderBy: { createdAt: 'desc' },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                workoutPlan: true,
            },
        });
        if (!workoutDay)
            return null;
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
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], WorkoutByDayService);
//# sourceMappingURL=workout-by-day.service.js.map