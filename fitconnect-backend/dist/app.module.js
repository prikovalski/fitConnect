"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const app_controller_1 = require("./app.controller");
const workout_module_1 = require("./workouts/workout.module");
const mealplan_module_1 = require("./mealplans/mealplan.module");
const assessment_module_1 = require("./assessments/assessment.module");
const day_module_1 = require("./workout/days/day.module");
const exercise_module_1 = require("./workout/exercises/exercise.module");
const set_module_1 = require("./workout/sets/set.module");
const log_module_1 = require("./workout/logs/log.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            workout_module_1.WorkoutModule,
            assessment_module_1.AssessmentModule,
            mealplan_module_1.MealPlanModule,
            day_module_1.DayModule,
            exercise_module_1.ExerciseModule,
            set_module_1.SetModule,
            log_module_1.LogModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map