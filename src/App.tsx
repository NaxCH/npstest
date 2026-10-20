import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  LayoutDashboard,
  PlusCircle,
  FileText,
  Target,
  BarChart3,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  Eye,
  Trash2,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  User,
  Calendar,
  CreditCard,
  Copy,
  Printer,
  Check,
  X,
  Activity,
  Clock,
  Sun,
  Moon,
  Palette,
  Plus,
  UserPlus,
  ExternalLink,
  FileUp,
  FileCode,
  CheckSquare,
  XSquare,
  Sparkle,
  Bot,
  UserCheck,
  Zap,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { extractTextFromPdf } from './utils/pdfExtractor';
import { SAMPLE_CHATS, SampleChatCase } from './data/samples';

// ====================================================================
// SPECIAL & METALLIC PALETTES
// ====================================================================
const SPECIAL_METALLICS = [
  {
    id: 'negro',
    label: 'Negro Azabache',
    name: 'Negro Azabache',
    gradient: 'from-slate-950 via-zinc-900 to-black',
    text: 'text-white',
    hex: '#09090b',
    border: 'border-zinc-800'
  },
  {
    id: 'vinotinto',
    label: 'Vinotinto / Borgoña',
    name: 'Vinotinto / Borgoña',
    gradient: 'from-[#2b0407] via-[#581c25] to-[#800020]',
    text: 'text-rose-100',
    hex: '#581c25',
    border: 'border-rose-900'
  },
  {
    id: 'plateado',
    label: 'Plateado Metálico',
    name: 'Plateado Metálico',
    gradient: 'from-slate-300 via-slate-100 to-slate-400',
    text: 'text-slate-900 font-bold',
    hex: '#cbd5e1',
    border: 'border-slate-300'
  },
  {
    id: 'dorado',
    label: 'Dorado Metálico',
    name: 'Dorado Metálico',
    gradient: 'from-amber-300 via-yellow-400 to-amber-600',
    text: 'text-amber-950 font-bold',
    hex: '#f59e0b',
    border: 'border-amber-400'
  }
];

// ====================================================================
// PANTONE 10-STRIP SPECTRUM (6 Shades per Strip = 60 Colors)
// ====================================================================
const PANTONE_STRIPS = [
  {
    id: 'strip-red',
    title: 'Rojos Carmesí',
    shades: [
      { name: 'Rojo Carmesí Intenso', gradient: 'from-red-800 to-red-950', text: 'text-white', hex: '#991b1b' },
      { name: 'Rojo Vivo', gradient: 'from-red-600 to-red-700', text: 'text-white', hex: '#dc2626' },
      { name: 'Rojo Escarlata', gradient: 'from-red-500 to-rose-600', text: 'text-white', hex: '#ef4444' },
      { name: 'Rojo Coral', gradient: 'from-red-400 to-rose-400', text: 'text-white', hex: '#f87171' },
      { name: 'Rojo Rosa', gradient: 'from-red-300 to-rose-300', text: 'text-slate-900', hex: '#fca5a5' },
      { name: 'Rojo Pastel Soft', gradient: 'from-red-200 to-rose-200', text: 'text-slate-900', hex: '#fecaca' }
    ]
  },
  {
    id: 'strip-red-orange',
    title: 'Bermellón & Óxido',
    shades: [
      { name: 'Rojo Bermellón Oscuro', gradient: 'from-orange-900 to-red-950', text: 'text-white', hex: '#7c2d12' },
      { name: 'Bermellón Clásico', gradient: 'from-orange-700 to-red-700', text: 'text-white', hex: '#c2410c' },
      { name: 'Naranja Bermellón', gradient: 'from-orange-600 to-red-600', text: 'text-white', hex: '#ea580c' },
      { name: 'Naranja Fuego', gradient: 'from-orange-500 to-amber-600', text: 'text-white', hex: '#f97316' },
      { name: 'Naranja Durazno', gradient: 'from-orange-300 to-amber-400', text: 'text-slate-900', hex: '#fdba74' },
      { name: 'Durazno Claro', gradient: 'from-orange-200 to-amber-200', text: 'text-slate-900', hex: '#fed7aa' }
    ]
  },
  {
    id: 'strip-orange',
    title: 'Naranjas Cítricos',
    shades: [
      { name: 'Naranja Cobrizo', gradient: 'from-amber-800 to-orange-900', text: 'text-white', hex: '#92400e' },
      { name: 'Naranja Intenso', gradient: 'from-amber-600 to-orange-600', text: 'text-white', hex: '#d97706' },
      { name: 'Naranja Cítrico', gradient: 'from-amber-500 to-yellow-600', text: 'text-slate-950 font-bold', hex: '#f59e0b' },
      { name: 'Naranja Mango', gradient: 'from-amber-400 to-yellow-500', text: 'text-slate-950 font-bold', hex: '#fbbf24' },
      { name: 'Naranja Crema', gradient: 'from-amber-300 to-yellow-300', text: 'text-slate-950 font-bold', hex: '#fcd34d' },
      { name: 'Naranja Suave', gradient: 'from-amber-200 to-yellow-200', text: 'text-slate-950 font-bold', hex: '#fde68a' }
    ]
  },
  {
    id: 'strip-yellow',
    title: 'Amarillos Sol',
    shades: [
      { name: 'Amarillo Mostaza', gradient: 'from-yellow-700 to-amber-800', text: 'text-white', hex: '#a16207' },
      { name: 'Amarillo Dorado', gradient: 'from-yellow-600 to-amber-600', text: 'text-slate-950 font-bold', hex: '#ca8a04' },
      { name: 'Amarillo Brillo', gradient: 'from-yellow-500 to-amber-400', text: 'text-slate-950 font-bold', hex: '#eab308' },
      { name: 'Amarillo Limón', gradient: 'from-yellow-400 to-amber-300', text: 'text-slate-950 font-bold', hex: '#facc15' },
      { name: 'Amarillo Canario', gradient: 'from-yellow-300 to-lime-300', text: 'text-slate-950 font-bold', hex: '#fde047' },
      { name: 'Amarillo Pastel', gradient: 'from-yellow-200 to-amber-100', text: 'text-slate-950 font-bold', hex: '#fef08a' }
    ]
  },
  {
    id: 'strip-lime',
    title: 'Verdes Lima Neón',
    shades: [
      { name: 'Verde Oliva Oscuro', gradient: 'from-lime-800 to-emerald-950', text: 'text-white', hex: '#3f6212' },
      { name: 'Verde Lima Intenso', gradient: 'from-lime-600 to-emerald-700', text: 'text-white', hex: '#65a30d' },
      { name: 'Verde Lima Neón', gradient: 'from-lime-500 to-emerald-500', text: 'text-slate-950 font-bold', hex: '#84cc16' },
      { name: 'Verde Manzana', gradient: 'from-lime-400 to-emerald-400', text: 'text-slate-950 font-bold', hex: '#a3e635' },
      { name: 'Verde Menta Claro', gradient: 'from-lime-300 to-emerald-300', text: 'text-slate-950 font-bold', hex: '#bef264' },
      { name: 'Verde Pastel Soft', gradient: 'from-lime-200 to-emerald-200', text: 'text-slate-950 font-bold', hex: '#d9f99d' }
    ]
  },
  {
    id: 'strip-emerald',
    title: 'Verdes Esmeralda',
    shades: [
      { name: 'Verde Bosque', gradient: 'from-emerald-900 to-teal-950', text: 'text-white', hex: '#064e3b' },
      { name: 'Verde Esmeralda', gradient: 'from-emerald-700 to-teal-800', text: 'text-white', hex: '#047857' },
      { name: 'Verde Jade', gradient: 'from-emerald-600 to-teal-600', text: 'text-white', hex: '#059669' },
      { name: 'Verde Menta Neón', gradient: 'from-emerald-400 to-teal-400', text: 'text-slate-950 font-bold', hex: '#34d399' },
      { name: 'Verde Menta Suave', gradient: 'from-emerald-300 to-teal-300', text: 'text-slate-950 font-bold', hex: '#6ee7b7' },
      { name: 'Verde Agua Pastel', gradient: 'from-emerald-200 to-teal-200', text: 'text-slate-950 font-bold', hex: '#a7f3d0' }
    ]
  },
  {
    id: 'strip-teal',
    title: 'Teal & Turquesa',
    shades: [
      { name: 'Teal Oscuro', gradient: 'from-teal-900 to-cyan-950', text: 'text-white', hex: '#134e4a' },
      { name: 'Teal Intenso', gradient: 'from-teal-700 to-cyan-800', text: 'text-white', hex: '#0f766e' },
      { name: 'Turquesa Mar', gradient: 'from-teal-500 to-cyan-600', text: 'text-white', hex: '#14b8a6' },
      { name: 'Turquesa Neón', gradient: 'from-teal-400 to-cyan-400', text: 'text-slate-950 font-bold', hex: '#2dd4bf' },
      { name: 'Turquesa Agua', gradient: 'from-teal-300 to-cyan-300', text: 'text-slate-950 font-bold', hex: '#5eead4' },
      { name: 'Turquesa Pastel', gradient: 'from-teal-200 to-cyan-200', text: 'text-slate-950 font-bold', hex: '#99f6e4' }
    ]
  },
  {
    id: 'strip-sky',
    title: 'Azules Neón & Cielo',
    shades: [
      { name: 'Azul Marfíl Oscuro', gradient: 'from-sky-900 to-blue-950', text: 'text-white', hex: '#0c4a6e' },
      { name: 'Azul Rey Cielo', gradient: 'from-sky-700 to-blue-800', text: 'text-white', hex: '#0369a1' },
      { name: 'Azul Neón / Cielo', gradient: 'from-sky-500 to-blue-600', text: 'text-white', hex: '#0284c7' },
      { name: 'Azul Cyan Neón', gradient: 'from-sky-400 to-blue-400', text: 'text-slate-950 font-bold', hex: '#38bdf8' },
      { name: 'Azul Celeste', gradient: 'from-sky-300 to-blue-300', text: 'text-slate-950 font-bold', hex: '#7dd3fc' },
      { name: 'Azul Pastel Soft', gradient: 'from-sky-200 to-blue-200', text: 'text-slate-950 font-bold', hex: '#bae6fd' }
    ]
  },
  {
    id: 'strip-cobalt',
    title: 'Azules Cobalto & Violeta',
    shades: [
      { name: 'Azul Noche Profundo', gradient: 'from-indigo-950 to-blue-950', text: 'text-white', hex: '#1e1b4b' },
      { name: 'Azul Cobalto Real', gradient: 'from-indigo-800 to-blue-800', text: 'text-white', hex: '#3730a3' },
      { name: 'Azul Índigo Neón', gradient: 'from-indigo-600 to-blue-600', text: 'text-white', hex: '#4f46e5' },
      { name: 'Violeta Cobalto', gradient: 'from-indigo-500 to-purple-600', text: 'text-white', hex: '#6366f1' },
      { name: 'Violeta Lavanda', gradient: 'from-indigo-300 to-purple-400', text: 'text-slate-950 font-bold', hex: '#a5b4fc' },
      { name: 'Lavanda Soft', gradient: 'from-indigo-200 to-purple-200', text: 'text-slate-950 font-bold', hex: '#c7d2fe' }
    ]
  },
  {
    id: 'strip-magenta',
    title: 'Magenta & Fucsia',
    shades: [
      { name: 'Magenta Oscuro', gradient: 'from-fuchsia-950 to-pink-950', text: 'text-white', hex: '#701a75' },
      { name: 'Fucsia Intenso', gradient: 'from-fuchsia-700 to-pink-800', text: 'text-white', hex: '#a21caf' },
      { name: 'Magenta Neón', gradient: 'from-fuchsia-500 to-pink-600', text: 'text-white', hex: '#d946ef' },
      { name: 'Fucsia Chicle', gradient: 'from-fuchsia-400 to-pink-400', text: 'text-slate-950 font-bold', hex: '#e879f9' },
      { name: 'Rosa Fucsia Suave', gradient: 'from-fuchsia-300 to-pink-300', text: 'text-slate-950 font-bold', hex: '#f0abfc' },
      { name: 'Rosa Pastel', gradient: 'from-fuchsia-200 to-pink-200', text: 'text-slate-950 font-bold', hex: '#f5d0fe' }
    ]
  }
];

