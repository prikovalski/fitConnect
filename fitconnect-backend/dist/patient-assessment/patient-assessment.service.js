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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAssessmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PatientAssessmentService = class PatientAssessmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAssessments(patientId) {
        return this.prisma.physicalAssessment.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
            select: {
                id: true,
                method: true,
                date: true,
                nextAssessment: true,
                createdBy: {
                    select: { name: true }
                }
            },
        });
    }
    async getAssessmentDetails(patientId, assessmentId) {
        const assessment = await this.prisma.physicalAssessment.findFirst({
            where: { id: assessmentId, patientId },
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Avaliação não encontrada');
        }
        return assessment;
    }
};
exports.PatientAssessmentService = PatientAssessmentService;
exports.PatientAssessmentService = PatientAssessmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientAssessmentService);
//# sourceMappingURL=patient-assessment.service.js.map