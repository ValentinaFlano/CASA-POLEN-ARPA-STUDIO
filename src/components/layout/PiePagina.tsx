import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { enlaceInstagram, enlaceWhatsapp } from "@/lib/format";
import type { Ajustes } from "@/lib/types";
import { CTA_AGENDAR, NAVEGACION } from "./navegacion";

export function PiePagina({ ajustes }: { ajustes: Ajustes }) {
  const { contacto } = ajustes;
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-bosque text-niebla">
      <div className="contenedor grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-8 max-w-sm text-lg font-light leading-relaxed text-niebla/80">
            {ajustes.eslogan}.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="etiqueta text-niebla/60">Sitio</h2>
          <ul className="mt-6 space-y-3">
            {[...NAVEGACION, CTA_AGENDAR].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:underline-offset-4">
                  {item.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="etiqueta text-niebla/60">Contacto</h2>
          <ul className="mt-6 space-y-3">
            <li>
              <a
                href={enlaceWhatsapp(contacto.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                WhatsApp {contacto.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacto.email}`} className="break-all hover:underline hover:underline-offset-4">
                {contacto.email}
              </a>
            </li>
            <li>
              <a
                href={enlaceInstagram(contacto.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                Instagram @{contacto.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="contenedor flex flex-col gap-3 border-t border-niebla/15 py-8 text-sm text-niebla/60 md:flex-row md:justify-between">
        <p>
          © {anio} {ajustes.nombre}
        </p>
        <Link href="/politica-de-reservas" className="hover:text-niebla">
          Política de reservas y cancelación
        </Link>
      </div>
    </footer>
  );
}
