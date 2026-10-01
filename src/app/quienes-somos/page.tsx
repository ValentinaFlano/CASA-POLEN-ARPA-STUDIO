import type { Metadata } from "next";
import Image from "next/image";
import { CtaFinal } from "@/components/home/CtaFinal";
import { Aparecer } from "@/components/motion/Aparecer";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getAjustes, getEquipo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "María Jesús Marín, agrónoma UC, y Valentina Flaño, arquitecta UC: paisajismo sostenible con especies nativas y adaptadas.",
  alternates: { canonical: "/quienes-somos" },
};

export default async function QuienesSomos() {
  const [ajustes, equipo] = await Promise.all([getAjustes(), getEquipo()]);

  return (
    <>
      <div className="contenedor pb-24 pt-36 md:pb-36 md:pt-48">
        <EncabezadoSeccion
          nivel="h1"
          etiqueta="Quiénes somos"
          titulo="Agronomía y arquitectura al servicio del paisaje"
          bajada="Somos un equipo compuesto por María Jesús Marín y Valentina Flaño. Diseñamos, implementamos y mantenemos proyectos de paisaje y arquitectura, utilizando especies nativas y exóticas perfectamente adaptadas a las condiciones edafoclimáticas y a los requerimientos de cada cliente."
        />

        <ul className="mt-20 grid gap-14 md:mt-28 md:grid-cols-2 md:gap-10">
          {equipo.map((socia, i) => (
            <Aparecer as="li" key={socia.nombre} retraso={i * 0.15} className={i === 1 ? "md:mt-32" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden bg-arena">
                <Image
                  src={socia.foto.src}
                  alt={socia.foto.alt}
                  fill
                  preload
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="titulo mt-8 text-3xl md:text-4xl">{socia.nombre}</h2>
              <p className="etiqueta mt-4 text-oliva">{socia.profesion}</p>
              <p className="mt-3 leading-relaxed text-carbon/80">{socia.titulos}</p>
            </Aparecer>
          ))}
        </ul>
      </div>

      <section aria-labelledby="mision" className="bg-arena/60 py-24 md:py-36">
        <div className="contenedor grid gap-10 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <p className="etiqueta text-gris">Misión</p>
          </Aparecer>
          <Aparecer className="md:col-span-9" retraso={0.1}>
            <h2 id="mision" className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-light leading-[1.2]">
              {ajustes.mision}
            </h2>
            <p className="mt-10 max-w-xl text-sm text-gris">
              Edafoclimático: relativo a las características del suelo y del clima de una determinada zona.
            </p>
          </Aparecer>
        </div>
      </section>

      <CtaFinal imagen={ajustes.hero.imagen} />
    </>
  );
}
