import { z } from "zod";

export const TIPOS_SERVICIO = [
  { valor: "asesoria", nombre: "Asesoría" },
  { valor: "mantencion", nombre: "Mantención" },
  { valor: "diseno-construccion", nombre: "Diseño y construcción" },
] as const;

export const PREFERENCIAS_CONTACTO = ["WhatsApp", "Correo", "Llamada"] as const;

export const MAX_FOTOS = 6;
export const MAX_MB_FOTO = 8;

const opcional = (s: z.ZodString) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), s.optional());

/** Validación compartida entre el formulario (cliente) y la acción (servidor). */
export const esquemaCotizacion = z.object({
  servicio: z.enum(["asesoria", "mantencion", "diseno-construccion"], {
    error: "Elige el tipo de servicio.",
  }),
  comuna: z.string().trim().min(2, "Indica la comuna del terreno.").max(80),
  metros: z.preprocess(
    (v) => (v === "" || v == null ? undefined : Number(v)),
    z
      .number({ error: "Ingresa un número aproximado." })
      .positive("Ingresa un número mayor a 0.")
      .max(1_000_000, "Revisa los metros cuadrados.")
      .optional(),
  ),
  descripcion: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más sobre tu jardín (mínimo 10 caracteres).")
    .max(3000, "Máximo 3.000 caracteres."),
  presupuesto: opcional(z.string().trim().max(120)),
  nombre: z.string().trim().min(2, "Ingresa tu nombre.").max(120),
  email: z.email("Revisa tu correo.").max(160),
  telefono: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{8,20}$/, "Ingresa un teléfono válido, ej. +56 9 1234 5678."),
  contactoPreferido: z.enum(PREFERENCIAS_CONTACTO).default("WhatsApp"),
});

export type Cotizacion = z.infer<typeof esquemaCotizacion>;

export type EstadoCotizacion =
  | { estado: "inicial" }
  | { estado: "error"; mensaje: string; campos?: Partial<Record<keyof Cotizacion, string>>; valores?: Record<string, string> }
  | { estado: "enviada"; nombre: string };
