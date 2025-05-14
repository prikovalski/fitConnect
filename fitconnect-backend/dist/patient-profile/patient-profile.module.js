"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfileModule = void 0;
const common_1 = require("@nestjs/common");
const patient_profile_service_1 = require("./patient-profile.service");
const patient_profile_controller_1 = require("./patient-profile.controller");
const prisma_service_1 = require("../prisma.service");
const platform_express_1 = require("@nestjs/platform-express");
let PatientProfileModule = class PatientProfileModule {
};
exports.PatientProfileModule = PatientProfileModule;
exports.PatientProfileModule = PatientProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads/patient-photos',
            }),
        ],
        controllers: [patient_profile_controller_1.PatientProfileController],
        providers: [patient_profile_service_1.PatientProfileService, prisma_service_1.PrismaService],
    })
], PatientProfileModule);
//# sourceMappingURL=patient-profile.module.js.map