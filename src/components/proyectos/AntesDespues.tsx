"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { AntesDespues as Par } from "@/lib/types";

type Props = {
  par: Par;
  sizes?: string;
  className?: string;
};

/**
 * Comparador antes/después. Se arrastra con el puntero o se controla con el
 * teclado (flechas, Inicio, Fin) gracias al input range accesible.
 */
export function AntesDespues({ par, sizes = "(min-width: 1024px) 60vw, 100vw", className = "" }: Props) {
  const [posicion, setPosicion] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const arrastrando = useRef(false);

  const moverA = useCallback((clientX: number) => {
    const caja = ref.current?.getBoundingClientRect();
    if (!caja) return;
    const pct = ((clientX - caja.left) / caja.width) * 100;
    setPosicion(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure className={className}>
      <div
        ref={ref}
        className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-arena sm:aspect-[4/3]"
        onPointerDown={(e) => {
          arrastrando.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moverA(e.clientX);
        }}
        onPointerMove={(e) => arrastrando.current && moverA(e.clientX)}
        onPointerUp={() => (arrastrando.current = false)}
        onPointerCancel={() => (arrastrando.current = false)}
      >
        <Image src={par.despues.src} alt={par.despues.alt} fill sizes={sizes} className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - posicion}% 0 0)` }}>
          <Image src={par.antes.src} alt={par.antes.alt} fill sizes={sizes} className="object-cover" draggable={false} />
        </div>

        <span className="etiqueta pointer-events-none absolute left-4 top-4 rounded-full bg-niebla/85 px-3 py-1.5 text-carbon">
          Antes
        </span>
        <span className="etiqueta pointer-events-none absolute right-4 top-4 rounded-full bg-niebla/85 px-3 py-1.5 text-carbon">
          Después
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-niebla"
          style={{ left: `${posicion}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-niebla text-carbon shadow-lg">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(posicion)}
          onChange={(e) => setPosicion(Number(e.target.value))}
          aria-label="Deslizar para comparar antes y después"
          aria-valuetext={`${Math.round(posicion)}% antes`}
          className="peer pointer-events-none absolute inset-0 size-full opacity-0"
        />
        <span className="pointer-events-none absolute inset-0 hidden ring-2 ring-inset ring-oliva peer-focus-visible:block" />
      </div>
      {par.leyenda && <figcaption className="mt-4 text-sm text-gris">{par.leyenda}</figcaption>}
    </figure>
  );
}
