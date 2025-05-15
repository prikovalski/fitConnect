import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs'; // ✅ IMPORTANTE: precisa importar aqui

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.use((req: Request, res: Response, next: NextFunction) => {
    const isPublic = [
      '/auth/login',
      '/auth/register'
    ];
  
    const publicPaths = [
      '/uploads/', // qualquer coisa em uploads
    ];
  
    const pathIsPublic = isPublic.includes(req.path) || publicPaths.some(publicPath => req.path.startsWith(publicPath));
  
    if (pathIsPublic) {
      return next();
    }
  
    const middleware = new AuthMiddleware();
    return middleware.use(req, res, next);
  });

  // ✅ Cria automaticamente a pasta uploads/patient-photos se não existir
  const uploadsPath = join(__dirname, '..', 'uploads', 'patient-photos');
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
    console.log('📁 Pasta uploads/patient-photos criada automaticamente.');
  }

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
