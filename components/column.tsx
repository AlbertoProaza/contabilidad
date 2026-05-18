'use client';

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ColumnId } from '@/lib/types';
import { COLUMNS } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';
import { TaskCard } from './task-card';

interface ColumnProps {
  columnId: ColumnId;
}

export function Column({ columnId }: ColumnProps) {
  const column = COLUMNS[columnId];
  const tasks = useTaskStore((state) => state.tasks);
  
  const columnTasks = useMemo(() => {
    return tasks.filter((task) => task.columnId === columnId);
  }, [tasks, columnId]);

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      {/* Column Header */}
      <div className="px-4 py-3 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <span className="text-xl">{column.icon}</span>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">{column.title}</h2>
            <p className="text-gray-500 text-xs">
              {columnTasks.length} {columnTasks.length === 1 ? 'tarea' : 'tareas'}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3 flex-1">
        <AnimatePresence mode="popLayout">
          {columnTasks.length === 0 ? (
            <div className="flex items-center justify-center py-8 px-4 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm">
              Sin tareas
            </div>
          ) : (
            columnTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
