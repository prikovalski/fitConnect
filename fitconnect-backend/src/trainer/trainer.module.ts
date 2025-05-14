import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService, PrismaService],
})
export class TrainerModule {}
