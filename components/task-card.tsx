'use client';

import { motion } from 'framer-motion';
import { Trash2, ChevronRight } from 'lucide-react';
import type { Task, ColumnId } from '@/lib/types';
import { PRIORITY_COLORS, PRIORITY_LABELS, COLUMNS } from '@/lib/constants';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useTaskStore } from '@/store/task-store';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { deleteTask, moveTask } = useTaskStore();
  const priorityColors = PRIORITY_COLORS[task.priority];

  const getNextColumn = (currentColumn: ColumnId): ColumnId => {
    const columnOrder: ColumnId[] = ['alberto', 'aaron', 'general', 'completadas'];
    const currentIndex = columnOrder.indexOf(currentColumn);
    return columnOrder[(currentIndex + 1) % columnOrder.length];
  };

  const handleMoveNext = () => {
    const nextColumn = getNextColumn(task.columnId);
    moveTask(task.id, nextColumn);
  };

  const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'group relative p-4 rounded-lg border transition-all hover:shadow-lg',
        'bg-gray-800/40 border-gray-700 hover:border-gray-600 hover:bg-gray-800/60'
      )}
    >
      {/* Priority indicator */}
      <div className={cn('absolute top-0 left-0 w-1 h-full rounded-l-lg', priorityColors.bg)} />

      <div className="pl-2 space-y-3">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-white text-sm leading-tight">{task.title}</h3>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-400 text-xs leading-relaxed">{task.description}</p>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            label={PRIORITY_LABELS[task.priority]}
            variant="destructive"
            className={priorityColors.badge}
          />
          {task.dueDate && formatDate(task.dueDate) && (
            <Badge label={formatDate(task.dueDate)!} variant="secondary" />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleMoveNext}
            className="text-xs flex-1"
          >
            <ChevronRight size={14} />
            Siguiente
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteTask(task.id)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
