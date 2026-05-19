'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Script, ScriptStatus } from '@/lib/script-types';

interface ScriptStore {
  scripts: Script[];
  addScript: (script: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateScript: (id: string, updates: Partial<Script>) => void;
  deleteScript: (id: string) => void;
  updateStatus: (id: string, status: ScriptStatus) => void;
  getStats: () => {
    total: number;
    pending: number;
    recorded: number;
  };
}

export const useScriptStore = create<ScriptStore>()(
  persist(
    (set, get) => ({
      scripts: [],

      addScript: (script) =>
        set((state) => ({
          scripts: [
            ...state.scripts,
            {
              ...script,
              id: `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateScript: (id, updates) =>
        set((state) => ({
          scripts: state.scripts.map((script) =>
            script.id === id
              ? { ...script, ...updates, updatedAt: new Date().toISOString() }
              : script
          ),
        })),

      deleteScript: (id) =>
        set((state) => ({
          scripts: state.scripts.filter((script) => script.id !== id),
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          scripts: state.scripts.map((script) =>
            script.id === id
              ? { ...script, status, updatedAt: new Date().toISOString() }
              : script
          ),
        })),

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
    }),
    {
      name: 'script-store',
    }
  )
);
