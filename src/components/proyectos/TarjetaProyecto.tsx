import Image from "next/image";
import Link from "next/link";
import type { Proyecto } from "@/lib/types";

type Props = {
  proyecto: Proyecto;
  sizes: string;
  /** Clase de proporción de la imagen, ej. "aspect-[4/5]" */
  proporcion?: string;
  preload?: boolean;
};

export function TarjetaProyecto({ proyecto, sizes, proporcion = "aspect-[4/5]", preload }: Props) {
  const meta = [proyecto.ubicacion, proyecto.anio].filter(Boolean).join(" · ");

  return (
    <Link href={`/proyectos/${proyecto.slug}`} scroll={false} className="group block">
      <div className={`relative overflow-hidden bg-arena ${proporcion}`}>
        <Image
          src={proyecto.portada.src}
          alt={proyecto.portada.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-organico) group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg uppercase tracking-[0.06em]">{proyecto.nombre}</h3>
        {meta && <p className="shrink-0 text-sm text-gris">{meta}</p>}
      </div>
    </Link>
  );
}
