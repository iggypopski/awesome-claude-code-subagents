import type { Workout } from '../types/workout';
import { isSuperset } from '../types/workout';
import StatusBadge from './StatusBadge';
import ExerciseItem from './ExerciseItem';
import SupersetItem from './SupersetItem';

interface Props {
  workout: Workout;
  onBack: () => void;
  onStart: () => void;
  onRedo: () => void;
}

export default function WorkoutDetail({ workout, onBack, onStart, onRedo }: Props) {
  let exerciseIndex = 0;

  return (
    <div className="screen workout-detail">
      {/* Hero */}
      <div className="hero">
        {workout.heroImage && (
          <img src={workout.heroImage} alt={workout.name} className="hero-img" />
        )}
        <div className="hero-overlay" />
        <button className="hero-btn-back" onClick={onBack} aria-label="Retour">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="hero-actions-right">
          <button className="hero-icon-btn" aria-label="Favoris">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="hero-icon-btn" aria-label="Options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1" fill="currentColor" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <div className="detail-content">
        {/* Title + Badge */}
        <div className="detail-title-row">
          <h1 className="detail-title">{workout.name}</h1>
          <StatusBadge status={workout.status} />
        </div>

        {/* Program */}
        <div className="program-card">
          <p className="program-label">PROGRAMME</p>
          <p className="program-name">{workout.program}</p>
          <div className="program-bar">
            <div className="program-bar-fill" style={{ width: `${workout.programProgress * 100}%` }} />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">DURÉE</span>
            <span className="stat-value">{workout.duration}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-label">CALORIES</span>
            <span className="stat-value">{workout.calories} kcal</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-label">TYPE</span>
            <span className="stat-value">{workout.type}</span>
          </div>
        </div>

        {/* Creator */}
        <div className="creator-row">
          <div className="creator-avatar">
            {workout.createdBy.split(' ').map(w => w[0]).join('')}
          </div>
          <div>
            <p className="creator-meta">CRÉÉ PAR</p>
            <p className="creator-name">{workout.createdBy}</p>
          </div>
        </div>

        {/* Muscle Groups */}
        <div className="chips-row">
          {workout.muscleGroups.map(mg => (
            <span key={mg} className="chip">{mg}</span>
          ))}
        </div>

        {/* Notes */}
        <div className="notes-box">
          <p className="notes-title">NOTES</p>
          <p className="notes-placeholder">
            {workout.notes || 'Ajoutez vos propres notes sur cette activité.'}
          </p>
        </div>

        {/* Exercises */}
        <h2 className="section-title">Exercices</h2>
        <div className="exercises-list">
          {workout.items.map((item) => {
            exerciseIndex++;
            if (isSuperset(item)) {
              return <SupersetItem key={item.id} superset={item} index={exerciseIndex} />;
            }
            return <ExerciseItem key={item.id} exercise={item} index={exerciseIndex} />;
          })}
        </div>

        {/* Muscle diagram */}
        <div className="muscle-diagram">
          <div className="muscle-diagram-body">
            <svg viewBox="0 0 80 160" className="body-svg">
              {/* Simplified human body silhouette */}
              <ellipse cx="40" cy="16" rx="12" ry="14" fill="#e53935" opacity="0.9" />
              <rect x="22" y="30" width="36" height="50" rx="8" fill="#e53935" opacity="0.8" />
              <rect x="8" y="32" width="14" height="42" rx="6" fill="#e53935" opacity="0.6" />
              <rect x="58" y="32" width="14" height="42" rx="6" fill="#e53935" opacity="0.6" />
              <rect x="24" y="80" width="14" height="55" rx="6" fill="#e53935" opacity="0.7" />
              <rect x="42" y="80" width="14" height="55" rx="6" fill="#e53935" opacity="0.7" />
            </svg>
            <svg viewBox="0 0 80 160" className="body-svg">
              {/* Back view */}
              <ellipse cx="40" cy="16" rx="12" ry="14" fill="#e53935" opacity="0.5" />
              <rect x="22" y="30" width="36" height="50" rx="8" fill="#e53935" opacity="0.5" />
              <rect x="8" y="32" width="14" height="42" rx="6" fill="#e53935" opacity="0.4" />
              <rect x="58" y="32" width="14" height="42" rx="6" fill="#e53935" opacity="0.4" />
              <rect x="24" y="80" width="14" height="55" rx="6" fill="#e53935" opacity="0.5" />
              <rect x="42" y="80" width="14" height="55" rx="6" fill="#e53935" opacity="0.5" />
            </svg>
          </div>
          <div className="muscle-info">
            <div className="muscle-group-info">
              <p className="muscle-group-title">Muscles principaux</p>
              <p className="muscle-group-list">{workout.primaryMuscles.join(', ')}</p>
            </div>
            <div className="muscle-group-info">
              <p className="muscle-group-title">Muscles secondaires</p>
              <p className="muscle-group-list">{workout.secondaryMuscles.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        {workout.status === 'terminé' ? (
          <button className="btn-primary" onClick={onRedo}>REFAIRE</button>
        ) : (
          <button className="btn-primary" onClick={onStart}>COMMENCER</button>
        )}
      </div>
    </div>
  );
}
