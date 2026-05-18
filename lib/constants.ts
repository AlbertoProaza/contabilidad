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
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
  media: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  alta: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
  },
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Urgente',
};
