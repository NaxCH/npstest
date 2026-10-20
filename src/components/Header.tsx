import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  BarChart3, 
  History, 
  FileText, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { EvaluatorProfile } from '../types/audit';

interface HeaderProps {
  evaluators: EvaluatorProfile[];
  activeEvaluator: string;
  onSelectEvaluator: (name: string) => void;
  activeTab: 'upload' | 'report' | 'history' | 'analytics';
  onTabChange: (tab: 'upload' | 'report' | 'history' | 'analytics') => void;
  hasCurrentReport: boolean;
  historyCount: number;
  averageScore: number;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  evaluators,
  activeEvaluator,
  onSelectEvaluator,
  activeTab,
  onTabChange,
  hasCurrentReport,
  historyCount,
  averageScore,
  onOpenGuide
}) => {
  const currentEvaluatorObj = evaluators.find(e => e.name === activeEvaluator) || evaluators[0];

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl tracking-tight">
              212
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-slate-950" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                212Global <span className="text-emerald-400 font-semibold text-sm px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60">QA Botmaker</span>
              </h1>
              <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                12 Criterios WhatsApp
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Portal de Auditoría y Control de Calidad Comercial • Integración Botmaker
            </p>
          </div>
        </div>

        {/* Quick Stats & Evaluator Selector */}
        <div className="flex items-center flex-wrap gap-3">
          
          {/* Quick Metrics */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-lg text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Auditados</span>
              <span className="font-bold text-slate-200">{historyCount} chats</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Promedio Global</span>
              <span className={`font-bold ${averageScore >= 80 ? 'text-emerald-400' : averageScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                {averageScore}%
              </span>
            </div>
          </div>

          {/* Criteria Guide button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Ver los 12 Criterios Oficiales y Regla de Cashea"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guía de 12 Criterios</span>
          </button>

          {/* Active Evaluator Selector */}
          <div className="relative group">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 rounded-lg px-3 py-1.5 transition-colors cursor-pointer">
              <div className={`w-6 h-6 rounded-full ${currentEvaluatorObj.avatarColor} text-white font-bold text-xs flex items-center justify-center`}>
                {activeEvaluator.charAt(0)}
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block leading-tight font-medium">Evaluador Activo:</span>
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1">
                  {activeEvaluator}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2 hidden group-hover:block group-focus-within:block z-50">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Seleccionar Evaluador Oficial
              </div>
              {evaluators.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => onSelectEvaluator(ev.name)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeEvaluator === ev.name 
                      ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 font-semibold' 
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${ev.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {ev.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <div className="font-medium text-slate-100">{ev.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{ev.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 border-t border-slate-800/80 pt-1 -mb-px">
          
          <button
            onClick={() => onTabChange('upload')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'upload'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Nueva Auditoría</span>
          </button>

          <button
            onClick={() => hasCurrentReport && onTabChange('report')}
            disabled={!hasCurrentReport}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
              !hasCurrentReport 
                ? 'border-transparent text-slate-600 cursor-not-allowed'
                : activeTab === 'report'
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20 cursor-pointer'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700 cursor-pointer'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Resultado de Auditoría</span>
            {hasCurrentReport && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onTabChange('history')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'history'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {historyCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange('analytics')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas y Rendimiento</span>
          </button>

        </nav>
      </div>
    </header>
  );
};
