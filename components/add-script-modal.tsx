'use client';

import { useState, useEffect } from 'react';
import type { Script } from '@/lib/script-types';
import { useScriptStore } from '@/store/script-store';
import { Modal } from './ui/modal';
import { Button } from './ui/button';

interface AddScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingScript?: Script | null;
}

export function AddScriptModal({ isOpen, onClose, editingScript }: AddScriptModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addScript, updateScript } = useScriptStore();

  useEffect(() => {
    if (editingScript) {
      setTitle(editingScript.title);
      setContent(editingScript.content);
      setDueDate(editingScript.dueDate || '');
    } else {
      setTitle('');
      setContent('');
      setDueDate('');
    }
  }, [editingScript, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingScript) {
        await updateScript(editingScript.id, {
          title: title.trim(),
          content: content.trim(),
          dueDate: dueDate || undefined,
        });
      } else {
        await addScript({
          title: title.trim(),
          content: content.trim(),
          status: 'pendiente',
          dueDate: dueDate || undefined,
        });
      }

      // Reset form
      setTitle('');
      setContent('');
      setDueDate('');

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingScript ? 'Editar Guión' : 'Nuevo Guión'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título del Anuncio
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Anuncio Sofá Gris"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guión
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe el guión del anuncio aquí..."
            rows={8}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900 transition-colors resize-none font-mono text-xs"
          />
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
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Guardando...' : editingScript ? 'Actualizar' : 'Crear Guión'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
