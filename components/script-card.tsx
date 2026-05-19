'use client';

import { motion } from 'framer-motion';
import { Trash2, CheckCircle2, Edit } from 'lucide-react';
import type { Script } from '@/lib/script-types';
import { useScriptStore } from '@/store/script-store';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface ScriptCardProps {
  script: Script;
  index: number;
  onEdit: (script: Script) => void;
}

const STATUS_CONFIG = {
  pendiente: { label: 'Pendiente', badge: 'bg-amber-100 text-amber-700' },
  grabado: { label: 'Grabado', badge: 'bg-green-100 text-green-700' },
  editando: { label: 'Editando', badge: 'bg-blue-100 text-blue-700' },
};

export function ScriptCard({ script, index, onEdit }: ScriptCardProps) {
  const { deleteScript, updateStatus } = useScriptStore();
  const config = STATUS_CONFIG[script.status];

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
        'group relative p-4 rounded-lg border transition-all hover:shadow-md',
        'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      )}
    >
      {/* Status indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 w-1 h-full rounded-l-lg',
          script.status === 'pendiente' ? 'bg-amber-200' : script.status === 'grabado' ? 'bg-green-200' : 'bg-blue-200'
        )}
      />

      <div className="pl-2 space-y-3">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{script.title}</h3>
        </div>

        {/* Content Preview */}
        <div className="bg-gray-50 p-3 rounded border border-gray-200 max-h-24 overflow-y-auto">
          <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap">{script.content}</p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge label={config.label} variant="secondary" className={config.badge} />
          {script.dueDate && formatDate(script.dueDate) && (
            <Badge label={formatDate(script.dueDate)!} variant="secondary" />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(script)}
            className="text-xs flex-1"
          >
            <Edit size={14} />
            Editar
          </Button>
          {script.status !== 'grabado' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => updateStatus(script.id, 'grabado')}
              className="text-green-700 hover:text-green-800"
            >
              <CheckCircle2 size={14} />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteScript(script.id)}
            className="text-red-700 hover:text-red-800"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
