import "server-only";

import { Resend } from "resend";

let cliente: Resend | null | undefined;

function resend() {
  if (cliente === undefined) {
    const llave = process.env.RESEND_API_KEY;
    cliente = llave ? new Resend(llave) : null;
  }
  return cliente;
}

/** Correos del equipo que reciben los avisos (CORREO_EQUIPO, separados por coma). */
export function correosEquipo() {
  return (process.env.CORREO_EQUIPO ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

type Correo = { para: string[]; asunto: string; html: string; responderA?: string };

/**
 * Envía un correo con Resend. Devuelve true si salió; nunca lanza error,
 * para que una falla de correo no rompa el formulario.
 */
export async function enviarCorreo({ para, asunto, html, responderA }: Correo): Promise<boolean> {
  const api = resend();
  if (!api || para.length === 0) {
    console.warn("[correo] Resend no configurado o sin destinatarios; no se envió:", asunto);
    return false;
  }
  const { error } = await api.emails.send({
    from: process.env.CORREO_REMITENTE || "Casa Polen <onboarding@resend.dev>",
    to: para,
    subject: asunto,
    html,
    replyTo: responderA,
  });
  if (error) {
    console.error("[correo] Error de Resend:", error.message);
    return false;
  }
  return true;
}
