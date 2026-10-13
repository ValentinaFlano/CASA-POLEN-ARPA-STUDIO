import Image from "next/image";
import Link from "next/link";
import { precioServicio } from "@/lib/format";
import type { Servicio } from "@/lib/types";
import { ModalServicio } from "./ModalServicio";

type Props = { servicio: Servicio; numero: number; notaPrecios: string };

export function TarjetaServicio({ servicio, numero, notaPrecios }: Props) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-arena">
        <Image
          src={servicio.imagen.src}
          alt={servicio.imagen.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-organico) group-hover:scale-[1.04]"
        />
        <span className="etiqueta absolute left-4 top-4 rounded-full bg-niebla/90 px-3 py-1.5 text-carbon">
          {String(numero).padStart(2, "0")}
        </span>
      </div>
      <h3 className="titulo mt-7 text-2xl md:text-3xl">{servicio.nombre}</h3>
      <p className="mt-3 font-light leading-relaxed text-carbon/85">{servicio.bajada}</p>
      {servicio.pack && (
        <p className="mt-4 rounded-2xl bg-salvia/30 px-4 py-3 text-sm leading-snug text-bosque">{servicio.pack.texto}</p>
      )}
      <div className="flex-1" />
      <p className="etiqueta mt-6 text-oliva">{precioServicio(servicio)}</p>
      <div className="mt-6 flex items-center gap-6 border-t border-piedra pt-5">
        <ModalServicio servicio={servicio} notaPrecios={notaPrecios} />
        <Link
          href={`/cotizar?servicio=${servicio.slug}`}
          className="etiqueta inline-flex min-h-11 items-center underline decoration-carbon/30 underline-offset-8 hover:decoration-carbon"
        >
          Cotizar
        </Link>
      </div>
    </article>
  );
}
