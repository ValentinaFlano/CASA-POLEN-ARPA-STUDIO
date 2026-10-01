# Casa Polen & Arpa Studio

Jardines sostenibles ante la escasez hídrica. Sitio web del estudio de paisajismo de María Jesús Marín y Valentina Flaño.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion + Lenis (animaciones y scroll suave).
Próximas fases: Sanity (contenido), Supabase (cotizaciones y reservas), Resend (correos), Google Calendar (agenda), Vercel (publicación).

## Correr el proyecto

Requisitos: Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # completa los valores
npm run dev                  # http://localhost:3000
```

| Comando         | Qué hace                          |
| --------------- | --------------------------------- |
| `npm run dev`   | Servidor de desarrollo            |
| `npm run build` | Compila para producción           |
| `npm start`     | Sirve la versión compilada        |
| `npm run lint`  | Revisa el código con ESLint       |

## Estructura

```
src/
  app/                    Rutas (una carpeta por página)
    @modal/(.)proyectos/  Vista ampliada de un proyecto como modal
    cotizar/actions.ts    Recepción del formulario de cotización
  components/             Componentes por sección (home, proyectos, cotizar…)
  content/                Contenido de demostración (pasa a Sanity en la Fase 2)
  lib/
    types.ts              Modelo de contenido (= esquemas de Sanity)
    content.ts            Única capa de lectura de contenido
public/demo/              Imágenes provisorias extraídas de "Valores 2025"
```

### Marca

Los colores, la tipografía y los espaciados están en `src/app/globals.css` (bloque `@theme`). La tipografía de la marca es Myriad Pro; en la web se usa **Source Sans 3**, su equivalente libre. Para cambiar un color en todo el sitio, edítalo solo ahí.

### Proyectos con bloques opcionales

Cada proyecto tiene foto principal, nombre, ubicación y año, y además puede tener **galería, antes y después, planos o renders y paleta vegetal**. La tabla de floración se arma sola con las especies de la paleta que tengan estaciones de floración. El sitio muestra solo los bloques que el proyecto tenga cargados.

Las especies se cargan una vez y se reutilizan en distintos proyectos.

### Precios y datos de contacto

Los precios (en UF), el WhatsApp, el correo, Instagram, la nota de valores netos y la política de reservas **son datos, no texto fijo**. Hoy están en `src/content/`. Desde la Fase 2 se editan en Sanity sin tocar código.

## Publicar

Se completa en la Fase 4 (Vercel y dominio).

## Cómo actualizar el contenido

Se completa en la Fase 2, con la guía de Sanity Studio para la dueña.
