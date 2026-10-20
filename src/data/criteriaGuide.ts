export interface CriterionDetail {
  id: number;
  name: string;
  category: 'Comercial' | 'Operativo' | 'Experiencia de Cliente' | 'Identidad';
  weight: number; // Porcentaje relativo aproximado
  description: string;
  complianceRule: string;
  nonComplianceExample: string;
  complianceExample: string;
  exemptionNotes?: string;
}

export const OFFICIAL_CRITERIA: CriterionDetail[] = [
  {
    id: 1,
    name: 'Técnica de Marketing Cross Selling',
    category: 'Comercial',
    weight: 10,
    description: 'Ofrecer activamente productos complementarios, accesorios indispensables o kits que aumenten el valor del ticket y mejoren la experiencia del cliente.',
    complianceRule: 'El asesor debe sugerir al menos un producto relacionado o complementario durante la asesoría o antes del cierre.',
    complianceExample: 'Cliente compra amortiguadores -> Asesor: "Para asegurar un óptimo rendimiento, también disponemos de los guardapolvos y bases en promoción con 15% off."',
    nonComplianceExample: 'El cliente pregunta por un repuesto, se le da precio y no se ofrece ningún producto adicional o complementario.',
  },
  {
    id: 2,
    name: 'Botón de 25% en divisas (ML, Merchard, RRSS y WhatsApp)',
    category: 'Comercial',
    weight: 10,
    description: 'Promover el incentivo oficial del 25% (o 20%) de descuento al concretar el pago mediante divisas en efectivo o métodos aprobados.',
    complianceRule: 'Mencionar explícitamente el precio con descuento en divisas o enviar el botón interactivo de 25% en divisas.',
    complianceExample: '"El precio regular es 40$, pero pagando en divisas te queda en 30$ con nuestro 25% especial de descuento."',
    nonComplianceExample: 'No mencionar el beneficio en divisas o cotizar solo a tasa oficial sin el incentivo en compras directas.',
    exemptionNotes: 'REGLA DE EXENCIÓN: Si el cliente paga mediante Cashea o MercadoLibre (MercadoEnvíos), este criterio queda AUTOMÁTICAMENTE marcado como NO APLICA.'
  },
  {
    id: 3,
    name: 'Respuesta Rápida de Presupuesto',
    category: 'Operativo',
    weight: 10,
    description: 'Agilidad en la respuesta y envío de cotizaciones claras sin hacer esperar excesivamente al usuario.',
    complianceRule: 'Generar la respuesta de presupuesto formal en tiempos estándar con datos claros.',
    complianceExample: 'Envío de cotización con precio, disponibilidad y opciones en menos de 5-10 minutos desde la solicitud.',
    nonComplianceExample: 'Dejar al cliente en visto por horas o postergar la cotización sin mantener informado al cliente.',
  },
  {
    id: 4,
    name: 'Foto del presupuesto',
    category: 'Operativo',
    weight: 8,
    description: 'Adjuntar la captura, render o imagen formal del presupuesto emitido por el sistema contable/ERP.',
    complianceRule: 'Enviar imagen legible de la nota o presupuesto generado.',
    complianceExample: 'Adjunta capture de pantalla o PDF/JPG del presupuesto número 212-0984.',
    nonComplianceExample: 'Solo pasar el monto escrito en texto plano sin el respaldo visual oficial del presupuesto.',
  },
  {
    id: 5,
    name: 'Resumen (clientes con orden)',
    category: 'Operativo',
    weight: 9,
    description: 'Enviar el resumen ordenado de los productos seleccionados, montos desglosados, método de entrega y datos de facturación.',
    complianceRule: 'Mensaje consolidado con: Producto, Cantidad, Subtotal, Delivery y Total final antes del pago.',
    complianceExample: '"*Resumen de tu pedido:*\\n- 2x Bujías Iridium ($18)\\n- Delivery Chacao ($3)\\n*Total:* $21\\n*Método:* Divisas efectivo."',
    nonComplianceExample: 'Proceder al despacho sin confirmación resumida de ítems o montos acordados.',
  },
  {
    id: 6,
    name: 'Botón Apoyo',
    category: 'Experiencia de Cliente',
    weight: 8,
    description: 'Disponibilizar el botón o mensaje de soporte directo para resolver dudas técnicas, garantías o asistencia especial.',
    complianceRule: 'Ofrecer el canal de asistencia o enviar el botón interactivo de apoyo cuando el cliente lo requiera o como parte del flujo.',
    complianceExample: 'Presiona aquí para comunicarte con nuestro equipo técnico o botón "Apoyo Inmediato 212".',
    nonComplianceExample: 'Cliente manifiesta confusión y el asesor no activa el apoyo ni brinda asistencia estructurada.',
  },
  {
    id: 7,
    name: 'Encuesta de satisfacción (NPS)',
    category: 'Experiencia de Cliente',
    weight: 10,
    description: 'Envío obligatorio de la encuesta de satisfacción para recopilar feedback de la experiencia de compra y atención.',
    complianceRule: 'Disparar el mensaje con el link o formulario interactivo de calificación NPS al finalizar.',
    complianceExample: '"¿Cómo calificarías tu atención hoy del 1 al 10? Tu opinión nos ayuda a crecer: [Link NPS]"',
    nonComplianceExample: 'Cerrar la conversación sin solicitar la valoración ni enviar el enlace de NPS.',
  },
  {
    id: 8,
    name: 'Enviar el REF de cada quien',
    category: 'Identidad',
    weight: 7,
    description: 'El asesor comercial debe identificarse con su código REF o referencia interna asignada.',
    complianceRule: 'Incluir su código de asesor asignado (ej: REF: CARLOS-04, REF: ANGIE-02).',
    complianceExample: '"Te atendió Carlos Mora [REF: CM-212]. Guarda este código para tus próximas compras."',
    nonComplianceExample: 'El asesor interviene sin dejar constancia de su código REF corporativo.',
  },
  {
    id: 9,
    name: 'Empatía',
    category: 'Experiencia de Cliente',
    weight: 10,
    description: 'Comunicación cálida, atenta, personalizada, usando el nombre del cliente y demostrando disposición genuina.',
    complianceRule: 'Trato profesional y cortés, resolución activa de inquietudes y tono acogedor.',
    complianceExample: '"Con gusto señor Roberto, permítame validar en bodega para encontrarle la mejor opción para su vehículo."',
    nonComplianceExample: 'Respuestas cortantes de monosílabos, frialdad ("no hay", "solo lo publicado") o desgano evidente.',
  },
  {
    id: 10,
    name: 'Terminación: Somos 212Global...',
    category: 'Identidad',
    weight: 8,
    description: 'Cierre institucional obligatorio utilizando el lema corporativo oficial "Somos 212Global...".',
    complianceRule: 'El mensaje de despedida debe incorporar la frase "Somos 212Global...".',
    complianceExample: '"¡Gracias por preferirnos! En 212Global estamos siempre para servirte. ¡Somos 212Global!"',
    nonComplianceExample: 'Despedirse con un simple "chao" o dejar la conversación sin el cierre reglamentario.',
  },
  {
    id: 11,
    name: 'Responder montos de deliverys correctamente',
    category: 'Operativo',
    weight: 5,
    description: 'Informar con exactitud el costo de delivery según el tabulador por zona (Caracas / Gran Caracas) y condiciones de envío.',
    complianceRule: 'Indicar el monto exacto en $ y tasa, zona de cobertura y tiempos estimados de entrega.',
    complianceExample: '"El delivery a Las Mercedes tiene un costo de $3. Envíos nacionales por MRW / Domesa cobro en destino."',
    nonComplianceExample: 'Cobrar montos erróneos o decir "el motorizado te cobra lo que sea" sin fijar tarifa.',
  },
  {
    id: 12,
    name: 'Sustitutos',
    category: 'Comercial',
    weight: 5,
    description: 'Manejo proactivo de alternativas y marcas sustitutas homologadas cuando no exista inventario del ítem original solicitado.',
    complianceRule: 'Si no hay stock, proponer marcas equivalentes o alternativas compatibles; si hubo stock original, calificar CUMPLE o NO APLICA con nota.',
    complianceExample: '"No nos queda marca original Bosch, pero tenemos la marca ACDelco garantizada con las mismas especificaciones a $22."',
    nonComplianceExample: 'Decir simplemente "Agotado" sin ofrecer ninguna otra opción viable al cliente.',
  },
];
