import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetalleProyecto } from "@/components/proyectos/DetalleProyecto";
import { getProyecto, getProyectos } from "@/lib/content";

export async function generateStaticParams() {
  const proyectos = await getProyectos();
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);
  if (!proyecto) return {};
  const lugar = proyecto.ubicacion ? ` en ${proyecto.ubicacion}` : "";
  return {
    title: proyecto.nombre,
    description: proyecto.resumen ?? `Proyecto de paisajismo sostenible${lugar}.`,
    alternates: { canonical: `/proyectos/${proyecto.slug}` },
    openGraph: { images: [{ url: proyecto.portada.src, alt: proyecto.portada.alt }] },
  };
}

export default async function PaginaProyecto({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);
  if (!proyecto) notFound();

  return (
    <div className="contenedor max-w-7xl! pb-28 pt-32 md:pb-40 md:pt-44">
      <Link href="/proyectos" className="etiqueta mb-10 inline-flex min-h-11 items-center gap-2 text-gris hover:text-carbon">
        ← Todos los proyectos
      </Link>
      <DetalleProyecto proyecto={proyecto} />
    </div>
  );
}
