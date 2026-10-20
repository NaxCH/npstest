import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Trash2, 
  Eye,
  CreditCard
} from 'lucide-react';
import { AuditReport } from '../types/audit';

interface AuditHistoryViewProps {
  history: AuditReport[];
  onSelectReport: (report: AuditReport) => void;
  onDeleteReport: (id: string) => void;
}

export const AuditHistoryView: React.FC<AuditHistoryViewProps> = ({
  history,
  onSelectReport,
  onDeleteReport
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterEvaluator, setFilterEvaluator] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');

  // Evaluadores únicos en el historial
  const uniqueEvaluators = Array.from(new Set(history.map(h => h.evaluator))).filter(Boolean);

  // Filtrado
  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.chatCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detectedAdvisors.some(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.customerNameOrPhone && item.customerNameOrPhone.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEvaluator = filterEvaluator === 'all' || item.evaluator === filterEvaluator;
    const matchesResult = filterResult === 'all' || item.overallResult === filterResult;

    return matchesSearch && matchesEvaluator && matchesResult;
  });

  // Exportar historial a CSV
  const handleExportCsv = () => {
    if (history.length === 0) return;

    const headers = ['ID', 'Chat Code', 'Evaluador', 'Fecha Evaluacion', 'Puntaje Global', 'Resultado', 'Metodo Pago', 'Asesores', 'URL Botmaker'];
    const rows = history.map(h => [
      h.id,
      h.chatCode,
      h.evaluator,
      h.evaluatedAt,
      `${h.globalScore}%`,
      h.overallResult,
      h.detectedPaymentMethod || 'N/A',
      h.detectedAdvisors.map(a => `${a.name} (${a.role})`).join('; '),
      h.botmakerUrl
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `historial_auditorias_212global_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Historial de Auditorías de Calidad</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Registro consolidado de evaluaciones comerciales de WhatsApp Botmaker para 212Global.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          disabled={history.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer self-start sm:self-center"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Exportar Todo en CSV</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, asesor o teléfono..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Evaluator Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Evaluador:</span>
            <select
              value={filterEvaluator}
              onChange={(e) => setFilterEvaluator(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Todos los evaluadores</option>
              {uniqueEvaluators.map(ev => (
                <option key={ev} value={ev}>{ev}</option>
              ))}
            </select>
          </div>

          {/* Result Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Resultado:</span>
            <select
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Todos los resultados</option>
              <option value="APROBADO">Aprobados (≥80%)</option>
              <option value="REQUIERE MEJORA">Requiere Mejora (60-79%)</option>
              <option value="NO CONFORME">No Conforme (&lt;60%)</option>
            </select>
          </div>
        </div>

      </div>

      {/* History Table / Cards */}
      {filteredHistory.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <History className="w-10 h-10 mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-slate-300">No se encontraron auditorías</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No hay registros que coincidan con los filtros aplicados o aún no has procesado auditorías en esta sesión.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Code, Date, Advisors, Summary */}
              <div className="space-y-2 max-w-2xl">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-800 text-slate-100 px-2.5 py-1 rounded-md border border-slate-700">
                    {item.chatCode}
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Evaluador: <strong className="text-slate-200">{item.evaluator}</strong></span>
                  </span>

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.evaluatedAt).toLocaleDateString()}</span>
                  </span>

                  {item.detectedPaymentMethod && (
                    <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60 flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      <span>{item.detectedPaymentMethod}</span>
                    </span>
                  )}
                </div>

                {/* Advisors chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">Asesores:</span>
                  {item.detectedAdvisors.map((adv, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-800 text-slate-300 border border-slate-700/80"
                    >
                      {adv.name} <span className="text-slate-500">({adv.role})</span>
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.executiveSummary}
                </p>

              </div>

              {/* Right Column: Score, Result Badge & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 shrink-0">
                
                {/* Score & Result */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className={`text-xl font-black ${
                      item.globalScore >= 80 ? 'text-emerald-400' : item.globalScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {item.globalScore}%
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      item.overallResult === 'APROBADO'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : item.overallResult === 'REQUIERE MEJORA'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-rose-950 text-rose-400 border-rose-800'
                    }`}>
                      {item.overallResult}
                    </span>
                  </div>
                  <a
                    href={item.botmakerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-400 hover:text-emerald-400 inline-flex items-center gap-1 mt-1 transition-colors"
                  >
                    <span>Ir a Botmaker</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectReport(item)}
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                    title="Ver reporte completo"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteReport(item.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Eliminar de historial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
