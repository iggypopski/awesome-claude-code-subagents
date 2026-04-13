import { useState } from 'react';
import type { Workout } from './types/workout';
import { workouts as initialWorkouts } from './data/workouts';
import WorkoutList from './components/WorkoutList';
import WorkoutDetail from './components/WorkoutDetail';
import ActiveSession from './components/ActiveSession';

type View =
  | { type: 'list' }
  | { type: 'detail'; workout: Workout }
  | { type: 'session'; workout: Workout };

export default function App() {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [view, setView] = useState<View>({ type: 'list' });

  const handleSelect = (workout: Workout) => {
    setView({ type: 'detail', workout });
  };

  const handleStart = (workout: Workout) => {
    setView({ type: 'session', workout });
  };

  const handleFinish = (updated: Workout) => {
    setWorkouts(prev =>
      prev.map(w => (w.id === updated.id ? { ...w, status: 'terminé' } : w))
    );
    setView({ type: 'detail', workout: { ...updated, status: 'terminé' } });
  };

  const handleBack = () => {
    if (view.type === 'detail') setView({ type: 'list' });
    else if (view.type === 'session') setView({ type: 'detail', workout: (view as { type: 'session'; workout: Workout }).workout });
  };

  return (
    <div className="app-shell">
      {view.type === 'list' && (
        <WorkoutList workouts={workouts} onSelect={handleSelect} />
      )}
      {view.type === 'detail' && (
        <WorkoutDetail
          workout={view.workout}
          onBack={() => setView({ type: 'list' })}
          onStart={() => handleStart(view.workout)}
          onRedo={() => handleStart(view.workout)}
        />
      )}
      {view.type === 'session' && (
        <ActiveSession
          workout={view.workout}
          onFinish={handleFinish}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
