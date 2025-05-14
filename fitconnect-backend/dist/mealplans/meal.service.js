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
exports.MealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MealService = class MealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMealWithItems(planId, data) {
        return this.prisma.meal.create({
            data: {
                name: data.name,
                order: data.order,
                mealPlanId: planId,
                items: {
                    create: data.items.map(item => ({
                        foodName: item.foodName,
                        quantity: item.quantity,
                        notes: item.notes,
                    }))
                }
            },
            include: { items: true }
        });
    }
    async updateMealWithItems(mealId, data) {
        return this.prisma.$transaction(async (tx) => {
            await tx.meal.update({
                where: { id: mealId },
                data: {
                    name: data.name,
                    order: data.order,
                },
            });
            await tx.mealItem.deleteMany({
                where: { mealId },
            });
            if (data.items.length > 0) {
                await tx.mealItem.createMany({
                    data: data.items.map(item => ({
                        mealId,
                        foodName: item.foodName,
                        quantity: item.quantity,
                        notes: item.notes || '',
                    })),
                });
            }
            return { message: 'Refeição atualizada com sucesso!' };
        });
    }
};
exports.MealService = MealService;
exports.MealService = MealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealService);
//# sourceMappingURL=meal.service.js.map