import type { Metadata } from "next";
import { Aparecer } from "@/components/motion/Aparecer";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getProyectos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Jardines de bajo consumo hídrico diseñados, construidos y mantenidos por Casa Polen & Arpa Studio: galerías, antes y después, planos y paletas vegetales.",
  alternates: { canonical: "/proyectos" },
};

export default async function Proyectos() {
  const proyectos = await getProyectos();

  return (
    <div className="contenedor pb-28 pt-36 md:pb-40 md:pt-48">
      <EncabezadoSeccion
        nivel="h1"
        etiqueta="Proyectos realizados"
        titulo="Proyectos"
        bajada="Cada jardín parte del suelo, el clima y el agua disponible. Abre un proyecto para ver su galería, el antes y después, los planos y su paleta vegetal."
      />

      <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
        {proyectos.map((proyecto, i) => (
          <Aparecer as="li" key={proyecto.slug} retraso={(i % 3) * 0.1}>
            <TarjetaProyecto
              proyecto={proyecto}
              proporcion="aspect-[4/5]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              preload={i < 3}
            />
          </Aparecer>
        ))}
      </ul>
    </div>
  );
}
