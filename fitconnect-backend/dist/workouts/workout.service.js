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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorkoutService = class WorkoutService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWorkout(data) {
        return this.prisma.workoutPlan.create({
            data: {
                title: data.title,
                description: data.description,
                validFrom: new Date(data.validFrom),
                validUntil: new Date(data.validUntil),
                trainerId: data.trainerId,
                patientId: data.patientId,
                workoutDays: {
                    create: data.workoutDays.map((day) => ({
                        dayOfWeek: day.dayOfWeek,
                        muscleGroup: day.muscleGroup,
                        exercises: {
                            create: day.exercises.map((exercise, exerciseIndex) => ({
                                name: exercise.name,
                                order: exerciseIndex + 1,
                                sets: {
                                    create: exercise.sets.map((set, setIndex) => ({
                                        setNumber: setIndex + 1,
                                        targetReps: set.targetReps,
                                        targetLoad: set.targetLoad,
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
        });
    }
    async getWorkoutsByPatient(patientId) {
        return this.prisma.workoutPlan.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getWorkoutById(id) {
        if (!id) {
            throw new Error('ID do plano não foi fornecido.');
        }
        return this.prisma.workoutPlan.findUnique({ where: { id } });
    }
    async getExercisesByPlan(planId) {
        return this.prisma.workoutDay.findMany({
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
    async updateWorkout(id, data) {
        const existing = await this.prisma.workoutPlan.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Plano de treino não encontrado.');
        }
        await this.prisma.workoutLog.deleteMany({
            where: {
                workoutSet: {
                    exercise: {
                        workoutDay: {
                            workoutPlanId: id,
                        },
                    },
                },
            },
        });
        await this.prisma.workoutSet.deleteMany({
            where: {
                exercise: {
                    workoutDay: {
                        workoutPlanId: id,
                    },
                },
            },
        });
        await this.prisma.workoutExercise.deleteMany({
            where: {
                workoutDay: {
                    workoutPlanId: id,
                },
            },
        });
        await this.prisma.workoutDay.deleteMany({
            where: { workoutPlanId: id },
        });
        return this.prisma.workoutPlan.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                validFrom: new Date(data.validFrom),
                validUntil: new Date(data.validUntil),
                workoutDays: {
                    create: data.workoutDays.map((day) => ({
                        dayOfWeek: day.dayOfWeek,
                        muscleGroup: day.muscleGroup,
                        exercises: {
                            create: day.exercises.map((exercise, exerciseIndex) => ({
                                name: exercise.name,
                                order: exerciseIndex + 1,
                                sets: {
                                    create: exercise.sets.map((set, setIndex) => ({
                                        setNumber: setIndex + 1,
                                        targetReps: set.targetReps,
                                        targetLoad: set.targetLoad,
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
        });
    }
    async getWorkoutByPatientAndId(patientId, workoutId) {
        const workout = await this.prisma.workoutPlan.findFirst({
            where: {
                id: workoutId,
                patientId: patientId,
            },
            include: {
                workoutDays: {
                    include: {
                        exercises: {
                            include: {
                                sets: {
                                    include: {
                                        logs: {
                                            orderBy: { date: 'desc' },
                                            take: 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patient: {
                    select: {
                        id: true,
                        name: true,
                        peso: true
                    }
                }
            }
        });
        if (!workout)
            throw new common_1.NotFoundException('Treino não encontrado.');
        return Object.assign(Object.assign({}, workout), { patientName: workout.patient.name, patientPeso: workout.patient.peso });
    }
};
exports.WorkoutService = WorkoutService;
exports.WorkoutService = WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkoutService);
//# sourceMappingURL=workout.service.js.map