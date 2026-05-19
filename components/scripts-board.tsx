'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Script } from '@/lib/script-types';
import { useScriptStore } from '@/store/script-store';
import { ScriptCard } from './script-card';
import { ScriptsStatsCard } from './scripts-stats-card';
import { AddScriptModal } from './add-script-modal';
import { Button } from './ui/button';
import { useInitializeStores } from '@/hooks/use-initialize-stores';

export function ScriptsBoard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);

  const scripts = useScriptStore((state) => state.scripts);
  useInitializeStores();

  const handleEdit = (script: Script) => {
    setEditingScript(script);
    setIsAddModalOpen(true);
  };

  const handleClose = () => {
    setIsAddModalOpen(false);
    setEditingScript(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Guiones de Anuncios</h1>
              <p className="text-gray-600 text-sm mt-1">
                Gestiona tus guiones pendientes de grabar para vendemasmuebles.es
              </p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus size={18} />
              Nuevo Guión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="mb-12">
          <ScriptsStatsCard />
        </div>

        {/* Scripts Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Todos los Guiones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {scripts.length === 0 ? (
                <div className="col-span-full flex items-center justify-center py-12 px-4 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm">
                  No hay guiones todavía. ¡Crea uno para empezar!
                </div>
              ) : (
                scripts.map((script, index) => (
                  <ScriptCard
                    key={script.id}
                    script={script}
                    index={index}
                    onEdit={handleEdit}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Add/Edit Script Modal */}
      <AddScriptModal
        isOpen={isAddModalOpen}
        onClose={handleClose}
        editingScript={editingScript}
      />
    </div>
  );
}
