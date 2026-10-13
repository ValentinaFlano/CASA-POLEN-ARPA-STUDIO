import type { Cotizacion } from "@/lib/cotizacion";
import { TIPOS_SERVICIO } from "@/lib/cotizacion";
import { enlaceWhatsapp } from "@/lib/format";

/*
 * Plantillas HTML de los correos de cotización. Estilos en línea porque los
 * clientes de correo ignoran las hojas de estilo.
 */

const C = { fondo: "#f5f4ef", texto: "#2e2f2b", gris: "#6d6a62", verde: "#2c3b2a", borde: "#cfcabd" };

const escapar = (t: string) =>
  t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const MEDIO = { WhatsApp: "WhatsApp", Correo: "correo", Llamada: "teléfono" } as const;

const nombreServicio = (s: Cotizacion["servicio"]) => TIPOS_SERVICIO.find((t) => t.valor === s)?.nombre ?? s;

function marco(titulo: string, cuerpo: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:${C.fondo};font-family:Helvetica,Arial,sans-serif;color:${C.texto}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:${C.gris};padding-bottom:24px">Casa Polen &amp; Arpa Studio</td></tr>
<tr><td style="font-size:26px;font-weight:300;letter-spacing:1px;text-transform:uppercase;padding-bottom:20px">${titulo}</td></tr>
<tr><td style="font-size:16px;line-height:1.6">${cuerpo}</td></tr>
<tr><td style="font-size:12px;color:${C.gris};padding-top:32px;border-top:1px solid ${C.borde}">Jardines sostenibles ante la escasez hídrica</td></tr>
</table></td></tr></table></body></html>`;
}

function filas(datos: [string, string | undefined][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border-top:1px solid ${C.borde}">${datos
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.borde};color:${C.gris};font-size:13px;width:38%;vertical-align:top">${k}</td><td style="padding:10px 0;border-bottom:1px solid ${C.borde};white-space:pre-wrap">${escapar(v!)}</td></tr>`,
    )
    .join("")}</table>`;
}

const boton = (href: string, texto: string) =>
  `<a href="${escapar(href)}" style="display:inline-block;background:${C.verde};color:${C.fondo};text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin:8px 8px 0 0">${texto}</a>`;

/** Aviso al equipo con todos los datos de la solicitud. */
export function correoEquipo(c: Cotizacion, fotos: string[], guardada: boolean) {
  const resumen = filas([
    ["Servicio", nombreServicio(c.servicio)],
    ["Comuna", c.comuna],
    ["Metros cuadrados", c.metros ? `${c.metros} m²` : undefined],
    ["Descripción", c.descripcion],
    ["Presupuesto", c.presupuesto],
    ["Nombre", c.nombre],
    ["Correo", c.email],
    ["Teléfono", c.telefono],
    ["Prefiere contacto por", c.contactoPreferido],
  ]);
  const listaFotos = fotos.length
    ? `<p style="margin:20px 0 8px"><strong>Fotos del terreno</strong> <span style="color:${C.gris};font-size:13px">(enlaces válidos por 7 días)</span></p>${fotos
        .map((u, i) => `<a href="${escapar(u)}" style="color:${C.verde}">Foto ${i + 1}</a>`)
        .join(" · ")}`
    : "";
  const aviso = guardada
    ? ""
    : `<p style="background:#f3e4e4;padding:12px;border-radius:8px;font-size:14px">Atención: esta solicitud no se pudo guardar en la base de datos. Este correo es el único registro.</p>`;

  return {
    asunto: `Nueva cotización: ${nombreServicio(c.servicio)} en ${c.comuna}`,
    html: marco(
      "Nueva solicitud de cotización",
      `${aviso}${resumen}${listaFotos}<p style="margin-top:24px">${boton(
        enlaceWhatsapp(c.telefono, `Hola ${c.nombre.split(" ")[0]}, te escribimos de Casa Polen por tu solicitud de ${nombreServicio(c.servicio).toLowerCase()}.`),
        "Responder por WhatsApp",
      )}${boton(`mailto:${c.email}`, "Responder por correo")}</p>`,
    ),
  };
}

/** Acuse de recibo al cliente. No incluye precio. */
export function correoCliente(c: Cotizacion) {
  return {
    asunto: "Recibimos tu solicitud de cotización",
    html: marco(
      `Gracias, ${escapar(c.nombre.split(" ")[0])}`,
      `<p>Recibimos tu solicitud de <strong>${escapar(nombreServicio(c.servicio).toLowerCase())}</strong> para tu terreno en ${escapar(c.comuna)}.</p>
<p>La revisaremos y te contactaremos por ${MEDIO[c.contactoPreferido]} dentro de los próximos días hábiles con una propuesta.</p>
<p style="color:${C.gris};font-size:14px">Si quieres agregar información, responde este correo.</p>`,
    ),
  };
}
