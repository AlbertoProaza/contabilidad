'use client';

import { create } from 'zustand';
import type { Script, ScriptStatus } from '@/lib/script-types';

interface ScriptStore {
  scripts: Script[];
  isLoading: boolean;
  loadScripts: () => Promise<void>;
  addScript: (script: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateScript: (id: string, updates: Partial<Script>) => Promise<void>;
  deleteScript: (id: string) => Promise<void>;
  updateStatus: (id: string, status: ScriptStatus) => Promise<void>;
  getStats: () => {
    total: number;
    pending: number;
    recorded: number;
  };
}

export const useScriptStore = create<ScriptStore>((set, get) => ({
  scripts: [],
  isLoading: false,

  loadScripts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/scripts');
      const scripts = await response.json();
      set({ scripts });
    } catch (error) {
      console.error('Failed to load scripts:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addScript: async (script) => {
    try {
      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(script),
      });
      const newScript = await response.json();
      set((state) => ({ scripts: [...state.scripts, newScript] }));
    } catch (error) {
      console.error('Failed to add script:', error);
    }
  },

  updateScript: async (id, updates) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedScript = await response.json();
      set((state) => ({
        scripts: state.scripts.map((s) => (s.id === id ? updatedScript : s)),
      }));
    } catch (error) {
      console.error('Failed to update script:', error);
    }
  },

  deleteScript: async (id) => {
    try {
      await fetch(`/api/scripts/${id}`, { method: 'DELETE' });
      set((state) => ({ scripts: state.scripts.filter((s) => s.id !== id) }));
    } catch (error) {
      console.error('Failed to delete script:', error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await fetch(`/api/scripts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const updatedScript = await response.json();
      set((state) => ({
        scripts: state.scripts.map((s) => (s.id === id ? updatedScript : s)),
      }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  },

  getStats: () => {
    const scripts = get().scripts;
    const pending = scripts.filter((s) => s.status === 'pendiente').length;
    const recorded = scripts.filter((s) => s.status === 'grabado').length;

    return {
      total: scripts.length,
      pending,
      recorded,
    };
  },
}));
