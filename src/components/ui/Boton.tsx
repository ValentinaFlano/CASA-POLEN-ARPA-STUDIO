import Link from "next/link";

type Variante = "solido" | "contorno" | "claro" | "texto";

const estilos: Record<Variante, string> = {
  solido: "bg-bosque text-niebla hover:bg-noche",
  contorno: "border border-carbon/40 text-carbon hover:border-carbon hover:bg-carbon hover:text-niebla",
  claro: "bg-niebla/95 text-noche hover:bg-white",
  texto: "px-0! text-carbon underline decoration-carbon/30 underline-offset-8 hover:decoration-carbon",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  className?: string;
  externo?: boolean;
};

export function Boton({ href, children, variante = "solido", className = "", externo }: Props) {
  const clases = `etiqueta inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-center transition-colors duration-500 ${estilos[variante]} ${className}`;

  if (externo) {
    return (
      <a href={href} className={clases} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

export function Flecha({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
