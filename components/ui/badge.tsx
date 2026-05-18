'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'success';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-100',
    secondary: 'bg-gray-600 text-gray-100',
    destructive: 'bg-red-500/20 text-red-400',
    success: 'bg-green-500/20 text-green-400',
  };

  return (
    <span className={cn('inline-block px-2 py-1 rounded text-xs font-medium', variants[variant], className)}>
      {label}
    </span>
  );
}
