-- Kundenportal Phase 1
-- Läuft im bestehenden Supabase-Projekt "das entwicklerhaus". Alle Objekte tragen
-- das Präfix portal_ – bestehende Tabellen (projects, blog_posts,
-- contact_submissions) und das Schema private werden nicht angefasst.
--
-- Kunden/Projekte/Varianten werden im Supabase-Dashboard gepflegt (service_role, umgeht RLS).
-- Die App (Rolle "authenticated") darf nur lesen, kommentieren und freigeben.

-- ---------------------------------------------------------------------------
-- Schema für Hilfsfunktionen (nicht über die API erreichbar)
-- ---------------------------------------------------------------------------
create schema if not exists portal_private;
revoke all on schema portal_private from public;
grant usage on schema portal_private to authenticated;

-- ---------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------

-- Admin-Rolle: Login allein reicht nicht, der User muss hier eingetragen sein.
create table public.portal_admins (
  user_id    uuid not null,
  created_at timestamptz not null default now(),
  constraint portal_admins_pkey primary key (user_id),
  constraint portal_admins_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade
);

-- Kunde = Firma/Auftraggeber
create table public.portal_clients (
  id         uuid not null default gen_random_uuid(),
  name       text not null,
  created_at timestamptz not null default now(),
  constraint portal_clients_pkey primary key (id),
  constraint portal_clients_name_check check (char_length(name) between 1 and 200)
);

-- Welche Logins gehören zu welchem Kunden (mehrere Ansprechpartner möglich)
create table public.portal_client_members (
  client_id  uuid not null,
  user_id    uuid not null,
  created_at timestamptz not null default now(),
  constraint portal_client_members_pkey primary key (client_id, user_id),
  constraint portal_client_members_client_id_fkey foreign key (client_id)
    references public.portal_clients (id) on delete cascade,
  constraint portal_client_members_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade
);
create index portal_client_members_user_id_idx on public.portal_client_members (user_id);

-- Projekt; slug ist das URL-Segment in /portal/[projekt]
create table public.portal_projects (
  id          uuid not null default gen_random_uuid(),
  client_id   uuid not null,
  slug        text not null,
  title       text not null,
  description text,
  created_at  timestamptz not null default now(),
  constraint portal_projects_pkey primary key (id),
  constraint portal_projects_slug_key unique (slug),
  constraint portal_projects_client_id_fkey foreign key (client_id)
    references public.portal_clients (id) on delete cascade,
  constraint portal_projects_slug_check check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint portal_projects_title_check check (char_length(title) between 1 and 200)
);
create index portal_projects_client_id_idx on public.portal_projects (client_id);

-- Design-Variante = eine HTML-Datei im Bucket "design-proposals"
-- Pfadkonvention: <project_id>/<dateiname>.html
create table public.portal_design_variants (
  id           uuid not null default gen_random_uuid(),
  project_id   uuid not null,
  title        text not null,
  description  text,
  storage_path text not null,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  constraint portal_design_variants_pkey primary key (id),
  constraint portal_design_variants_storage_path_key unique (storage_path),
  constraint portal_design_variants_id_project_id_key unique (id, project_id),
  constraint portal_design_variants_project_id_fkey foreign key (project_id)
    references public.portal_projects (id) on delete cascade,
  constraint portal_design_variants_title_check check (char_length(title) between 1 and 200),
  constraint portal_design_variants_path_prefix_check check (storage_path like project_id::text || '/%'),
  constraint portal_design_variants_path_html_check check (storage_path ~ '\.html$')
);
create index portal_design_variants_project_id_idx on public.portal_design_variants (project_id, sort_order);

-- Kommentare pro Variante (beliebig viele)
create table public.portal_variant_comments (
  id         uuid not null default gen_random_uuid(),
  variant_id uuid not null,
  author_id  uuid default auth.uid(),
  body       text not null,
  created_at timestamptz not null default now(),
  constraint portal_variant_comments_pkey primary key (id),
  constraint portal_variant_comments_variant_id_fkey foreign key (variant_id)
    references public.portal_design_variants (id) on delete cascade,
  constraint portal_variant_comments_author_id_fkey foreign key (author_id)
    references auth.users (id) on delete set null,
  constraint portal_variant_comments_body_check check (char_length(btrim(body)) between 1 and 5000)
);
create index portal_variant_comments_variant_id_idx on public.portal_variant_comments (variant_id, created_at);

