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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let LogService = class LogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(logs) {
        const date = new Date();
        const payload = await Promise.all(logs.map(async (log) => {
            const set = await this.prisma.workoutSet.findUnique({
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
        return this.prisma.workoutLog.createMany({ data: payload });
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogService);
//# sourceMappingURL=log.service.js.map