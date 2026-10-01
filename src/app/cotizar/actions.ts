"use server";

import { headers } from "next/headers";
import { correoCliente, correoEquipo } from "@/emails/cotizacion";
import {
  MAX_FOTOS,
  MAX_MB_FOTO,
  validarCotizacion,
  valoresDeFormulario,
  type EstadoCotizacion,
} from "@/lib/cotizacion";
import { correosEquipo, enviarCorreo } from "@/lib/servidor/correo";
import { BUCKET_FOTOS, supabaseAdmin } from "@/lib/servidor/supabase";

const EXTENSIONES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};
const RUTA_VALIDA = /^\d{4}-\d{2}\/[0-9a-f-]{36}\.(jpg|png|webp|heic|heif)$/;
const SIETE_DIAS = 60 * 60 * 24 * 7;

// Límite simple de envíos por IP (por instancia del servidor).
const envios = new Map<string, number[]>();
const LIMITE = { maximo: 5, ventanaMs: 10 * 60 * 1000 };

async function excedeLimite() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "desconocida";
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < LIMITE.ventanaMs);
  recientes.push(ahora);
  envios.set(ip, recientes);
  return recientes.length > LIMITE.maximo;
}

export type SubidaFoto = { ruta: string; url: string };

/**
 * Entrega URLs firmadas para que el navegador suba las fotos directo a
 * Supabase Storage, sin pasar por el servidor (límite de tamaño de las acciones).
 */
export async function crearUrlsSubida(
  archivos: { tipo: string; tamano: number }[],
): Promise<{ ok: true; subidas: SubidaFoto[] } | { ok: false }> {
  const supabase = supabaseAdmin();
  if (!supabase) return { ok: false };
  if (
    archivos.length === 0 ||
    archivos.length > MAX_FOTOS ||
    archivos.some((a) => !EXTENSIONES[a.tipo] || a.tamano > MAX_MB_FOTO * 1024 * 1024)
  ) {
    return { ok: false };
  }

  const mes = new Date().toISOString().slice(0, 7);
  const subidas: SubidaFoto[] = [];
  for (const archivo of archivos) {
    const ruta = `${mes}/${crypto.randomUUID()}.${EXTENSIONES[archivo.tipo]}`;
    const { data, error } = await supabase.storage.from(BUCKET_FOTOS).createSignedUploadUrl(ruta);
    if (error || !data) {
      console.error("[cotización] No se pudo crear URL de subida:", error?.message);
      return { ok: false };
    }
    subidas.push({ ruta, url: data.signedUrl });
  }
  return { ok: true, subidas };
}

/**
 * Recibe una solicitud de cotización: la valida, la guarda en Supabase y
 * avisa por correo al equipo y al cliente. No entrega precio.
 */
export async function enviarCotizacion(_previo: EstadoCotizacion, formData: FormData): Promise<EstadoCotizacion> {
  // Campo trampa: los bots lo completan, las personas no lo ven.
  if (formData.get("sitio_web")) return { estado: "enviada", nombre: "" };

  const valores = valoresDeFormulario(formData);
  const resultado = validarCotizacion(valores);
  if (!resultado.ok) {
    return { estado: "error", mensaje: "Revisa los campos marcados.", campos: resultado.campos, valores };
  }

  if (await excedeLimite()) {
    return {
      estado: "error",
      mensaje: "Recibimos varias solicitudes seguidas. Espera unos minutos o escríbenos por WhatsApp.",
      valores,
    };
  }

  const cotizacion = resultado.datos;
  const fotos = formData
    .getAll("fotos")
    .filter((r): r is string => typeof r === "string" && RUTA_VALIDA.test(r))
    .slice(0, MAX_FOTOS);

  const supabase = supabaseAdmin();
  const correoConfigurado = Boolean(process.env.RESEND_API_KEY);

  if (!supabase && !correoConfigurado) {
    // Sin cuentas configuradas (desarrollo): solo se registra en la consola.
    console.info("[cotización recibida, sin Supabase ni Resend]", cotizacion, fotos);
    return { estado: "enviada", nombre: cotizacion.nombre.split(" ")[0] };
  }

  let guardada = false;
  let enlacesFotos: string[] = [];
  if (supabase) {
    const { error } = await supabase.from("cotizaciones").insert({
      servicio: cotizacion.servicio,
      comuna: cotizacion.comuna,
      metros: cotizacion.metros ?? null,
      descripcion: cotizacion.descripcion,
      presupuesto: cotizacion.presupuesto ?? null,
      nombre: cotizacion.nombre,
      email: cotizacion.email,
      telefono: cotizacion.telefono,
      contacto_preferido: cotizacion.contactoPreferido,
      fotos,
    });
    guardada = !error;
    if (error) console.error("[cotización] No se pudo guardar:", error.message);

    if (fotos.length) {
      const { data } = await supabase.storage.from(BUCKET_FOTOS).createSignedUrls(fotos, SIETE_DIAS);
      enlacesFotos = (data ?? []).flatMap((f) => (f.signedUrl ? [f.signedUrl] : []));
    }
  }

  const avisoEquipo = correoEquipo(cotizacion, enlacesFotos, guardada);
  const avisoEnviado = await enviarCorreo({
    para: correosEquipo(),
    asunto: avisoEquipo.asunto,
    html: avisoEquipo.html,
    responderA: cotizacion.email,
  });

  if (!guardada && !avisoEnviado) {
    return {
      estado: "error",
      mensaje: "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.",
      valores,
    };
  }

  const acuse = correoCliente(cotizacion);
  await enviarCorreo({
    para: [cotizacion.email],
    asunto: acuse.asunto,
    html: acuse.html,
    responderA: correosEquipo()[0],
  });

  return { estado: "enviada", nombre: cotizacion.nombre.split(" ")[0] };
}
