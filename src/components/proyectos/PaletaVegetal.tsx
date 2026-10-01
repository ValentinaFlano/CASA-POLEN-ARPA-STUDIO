import Image from "next/image";
import type { Especie } from "@/lib/types";

export function PaletaVegetal({ especies }: { especies: Especie[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {especies.map((especie) => (
        <li key={especie.id} className="flex flex-col items-start gap-3">
          <div
            className="relative size-20 overflow-hidden rounded-full bg-arena md:size-24"
            style={!especie.foto && especie.colorFlor ? { backgroundColor: especie.colorFlor } : undefined}
          >
            {especie.foto ? (
              <Image src={especie.foto.src} alt={especie.foto.alt} fill sizes="96px" className="object-cover" />
            ) : (
              <HojaIcono />
            )}
          </div>
          <div>
            <p className="leading-snug">{especie.nombreComun}</p>
            <p className="text-sm italic text-gris">{especie.nombreCientifico}</p>
            {especie.nativa && <p className="etiqueta mt-1 text-[0.62rem] text-oliva">Nativa</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function HojaIcono() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="absolute inset-0 m-auto size-9 text-noche/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M10 38C10 20 22 10 38 10c0 16-10 28-28 28Z" />
      <path d="M10 38 30 18" />
    </svg>
  );
}
