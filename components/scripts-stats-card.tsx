'use client';

import { useMemo } from 'react';
import { useScriptStore } from '@/store/script-store';
import { Film, AlertCircle, CheckCircle2 } from 'lucide-react';

export function ScriptsStatsCard() {
  const scripts = useScriptStore((state) => state.scripts);

  const stats = useMemo(() => {
    const pending = scripts.filter((s) => s.status === 'pendiente').length;
    const recorded = scripts.filter((s) => s.status === 'grabado').length;

    return {
      total: scripts.length,
      pending,
      recorded,
    };
  }, [scripts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total */}
      <div className="px-4 py-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <Film className="text-gray-400" size={24} />
        </div>
      </div>

      {/* Pending */}
      <div className="px-4 py-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Pendientes de Grabar</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
          </div>
          <AlertCircle className="text-amber-600" size={24} />
        </div>
      </div>

      {/* Recorded */}
      <div className="px-4 py-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Grabados</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.recorded}</p>
          </div>
          <CheckCircle2 className="text-green-600" size={24} />
        </div>
      </div>
    </div>
  );
}
