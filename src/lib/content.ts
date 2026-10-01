import "server-only";

import { ajustes } from "@/content/ajustes";
import { equipo } from "@/content/equipo";
import { politicaReservas } from "@/content/politicas";
import { proyectos } from "@/content/proyectos";
import { servicios } from "@/content/servicios";
import type { ServicioSlug } from "./types";

/*
 * Capa de lectura de contenido. Los componentes solo usan estas funciones;
 * en la Fase 2 su implementación pasa a consultar Sanity (GROQ) sin cambiar
 * sus firmas.
 */

export async function getAjustes() {
  return ajustes;
}

export async function getServicios() {
  return servicios;
}

export async function getServicio(slug: ServicioSlug) {
  return servicios.find((s) => s.slug === slug);
}

export async function getEquipo() {
  return equipo;
}

export async function getProyectos() {
  return proyectos;
}

export async function getProyectosDestacados(limite = 4) {
  return proyectos.filter((p) => p.destacado).slice(0, limite);
}

export async function getProyecto(slug: string) {
  return proyectos.find((p) => p.slug === slug);
}

/** El antes y después que encabeza el home. */
export async function getAntesDespuesDestacado() {
  const proyecto = proyectos.find((p) => p.slug === "acceso-florido");
  const par = proyecto?.antesDespues?.[0];
  return proyecto && par ? { proyecto, par } : undefined;
}

export async function getPoliticaReservas() {
  return politicaReservas;
}
