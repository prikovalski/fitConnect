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
exports.PatientProfileController = void 0;
const common_1 = require("@nestjs/common");
const patient_profile_service_1 = require("./patient-profile.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = require("path");
let PatientProfileController = class PatientProfileController {
    constructor(patientProfileService) {
        this.patientProfileService = patientProfileService;
    }
    async create(req, body) {
        const userId = req.user.id;
        return this.patientProfileService.create(userId, body);
    }
    async getProfile(req) {
        const userId = req.user.id;
        return this.patientProfileService.getByUserId(userId);
    }
    async updateProfile(req, body) {
        const userId = req.user.id;
        return this.patientProfileService.update(userId, body);
    }
    async savePatientProfile(req, body) {
        const userId = req.user.id;
        return this.patientProfileService.saveProfile(userId, body);
    }
    async getPatientProfile(req) {
        const userId = req.user.id;
        return this.patientProfileService.getPatientProfile(userId);
    }
    async uploadPhoto(req, file) {
        const userId = req.user.id;
        const url = `/uploads/patient-photos/${file.filename}`;
        return this.patientProfileService.savePatientPhoto(userId, url);
    }
    async getPhotos(req) {
        const userId = req.user.id;
        return this.patientProfileService.getPatientPhotos(userId);
    }
    async deletePhoto(req, photoId) {
        const userId = req.user.id;
        return this.patientProfileService.deletePatientPhoto(userId, Number(photoId));
    }
};
exports.PatientProfileController = PatientProfileController;
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "getProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "updateProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "savePatientProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "getPatientProfile", null);
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
], PatientProfileController.prototype, "uploadPhoto", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT', 'NUTRITIONIST', 'TRAINER'),
    (0, common_1.Get)('photos'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "getPhotos", null);
__decorate([
    (0, roles_decorator_1.Roles)('PATIENT'),
    (0, common_1.Delete)('photos/:photoId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('photoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PatientProfileController.prototype, "deletePhoto", null);
exports.PatientProfileController = PatientProfileController = __decorate([
    (0, common_1.Controller)('patient-profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [patient_profile_service_1.PatientProfileService])
], PatientProfileController);
//# sourceMappingURL=patient-profile.controller.js.map