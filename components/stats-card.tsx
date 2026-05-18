'use client';

import { useMemo } from 'react';
import { useTaskStore } from '@/store/task-store';
import { CheckCircle2, AlertCircle, ListTodo } from 'lucide-react';

export function StatsCard() {
  const tasks = useTaskStore((state) => state.tasks);
  
  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.columnId === 'completadas').length;
    const urgent = tasks.filter((t) => t.priority === 'alta' && t.columnId !== 'completadas').length;
    const pending = tasks.filter((t) => t.columnId !== 'completadas').length;
    
    return {
      total: tasks.length,
      completed,
      urgent,
      pending,
    };
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total */}
      <div className="px-4 py-4 rounded-lg border border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <ListTodo className="text-gray-500" size={24} />
        </div>
      </div>

      {/* Pending */}
      <div className="px-4 py-4 rounded-lg border border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Pendientes</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
          </div>
          <AlertCircle className="text-blue-500" size={24} />
        </div>
      </div>

      {/* Urgent */}
      <div className="px-4 py-4 rounded-lg border border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Urgentes</p>
            <p className="text-2xl font-bold text-red-400 mt-1">{stats.urgent}</p>
          </div>
          <AlertCircle className="text-red-500" size={24} />
        </div>
      </div>

      {/* Completed */}
      <div className="px-4 py-4 rounded-lg border border-gray-700 bg-gray-800/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Completadas</p>
            <p className="text-2xl font-bold text-green-400 mt-1">{stats.completed}</p>
          </div>
          <CheckCircle2 className="text-green-500" size={24} />
        </div>
      </div>
    </div>
  );
}
