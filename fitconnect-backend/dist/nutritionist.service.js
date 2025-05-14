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
exports.NutritionistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let NutritionistService = class NutritionistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSharedPatients(nutritionistId) {
        const patients = await this.prisma.dataSharing.findMany({
            where: { shareMealWith: true },
            include: {
                patient: true
            }
        });
        const result = await Promise.all(patients.map(async (sharing) => {
            const latestMealPlan = await this.prisma.mealPlan.findFirst({
                where: { patientId: sharing.patientId, nutritionistId },
                orderBy: { createdAt: 'desc' }
            });
            const latestWorkout = await this.prisma.workoutPlan.findFirst({
                where: { patientId: sharing.patientId, isActive: true },
                orderBy: { createdAt: 'desc' }
            });
            return {
                id: sharing.patient.id,
                name: sharing.patient.name,
                email: sharing.patient.email,
                latestMealPlan: latestMealPlan ? { title: latestMealPlan.title } : null,
                latestWorkout: latestWorkout ? { title: latestWorkout.title } : null
            };
        }));
        return result;
    }
};
exports.NutritionistService = NutritionistService;
exports.NutritionistService = NutritionistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], NutritionistService);
//# sourceMappingURL=nutritionist.service.js.map