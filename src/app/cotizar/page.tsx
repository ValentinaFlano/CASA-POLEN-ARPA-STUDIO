import type { Metadata } from "next";
import { FormularioCotizacion } from "@/components/cotizar/FormularioCotizacion";
import { Aparecer } from "@/components/motion/Aparecer";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getAjustes } from "@/lib/content";
import { TIPOS_SERVICIO } from "@/lib/cotizacion";
import { enlaceWhatsapp } from "@/lib/format";
import { cotizacionEnLinea } from "@/lib/servidor/funciones";

export const metadata: Metadata = {
  title: "Cotizar",
  description:
    "Solicita una cotización de asesoría, mantención o diseño y construcción de un jardín sostenible de bajo consumo hídrico.",
  alternates: { canonical: "/cotizar" },
};

export default async function Cotizar({ searchParams }: PageProps<"/cotizar">) {
  const [{ servicio }, ajustes] = await Promise.all([searchParams, getAjustes()]);
  const enLinea = cotizacionEnLinea();
  const nombreServicio = TIPOS_SERVICIO.find((t) => t.valor === servicio)?.nombre;
  const mensajeWhatsapp = nombreServicio
    ? `Hola, quiero cotizar ${nombreServicio.toLowerCase()} para mi jardín.`
    : "Hola, quiero cotizar un proyecto de jardín.";

  return (
    <div className="contenedor grid gap-16 pb-28 pt-36 md:pb-40 md:pt-48 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <EncabezadoSeccion
            nivel="h1"
            etiqueta="Cotización"
            titulo="Cuéntanos de tu jardín"
            bajada="Con estos datos preparamos una propuesta a tu medida. Te respondemos por el medio que prefieras."
          />
          {enLinea && (
            <p className="mt-10 text-sm leading-relaxed text-gris">
              ¿Prefieres conversar?{" "}
              <a
                href={enlaceWhatsapp(ajustes.contacto.whatsapp, mensajeWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-carbon underline underline-offset-4"
              >
                Escríbenos por WhatsApp
              </a>
              .
            </p>
          )}
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        {enLinea ? (
          <FormularioCotizacion servicioInicial={typeof servicio === "string" ? servicio : undefined} />
        ) : (
          // Mientras el formulario en línea no esté activo, se cotiza por WhatsApp o correo.
          <Aparecer className="rounded-3xl bg-arena/70 p-8 md:p-12">
            <p className="etiqueta text-oliva">Muy pronto en línea</p>
            <h2 className="titulo mt-5 text-3xl md:text-4xl">Cotiza por WhatsApp o correo</h2>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed">
              Estamos preparando el formulario de cotización. Mientras tanto, escríbenos y te respondemos con una
              propuesta. Para cotizar más rápido, cuéntanos:
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                `El servicio que buscas: ${TIPOS_SERVICIO.map((t) => t.nombre.toLowerCase()).join(", ")}.`,
                "La comuna del terreno y sus metros cuadrados aproximados.",
                "Qué tienes hoy y qué te gustaría lograr.",
                "Algunas fotos del terreno.",
              ].map((item) => (
                <li key={item} className="flex gap-4 leading-relaxed">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-oliva" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={enlaceWhatsapp(ajustes.contacto.whatsapp, mensajeWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="etiqueta inline-flex min-h-13 items-center justify-center rounded-full bg-bosque px-8 text-niebla transition-colors duration-500 hover:bg-noche"
              >
                Escribir por WhatsApp
              </a>
              <a
                href={`mailto:${ajustes.contacto.email}?subject=${encodeURIComponent(
                  nombreServicio ? `Cotización: ${nombreServicio}` : "Cotización de jardín",
                )}`}
                className="etiqueta inline-flex min-h-12 items-center justify-center rounded-full border border-carbon/40 px-8 transition-colors duration-500 hover:bg-carbon hover:text-niebla"
              >
                Enviar correo
              </a>
            </div>
          </Aparecer>
        )}
      </div>
    </div>
  );
}
