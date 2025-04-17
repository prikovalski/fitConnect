import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'minhaChaveSuperSecreta';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token não fornecido');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token mal formatado');

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}