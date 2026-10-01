import type { Imagen, Proyecto } from "@/lib/types";
import { especies } from "./especies";

/*
 * Proyectos de demostración armados con las imágenes de "Valores 2025".
 * Nombres, ubicaciones y años son provisorios: se reemplazan al cargar los
 * proyectos reales en Sanity.
 */

const img = (ruta: string, alt: string, width: number, height: number): Imagen => ({
  src: `/demo/proyectos/${ruta}`,
  alt,
  width,
  height,
});

export const proyectos: Proyecto[] = [
  {
    slug: "jardin-de-cactaceas",
    nombre: "Jardín de cactáceas",
    resumen:
      "Una ladera de pasto con alto consumo de riego se transformó en un jardín seco de cactáceas y suculentas, con bordes curvos de acero, piedra de río y gravilla que conservan la humedad del suelo.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("cactaceas/portada.jpg", "Jardín de cactáceas y suculentas sobre gravilla frente a un muro de piedra", 524, 291),
    galeria: [
      img("cactaceas/detalle-1.jpg", "Cactus columnares y Aeonium junto a bordes de acero", 255, 341),
      img("cactaceas/detalle-3.jpg", "Agave sobre piedras de río", 255, 341),
      img("cactaceas/detalle-2.jpg", "Flores rosadas entre cactus", 242, 340),
      img("cactaceas/detalle-4.jpg", "Transición entre gravilla y piedra de río", 242, 341),
      img("cactaceas/proceso-1.jpg", "Instalación de malla antimaleza y bordes", 511, 336),
      img("cactaceas/proceso-3.jpg", "Plantación de cactus sobre la nueva base", 509, 341),
    ],
    antesDespues: [
      {
        antes: img("cactaceas/antes.jpg", "Ladera de pasto antes de la intervención", 248, 292),
        despues: img("cactaceas/detalle-1.jpg", "La misma ladera convertida en jardín seco", 255, 341),
        leyenda: "De pasto a jardín seco",
      },
    ],
    planos: [img("cactaceas/plano.jpg", "Plano del jardín con piedra Agatha y gravilla 3/8", 491, 340)],
    paleta: especies(
      "opuntia",
      "aeonium-negro",
      "aeonium-verde",
      "echinopsis-oxygona",
      "echinopsis-pachanoi",
      "euphorbia",
      "agave-attenuata",
      "santolina",
      "anigozanthos-rosado",
      "pennisetum-rubrum",
    ),
  },
  {
    slug: "acceso-florido",
    nombre: "Acceso florido",
    resumen: "Platabandas de tierra desnuda a lo largo del acceso se plantaron con perennes de flor y bajo riego.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("acceso-florido/despues.jpg", "Sendero de acceso con platabandas floridas", 308, 360),
    antesDespues: [
      {
        antes: img("acceso-florido/antes.jpg", "Sendero de acceso con tierra desnuda", 308, 359),
        despues: img("acceso-florido/despues.jpg", "Sendero de acceso con perennes en flor", 308, 360),
      },
    ],
  },
  {
    slug: "parque-costero",
    nombre: "Parque costero",
    resumen:
      "Propuesta de paisaje para un borde costero con especies nativas y adaptadas, organizadas en módulos de plantación con floración escalonada durante el año.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("parque-costero/portada.jpg", "Render de un parque costero con senderos y plantaciones", 420, 212),
    planos: [img("parque-costero/lamina.jpg", "Lámina con render, módulos de plantación y fichas de especies", 462, 707)],
    paleta: especies(
      "colliguay",
      "stipa",
      "lobelia",
      "verbena-chilena",
      "malvilla",
      "palo-de-yegua",
      "limonium",
      "erigeron",
      "alstroemeria-magnifica",
      "solanum",
    ),
  },
  {
    slug: "ladera-de-suculentas",
    nombre: "Ladera de suculentas",
    resumen: "Un talud seco se cubrió con suculentas y cactáceas sobre gravilla, sin necesidad de riego frecuente.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("ladera-suculentas/despues.jpg", "Aeonium oscuro en primer plano sobre una ladera seca", 308, 359),
    antesDespues: [
      {
        antes: img("ladera-suculentas/antes.jpg", "Ladera seca con tierra suelta", 308, 359),
        despues: img("ladera-suculentas/despues.jpg", "Ladera plantada con suculentas", 308, 359),
      },
    ],
  },
  {
    slug: "sector-entrada-sol",
    nombre: "Sector entrada – Sol",
    resumen: "Diseño de platabandas al sol en el acceso de una vivienda, con trepadoras, perennes y gramíneas de bajo riego.",
    servicio: "diseno-construccion",
    portada: img("entrada-sol/render.jpg", "Render del acceso con platabandas plantadas", 356, 217),
    planos: [
      img("entrada-sol/render.jpg", "Render del acceso con platabandas plantadas", 356, 217),
      img("entrada-sol/plano.jpg", "Planta de arquitectura del paisaje con simbología de especies", 450, 340),
    ],
    paleta: especies(
      "rhus-crenata",
      "santolina",
      "alstroemeria-iris",
      "dietes-grandiflora",
      "strelitzia",
      "verbena-chilena",
      "verbena-bonariensis",
      "jazmin",
    ),
  },
  {
    slug: "oficinas-pucalan",
    nombre: "Oficinas Pucalán",
    ubicacion: "Pucalán",
    resumen: "Paleta vegetal para el perímetro de unas oficinas: gramíneas, perennes y un olivo como hito.",
    servicio: "diseno-construccion",
    portada: img("pucalan/lamina.jpg", "Lámina de la paleta vegetal de Oficinas Pucalán", 456, 785),
    planos: [img("pucalan/lamina.jpg", "Planta, fotos de especies y fechas de floración", 456, 785)],
    paleta: especies(
      "rosa-trepadora",
      "rhus-crenata",
      "gaura",
      "stipa-gigante",
      "ruby-grass",
      "anigozanthos-lila",
      "anigozanthos-rosado",
      "allium",
      "achillea",
      "dietes-bicolor",
      "mioporo",
      "olivo",
    ),
  },
  {
    slug: "patio-de-gravilla",
    nombre: "Patio de gravilla",
    resumen: "Un patio de maceteros sobre gravilla se reordenó con huellas de piedra y especies de bajo riego.",
    servicio: "mantencion",
    portada: img("patio-gravilla/despues.jpg", "Patio de gravilla con huellas de piedra y maceteros", 308, 359),
    antesDespues: [
      {
        antes: img("patio-gravilla/antes.jpg", "Patio de gravilla con maceteros dispersos", 308, 359),
        despues: img("patio-gravilla/despues.jpg", "Patio ordenado con huellas de piedra", 308, 359),
      },
    ],
  },
  {
    slug: "patio-con-jardinera",
    nombre: "Patio con jardinera",
    resumen: "Una explanada de tierra se convirtió en un patio de gravilla y baldosas con jardinera central.",
    servicio: "diseno-construccion",
    portada: img("patio-jardinera/despues.jpg", "Patio de gravilla con jardinera de hormigón", 409, 359),
    antesDespues: [
      {
        antes: img("patio-jardinera/antes.jpg", "Explanada de tierra durante el trazado", 403, 365),
        despues: img("patio-jardinera/despues.jpg", "Patio terminado con jardinera central", 409, 359),
      },
    ],
  },
];