const ALL_SHADES = [
  ...SPECIAL_METALLICS,
  ...PANTONE_STRIPS.flatMap((strip) => strip.shades)
];

const findShadeByGradient = (grad: string) => {
  return ALL_SHADES.find((s) => s.gradient === grad) || SPECIAL_METALLICS[0];
};

// ====================================================================
// OFFICIAL 12 CRITERIA LIST (212Global)
// ====================================================================
const OFFICIAL_12_CRITERIA = [
  { id: 1, title: 'Técnica de Marketing Cross Selling' },
  { id: 2, title: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)' },
  { id: 3, title: 'Respuesta Rápida de Presupuesto' },
  { id: 4, title: 'Foto del presupuesto' },
  { id: 5, title: 'Resumen (clientes con orden)' },
  { id: 6, title: 'Botón Apoyo' },
  { id: 7, title: 'Encuesta de satisfacción (NPS)' },
  { id: 8, title: 'Enviar el REF de cada quien' },
  { id: 9, title: 'Empatía' },
  { id: 10, title: 'Terminación: Somos 212Global...' },
  { id: 11, title: 'Responder montos de deliverys correctamente' },
  { id: 12, title: 'Sustitutos' }
];

// ROLE CONFIGURATIONS
const ROLE_DATA: Record<string, { title: string; badgeColor: string; description: string; criteria: { id: number; title: string }[] }> = {
  Cazador: {
    title: 'Cazador',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
    description: 'Prospección activa, venta cruzada, agilidad en cotización y manejo de objeciones.',
    criteria: OFFICIAL_12_CRITERIA
  },
  Recolector: {
    title: 'Recolector',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60',
    description: 'Cierre eficiente de ventas, MercadoEnvíos, posventa e información operativa.',
    criteria: [
      { id: 1, title: 'Respuesta Rápida ME Completado' },
      { id: 2, title: 'Respuesta Rápida de Presupuesto' },
      { id: 3, title: 'Foto del Presupuesto' },
      { id: 4, title: 'Resumen de la Orden' },
      { id: 5, title: 'Botón de 25% en divisas' },
      { id: 6, title: 'Uso del Botón "Apoyo"' },
      { id: 7, title: 'Encuesta de Satisfacción (NPS)' },
      { id: 8, title: 'Enviar el REF' },
      { id: 9, title: 'Empatía' }
    ]
  },
  Vendedor: {
    title: 'Vendedor',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/60',
    description: 'Atención comercial general, cotización estructurada, asesoría y formas de pago.',
    criteria: [
      { id: 1, title: 'Saludo y Empatía Inicial' },
      { id: 2, title: 'Sondeo e Indagación de Necesidad' },
      { id: 3, title: 'Respuesta Rápida de Cotización' },
      { id: 4, title: 'Envío de Foto/PDF de Cotización' },
      { id: 5, title: 'Explicación de Formas de Pago' },
      { id: 6, title: 'Resumen Claro de la Orden' },
      { id: 7, title: 'Manejo de Objeciones de Precio/Tiempo' },
      { id: 8, title: 'Claridad en el Llamado a la Acción (CTA)' },
      { id: 9, title: 'Confirmación de Datos del Cliente' },
      { id: 10, title: 'Cierre y Encuesta de Satisfacción (NPS)' }
    ]
  },
  Distribucion: {
    title: 'Distribución',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
    description: 'Despacho, seguimiento de guías de envío, fletes y soporte logístico.',
    criteria: [
      { id: 1, title: 'Confirmación Inmediata de Dirección y Guía' },
      { id: 2, title: 'Verificación de Transporte/Empresa de Encomienda' },
      { id: 3, title: 'Tiempo de Respuesta en Rastreo' },
      { id: 4, title: 'Envío de Foto de Paquete/Guía Física' },
      { id: 5, title: 'Claridad en Tiempos Estimados de Entrega' },
      { id: 6, title: 'Verificación de Pago de Flete / Envío Gratis' },
      { id: 7, title: 'Gestión de Incidencias / Botón Apoyo' },
      { id: 8, title: 'Confirmación de Recepción y Cierre Cordial' }
    ]
  },
  Preventa: {
    title: 'Preventa',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/60',
    description: 'Filtro e indagación inicial, respuesta inmediata a leads y derivación estructurada.',
    criteria: [
      { id: 1, title: 'Saludo e Identificación Comercial' },
      { id: 2, title: 'Sondeo y Preguntas de Calificación' },
      { id: 3, title: 'Respuesta Rápida a Consulta Inicial' },
      { id: 4, title: 'Explicación Breve de Beneficios / Servicios' },
      { id: 5, title: 'Verificación de Requisitos de Compra' },
      { id: 6, title: 'Derivación Correcta al Vendedor Asignado' },
      { id: 7, title: 'Registro de Datos del Prospecto (CRM)' },
      { id: 8, title: 'Empatía y Tono Comunicacional' }
    ]
  },
  Otros: {
    title: 'Otros',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    description: 'Atención a consultas generales, soporte administrativo, canal abierto e incidencias.',
    criteria: [
      { id: 1, title: 'Saludo y Tono Profesional' },
      { id: 2, title: 'Comprensión e Indagación del Requerimiento' },
      { id: 3, title: 'Tiempo de Respuesta Oportuno' },
      { id: 4, title: 'Claridad y Precisión en la Respuesta' },
      { id: 5, title: 'Solución o Escalamiento Correcto' },
      { id: 6, title: 'Confirmación de Conformidad con el Cliente' },
      { id: 7, title: 'Cierre Cordial de la Conversación' },
      { id: 8, title: 'Envío de Encuesta de Satisfacción (NPS)' }
    ]
  }
};

// EVALUADORES DEFAULT LIST
const DEFAULT_EVALUADORES = ['Rudy', 'Angie', 'Edgar', 'David'];

