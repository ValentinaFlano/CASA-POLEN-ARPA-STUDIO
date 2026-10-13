"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Imagen } from "@/lib/types";

type Props = {
  imagen: Imagen;
  className?: string;
  sizes: string;
  /** Recorrido del desplazamiento en %, positivo = más lento que el scroll. */
  intensidad?: number;
  preload?: boolean;
};

/** Imagen que se desplaza levemente más lento que el scroll. */
export function ImagenParallax({ imagen, className = "", sizes, intensidad = 8, preload }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensidad}%`, `${intensidad}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={reducir ? undefined : { y, scale: 1 + (intensidad * 2.4) / 100 }}
      >
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
