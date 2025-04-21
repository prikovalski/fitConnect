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
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return res.sendStatus(200);
        }
        const publicRoutes = ['/auth/login', '/auth/register'];
        if (publicRoutes.includes(req.path)) {
            return next();
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não encontrado' });
        }
        const [, token] = authHeader.split(' ');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map