import type { Metadata } from "next";
import Link from "next/link";
import { Aparecer } from "@/components/motion/Aparecer";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getAjustes, getServicios } from "@/lib/content";
import { enlaceWhatsapp, formatoUF } from "@/lib/format";

export const metadata: Metadata = {
  title: "Agendar visita a terreno",
  description: "Agenda una visita a terreno de asesoría o una visita inicial de diseño y construcción.",
  alternates: { canonical: "/agendar" },
};

/*
 * Fase 1: la agenda en línea aún no está conectada. Mientras tanto, cada tipo
 * de visita abre WhatsApp con un mensaje listo. En la Fase 3 esta página
 * muestra el calendario con horarios disponibles.
 */
export default async function Agendar({ searchParams }: PageProps<"/agendar">) {
  const [{ tipo }, ajustes, servicios] = await Promise.all([searchParams, getAjustes(), getServicios()]);
  const agendables = servicios.filter((s) => s.agendable);

  return (
    <div className="contenedor pb-28 pt-36 md:pb-40 md:pt-48">
      <EncabezadoSeccion
        nivel="h1"
        etiqueta="Visita a terreno"
        titulo="Agendar visita"
        bajada="Elige el tipo de visita. Muy pronto podrás escoger día y hora directamente en nuestro calendario; por ahora coordinamos contigo por WhatsApp."
      />

      <ul className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2">
        {agendables.map((servicio, i) => {
          const nombre = servicio.precio.etiqueta ? `${servicio.precio.etiqueta} · ${servicio.nombre}` : servicio.nombre;
          const seleccionado = tipo === servicio.slug;
          return (
            <Aparecer as="li" key={servicio.slug} retraso={i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-8 md:p-10 ${
                  seleccionado ? "border-bosque bg-white/70" : "border-piedra"
                }`}
              >
                <h2 className="titulo text-3xl">{nombre}</h2>
                <p className="mt-4 flex-1 font-light leading-relaxed text-carbon/85">{servicio.descripcion}</p>
                <p className="etiqueta mt-8 text-oliva">Desde {formatoUF(servicio.precio.desdeUF)}</p>
                <a
                  href={enlaceWhatsapp(
                    ajustes.contacto.whatsapp,
                    `Hola, quiero agendar una visita de ${nombre.toLowerCase()}. Mi comuna es: `,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="etiqueta mt-8 inline-flex min-h-13 items-center justify-center rounded-full bg-bosque px-8 text-niebla transition-colors duration-500 hover:bg-noche"
                >
                  Coordinar por WhatsApp
                </a>
              </div>
            </Aparecer>
          );
        })}
      </ul>

      <div className="mt-12 space-y-3 text-sm text-gris">
        <p>{ajustes.mensajeReservaPendiente}</p>
        <p>
          {ajustes.notaPrecios}{" "}
          <Link href="/politica-de-reservas" className="text-carbon underline underline-offset-4">
            Política de reservas y cancelación
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
