import type { Imagen, Proyecto } from "@/lib/types";

/*
 * Proyectos de demostración armados con las imágenes de "Valores 2025".
 * Nombres, ubicaciones y años son provisorios: reemplázalos por los reales.
 * Cada proyecto muestra solo los bloques que tenga: galería, antes y después
 * y planos o renders.
 */

const img = (ruta: string, alt: string, width: number, height: number): Imagen => ({
  // Rutas que empiezan con "/" se toman desde public/; el resto, desde las fotos de demostración
  src: ruta.startsWith("/") ? ruta : `/demo/proyectos/${ruta}`,
  alt,
  width,
  height,
});

export const proyectos: Proyecto[] = [
  {
    slug: "spa-utah",
    nombre: "Spa en Utah",
    ubicacion: "Utah, EE. UU.",
    resumen:
      "Paisajismo para un spa en el paisaje árido de Utah. Rocas, gramíneas y especies de clima seco integran el edificio y su cubierta verde con el cerro, con un jardín que necesita muy poco riego.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("/proyectos/spa-utah/terraza.jpg", "Render de la terraza del spa bajo vigas de madera, junto a rocas y gramíneas", 2000, 1401),
    galeria: [
      img("/proyectos/spa-utah/vista-general.jpg", "Render del spa con cubierta verde integrado al cerro, rodeado de agaves y arbustos", 2000, 891),
      img("/proyectos/spa-utah/piscina.jpg", "Render de la piscina y el jardín de flores silvestres frente a las montañas", 2000, 985),
    ],
  },
  {
    slug: "jardin-de-cactaceas",
    nombre: "Jardín de cactáceas",
    resumen:
      "Una ladera de pasto con alto consumo de riego se transformó en un jardín seco de cactáceas y suculentas, con bordes curvos de acero, piedra de río y gravilla que conservan la humedad del suelo.",
    servicio: "diseno-construccion",
    destacado: true,
    portada: img("/proyectos/jardin-de-cactaceas/portada.jpg", "Jardín de cactáceas y suculentas sobre gravilla y piedra de río frente a un muro de piedra", 1440, 978),
    galeria: [
      img("/proyectos/jardin-de-cactaceas/aeonium.jpg", "Rosetas de Aeonium verde sobre piedra de río", 685, 913),
      img("/proyectos/jardin-de-cactaceas/anigozanthos.jpg", "Flores rosadas de Anigozanthos entre cactus columnares y piedra de río", 685, 913),
      img("/proyectos/jardin-de-cactaceas/agave.jpg", "Agave junto a una roca, con cactus columnares y Aeonium al fondo", 685, 913),
    ],
    antesDespues: [
      {
        antes: img("/proyectos/jardin-de-cactaceas/antes.jpg", "Ladera de pasto seco antes de la intervención", 921, 625),
        despues: img("/proyectos/jardin-de-cactaceas/portada.jpg", "La misma ladera convertida en jardín seco de cactáceas", 1440, 978),
        leyenda: "De pasto a jardín seco",
      },
    ],
    planos: [img("cactaceas/plano.jpg", "Plano del jardín con piedra Agatha y gravilla 3/8", 491, 340)],
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
    planos: [img("parque-costero/lamina.jpg", "Lámina con render y módulos de plantación", 462, 707)],
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
      img("entrada-sol/plano.jpg", "Planta de arquitectura del paisaje", 450, 340),
    ],
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
