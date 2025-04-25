import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = { sub: user.id, email: user.email, role: user.role, name: user.name };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');
  
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { email },
      data: { password: hashed },
    });
  
    return { message: 'Senha redefinida com sucesso.' };
  }
  

  async register({
    name,
    email,
    password,
    role,
    birthDate,
    gender    
  }: {
    name: string;
    email: string;
    password: string;
    role: string;
    birthDate: string;   // ISO String: 'YYYY-MM-DD'
    gender: 'MALE' | 'FEMALE';
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role,
        birthDate: new Date(birthDate),
        gender
      },
    });

    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}