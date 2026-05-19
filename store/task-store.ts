'use client';

import { create } from 'zustand';
import type { Task, ColumnId } from '@/lib/types';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, columnId: ColumnId) => Promise<void>;
  getTasksByColumn: (columnId: ColumnId) => Task[];
  getStats: () => {
    total: number;
    completed: number;
    urgent: number;
    pending: number;
  };
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  loadTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (task) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },

  deleteTask: async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  },

  moveTask: async (id, columnId) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columnId }),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  },

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
}));
