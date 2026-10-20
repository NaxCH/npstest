import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Award, 
  Target,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { AuditReport } from '../types/audit';
import { OFFICIAL_CRITERIA } from '../data/criteriaGuide';

interface AnalyticsViewProps {
  history: AuditReport[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
        <BarChart3 className="w-10 h-10 mx-auto text-slate-600" />
        <h3 className="text-base font-bold text-slate-300">No hay datos suficientes para métricas</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Procesa al menos una auditoría para visualizar estadísticas y el rendimiento del equipo de 212Global.
        </p>
      </div>
    );
  }

  // Cálculos globales
  const totalAudits = history.length;
  const avgScore = Math.round(history.reduce((acc, h) => acc + h.globalScore, 0) / totalAudits);
  const approvedCount = history.filter(h => h.overallResult === 'APROBADO').length;
  const approvedRate = Math.round((approvedCount / totalAudits) * 100);
  const requiresImprovementCount = history.filter(h => h.overallResult === 'REQUIERE MEJORA').length;
  const nonCompliantCount = history.filter(h => h.overallResult === 'NO CONFORME').length;

  // Rendimiento por Criterio (de los 12)
  const criteriaStats = OFFICIAL_CRITERIA.map((criterion) => {
    let cumpleCount = 0;
    let noCumpleCount = 0;
    let noAplicaCount = 0;

    history.forEach((h) => {
      const found = h.complianceMatrix.find(c => c.id === criterion.id);
      if (found) {
        if (found.status === 'CUMPLE') cumpleCount++;
        else if (found.status === 'NO CUMPLE') noCumpleCount++;
        else if (found.status === 'NO APLICA') noAplicaCount++;
      }
    });

    const applicable = cumpleCount + noCumpleCount;
    const complianceRate = applicable > 0 ? Math.round((cumpleCount / applicable) * 100) : 100;

    return {
      id: criterion.id,
      name: criterion.name,
      category: criterion.category,
      cumpleCount,
      noCumpleCount,
      noAplicaCount,
      applicable,
      complianceRate
    };
  });

  // Ordenar criterios por tasa de cumplimiento (los más débiles primero para coaching)
  const sortedCriteria = [...criteriaStats].sort((a, b) => a.complianceRate - b.complianceRate);

  // Rendimiento por Asesor
  const advisorMap = new Map<string, { role: string; scores: number[]; count: number }>();

  history.forEach((h) => {
    h.detectedAdvisors.forEach((adv) => {
      if (adv.role.includes('LOG') || adv.name.toLowerCase().includes('bot')) return;
      const current = advisorMap.get(adv.name) || { role: adv.role, scores: [], count: 0 };
      current.scores.push(h.globalScore);
      current.count += 1;
      advisorMap.set(adv.name, current);
    });
  });

  const advisorLeaderboard = Array.from(advisorMap.entries()).map(([name, data]) => {
    const avg = Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length);
    return {
      name,
      role: data.role,
      count: data.count,
      avgScore: avg
    };
  }).sort((a, b) => b.avgScore - a.avgScore);

  // Evaluaciones por Auditor
  const evaluatorMap = new Map<string, number>();
  history.forEach((h) => {
    const cur = evaluatorMap.get(h.evaluator) || 0;
    evaluatorMap.set(h.evaluator, cur + 1);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <span>Panel de Calidad Comercial y Cumplimiento 212Global</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Indicadores consolidados basados en {totalAudits} conversaciones de Botmaker auditadas.
        </p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Promedio General */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Calidad Global</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white flex items-baseline gap-2">
            <span className={avgScore >= 80 ? 'text-emerald-400' : avgScore >= 60 ? 'text-amber-400' : 'text-rose-400'}>
              {avgScore}%
            </span>
            <span className="text-xs font-normal text-slate-500">promedio</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full ${avgScore >= 80 ? 'bg-emerald-500' : avgScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} 
              style={{ width: `${avgScore}%` }} 
            />
          </div>
        </div>

        {/* KPI 2: Tasa de Aprobación */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Tasa de Aprobación</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 flex items-baseline gap-2">
            <span>{approvedRate}%</span>
            <span className="text-xs font-normal text-slate-500">({approvedCount} de {totalAudits})</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Chats con puntaje igual o mayor a 80%.
          </p>
        </div>

        {/* KPI 3: Requiere Mejora */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Requieren Mejora</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 flex items-baseline gap-2">
            <span>{requiresImprovementCount}</span>
            <span className="text-xs font-normal text-slate-500">chats (60-79%)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Oportunidades de ajuste en protocolo.
          </p>
        </div>

        {/* KPI 4: No Conformes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>No Conformes</span>
            <ShieldCheck className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 flex items-baseline gap-2">
            <span>{nonCompliantCount}</span>
            <span className="text-xs font-normal text-slate-500">críticos (&lt;60%)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Requieren revisión inmediata de supervisor.
          </p>
        </div>

      </div>

      {/* Grid: Criteria Performance & Advisor Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: 12 Criteria Compliance Meters */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Cumplimiento por Criterio Oficial (12 Criterios)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Identifica las áreas de oportunidad más críticas para capacitación del equipo.
              </p>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Ordenado de menor a mayor
            </span>
          </div>

          <div className="space-y-3.5">
            {sortedCriteria.map((c) => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-800 font-mono text-[10px] font-bold flex items-center justify-center text-slate-400">
                      {c.id}
                    </span>
                    <span>{c.name}</span>
                    {c.noAplicaCount > 0 && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({c.noAplicaCount} exentos Cashea/ML)
                      </span>
                    )}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {c.cumpleCount}/{c.applicable}
                    </span>
                    <span className={`font-mono font-bold ${
                      c.complianceRate >= 80 ? 'text-emerald-400' : c.complianceRate >= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {c.complianceRate}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      c.complianceRate >= 80 ? 'bg-emerald-500' : c.complianceRate >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${c.complianceRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Advisor Leaderboard & Evaluator Workload */}
        <div className="space-y-6">
          
          {/* Advisor Rankings */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Rendimiento por Asesor</span>
            </h3>

            {advisorLeaderboard.length === 0 ? (
              <p className="text-xs text-slate-500">No se han registrado asesores individuales.</p>
            ) : (
              <div className="space-y-3">
                {advisorLeaderboard.map((adv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        idx === 0 
                          ? 'bg-amber-500 text-slate-950' 
                          : idx === 1 
                            ? 'bg-slate-300 text-slate-950' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{adv.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {adv.role} • {adv.count} chat{adv.count > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-black font-mono ${
                        adv.avgScore >= 80 ? 'text-emerald-400' : adv.avgScore >= 60 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {adv.avgScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Evaluator Workload */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Auditorías por Evaluador</span>
            </h3>

            <div className="space-y-2">
              {Array.from(evaluatorMap.entries()).map(([evaluator, count]) => (
                <div
                  key={evaluator}
                  className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/50 border border-slate-800"
                >
                  <span className="font-semibold text-slate-300">{evaluator}</span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                    {count} chats
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
