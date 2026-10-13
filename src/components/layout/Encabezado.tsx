"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/ui/Logo";
import { CTA_AGENDAR, NAVEGACION } from "./navegacion";

export function Encabezado() {
  const ruta = usePathname();
  const sobreHero = ruta === "/";
  const [scrolleado, setScrolleado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let ultimo = window.scrollY;
    const alScroll = () => {
      const y = window.scrollY;
      setScrolleado(y > 24);
      setOculto(y > 320 && y > ultimo + 2);
      if (y < ultimo - 2) setOculto(false);
      ultimo = y;
    };
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  // Cerrar el menú al cambiar de página
  const [rutaMenu, setRutaMenu] = useState(ruta);
  if (rutaMenu !== ruta) {
    setRutaMenu(ruta);
    setMenuAbierto(false);
  }

  useEffect(() => {
    if (menuAbierto) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menuAbierto ? "hidden" : "";
    const alTeclado = (e: KeyboardEvent) => e.key === "Escape" && setMenuAbierto(false);
    window.addEventListener("keydown", alTeclado);
    return () => window.removeEventListener("keydown", alTeclado);
  }, [menuAbierto, lenis]);

  const transparente = sobreHero && !scrolleado && !menuAbierto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color] duration-700 ease-(--ease-organico) ${
        oculto && !menuAbierto ? "-translate-y-full" : "translate-y-0"
      } ${transparente ? "bg-transparent text-niebla" : "bg-niebla/90 text-carbon backdrop-blur-md"}`}
    >
      <a
        href="#contenido"
        className="etiqueta sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-niebla focus:px-4 focus:py-2 focus:text-carbon"
      >
        Saltar al contenido
      </a>
      <div className="contenedor flex h-18 items-center justify-between md:h-22">
        <Link href="/" aria-label="Casa Polen & Arpa Studio, inicio" className="relative z-50">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {NAVEGACION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ruta.startsWith(item.href) ? "page" : undefined}
              className="etiqueta relative py-2 opacity-90 transition-opacity hover:opacity-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-px aria-[current=page]:after:bg-current"
            >
              {item.nombre}
            </Link>
          ))}
          <Link
            href={CTA_AGENDAR.href}
            className={`etiqueta rounded-full border px-5 py-3 transition-colors duration-500 ${
              transparente
                ? "border-niebla/60 hover:bg-niebla hover:text-noche"
                : "border-bosque bg-bosque text-niebla hover:bg-noche"
            }`}
          >
            Agendar visita
          </Link>
        </nav>

        <button
          type="button"
          className="etiqueta relative z-50 flex min-h-11 items-center gap-3 lg:hidden"
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          {menuAbierto ? "Cerrar" : "Menú"}
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${menuAbierto ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${menuAbierto ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col bg-niebla px-5 pb-10 pt-28 text-carbon lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav aria-label="Menú" className="flex flex-1 flex-col gap-2">
              {NAVEGACION.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} className="titulo block py-2 text-4xl sm:text-5xl">
                    {item.nombre}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href={CTA_AGENDAR.href}
              className="etiqueta flex min-h-14 items-center justify-center rounded-full bg-bosque px-6 text-niebla"
            >
              {CTA_AGENDAR.nombre}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
