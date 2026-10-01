import type { Politica } from "@/lib/types";

/**
 * Propuesta de política de reservas, cancelación y reprogramación.
 * Texto editable: cambia aquí cualquier párrafo.
 */
export const politicaReservas: Politica = {
  titulo: "Reservas, cancelación y reprogramación",
  actualizada: "2026-10-01",
  secciones: [
    {
      titulo: "Confirmación de la reserva",
      parrafos: [
        "Al agendar, tu visita queda pendiente hasta confirmar el pago. Te enviaremos los datos de transferencia por correo o WhatsApp.",
        "Si el pago no se registra dentro de 24 horas desde la reserva, el horario se libera para otras personas. Puedes volver a agendar cuando quieras.",
        "La visita queda confirmada cuando te escribimos para avisar que recibimos el pago.",
      ],
    },
    {
      titulo: "Reprogramación",
      parrafos: [
        "Puedes reprogramar sin costo avisándonos con al menos 24 horas de anticipación, sujeto a disponibilidad. Cada reserva admite hasta dos reprogramaciones.",
        "Si llueve o hay condiciones que impiden recorrer el terreno de forma segura, te propondremos una nueva fecha sin costo.",
      ],
    },
    {
      titulo: "Cancelación",
      parrafos: [
        "Con 48 horas o más de anticipación: devolvemos el 100% del valor pagado.",
        "Entre 48 y 24 horas antes: devolvemos el 50%, o dejamos el 100% como abono para una nueva visita dentro de los 3 meses siguientes.",
        "Con menos de 24 horas, o si no es posible acceder al terreno a la hora acordada, no hay devolución.",
        "Si nosotras debemos cancelar, te ofreceremos una nueva fecha prioritaria o la devolución total.",
      ],
    },
    {
      titulo: "El día de la visita",
      parrafos: [
        "Necesitamos que una persona adulta nos reciba y nos dé acceso a todas las zonas que quieras revisar.",
        "Esperamos hasta 15 minutos desde la hora acordada. Si nos atrasamos nosotras, te avisaremos por WhatsApp.",
      ],
    },
  ],
};
