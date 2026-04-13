import type { WorkoutStatus } from '../types/workout';

interface Props {
  status: WorkoutStatus;
}

export default function StatusBadge({ status }: Props) {
  const config = {
    'terminé': { label: 'TERMINÉ', className: 'badge-done' },
    'à faire': { label: 'À FAIRE', className: 'badge-todo' },
    'en cours': { label: 'EN COURS', className: 'badge-active' },
  };
  const { label, className } = config[status];
  return <span className={`badge ${className}`}>{label}</span>;
}
