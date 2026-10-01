import type { Especie } from "@/lib/types";

/*
 * Especies transcritas de las láminas de "Valores 2025". Son contenido de
 * demostración: nombres y floración deben revisarse antes de publicar.
 * Cada especie se carga una vez y se reutiliza en todos los proyectos.
 */

const foto = (archivo: string, alt: string) => ({
  src: `/demo/especies/${archivo}.jpg`,
  alt,
  width: 60,
  height: 60,
});

const lista = [
  // Jardín de cactáceas
  { id: "opuntia", nombreComun: "Tuna", nombreCientifico: "Opuntia sp.", foto: foto("opuntia", "Paletas de Opuntia") },
  { id: "aeonium-negro", nombreComun: "Aeonium negro", nombreCientifico: "Aeonium sp.", foto: foto("aeonium-negro", "Rosetas oscuras de Aeonium") },
  { id: "aeonium-verde", nombreComun: "Aeonium", nombreCientifico: "Aeonium sp.", foto: foto("aeonium-verde", "Rosetas verdes de Aeonium") },
  { id: "echinopsis-oxygona", nombreComun: "Echinopsis", nombreCientifico: "Echinopsis oxygona", foto: foto("echinopsis-oxygona", "Cactus globosos de Echinopsis") },
  { id: "echinopsis-pachanoi", nombreComun: "San Pedro", nombreCientifico: "Echinopsis pachanoi", foto: foto("echinopsis-pachanoi", "Cactus columnar San Pedro") },
  { id: "euphorbia", nombreComun: "Euphorbia", nombreCientifico: "Euphorbia sp.", foto: foto("euphorbia", "Euphorbia columnar") },
  { id: "agave-attenuata", nombreComun: "Agave", nombreCientifico: "Agave attenuata", foto: foto("agave-attenuata", "Roseta de Agave attenuata") },
  { id: "santolina", nombreComun: "Santolina", nombreCientifico: "Santolina chamaecyparissus", foto: foto("santolina", "Santolina con flores amarillas"), colorFlor: "#e8c84a", floracion: ["verano"] },
  { id: "anigozanthos-rosado", nombreComun: "Anigozanthos rosado", nombreCientifico: "Anigozanthos 'Dwarf Pink'", foto: foto("anigozanthos-dwarf-pink", "Flores rosadas de Anigozanthos"), colorFlor: "#d7739f", floracion: ["otono", "invierno", "primavera", "verano"] },
  { id: "pennisetum-rubrum", nombreComun: "Pennisetum rojo", nombreCientifico: "Pennisetum setaceum 'Rubrum'", foto: foto("pennisetum-rubrum", "Espigas rojizas de Pennisetum") },

  // Parque costero
  { id: "colliguay", nombreComun: "Colliguay", nombreCientifico: "Colliguaja odorifera", nativa: true, colorFlor: "#e9a35b", floracion: ["primavera"] },
  { id: "stipa", nombreComun: "Stipa", nombreCientifico: "Nassella tenuissima", colorFlor: "#ecd27a", floracion: ["primavera"] },
  { id: "lobelia", nombreComun: "Tupa", nombreCientifico: "Lobelia excelsa", nativa: true, colorFlor: "#d8603f", floracion: ["primavera", "verano"] },
  { id: "verbena-chilena", nombreComun: "Verbena chilena", nombreCientifico: "Glandularia berteroi", nativa: true, colorFlor: "#a48ccf", floracion: ["otono", "primavera", "verano"] },
  { id: "malvilla", nombreComun: "Malvilla de cerro", nombreCientifico: "Sphaeralcea obtusiloba", nativa: true, colorFlor: "#d79ac4", floracion: ["primavera", "verano"] },
  { id: "palo-de-yegua", nombreComun: "Palo de yegua", nombreCientifico: "Fuchsia lycioides", nativa: true, colorFlor: "#d2509d", floracion: ["primavera", "verano"] },
  { id: "limonium", nombreComun: "Limonium", nombreCientifico: "Limonium perezii", colorFlor: "#8f7cc8", floracion: ["primavera", "verano"] },
  { id: "erigeron", nombreComun: "Erigeron", nombreCientifico: "Erigeron karvinskianus", colorFlor: "#e6b9d3", floracion: ["otono", "invierno", "primavera", "verano"] },
  { id: "alstroemeria-magnifica", nombreComun: "Alstroemeria", nombreCientifico: "Alstroemeria magnifica var. sierrae", nativa: true, colorFlor: "#b7a1dd", floracion: ["primavera"] },
  { id: "solanum", nombreComun: "Solanum", nombreCientifico: "Solanum pinnatum", nativa: true, colorFlor: "#9d8fd6", floracion: ["primavera", "verano"] },

  // Sector entrada – sol
  { id: "rhus-crenata", nombreComun: "Rhus", nombreCientifico: "Rhus crenata" },
  { id: "alstroemeria-iris", nombreComun: "Alstroemeria / Iris", nombreCientifico: "Alstroemeria / Iris germanica", colorFlor: "#ecd27a", floracion: ["primavera", "verano"] },
  { id: "dietes-grandiflora", nombreComun: "Dietes", nombreCientifico: "Dietes grandiflora", colorFlor: "#d4d4d0", floracion: ["primavera"] },
  { id: "strelitzia", nombreComun: "Ave del paraíso", nombreCientifico: "Strelitzia reginae", colorFlor: "#f1c7a4", floracion: ["verano"] },
  { id: "verbena-bonariensis", nombreComun: "Verbena", nombreCientifico: "Verbena bonariensis", colorFlor: "#a48ccf", floracion: ["otono", "primavera", "verano"] },
  { id: "jazmin", nombreComun: "Jazmín", nombreCientifico: "Jasminum polyanthum", colorFlor: "#ecc9d8", floracion: ["invierno", "primavera"] },

  // Oficinas Pucalán
  { id: "rosa-trepadora", nombreComun: "Rosa trepadora", nombreCientifico: "Rosa 'Pierre de Ronsard'", colorFlor: "#ecc0d6", floracion: ["primavera", "verano"] },
  { id: "gaura", nombreComun: "Gaura", nombreCientifico: "Gaura lindheimeri", colorFlor: "#d9d6d0", floracion: ["otono", "primavera", "verano"] },
  { id: "stipa-gigante", nombreComun: "Stipa gigante", nombreCientifico: "Stipa gigantea", colorFlor: "#f0dcae", floracion: ["primavera", "verano"] },
  { id: "ruby-grass", nombreComun: "Ruby grass", nombreCientifico: "Melinis nerviglumis", colorFlor: "#f0dcae", floracion: ["primavera", "verano"] },
  { id: "anigozanthos-lila", nombreComun: "Anigozanthos lila", nombreCientifico: "Anigozanthos 'Landscape Lilac'", colorFlor: "#c3b2dc", floracion: ["otono", "invierno", "primavera", "verano"] },
  { id: "allium", nombreComun: "Ajo ornamental", nombreCientifico: "Allium ampeloprasum", colorFlor: "#ecc0d6", floracion: ["primavera", "verano"] },
  { id: "achillea", nombreComun: "Achillea rosada", nombreCientifico: "Achillea millefolium", colorFlor: "#d9558f", floracion: ["otono", "verano"] },
  { id: "dietes-bicolor", nombreComun: "Dietes", nombreCientifico: "Dietes bicolor", colorFlor: "#f0dcae", floracion: ["primavera", "verano"] },
  { id: "mioporo", nombreComun: "Mioporo rastrero", nombreCientifico: "Myoporum parvifolium", colorFlor: "#d9d6d0", floracion: ["primavera"] },
  { id: "olivo", nombreComun: "Olivo", nombreCientifico: "Olea europaea", colorFlor: "#c9d6c0", floracion: ["primavera"] },
] satisfies Especie[];

export type EspecieId = (typeof lista)[number]["id"];

const porId = new Map<string, Especie>(lista.map((e) => [e.id, e]));

/** Devuelve las especies en el orden pedido. */
export function especies(...ids: EspecieId[]): Especie[] {
  return ids.map((id) => porId.get(id)!);
}
