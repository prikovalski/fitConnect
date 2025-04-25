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
exports.TrainerController = void 0;
const common_1 = require("@nestjs/common");
const trainer_service_1 = require("./trainer.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let TrainerController = class TrainerController {
    constructor(trainerService) {
        this.trainerService = trainerService;
    }
    getDashboardSummary(req) {
        const trainerId = req.user.id;
        return this.trainerService.getDashboardSummary(trainerId);
    }
    async getStudents(req) {
        const trainerId = req.user.id;
        return this.trainerService.getStudents(trainerId);
    }
    async getStudentWorkouts(id, req) {
        const trainerId = req.user.id;
        return this.trainerService.getStudentWorkouts(Number(id), trainerId);
    }
    async getStudentAssessments(id, req) {
        const trainerId = req.user.id;
        return this.trainerService.getStudentAssessments(Number(id), trainerId);
    }
    async getUpcomingAssessments(req) {
        const trainerId = req.user.id;
        return this.trainerService.getUpcomingAssessments(trainerId);
    }
    async getAssessments(req) {
        const trainerId = req.user.id;
        return this.trainerService.getTrainerAssessments(trainerId);
    }
    async getPatientBasicInfo(id) {
        return this.trainerService.getPatientBasicInfo(Number(id));
    }
};
exports.TrainerController = TrainerController;
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrainerController.prototype, "getDashboardSummary", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('students'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getStudents", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('students/:id/workouts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getStudentWorkouts", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('students/:id/assessments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getStudentAssessments", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('assessments'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getUpcomingAssessments", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('assessments'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getAssessments", null);
__decorate([
    (0, roles_decorator_1.Roles)('TRAINER'),
    (0, common_1.Get)('students/:id/basic-info'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainerController.prototype, "getPatientBasicInfo", null);
exports.TrainerController = TrainerController = __decorate([
    (0, common_1.Controller)('trainer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [trainer_service_1.TrainerService])
], TrainerController);
//# sourceMappingURL=trainer.controller.js.map