import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  MinusCircle, 
  UserCheck, 
  Sparkles, 
  Printer, 
  Download, 
  RefreshCw, 
  Edit3, 
  Save, 
  CreditCard, 
  Phone, 
  Calendar, 
  Bot,
  TrendingUp,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { AuditReport, CriterionResult, CriterionStatus } from '../types/audit';

interface AuditReportViewProps {
  report: AuditReport;
  onUpdateReport: (updated: AuditReport) => void;
  onNewAudit: () => void;
  onSaveToHistory: (report: AuditReport) => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({
  report,
  onUpdateReport,
  onNewAudit,
  onSaveToHistory
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState<boolean>(false);
  const [criteriaFilter, setCriteriaFilter] = useState<'all' | 'CUMPLE' | 'NO CUMPLE' | 'NO APLICA'>('all');
  const [editingCriterionId, setEditingCriterionId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<CriterionStatus>('CUMPLE');
  const [editNotes, setEditNotes] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Botmaker Link
  const botmakerUrl = report.botmakerUrl || `https://go.botmaker.com/#/chats/${report.chatCode}`;

  // Copiar enlace al portapapeles
  const handleCopyLink = () => {
    navigator.clipboard.writeText(botmakerUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copiar resumen formateado para WhatsApp / Slack
  const handleCopyWhatsappSummary = () => {
    const cumplidos = report.complianceMatrix.filter(c => c.status === 'CUMPLE').length;
    const noCumple = report.complianceMatrix.filter(c => c.status === 'NO CUMPLE').length;
    const noAplica = report.complianceMatrix.filter(c => c.status === 'NO APLICA').length;
    const totalAplicables = report.complianceMatrix.length - noAplica;

    const asesores = report.detectedAdvisors.map(a => `${a.name} (${a.role})`).join(', ');

    const lineasCriterios = report.complianceMatrix.map(c => {
      const icono = c.status === 'CUMPLE' ? '✅' : c.status === 'NO CUMPLE' ? '❌' : '⚪';
      return `${icono} ${c.id}. ${c.name}: *${c.status}*`;
    }).join('\n');

    const texto = `*📊 AUDITORÍA DE CALIDAD COMERCIAL 212GLOBAL*
*Chat:* ${report.chatCode}
*Enlace Botmaker:* ${botmakerUrl}
*Evaluador:* ${report.evaluator}
*Asesores Detectados:* ${asesores || 'No identificados'}
*Puntaje Global:* ${report.globalScore}% (${report.overallResult})
*Cumplimiento:* ${cumplidos}/${totalAplicables} criterios aplicables (${noAplica} No Aplican)

*DESGLOSE DE CRITERIOS:*
${lineasCriterios}

*RESUMEN EJECUTIVO:*
${report.executiveSummary}

_Generado automáticamente vía Sistema de Evaluaciones 212Global_`;

    navigator.clipboard.writeText(texto);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  // Imprimir reporte
  const handlePrint = () => {
    window.print();
  };

  // Descargar JSON
  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `auditoria_${report.chatCode}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Guardar en Historial
  const handleSave = () => {
    onSaveToHistory(report);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Iniciar edición manual de un criterio
  const startEditCriterion = (item: CriterionResult) => {
    setEditingCriterionId(item.id);
    setEditStatus(item.status);
    setEditNotes(item.auditorNotes || '');
  };

  // Guardar edición manual de un criterio y recalcular puntaje
  const saveCriterionOverride = (id: number) => {
    const updatedMatrix = report.complianceMatrix.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: editStatus,
          auditorNotes: editNotes.trim() || undefined,
        };
      }
      return item;
    });

    // Recalcular puntaje global
    const aplicables = updatedMatrix.filter(c => c.status !== 'NO APLICA');
    const cumplidos = updatedMatrix.filter(c => c.status === 'CUMPLE');
    const newScore = aplicables.length > 0 ? Math.round((cumplidos.length / aplicables.length) * 100) : 0;
    
    let newResult: 'APROBADO' | 'REQUIERE MEJORA' | 'NO CONFORME' = 'NO CONFORME';
    if (newScore >= 80) newResult = 'APROBADO';
    else if (newScore >= 60) newResult = 'REQUIERE MEJORA';

    const updatedReport: AuditReport = {
      ...report,
      complianceMatrix: updatedMatrix,
      globalScore: newScore,
      overallResult: newResult,
      manualOverridesApplied: true,
    };

    onUpdateReport(updatedReport);
    setEditingCriterionId(null);
  };

  // Filtrado de criterios
  const filteredCriteria = report.complianceMatrix.filter((c) => {
    if (criteriaFilter === 'all') return true;
    return c.status === criteriaFilter;
  });

  const cumplidosCount = report.complianceMatrix.filter(c => c.status === 'CUMPLE').length;
  const noCumpleCount = report.complianceMatrix.filter(c => c.status === 'NO CUMPLE').length;
  const noAplicaCount = report.complianceMatrix.filter(c => c.status === 'NO APLICA').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 print:p-0">
      
      {/* Top action toolbar (hidden on print) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={onNewAudit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Auditar Otro Chat</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedNotice ? '¡Guardado en Historial!' : 'Guardar en Historial'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyWhatsappSummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow cursor-pointer"
            title="Copiar formato listo para WhatsApp / Slack"
          >
            {copiedWhatsapp ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
            <span>{copiedWhatsapp ? '¡Copiado para WhatsApp!' : 'Copiar Resumen WhatsApp'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* Main Score & Audit Summary Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          report.globalScore >= 80 ? 'bg-emerald-500/10' : report.globalScore >= 60 ? 'bg-amber-500/10' : 'bg-rose-500/10'
        }`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          
          {/* Left: Chat identification & Evaluator details */}
          <div className="space-y-3.5 max-w-2xl">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-700">
                CHAT: {report.chatCode}
              </span>

              <a
                href={botmakerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-950/90 text-emerald-300 hover:bg-emerald-900 border border-emerald-700/80 transition-colors"
                title="Abrir chat en la plataforma oficial de Botmaker"
              >
                <span>Abrir en Botmaker</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="Copiar enlace de Botmaker"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Copiado' : 'Copiar Link'}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Reporte de Calidad Comercial 212Global
            </h2>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auditor: <strong className="text-slate-200">{report.evaluator}</strong></span>
              </div>

              {report.conversationDate && (
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fecha: <strong className="text-slate-200">{report.conversationDate}</strong></span>
                </div>
              )}

              {report.customerNameOrPhone && (
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                  <Phone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cliente: <strong className="text-slate-200">{report.customerNameOrPhone}</strong></span>
                </div>
              )}

              {report.detectedPaymentMethod && (
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pago: <strong className="text-slate-200">{report.detectedPaymentMethod}</strong></span>
                </div>
              )}
            </div>

            {report.manualOverridesApplied && (
              <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs bg-amber-950/50 border border-amber-800/60 px-2.5 py-1 rounded-md">
                <Edit3 className="w-3 h-3" />
                <span>Ajustes manuales aplicados por el auditor</span>
              </div>
            )}
          </div>

          {/* Right: Global Score Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center gap-6 shadow-xl shrink-0">
            {/* Score Ring */}
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={238.76}
                  strokeDashoffset={238.76 - (238.76 * report.globalScore) / 100}
                  strokeLinecap="round"
                  className={`${
                    report.globalScore >= 80 
                      ? 'text-emerald-500' 
                      : report.globalScore >= 60 
                        ? 'text-amber-500' 
                        : 'text-rose-500'
                  } transition-all duration-1000`}
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-black text-white">{report.globalScore}%</span>
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Puntaje</span>
              </div>
            </div>

            {/* Verdict */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Dictamen Oficial
              </span>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wide border ${
                report.overallResult === 'APROBADO'
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-400'
                  : report.overallResult === 'REQUIERE MEJORA'
                    ? 'bg-amber-950/80 border-amber-700 text-amber-400'
                    : 'bg-rose-950/80 border-rose-700 text-rose-400'
              }`}>
                {report.overallResult === 'APROBADO' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : report.overallResult === 'REQUIERE MEJORA' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                <span>{report.overallResult}</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                {cumplidosCount} de {cumplidosCount + noCumpleCount} criterios cumplidos ({noAplicaCount} exentos)
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Detected Advisors Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Asesores e Intervenciones Detectadas
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {report.detectedAdvisors.length} participantes detectados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {report.detectedAdvisors.map((advisor, idx) => {
            const isBot = advisor.role.includes('LOG') || advisor.role.toLowerCase().includes('bot') || advisor.role.toLowerCase().includes('logística');
            
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  isBot
                    ? 'bg-slate-950/50 border-slate-800 text-slate-400'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isBot 
                      ? 'bg-slate-800 text-slate-400 border border-slate-700' 
                      : 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-sm'
                  }`}>
                    {isBot ? <Bot className="w-4 h-4" /> : advisor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{advisor.name}</h4>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-semibold mt-0.5 ${
                      isBot
                        ? 'bg-slate-800 text-slate-400'
                        : advisor.role === 'Cazador'
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                          : advisor.role === 'Vendedor'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            : advisor.role === 'Recolector'
                              ? 'bg-purple-950/80 text-purple-400 border border-purple-800/60'
                              : 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                    }`}>
                      {advisor.role}
                    </span>
                  </div>
                </div>

                {advisor.messageCount !== undefined && (
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-300 block">
                      {advisor.messageCount}
                    </span>
                    <span className="text-[10px] text-slate-500">mensajes</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Summary & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Executive summary (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Resumen Ejecutivo de la Auditoría</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>

        {/* Strengths & Improvement areas (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          {report.strengths && report.strengths.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Puntos Fuertes</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {report.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.improvementAreas && report.improvementAreas.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Oportunidades de Mejora</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {report.improvementAreas.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Compliance Matrix: The 12 Official Criteria */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
        
        {/* Section title & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Matriz de los 12 Criterios Oficiales</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Haz clic en "Ajustar" sobre cualquier criterio si deseas modificar la calificación o agregar notas del auditor.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCriteriaFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                criteriaFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos ({report.complianceMatrix.length})
            </button>
            <button
              onClick={() => setCriteriaFilter('CUMPLE')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                criteriaFilter === 'CUMPLE' ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>Cumple ({cumplidosCount})</span>
            </button>
            <button
              onClick={() => setCriteriaFilter('NO CUMPLE')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                criteriaFilter === 'NO CUMPLE' ? 'bg-rose-950 text-rose-300 font-bold border border-rose-800' : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <XCircle className="w-3 h-3" />
              <span>No Cumple ({noCumpleCount})</span>
            </button>
            <button
              onClick={() => setCriteriaFilter('NO APLICA')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                criteriaFilter === 'NO APLICA' ? 'bg-slate-800 text-slate-200 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MinusCircle className="w-3 h-3" />
              <span>No Aplica ({noAplicaCount})</span>
            </button>
          </div>
        </div>

        {/* List of criteria */}
        <div className="space-y-3">
          {filteredCriteria.map((criterion) => {
            const isEditing = editingCriterionId === criterion.id;

            return (
              <div
                key={criterion.id}
                className={`p-4 rounded-xl border transition-all ${
                  criterion.status === 'CUMPLE'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : criterion.status === 'NO CUMPLE'
                      ? 'bg-rose-950/20 border-rose-900/60 hover:border-rose-800'
                      : 'bg-slate-950/50 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Left: ID & Title */}
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {criterion.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        <span>{criterion.name}</span>
                        {criterion.id === 2 && (
                          <span className="text-[10px] font-normal text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                            Exención Cashea/ML
                          </span>
                        )}
                      </h4>

                      {/* Evidence quote */}
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                        <strong className="text-slate-400 font-sans font-semibold">Evidencia detectada: </strong>
                        {criterion.evidence}
                      </p>

                      {/* Recommendation if any */}
                      {criterion.recommendation && (
                        <p className="text-xs text-amber-300/90 mt-1.5 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          <span><strong className="text-amber-400">Recomendación:</strong> {criterion.recommendation}</span>
                        </p>
                      )}

                      {/* Auditor manual notes if any */}
                      {criterion.auditorNotes && (
                        <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5 bg-emerald-950/40 p-1.5 rounded border border-emerald-900/60">
                          <Edit3 className="w-3 h-3 shrink-0" />
                          <span><strong>Nota del Auditor ({report.evaluator}):</strong> {criterion.auditorNotes}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Status badge & Override button */}
                  <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                      criterion.status === 'CUMPLE'
                        ? 'bg-emerald-950/90 text-emerald-400 border-emerald-700/80'
                        : criterion.status === 'NO CUMPLE'
                          ? 'bg-rose-950/90 text-rose-400 border-rose-700/80'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {criterion.status === 'CUMPLE' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : criterion.status === 'NO CUMPLE' ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : (
                        <MinusCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{criterion.status}</span>
                    </span>

                    <button
                      onClick={() => isEditing ? setEditingCriterionId(null) : startEditCriterion(criterion)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                      title="Modificar estatus o agregar comentarios del evaluador"
                    >
                      {isEditing ? 'Cancelar' : 'Ajustar'}
                    </button>
                  </div>

                </div>

                {/* Inline Editing Drawer */}
                {isEditing && (
                  <div className="mt-3 pt-3 border-t border-slate-800 bg-slate-950/80 p-3.5 rounded-xl space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-300">Modificar Calificación:</span>
                      <div className="flex gap-1.5">
                        {(['CUMPLE', 'NO CUMPLE', 'NO APLICA'] as CriterionStatus[]).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setEditStatus(st)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                              editStatus === st
                                ? st === 'CUMPLE'
                                  ? 'bg-emerald-600 text-white'
                                  : st === 'NO CUMPLE'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-700 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Comentario / justificación del evaluador ({report.evaluator}):
                      </label>
                      <input
                        type="text"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Ej: Se validó que el cliente canceló en efectivo..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingCriterionId(null)}
                        className="px-3 py-1 rounded text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => saveCriterionOverride(criterion.id)}
                        className="px-4 py-1 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                      >
                        Aplicar y Recalcular Puntaje
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
