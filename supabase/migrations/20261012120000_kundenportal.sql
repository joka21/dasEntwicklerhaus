-- Kundenportal Phase 1
-- Kunden, Projekte, Design-Varianten (HTML im privaten Storage), Kommentare, Freigabe.
-- Kunden/Projekte/Varianten werden im Supabase-Dashboard gepflegt (service_role, umgeht RLS).
-- Die App (Rolle "authenticated") darf nur lesen, kommentieren und freigeben.

-- ---------------------------------------------------------------------------
-- Schema für Hilfsfunktionen (nicht über die API erreichbar)
-- ---------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------

-- Admin-Rolle: Login allein reicht nicht, der User muss hier eingetragen sein.
create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Kunde = Firma/Auftraggeber
create table public.clients (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 200),
  created_at timestamptz not null default now()
);

-- Welche Logins gehören zu welchem Kunden (mehrere Ansprechpartner möglich)
create table public.client_members (
  client_id  uuid not null references public.clients (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (client_id, user_id)
);
create index client_members_user_id_idx on public.client_members (user_id);

-- Projekt; slug ist das URL-Segment in /portal/[projekt]
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.clients (id) on delete cascade,
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null check (char_length(title) between 1 and 200),
  description text,
  created_at  timestamptz not null default now()
);
create index projects_client_id_idx on public.projects (client_id);

-- Design-Variante = eine HTML-Datei im Bucket "design-proposals"
-- Pfadkonvention: <project_id>/<dateiname>.html
create table public.design_variants (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects (id) on delete cascade,
  title        text not null check (char_length(title) between 1 and 200),
  description  text,
  storage_path text not null unique,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  unique (id, project_id),
  check (storage_path like project_id::text || '/%'),
  check (storage_path ~ '\.html$')
);
create index design_variants_project_id_idx on public.design_variants (project_id, sort_order);

-- Kommentare pro Variante (beliebig viele)
create table public.variant_comments (
  id         uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.design_variants (id) on delete cascade,
  author_id  uuid default auth.uid() references auth.users (id) on delete set null,
  body       text not null check (char_length(btrim(body)) between 1 and 5000),
  created_at timestamptz not null default now()
);
create index variant_comments_variant_id_idx on public.variant_comments (variant_id, created_at);

-- Freigabe: genau eine pro Projekt (PK auf project_id).
-- Der zusammengesetzte FK stellt sicher, dass die Variante zum Projekt gehört.
-- Eine freigegebene Variante kann nicht gelöscht werden, solange die Freigabe besteht.
create table public.project_approvals (
  project_id  uuid primary key references public.projects (id) on delete cascade,
  variant_id  uuid not null,
  approved_by uuid default auth.uid() references auth.users (id) on delete set null,
  approved_at timestamptz not null default now(),
  foreign key (variant_id, project_id) references public.design_variants (id, project_id)
);

-- ---------------------------------------------------------------------------
-- Hilfsfunktionen für RLS (security definer, damit Policies sich nicht
-- gegenseitig rekursiv auswerten)
-- ---------------------------------------------------------------------------
create function private.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

create function private.is_client_member(p_client_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.client_members
    where client_id = p_client_id and user_id = (select auth.uid())
  );
$$;

create function private.is_project_member(p_project_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.projects p
    join public.client_members m on m.client_id = p.client_id
    where p.id = p_project_id and m.user_id = (select auth.uid())
  );
$$;

create function private.can_access_project(p_project_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select private.is_admin() or private.is_project_member(p_project_id);
$$;

create function private.variant_project_id(p_variant_id uuid)
returns uuid
language sql stable security definer set search_path = ''
as $$
  select project_id from public.design_variants where id = p_variant_id;
$$;

-- Für Storage: Datei ist nur lesbar, wenn sie als Variante eines
-- zugänglichen Projekts registriert ist.
create function private.can_read_design_object(p_name text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.design_variants v
    where v.storage_path = p_name and private.can_access_project(v.project_id)
  );
$$;

revoke all on all functions in schema private from public, anon;
grant execute on all functions in schema private to authenticated;

-- ---------------------------------------------------------------------------
-- Rechte: Supabase vergibt standardmäßig alles an anon/authenticated.
-- Hier explizit auf das Nötige reduzieren (zusätzlich zu RLS).
-- ---------------------------------------------------------------------------
revoke all on
  public.admins, public.clients, public.client_members, public.projects,
  public.design_variants, public.variant_comments, public.project_approvals
from anon, authenticated;

grant select on
  public.clients, public.client_members, public.projects,
  public.design_variants, public.variant_comments, public.project_approvals
to authenticated;

-- Nur diese Spalten darf der Client setzen; Autor/Zeitpunkt kommen aus Defaults.
grant insert (variant_id, body) on public.variant_comments to authenticated;
grant insert (project_id, variant_id) on public.project_approvals to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.admins            enable row level security;
alter table public.clients           enable row level security;
alter table public.client_members    enable row level security;
alter table public.projects          enable row level security;
alter table public.design_variants   enable row level security;
alter table public.variant_comments  enable row level security;
alter table public.project_approvals enable row level security;

-- admins: bewusst keine Policy -> nur über Dashboard/service_role

create policy clients_select on public.clients
  for select to authenticated
  using ((select private.is_admin()) or private.is_client_member(id));

create policy client_members_select on public.client_members
  for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy projects_select on public.projects
  for select to authenticated
  using ((select private.is_admin()) or private.is_client_member(client_id));

create policy design_variants_select on public.design_variants
  for select to authenticated
  using (private.can_access_project(project_id));

create policy variant_comments_select on public.variant_comments
  for select to authenticated
  using (private.can_access_project(private.variant_project_id(variant_id)));

-- Kommentieren nur durch Kundenmitglieder des Projekts
create policy variant_comments_insert on public.variant_comments
  for insert to authenticated
  with check (
    author_id = (select auth.uid())
    and private.is_project_member(private.variant_project_id(variant_id))
  );

create policy project_approvals_select on public.project_approvals
  for select to authenticated
  using (private.can_access_project(project_id));

-- Freigeben nur durch Kundenmitglieder; zweite Freigabe scheitert am PK.
-- Kein Update/Delete für Kunden: Zurücksetzen nur durch Admin im Dashboard.
create policy project_approvals_insert on public.project_approvals
  for insert to authenticated
  with check (
    approved_by = (select auth.uid())
    and private.is_project_member(project_id)
  );

-- ---------------------------------------------------------------------------
-- Storage: privater Bucket für die HTML-Entwürfe
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('design-proposals', 'design-proposals', false, 4194304, array['text/html'])
on conflict (id) do nothing;

-- Lesen nur mit Projektzugehörigkeit; Upload/Löschen nur über Dashboard.
create policy design_proposals_select on storage.objects
  for select to authenticated
  using (
    bucket_id = 'design-proposals'
    and private.can_read_design_object(name)
  );
