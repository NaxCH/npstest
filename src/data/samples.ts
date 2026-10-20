export interface SampleChatCase {
  id: string;
  fileName: string;
  chatCode: string;
  title: string;
  scenario: string;
  expectedOutcome: string;
  text: string;
}

export const SAMPLE_CHATS: SampleChatCase[] = [
  {
    id: 'sample-1',
    fileName: 'HLBCE4G3WCI243EHXFE0_2026-10-19_cotizacion_amortiguadores.pdf',
    chatCode: 'HLBCE4G3WCI243EHXFE0',
    title: 'Caso Excelente: Venta con Cross-Selling y Descuento en Divisas',
    scenario: 'Cliente solicita amortiguadores delanteros para Toyota Corolla. Asesor aplica cross-selling (bases y guardapolvos), cotiza 25% en divisas, envía foto y cierra con NPS y frase oficial.',
    expectedOutcome: 'APROBADO (~95% - 100%) con todos los 12 criterios cumplidos.',
    text: `[19/10/2026, 09:15:10] Botmaker System: Transferencia entrante desde WhatsApp (+584149876543)
[19/10/2026, 09:15:12] LOG / Logística: Asignado automáticamente a cola de ventas - Atención Inmediata.
[19/10/2026, 09:15:20] Cliente: Hola buen día, estoy buscando los amortiguadores delanteros para un Corolla 2012. Tienen disponibles y qué precio tienen?
[19/10/2026, 09:16:02] Carlos R. (Cazador): ¡Hola! Muy buenos días, con todo el gusto te atiende Carlos Rodríguez [REF: CR-212]. Bienvenido a 212Global. Permíteme un minuto para verificar en nuestro almacén principal.
[19/10/2026, 09:17:45] Carlos R. (Cazador): Sí disponemos de la pareja de amortiguadores delanteros marca Tokico Heavy Duty japoneses garantizados para tu Corolla 2012.
[19/10/2026, 09:18:10] Carlos R. (Cazador): [Foto adjunta: Presupuesto_Oficial_212G_0892.png] Aquí te comparto el presupuesto oficial detallado.
[19/10/2026, 09:19:00] Carlos R. (Cazador): El precio regular es de $120 el par. Sin embargo, aprovechando nuestro beneficio comercial del 25% de descuento en divisas (efectivo o depósito), te queda en tan solo $90 netos el par.
[19/10/2026, 09:19:40] Carlos R. (Cazador): Adicionalmente, estimado amigo, cuando se cambian los amortiguadores siempre se sugiere renovar las bases y guardapolvos para no perder la garantía y asegurar un trabajo duradero. Las tenemos en promoción por $25 el kit completo. ¿Deseas que te las incluya en el pedido?
[19/10/2026, 09:21:15] Cliente: Excelente amigo, sí agrégamelas de una vez para dejar el tren delantero al día. ¿Hacen delivery a Chacao?
[19/10/2026, 09:22:00] Carlos R. (Cazador): ¡Excelente decisión! Sí, cubrimos toda el área metropolitana. El delivery a Chacao tiene un costo exacto de $3 con nuestro motorizado express garantizado en menos de 2 horas.
[19/10/2026, 09:23:10] LOG / Logística: Transfiriendo chat a Mariana V. (Vendedor) para cierre y facturación.
[19/10/2026, 09:24:00] Mariana V. (Vendedor): Hola estimado, gusto en saludarte, te atiende Mariana [REF: MV-212] del departamento de despacho.
[19/10/2026, 09:25:30] Mariana V. (Vendedor): Te comparto el resumen oficial de tu orden:
*RESUMEN DE ORDEN #212-9844:*
- 2x Amortiguadores Tokico Corolla 2012: $90 (Aplica 25% en divisas)
- 1x Kit Bases + Guardapolvos: $25
- Delivery Express Chacao: $3
*TOTAL A CANCELAR:* $118 en divisas efectivo al recibir.
Datos de entrega confirmados en Calle Guaicaipuro, Edif. Parque Chacao.
[19/10/2026, 09:27:00] Cliente: Perfecto Mariana, ya tengo los billetes completos en mano para el motorizado.
[19/10/2026, 09:27:45] Mariana V. (Vendedor): [Botón interactivo: Apoyo y Asistencia Post-Venta 212] Si necesitas cualquier soporte técnico o reporte de entrega, puedes pulsar el botón de apoyo en cualquier momento.
[19/10/2026, 09:28:30] Mariana V. (Vendedor): Tu motorizado asignado es José (+584121234567), va en camino con tu factura original.
[19/10/2026, 09:29:10] Mariana V. (Vendedor): Para nosotros es un honor atenderte. Te invitamos a calificar nuestro servicio a través de nuestra encuesta de satisfacción (NPS): https://encuesta.212global.com/nps?id=9844
[19/10/2026, 09:30:00] Mariana V. (Vendedor): ¡Gracias por confiar en el equipo líder en repuestos! ¡Somos 212Global, calidad y confianza para tu vehículo!
[19/10/2026, 09:31:00] Cliente: Muchas gracias por la excelente atención! Feliz día.`
  },
  {
    id: 'sample-2',
    fileName: 'CSH88319AKL720_2026-10-18_pago_cashea_bateria.pdf',
    chatCode: 'CSH88319AKL720',
    title: 'Caso Cashea: Exención Automática de 25% Divisas (NO APLICA)',
    scenario: 'Cliente solicita compra de batería y selecciona pago a cuotas mediante CASHEA. La IA debe auditar el Criterio #2 como "NO APLICA" de acuerdo con la regla oficial de exención de 212Global.',
    expectedOutcome: 'APROBADO con Criterio 2 marcado estrictamente como "NO APLICA".',
    text: `[18/10/2026, 14:10:00] Botmaker System: Entrada de usuario WhatsApp (+584245551234)
[18/10/2026, 14:10:05] LOG / Logística: Asignado a cola Ventas Cashea
[18/10/2026, 14:10:20] Cliente: Buenas tardes, tienen disponible la batería Duncan 24MR 800AMP? Quiero pagar por Cashea nivel 3.
[18/10/2026, 14:11:15] Edgar D. (Vendedor): ¡Buenas tardes! Un placer saludarle, le atiende Edgar Díaz [REF: ED-212]. Con mucho gusto, sí somos tienda oficial aliada de Cashea.
[18/10/2026, 14:12:00] Edgar D. (Vendedor): [Foto adjunta: Ficha_Tecnica_Duncan_24MR.jpg] Aquí le adjunto la foto y ficha del presupuesto de la batería Duncan original con 12 meses de garantía.
[18/10/2026, 14:13:30] Edgar D. (Vendedor): El valor para financiamiento Cashea es de $85. Con su nivel Cashea paga una inicial de $34 y le quedan 3 cuotas quincenales sin interés de $17 cada una. (Nota: En compras financiadas por Cashea el precio es el establecido por la app y no aplica descuento de divisas en efectivo).
[18/10/2026, 14:14:40] Edgar D. (Vendedor): Además, le podemos ofrecer el protector anticorrosivo para bornes por tan solo $3 adicionales o el escaneo del alternador sin costo al retirar en tienda.
[18/10/2026, 14:16:00] Cliente: Me parece estupendo, ya generé el código de compra Cashea: #CSH-99214. Paso a retirar por su tienda de Boleíta.
[18/10/2026, 14:17:10] Edgar D. (Vendedor): *Resumen de Orden Cashea #88319:*
- Producto: Batería Duncan 24MR 800AMP
- Total: $85 (Aprobado por Cashea)
- Modalidad: Retiro en tienda sede Boleíta Norte
- Monto Delivery: $0 (Retiro en tienda, si requiriera delivery en Caracas el costo es $4).
[18/10/2026, 14:18:00] Edgar D. (Vendedor): [Botón interactivo: Soporte de Garantías 212] Para cualquier duda sobre la garantía conserve este chat o use el botón de apoyo.
[18/10/2026, 14:19:00] Edgar D. (Vendedor): Por favor, ayúdenos a calificar nuestra gestión en este breve enlace de satisfacción NPS: https://encuesta.212global.com/nps?csh=88319
[18/10/2026, 14:20:00] Edgar D. (Vendedor): ¡Muchísimas gracias por su preferencia! ¡Somos 212Global!`
  },
  {
    id: 'sample-3',
    fileName: 'FAIL4492XQP104_2026-10-17_atencion_deficiente.pdf',
    chatCode: 'FAIL4492XQP104',
    title: 'Caso Deficiente: Múltiples Criterios Incumplidos',
    scenario: 'Atención fría y monosilábica. No ofrece cross selling, no se identifica con REF, no envía presupuesto fotográfico, no envía resumen de orden, no envía NPS ni la frase corporativa Somos 212Global.',
    expectedOutcome: 'NO CONFORME (< 50%) con advertencias y recomendaciones claras.',
    text: `[17/10/2026, 11:02:11] Botmaker System: Nuevo chat entrante (+584160001122)
[17/10/2026, 11:02:15] LOG / Logística: Asignado a Asesor General
[17/10/2026, 11:05:00] Cliente: Buenas tienen pastillas de freno para Optra 2008? Y hacen delivery?
[17/10/2026, 11:42:00] Pedro (Vendedor): Buenas, sí hay. Cuestan 18$.
[17/10/2026, 11:45:10] Cliente: Ah ok, de qué marca son? Y el delivery cuánto saldría para Santa Mónica?
[17/10/2026, 12:10:00] Pedro (Vendedor): Marca valeo. El motorizado cobra según la zona, creo que 5$ o 6$.
[17/10/2026, 12:12:00] Cliente: Me puedes mandar foto del presupuesto y cómo te pago? Tienes zelle o pago móvil?
[17/10/2026, 12:30:00] Pedro (Vendedor): Pago movil al 0414000000 CI 12345678 Mercantil. Me avisas cuando transfieras.
[17/10/2026, 12:45:00] Cliente: Ya transferí, aquí está el comprobante.
[17/10/2026, 13:00:00] Pedro (Vendedor): Ok recibido. En la tarde sale.
[17/10/2026, 13:02:00] Cliente: Listo amigo gracias.`
  }
];
