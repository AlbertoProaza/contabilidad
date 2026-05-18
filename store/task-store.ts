'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, ColumnId } from '@/lib/types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, columnId: ColumnId) => void;
  getTasksByColumn: (columnId: ColumnId) => Task[];
  getStats: () => {
    total: number;
    completed: number;
    urgent: number;
    pending: number;
  };
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      
      moveTask: (id, columnId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, columnId } : task
          ),
        })),
      
      getTasksByColumn: (columnId) => {
        return get().tasks.filter((task) => task.columnId === columnId);
      },
      
      getStats: () => {
        const tasks = get().tasks;
        const completed = tasks.filter((t) => t.columnId === 'completadas').length;
        const urgent = tasks.filter((t) => t.priority === 'alta' && t.columnId !== 'completadas').length;
        const pending = tasks.filter((t) => t.columnId !== 'completadas').length;
        
        return {
          total: tasks.length,
          completed,
          urgent,
          pending,
        };
      },
    }),
    {
      name: 'task-store',
    }
  )
);
