import type { Servicio } from "@/lib/types";

export const servicios: Servicio[] = [
  {
    slug: "asesoria",
    nombre: "Asesoría",
    bajada: "Una mirada experta para transformar tu jardín hacia uno eficiente en agua.",
    descripcion:
      "Visitamos tu jardín y revisamos contigo cómo guiar su manejo y transformación hacia un paisaje eficiente en el uso de agua.",
    incluye: [
      "Selección de especies vegetales adecuadas.",
      "Guía y propuesta de mejoras en sistemas de riego eficiente.",
      "Propuesta de cambio de zonificación del jardín buscando mayor sostenibilidad.",
      "Orientación de mantenimiento para el correcto desarrollo vegetal según cada estación.",
      "Documento resumen con lo revisado y los detalles para la correcta mantención.",
    ],
    precio: { desdeUF: 1.5 },
    imagen: {
      src: "/demo/proyectos/cactaceas/detalle-3.jpg",
      alt: "Agave sobre cubierta de piedras de río en un jardín de bajo consumo hídrico",
      width: 255,
      height: 341,
    },
    agendable: true,
  },
  {
    slug: "mantencion",
    nombre: "Mantención",
    bajada: "Mantención profunda para el máximo desarrollo de tu jardín.",
    descripcion:
      "Cuidamos tu jardín con un plan de mantención profunda pensado para su desarrollo a largo plazo.",
    incluye: [
      "Riego eficiente: ajuste del riego según las necesidades de cada zona.",
      "Poda para mantener la forma y salud de las plantas.",
      "Control de plagas: inspección y tratamiento de enfermedades.",
      "Fertilización y manejo del suelo para mejorar su estructura.",
      "Control de maleza y cuidado estacional.",
    ],
    nota: "Otoño e invierno son la época ideal para una mantención profunda.",
    precio: { desdeUF: 4 },
    imagen: {
      src: "/demo/proyectos/cactaceas/detalle-2.jpg",
      alt: "Cactus columnares y flores rosadas junto a un muro de piedra",
      width: 242,
      height: 340,
    },
    agendable: false,
  },
  {
    slug: "diseno-construccion",
    nombre: "Diseño y construcción",
    bajada: "Diseñamos y ejecutamos jardines de bajo requerimiento hídrico.",
    descripcion:
      "Proyectamos y construimos tu jardín como un ecosistema adaptado a ti y a tu lugar, desde la visita inicial hasta la plantación.",
    incluye: [
      "Jardines de bajo requerimiento hídrico.",
      "Ecosistemas que contribuyen a una mayor biodiversidad.",
      "Ahorro de agua y recursos.",
      "Un ecosistema adaptado a cada cliente y lugar.",
      "Menor gasto en riego y mantención a largo plazo.",
    ],
    precio: { desdeUF: 1.5, etiqueta: "Visita inicial" },
    imagen: {
      src: "/demo/proyectos/cactaceas/plano.jpg",
      alt: "Plano de diseño de un jardín de cactáceas con piedra y gravilla",
      width: 491,
      height: 340,
    },
    agendable: true,
  },
];
