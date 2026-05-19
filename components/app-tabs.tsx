'use client';

import { useState } from 'react';
import { Board } from './board';
import { ScriptsBoard } from './scripts-board';
import { Button } from './ui/button';
import { CheckSquare, Film } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppTabs() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'scripts'>('tasks');

  return (
    <div>
      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('tasks')}
              className={cn(
                'px-4 py-4 font-medium text-sm border-b-2 transition-colors',
                activeTab === 'tasks'
                  ? 'text-amber-900 border-amber-900'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              )}
            >
              <div className="flex items-center gap-2">
                <CheckSquare size={18} />
                Tareas
              </div>
            </button>
            <button
              onClick={() => setActiveTab('scripts')}
              className={cn(
                'px-4 py-4 font-medium text-sm border-b-2 transition-colors',
                activeTab === 'scripts'
                  ? 'text-amber-900 border-amber-900'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              )}
            >
              <div className="flex items-center gap-2">
                <Film size={18} />
                Guiones
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'tasks' && <Board />}
        {activeTab === 'scripts' && <ScriptsBoard />}
      </div>
    </div>
  );
}
