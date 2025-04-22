import { Module } from '@nestjs/common';
import { NutritionistController } from './nutritionist.controller';
import { NutritionistService } from './nutritionist.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NutritionistController],
  providers: [NutritionistService, PrismaService],
})
export class NutritionistModule {}
