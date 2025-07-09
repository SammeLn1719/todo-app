import { TaskStatus } from '@/store/types';

export const statusColors: Record<TaskStatus, string> = {
  'Not Started': '#4a5568',    // gray
  'In Progress': '#3182ce',    // blue
  'Completed': '#38a169',      // green
  'Cancelled': '#e53e3e',      // red
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};