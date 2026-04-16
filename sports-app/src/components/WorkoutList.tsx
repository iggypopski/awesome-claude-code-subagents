import type { Workout } from '../types/workout';
import WorkoutCard from './WorkoutCard';

interface Props {
  workouts: Workout[];
  onSelect: (workout: Workout) => void;
}

export default function WorkoutList({ workouts, onSelect }: Props) {
  const done = workouts.filter(w => w.status === 'terminé').length;

  return (
    <div className="screen workout-list">
      <header className="list-header">
        <div className="list-header-top">
          <div>
            <h1 className="app-title">SportFlow</h1>
            <p className="app-subtitle">Vos séances du programme</p>
          </div>
          <div className="header-avatar">MD</div>
        </div>
        <div className="program-summary">
          <div className="program-summary-info">
            <span className="program-summary-name">L.STANKOVIC UP/LO (3/S) + renforts</span>
            <span className="program-summary-progress">{done}/{workouts.length} séances</span>
          </div>
          <div className="program-bar program-bar-lg">
            <div className="program-bar-fill" style={{ width: `${(done / workouts.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="list-filters">
        {['Tout', 'À faire', 'Terminé'].map(f => (
          <button key={f} className={`filter-btn ${f === 'Tout' ? 'filter-btn-active' : ''}`}>{f}</button>
        ))}
      </div>

      <div className="cards-grid">
        {workouts.map(w => (
          <WorkoutCard key={w.id} workout={w} onClick={() => onSelect(w)} />
        ))}
      </div>
    </div>
  );
}
