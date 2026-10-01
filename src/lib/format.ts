import type { Estacion, Servicio } from "./types";

/** 1.5 → "1,5 UF" */
export function formatoUF(valor: number) {
  return `${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2 }).format(valor)} UF`;
}

/** "Desde 1,5 UF" o "Visita inicial desde 1,5 UF" */
export function precioServicio(servicio: Servicio) {
  const desde = `desde ${formatoUF(servicio.precio.desdeUF)}`;
  return servicio.precio.etiqueta
    ? `${servicio.precio.etiqueta} ${desde}`
    : desde.charAt(0).toUpperCase() + desde.slice(1);
}

/** Número de WhatsApp sin símbolos, para wa.me */
export function numeroWhatsapp(telefono: string) {
  return telefono.replace(/\D/g, "");
}

export function enlaceWhatsapp(telefono: string, mensaje?: string) {
  const base = `https://wa.me/${numeroWhatsapp(telefono)}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function enlaceInstagram(usuario: string) {
  return `https://www.instagram.com/${usuario.replace(/^@/, "")}/`;
}

export const ESTACIONES: { id: Estacion; nombre: string; meses: string }[] = [
  { id: "primavera", nombre: "Primavera", meses: "sep – nov" },
  { id: "verano", nombre: "Verano", meses: "dic – feb" },
  { id: "otono", nombre: "Otoño", meses: "mar – may" },
  { id: "invierno", nombre: "Invierno", meses: "jun – ago" },
];
