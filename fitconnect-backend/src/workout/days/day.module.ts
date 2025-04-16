import { Module } from '@nestjs/common';
import { DayController } from './day.controller';

@Module({
  controllers: [DayController],
})
export class DayModule {}