// src/patient-profile/patient-profile.controller.ts

import { Controller, Post, Body, Get, Put, Req, UseGuards, UploadedFile, UseInterceptors, Delete, Param } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';


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

  @Roles('PATIENT')
  @Post('profile')
  async savePatientProfile(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    return this.patientProfileService.saveProfile(userId, body);
  }
  @Roles('PATIENT')
  @Get('profile')
  async getPatientProfile(@Req() req: any) {
    const userId = req.user.id;
    return this.patientProfileService.getPatientProfile(userId);
  }
  @Roles('PATIENT')
  @Post('photos/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/patient-photos', // Pasta onde as fotos serão salvas
      filename: (req, file, callback) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  }))
  async uploadPhoto(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.id;
    const url = `/uploads/patient-photos/${file.filename}`; 
    return this.patientProfileService.savePatientPhoto(userId, url);
  }

  @Roles('PATIENT','NUTRITIONIST','TRAINER')
  @Get('photos')
  async getPhotos(@Req() req: any) {
    const userId = req.user.id;
    return this.patientProfileService.getPatientPhotos(userId);
  }

  @Roles('PATIENT')
  @Delete('photos/:photoId')
  async deletePhoto(@Req() req: any, @Param('photoId') photoId: string) {
    const userId = req.user.id;
    return this.patientProfileService.deletePatientPhoto(userId, Number(photoId));
  }

}
