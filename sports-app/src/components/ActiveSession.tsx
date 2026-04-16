import { useState, useEffect, useCallback } from 'react';
import type { Workout, Exercise } from '../types/workout';
import { isSuperset } from '../types/workout';
import ExerciseItem from './ExerciseItem';

interface Props {
  workout: Workout;
  onFinish: (workout: Workout) => void;
  onBack: () => void;
}

function getAllExercises(workout: Workout): Exercise[] {
  const all: Exercise[] = [];
  for (const item of workout.items) {
    if (isSuperset(item)) {
      all.push(...item.exercises);
    } else {
      all.push(item);
    }
  }
  return all;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function ActiveSession({ workout, onFinish, onBack }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const allExercises = getAllExercises(workout);
  const totalCount = allExercises.length;
  const doneCount = allExercises.filter(ex => completedIds.has(ex.id)).length;
  const progress = totalCount > 0 ? doneCount / totalCount : 0;

  // Main timer
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  // Rest timer countdown
  useEffect(() => {
    if (restTimer === null || restTimer <= 0) {
      if (restTimer === 0) setRestTimer(null);
      return;
    }
    const id = setTimeout(() => setRestTimer(t => (t ?? 0) - 1), 1000);
    return () => clearTimeout(id);
  }, [restTimer]);

  const handleComplete = useCallback((exId: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.add(exId);
      return next;
    });
    setRestTimer(90); // 90s rest
  }, []);

  const isFinished = doneCount === totalCount && totalCount > 0;

  let exerciseIndex = 0;

  return (
    <div className="screen active-session">
      {/* Header */}
      <div className="session-header">
        <button className="btn-ghost" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="icon-sm">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
        <div className="session-header-center">
          <p className="session-workout-name">{workout.name}</p>
          <p className="session-timer">{formatTime(elapsed)}</p>
        </div>
        <button className="btn-ghost" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Reprendre' : 'Pause'}>
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-sm">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-sm">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress */}
      <div className="session-progress-bar">
        <div className="session-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="session-progress-label">
        {doneCount} / {totalCount} exercices complétés
      </div>

      {/* Rest Timer Overlay */}
      {restTimer !== null && restTimer > 0 && (
        <div className="rest-overlay">
          <div className="rest-card">
            <p className="rest-title">Temps de repos</p>
            <p className="rest-countdown">{formatTime(restTimer)}</p>
            <button className="btn-secondary" onClick={() => setRestTimer(null)}>
              Passer
            </button>
          </div>
        </div>
      )}

      {/* Exercises */}
      <div className="session-exercises">
        {workout.items.map((item) => {
          exerciseIndex++;
          if (isSuperset(item)) {
            const allDone = item.exercises.every(ex => completedIds.has(ex.id));
            return (
              <div key={item.id} className={`superset-block ${allDone ? 'item-done' : ''}`}>
                <div className="superset-header">
                  <div className="exercise-number">{exerciseIndex}</div>
                  <span className="superset-label">SUPERSET</span>
                  {allDone && <span className="done-check">✓</span>}
                </div>
                <div className="superset-exercises">
                  {item.exercises.map(ex => (
                    <div key={ex.id} className={completedIds.has(ex.id) ? 'item-done' : ''}>
                      <ExerciseItem
                        exercise={ex}
                        index={0}
                        inSuperset={true}
                        isActive={!completedIds.has(ex.id)}
                        onComplete={() => handleComplete(ex.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          const done = completedIds.has(item.id);
          return (
            <div key={item.id} className={done ? 'item-done' : ''}>
              <ExerciseItem
                exercise={item}
                index={exerciseIndex}
                isActive={!done}
                onComplete={() => handleComplete(item.id)}
              />
            </div>
          );
        })}
      </div>

      {/* Finish button */}
      {isFinished && (
        <div className="bottom-cta">
          <button
            className="btn-primary btn-success"
            onClick={() => onFinish({ ...workout, status: 'terminé' })}
          >
            TERMINER LA SÉANCE 🎉
          </button>
        </div>
      )}
    </div>
  );
}
