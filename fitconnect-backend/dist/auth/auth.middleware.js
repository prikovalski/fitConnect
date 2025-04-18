"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'minhaChaveSuperSecreta';
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader)
            throw new common_1.UnauthorizedException('Token não fornecido');
        const token = authHeader.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('Token mal formatado');
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req['user'] = decoded;
            next();
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Token inválido ou expirado');
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map