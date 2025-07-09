import { Task, TaskStatus } from '@/store/types';


const isValidStatus = (status: string): status is TaskStatus => {
  return ['Not Started', 'In Progress', 'Completed', 'Cancelled'].includes(status);
};

export const serializeDate = (date: Date): string => date.toISOString();

export const deserializeDate = (dateStr: string): Date => new Date(dateStr);

export const serializeTask = (task: Task) => ({
  ...task,
  date: serializeDate(task.date),
  createdAt: serializeDate(task.createdAt)
});

export const deserializeTask = (data: any): Task => {
  const status: TaskStatus = isValidStatus(data.status) 
    ? data.status 
    : 'Not Started';

  return {
    ...data,
    date: deserializeDate(data.date),
    createdAt: deserializeDate(data.createdAt),
    status
  };
};