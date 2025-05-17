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
exports.NutritionistPatientController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const nutritionist_patient_service_1 = require("./nutritionist-patient.service");
const workout_service_1 = require("../workouts/workout.service");
let NutritionistPatientController = class NutritionistPatientController {
    constructor(nutritionitPatientService, workoutService) {
        this.nutritionitPatientService = nutritionitPatientService;
        this.workoutService = workoutService;
    }
    async getPatientWorkouts(id) {
        return this.nutritionitPatientService.getPatientWorkouts(Number(id));
    }
};
exports.NutritionistPatientController = NutritionistPatientController;
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Get)(':id/workouts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NutritionistPatientController.prototype, "getPatientWorkouts", null);
exports.NutritionistPatientController = NutritionistPatientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('nutritionist/patient'),
    __metadata("design:paramtypes", [nutritionist_patient_service_1.NutritionistPatientService,
        workout_service_1.WorkoutService])
], NutritionistPatientController);
//# sourceMappingURL=nutritionist-patient.controller.js.map