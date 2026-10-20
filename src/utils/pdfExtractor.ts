import * as pdfjsLib from 'pdfjs-dist';

// Configurar el worker de PDF.js usando CDN compatible con la versión instalada
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
      isEvalSupported: false,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageStrings = textContent.items
        .map((item: any) => (item.str ? item.str : ''))
        .join(' ');
      
      fullText += `[PÁGINA ${pageNum}]\n${pageStrings}\n\n`;
    }

    const trimmed = fullText.trim();
    if (!trimmed) {
      throw new Error('El PDF no contiene texto legible (podría ser un documento escaneado solo con imágenes).');
    }
    return trimmed;
  } catch (error: any) {
    console.error('Error al extraer texto del PDF:', error);
    throw new Error(error.message || 'No se pudo leer el archivo PDF seleccionado.');
  }
}
