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
exports.AssessmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AssessmentService = class AssessmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAssessment(body) {
        const { method, data, patientId, createdById, nextAssessment } = body;
        console.log('createdById no Service:', createdById);
        if (!createdById) {
            throw new Error('ID do criador não fornecido');
        }
        return this.prisma.physicalAssessment.create({
            data: {
                method,
                data,
                patientId,
                createdById,
                nextAssessment: new Date(nextAssessment)
            }
        });
    }
    async getAssessmentsByPatient(patientId) {
        return this.prisma.physicalAssessment.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
        });
    }
    async getAssessmentById(id) {
        return this.prisma.physicalAssessment.findUnique({ where: { id } });
    }
    async updateAssessment(id, body) {
        var _a, _b, _c;
        const existing = await this.prisma.physicalAssessment.findUnique({ where: { id } });
        if (!existing) {
            throw new common_1.NotFoundException('Avaliação não encontrada para atualização.');
        }
        return this.prisma.physicalAssessment.update({
            where: { id },
            data: {
                method: (_a = body.method) !== null && _a !== void 0 ? _a : existing.method,
                data: (_b = body.data) !== null && _b !== void 0 ? _b : existing.data,
                nextAssessment: (_c = body.nextAssessment) !== null && _c !== void 0 ? _c : existing.nextAssessment
            }
        });
    }
};
exports.AssessmentService = AssessmentService;
exports.AssessmentService = AssessmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssessmentService);
//# sourceMappingURL=assessment.service.js.map