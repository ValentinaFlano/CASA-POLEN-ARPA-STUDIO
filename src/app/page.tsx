import Image from "next/image";
import { CtaFinal } from "@/components/home/CtaFinal";
import { Hero } from "@/components/home/Hero";
import { Aparecer } from "@/components/motion/Aparecer";
import { AntesDespues } from "@/components/proyectos/AntesDespues";
import { TarjetaProyecto } from "@/components/proyectos/TarjetaProyecto";
import { TarjetaServicio } from "@/components/servicios/TarjetaServicio";
import { Boton, Flecha } from "@/components/ui/Boton";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import {
  getAjustes,
  getAntesDespuesDestacado,
  getEquipo,
  getProyectosDestacados,
  getServicios,
} from "@/lib/content";

export default async function Inicio() {
  const [ajustes, servicios, destacados, antesDespues, equipo] = await Promise.all([
    getAjustes(),
    getServicios(),
    getProyectosDestacados(4),
    getAntesDespuesDestacado(),
    getEquipo(),
  ]);

  return (
    <>
      <Hero hero={ajustes.hero} titulo={ajustes.eslogan} bajada={ajustes.descripcion} />

      {/* Manifiesto */}
      <section aria-labelledby="manifiesto" className="contenedor py-28 md:py-44">
        <div className="grid gap-12 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <p className="etiqueta text-gris">Nuestra misión</p>
          </Aparecer>
          <div className="md:col-span-9">
            <Aparecer>
              <h2 id="manifiesto" className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-light leading-[1.2] tracking-[-0.005em]">
                {ajustes.mision}
              </h2>
            </Aparecer>
            <Aparecer retraso={0.15} className="mt-12 grid gap-8 border-t border-piedra pt-8 sm:grid-cols-3">
              {[
                ["Bajo consumo hídrico", "Especies y riego pensados para la escasez de agua."],
                ["Biodiversidad", "Jardines que atraen polinizadores y fauna local."],
                ["Adaptado al lugar", "Diseño según el suelo y el clima de cada terreno."],
              ].map(([titulo, texto]) => (
                <div key={titulo}>
                  <h3 className="etiqueta">{titulo}</h3>
                  <p className="mt-3 font-light leading-relaxed text-carbon/80">{texto}</p>
                </div>
              ))}
            </Aparecer>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section aria-labelledby="servicios-titulo" className="bg-arena/60 py-24 md:py-36">
        <div className="contenedor">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <EncabezadoSeccion id="servicios-titulo" etiqueta="Qué hacemos" titulo="Servicios" />
            <Aparecer>
              <p className="max-w-sm text-sm text-gris">{ajustes.notaPrecios}</p>
            </Aparecer>
          </div>
          <ul className="mt-14 grid gap-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-10">
            {servicios.map((servicio, i) => (
              <Aparecer as="li" key={servicio.slug} retraso={i * 0.12}>
                <TarjetaServicio servicio={servicio} numero={i + 1} notaPrecios={ajustes.notaPrecios} />
              </Aparecer>
            ))}
          </ul>
        </div>
      </section>

      {/* Proyectos */}
      <section aria-labelledby="proyectos-titulo" className="contenedor py-24 md:py-40">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Aparecer className="max-w-4xl">
            <h2 id="proyectos-titulo" className="titulo text-[clamp(2.1rem,5vw,4.25rem)]">
              Proyectos realizados
            </h2>
            <p className="mt-4 text-xl font-light text-carbon/80 md:text-2xl">
              Paisajes responsables con el medio ambiente
            </p>
          </Aparecer>
          <Aparecer>
            <Boton href="/proyectos" variante="texto">
              Ver todos los proyectos <Flecha />
            </Boton>
          </Aparecer>
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12">
          {destacados.map((proyecto, i) => {
            const layout = [
              "md:col-span-7",
              "md:col-span-5 md:mt-40",
              "md:col-span-5",
              "md:col-span-6 md:col-start-7 md:mt-16",
            ][i % 4];
            const proporcion = i % 3 === 0 ? "aspect-[4/3]" : "aspect-[4/5]";
            return (
              <Aparecer as="li" key={proyecto.slug} className={layout} retraso={(i % 2) * 0.12}>
                <TarjetaProyecto
                  proyecto={proyecto}
                  proporcion={proporcion}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </Aparecer>
            );
          })}
        </ul>
      </section>

      {/* Antes y después */}
      {antesDespues && (
        <section aria-labelledby="antes-despues" className="bg-bosque py-24 text-niebla md:py-36">
          <div className="contenedor grid items-center gap-14 md:grid-cols-12">
            <Aparecer className="md:col-span-4">
              <p className="etiqueta text-niebla/70">Antes y después</p>
              <h2 id="antes-despues" className="titulo mt-5 text-[clamp(2.1rem,4.5vw,3.75rem)]">
                El mismo lugar, otro ecosistema
              </h2>
              <p className="mt-6 font-light leading-relaxed text-niebla/80">
                Desliza para comparar. {antesDespues.proyecto.resumen}
              </p>
              <Boton href={`/proyectos/${antesDespues.proyecto.slug}`} variante="claro" className="mt-10">
                Ver proyecto
              </Boton>
            </Aparecer>
            <Aparecer className="md:col-span-7 md:col-start-6" retraso={0.15}>
              <AntesDespues par={antesDespues.par} />
            </Aparecer>
          </div>
        </section>
      )}

      {/* Quiénes somos */}
      <section aria-labelledby="equipo-titulo" className="contenedor py-24 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="grid grid-cols-2 gap-4 md:col-span-6 md:gap-6">
            {equipo.map((socia, i) => (
              <Aparecer key={socia.nombre} retraso={i * 0.15} className={i === 1 ? "mt-16 md:mt-24" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden bg-arena">
                  <Image
                    src={socia.foto.src}
                    alt={socia.foto.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4">{socia.nombre}</p>
                <p className="text-sm text-gris">{socia.profesion}</p>
              </Aparecer>
            ))}
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <EncabezadoSeccion
              etiqueta="Quiénes somos"
              titulo="Agronomía y arquitectura"
              bajada="Somos María Jesús Marín y Valentina Flaño. Unimos el conocimiento de las plantas y del suelo con el diseño del espacio para crear jardines que funcionan con el clima, no contra él."
            />
            <Aparecer retraso={0.2}>
              <Boton href="/quienes-somos" variante="contorno" className="mt-10">
                Conócenos
              </Boton>
            </Aparecer>
          </div>
        </div>
      </section>


      <CtaFinal imagen={ajustes.hero.imagen} />
    </>
  );
}
