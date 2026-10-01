"use client";

import Image from "next/image";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { crearUrlsSubida, enviarCotizacion } from "@/app/cotizar/actions";
import {
  MAX_FOTOS,
  MAX_MB_FOTO,
  PREFERENCIAS_CONTACTO,
  TIPOS_FOTO,
  TIPOS_SERVICIO,
  validarCotizacion,
  valoresDeFormulario,
  type EstadoCotizacion,
} from "@/lib/cotizacion";

const inicial: EstadoCotizacion = { estado: "inicial" };

/** Sube una foto con la URL firmada de Supabase (mismo formato que supabase-js). */
async function subirFoto(url: string, archivo: File) {
  const cuerpo = new FormData();
  cuerpo.append("cacheControl", "3600");
  cuerpo.append("", archivo);
  try {
    const respuesta = await fetch(url, { method: "PUT", body: cuerpo, headers: { "x-upsert": "false" } });
    return respuesta.ok;
  } catch {
    return false;
  }
}

export function FormularioCotizacion({ servicioInicial }: { servicioInicial?: string }) {
  const fotosRef = useRef<File[]>([]);
  const [paso, setPaso] = useState<"enviando" | "subiendo">("enviando");

  const [estado, accion, enviando] = useActionState(
    async (previo: EstadoCotizacion, formData: FormData): Promise<EstadoCotizacion> => {
      // Validación en el navegador antes de subir fotos
      const valores = valoresDeFormulario(formData);
      const validacion = validarCotizacion(valores);
      if (!validacion.ok) {
        return { estado: "error", mensaje: "Revisa los campos marcados.", campos: validacion.campos, valores };
      }

      const archivos = fotosRef.current;
      if (archivos.length) {
        setPaso("subiendo");
        const permiso = await crearUrlsSubida(archivos.map((a) => ({ tipo: a.type, tamano: a.size })));
        if (permiso.ok) {
          const resultados = await Promise.all(permiso.subidas.map((s, i) => subirFoto(s.url, archivos[i])));
          permiso.subidas.forEach((s, i) => resultados[i] && formData.append("fotos", s.ruta));
        }
        setPaso("enviando");
      }
      return enviarCotizacion(previo, formData);
    },
    inicial,
  );
  const errores = estado.estado === "error" ? (estado.campos ?? {}) : {};
  const valores = estado.estado === "error" ? (estado.valores ?? {}) : {};
  const resumenRef = useRef<HTMLDivElement>(null);
  const exitoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (estado.estado === "error") resumenRef.current?.focus();
    if (estado.estado === "enviada") exitoRef.current?.focus();
  }, [estado]);

  if (estado.estado === "enviada") {
    return (
      <div ref={exitoRef} tabIndex={-1} role="status" className="rounded-3xl bg-salvia/25 p-8 outline-none md:p-14">
        <p className="etiqueta text-oliva">Solicitud recibida</p>
        <h2 className="titulo mt-5 text-3xl md:text-5xl">Gracias{estado.nombre ? `, ${estado.nombre}` : ""}</h2>
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed">
          Revisaremos tu solicitud y te contactaremos dentro de los próximos días hábiles con una propuesta.
        </p>
      </div>
    );
  }

  const servicio = valores.servicio ?? servicioInicial ?? "";

  return (
    <form action={accion} noValidate className="space-y-14" aria-describedby="nota-obligatorios">
      {estado.estado === "error" && (
        <div
          ref={resumenRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border border-aeonium/40 bg-aeonium/5 px-5 py-4 text-aeonium outline-none"
        >
          {estado.mensaje}
        </div>
      )}
      <p id="nota-obligatorios" className="text-sm text-gris">
        Los campos marcados con * son obligatorios.
      </p>

      {/* Campo trampa anti-spam */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          No completar
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="etiqueta mb-5 text-gris">1. Tipo de servicio *</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {TIPOS_SERVICIO.map((tipo) => (
            <label
              key={tipo.valor}
              className="relative flex min-h-16 cursor-pointer items-center rounded-2xl border border-piedra bg-white/60 px-5 py-4 transition-colors has-checked:border-bosque has-checked:bg-bosque has-checked:text-niebla has-focus-visible:outline-2 has-focus-visible:outline-oliva"
            >
              <input
                type="radio"
                name="servicio"
                value={tipo.valor}
                defaultChecked={servicio === tipo.valor}
                className="sr-only"
                aria-describedby={errores.servicio ? "error-servicio" : undefined}
              />
              {tipo.nombre}
            </label>
          ))}
        </div>
        <Error id="error-servicio" mensaje={errores.servicio} />
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="etiqueta mb-5 text-gris">2. Tu terreno</legend>
        <Campo nombre="comuna" etiqueta="Comuna *" error={errores.comuna} defecto={valores.comuna} autoComplete="address-level2" />
        <Campo
          nombre="metros"
          etiqueta="Metros cuadrados aproximados"
          error={errores.metros}
          defecto={valores.metros}
          tipo="number"
          inputMode="numeric"
          ayuda="Si no sabes, déjalo en blanco."
        />
        <div className="md:col-span-2">
          <Campo
            nombre="descripcion"
            etiqueta="Cuéntanos sobre tu jardín *"
            error={errores.descripcion}
            defecto={valores.descripcion}
            multilinea
            ayuda="Qué tienes hoy, qué te gustaría lograr, si hay riego, sol o sombra."
          />
        </div>
        <div className="md:col-span-2">
          <SelectorFotos alCambiar={(archivos) => (fotosRef.current = archivos)} />
        </div>
        <div className="md:col-span-2">
          <Campo
            nombre="presupuesto"
            etiqueta="Presupuesto aproximado"
            error={errores.presupuesto}
            defecto={valores.presupuesto}
            ayuda="Opcional. Nos ayuda a ajustar la propuesta."
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="etiqueta mb-5 text-gris">3. Tus datos</legend>
        <div className="md:col-span-2">
          <Campo nombre="nombre" etiqueta="Nombre *" error={errores.nombre} defecto={valores.nombre} autoComplete="name" />
        </div>
        <Campo nombre="email" etiqueta="Correo *" error={errores.email} defecto={valores.email} tipo="email" autoComplete="email" />
        <Campo
          nombre="telefono"
          etiqueta="Teléfono *"
          error={errores.telefono}
          defecto={valores.telefono}
          tipo="tel"
          autoComplete="tel"
          placeholder="+56 9 1234 5678"
        />
        <fieldset className="md:col-span-2">
          <legend className="mb-3 text-sm">¿Cómo prefieres que te contactemos?</legend>
          <div className="flex flex-wrap gap-3">
            {PREFERENCIAS_CONTACTO.map((pref) => (
              <label
                key={pref}
                className="flex min-h-11 cursor-pointer items-center rounded-full border border-piedra px-5 transition-colors has-checked:border-bosque has-checked:bg-bosque has-checked:text-niebla has-focus-visible:outline-2 has-focus-visible:outline-oliva"
              >
                <input
                  type="radio"
                  name="contactoPreferido"
                  value={pref}
                  defaultChecked={(valores.contactoPreferido ?? "WhatsApp") === pref}
                  className="sr-only"
                />
                {pref}
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      <div className="flex flex-col gap-5 border-t border-piedra pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-gris">
          No entregamos precio automático: revisamos cada solicitud y te enviamos una propuesta.
        </p>
        <button
          type="submit"
          disabled={enviando}
          className="etiqueta inline-flex min-h-13 items-center justify-center rounded-full bg-bosque px-10 text-niebla transition-colors duration-500 hover:bg-noche disabled:opacity-60"
        >
          {enviando ? (paso === "subiendo" ? "Subiendo fotos…" : "Enviando…") : "Enviar solicitud"}
        </button>
      </div>
    </form>
  );
}

type CampoProps = {
  nombre: string;
  etiqueta: string;
  error?: string;
  defecto?: string;
  tipo?: string;
  multilinea?: boolean;
  ayuda?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function Campo({ nombre, etiqueta, error, defecto, tipo = "text", multilinea, ayuda, placeholder, autoComplete, inputMode }: CampoProps) {
  const id = useId();
  const descritoPor = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const clases =
    "mt-2 block w-full rounded-xl border bg-white/70 px-4 py-3.5 text-base text-carbon placeholder:text-gris/60 transition-colors focus:border-bosque focus:outline-none focus-visible:outline-2 focus-visible:outline-oliva " +
    (error ? "border-aeonium" : "border-piedra");

  return (
    <div>
      <label htmlFor={id} className="text-sm">
        {etiqueta}
      </label>
      {multilinea ? (
        <textarea
          id={id}
          name={nombre}
          rows={5}
          defaultValue={defecto}
          aria-invalid={Boolean(error)}
          aria-describedby={descritoPor}
          className={clases}
        />
      ) : (
        <input
          id={id}
          name={nombre}
          type={tipo}
          defaultValue={defecto}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={descritoPor}
          className={clases}
        />
      )}
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-2 text-sm text-gris">
          {ayuda}
        </p>
      )}
      <Error id={`${id}-error`} mensaje={error} />
    </div>
  );
}

function Error({ id, mensaje }: { id: string; mensaje?: string }) {
  if (!mensaje) return null;
  return (
    <p id={id} className="mt-2 text-sm text-aeonium">
      {mensaje}
    </p>
  );
}

/**
 * Selección de fotos con vista previa. El input no tiene `name`: las fotos se
 * suben directo a Supabase Storage con URLs firmadas, sin pasar por la acción
 * del servidor (que tiene límite de tamaño).
 */
function SelectorFotos({ alCambiar }: { alCambiar: (archivos: File[]) => void }) {
  const id = useId();
  const [fotos, setFotos] = useState<{ url: string; nombre: string }[]>([]);
  const [aviso, setAviso] = useState("");

  useEffect(() => () => fotos.forEach((f) => URL.revokeObjectURL(f.url)), [fotos]);

  return (
    <div>
      <label htmlFor={id} className="text-sm">
        Fotos del terreno <span className="text-gris">(opcional, hasta {MAX_FOTOS})</span>
      </label>
      <label
        htmlFor={id}
        className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-piedra bg-white/50 px-4 py-6 text-center text-sm text-gris transition-colors hover:border-oliva has-focus-visible:outline-2"
      >
        <span className="etiqueta text-carbon">Elegir fotos</span>
        <span>JPG, PNG o HEIC, máximo {MAX_MB_FOTO} MB cada una</span>
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-describedby={aviso ? `${id}-aviso` : undefined}
          onChange={(e) => {
            const archivos = [...(e.target.files ?? [])];
            const validos = archivos
              .filter((a) => TIPOS_FOTO.includes(a.type) && a.size <= MAX_MB_FOTO * 1024 * 1024)
              .slice(0, MAX_FOTOS);
            setAviso(
              validos.length < archivos.length
                ? `Algunas fotos no se agregaron: máximo ${MAX_FOTOS} fotos JPG, PNG, WEBP o HEIC de hasta ${MAX_MB_FOTO} MB.`
                : "",
            );
            alCambiar(validos);
            setFotos(validos.map((a) => ({ url: URL.createObjectURL(a), nombre: a.name })));
          }}
        />
      </label>
      {aviso && (
        <p id={`${id}-aviso`} className="mt-2 text-sm text-aeonium">
          {aviso}
        </p>
      )}
      {fotos.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {fotos.map((f) => (
            <li key={f.url} className="relative aspect-square overflow-hidden rounded-lg bg-arena">
              <Image src={f.url} alt={f.nombre} fill unoptimized sizes="120px" className="object-cover" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
