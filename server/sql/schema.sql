create table if not exists public.articles (
  id text primary key,
  type text not null check (type in ('berita', 'bahaya', 'alternatif')),
  title text not null,
  category text not null,
  date_label text,
  read_time text,
  author text,
  role text,
  img_url text,
  excerpt text not null,
  lead text,
  sections jsonb not null default '[]'::jsonb,
  references_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.videos (
  id bigserial primary key,
  title text not null,
  duration text,
  views text,
  likes text,
  category text,
  tag text,
  img_url text not null,
  youtube_id text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.panduan_content (
  id text primary key,
  screen_time jsonb not null default '[]'::jsonb,
  parental_steps jsonb not null default '[]'::jsonb,
  faq_items jsonb not null default '[]'::jsonb,
  family_rules jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
