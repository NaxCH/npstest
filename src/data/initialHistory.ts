import { AuditReport } from '../types/audit';

export const INITIAL_AUDIT_HISTORY: AuditReport[] = [
  {
    id: 'audit-hist-1',
    chatCode: 'HLBCE4G3WCI243EHXFE0',
    botmakerUrl: 'https://go.botmaker.com/#/chats/HLBCE4G3WCI243EHXFE0',
    fileName: 'HLBCE4G3WCI243EHXFE0_2026-10-19_cotizacion_amortiguadores.pdf',
    evaluatedAt: '2026-10-19T10:15:00Z',
    evaluator: 'Rudy',
    customerNameOrPhone: '+584149876543 (Cliente Corolla)',
    conversationDate: '2026-10-19',
    detectedPaymentMethod: 'Divisas Efectivo (Aplica 25% desc)',
    detectedAdvisors: [
      { name: 'Carlos R.', role: 'Cazador', messageCount: 5 },
      { name: 'Mariana V.', role: 'Vendedor', messageCount: 5 },
      { name: 'Botmaker Bot', role: 'LOG / Logística', messageCount: 2 },
    ],
    globalScore: 100,
    overallResult: 'APROBADO',
    executiveSummary: 'Excelente interacción comercial. Se cumplieron de forma impecable los 12 criterios oficiales: identificación inmediata con REF, cotización fotográfica rápida, cross-selling oportuno con bases y guardapolvos, aplicación del 25% en divisas, resumen formal de orden, botón de apoyo y cierre con NPS y lema corporativo Somos 212Global.',
    strengths: [
      'Cross-selling efectivo que incrementó el ticket promedio en $25 adicionales.',
      'Excelente empatía y fluidez en el traspaso entre Cazador y Vendedor.',
      'Cierre institucional perfecto con el lema Somos 212Global y link NPS.'
    ],
    improvementAreas: [
      'Mantener este estándar como caso de éxito para capacitación de nuevos asesores.'
    ],
    complianceMatrix: [
      { id: 1, name: 'Técnica de Marketing Cross Selling', status: 'CUMPLE', evidence: 'Ofreció bases y guardapolvos en promoción por $25 adicionales al comprar los amortiguadores.' },
      { id: 2, name: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)', status: 'CUMPLE', evidence: 'Explicó beneficio de $120 a $90 con el 25% de descuento en divisas en efectivo.' },
      { id: 3, name: 'Respuesta Rápida de Presupuesto', status: 'CUMPLE', evidence: 'Respuesta en menos de 2 minutos con cotización clara.' },
      { id: 4, name: 'Foto del presupuesto', status: 'CUMPLE', evidence: 'Envió archivo Presupuesto_Oficial_212G_0892.png adjunto.' },
      { id: 5, name: 'Resumen (clientes con orden)', status: 'CUMPLE', evidence: 'Mariana V. envió resumen desglosado con amortiguadores, kit, delivery y total de $118.' },
      { id: 6, name: 'Botón Apoyo', status: 'CUMPLE', evidence: 'Envió botón interactivo "Apoyo y Asistencia Post-Venta 212".' },
      { id: 7, name: 'Encuesta de satisfacción (NPS)', status: 'CUMPLE', evidence: 'Compartió el enlace de encuesta NPS: https://encuesta.212global.com/nps?id=9844' },
      { id: 8, name: 'Enviar el REF de cada quien', status: 'CUMPLE', evidence: 'Carlos usó REF: CR-212 y Mariana usó REF: MV-212.' },
      { id: 9, name: 'Empatía', status: 'CUMPLE', evidence: 'Tono cordial, cálido y altamente profesional en todo momento.' },
      { id: 10, name: 'Terminación: Somos 212Global...', status: 'CUMPLE', evidence: 'Cierre textual: "¡Somos 212Global, calidad y confianza para tu vehículo!"' },
      { id: 11, name: 'Responder montos de deliverys correctamente', status: 'CUMPLE', evidence: 'Cotizó exactamente $3 para Chacao con motorizado express.' },
      { id: 12, name: 'Sustitutos', status: 'CUMPLE', evidence: 'Contaba con el repuesto original Tokico solicitado de inmediato.' }
    ]
  },
  {
    id: 'audit-hist-2',
    chatCode: 'CSH88319AKL720',
    botmakerUrl: 'https://go.botmaker.com/#/chats/CSH88319AKL720',
    fileName: 'CSH88319AKL720_2026-10-18_pago_cashea_bateria.pdf',
    evaluatedAt: '2026-10-18T14:40:00Z',
    evaluator: 'Angie',
    customerNameOrPhone: '+584245551234',
    conversationDate: '2026-10-18',
    detectedPaymentMethod: 'Cashea Nivel 3 (Financiado)',
    detectedAdvisors: [
      { name: 'Edgar D.', role: 'Vendedor', messageCount: 7 },
      { name: 'Botmaker Bot', role: 'LOG / Logística', messageCount: 1 }
    ],
    globalScore: 100,
    overallResult: 'APROBADO',
    executiveSummary: 'Atención ejemplar con modalidad de pago Cashea. Se aplicó estrictamente la regla de exención comercial para el criterio de divisas (marcado como NO APLICA sin penalizar el score global). Se ofreció cross-selling con protector de bornes y escaneo de alternador.',
    strengths: [
      'Gestión ágil del financiamiento Cashea.',
      'Cumplimiento de la regla de exención del 25% en divisas.',
      'Identificación clara con REF: ED-212 y resumen detallado.'
    ],
    improvementAreas: [
      'Validar con el cliente si desea el delivery antes de asumir retiro en tienda.'
    ],
    complianceMatrix: [
      { id: 1, name: 'Técnica de Marketing Cross Selling', status: 'CUMPLE', evidence: 'Ofreció protector anticorrosivo para bornes por $3 y escaneo gratis en tienda.' },
      { id: 2, name: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)', status: 'NO APLICA', evidence: 'REGLA DE EXENCIÓN: El cliente pagó mediante Cashea nivel 3, por lo que no aplica el descuento en divisas.' },
      { id: 3, name: 'Respuesta Rápida de Presupuesto', status: 'CUMPLE', evidence: 'Respondió con desglose de cuotas en menos de 2 minutos.' },
      { id: 4, name: 'Foto del presupuesto', status: 'CUMPLE', evidence: 'Adjuntó la ficha técnica y foto oficial de la batería Duncan 24MR.' },
      { id: 5, name: 'Resumen (clientes con orden)', status: 'CUMPLE', evidence: 'Envió resumen completo con monto Cashea, cuotas y tienda de retiro.' },
      { id: 6, name: 'Botón Apoyo', status: 'CUMPLE', evidence: 'Disponibilizó el botón de soporte para garantías.' },
      { id: 7, name: 'Encuesta de satisfacción (NPS)', status: 'CUMPLE', evidence: 'Envió el enlace oficial de encuesta NPS con ID de Cashea.' },
      { id: 8, name: 'Enviar el REF de cada quien', status: 'CUMPLE', evidence: 'Se identificó con REF: ED-212.' },
      { id: 9, name: 'Empatía', status: 'CUMPLE', evidence: 'Trato respetuoso, atento y empático.' },
      { id: 10, name: 'Terminación: Somos 212Global...', status: 'CUMPLE', evidence: 'Cierre con la frase oficial ¡Somos 212Global!' },
      { id: 11, name: 'Responder montos de deliverys correctamente', status: 'CUMPLE', evidence: 'Especificó retiro sin costo y tarifa referencial de $4 para delivery en Caracas.' },
      { id: 12, name: 'Sustitutos', status: 'CUMPLE', evidence: 'Contaba con la referencia exacta requerida.' }
    ]
  },
  {
    id: 'audit-hist-3',
    chatCode: 'FAIL4492XQP104',
    botmakerUrl: 'https://go.botmaker.com/#/chats/FAIL4492XQP104',
    fileName: 'FAIL4492XQP104_2026-10-17_atencion_deficiente.pdf',
    evaluatedAt: '2026-10-17T13:30:00Z',
    evaluator: 'David',
    customerNameOrPhone: '+584160001122',
    conversationDate: '2026-10-17',
    detectedPaymentMethod: 'Pago Móvil Mercantil',
    detectedAdvisors: [
      { name: 'Pedro', role: 'Vendedor', messageCount: 4 }
    ],
    globalScore: 25,
    overallResult: 'NO CONFORME',
    executiveSummary: 'La atención presentó fallas críticas de protocolo. El asesor no utilizó el REF, tardó más de 35 minutos en la primera respuesta, no envió foto de presupuesto, no ofreció productos complementarios (líquido de frenos o limpieza), no envió resumen de orden, no usó el botón de apoyo, omitió la encuesta NPS y no utilizó la frase de cierre institucional Somos 212Global.',
    strengths: [
      'Concretó la venta a pesar de las omisiones en el protocolo.'
    ],
    improvementAreas: [
      'Urgente coaching en protocolo de atención WhatsApp 212Global.',
      'Obligatorio identificarse con código REF corporativo.',
      'Siempre enviar la foto del presupuesto emitida por el sistema y el link NPS de satisfacción.'
    ],
    complianceMatrix: [
      { id: 1, name: 'Técnica de Marketing Cross Selling', status: 'NO CUMPLE', evidence: 'No ofreció ningún producto complementario como líquido de frenos DOT4 o rectificación.', recommendation: 'Sugerir líquido de frenos o limpia frenos en aerosol.' },
      { id: 2, name: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)', status: 'NO CUMPLE', evidence: 'No mencionó la opción de 25% en divisas, cobró directo en Bs sin incentivo.', recommendation: 'Presentar la opción de divisas con descuento.' },
      { id: 3, name: 'Respuesta Rápida de Presupuesto', status: 'NO CUMPLE', evidence: 'Tardó 37 minutos en emitir la primera respuesta con el precio.', recommendation: 'Reducir tiempos de atención a menos de 5 minutos.' },
      { id: 4, name: 'Foto del presupuesto', status: 'NO CUMPLE', evidence: 'Solo envió texto plano "Cuestan 18$", sin fotografía del presupuesto del sistema.', recommendation: 'Adjuntar capture del presupuesto formal.' },
      { id: 5, name: 'Resumen (clientes con orden)', status: 'NO CUMPLE', evidence: 'No envió resumen de orden antes ni después de recibir el pago.', recommendation: 'Enviar mensaje estructurado con desglose del pedido.' },
      { id: 6, name: 'Botón Apoyo', status: 'NO CUMPLE', evidence: 'No disponibilizó el botón de apoyo o soporte técnico.', recommendation: 'Activar plantilla de botón de apoyo.' },
      { id: 7, name: 'Encuesta de satisfacción (NPS)', status: 'NO CUMPLE', evidence: 'Omitió por completo el envío del enlace de encuesta NPS.', recommendation: 'Disparar enlace NPS tras confirmar la orden.' },
      { id: 8, name: 'Enviar el REF de cada quien', status: 'NO CUMPLE', evidence: 'Se identificó solo como "Pedro", sin código REF de asesor.', recommendation: 'Incluir su código REF asignado.' },
      { id: 9, name: 'Empatía', status: 'NO CUMPLE', evidence: 'Tono frío, desinteresado y con respuestas de monosílabos ("Ok recibido").', recommendation: 'Mantener un trato cálido y proactivo.' },
      { id: 10, name: 'Terminación: Somos 212Global...', status: 'NO CUMPLE', evidence: 'No utilizó el lema Somos 212Global en el cierre de la conversación.', recommendation: 'Utilizar siempre la frase institucional de cierre.' },
      { id: 11, name: 'Responder montos de deliverys correctamente', status: 'NO CUMPLE', evidence: 'Dio un estimado impreciso: "el motorizado cobra según la zona, creo que 5$ o 6$".', recommendation: 'Usar el tabulador oficial de delivery.' },
      { id: 12, name: 'Sustitutos', status: 'CUMPLE', evidence: 'Tenía disponible la marca solicitada Valeo.' }
    ]
  }
];
