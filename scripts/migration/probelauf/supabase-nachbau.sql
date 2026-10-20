-- Nachgestellte Supabase-Quelle für den Probelauf von Export und Import –
-- ohne echtes Supabase und ohne echte Kundendaten. Alle Daten sind erfunden.
--
-- Einspielen (lokaler Container, eigene Datenbank supabase_nachbau):
--   1. diese Datei bis zum Marker "ORIGINAL-MIGRATION" (Supabase-Grundgerüst)
--   2. supabase/migrations/20261012180000_portal.sql (unverändert)
--   3. diese Datei ab dem Marker "TESTDATEN"
-- Das erledigt scripts/migration/probelauf/probelauf.sh.

-- Supabase-Grundgerüst: nur das, was Migration und Export brauchen
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated nologin; end if;
end $$;

create schema auth;
create table auth.users (
  id uuid primary key,
  email text,
  raw_user_meta_data jsonb default '{}'::jsonb,
  email_confirmed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create function auth.uid() returns uuid language sql stable as $$ select null::uuid $$;

create schema storage;
create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text);
alter table storage.objects enable row level security;

-- ORIGINAL-MIGRATION

-- TESTDATEN
insert into auth.users (id, email, raw_user_meta_data, email_confirmed_at, created_at) values
  ('aaaaaaaa-0000-4000-8000-000000000001', 'admin@entwicklerhaus.test', '{"name":"Admin Test"}', now() - interval '30 days', now() - interval '30 days'),
  ('aaaaaaaa-0000-4000-8000-000000000002', 'Kundin.Mueller@Baeckerei.TEST', '{"name":"Erika Müller"}', now() - interval '20 days', now() - interval '20 days'),
  ('aaaaaaaa-0000-4000-8000-000000000003', 'eingeladen@verein.test', '{}', null, now() - interval '5 days'),
  -- kommt im Portal nicht vor und darf NICHT exportiert werden
  ('aaaaaaaa-0000-4000-8000-000000000009', 'fremd@anderes-tool.test', '{}', now(), now());

insert into public.portal_admins (user_id) values ('aaaaaaaa-0000-4000-8000-000000000001');
insert into public.portal_clients (id, name) values
  ('cccccccc-0000-4000-8000-000000000001', 'Bäckerei Müller'),
  ('cccccccc-0000-4000-8000-000000000002', 'Sportverein Test');
insert into public.portal_client_members (client_id, user_id) values
  ('cccccccc-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000002'),
  ('cccccccc-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000003');
insert into public.portal_projects (id, client_id, slug, title, description) values
  ('eeeeeeee-0000-4000-8000-000000000001', 'cccccccc-0000-4000-8000-000000000001', 'baeckerei-website', 'Website Bäckerei', 'Neue Website mit Bestellformular'),
  ('eeeeeeee-0000-4000-8000-000000000002', 'cccccccc-0000-4000-8000-000000000002', 'verein-website', 'Vereinswebsite', null);
insert into public.portal_design_variants (id, project_id, title, storage_path, sort_order) values
  -- Dateiname mit Leerzeichen und Umlaut: muss beim Import umbenannt werden
  ('dddddddd-0000-4000-8000-000000000001', 'eeeeeeee-0000-4000-8000-000000000001', 'Variante Grün', 'eeeeeeee-0000-4000-8000-000000000001/Entwurf Grün 1.html', 1),
  ('dddddddd-0000-4000-8000-000000000002', 'eeeeeeee-0000-4000-8000-000000000001', 'Variante Klar', 'eeeeeeee-0000-4000-8000-000000000001/entwurf-klar.html', 2),
  -- Datei fehlt im Bucket
  ('dddddddd-0000-4000-8000-000000000003', 'eeeeeeee-0000-4000-8000-000000000002', 'Vereinsentwurf', 'eeeeeeee-0000-4000-8000-000000000002/verein.html', 1);
insert into public.portal_variant_comments (variant_id, author_id, body) values
  ('dddddddd-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000002', 'Bitte das Logo größer – und „Brötchen“ statt Semmeln.'),
  ('dddddddd-0000-4000-8000-000000000001', 'aaaaaaaa-0000-4000-8000-000000000001', 'Machen wir!');
insert into public.portal_project_approvals (project_id, variant_id, approved_by) values
  ('eeeeeeee-0000-4000-8000-000000000001', 'dddddddd-0000-4000-8000-000000000002', 'aaaaaaaa-0000-4000-8000-000000000002');

insert into storage.objects (bucket_id, name) values
  ('design-proposals', 'eeeeeeee-0000-4000-8000-000000000001/Entwurf Grün 1.html'),
  ('design-proposals', 'eeeeeeee-0000-4000-8000-000000000001/entwurf-klar.html'),
  -- ohne Variante (verwaist)
  ('design-proposals', 'eeeeeeee-0000-4000-8000-000000000001/alt-verworfen.html'),
  ('other-bucket', 'gehoert-nicht-dazu.png');

-- Alt-Tabellen (Struktur erfunden); contact_submissions fehlt absichtlich
create table public.projects (id serial primary key, name text not null, city text, created_at timestamptz default now());
insert into public.projects (name, city) values ('Krefeld 2030', 'Krefeld'), ('Ladenprojekt', 'Düsseldorf');
create table public.blog_posts (id serial primary key, slug text unique, title text, body text);
insert into public.blog_posts (slug, title, body) values ('hallo', 'Hallo Welt', 'Erster Beitrag');
