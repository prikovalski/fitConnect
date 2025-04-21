"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('E-mail ou senha inválidos.');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('E-mail ou senha inválidos.');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
    async resetPassword(email, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error('Usuário não encontrado');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashed },
        });
        return { message: 'Senha redefinida com sucesso.' };
    }
    async register({ name, email, password, role, }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role,
            },
        });
        const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
        const token = await this.jwtService.signAsync(payload);
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map