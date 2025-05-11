// src/patients/patient.controller.ts

import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/roles.decorator';
import { PatientService } from './patient.service';
import { WorkoutService } from '../workouts/workout.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@UseGuards(JwtAuthGuard)
@Controller('nutritionist/patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly workoutService: WorkoutService
  ) {}

  @Roles('NUTRITIONIST')
  @Get(':id/workouts')
  async getPatientWorkouts(@Param('id') id: string) {
    return this.patientService.getPatientWorkouts(Number(id));
  }

  @Roles('NUTRITIONIST')
  @Get(':patientId/workouts/:workoutId/detail')
  async getWorkoutDetailByPatient(
    @Param('patientId') patientId: string,
    @Param('workoutId') workoutId: string
    
  ) {
    return this.workoutService.getWorkoutByPatientAndId(
      Number(patientId),
      Number(workoutId)
    );
  }
  @Roles('PATIENT')
  @Post('profile')
  async savePatientProfile(@Req() req: any, @Body() body: any) {
    const userId = req.user.id;
    return this.patientService.saveProfile(userId, body);
  }
  @Roles('PATIENT')
  @Get('profile')
  async getPatientProfile(@Req() req: any) {
    const userId = req.user.id;
    return this.patientService.getPatientProfile(userId);
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
    const url = `/uploads/patient-photos/${file.filename}`; // Você pode depois configurar a URL pública
    return this.patientService.savePatientPhoto(userId, url);
  }

  @Roles('PATIENT','NUTRITIONIST','TRAINER')
  @Get('photos')
  async getPhotos(@Req() req: any) {
    const userId = req.user.id;
    return this.patientService.getPatientPhotos(userId);
  }
}
