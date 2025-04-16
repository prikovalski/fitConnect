import { Module } from '@nestjs/common';
import { SetController } from './set.controller';

@Module({
  controllers: [SetController],
})
export class SetModule {}