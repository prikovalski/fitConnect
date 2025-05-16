// src/patients/types/patient.types.ts

export interface WorkoutSet {
    id: number;
    setNumber: number;
    targetReps: number;
    targetLoad: number;
  }
  
  export interface WorkoutExercise {
    id: number;
    name: string;
    order: number;
    sets: WorkoutSet[];
  }
  
  export interface WorkoutDay {
    id: number;
    dayOfWeek: string;
    muscleGroup: string;
    exercises: WorkoutExercise[];
  }
  
  export interface WorkoutPlan {
    id: number;
    title: string;
    description: string;
    validFrom: Date;
    validUntil: Date;
    workoutDays: WorkoutDay[];
  }
  
  export interface PatientWithActiveWorkouts {
    id: number;
    name: string;
    workoutPlans: WorkoutPlan[];
  }
  