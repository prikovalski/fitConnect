"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionistPatientModule = void 0;
const common_1 = require("@nestjs/common");
const nutritionist_patient_controller_1 = require("./nutritionist-patient.controller");
const nutritionist_patient_service_1 = require("./nutritionist-patient.service");
const prisma_service_1 = require("../prisma.service");
const workout_module_1 = require("../workouts/workout.module");
let NutritionistPatientModule = class NutritionistPatientModule {
};
exports.NutritionistPatientModule = NutritionistPatientModule;
exports.NutritionistPatientModule = NutritionistPatientModule = __decorate([
    (0, common_1.Module)({
        imports: [workout_module_1.WorkoutModule],
        controllers: [nutritionist_patient_controller_1.NutritionistPatientController],
        providers: [nutritionist_patient_service_1.NutritionistPatientService, prisma_service_1.PrismaService],
    })
], NutritionistPatientModule);
//# sourceMappingURL=nutritionist-patient.module.js.map