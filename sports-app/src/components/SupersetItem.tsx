import type { Superset } from '../types/workout';
import ExerciseItem from './ExerciseItem';

interface Props {
  superset: Superset;
  index: number;
  isActive?: boolean;
}

export default function SupersetItem({ superset, index, isActive = false }: Props) {
  return (
    <div className={`superset-block ${isActive ? 'superset-active' : ''}`}>
      <div className="superset-header">
        <div className="exercise-number">{index}</div>
        <span className="superset-label">SUPERSET</span>
      </div>
      <div className="superset-exercises">
        {superset.exercises.map((ex) => (
          <ExerciseItem
            key={ex.id}
            exercise={ex}
            index={0}
            inSuperset={true}
            isActive={isActive}
          />
        ))}
      </div>
    </div>
  );
}
