import type { Column, Priority } from './types';

export const COLUMNS: Record<string, Column> = {
  alberto: {
    id: 'alberto',
    title: 'Alberto',
    icon: '🔵',
  },
  aaron: {
    id: 'aaron',
    title: 'Aarón',
    icon: '🟡',
  },
  general: {
    id: 'general',
    title: 'General',
    icon: '⚪',
  },
  completadas: {
    id: 'completadas',
    title: 'Completadas',
    icon: '✅',
  },
};

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; badge: string }> = {
  baja: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  media: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
  },
  alta: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400',
  },
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Urgente',
};
