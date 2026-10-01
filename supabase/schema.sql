-- Casa Polen & Arpa Studio — base de datos de cotizaciones
-- Pégalo completo en Supabase → SQL Editor → New query → Run.

create table if not exists public.cotizaciones (
  id                 uuid primary key default gen_random_uuid(),
  creada             timestamptz not null default now(),
  estado             text not null default 'nueva'
                     check (estado in ('nueva', 'contactada', 'cotizada', 'aceptada', 'descartada')),
  servicio           text not null check (servicio in ('asesoria', 'mantencion', 'diseno-construccion')),
  comuna             text not null,
  metros             numeric,
  descripcion        text not null,
  presupuesto        text,
  nombre             text not null,
  email              text not null,
  telefono           text not null,
  contacto_preferido text not null,
  fotos              text[] not null default '{}',
  notas_internas     text
);

create index if not exists cotizaciones_creada_idx on public.cotizaciones (creada desc);

-- Seguridad: nadie puede leer ni escribir desde el navegador.
-- El sitio usa la llave de servicio desde el servidor, que no pasa por estas reglas.
alter table public.cotizaciones enable row level security;

-- Bucket privado para las fotos del terreno (máx. 8 MB por foto)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'fotos-cotizaciones',
  'fotos-cotizaciones',
  false,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do nothing;
