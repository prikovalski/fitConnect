import { NutritionistPatientService } from './nutritionist-patient.service';
import { WorkoutService } from '../workouts/workout.service';
export declare class NutritionistPatientController {
    private readonly nutritionitPatientService;
    private readonly workoutService;
    constructor(nutritionitPatientService: NutritionistPatientService, workoutService: WorkoutService);
    getPatientWorkouts(id: string): Promise<import("./patient.types").PatientWithActiveWorkouts>;
}
