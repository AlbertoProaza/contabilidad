'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'success';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-amber-100 text-amber-900',
    secondary: 'bg-gray-200 text-gray-700',
    destructive: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
  };

  return (
    <span className={cn('inline-block px-2 py-1 rounded text-xs font-medium', variants[variant], className)}>
      {label}
    </span>
  );
}
