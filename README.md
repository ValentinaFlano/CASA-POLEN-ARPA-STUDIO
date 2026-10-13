# Casa Polen & Arpa Studio

Jardines sostenibles ante la escasez hídrica. Sitio web del estudio de paisajismo de María Jesús Marín y Valentina Flaño.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion + Lenis (animaciones) · Supabase (cotizaciones y fotos) · Resend (correos).

## Correr el proyecto

Requisitos: Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # completa los valores
npm run dev                  # http://localhost:3000
```

| Comando         | Qué hace                    |
| --------------- | --------------------------- |
| `npm run dev`   | Servidor de desarrollo      |
| `npm run build` | Compila para producción     |
| `npm start`     | Sirve la versión compilada  |
| `npm run lint`  | Revisa el código con ESLint |

Sin variables de Supabase y Resend el sitio funciona igual: el formulario de cotización solo muestra la solicitud en la consola del servidor.

## Cómo actualizar el contenido

Todo el contenido está en la carpeta `src/content/`. Se edita directo en GitHub: abre el archivo, presiona el lápiz ✏️, cambia el texto y guarda con **Commit changes**. Vercel publica el cambio solo, en uno o dos minutos.

| Quieres cambiar…                                        | Archivo                    |
| ------------------------------------------------------- | -------------------------- |
| WhatsApp, correo, Instagram, frase principal, foto/video del inicio | `src/content/ajustes.ts`   |
| Servicios, qué incluyen y precios en UF                 | `src/content/servicios.ts` |
| Proyectos                                               | `src/content/proyectos.ts` |
| Socias (foto, títulos)                                  | `src/content/equipo.ts`    |
| Política de reservas y cancelación                      | `src/content/politicas.ts` |

Reglas simples: no borres comillas, comas ni llaves `{ }`. Si algo falla, Vercel no publica y el sitio sigue con la versión anterior.

### Agregar un proyecto

1. Sube las fotos a `public/proyectos/<nombre-del-proyecto>/` (en GitHub: **Add file → Upload files**). Usa fotos horizontales de 2000 px de ancho como mínimo; el sitio las optimiza solo.
2. En `src/content/proyectos.ts`, copia un proyecto existente y cambia sus datos:

```ts
{
  slug: "jardin-las-condes",              // aparece en la URL: /proyectos/jardin-las-condes
  nombre: "Jardín Las Condes",
  ubicacion: "Las Condes",
  anio: 2025,
  resumen: "Reemplazamos el pasto por un jardín seco de bajo riego.",
  servicio: "diseno-construccion",        // asesoria | mantencion | diseno-construccion
  destacado: true,                        // aparece en el inicio (máximo 4)
  portada: img("/proyectos/jardin-las-condes/portada.jpg", "Descripción de la foto", 2000, 1333),
  galeria: [ /* más fotos con img(...) */ ],
  antesDespues: [{ antes: img(...), despues: img(...) }],
  planos: [ /* opcional: plano o render */ ],
},
```

Cada proyecto muestra solo lo que tenga: fotos, antes y después, y plano o render. Los dos números al final de `img(...)` son el ancho y el alto de la foto en píxeles.

## Cotizaciones (Supabase + Resend)

> **Estado actual: desactivado.** Mientras la variable `COTIZACION_EN_LINEA` no sea `true`, la página `/cotizar` invita a cotizar por WhatsApp o correo y el formulario no recibe envíos. Para activarlo: completa la configuración de abajo, agrega `COTIZACION_EN_LINEA=true` en Vercel y vuelve a desplegar.

Cuando alguien envía el formulario de `/cotizar`:

1. Las fotos del terreno suben directo a Supabase Storage (bucket privado `fotos-cotizaciones`).
2. La solicitud se guarda en la tabla `cotizaciones`.
3. Llega un correo al equipo con los datos, links a las fotos (válidos por 7 días) y botones para responder por WhatsApp o correo.
4. El cliente recibe un acuse de recibo, sin precio.

Si la base de datos falla, el correo al equipo sale igual y lo indica, para que no se pierda ninguna solicitud.

### Configuración (una vez)

1. **Supabase**: crea un proyecto gratuito. En **SQL Editor** pega y ejecuta `supabase/schema.sql`. Copia la **Project URL** y la llave **service_role** (Project Settings → API) en `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
2. **Resend**: crea una cuenta gratuita y una API key, y ponla en `RESEND_API_KEY`. En `CORREO_EQUIPO` pon los correos que reciben los avisos.
   - Mientras no verifiques un dominio, Resend solo entrega correos a la dirección con la que creaste la cuenta: te llegan los avisos, pero no el acuse al cliente.
   - Cuando tengas el dominio, verifícalo en Resend (Domains) y cambia `CORREO_REMITENTE` a algo como `Casa Polen <hola@tudominio.cl>`.
3. En Vercel, agrega las mismas variables en **Settings → Environment Variables**.

Para ver las solicitudes, entra a Supabase → **Table Editor → cotizaciones**. Ahí puedes cambiar el `estado` (nueva, contactada, cotizada, aceptada, descartada) y anotar `notas_internas`.

## Estructura

```
src/
  app/                    Rutas (una carpeta por página)
    @modal/(.)proyectos/  Vista ampliada de un proyecto como modal
    cotizar/actions.ts    Recepción de cotizaciones (servidor)
  components/             Componentes por sección
  content/                Contenido editable del sitio
  emails/                 Plantillas de correo
  lib/
    content.ts            Única capa de lectura de contenido
    cotizacion.ts         Validación del formulario (navegador y servidor)
    servidor/             Clientes de Supabase y Resend (solo servidor)
supabase/schema.sql       Tabla y bucket de cotizaciones
public/demo/              Imágenes provisorias extraídas de "Valores 2025"
```

Los colores, la tipografía y los espaciados de la marca están en `src/app/globals.css` (bloque `@theme`). La tipografía de la marca es Myriad Pro; en la web se usa **Source Sans 3**, su equivalente libre.

## Publicar

Se completa en la Fase 4 (Vercel y dominio).
