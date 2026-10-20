import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Inicialización del cliente de Gemini
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no configurada en las variables de entorno.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Prompt del Sistema para Lectura y Auditoría de PDFs de Botmaker
const SYSTEM_AUDITOR_PROMPT = `
# ROL Y OBJETIVO
Eres un auditor experto de Control de Calidad Comercial y NPS para chats exportados de Botmaker (WhatsApp) de la empresa 212Global.
Tu objetivo es analizar minuciosamente el texto extraído del PDF o exportación de la interacción con el cliente, identificar a los participantes y auditar automáticamente los 12 criterios oficiales de calidad de atención.

# REGLAS DE DETECCIÓN AUTOMÁTICA
1. **Identificación de Asesores:**
   - Detecta todos los nombres de asesores humanos que intervienen en la conversación.
   - Asigna a cada uno su rol correspondiente: "Cazador", "Recolector", "Vendedor", "Distribución", "Preventa", u "Otros".
   - Estima el número de mensajes o intervenciones de cada asesor.
2. **Transferencias e Intervenciones del Bot:**
   - Identifica mensajes automáticos, menús del bot y transferencias de cola, etiquetándolas como "LOG / Logística" o sistema.
3. **Generación de LINK_CHAT:**
   - Si el nombre del archivo contiene un identificador como "HLBCE4G3WCI243EHXFE0_2026-10-19..." o similar, extrae la cadena alfanumérica previa a la fecha/guión bajo para construir el enlace oficial: https://go.botmaker.com/#/chats/[CÓDIGO].
   - Si se encuentra un ID de chat dentro del texto, úsalo prioritariamente.
4. **Regla de Exención (20% / 25% en Divisas):**
   - Si el método de pago utilizado o acordado es Cashea, MercadoLibre (MercadoEnvíos) u otra plataforma financiada que no admite descuento en divisas, marca el criterio 2 ("Botón de 25% en divisas") estrictamente como "NO APLICA".

# LOS 12 CRITERIOS OFICIALES A EVALUAR:
1. **Técnica de Marketing Cross Selling:** ¿El asesor ofreció productos complementarios, accesorios o combos relacionados con la solicitud del cliente?
2. **Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp):** ¿Informó o incentivó el descuento por pago en divisas en efectivo/depósito según la política? (Ojo: Marca NO APLICA si pagó por Cashea o MercadoLibre).
3. **Respuesta Rápida de Presupuesto:** ¿El presupuesto se entregó de forma ágil, clara y sin demoras injustificadas?
4. **Foto del presupuesto:** ¿Se envió la imagen, capture o ficha visual del presupuesto cotizado?
5. **Resumen (clientes con orden):** ¿Se envió el resumen final consolidado detallando productos, cantidades, total y condiciones al concretar o avanzar la orden?
6. **Botón Apoyo:** ¿Se utilizó el botón o mensaje predeterminado de apoyo / seguimiento para asistir al cliente si tenía dudas?
7. **Encuesta de satisfacción (NPS):** ¿Se envió la encuesta o invitación a calificar el servicio y experiencia (NPS)?
8. **Enviar el REF de cada quien:** ¿El asesor compartió su código o referencia personalizada de identificación de asesor (REF)?
9. **Empatía:** ¿El asesor mantuvo un tono cálido, respetuoso, servicial y empático durante toda la conversación?
10. **Terminación: Somos 212Global...:** ¿Se utilizó la frase corporativa oficial de cierre ("Somos 212Global...", agradecimiento y despedida institucional)?
11. **Responder montos de deliverys correctamente:** ¿Se cotizó y comunicó la tarifa de delivery / flete / envío con precisión de acuerdo a la zona?
12. **Sustitutos:** Si algún producto solicitado no estaba disponible o para dar mejores alternativas, ¿se ofrecieron sustitutos o variantes viables? Si no fue necesario porque había stock exacto y no se requirió sustituto, calificar según si se gestionaron alternativas o marcar CUMPLE/NO APLICA con justificación.

# REGLAS DE PUNTUACIÓN Y ESTADOS
- Status admitidos: "CUMPLE", "NO CUMPLE", "NO APLICA".
- GlobalScore: porcentaje de 0 a 100 calculado sobre los criterios aplicables (excluyendo "NO APLICA").
- OverallResult:
  - "APROBADO": Puntaje >= 80%
  - "REQUIERE MEJORA": Puntaje 60% - 79%
  - "NO CONFORME": Puntaje < 60%
- En cada criterio de "complianceMatrix", debes proveer estrictamente:
  - "locationHint": Ubicación precisa de la intervención en el PDF (ej: "Intervención de Freyder Rodriguez (10:18 a. m.)", "Mensaje inicial del bot (09:15 a. m.)", "Cierre de conversación (09:30 a. m.)").
  - "evidenceQuote": La cita textual exacta del mensaje extraído del PDF que respalda la evaluación.
  - "failureReason": Explicación concisa si no cumple ("NO CUMPLE") o justificación si no aplica ("NO APLICA", ej: "Exención Cashea: El cliente canceló con Cashea, no aplica descuento de divisas").
`;

