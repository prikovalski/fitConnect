"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let MealPlanService = class MealPlanService {
    async createMealPlan(data) {
        return prisma.mealPlan.create({ data });
    }
    async getMealPlansByPatient(patientId) {
        return prisma.mealPlan.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getMealPlanById(id) {
        return prisma.mealPlan.findUnique({
            where: { id },
            include: {
                meals: {
                    orderBy: { order: 'asc' },
                    include: {
                        items: true,
                    },
                },
            },
        });
    }
};
exports.MealPlanService = MealPlanService;
exports.MealPlanService = MealPlanService = __decorate([
    (0, common_1.Injectable)()
], MealPlanService);
//# sourceMappingURL=mealplan.service.js.map