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
exports.MealPlanController = void 0;
const common_1 = require("@nestjs/common");
const mealplan_service_1 = require("./mealplan.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_2 = require("@nestjs/common");
let MealPlanController = class MealPlanController {
    constructor(mealPlanService) {
        this.mealPlanService = mealPlanService;
    }
    create(body) {
        var _a;
        return this.mealPlanService.createMealPlan(Object.assign(Object.assign({}, body), { validFrom: new Date(body.validFrom), validUntil: new Date(body.validUntil), isActive: (_a = body.isActive) !== null && _a !== void 0 ? _a : true }));
    }
    getByPatient(patientId) {
        return this.mealPlanService.getMealPlansByPatient(Number(patientId));
    }
    getOne(id) {
        return this.mealPlanService.getMealPlanById(Number(id));
    }
    getPlansByPatient(patientId) {
        return this.mealPlanService.getPlansByPatient(Number(patientId));
    }
    getMealPlanDetail(planId) {
        return this.mealPlanService.getMealPlanDetail(Number(planId));
    }
    updateMealPlan(planId, body, req) {
        return this.mealPlanService.updateMealPlan(Number(planId), body, req.user.id);
    }
};
exports.MealPlanController = MealPlanController;
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "getByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT', 'NUTRITIONIST'),
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "getOne", null);
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "getPlansByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST', 'PATIENT'),
    (0, common_1.Get)(':planId'),
    __param(0, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "getMealPlanDetail", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Put)(':planId'),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "updateMealPlan", null);
exports.MealPlanController = MealPlanController = __decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('mealplans'),
    __metadata("design:paramtypes", [mealplan_service_1.MealPlanService])
], MealPlanController);
//# sourceMappingURL=mealplan.controller.js.map