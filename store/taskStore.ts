import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { zustandStorage } from './zustandStorage';
import { Task, TaskStatus, isValidStatus } from '@/store/types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  clearCompleted: () => void;
  clearAllTasks: () => void;
}



export const useTaskStore = create<TaskState>()(
    
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now().toString(),
              status: 'Not Started',
              createdAt: new Date()
            }
          ]
        })),
      updateTaskStatus: (id, status) => {
        if (!isValidStatus(status)) return;
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          )
        }));
      },
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      getTaskById: (id) => get().tasks.find((task) => task.id === id),
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'Completed')
        })),
      clearAllTasks: () => set({ tasks: [] })
    }),
    {
      name: 'task-storage',
      storage: zustandStorage,
      version: 1,
      onRehydrateStorage: () => (state) => {
        console.log('✅ Storage hydrated', state);
      }
    }
  )
);
