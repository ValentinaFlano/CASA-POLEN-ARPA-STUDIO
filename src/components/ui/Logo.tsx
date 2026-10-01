/**
 * Logotipo provisorio en texto. Reemplazar por el archivo vectorial (SVG)
 * del sello circular de Casa Polen cuando esté disponible.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="text-[0.95rem] font-normal uppercase tracking-[0.14em] md:text-base">
        Casa Polen
      </span>
      <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em] opacity-75">
        &amp; Arpa Studio
      </span>
    </span>
  );
}
