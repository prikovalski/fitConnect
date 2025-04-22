import { NutritionistService } from './nutritionist.service';
export declare class NutritionistController {
    private readonly nutritionistService;
    constructor(nutritionistService: NutritionistService);
    getPatients(req: any): Promise<any>;
}