-- Freigabe: genau eine pro Projekt (PK auf project_id).
-- Der zusammengesetzte FK stellt sicher, dass die Variante zum Projekt gehört.
-- Eine freigegebene Variante kann nicht gelöscht werden, solange die Freigabe besteht.
create table public.portal_project_approvals (
  project_id  uuid not null,
  variant_id  uuid not null,
  approved_by uuid default auth.uid(),
  approved_at timestamptz not null default now(),
  constraint portal_project_approvals_pkey primary key (project_id),
  constraint portal_project_approvals_project_id_fkey foreign key (project_id)
    references public.portal_projects (id) on delete cascade,
  constraint portal_project_approvals_variant_fkey foreign key (variant_id, project_id)
    references public.portal_design_variants (id, project_id),
  constraint portal_project_approvals_approved_by_fkey foreign key (approved_by)
    references auth.users (id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Hilfsfunktionen für RLS (security definer, damit Policies sich nicht
-- gegenseitig rekursiv auswerten)
-- ---------------------------------------------------------------------------
create function portal_private.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.portal_admins where user_id = (select auth.uid())
  );
$$;

create function portal_private.is_client_member(p_client_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.portal_client_members
    where client_id = p_client_id and user_id = (select auth.uid())
  );
$$;

create function portal_private.is_project_member(p_project_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.portal_projects p
    join public.portal_client_members m on m.client_id = p.client_id
    where p.id = p_project_id and m.user_id = (select auth.uid())
  );
$$;

create function portal_private.can_access_project(p_project_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select portal_private.is_admin() or portal_private.is_project_member(p_project_id);
$$;

create function portal_private.variant_project_id(p_variant_id uuid)
returns uuid
language sql stable security definer set search_path = ''
as $$
  select project_id from public.portal_design_variants where id = p_variant_id;
$$;

-- Für Storage: Datei ist nur lesbar, wenn sie als Variante eines
-- zugänglichen Projekts registriert ist.
create function portal_private.can_read_design_object(p_name text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.portal_design_variants v
    where v.storage_path = p_name and portal_private.can_access_project(v.project_id)
  );
$$;

-- Rechte nur auf die eigenen Funktionen (Postgres gibt EXECUTE standardmäßig an PUBLIC).
revoke all on function
  portal_private.is_admin(),
  portal_private.is_client_member(uuid),
  portal_private.is_project_member(uuid),
  portal_private.can_access_project(uuid),
  portal_private.variant_project_id(uuid),
  portal_private.can_read_design_object(text)
from public, anon;

grant execute on function
  portal_private.is_admin(),
  portal_private.is_client_member(uuid),
  portal_private.is_project_member(uuid),
  portal_private.can_access_project(uuid),
  portal_private.variant_project_id(uuid),
  portal_private.can_read_design_object(text)
to authenticated;

-- ---------------------------------------------------------------------------
-- Rechte: Supabase vergibt standardmäßig alles an anon/authenticated.
-- Hier explizit auf das Nötige reduzieren (zusätzlich zu RLS).
-- ---------------------------------------------------------------------------
revoke all on
  public.portal_admins, public.portal_clients, public.portal_client_members,
  public.portal_projects, public.portal_design_variants,
  public.portal_variant_comments, public.portal_project_approvals
from anon, authenticated;

grant select on
  public.portal_clients, public.portal_client_members, public.portal_projects,
  public.portal_design_variants, public.portal_variant_comments,
  public.portal_project_approvals
to authenticated;

-- Nur diese Spalten darf der Client setzen; Autor/Zeitpunkt kommen aus Defaults.
grant insert (variant_id, body) on public.portal_variant_comments to authenticated;
grant insert (project_id, variant_id) on public.portal_project_approvals to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.portal_admins            enable row level security;
alter table public.portal_clients           enable row level security;
alter table public.portal_client_members    enable row level security;
alter table public.portal_projects          enable row level security;
alter table public.portal_design_variants   enable row level security;
alter table public.portal_variant_comments  enable row level security;
alter table public.portal_project_approvals enable row level security;

-- portal_admins: bewusst keine Policy -> nur über Dashboard/service_role

create policy portal_clients_select on public.portal_clients
  for select to authenticated
  using ((select portal_private.is_admin()) or portal_private.is_client_member(id));

create policy portal_client_members_select on public.portal_client_members
  for select to authenticated
  using (user_id = (select auth.uid()) or (select portal_private.is_admin()));

create policy portal_projects_select on public.portal_projects
  for select to authenticated
  using ((select portal_private.is_admin()) or portal_private.is_client_member(client_id));

create policy portal_design_variants_select on public.portal_design_variants
  for select to authenticated
  using (portal_private.can_access_project(project_id));

create policy portal_variant_comments_select on public.portal_variant_comments
  for select to authenticated
  using (portal_private.can_access_project(portal_private.variant_project_id(variant_id)));

-- Kommentieren nur durch Kundenmitglieder des Projekts
create policy portal_variant_comments_insert on public.portal_variant_comments
  for insert to authenticated
  with check (
    author_id = (select auth.uid())
    and portal_private.is_project_member(portal_private.variant_project_id(variant_id))
  );

create policy portal_project_approvals_select on public.portal_project_approvals
  for select to authenticated
  using (portal_private.can_access_project(project_id));

-- Freigeben nur durch Kundenmitglieder; zweite Freigabe scheitert am PK.
-- Kein Update/Delete für Kunden: Zurücksetzen nur durch Admin im Dashboard.
create policy portal_project_approvals_insert on public.portal_project_approvals
  for insert to authenticated
  with check (
    approved_by = (select auth.uid())
    and portal_private.is_project_member(project_id)
  );

-- ---------------------------------------------------------------------------
-- Storage: privater Bucket für die HTML-Entwürfe
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('design-proposals', 'design-proposals', false, 4194304, array['text/html'])
on conflict (id) do nothing;

-- Lesen nur mit Projektzugehörigkeit; Upload/Löschen nur über Dashboard.
create policy portal_design_proposals_select on storage.objects
  for select to authenticated
  using (
    bucket_id = 'design-proposals'
    and portal_private.can_read_design_object(name)
  );
