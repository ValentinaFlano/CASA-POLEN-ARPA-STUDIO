/**
 * Modelo de contenido del sitio.
 *
 * El contenido vive en `src/content/*` y se lee solo a través de
 * `src/lib/content.ts`. Si en el futuro se suma un panel de administración,
 * basta con cambiar esa capa de lectura, no los componentes.
 */

export type Imagen = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
};

export type ServicioSlug = "asesoria" | "mantencion" | "diseno-construccion";

export type Servicio = {
  slug: ServicioSlug;
  nombre: string;
  bajada: string;
  descripcion: string;
  incluye: string[];
  nota?: string;
  /** Oferta destacada del servicio, ej. pack semestral de mantención. */
  pack?: { texto: string; detalle: string };
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
