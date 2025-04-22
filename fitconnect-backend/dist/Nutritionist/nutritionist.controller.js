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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionistController = void 0;
const common_1 = require("@nestjs/common");
const nutritionist_service_1 = require("./nutritionist.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let NutritionistController = class NutritionistController {
    constructor(nutritionistService) {
        this.nutritionistService = nutritionistService;
    }
    getPatients(req) {
        const nutritionistId = req.user.sub;
        console.log("🔍 req.user:", req.user);
        return this.nutritionistService.getSharedPatients(nutritionistId);
    }
    async getPatientDetail(id, req) {
        const nutritionistId = req.user.sub;
        return this.nutritionistService.getPatientDetail(Number(id), nutritionistId);
    }
};
exports.NutritionistController = NutritionistController;
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Get)('patients'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NutritionistController.prototype, "getPatients", null);
__decorate([
    (0, common_1.Get)('patient/:id'),
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NutritionistController.prototype, "getPatientDetail", null);
exports.NutritionistController = NutritionistController = __decorate([
    (0, common_1.Controller)('nutritionist'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [nutritionist_service_1.NutritionistService])
], NutritionistController);
//# sourceMappingURL=nutritionist.controller.js.map