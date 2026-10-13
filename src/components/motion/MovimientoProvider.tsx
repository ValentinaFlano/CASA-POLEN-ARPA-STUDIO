"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

/**
 * Scroll suave (Lenis) y configuración global de animaciones.
 * Con prefers-reduced-motion no se monta Lenis y Motion omite los
 * desplazamientos (reducedMotion="user").
 */
export function MovimientoProvider({ children }: { children: React.ReactNode }) {
  const reducir = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!reducir && <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }} />}
      {children}
    </MotionConfig>
  );
}
