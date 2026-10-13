"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

/**
 * Capa modal para la vista ampliada de un proyecto (ruta interceptada).
 * Cierra con Escape, clic fuera o el botón; atrapa el foco mientras está abierta.
 */
export function Modal({ children, etiquetaId }: { children: React.ReactNode; etiquetaId: string }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const cerrar = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const previo = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key !== "Tab" || !panel.current) return;
      const enfocables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!enfocables.length) return;
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    window.addEventListener("keydown", alTeclado);

    return () => {
      window.removeEventListener("keydown", alTeclado);
      document.documentElement.style.overflow = "";
      lenis?.start();
      previo?.focus?.();
    };
  }, [cerrar, lenis]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-noche/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={cerrar}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={etiquetaId}
        tabIndex={-1}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-6 overflow-y-auto overscroll-contain rounded-t-3xl bg-niebla outline-none md:inset-x-6 md:top-10 lg:inset-x-[max(1.5rem,calc((100vw-80rem)/2))]"
        initial={{ y: "8%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-10 flex justify-end bg-linear-to-b from-niebla via-niebla/90 to-transparent px-5 pb-6 pt-5 md:px-10">
          <button
            type="button"
            onClick={cerrar}
            className="etiqueta flex min-h-11 items-center gap-3 rounded-full border border-carbon/30 px-5 transition-colors hover:bg-carbon hover:text-niebla"
          >
            Cerrar
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="px-5 pb-20 md:px-10 lg:px-16">{children}</div>
      </motion.div>
    </div>
  );
}