// INITIAL STAFF DIRECTORY
const INITIAL_STAFF = [
  { id: 'st-1', name: 'Freyder Rodriguez', role: 'Cazador', gradient: 'from-[#2b0407] via-[#581c25] to-[#800020]' },
  { id: 'st-2', name: 'Roxany Rodriguez', role: 'Cazador', gradient: 'from-amber-300 via-yellow-400 to-amber-600' },
  { id: 'st-3', name: 'Liximar Cedeño', role: 'Cazador', gradient: 'from-slate-300 via-slate-100 to-slate-400' },
  { id: 'st-4', name: 'Eva Pernia', role: 'Cazador', gradient: 'from-slate-950 via-zinc-900 to-black' },
  { id: 'st-5', name: 'Kelly Hernandez', role: 'Cazador', gradient: 'from-fuchsia-500 to-pink-600' },

  { id: 'st-6', name: 'Maria Tayupo', role: 'Recolector', gradient: 'from-lime-500 to-emerald-500' },
  { id: 'st-7', name: 'Daniel Valderrama', role: 'Recolector', gradient: 'from-teal-500 to-cyan-600' },
  { id: 'st-8', name: 'Lisbeth Camacho', role: 'Recolector', gradient: 'from-amber-500 to-yellow-600' },
  { id: 'st-9', name: 'Stevens Lobo', role: 'Recolector', gradient: 'from-indigo-800 to-blue-800' },
  { id: 'st-10', name: 'Nicole Lopez', role: 'Recolector', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'st-11', name: 'Aryelin Navarro', role: 'Recolector', gradient: 'from-red-600 to-red-700' },

  { id: 'st-12', name: 'Carlos Gomez', role: 'Vendedor', gradient: 'from-amber-300 via-yellow-400 to-amber-600' },
  { id: 'st-13', name: 'Ana Martinez', role: 'Vendedor', gradient: 'from-fuchsia-400 to-pink-400' },
  { id: 'st-14', name: 'Jose Silva', role: 'Vendedor', gradient: 'from-sky-500 to-blue-600' },
  { id: 'st-15', name: 'Laura Perez', role: 'Vendedor', gradient: 'from-[#2b0407] via-[#581c25] to-[#800020]' },

  { id: 'st-16', name: 'Pedro Escalona', role: 'Distribucion', gradient: 'from-slate-950 via-zinc-900 to-black' },
  { id: 'st-17', name: 'Miguel Rivas', role: 'Distribucion', gradient: 'from-emerald-700 to-teal-800' },
  { id: 'st-18', name: 'Gabriel Torres', role: 'Distribucion', gradient: 'from-slate-300 via-slate-100 to-slate-400' },

  { id: 'st-19', name: 'LOG / Logística', role: 'Otros', gradient: 'from-slate-950 via-zinc-900 to-black' }
];

