export type CriterionStatus = 'CUMPLE' | 'NO CUMPLE' | 'NO APLICA';

export type AdvisorRole = 'Cazador' | 'Recolector' | 'Vendedor' | 'Distribución' | 'Preventa' | 'LOG / Logística' | 'Otros';

export interface Advisor {
  name: string;
  role: AdvisorRole | string;
  messageCount?: number;
}

export interface CriterionResult {
  id: number;
  name: string;
  status: CriterionStatus;
  evidence: string;
  recommendation?: string;
  auditorNotes?: string;
}

export interface AuditReport {
  id: string;
  chatCode: string;
  botmakerUrl: string;
  fileName: string;
  evaluatedAt: string;
  evaluator: string;
  customerNameOrPhone?: string;
  conversationDate?: string;
  detectedPaymentMethod?: string;
  detectedAdvisors: Advisor[];
  globalScore: number;
  overallResult: 'APROBADO' | 'REQUIERE MEJORA' | 'NO CONFORME';
  complianceMatrix: CriterionResult[];
  executiveSummary: string;
  strengths?: string[];
  improvementAreas?: string[];
  manualOverridesApplied?: boolean;
}

export interface EvaluatorProfile {
  id: string;
  name: string;
  avatarColor: string;
  role: string;
}
