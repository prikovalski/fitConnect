// src/patient-profile/patient-profile.controller.ts

import { Controller, Post, Body, Get, Put, Req, UseGuards } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('patient-profile')
@UseGuards(JwtAuthGuard)
export class PatientProfileController {
  constructor(private readonly patientProfileService: PatientProfileService) {}

  @Roles('PATIENT')
  @Post()
  async create(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    return this.patientProfileService.create(userId, body);
  }

  @Roles('PATIENT')
  @Get()
  async getProfile(@Req() req: any) {
    const userId = req.user.id;
    return this.patientProfileService.getByUserId(userId);
  }

  @Roles('PATIENT')
  @Put()
  async updateProfile(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    return this.patientProfileService.update(userId, body);
  }
}
