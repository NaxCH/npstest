import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Play, 
  AlertCircle, 
  Check, 
  ExternalLink, 
  HelpCircle,
  FileCode,
  Zap,
  Info
} from 'lucide-react';
import { extractTextFromPdf } from '../utils/pdfExtractor';
import { SAMPLE_CHATS, SampleChatCase } from '../data/samples';

interface AuditUploaderProps {
  onProcessAudit: (pdfText: string, fileName: string) => Promise<void>;
  isLoading: boolean;
  activeEvaluator: string;
}

export const AuditUploader: React.FC<AuditUploaderProps> = ({
  onProcessAudit,
  isLoading,
  activeEvaluator
}) => {
  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'paste'>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [chatText, setChatText] = useState<string>('');
  const [isExtractingPdf, setIsExtractingPdf] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extraer código potencial del nombre
  const extractedChatCode = React.useMemo(() => {
    if (!fileName) return '';
    if (fileName.includes('_202')) return fileName.split('_202')[0];
    return fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_-]/g, '');
  }, [fileName]);

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    if (!file) return;

    setFileName(file.name);

    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      setIsExtractingPdf(true);
      try {
        const text = await extractTextFromPdf(file);
        setChatText(text);
      } catch (err: any) {
        setErrorMessage(err.message || 'Error al procesar el archivo PDF. Intenta copiar y pegar el texto directamente.');
      } finally {
        setIsExtractingPdf(false);
      }
    } else {
      // Si es archivo .txt o json
      try {
        const text = await file.text();
        setChatText(text);
      } catch (err: any) {
        setErrorMessage('No se pudo leer el archivo de texto.');
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const loadSample = (sample: SampleChatCase) => {
    setErrorMessage(null);
    setFileName(sample.fileName);
    setChatText(sample.text);
    setActiveInputMode('paste');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) {
      setErrorMessage('Por favor carga un archivo PDF o ingresa el texto de la conversación de Botmaker.');
      return;
    }
    setErrorMessage(null);
    await onProcessAudit(chatText, fileName || 'chat_export.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Hero card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditoría Automatizada con Inteligencia Artificial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Auditoría de Calidad Comercial de Chats Botmaker
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Sube el archivo PDF exportado desde Botmaker o pega la transcripción del chat. El sistema detectará automáticamente a los asesores que intervinieron (Cazador, Recolector, Vendedor), extraerá el enlace directo a Botmaker y evaluará los <strong className="text-emerald-300 font-semibold">12 criterios oficiales</strong> con la regla de exención para <strong className="text-emerald-300 font-semibold">Cashea y MercadoLibre</strong>.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Detección de roles y transferencias
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Generador de enlace go.botmaker.com
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Dictamen y matriz de evidencia
            </span>
          </div>
        </div>
      </div>

      {/* Main input container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: File Upload & Text Box */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Input Mode Selector */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-1.5">
            <div className="flex space-x-1">
              <button
                type="button"
                onClick={() => setActiveInputMode('upload')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeInputMode === 'upload'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subir PDF de Botmaker</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveInputMode('paste')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeInputMode === 'paste'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>Pegar Texto Directo</span>
              </button>
            </div>

            {chatText && (
              <span className="text-[11px] text-slate-400 font-mono pr-2">
                {chatText.length.toLocaleString()} caracteres
              </span>
            )}
          </div>

          {/* Mode 1: PDF File Drop Zone */}
          {activeInputMode === 'upload' && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 relative ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10'
                  : fileName
                    ? 'border-emerald-700/70 bg-slate-900/90'
                    : 'border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shadow-inner">
                  {isExtractingPdf ? (
                    <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  ) : fileName ? (
                    <FileText className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <UploadCloud className="w-7 h-7 text-emerald-400" />
                  )}
                </div>

                <div>
                  {isExtractingPdf ? (
                    <p className="text-sm font-semibold text-emerald-400 animate-pulse">
                      Leyendo y extrayendo texto del PDF...
                    </p>
                  ) : fileName ? (
                    <div>
                      <p className="text-sm font-bold text-slate-100 flex items-center justify-center gap-2">
                        <span>{fileName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-mono">
                          Listo para auditar
                        </span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Haz clic o arrastra otro archivo para reemplazar
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Arrastra y suelta tu archivo PDF aquí o <span className="text-emerald-400 underline">examina tus carpetas</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Compatible con exportaciones oficiales de Botmaker (WhatsApp)
                      </p>
                    </div>
                  )}
                </div>

                {extractedChatCode && (
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
                    <span className="text-slate-500">Código Detectado:</span>
                    <strong className="text-emerald-400">{extractedChatCode}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mode 2: Paste Direct Chat Text */}
          {activeInputMode === 'paste' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label htmlFor="fileNameInput" className="font-medium text-slate-300">
                  Nombre referencial del archivo o código de chat:
                </label>
                <span className="text-[11px] text-slate-500">Ej: HLBCE4G3WCI243EHXFE0_2026-10-19.pdf</span>
              </div>
              <input
                id="fileNameInput"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="HLBCE4G3WCI243EHXFE0_2026-10-19_chat_completo.pdf"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />

              <div className="relative">
                <textarea
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder="Pega aquí la transcripción del chat de Botmaker con fechas, remitentes y mensajes..."
                  rows={12}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-y"
                />
                {chatText && (
                  <button
                    type="button"
                    onClick={() => {
                      setChatText('');
                      setFileName('');
                    }}
                    className="absolute top-3 right-3 text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded border border-slate-700 transition-colors cursor-pointer"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorMessage && (
            <div className="bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl p-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Atención:</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Evaluador activo: <strong className="text-slate-200">{activeEvaluator}</strong></span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || isExtractingPdf || !chatText.trim()}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg cursor-pointer ${
                isLoading || isExtractingPdf || !chatText.trim()
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-600/30 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Auditando conversación con Gemini...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Iniciar Auditoría Oficial</span>
                </>
              )}
            </button>
          </div>

          {/* Loading steps animation */}
          {isLoading && (
            <div className="bg-slate-900 border border-emerald-900/60 rounded-2xl p-5 shadow-2xl space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <Zap className="w-3 h-3 animate-bounce" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Procesando Auditoría de Calidad en Curso...
                </h4>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-400 pl-8 list-disc">
                <li>Analizando texto completo y extrayendo código de enlace de Botmaker</li>
                <li>Identificando asesores humanos e intervenciones de LOG / Logística</li>
                <li>Evaluando cumplimiento de los 12 criterios de atención al cliente</li>
                <li>Comprobando regla de exención comercial (Cashea / MercadoLibre)</li>
                <li>Consolidando dictamen y evidencias para el reporte de 212Global</li>
              </ul>
            </div>
          )}

        </div>

        {/* Right 1 Col: Quick Sample Presets & Instructions */}
        <div className="space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Casos de Prueba Listos (1-Clic)</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Carga casos reales de Botmaker preconfigurados para verificar la auditoría y reglas especiales:
            </p>

            <div className="space-y-2.5">
              {SAMPLE_CHATS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => loadSample(sample)}
                  className="group p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      {sample.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                      {sample.chatCode.slice(0, 8)}...
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {sample.scenario}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-medium">{sample.expectedOutcome}</span>
                    <span className="text-slate-500 group-hover:text-slate-300">Cargar caso &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Rules reminder box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4.5 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Reglas Clave de 212Global</span>
            </div>
            <ul className="space-y-1.5 text-[11px] leading-relaxed list-disc pl-4 text-slate-400">
              <li>
                <strong className="text-slate-300">Enlace Oficial:</strong> Se construye como <code className="text-emerald-400">https://go.botmaker.com/#/chats/[CÓDIGO]</code>
              </li>
              <li>
                <strong className="text-slate-300">Cashea / MercadoLibre:</strong> El criterio #2 (25% divisas) se marca automáticamente como <strong className="text-emerald-400">NO APLICA</strong>.
              </li>
              <li>
                <strong className="text-slate-300">Roles de Asesores:</strong> Cazador, Recolector, Vendedor, Distribución, Preventa, LOG.
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
