import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) {}

  async createMealWithItems(planId: number, data: {
    name: string;
    order: number;
    items: { foodName: string; quantity: string; notes?: string }[];
  }) {
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
}