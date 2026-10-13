"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Flecha } from "@/components/ui/Boton";
import { precioServicio } from "@/lib/format";
import type { Servicio } from "@/lib/types";

/**
 * Botón "Qué incluye" que abre el detalle del servicio en un modal.
 * Usa <dialog> nativo: atrapa el foco, cierra con Escape y devuelve el foco al botón.
 */
export function ModalServicio({ servicio, notaPrecios }: { servicio: Servicio; notaPrecios: string }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);
  const lenis = useLenis();
  const tituloId = useId();

  // Bloquea el scroll de la página mientras el modal está abierto
  useEffect(() => {
    if (!abierto) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [abierto, lenis]);

  const cerrar = () => dialogo.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dialogo.current?.showModal();
          setAbierto(true);
        }}
        className="etiqueta inline-flex min-h-11 cursor-pointer items-center gap-2 hover:text-oliva"
      >
        Qué incluye <Flecha />
      </button>

      <dialog
        ref={dialogo}
        aria-labelledby={tituloId}
        onClose={() => setAbierto(false)}
        // Clic fuera del panel (sobre el fondo) cierra el modal
        onClick={(e) => e.target === e.currentTarget && cerrar()}
        data-lenis-prevent
        className="m-auto max-h-[90dvh] w-[min(42rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-3xl bg-niebla p-0 text-carbon shadow-2xl backdrop:bg-noche/60 backdrop:backdrop-blur-sm open:animate-[aparecer-modal_0.5s_var(--ease-organico)]"
      >
        <div className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h2 id={tituloId} className="titulo text-3xl md:text-4xl">
              {servicio.nombre}
            </h2>
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-carbon/30 transition-colors hover:bg-carbon hover:text-niebla"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <p className="mt-5 text-lg font-light leading-relaxed text-carbon/85">{servicio.descripcion}</p>

          {servicio.pack && (
            <div className="mt-6 rounded-2xl bg-salvia/30 px-5 py-4 text-bosque">
              <p className="font-semibold">{servicio.pack.texto}</p>
              <p className="mt-1.5 leading-relaxed">{servicio.pack.detalle}</p>
            </div>
          )}

          <h3 className="etiqueta mt-8 text-gris">Qué incluye</h3>
          <ul className="mt-3 divide-y divide-piedra/70 border-y border-piedra/70">
            {servicio.incluye.map((item) => (
              <li key={item} className="flex gap-4 py-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-oliva" />
                {item}
              </li>
            ))}
          </ul>

          {servicio.nota && <p className="mt-5 text-sm text-gris">{servicio.nota}</p>}

          <div className="mt-8 flex flex-col gap-5 border-t border-piedra pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="titulo text-xl">{precioServicio(servicio)}</p>
              <p className="mt-1 text-xs text-gris">{notaPrecios}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/cotizar?servicio=${servicio.slug}`}
                className="etiqueta inline-flex min-h-12 items-center justify-center rounded-full bg-bosque px-7 text-niebla transition-colors duration-500 hover:bg-noche"
              >
                Cotizar
              </Link>
              {servicio.agendable && (
                <Link
                  href={`/agendar?tipo=${servicio.slug}`}
                  className="etiqueta inline-flex min-h-12 items-center justify-center rounded-full border border-carbon/40 px-7 transition-colors duration-500 hover:bg-carbon hover:text-niebla"
                >
                  Agendar visita
                </Link>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
