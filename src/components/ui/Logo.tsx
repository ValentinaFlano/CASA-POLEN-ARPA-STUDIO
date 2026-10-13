/**
 * Logotipo provisorio en texto. Reemplazar por el archivo vectorial (SVG)
 * del sello circular de Casa Polen cuando esté disponible.
 */
export function Logo({ className = "" }: { className?: string }) {
  const linea = "block text-lg font-normal uppercase tracking-[0.14em] md:text-xl";
  return (
    <span className={`flex flex-col leading-[1.15] ${className}`}>
      <span className={linea}>Casa Polen</span>
      <span className={linea}>&amp; Arpa Studio</span>
    </span>
  );
}
