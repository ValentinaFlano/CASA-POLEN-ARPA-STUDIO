import { ImagenParallax } from "@/components/motion/ImagenParallax";
import { Aparecer } from "@/components/motion/Aparecer";
import type { Imagen } from "@/lib/types";
import Link from "next/link";

export function CtaFinal({ imagen }: { imagen: Imagen }) {
  return (
    <section aria-labelledby="cta-final" className="relative overflow-hidden bg-noche text-niebla">
      <ImagenParallax imagen={imagen} sizes="100vw" className="absolute! inset-0" intensidad={10} />
      <div aria-hidden="true" className="absolute inset-0 bg-noche/55" />
      <div className="contenedor relative flex min-h-[80svh] flex-col items-start justify-center py-28">
        <Aparecer>
          <p className="etiqueta text-niebla/75">Primer paso</p>
          <h2 id="cta-final" className="titulo mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)]">
            Conversemos sobre tu jardín
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-niebla/85">
            Visitamos tu terreno, observamos el suelo, el sol y el agua disponible, y te proponemos el camino más
            sostenible.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/agendar"
              className="etiqueta inline-flex min-h-13 items-center justify-center rounded-full bg-niebla px-8 text-noche transition-colors duration-500 hover:bg-white"
            >
              Agendar visita a terreno
            </Link>
            <Link
              href="/cotizar"
              className="etiqueta inline-flex min-h-12 items-center justify-center underline decoration-niebla/40 underline-offset-8 hover:decoration-niebla"
            >
              Solicitar cotización
            </Link>
          </div>
        </Aparecer>
      </div>
    </section>
  );
}
