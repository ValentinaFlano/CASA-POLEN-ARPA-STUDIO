import type { Ajustes } from "@/lib/types";

/**
 * Datos generales del sitio: contacto, textos de marca y avisos.
 * Para cambiar el WhatsApp, el correo o Instagram, edita solo este archivo.
 */
export const ajustes: Ajustes = {
  nombre: "Casa Polen & Arpa Studio",
  eslogan: "Jardines sostenibles ante la escasez hídrica",
  descripcion:
    "Diseñamos, implementamos y mantenemos proyectos de paisaje con especies nativas y exóticas adaptadas a las condiciones edafoclimáticas de cada lugar.",
  mision:
    "Regenerar ecosistemas a través del diseño de paisajes sostenibles, de bajo consumo hídrico, que fomenten la biodiversidad y mejoren la calidad de vida de las personas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hero: {
    imagen: {
      src: "/demo/hero.jpg",
      alt: "Jardín seco con agaves, suculentas y cactus columnares sobre gravilla",
      width: 555,
      height: 806,
    },
    // video: { webm: "/video/hero.webm", mp4: "/video/hero.mp4" },
  },
  contacto: {
    whatsapp: "+56 9 9804 2718",
    email: "valentinaflanoi22@gmail.com",
    instagram: "arpa.studio_",
  },
  notaPrecios: "Valores netos. Varían según ubicación y metros cuadrados.",
  mensajeReservaPendiente:
    "Tu reserva queda pendiente hasta confirmar el pago. Te enviaremos los datos por correo o WhatsApp.",
};
