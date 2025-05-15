"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_middleware_1 = require("./auth/auth.middleware");
const core_2 = require("@nestjs/core");
const roles_guard_1 = require("./auth/roles.guard");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(reflector));
    app.use((req, res, next) => {
        const isPublic = [
            '/auth/login',
            '/auth/register'
        ].includes(req.path);
        if (isPublic) {
            return next();
        }
        const middleware = new auth_middleware_1.AuthMiddleware();
        return middleware.use(req, res, next);
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.enableCors();
    await app.listen(process.env.PORT || 3333);
}
bootstrap();
//# sourceMappingURL=main.js.map