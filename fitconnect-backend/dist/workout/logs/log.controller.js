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
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let LogController = class LogController {
    async create(body) {
        return prisma.workoutLog.create({ data: Object.assign(Object.assign({}, body), { date: new Date(body.date) }) });
    }
    async update(id, body) {
        return prisma.workoutLog.update({
            where: { id: Number(id) },
            data: {
                actualReps: body.actualReps,
                actualLoad: body.actualLoad,
            },
        });
    }
    async createMany(logs) {
        const date = new Date();
        const payload = await Promise.all(logs.map(async (log) => {
            const set = await prisma.workoutSet.findUnique({
                where: { id: log.workoutSetId },
                select: { targetReps: true },
            });
            return {
                workoutSetId: log.workoutSetId,
                date,
                actualReps: (set === null || set === void 0 ? void 0 : set.targetReps) || 0,
                actualLoad: log.actualLoad,
            };
        }));
        return prisma.workoutLog.createMany({ data: payload });
    }
    async getLatestLogs(planId) {
        const plan = await prisma.workoutPlan.findUnique({
            where: { id: Number(planId) },
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
        const logs = {};
        for (const day of (plan === null || plan === void 0 ? void 0 : plan.workoutDays) || []) {
            for (const ex of day.exercises) {
                for (const set of ex.sets) {
                    const latest = await prisma.workoutLog.findFirst({
                        where: { workoutSetId: set.id },
                        orderBy: { date: 'desc' },
                    });
                    if (latest) {
                        logs[set.id] = latest.actualLoad;
                    }
                }
            }
        }
        return logs;
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "createMany", null);
__decorate([
    (0, common_1.Get)('latest'),
    __param(0, (0, common_1.Query)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getLatestLogs", null);
exports.LogController = LogController = __decorate([
    (0, common_1.Controller)('workout/logs')
], LogController);
//# sourceMappingURL=log.controller.js.map