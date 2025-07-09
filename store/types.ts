export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  address: string;
  status: TaskStatus;
  createdAt: Date;
}

export const isValidStatus = (status: string): status is TaskStatus => {
  return ['Not Started', 'In Progress', 'Completed', 'Cancelled'].includes(status);
};