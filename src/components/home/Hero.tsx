"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Ajustes } from "@/lib/types";

type Props = { hero: Ajustes["hero"]; titulo: string; bajada: string };

const subir = {
  oculto: { opacity: 0, y: "0.6em" },
  visible: { opacity: 1, y: 0 },
};

export function Hero({ hero, titulo, bajada }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMedia = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const conVideo = !reducir && Boolean(hero.video?.mp4 || hero.video?.webm);

  return (
    <section
      ref={ref}
      aria-label="Presentación"
      className="relative h-svh min-h-[34rem] overflow-hidden bg-noche text-niebla"
    >
      <motion.div className="absolute inset-0" style={reducir ? undefined : { y: yMedia }}>
        {conVideo ? (
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.imagen.src}
            aria-hidden="true"
          >
            {hero.video?.webm && <source src={hero.video.webm} type="video/webm" />}
            {hero.video?.mp4 && <source src={hero.video.mp4} type="video/mp4" />}
          </video>
        ) : (
          <div className="absolute inset-0 ken-burns">
            <Image
              src={hero.imagen.src}
              alt={hero.imagen.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
        )}
      </motion.div>

      {/* Neblina de marca + sombra inferior para legibilidad */}
      <div aria-hidden="true" className="absolute inset-0 bg-niebla/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-noche/40 via-noche/15 to-noche/85" />

      <motion.div
        className="contenedor relative flex h-full flex-col justify-end pb-20 md:pb-24"
        style={reducir ? undefined : { opacity: opacidadTexto }}
        initial="oculto"
        animate="visible"
        transition={{ staggerChildren: 0.14, delayChildren: 0.25 }}
      >
        <motion.p variants={subir} transition={{ duration: 1 }} className="etiqueta text-niebla/80">
          Paisajismo sostenible · Chile
        </motion.p>
        <h1 className="titulo mt-6 max-w-[22ch] text-[clamp(2.2rem,5.4vw,5.25rem)]">
          {titulo.split(" ").map((palabra, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{ oculto: { y: "105%" }, visible: { y: 0 } }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.07 }}
              >
                {palabra}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          variants={subir}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-7 max-w-xl text-lg font-light leading-relaxed text-niebla/90 md:text-xl"
        >
          {bajada}
        </motion.p>
        <motion.div
          variants={subir}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8"
        >
          <Link
            href="/agendar"
            className="etiqueta inline-flex min-h-13 items-center justify-center rounded-full bg-niebla px-8 text-noche transition-colors duration-500 hover:bg-white"
          >
            Agendar visita a terreno
          </Link>
          <Link
            href="/proyectos"
            className="etiqueta inline-flex min-h-12 items-center justify-center underline decoration-niebla/40 underline-offset-8 transition-colors hover:decoration-niebla"
          >
            Ver proyectos
          </Link>
        </motion.div>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-0 right-5 hidden h-20 w-px overflow-hidden md:right-10 md:block">
        <span className="linea-scroll block h-full w-full bg-niebla/70" />
      </div>
    </section>
  );
}
