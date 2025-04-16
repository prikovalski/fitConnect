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
let MealPlanController = class MealPlanController {
    constructor(mealPlanService) {
        this.mealPlanService = mealPlanService;
    }
    create(body) {
        return this.mealPlanService.createMealPlan(body);
    }
    getByPatient(patientId) {
        return this.mealPlanService.getMealPlansByPatient(Number(patientId));
    }
    getOne(id) {
        return this.mealPlanService.getMealPlanById(Number(id));
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
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlanController.prototype, "getOne", null);
exports.MealPlanController = MealPlanController = __decorate([
    (0, common_1.Controller)('mealplans'),
    __metadata("design:paramtypes", [mealplan_service_1.MealPlanService])
], MealPlanController);
//# sourceMappingURL=mealplan.controller.js.map