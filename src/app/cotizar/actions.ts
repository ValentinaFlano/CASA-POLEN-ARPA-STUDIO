"use server";

import { esquemaCotizacion, type Cotizacion, type EstadoCotizacion } from "@/lib/cotizacion";

/**
 * Recibe una solicitud de cotización.
 *
 * Fase 1: valida los datos y confirma la recepción.
 * Fase 2: guarda la solicitud en Supabase, sube las fotos a Storage y envía
 * dos correos con Resend (aviso al equipo y acuse al cliente).
 */
export async function enviarCotizacion(_previo: EstadoCotizacion, formData: FormData): Promise<EstadoCotizacion> {
  // Campo trampa: los bots lo completan, las personas no lo ven.
  if (formData.get("sitio_web")) return { estado: "enviada", nombre: "" };

  const valores = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;
  const resultado = esquemaCotizacion.safeParse(valores);

  if (!resultado.success) {
    const campos: Partial<Record<keyof Cotizacion, string>> = {};
    for (const issue of resultado.error.issues) {
      const campo = issue.path[0] as keyof Cotizacion;
      campos[campo] ??= issue.message;
    }
    return { estado: "error", mensaje: "Revisa los campos marcados.", campos, valores };
  }

  // TODO Fase 2: persistir en Supabase y enviar correos con Resend.
  if (process.env.NODE_ENV !== "production") {
    console.info("[cotización recibida]", resultado.data);
  }

  return { estado: "enviada", nombre: resultado.data.nombre.split(" ")[0] };
}
