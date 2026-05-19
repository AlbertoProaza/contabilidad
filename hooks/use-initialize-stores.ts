'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/task-store';
import { useScriptStore } from '@/store/script-store';

export function useInitializeStores() {
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const loadScripts = useScriptStore((state) => state.loadScripts);

  useEffect(() => {
    loadTasks();
    loadScripts();
  }, [loadTasks, loadScripts]);
}
