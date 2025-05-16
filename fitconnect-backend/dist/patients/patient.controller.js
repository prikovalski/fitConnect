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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const patient_service_1 = require("./patient.service");
const workout_service_1 = require("../workouts/workout.service");
let PatientController = class PatientController {
    constructor(patientService, workoutService) {
        this.patientService = patientService;
        this.workoutService = workoutService;
    }
    async getMealPlanById(req, id) {
        const userId = req.user.id;
        return this.patientService.getMealPlanById(userId, Number(id));
    }
    async getAllMealPlans(req) {
        const userId = req.user.id;
        return this.patientService.getAllMealPlans(userId);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)('mealplans/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getMealPlanById", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)('mealplans'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getAllMealPlans", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        workout_service_1.WorkoutService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map