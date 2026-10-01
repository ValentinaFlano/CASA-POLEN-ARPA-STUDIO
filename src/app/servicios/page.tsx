import type { Metadata } from "next";
import Image from "next/image";
import { Aparecer } from "@/components/motion/Aparecer";
import { Boton } from "@/components/ui/Boton";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getAjustes, getServicios } from "@/lib/content";
import { precioServicio } from "@/lib/format";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Asesoría, mantención y diseño y construcción de jardines sostenibles de bajo consumo hídrico. Valores desde 1,5 UF.",
  alternates: { canonical: "/servicios" },
};

export default async function Servicios() {
  const [servicios, ajustes] = await Promise.all([getServicios(), getAjustes()]);

  return (
    <div className="pb-28 pt-36 md:pb-40 md:pt-48">
      <div className="contenedor">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta="Qué hacemos"
          titulo="Servicios"
          bajada="Acompañamos tu jardín en cada etapa: desde una asesoría puntual hasta el diseño, la construcción y su mantención en el tiempo."
        />
      </div>

      <div className="mt-16 md:mt-28">
        {servicios.map((servicio, i) => (
          <section
            key={servicio.slug}
            id={servicio.slug}
            aria-labelledby={`servicio-${servicio.slug}`}
            className="scroll-mt-24 border-t border-piedra py-16 md:py-24"
          >
            <div className="contenedor grid gap-10 md:grid-cols-12">
              <Aparecer className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-arena">
                  <Image
                    src={servicio.imagen.src}
                    alt={servicio.imagen.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Aparecer>
              <Aparecer
                retraso={0.12}
                className={`flex flex-col md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}
              >
                <p className="etiqueta text-gris">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`servicio-${servicio.slug}`} className="titulo mt-4 text-4xl md:text-5xl">
                  {servicio.nombre}
                </h2>
                <p className="mt-6 text-lg font-light leading-relaxed text-carbon/85">{servicio.descripcion}</p>

                <h3 className="etiqueta mt-10 text-gris">Qué incluye</h3>
                <ul className="mt-4 divide-y divide-piedra/70 border-y border-piedra/70">
                  {servicio.incluye.map((item) => (
                    <li key={item} className="flex gap-4 py-3.5 leading-relaxed">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-oliva" />
                      {item}
                    </li>
                  ))}
                </ul>

                {servicio.nota && (
                  <p className="mt-6 rounded-2xl bg-salvia/25 px-5 py-4 leading-relaxed text-bosque">{servicio.nota}</p>
                )}

                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="titulo text-2xl">{precioServicio(servicio)}</p>
                  <div className="flex flex-wrap gap-3">
                    <Boton href={`/cotizar?servicio=${servicio.slug}`}>Cotizar</Boton>
                    {servicio.agendable && (
                      <Boton href={`/agendar?tipo=${servicio.slug}`} variante="contorno">
                        Agendar visita
                      </Boton>
                    )}
                  </div>
                </div>
              </Aparecer>
            </div>
          </section>
        ))}
      </div>

      <p className="contenedor border-t border-piedra pt-8 text-sm text-gris">{ajustes.notaPrecios}</p>
    </div>
  );
}
