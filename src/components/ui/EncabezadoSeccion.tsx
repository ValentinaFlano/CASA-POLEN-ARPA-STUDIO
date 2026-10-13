import { Aparecer } from "@/components/motion/Aparecer";

type Props = {
  etiqueta: string;
  titulo: string;
  bajada?: string;
  nivel?: "h1" | "h2";
  className?: string;
};

export function EncabezadoSeccion({ etiqueta, titulo, bajada, nivel = "h2", className = "" }: Props) {
  const Titulo = nivel;
  return (
    <Aparecer className={`max-w-4xl ${className}`}>
      <p className="etiqueta text-gris">{etiqueta}</p>
      <Titulo className="titulo mt-5 text-[clamp(2.1rem,5vw,4.25rem)]">{titulo}</Titulo>
      {bajada && <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-carbon/85">{bajada}</p>}
    </Aparecer>
  );
}
