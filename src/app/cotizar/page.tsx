import type { Metadata } from "next";
import { FormularioCotizacion } from "@/components/cotizar/FormularioCotizacion";
import { EncabezadoSeccion } from "@/components/ui/EncabezadoSeccion";
import { getAjustes } from "@/lib/content";
import { enlaceWhatsapp } from "@/lib/format";

export const metadata: Metadata = {
  title: "Cotizar",
  description:
    "Solicita una cotización de asesoría, mantención o diseño y construcción de un jardín sostenible de bajo consumo hídrico.",
  alternates: { canonical: "/cotizar" },
};

export default async function Cotizar({ searchParams }: PageProps<"/cotizar">) {
  const [{ servicio }, ajustes] = await Promise.all([searchParams, getAjustes()]);

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
          <p className="mt-10 text-sm leading-relaxed text-gris">
            ¿Prefieres conversar?{" "}
            <a
              href={enlaceWhatsapp(ajustes.contacto.whatsapp, "Hola, quiero cotizar un proyecto de jardín.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-carbon underline underline-offset-4"
            >
              Escríbenos por WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <FormularioCotizacion servicioInicial={typeof servicio === "string" ? servicio : undefined} />
      </div>
    </div>
  );
}
