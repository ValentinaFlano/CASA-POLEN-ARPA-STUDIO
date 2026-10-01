import Image from "next/image";
import { Boton } from "@/components/ui/Boton";
import type { Proyecto } from "@/lib/types";
import { AntesDespues } from "./AntesDespues";
import { PaletaVegetal } from "./PaletaVegetal";
import { TablaFloracion } from "./TablaFloracion";

const NOMBRE_SERVICIO = {
  asesoria: "Asesoría",
  mantencion: "Mantención",
  "diseno-construccion": "Diseño y construcción",
} as const;

/**
 * Vista ampliada de un proyecto. Se usa en el modal y en la página propia del
 * proyecto. Cada bloque aparece solo si el proyecto lo tiene cargado.
 */
export function DetalleProyecto({ proyecto, enModal = false }: { proyecto: Proyecto; enModal?: boolean }) {
  const meta = [proyecto.ubicacion, proyecto.anio, proyecto.servicio && NOMBRE_SERVICIO[proyecto.servicio]].filter(
    Boolean,
  );
  const tieneFloracion = proyecto.paleta?.some((e) => e.floracion?.length);
  const Titulo = enModal ? "h2" : "h1";
  const nivelBloque = enModal ? "h3" : "h2";

  return (
    <article>
      <header className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          {meta.length > 0 && <p className="etiqueta text-gris">{meta.join(" · ")}</p>}
          <Titulo id="titulo-proyecto" className="titulo mt-4 text-4xl md:text-6xl">
            {proyecto.nombre}
          </Titulo>
        </div>
        {proyecto.resumen && (
          <p className="text-lg font-light leading-relaxed text-carbon/85 md:col-span-5">{proyecto.resumen}</p>
        )}
      </header>

      <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-arena md:mt-14">
        <Image
          src={proyecto.portada.src}
          alt={proyecto.portada.alt}
          fill
          preload
          sizes="(min-width: 1280px) 1100px, 100vw"
          className="object-cover"
        />
      </div>

      {proyecto.galeria?.length ? (
        <Bloque nivel={nivelBloque} titulo="Galería">
          <ul className="columns-2 gap-4 md:columns-3 md:gap-6">
            {proyecto.galeria.map((imagen) => (
              <li key={imagen.src} className="mb-4 break-inside-avoid md:mb-6">
                <Image
                  src={imagen.src}
                  alt={imagen.alt}
                  width={imagen.width}
                  height={imagen.height}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full bg-arena"
                />
              </li>
            ))}
          </ul>
        </Bloque>
      ) : null}

      {proyecto.antesDespues?.length ? (
        <Bloque nivel={nivelBloque} titulo="Antes y después">
          <div className="grid gap-10 md:grid-cols-2">
            {proyecto.antesDespues.map((par) => (
              <AntesDespues key={par.antes.src} par={par} sizes="(min-width: 768px) 50vw, 100vw" />
            ))}
          </div>
        </Bloque>
      ) : null}

      {proyecto.planos?.length ? (
        <Bloque nivel={nivelBloque} titulo="Plano y render">
          <div className="grid gap-6 md:grid-cols-2">
            {proyecto.planos.map((plano) => (
              <figure key={plano.src} className="bg-white p-3 md:p-5">
                <Image
                  src={plano.src}
                  alt={plano.alt}
                  width={plano.width}
                  height={plano.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="mt-3 text-sm text-gris">{plano.alt}</figcaption>
              </figure>
            ))}
          </div>
        </Bloque>
      ) : null}

      {proyecto.paleta?.length ? (
        <Bloque nivel={nivelBloque} titulo="Paleta vegetal">
          <PaletaVegetal especies={proyecto.paleta} />
        </Bloque>
      ) : null}

      {tieneFloracion && proyecto.paleta ? (
        <Bloque nivel={nivelBloque} titulo="Floración">
          <TablaFloracion especies={proyecto.paleta} />
        </Bloque>
      ) : null}

      <div className="mt-20 flex flex-col items-start gap-6 border-t border-piedra pt-12 md:flex-row md:items-center md:justify-between">
        <p className="titulo text-2xl md:text-3xl">¿Imaginas algo así para tu jardín?</p>
        <div className="flex flex-wrap gap-4">
          <Boton href="/agendar">Agendar visita</Boton>
          <Boton href="/cotizar" variante="contorno">
            Cotizar
          </Boton>
        </div>
      </div>
    </article>
  );
}

function Bloque({
  titulo,
  nivel: Nivel,
  children,
}: {
  titulo: string;
  nivel: "h2" | "h3";
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 md:mt-28">
      <Nivel className="etiqueta mb-8 border-b border-piedra pb-4 text-gris md:mb-10">{titulo}</Nivel>
      {children}
    </section>
  );
}
