import "server-only";

/**
 * Interruptores de funciones que aún no están activas en producción.
 * Se encienden con variables de entorno en Vercel, sin cambiar código.
 */

/** Formulario de cotización en línea. Actívalo con COTIZACION_EN_LINEA=true. */
export function cotizacionEnLinea() {
  return process.env.COTIZACION_EN_LINEA === "true";
}
