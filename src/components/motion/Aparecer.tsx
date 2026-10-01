"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Retraso en segundos, para escalonar elementos. */
  retraso?: number;
  /** Desplazamiento vertical inicial en px. */
  desde?: number;
  as?: "div" | "li" | "section" | "article" | "figure" | "p" | "h2";
};

/** Aparición sutil al entrar en pantalla: fundido y leve ascenso. */
export function Aparecer({ children, className, retraso = 0, desde = 28, as = "div" }: Props) {
  const Componente = motion[as];
  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y: desde }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay: retraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Componente>
  );
}
