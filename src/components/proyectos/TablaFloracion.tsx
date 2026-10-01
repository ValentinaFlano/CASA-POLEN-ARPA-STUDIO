import { ESTACIONES } from "@/lib/format";
import type { Especie } from "@/lib/types";

/** Tabla de floración por estación, coloreada con el color de cada flor. */
export function TablaFloracion({ especies }: { especies: Especie[] }) {
  const conFlor = especies.filter((e) => e.floracion?.length);
  if (!conFlor.length) return null;

  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <caption className="sr-only">Época de floración por especie</caption>
        <thead>
          <tr className="border-b border-piedra">
            <th scope="col" className="etiqueta py-3 pr-4 font-semibold text-gris">
              Especie
            </th>
            {ESTACIONES.map((est) => (
              <th key={est.id} scope="col" className="w-[15%] px-1 py-3 text-center">
                <span className="etiqueta block text-gris">{est.nombre}</span>
                <span className="block text-xs text-gris/80">{est.meses}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {conFlor.map((especie) => (
            <tr key={especie.id} className="border-b border-piedra/60">
              <th scope="row" className="py-3 pr-4 font-normal">
                <span className="block">{especie.nombreComun}</span>
                <span className="block text-xs italic text-gris">{especie.nombreCientifico}</span>
              </th>
              {ESTACIONES.map((est) => {
                const florece = especie.floracion?.includes(est.id);
                return (
                  <td key={est.id} className="px-1 py-3">
                    <span
                      className="block h-3 rounded-full"
                      style={{
                        backgroundColor: florece ? (especie.colorFlor ?? "var(--color-salvia)") : "transparent",
                      }}
                    />
                    <span className="sr-only">{florece ? "Florece" : "Sin flor"}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
