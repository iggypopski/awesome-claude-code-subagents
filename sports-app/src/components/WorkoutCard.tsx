import type { Workout } from '../types/workout';
import StatusBadge from './StatusBadge';

interface Props {
  workout: Workout;
  onClick: () => void;
}

export default function WorkoutCard({ workout, onClick }: Props) {
  return (
    <div className="workout-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="card-hero">
        {workout.heroImage && (
          <img src={workout.heroImage} alt={workout.name} className="card-hero-img" />
        )}
        <div className="card-hero-overlay" />
        <div className="card-hero-content">
          <h3 className="card-name">{workout.name}</h3>
          <StatusBadge status={workout.status} />
        </div>
      </div>
      <div className="card-body">
        <div className="card-stats">
          <span className="card-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            {workout.duration}
          </span>
          <span className="card-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            {workout.calories} kcal
          </span>
          <span className="card-stat">{workout.type}</span>
        </div>
        <div className="card-muscles">
          {workout.muscleGroups.slice(0, 3).map(mg => (
            <span key={mg} className="chip chip-sm">{mg}</span>
          ))}
          {workout.muscleGroups.length > 3 && (
            <span className="chip chip-sm">+{workout.muscleGroups.length - 3}</span>
          )}
        </div>
        <div className="card-program">
          <div className="program-bar">
            <div className="program-bar-fill" style={{ width: `${workout.programProgress * 100}%` }} />
          </div>
          <span className="card-program-name">{workout.program}</span>
        </div>
      </div>
    </div>
  );
}
