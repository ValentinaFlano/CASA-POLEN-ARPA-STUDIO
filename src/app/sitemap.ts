import type { MetadataRoute } from "next";
import { getAjustes, getProyectos } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ajustes, proyectos] = await Promise.all([getAjustes(), getProyectos()]);
  const base = ajustes.url.replace(/\/$/, "");
  const fijas = ["", "/proyectos", "/servicios", "/quienes-somos", "/cotizar", "/agendar", "/politica-de-reservas"];

  return [
    ...fijas.map((ruta) => ({ url: `${base}${ruta}`, priority: ruta === "" ? 1 : 0.7 })),
    ...proyectos.map((p) => ({ url: `${base}/proyectos/${p.slug}`, priority: 0.6 })),
  ];
}
