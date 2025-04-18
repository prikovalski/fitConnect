import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { Request, Response, NextFunction } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Exceções para rotas públicas
    const isPublic = [
      '/auth/login',
      '/auth/register'
    ].includes(req.path);

    if (isPublic) {
      return next();
    }

    const middleware = new AuthMiddleware();
    return middleware.use(req, res, next);
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3333);

}
bootstrap();
