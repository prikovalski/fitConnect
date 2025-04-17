import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'minhaChaveSuperSecreta';

@Injectable()
export class AuthService {
  async register(data: { email: string; password: string; name: string; role: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role as Role, 
      },
    });
    return { message: 'Usuário criado com sucesso', user };
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) return null;

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}