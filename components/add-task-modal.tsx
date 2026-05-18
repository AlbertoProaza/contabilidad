'use client';

import { useState } from 'react';
import type { Priority, ColumnId } from '@/lib/types';
import { COLUMNS, PRIORITY_LABELS } from '@/lib/constants';
import { useTaskStore } from '@/store/task-store';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('media');
  const [columnId, setColumnId] = useState<ColumnId>('general');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        columnId,
        dueDate: dueDate || undefined,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('media');
      setColumnId('general');
      setDueDate('');

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Tarea">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Revisar propuesta de cliente"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles adicionales..."
            rows={3}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors resize-none"
          />
        </div>

        {/* Column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asignar a
          </label>
          <select
            value={columnId}
            onChange={(e) => setColumnId(e.target.value as ColumnId)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors"
          >
            {Object.values(COLUMNS)
              .filter((col) => col.id !== 'completadas')
              .map((col) => (
                <option key={col.id} value={col.id}>
                  {col.icon} {col.title}
                </option>
              ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioridad
          </label>
          <div className="flex gap-2">
            {(['baja', 'media', 'alta'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={cn(
                  'flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all',
                  priority === p
                    ? 'bg-amber-900 text-white'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                )}
              >
                {PRIORITY_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha límite (opcional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={!title.trim() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Creando...' : 'Crear Tarea'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