// Endpoint Principal de Auditoría de PDFs
app.post('/api/audit-pdf', async (req, res) => {
  try {
    const { pdfText, fileName, activeEvaluator } = req.body;

    if (!pdfText || typeof pdfText !== 'string' || pdfText.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'No se recibió el contenido del PDF o texto del chat.' });
    }

    const ai = getGeminiClient();

    // Extraer código de chat del nombre del archivo
    let extractedChatCode = '';
    const cleanFileName = (fileName || '').trim();
    if (cleanFileName.includes('_202')) {
      extractedChatCode = cleanFileName.split('_202')[0];
    } else if (cleanFileName) {
      extractedChatCode = cleanFileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_-]/g, '');
    }

    const promptUser = `
Nombre del archivo: ${cleanFileName || 'chat_export.pdf'}
Evaluador activo: ${activeEvaluator || 'Rudy'}
Texto extraído del PDF / exportación de Botmaker:
"""
${pdfText.slice(0, 75000)}
"""

Analiza la conversación comercial, detecta asesores, evalúa estrictamente los 12 criterios y devuelve el análisis en el JSON especificado con locationHint, evidenceQuote y failureReason.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ text: promptUser }],
      config: {
        systemInstruction: SYSTEM_AUDITOR_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            chatCode: { type: Type.STRING },
            botmakerUrl: { type: Type.STRING },
            customerNameOrPhone: { type: Type.STRING },
            conversationDate: { type: Type.STRING },
            detectedPaymentMethod: { type: Type.STRING },
            detectedAdvisors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  messageCount: { type: Type.NUMBER }
                },
                required: ['name', 'role']
              }
            },
            globalScore: { type: Type.NUMBER },
            overallResult: { type: Type.STRING },
            complianceMatrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  name: { type: Type.STRING },
                  status: { type: Type.STRING },
                  evidenceQuote: { type: Type.STRING },
                  locationHint: { type: Type.STRING },
                  failureReason: { type: Type.STRING }
                },
                required: ['id', 'name', 'status', 'evidenceQuote', 'locationHint']
              }
            },
            executiveSummary: { type: Type.STRING },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            improvementAreas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            'detectedAdvisors',
            'globalScore',
            'overallResult',
            'complianceMatrix',
            'executiveSummary'
          ]
        }
      }
    });

    const resultJson = JSON.parse(response.text || '{}');
    
    // Asegurar la construcción de la URL de Botmaker
    const finalChatCode = resultJson.chatCode || extractedChatCode || 'BOTMAKER_CHAT';
    const finalUrl = `https://go.botmaker.com/#/chats/${finalChatCode}`;

    res.json({
      success: true,
      report: {
        ...resultJson,
        chatCode: finalChatCode,
        botmakerUrl: finalUrl,
        evaluatedAt: new Date().toISOString(),
        evaluator: activeEvaluator || 'Rudy',
        fileName: cleanFileName || `${finalChatCode}.pdf`
      }
    });

  } catch (error: any) {
    console.error('Error procesando auditoría en Gemini Studio:', error);
    res.status(500).json({ success: false, error: error?.message || 'Error en la API de Gemini.' });
  }
});

// Endpoint de verificación de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Botmaker Quality Auditor 212Global' });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Servidor 212Global Auditor ejecutándose en el puerto ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
});