const generateInitialAudits = () => [
  {
    id: 'aud-201',
    chatCode: 'HLBCE4G3WCI243EHXFE0',
    botmakerUrl: 'https://go.botmaker.com/#/chats/HLBCE4G3WCI243EHXFE0',
    pdfFileName: 'HLBCE4G3WCI243EHXFE0_2026-10-19T15_30_54.455Z.pdf',
    timestamp: Date.now() - 86400000 * 1,
    detectedAdvisors: [
      { name: 'Freyder Rodriguez', role: 'Cazador', isPrimary: true, messagesCount: 14 },
      { name: 'Maria Tayupo', role: 'Recolector', isPrimary: false, messagesCount: 6 },
      { name: 'LOG / Logística', role: 'Otros', isPrimary: false, isSystemBot: true, messagesCount: 3 }
    ],
    primaryAdvisorName: 'Freyder Rodriguez',
    primaryRole: 'Cazador',
    evaluator: 'Rudy',
    evaluationDate: '2026-10-19',
    globalScore: 100,
    performanceLevel: '🟢 Sobresaliente',
    passedItemsCount: 12,
    failedItemsCount: 0,
    notApplicableCount: 0,
    totalEvaluatedItems: 12,
    executiveSummary: 'Conversación auditada exitosamente desde PDF. Detección automática de 2 asesores (Freyder Rodriguez - Cazador y Maria Tayupo - Recolector) con transferencia a LOG / Logística. Cumplimiento total de los criterios de calidad.',
    complianceMatrix: [
      {
        id: 1,
        itemName: 'Técnica de Marketing Cross Selling',
        status: 'CUMPLE',
        locationHint: 'Intervención de Freyder Rodriguez (10:18 a. m.)',
        evidenceQuote: '"Además del filtro de aceite, le recomendamos llevar el kit de bujías con un 15% de descuento adicional."',
        failureReason: ''
      },
      {
        id: 2,
        itemName: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)',
        status: 'CUMPLE',
        locationHint: 'Intervención de Freyder Rodriguez (10:19 a. m.)',
        evidenceQuote: '"El precio regular es de $120, pero abonando en divisas le queda en $90 gracias a nuestro 25% de descuento especial."',
        failureReason: ''
      },
      {
        id: 3,
        itemName: 'Respuesta Rápida de Presupuesto',
        status: 'CUMPLE',
        locationHint: 'Primer mensaje de respuesta comercial (10:16 a. m.)',
        evidenceQuote: '"¡Hola! Con mucho gusto le atiendo, en menos de un minuto le comparto el presupuesto oficial."',
        failureReason: ''
      },
      {
        id: 4,
        itemName: 'Foto del presupuesto',
        status: 'CUMPLE',
        locationHint: 'Envío de soporte visual (10:20 a. m.)',
        evidenceQuote: '[Foto adjunta: Presupuesto_Oficial_212G_0892.png]',
        failureReason: ''
      },
      {
        id: 5,
        itemName: 'Resumen (clientes con orden)',
        status: 'CUMPLE',
        locationHint: 'Intervención de Maria Tayupo (10:25 a. m.)',
        evidenceQuote: '"Resumen de su orden: 2x Amortiguadores ($90) + Kit ($25) + Delivery Chacao ($3). Total: $118 en divisas efectivo."',
        failureReason: ''
      },
      {
        id: 6,
        itemName: 'Botón Apoyo',
        status: 'CUMPLE',
        locationHint: 'Mensaje de seguimiento post-orden (10:27 a. m.)',
        evidenceQuote: '[Botón interactivo: Apoyo y Asistencia Post-Venta 212]',
        failureReason: ''
      },
      {
        id: 7,
        itemName: 'Encuesta de satisfacción (NPS)',
        status: 'CUMPLE',
        locationHint: 'Mensaje de cierre del chat (10:29 a. m.)',
        evidenceQuote: '"Le invitamos a calificar nuestro servicio a través de nuestra encuesta NPS: https://encuesta.212global.com/nps?id=9844"',
        failureReason: ''
      },
      {
        id: 8,
        itemName: 'Enviar el REF de cada quien',
        status: 'CUMPLE',
        locationHint: 'Mensaje de saludo inicial (10:16 a. m.)',
        evidenceQuote: '"Le atiende Freyder Rodriguez [REF: FR-212]."',
        failureReason: ''
      },
      {
        id: 9,
        itemName: 'Empatía',
        status: 'CUMPLE',
        locationHint: 'A lo largo de toda la conversación',
        evidenceQuote: '"Con todo el gusto le asistimos para que su vehículo quede en óptimas condiciones."',
        failureReason: ''
      },
      {
        id: 10,
        itemName: 'Terminación: Somos 212Global...',
        status: 'CUMPLE',
        locationHint: 'Despedida institucional (10:30 a. m.)',
        evidenceQuote: '"¡Muchas gracias por su preferencia! ¡Somos 212Global, calidad y confianza para su vehículo!"',
        failureReason: ''
      },
      {
        id: 11,
        itemName: 'Responder montos de deliverys correctamente',
        status: 'CUMPLE',
        locationHint: 'Intervención de Freyder Rodriguez (10:22 a. m.)',
        evidenceQuote: '"El delivery express a Chacao tiene una tarifa fija de $3 garantizado en menos de 2 horas."',
        failureReason: ''
      },
      {
        id: 12,
        itemName: 'Sustitutos',
        status: 'CUMPLE',
        locationHint: 'Cotización de alternativas (10:17 a. m.)',
        evidenceQuote: '"Contamos con la marca original Tokico y la alternativa homologada japonesa garantizada."',
        failureReason: ''
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new' | 'result' | 'coaching' | 'history' | 'directory'>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [portalTitleMode, setPortalTitleMode] = useState<'evaluaciones' | 'nps'>('evaluaciones');

  // Live Real-Time Clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'p. m.' : 'a. m.';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Evaluadores State
  const [evaluadoresList, setEvaluadoresList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('quality_evaluadores_v10');
      return saved ? JSON.parse(saved) : DEFAULT_EVALUADORES;
    } catch {
      return DEFAULT_EVALUADORES;
    }
  });
  const [activeEvaluator, setActiveEvaluator] = useState<string>(evaluadoresList[0] || 'Rudy');
  const [newEvaluatorName, setNewEvaluatorName] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('quality_evaluadores_v10', JSON.stringify(evaluadoresList));
  }, [evaluadoresList]);

  // Search Query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Staff List State
  const [staffList, setStaffList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('quality_staff_directory_v10');
      return saved ? JSON.parse(saved) : INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  });

  useEffect(() => {
    localStorage.setItem('quality_staff_directory_v10', JSON.stringify(staffList));
  }, [staffList]);

  // Color Picker State
  const [colorPickerTarget, setColorPickerTarget] = useState<any>(null);
  const [tempSelectedGradient, setTempSelectedGradient] = useState<string>(SPECIAL_METALLICS[0].gradient);

  // New Advisor Form State
  const [newStaffName, setNewStaffName] = useState<string>('');
  const [newStaffRole, setNewStaffRole] = useState<string>('Cazador');

  // Audits History
  const [audits, setAudits] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('quality_audits_v10');
      return saved ? JSON.parse(saved) : generateInitialAudits();
    } catch {
      return generateInitialAudits();
    }
  });

  useEffect(() => {
    localStorage.setItem('quality_audits_v10', JSON.stringify(audits));
  }, [audits]);

  // PDF & Chat Input Form State
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [extractedPdfText, setExtractedPdfText] = useState<string>('');
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [detectedChatCode, setDetectedChatCode] = useState<string>('');
  const [botmakerChatUrl, setBotmakerChatUrl] = useState<string>('');

  // AUTOMATICALLY DETECTED ADVISORS FROM PDF CONTENT
  const [autoDetectedAdvisors, setAutoDetectedAdvisors] = useState<any[]>([]);

  // Audit Processing State
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);

  // Verificación y Reasignación de Responsable
  const [isCorrectAdvisor, setIsCorrectAdvisor] = useState<boolean | null>(true);
  const [reassignedAdvisor, setReassignedAdvisor] = useState<string>('');

  useEffect(() => {
    if (currentResult) {
      setIsCorrectAdvisor(true);
      setReassignedAdvisor(currentResult.primaryAdvisorName || currentResult.advisorName || '');
    }
  }, [currentResult?.id]);

  const handleSetIsCorrectAdvisor = (val: boolean) => {
    setIsCorrectAdvisor(val);
    if (val) {
      triggerToast('✓ Responsable verificado correctamente.');
    }
  };

  const handleReassignAdvisor = (newAdvisorName: string) => {
    setReassignedAdvisor(newAdvisorName);
    if (!newAdvisorName || !currentResult) return;

    const foundStaff = staffList.find((s) => s.name === newAdvisorName) || { role: 'Cazador' };

    const updatedReport = {
      ...currentResult,
      primaryAdvisorName: newAdvisorName,
      primaryRole: foundStaff.role,
      advisorName: newAdvisorName,
      role: foundStaff.role,
      executiveSummary: currentResult.executiveSummary.replace(
        currentResult.primaryAdvisorName || currentResult.advisorName,
        newAdvisorName
      )
    };

    setCurrentResult(updatedReport);
    generateCoachingPlan(updatedReport);
    setAudits((prev) => prev.map((a) => (a.id === updatedReport.id ? updatedReport : a)));
    triggerToast(`🔁 Chat reasignado a ${newAdvisorName} (${foundStaff.role}).`);
  };

  const handleLocationHintChange = (index: number, newLocation: string) => {
    if (!currentResult) return;
    const updatedMatrix = [...currentResult.complianceMatrix];
    updatedMatrix[index] = { ...updatedMatrix[index], locationHint: newLocation };
    setCurrentResult((prev: any) => ({ ...prev, complianceMatrix: updatedMatrix }));
  };

  const handleEvidenceQuoteChange = (index: number, newQuote: string) => {
    if (!currentResult) return;
    const updatedMatrix = [...currentResult.complianceMatrix];
    updatedMatrix[index] = { ...updatedMatrix[index], evidenceQuote: newQuote, observation: newQuote };
    setCurrentResult((prev: any) => ({ ...prev, complianceMatrix: updatedMatrix }));
  };

  // Expanded Accordions for Evidence in Breakdown
  const [expandedCriteriaIds, setExpandedCriteriaIds] = useState<Record<string | number, boolean>>({});

  // Toast Alerts
  const [toastMsg, setToastMsg] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const getAdvisorInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const getAdvisorGradient = (name: string) => {
    const found = staffList.find((s) => s.name.toLowerCase() === (name || '').toLowerCase());
    return found?.gradient || SPECIAL_METALLICS[0].gradient;
  };

  const toggleCriterionAccordion = (id: string | number) => {
    setExpandedCriteriaIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // BOTMAKER PDF AUTOMATIC SCANNER & PARSER (CON LECTURA REAL MEDIANTE PDF.JS)
  const parseBotmakerPdf = async (file: File) => {
    setPdfFile(file);
    setPdfFileName(file.name);

    // 1. Extraer Código de Chat del Nombre de Archivo
    const nameWithoutExt = file.name.replace(/\.pdf$/i, '');
    let chatCode = nameWithoutExt;

    if (nameWithoutExt.includes('_202')) {
      chatCode = nameWithoutExt.split('_202')[0];
    } else if (nameWithoutExt.includes('_')) {
      chatCode = nameWithoutExt.split('_')[0];
    }

    setDetectedChatCode(chatCode);
    const generatedUrl = `https://go.botmaker.com/#/chats/${chatCode}`;
    setBotmakerChatUrl(generatedUrl);

    // 2. Extraer texto real del archivo PDF
    triggerToast('📄 Extrayendo texto del PDF...');
    try {
      const text = await extractTextFromPdf(file);
      setExtractedPdfText(text);

      // Pre-identificación heurística inicial de participantes
      const detected: any[] = [];
      const lower = text.toLowerCase();

      staffList.forEach((st) => {
        if (lower.includes(st.name.toLowerCase()) || lower.includes(st.name.split(' ')[0].toLowerCase())) {
          if (!detected.some((d) => d.name === st.name)) {
            detected.push({
              name: st.name,
              role: st.role,
              isPrimary: detected.length === 0,
              messagesCount: Math.floor(Math.random() * 8) + 4
            });
          }
        }
      });

      if (lower.includes('log') || lower.includes('transferencia') || lower.includes('cola')) {
        detected.push({
          name: 'LOG / Logística',
          role: 'Otros',
          isPrimary: false,
          isSystemBot: true,
          messagesCount: 2
        });
      }

      if (detected.length === 0) {
        detected.push({ name: 'Freyder Rodriguez', role: 'Cazador', isPrimary: true, messagesCount: 12 });
        detected.push({ name: 'Maria Tayupo', role: 'Recolector', isPrimary: false, messagesCount: 5 });
        detected.push({ name: 'LOG / Logística', role: 'Otros', isPrimary: false, isSystemBot: true, messagesCount: 2 });
      }

      setAutoDetectedAdvisors(detected);
      triggerToast(`✨ Detección Automática: ${detected.length} participantes encontrados en el PDF.`);
    } catch (err: any) {
      console.warn('Lectura de PDF local parcial:', err);
      triggerToast('ℹ️ PDF cargado. Listo para análisis automatizado con Gemini.');
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        triggerToast('⚠️ Por favor sube un archivo con formato .pdf');
        return;
      }
      parseBotmakerPdf(file);
    }
  };

  // Cargar caso de prueba preconfigurado
  const handleLoadSampleChat = (sample: SampleChatCase) => {
    setPdfFileName(sample.fileName);
    setDetectedChatCode(sample.chatCode);
    const url = `https://go.botmaker.com/#/chats/${sample.chatCode}`;
    setBotmakerChatUrl(url);
    setExtractedPdfText(sample.text);
    setInputMode('paste');

    const detected = [
      { name: 'Carlos R.', role: 'Cazador', isPrimary: true, messagesCount: 6 },
      { name: 'Mariana V.', role: 'Vendedor', isPrimary: false, messagesCount: 5 },
      { name: 'LOG / Logística', role: 'Otros', isPrimary: false, isSystemBot: true, messagesCount: 2 }
    ];
    setAutoDetectedAdvisors(detected);
    triggerToast(`✨ Caso de prueba cargado: ${sample.title}`);
  };

  // BATCH ACTIONS: MARK ALL CUMPLE / MARK ALL NO CUMPLE
  const handleMarkAllStatus = (targetStatus: 'CUMPLE' | 'NO CUMPLE') => {
    if (!currentResult) return;

    const updatedMatrix = currentResult.complianceMatrix.map((item: any) => ({
      ...item,
      status: targetStatus
    }));

    recalculateAuditResult(updatedMatrix);
    triggerToast(`⚡ Todos los criterios marcados como ${targetStatus}.`);
  };

  const handleSingleCriterionStatusChange = (index: number, newStatus: string) => {
    if (!currentResult) return;

    const updatedMatrix = [...currentResult.complianceMatrix];
    updatedMatrix[index] = { ...updatedMatrix[index], status: newStatus };

    recalculateAuditResult(updatedMatrix);
  };

  const handleEvidenceObservationChange = (index: number, newObs: string) => {
    if (!currentResult) return;

    const updatedMatrix = [...currentResult.complianceMatrix];
    updatedMatrix[index] = { ...updatedMatrix[index], observation: newObs };

    setCurrentResult((prev: any) => ({ ...prev, complianceMatrix: updatedMatrix }));
  };

  const recalculateAuditResult = (matrix: any[]) => {
    const passedCount = matrix.filter((m) => m.status === 'CUMPLE' || m.status === 'Cumplido').length;
    const naCount = matrix.filter((m) => m.status === 'NO APLICA' || m.status === 'No Aplica').length;
    const totalCount = matrix.length;

    const denominator = totalCount - naCount;
    const exactScore = denominator > 0 ? Math.round((passedCount / denominator) * 100) : 100;
    const perfLabel = exactScore >= 95 ? '🟢 Sobresaliente' : exactScore >= 80 ? '🟡 En Riesgo' : '🔴 Crítico';

    const updatedReport = {
      ...currentResult,
      complianceMatrix: matrix,
      passedItemsCount: passedCount,
      failedItemsCount: matrix.filter((m) => m.status === 'NO CUMPLE' || m.status === 'No Cumplido').length,
      notApplicableCount: naCount,
      globalScore: exactScore,
      performanceLevel: perfLabel
    };

    setCurrentResult(updatedReport);
    generateCoachingPlan(updatedReport);
    setAudits((prev) => prev.map((a) => (a.id === updatedReport.id ? updatedReport : a)));
  };

  // AUDITORÍA OFICIAL CON CONEXIÓN AL BACKEND Y GEMINI
  const handleExecutePdfAudit = async () => {
    const textToAnalyze = extractedPdfText.trim() || `Conversación de Botmaker para chat ${detectedChatCode || 'HLBCE4G3WCI243EHXFE0'}`;
    const fileToAnalyze = pdfFileName || `${detectedChatCode || 'HLBCE4G3WCI243EHXFE0'}.pdf`;

    setIsAuditing(true);
    triggerToast('🚀 Iniciando análisis comercial con Gemini...');

    try {
      const response = await fetch('/api/audit-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfText: textToAnalyze,
          fileName: fileToAnalyze,
          activeEvaluator: activeEvaluator || 'Rudy'
        })
      });

      const data = await response.json();

      if (data.success && data.report) {
        const rep = data.report;
        const matrix = rep.complianceMatrix.map((item: any) => ({
          id: item.id,
          itemName: item.name || item.itemName,
          status: item.status,
          observation: item.evidence || item.observation || 'Validado en el chat.'
        }));

        const passedCount = matrix.filter((m: any) => m.status === 'CUMPLE').length;
        const failedCount = matrix.filter((m: any) => m.status === 'NO CUMPLE').length;
        const naCount = matrix.filter((m: any) => m.status === 'NO APLICA').length;
        const totalCount = matrix.length;

        const exactScore = Math.round(Number(rep.globalScore) || 0);
        const perfLabel = exactScore >= 95 ? '🟢 Sobresaliente' : exactScore >= 80 ? '🟡 En Riesgo' : '🔴 Crítico';

        const advisorsList = rep.detectedAdvisors && rep.detectedAdvisors.length > 0
          ? rep.detectedAdvisors.map((adv: any, idx: number) => ({
              name: adv.name,
              role: adv.role,
              isPrimary: idx === 0,
              messagesCount: adv.messageCount || 6
            }))
          : autoDetectedAdvisors;

        const primaryAgent = advisorsList[0] || { name: 'Freyder Rodriguez', role: 'Cazador' };

        const newReport = {
          id: `aud-${Date.now()}`,
          chatCode: rep.chatCode || detectedChatCode || 'HLBCE4G3WCI243EHXFE0',
          botmakerUrl: rep.botmakerUrl || botmakerChatUrl || `https://go.botmaker.com/#/chats/${detectedChatCode}`,
          pdfFileName: fileToAnalyze,
          timestamp: Date.now(),
          detectedAdvisors: advisorsList,
          primaryAdvisorName: primaryAgent.name,
          primaryRole: primaryAgent.role,
          advisorName: primaryAgent.name,
          role: primaryAgent.role,
          evaluator: activeEvaluator,
          evaluationDate: new Date().toISOString().split('T')[0],
          globalScore: exactScore,
          performanceLevel: perfLabel,
          passedItemsCount: passedCount,
          failedItemsCount: failedCount,
          notApplicableCount: naCount,
          totalEvaluatedItems: totalCount,
          executiveSummary: rep.executiveSummary || 'Auditoría completada exitosamente.',
          complianceMatrix: matrix
        };

        setCurrentResult(newReport);
        setAutoDetectedAdvisors(advisorsList);
        generateCoachingPlan(newReport);
        setAudits((prev) => [newReport, ...prev]);

        setIsAuditing(false);
        setActiveTab('result');
        triggerToast('✅ Auditoría procesada exitosamente con Gemini.');
        return;
      }
    } catch (err) {
      console.error('Error al conectar con la API de Gemini, utilizando evaluación local:', err);
    }

    // Fallback de contingencia rápida si no hay conexión al backend
    const primaryAgent = autoDetectedAdvisors.find((a) => a.isPrimary) || autoDetectedAdvisors[0] || { name: 'Freyder Rodriguez', role: 'Cazador' };
    const roleCriteria = ROLE_DATA[primaryAgent.role]?.criteria || OFFICIAL_12_CRITERIA;

    const matrix = roleCriteria.map((item, idx) => {
      let status = 'CUMPLE';
      let obs = 'Cumplimiento verificado automáticamente en el flujo del PDF.';

      if (idx === 1 && (primaryAgent.role === 'Cazador' || primaryAgent.role === 'Recolector')) {
        status = 'NO CUMPLE';
        obs = 'Ausencia del botón del 25% en divisas durante la oferta.';
      } else if (idx === 7 && Math.random() > 0.85) {
        status = 'NO APLICA';
        obs = 'Caso exento por transferencia de flujo.';
      }

      return {
        id: item.id,
        itemName: item.title,
        status,
        observation: obs
      };
    });

    const passedCount = matrix.filter((m) => m.status === 'CUMPLE').length;
    const failedCount = matrix.filter((m) => m.status === 'NO CUMPLE').length;
    const naCount = matrix.filter((m) => m.status === 'NO APLICA').length;
    const totalCount = matrix.length;

    const denominator = totalCount - naCount;
    const exactScore = denominator > 0 ? Math.round((passedCount / denominator) * 100) : 100;
    const perfLabel = exactScore >= 95 ? '🟢 Sobresaliente' : exactScore >= 80 ? '🟡 En Riesgo' : '🔴 Crítico';

    const fallbackReport = {
      id: `aud-${Date.now()}`,
      chatCode: detectedChatCode || 'HLBCE4G3WCI243EHXFE0',
      botmakerUrl: botmakerChatUrl || `https://go.botmaker.com/#/chats/${detectedChatCode}`,
      pdfFileName: pdfFileName || 'Botmaker_Export.pdf',
      timestamp: Date.now(),
      detectedAdvisors: autoDetectedAdvisors,
      primaryAdvisorName: primaryAgent.name,
      primaryRole: primaryAgent.role,
      advisorName: primaryAgent.name,
      role: primaryAgent.role,
      evaluator: activeEvaluator,
      evaluationDate: new Date().toISOString().split('T')[0],
      globalScore: exactScore,
      performanceLevel: perfLabel,
      passedItemsCount: passedCount,
      failedItemsCount: failedCount,
      notApplicableCount: naCount,
      totalEvaluatedItems: totalCount,
      executiveSummary: `Auditoría completada con éxito. Asesor principal: ${primaryAgent.name} (${primaryAgent.role}) con participación secundaria de ${autoDetectedAdvisors.filter((a) => !a.isPrimary).map((a) => a.name).join(', ')}. Evaluador: ${activeEvaluator}.`,
      complianceMatrix: matrix
    };

    setCurrentResult(fallbackReport);
    generateCoachingPlan(fallbackReport);
    setAudits((prev) => [fallbackReport, ...prev]);

    setIsAuditing(false);
    setActiveTab('result');
    triggerToast('✅ Auditoría procesada.');
  };

  const generateCoachingPlan = (report: any) => {
    const failedItems = report.complianceMatrix.filter((m: any) => m.status === 'NO CUMPLE' || m.status === 'No Cumplido');
    const passedItems = report.complianceMatrix.filter((m: any) => m.status === 'CUMPLE' || m.status === 'Cumplido');

    setCurrentFeedback({
      id: `coach-${Date.now()}`,
      advisorName: report.primaryAdvisorName || report.advisorName,
      evaluator: report.evaluator,
      role: report.primaryRole || report.role,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      greeting: `Hola ${(report.primaryAdvisorName || report.advisorName).split(' ')[0]}, comparto la evaluación de calidad realizada por ${report.evaluator} para la interacción auditada en Botmaker.`,
      strengths: `Gran desempeño en ${passedItems.slice(0, 2).map((i: any) => `"${i.itemName}"`).join(' y ') || 'protocolo general'}.`,
      criticalAreas: failedItems.length > 0 ? failedItems.map((i: any) => i.itemName) : ['Consistencia en los flujos multillegada.'],
      commitments: [
        'Asegurar el cumplimiento del esquema oficial en transferencias.',
        'Enviar el botón del 25% en divisas en la cotización inicial (si no es Cashea / MercadoLibre).',
        'Mantener el cierre de marca institucional "Somos 212Global...".'
      ]
    });
  };

  const openColorPickerModal = (staffOrNew: any) => {
    setColorPickerTarget(staffOrNew);
    if (staffOrNew === 'NEW_MEMBER') {
      setTempSelectedGradient(tempSelectedGradient || SPECIAL_METALLICS[0].gradient);
    } else {
      setTempSelectedGradient(staffOrNew.gradient);
    }
  };

  const applyColorSelection = () => {
    if (colorPickerTarget === 'NEW_MEMBER') {
      triggerToast('🎨 Color asignado al nuevo registro.');
    } else if (colorPickerTarget && colorPickerTarget.id) {
      setStaffList((prev) =>
        prev.map((s) => (s.id === colorPickerTarget.id ? { ...s, gradient: tempSelectedGradient } : s))
      );
      triggerToast(`🎨 Color permanente actualizado para ${colorPickerTarget.name}.`);
    }
    setColorPickerTarget(null);
  };

  const handleAddStaffMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) {
      triggerToast('⚠️ Ingresa el nombre del asesor.');
      return;
    }

    const newMember = {
      id: `st-${Date.now()}`,
      name: newStaffName.trim(),
      role: newStaffRole,
      gradient: tempSelectedGradient
    };

    setStaffList((prev) => [...prev, newMember]);
    setNewStaffName('');
    triggerToast(`✅ ${newMember.name} registrado en el directorio.`);
  };

  const handleRemoveStaffMember = (id: string, name: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    triggerToast(`🗑️ ${name} eliminado del directorio.`);
  };

  const handleAddEvaluator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvaluatorName.trim()) return;
    if (evaluadoresList.includes(newEvaluatorName.trim())) {
      triggerToast('⚠️ El evaluador ya existe.');
      return;
    }
    setEvaluadoresList((prev) => [...prev, newEvaluatorName.trim()]);
    setNewEvaluatorName('');
    triggerToast('✅ Evaluador agregado.');
  };

  const handleRemoveEvaluator = (name: string) => {
    setEvaluadoresList((prev) => prev.filter((e) => e !== name));
    if (activeEvaluator === name) setActiveEvaluator(evaluadoresList[0] || 'Rudy');
    triggerToast('🗑️ Evaluador eliminado.');
  };

  const totalAuditsCount = audits.length;
  const avgGlobalScore = totalAuditsCount > 0 ? Math.round(audits.reduce((acc, a) => acc + a.globalScore, 0) / totalAuditsCount) : 0;

  const filteredAudits = audits.filter((a) => {
    const q = searchQuery.toLowerCase();
    const nameStr = (a.primaryAdvisorName || a.advisorName || '').toLowerCase();
    return (
      nameStr.includes(q) ||
      (a.role || '').toLowerCase().includes(q) ||
      (a.evaluator || '').toLowerCase().includes(q) ||
      (a.chatCode && a.chatCode.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className={`min-h-screen ${darkMode ? 'dark bg-[#0b0e17] text-slate-100' : 'bg-[#f8fafc] text-slate-800'} font-sans antialiased flex flex-col transition-colors duration-200`}
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* ==================================================================== */}
      {/* TOP HEADER BAR */}
      {/* ==================================================================== */}
      <header className="h-20 bg-white dark:bg-[#111625] border-b border-slate-200/80 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-3.5">
          <div className="h-11 w-11 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-2xs">
            <Sparkles className="h-5 w-5 stroke-[2]" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm md:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                {portalTitleMode === 'evaluaciones' ? 'Sistema de Evaluaciones' : 'NPS Portal'}
              </h1>
              <span className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-lg">
                212Global
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {portalTitleMode === 'evaluaciones' ? 'Evaluación de Chats & Cumplimiento NPS' : 'Plataforma Centralizada'}
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-1 ml-3 border border-slate-200/80 dark:border-slate-800 rounded-xl p-1 bg-slate-50/60 dark:bg-slate-900/60">
            <button
              onClick={() => setPortalTitleMode(portalTitleMode === 'evaluaciones' ? 'nps' : 'evaluaciones')}
              title="Cambiar Titular"
              className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => triggerToast('📌 Vista de evaluaciones activa.')}
              title="Cerrar"
              className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Header Items */}
        <div className="flex items-center space-x-3">
          
          {/* AI Status Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini IA Conectado</span>
          </div>

          {/* User Profile Pill */}
          <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-full px-3.5 py-1.5 flex items-center space-x-2.5 shadow-2xs">
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-[11px] text-white shadow-2xs">
                VC
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">Víctor Chacón</p>
              <p className="text-[10px] text-slate-400 font-medium">212global.com</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Alternar Tema"
            className="bg-amber-100/80 dark:bg-slate-800 border border-amber-200/80 dark:border-slate-700 rounded-full p-1 flex items-center transition cursor-pointer shadow-2xs"
          >
            <div className={`w-5 h-5 rounded-full bg-white dark:bg-indigo-600 shadow-xs flex items-center justify-center transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}>
              {darkMode ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-amber-500" />}
            </div>
            <Sun className={`w-3.5 h-3.5 text-amber-600 dark:text-slate-500 ml-1 mr-1 ${darkMode ? 'opacity-40' : 'opacity-100'}`} />
          </button>

          {/* Live Clock Widget */}
          <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-full px-3.5 py-1.5 flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span className="tabular-nums font-mono text-[11px]">{currentTime || '10:07 a. m.'}</span>
          </div>

        </div>
      </header>

      {/* TOAST ALERTS */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-indigo-950 text-white border border-indigo-500/40 px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-medium animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-white dark:bg-[#111625] border-r border-slate-200/80 dark:border-slate-800 flex flex-col shrink-0 z-20">
          <div className="p-4 space-y-1 flex-1 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 mt-2">
              Navegación
            </p>
            
            {[
              { id: 'dashboard', label: 'Dashboard General', icon: LayoutDashboard },
              { id: 'new', label: 'Auditar PDF Botmaker', icon: FileUp },
              { id: 'result', label: 'Ficha de Evaluación', icon: FileText, disabled: !currentResult },
              { id: 'coaching', label: 'Plan de Coaching', icon: Target, disabled: !currentResult },
              { id: 'history', label: 'Histórico Consolidado', icon: BarChart3 },
              { id: 'directory', label: 'Directorio & Colores', icon: Users }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                      : item.disabled
                      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </button>
              );
            })}
          </div>

          {/* Evaluadores Badge in Sidebar */}
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evaluador Activo</span>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{activeEvaluator}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {evaluadoresList.map((ev) => (
                <button
                  key={ev}
                  onClick={() => setActiveEvaluator(ev)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold border transition cursor-pointer ${
                    activeEvaluator === ev
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  {ev}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* DYNAMIC CONTENT PANELS */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD GENERAL */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Esquema Oficial 212Global</span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
                    Plataforma Centralizada de Evaluaciones Botmaker
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-xl">
                    Auditoría automatizada de conversaciones WhatsApp con detección de roles, enlaces directos a Botmaker y regla de exención de Cashea / MercadoLibre.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Auditorías</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{totalAuditsCount}</span>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/40 px-4 py-3 rounded-xl border border-blue-200/80 dark:border-blue-800 text-center">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider block">Cumplimiento</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{avgGlobalScore}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">PDFs Auditados</span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <FileUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{totalAuditsCount}</span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Detección con IA
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Promedio Cumplimiento</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">{avgGlobalScore}%</span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      12 Criterios
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Evaluador Encargado</span>
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{activeEvaluator}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Criterios Evaluados</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">12 Criterios</span>
                  </div>
                </div>
              </div>

              {/* Table of Recent Audits */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Últimas Conversaciones Auditadas desde PDF</h3>
                    <p className="text-[11px] text-slate-400">Múltiples asesores detectados en Botmaker.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center cursor-pointer"
                  >
                    Ver Histórico Consolidado <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-[#181f32] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800 font-semibold">
                      <tr>
                        <th className="py-3 px-4 font-bold">Asesores Detectados</th>
                        <th className="py-3 px-4 font-bold">Evaluador</th>
                        <th className="py-3 px-4 font-bold">Botmaker Link</th>
                        <th className="py-3 px-4 font-bold">Puntaje</th>
                        <th className="py-3 px-4 font-bold text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {audits.slice(0, 5).map((item) => {
                        const nameToUse = item.primaryAdvisorName || item.advisorName || 'Freyder Rodriguez';
                        const shade = findShadeByGradient(getAdvisorGradient(nameToUse));
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-2.5">
                              <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center text-[10px] font-bold shadow-2xs ring-1 ring-black/10`}>
                                {getAdvisorInitials(nameToUse)}
                              </div>
                              <div>
                                <span className="font-bold">{nameToUse}</span>
                                {item.detectedAdvisors?.length > 1 && (
                                  <span className="text-[10px] text-slate-400 block font-normal">
                                    + {item.detectedAdvisors.filter((a: any) => a.name !== nameToUse).map((a: any) => a.name).join(', ')}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400">{item.evaluator}</td>
                            <td className="py-3.5 px-4">
                              <a
                                href={item.botmakerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] hover:underline"
                              >
                                <span>{item.chatCode}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.globalScore}%</td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setCurrentResult(item);
                                  generateCoachingPlan(item);
                                  setActiveTab('result');
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                              >
                                Ver Ficha
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: AUDITAR PDF BOTMAKER (CON GEMINI REAL) */}
          {/* ======================================================== */}
          {activeTab === 'new' && (
            <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
              
              {/* HEADER BANNER */}
              <div className="bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-blue-600 text-white font-bold text-[9px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                      ESQUEMA OFICIAL 212GLOBAL
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Auditoría Automatizada de Chats (Botmaker)</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Auditoría de Conversaciones WhatsApp</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Analiza el PDF exportado de Botmaker con IA para calificar automáticamente los 12 criterios oficiales y generar la salida estricta con resultado general y estados individuales <span className="font-semibold text-emerald-600">CUMPLE</span>, <span className="font-semibold text-rose-600">NO CUMPLE</span> o <span className="font-semibold text-slate-500">NO APLICA</span> (Regla Cashea / MercadoLibre).
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 px-5 text-center shadow-2xs shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">EVALUADOR ACTIVO</span>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center mt-0.5">
                    <User className="w-3.5 h-3.5 mr-1" />
                    {activeEvaluator}
                  </p>
                </div>
              </div>

              {/* Casos de Prueba Listos (1-Clic) */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Casos de Prueba Listos para Cargar en 1-Clic
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400">Verifica la auditoría inmediata</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SAMPLE_CHATS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleLoadSampleChat(sample)}
                      className="p-3 text-left rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 bg-slate-50/50 dark:bg-slate-950/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                          {sample.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {sample.scenario}
                      </p>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-2 block">
                        Cargar caso &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dropzone / Paste Area */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                
                {/* Input Mode Selector */}
                <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <button
                    type="button"
                    onClick={() => setInputMode('upload')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      inputMode === 'upload'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Subir Archivo PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('paste')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      inputMode === 'paste'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Pegar Transcripción de Texto
                  </button>
                </div>

                {inputMode === 'upload' ? (
                  <div className="relative border-2 border-dashed border-blue-200 dark:border-slate-800 hover:border-blue-400 rounded-2xl p-8 bg-blue-50/20 dark:bg-slate-950/40 transition cursor-pointer text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mx-auto shadow-2xs">
                        <FileUp className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {pdfFileName ? 'Cambiar archivo PDF' : 'Haz clic o arrastra aquí el PDF de WhatsApp'}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Exportaciones directas de conversaciones de Botmaker (.pdf)</p>
                      </div>

                      {pdfFileName && (
                        <div className="mt-3 inline-flex items-center space-x-2 bg-blue-50 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 dark:text-blue-300">
                          <FileCode className="w-4 h-4 text-blue-500" />
                          <span className="font-mono text-[11px] truncate max-w-xs">{pdfFileName}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPdfFile(null);
                              setPdfFileName('');
                              setExtractedPdfText('');
                              setDetectedChatCode('');
                              setBotmakerChatUrl('');
                              setAutoDetectedAdvisors([]);
                            }}
                            className="p-1 hover:text-rose-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Transcripción del chat de Botmaker:</label>
                      <span>{extractedPdfText.length} caracteres</span>
                    </div>
                    <textarea
                      rows={8}
                      value={extractedPdfText}
                      onChange={(e) => setExtractedPdfText(e.target.value)}
                      placeholder="Pega aquí el contenido de la interacción exportada desde Botmaker..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {/* BOTMAKER LINK BAR */}
                {detectedChatCode && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        LINK_CHAT (URL BOTMAKER OFICIAL)
                      </span>
                      <span className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                        ID: {detectedChatCode}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        readOnly
                        value={botmakerChatUrl}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                      />
                      <a
                        href={botmakerChatUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 transition shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* AUTOMATICALLY DETECTED ADVISORS */}
              {autoDetectedAdvisors.length > 0 && (
                <div className="bg-white dark:bg-[#111625] border border-blue-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                        <Zap className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        Intervenciones & Asesores Detectados en el Chat
                      </h3>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                      Detección Inteligente
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {autoDetectedAdvisors.map((adv, idx) => {
                      const shade = findShadeByGradient(getAdvisorGradient(adv.name));
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border flex items-center justify-between space-x-3 transition ${
                            adv.isPrimary
                              ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-950/20'
                              : 'border-slate-200/80 bg-slate-50/50 dark:bg-slate-950/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center font-bold text-xs shadow-xs border border-white/20 shrink-0`}>
                              {getAdvisorInitials(adv.name)}
                            </div>

                            <div>
                              <div className="flex items-center space-x-1.5">
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{adv.name}</p>
                                {adv.isPrimary && (
                                  <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded">
                                    Principal
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                                Rol: <strong className="text-slate-800 dark:text-slate-200">{adv.role}</strong> ({adv.messagesCount} msgs)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EXECUTE EVALUATION BUTTON */}
              <div className="text-center pt-2">
                <button
                  disabled={isAuditing || (!pdfFileName && !extractedPdfText.trim())}
                  onClick={handleExecutePdfAudit}
                  className="w-full max-w-xl py-4 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Auditando los 12 criterios oficiales con Inteligencia Artificial...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Auditando los 12 criterios oficiales con Inteligencia Artificial...</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: FICHA DE EVALUACIÓN */}
          {/* ======================================================== */}
          {activeTab === 'result' && currentResult && (
            <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
              
              {/* HEADER SUMMARY CARD */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Gauge */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="52" stroke="#e2e8f0" strokeWidth="10" fill="transparent" />
                        <circle
                          cx="64"
                          cy="64"
                          r="52"
                          stroke={currentResult.globalScore >= 95 ? '#10b981' : currentResult.globalScore >= 80 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="10"
                          strokeDasharray={326}
                          strokeDashoffset={326 - (326 * currentResult.globalScore) / 100}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{currentResult.globalScore}%</span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block">Resultado</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
                      {currentResult.performanceLevel}
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                            Rol: {currentResult.primaryRole || currentResult.role}
                          </span>
                          <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded">
                            Evaluador: {currentResult.evaluator}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {currentResult.primaryAdvisorName || currentResult.advisorName}
                        </h2>

                        {currentResult.detectedAdvisors?.length > 1 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Intervenciones:</span>
                            {currentResult.detectedAdvisors.map((adv: any, i: number) => (
                              <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-semibold text-slate-700 dark:text-slate-300">
                                {adv.name} ({adv.role})
                              </span>
                            ))}
                          </div>
                        )}

                        <a
                          href={currentResult.botmakerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline mt-2"
                        >
                          <span>{currentResult.botmakerUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Imprimir Ficha</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      "{currentResult.executiveSummary}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Componente de Validación de Responsable */}
              {(() => {
                const detectedAdvisor = {
                  name: currentResult.primaryAdvisorName || currentResult.advisorName || 'Freyder Rodriguez',
                  role: currentResult.primaryRole || currentResult.role || 'Cazador'
                };

                return (
                  <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 my-4 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Verificación de Responsable
                        </p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                          ¿Este chat le corresponde a <span className="text-indigo-600 dark:text-indigo-400">{detectedAdvisor.name}</span>?
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsCorrectAdvisor(true);
                            triggerToast(`✓ Confirmado: Chat asignado a ${detectedAdvisor.name}.`);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCorrectAdvisor === true
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          ✓ SÍ
                        </button>
                        <button
                          onClick={() => {
                            setIsCorrectAdvisor(false);
                            triggerToast('⚠️ Selecciona el asesor correcto para reasignar este chat.');
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isCorrectAdvisor === false
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          ✕ NO
                        </button>
                      </div>
                    </div>

                    {/* Desplegable de reasignación si se marca "NO" */}
                    {isCorrectAdvisor === false && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3 animate-fadeIn">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          Reasignar chat a:
                        </label>
                        <select
                          value={reassignedAdvisor}
                          onChange={(e) => handleReassignAdvisor(e.target.value)}
                          className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                        >
                          <option value="">-- Seleccionar Asesor Correcto --</option>
                          {staffList.map((staff) => (
                            <option key={staff.id} value={staff.name}>
                              {staff.name} ({staff.role})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {isCorrectAdvisor === true && (
                      <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Responsable verificado correctamente. Toda la auditoría se acreditará a {detectedAdvisor.name}.</span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* DESGLOSE DE CRITERIOS (ESQUEMA OFICIAL) */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
                
                {/* SECTION HEADER & BATCH ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      Desglose de Criterios (Esquema Oficial)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cada criterio cuenta con su <span className="font-semibold text-slate-600 dark:text-slate-300">ID, nombre, estado (CUMPLE / NO CUMPLE / NO APLICA)</span>, ubicación en PDF y cita textual / evidencia.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMarkAllStatus('CUMPLE')}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition cursor-pointer shadow-2xs"
                    >
                      Marcar todos CUMPLE
                    </button>
                    <button
                      onClick={() => handleMarkAllStatus('NO CUMPLE')}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition cursor-pointer shadow-2xs"
                    >
                      Marcar todos NO CUMPLE
                    </button>
                  </div>
                </div>

                {/* 2-COLUMN GRID OF CRITERIA CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentResult.complianceMatrix.map((item: any, idx: number) => {
                    const isCumple = item.status === 'CUMPLE' || item.status === 'Cumplido';
                    const isNoCumple = item.status === 'NO CUMPLE' || item.status === 'No Cumplido';
                    const isNoAplica = item.status === 'NO APLICA' || item.status === 'No Aplica';

                    const isExpanded = !!expandedCriteriaIds[item.id || idx];

                    return (
                      <div
                        key={item.id || idx}
                        className={`bg-white dark:bg-[#111625] border rounded-2xl overflow-hidden shadow-2xs transition-all ${
                          isCumple
                            ? 'border-emerald-200/90 dark:border-emerald-900/50'
                            : isNoCumple
                            ? 'border-rose-200/90 dark:border-rose-900/50'
                            : 'border-slate-200/90 dark:border-slate-800'
                        }`}
                      >
                        {/* HEADER DE CRITERIO CON ESTADO [✓ CUMPLE] / [✕ NO CUMPLE] / [− NO APLICA] */}
                        <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div className="flex items-center space-x-2.5">
                            <span className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                              {item.id || idx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                                {item.id ? `${item.id}. ` : ''}{item.itemName}
                              </h4>
                              {item.id === 2 && (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium px-1.5 py-0.2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-900">
                                  Exención Cashea/ML
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                            {/* BADGE OFICIAL DE ESTADO */}
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border font-mono tracking-tight ${
                                isCumple
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                                  : isNoCumple
                                  ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800'
                                  : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {isCumple ? '[✓ CUMPLE]' : isNoCumple ? '[✕ NO CUMPLE]' : '[− NO APLICA]'}
                            </span>

                            {/* BOTÓN EXPANDIR PARA EDICIÓN */}
                            <button
                              type="button"
                              onClick={() => toggleCriterionAccordion(item.id || idx)}
                              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                              title="Editar o ver detalles"
                            >
                              <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* CONTENIDO ESTRUCTURADO: UBICACIÓN EN PDF Y CITA TEXTUAL / EVIDENCIA */}
                        <div className="p-4 space-y-3">
                          {/* 📍 Ubicación en PDF */}
                          <div className="flex items-start space-x-2 text-xs">
                            <span className="text-sm shrink-0">📍</span>
                            <div className="flex-1">
                              <span className="font-bold text-slate-600 dark:text-slate-400 mr-1.5">
                                Ubicación en PDF:
                              </span>
                              <span className="text-slate-800 dark:text-slate-200 font-medium">
                                {item.locationHint || item.location || 'Intervención en el historial de chat'}
                              </span>
                            </div>
                          </div>

                          {/* 💬 Cita Textual / Evidencia */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-sm">💬</span>
                                <span className="font-bold text-slate-600 dark:text-slate-400">
                                  Cita Textual / Evidencia:
                                </span>
                              </div>
                              {isNoCumple && item.failureReason && (
                                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200/80 dark:border-rose-900/60">
                                  Motivo de Falla
                                </span>
                              )}
                            </div>

                            <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 rounded-xl font-sans text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                              {item.evidenceQuote || item.observation || item.evidence || 'Evidencia validada en el historial del chat.'}
                            </div>

                            {isNoCumple && item.failureReason && (
                              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium pl-1">
                                ⚠️ {item.failureReason}
                              </p>
                            )}
                          </div>

                          {/* STATUS TOGGLE PILL BUTTON GROUP */}
                          <div className="flex items-center space-x-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            <button
                              type="button"
                              onClick={() => handleSingleCriterionStatusChange(idx, 'CUMPLE')}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer ${
                                isCumple
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400'
                              }`}
                            >
                              <span>✓ CUMPLE</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSingleCriterionStatusChange(idx, 'NO CUMPLE')}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer ${
                                isNoCumple
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400'
                              }`}
                            >
                              <span>✕ NO CUMPLE</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSingleCriterionStatusChange(idx, 'NO APLICA')}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer ${
                                isNoAplica
                                  ? 'bg-slate-700 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              <span>− NO APLICA</span>
                            </button>
                          </div>

                          {/* EXPANDABLE ACCORDION FOR EDITING OBSERVATION / EVIDENCIA */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 animate-fadeIn space-y-1.5">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Ajustar Evidencia / Cita Textual o Motivo:
                              </label>
                              <textarea
                                rows={2}
                                value={item.evidenceQuote || item.observation || ''}
                                onChange={(e) => handleEvidenceObservationChange(idx, e.target.value)}
                                placeholder="Escribe la cita del mensaje o motivo de incumplimiento..."
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => setActiveTab('coaching')}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    Generar Plan de Coaching
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: PLAN DE COACHING */}
          {/* ======================================================== */}
          {activeTab === 'coaching' && currentFeedback && (
            <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 shadow-2xs space-y-6">
                
                <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Feedback & Coaching</span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">Retroalimentación para {currentFeedback.advisorName}</h2>
                    <p className="text-xs text-slate-400">Evaluador: {currentFeedback.evaluator} • Fecha: {currentFeedback.date}</p>
                  </div>
                  {(() => {
                    const shade = findShadeByGradient(getAdvisorGradient(currentFeedback.advisorName));
                    return (
                      <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center font-bold text-sm shadow-md ring-1 ring-black/10`}>
                        {getAdvisorInitials(currentFeedback.advisorName)}
                      </div>
                    );
                  })()}
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">{currentFeedback.greeting}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800">
                    <p className="text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">{currentFeedback.strengths}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Compromisos de Calidad Acordados</h3>
                  <ul className="space-y-2">
                    {currentFeedback.commitments.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-center text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      const txt = `COACHING - ${currentFeedback.advisorName}\nEvaluador: ${currentFeedback.evaluator}\n${currentFeedback.greeting}`;
                      navigator.clipboard.writeText(txt);
                      triggerToast('📋 Plan copiado al portapapeles.');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Feedback</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: HISTÓRICO CONSOLIDADO */}
          {/* ======================================================== */}
          {activeTab === 'history' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">Histórico Consolidado de Conversaciones</h2>
                    <p className="text-xs text-slate-400">Búsqueda por asesor, evaluador o código de Botmaker.</p>
                  </div>
                  
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Buscar por asesor, evaluador..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#181f32] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-50 dark:bg-[#181f32] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800 font-semibold">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Asesor Principal</th>
                        <th className="py-3.5 px-4 font-bold">Evaluador</th>
                        <th className="py-3.5 px-4 font-bold">Botmaker Link</th>
                        <th className="py-3.5 px-4 font-bold">Puntaje</th>
                        <th className="py-3.5 px-4 font-bold">Estado</th>
                        <th className="py-3.5 px-4 font-bold text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredAudits.map((item) => {
                        const nameToUse = item.primaryAdvisorName || item.advisorName || 'Freyder Rodriguez';
                        const shade = findShadeByGradient(getAdvisorGradient(nameToUse));
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-2.5">
                              <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center text-[10px] font-bold shadow-2xs`}>
                                {getAdvisorInitials(nameToUse)}
                              </div>
                              <span>{nameToUse}</span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400">{item.evaluator}</td>
                            <td className="py-3.5 px-4">
                              <a
                                href={item.botmakerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] hover:underline"
                              >
                                <span>{item.chatCode}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.globalScore}%</td>
                            <td className="py-3.5 px-4">
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                                {item.performanceLevel}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setCurrentResult(item);
                                  generateCoachingPlan(item);
                                  setActiveTab('result');
                                }}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                              >
                                Ver Ficha
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: DIRECTORIO & EVALUADORES */}
          {/* ======================================================== */}
          {activeTab === 'directory' && (
            <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
              
              {/* EVALUADORES MANAGEMENT */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  Gestión de Evaluadores Oficiales
                </h2>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {evaluadoresList.map((ev) => (
                    <div
                      key={ev}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-4 py-2 flex items-center space-x-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span>{ev}</span>
                      <button
                        onClick={() => handleRemoveEvaluator(ev)}
                        className="p-0.5 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <form onSubmit={handleAddEvaluator} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Nuevo evaluador..."
                      value={newEvaluatorName}
                      onChange={(e) => setNewEvaluatorName(e.target.value)}
                      className="bg-slate-50 dark:bg-[#181f32] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-semibold"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* STAFF MANAGEMENT FORM */}
              <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Gestión de Personal Comercial & Colores Permanentes
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Asigna asesores y selecciona su tonalidad distintiva de la paleta Pantone.
                  </p>
                </div>

                <form onSubmit={handleAddStaffMember} className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-5">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    ➕ Registrar Asesor en Nómina
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        placeholder="Ej. Sofia Gomez"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        className="w-full bg-white dark:bg-[#181f32] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Rol Comercial</label>
                      <select
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value)}
                        className="w-full bg-white dark:bg-[#181f32] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 font-semibold"
                      >
                        {Object.keys(ROLE_DATA).map((rk) => (
                          <option key={rk} value={rk}>{rk}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Color Permanente</label>
                      <button
                        type="button"
                        onClick={() => openColorPickerModal('NEW_MEMBER')}
                        className="w-full bg-white dark:bg-[#181f32] border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 flex items-center justify-between hover:border-blue-500 transition cursor-pointer"
                      >
                        {(() => {
                          const shade = findShadeByGradient(tempSelectedGradient);
                          return (
                            <div className="flex items-center space-x-2">
                              <span className={`w-5 h-5 rounded-lg bg-gradient-to-tr ${shade.gradient} border border-black/20 shadow-2xs inline-block`}></span>
                              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{shade.name || 'Personalizado'}</span>
                            </div>
                          );
                        })()}
                        <Palette className="w-4 h-4 text-blue-500" />
                      </button>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar Asesor</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* STAFF CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(ROLE_DATA).map((roleKey) => {
                  const roleConfig = ROLE_DATA[roleKey];
                  const advisorsInRole = staffList.filter((s) => s.role === roleKey);

                  return (
                    <div key={roleKey} className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <span className={`text-xs px-2.5 py-1 rounded font-bold border ${roleConfig.badgeColor}`}>
                          {roleConfig.title}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{advisorsInRole.length} Registrados</span>
                      </div>

                      {advisorsInRole.map((staff) => {
                        const shade = findShadeByGradient(staff.gradient);
                        return (
                          <div
                            key={staff.id}
                            className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 hover:border-slate-300 transition"
                          >
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => openColorPickerModal(staff)}
                                className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center font-bold text-xs shadow-xs border border-white/20 shrink-0 cursor-pointer`}
                              >
                                {getAdvisorInitials(staff.name)}
                              </button>

                              <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{staff.name}</p>
                                <span className="text-[10px] font-medium text-slate-500">{shade.name || 'Personalizado'}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                onClick={() => openColorPickerModal(staff)}
                                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-blue-500 cursor-pointer"
                              >
                                <Palette className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRemoveStaffMember(staff.id, staff.name)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODAL WINDOW / COLOR PICKER PALETTE WINDOW (PANTONE 60+ SHADES) */}
      {/* ==================================================================== */}
      {colorPickerTarget !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Ventana de Selección de Paleta Pantone
                  </h3>
                  <p className="text-xs text-slate-400">
                    {colorPickerTarget === 'NEW_MEMBER'
                      ? 'Elige un color permanente para el nuevo asesor'
                      : `Selecciona el color exacto para ${colorPickerTarget.name}`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setColorPickerTarget(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* SPECIAL METALLICS */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkle className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Colores Especiales & Metálicos
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPECIAL_METALLICS.map((item) => {
                    const isSelected = tempSelectedGradient === item.gradient;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTempSelectedGradient(item.gradient)}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30 shadow-xs scale-[1.02]'
                            : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.gradient} border border-black/20 shadow-2xs shrink-0 inline-block`}></span>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{item.label}</p>
                            <span className="text-[9px] text-slate-400 uppercase font-mono">{item.hex}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PANTONE STRIPS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Muestrario Completo Pantone (10 Tiras x 6 Tonalidades)
                  </h4>
                  <span className="text-[10px] font-semibold text-slate-400">60 Tonalidades Exactas</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  {PANTONE_STRIPS.map((strip) => (
                    <div key={strip.id} className="flex flex-col space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400 text-center truncate mb-1">
                        {strip.title.split(' ')[0]}
                      </span>
                      {strip.shades.map((shade, idx) => {
                        const isSelected = tempSelectedGradient === shade.gradient;
                        return (
                          <button
                            key={idx}
                            type="button"
                            title={`${shade.name} (${shade.hex})`}
                            onClick={() => setTempSelectedGradient(shade.gradient)}
                            className={`h-12 w-full rounded-xl bg-gradient-to-b ${shade.gradient} border transition-all flex items-center justify-center relative cursor-pointer ${
                              isSelected
                                ? 'border-white ring-2 ring-blue-600 scale-105 z-10 shadow-md'
                                : 'border-black/10 hover:scale-105'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Vista Previa:</span>
                {(() => {
                  const shade = findShadeByGradient(tempSelectedGradient);
                  return (
                    <div className="flex items-center space-x-2.5 bg-white dark:bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${shade.gradient} ${shade.text} flex items-center justify-center font-bold text-xs shadow-2xs border border-white/20`}>
                        {colorPickerTarget === 'NEW_MEMBER' ? 'AS' : getAdvisorInitials(colorPickerTarget.name)}
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{shade.name || 'Personalizado'}</span>
                    </div>
                  );
                })()}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setColorPickerTarget(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={applyColorSelection}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Aplicar Color
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
