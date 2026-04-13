import type { Exercise } from '../types/workout';

interface Props {
  exercise: Exercise;
  index: number;
  inSuperset?: boolean;
  isActive?: boolean;
  onComplete?: () => void;
}

function getRepsLabel(exercise: Exercise): string {
  if (exercise.duration) return exercise.duration;
  if (!exercise.repsPerSet) return `${exercise.sets} séries`;
  if (Array.isArray(exercise.repsPerSet)) {
    return `${exercise.sets} séries de ${exercise.repsPerSet.join(', ')} reps`;
  }
  return `${exercise.sets} série${exercise.sets > 1 ? 's' : ''} de ${exercise.repsPerSet} reps`;
}

export default function ExerciseItem({ exercise, index, inSuperset = false, isActive = false, onComplete }: Props) {
  return (
    <div className={`exercise-item ${inSuperset ? 'exercise-in-superset' : ''} ${isActive ? 'exercise-active' : ''}`}>
      {!inSuperset && (
        <div className="exercise-number">{index}</div>
      )}
      <div className="exercise-thumb">
        <div className="exercise-thumb-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>
      <div className="exercise-info">
        <p className="exercise-name">{exercise.name}</p>
        <p className="exercise-reps">{getRepsLabel(exercise)}</p>
        <div className="exercise-tags">
          {exercise.muscles.map(m => (
            <span key={m} className="tag tag-muscle">{m}</span>
          ))}
          {exercise.equipment.map(e => (
            <span key={e} className="tag tag-equipment">{e}</span>
          ))}
        </div>
      </div>
      {isActive && onComplete && (
        <button className="btn-complete" onClick={onComplete} title="Valider">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </button>
      )}
    </div>
  );
}
