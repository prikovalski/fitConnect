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
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../auth/roles.decorator");
const patient_service_1 = require("./patient.service");
const workout_service_1 = require("../workouts/workout.service");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = require("path");
let PatientController = class PatientController {
    constructor(patientService, workoutService) {
        this.patientService = patientService;
        this.workoutService = workoutService;
    }
    async getPatientWorkouts(id) {
        return this.patientService.getPatientWorkouts(Number(id));
    }
    async getWorkoutDetailByPatient(patientId, workoutId) {
        return this.workoutService.getWorkoutByPatientAndId(Number(patientId), Number(workoutId));
    }
    async savePatientProfile(req, body) {
        const userId = req.user.id;
        return this.patientService.saveProfile(userId, body);
    }
    async getPatientProfile(req) {
        const userId = req.user.id;
        return this.patientService.getPatientProfile(userId);
    }
    async uploadPhoto(req, file) {
        const userId = req.user.id;
        const url = `/uploads/patient-photos/${file.filename}`;
        return this.patientService.savePatientPhoto(userId, url);
    }
    async getPhotos(req) {
        const userId = req.user.id;
        return this.patientService.getPatientPhotos(userId);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Get)(':id/workouts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientWorkouts", null);
__decorate([
    (0, roles_decorator_1.Roles)('NUTRITIONIST'),
    (0, common_1.Get)(':patientId/workouts/:workoutId/detail'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('workoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getWorkoutDetailByPatient", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "savePatientProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPatientProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Post)('photos/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/patient-photos',
            filename: (req, file, callback) => {
                const uniqueSuffix = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                callback(null, uniqueSuffix);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "uploadPhoto", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT', 'NUTRITIONIST', 'TRAINER'),
    (0, common_1.Get)('photos'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "getPhotos", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('nutritionist/patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService,
        workout_service_1.WorkoutService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map