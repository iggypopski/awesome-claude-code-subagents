export type WorkoutStatus = 'terminé' | 'à faire' | 'en cours';

export interface Set {
  reps?: number;
  weight?: number;
  duration?: string; // e.g. "15min"
  completed?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  repsPerSet?: number | number[]; // can be fixed or per-set
  duration?: string;
  muscles: string[];
  equipment: string[];
  notes?: string;
  completedSets?: Set[];
}

export interface Superset {
  type: 'superset';
  id: string;
  exercises: Exercise[];
}

export type WorkoutItem = Exercise | Superset;

export interface Workout {
  id: string;
  name: string;
  status: WorkoutStatus;
  program: string;
  programProgress: number; // 0-1
  duration: string;
  calories: number;
  type: string;
  createdBy: string;
  muscleGroups: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  items: WorkoutItem[];
  heroImage?: string;
  notes?: string;
}

export function isSuperset(item: WorkoutItem): item is Superset {
  return (item as Superset).type === 'superset';
}
