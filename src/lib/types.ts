/**
 * Modelo de contenido del sitio.
 *
 * Estos tipos reflejan los esquemas que tendrá Sanity en la Fase 2: hoy el
 * contenido vive en `src/content/*` y se lee a través de `src/lib/content.ts`;
 * al conectar Sanity solo cambia esa capa de lectura, no los componentes.
 */

export type Imagen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Estacion = "primavera" | "verano" | "otono" | "invierno";

export type Especie = {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  foto?: Imagen;
  /** Color aproximado de la flor, usado en la tabla de floración. */
  colorFlor?: string;
  /** Estaciones en que florece. Vacío u omitido = no se muestra en la tabla. */
  floracion?: Estacion[];
  nativa?: boolean;
};

export type AntesDespues = {
  antes: Imagen;
  despues: Imagen;
  leyenda?: string;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  ubicacion?: string;
  anio?: number;
  resumen?: string;
  servicio?: ServicioSlug;
  portada: Imagen;
  destacado?: boolean;
  /** Bloques opcionales: el proyecto muestra solo los que tenga cargados. */
  galeria?: Imagen[];
  antesDespues?: AntesDespues[];
  planos?: Imagen[];
  paleta?: Especie[];
};

export type ServicioSlug = "asesoria" | "mantencion" | "diseno-construccion";

export type Servicio = {
  slug: ServicioSlug;
  nombre: string;
  bajada: string;
  descripcion: string;
  incluye: string[];
  nota?: string;
  precio: {
    desdeUF: number;
    /** Ej. "Visita inicial". Se antepone a "desde X UF". */
    etiqueta?: string;
  };
  imagen: Imagen;
  /** Si se puede agendar una visita de este servicio en línea. */
  agendable: boolean;
};

export type Socia = {
  nombre: string;
  profesion: string;
  titulos: string;
  foto: Imagen;
};

export type Ajustes = {
  nombre: string;
  eslogan: string;
  descripcion: string;
  mision: string;
  url: string;
  hero: {
    imagen: Imagen;
    /** Video corto en loop, sin audio (< 5 MB). Si no hay, se usa la imagen. */
    video?: { mp4?: string; webm?: string };
  };
  contacto: {
    /** En formato internacional, con o sin espacios: +56 9 9804 2718 */
    whatsapp: string;
    email: string;
    instagram: string;
  };
  notaPrecios: string;
  mensajeReservaPendiente: string;
};

export type Politica = {
  titulo: string;
  actualizada: string;
  secciones: { titulo: string; parrafos: string[] }[];
};
