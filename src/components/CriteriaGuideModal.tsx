import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  Tag, 
  Sparkles,
  Info
} from 'lucide-react';
import { OFFICIAL_CRITERIA, CriterionDetail } from '../data/criteriaGuide';

interface CriteriaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CriteriaGuideModal: React.FC<CriteriaGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', 'Comercial', 'Operativo', 'Experiencia de Cliente', 'Identidad'];

  const filteredCriteria = OFFICIAL_CRITERIA.filter(
    c => selectedCategory === 'all' || c.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Manual Oficial de los 12 Criterios de Calidad</span>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  212Global
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Ponderación, reglas de validación y protocolo de exención de Cashea / MercadoLibre.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filters Banner */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'Todos los Criterios (12)' : cat}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-amber-400 flex items-center gap-1.5 font-medium bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-900/60">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Regla Cashea: Criterio #2 = NO APLICA</span>
          </div>
        </div>

        {/* Modal Body: List of Criteria */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          {filteredCriteria.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold font-mono text-xs flex items-center justify-center">
                    {c.id}
                  </span>
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                    Ponderación: {c.weight}%
                  </span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed">
                {c.description}
              </p>

              {/* Exemption rule callout */}
              {c.exemptionNotes && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/80 text-amber-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-200">Regla de Exención Oficial:</strong>
                    <span>{c.exemptionNotes}</span>
                  </div>
                </div>
              )}

              {/* Rule */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                <span className="font-bold text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                  Regla de Validación:
                </span>
                <span className="text-slate-200">{c.complianceRule}</span>
              </div>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Good example */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Ejemplo Cumple (Práctica Correcta)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-200/90 font-mono">
                    {c.complianceExample}
                  </p>
                </div>

                {/* Bad example */}
                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px]">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Ejemplo No Cumple (Error Frecuente)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-rose-200/90 font-mono">
                    {c.nonComplianceExample}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            Entendido / Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
};
