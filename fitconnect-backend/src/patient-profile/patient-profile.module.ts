import { Module } from '@nestjs/common';
import { PatientProfileService } from './patient-profile.service';
import { PatientProfileController } from './patient-profile.controller';
import { PrismaService } from '../prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/patient-photos', // pasta onde as fotos serão salvas
    }),
  ],
  controllers: [PatientProfileController],
  providers: [PatientProfileService, PrismaService],
})
export class PatientProfileModule {}
