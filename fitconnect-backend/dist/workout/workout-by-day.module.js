"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutByDayModule = void 0;
const common_1 = require("@nestjs/common");
const workout_by_day_controller_1 = require("./workout-by-day.controller");
const prisma_service_1 = require("./../prisma.service");
let WorkoutByDayModule = class WorkoutByDayModule {
};
exports.WorkoutByDayModule = WorkoutByDayModule;
exports.WorkoutByDayModule = WorkoutByDayModule = __decorate([
    (0, common_1.Module)({
        controllers: [workout_by_day_controller_1.WorkoutByDayController],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], WorkoutByDayModule);
//# sourceMappingURL=workout-by-day.module.js.map