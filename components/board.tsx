'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Column } from './column';
import { StatsCard } from './stats-card';
import { AddTaskModal } from './add-task-modal';
import { Button } from './ui/button';

export function Board() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
              <p className="text-gray-600 text-sm mt-1">
                Organiza tus tareas de forma visual y colaborativa
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2"
            >
              <Plus size={18} />
              Nueva Tarea
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-12">
          <StatsCard />
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-8">
          <Column columnId="alberto" />
          <Column columnId="aaron" />
          <Column columnId="general" />
          <Column columnId="completadas" />
        </div>
      </main>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
