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
  async updateMealWithItems(mealId: number, data: { name: string; order: number; items: any[] }) {
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
  
}