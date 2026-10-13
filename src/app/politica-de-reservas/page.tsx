import type { Metadata } from "next";
import { getPoliticaReservas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de reservas y cancelación",
  alternates: { canonical: "/politica-de-reservas" },
};

export default async function PoliticaReservas() {
  const politica = await getPoliticaReservas();
  const fecha = new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(new Date(politica.actualizada));

  return (
    <div className="contenedor max-w-3xl! pb-28 pt-36 md:pb-40 md:pt-48">
      <p className="etiqueta text-gris">Actualizada el {fecha}</p>
      <h1 className="titulo mt-5 text-[clamp(2.1rem,5vw,3.75rem)]">{politica.titulo}</h1>
      <div className="mt-14 space-y-12">
        {politica.secciones.map((seccion) => (
          <section key={seccion.titulo}>
            <h2 className="etiqueta border-b border-piedra pb-3">{seccion.titulo}</h2>
            <div className="mt-5 space-y-4 text-lg font-light leading-relaxed">
              {seccion.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
