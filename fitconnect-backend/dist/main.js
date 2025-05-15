"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_middleware_1 = require("./auth/auth.middleware");
const core_2 = require("@nestjs/core");
const roles_guard_1 = require("./auth/roles.guard");
const path_1 = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(reflector));
    app.use((req, res, next) => {
        const isPublic = [
            '/auth/login',
            '/auth/register'
        ];
        const publicPaths = [
            '/uploads/',
        ];
        const pathIsPublic = isPublic.includes(req.path) || publicPaths.some(publicPath => req.path.startsWith(publicPath));
        if (pathIsPublic) {
            return next();
        }
        const middleware = new auth_middleware_1.AuthMiddleware();
        return middleware.use(req, res, next);
    });
    const uploadsPath = (0, path_1.join)(__dirname, '..', 'uploads', 'patient-photos');
    if (!(0, fs_1.existsSync)(uploadsPath)) {
        (0, fs_1.mkdirSync)(uploadsPath, { recursive: true });
        console.log('📁 Pasta uploads/patient-photos criada automaticamente.');
    }
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.enableCors();
    await app.listen(process.env.PORT || 3333);
}
bootstrap();
//# sourceMappingURL=main.js.map