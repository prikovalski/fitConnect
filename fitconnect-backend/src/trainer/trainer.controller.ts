import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TrainerService } from '././trainer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('trainer')
@UseGuards(JwtAuthGuard)
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Roles('TRAINER')
  @Get('summary')
  getDashboardSummary(@Req() req: any) {
    const trainerId = req.user.id;

    return this.trainerService.getDashboardSummary(trainerId);
  }
}
