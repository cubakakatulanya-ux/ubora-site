-- ==========================================================================
-- UBORA — Base de données du site web (Supabase / PostgreSQL)
-- Déjà appliqué sur le projet "coopec-gestion" (uoshpvqdszygezkuhhco).
-- Conservé ici pour référence et pour recréer la base ailleurs si besoin.
-- Les tables sont préfixées site_ afin de cohabiter avec d'autres données.
-- ==========================================================================

-- ---------- Équipe autorisée à publier ----------
create table if not exists public.site_admins (
  email      text primary key,
  nom        text,
  created_at timestamptz not null default now()
);

-- ---------- Actualités ----------
create table if not exists public.site_actualites (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  date       date not null default current_date,
  categorie  text not null default 'Programme',
  titre      text not null,
  extrait    text not null default '',
  contenu    jsonb not null default '[]'::jsonb,   -- liste de paragraphes
  exemple    boolean not null default false,
  publie     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Formations ----------
create table if not exists public.site_formations (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  titre        text not null,
  outil        text not null default 'general',    -- akiba, uborahub, ubora-coop, ubora-fin, ubora-pme, general
  date         date not null,
  duree        text not null default '1 jour',
  mode         text not null default 'Présentiel', -- Présentiel | En ligne | Hybride
  lieu         text not null default 'Lubumbashi',
  public_cible text not null default '',
  places       integer not null default 20,
  programme    jsonb not null default '[]'::jsonb,
  exemple      boolean not null default false,
  publie       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------- Offres d'emploi ----------
create table if not exists public.site_offres (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  titre       text not null,
  type        text not null default 'CDD',         -- CDI | CDD | Stage | Consultance | Bénévolat
  lieu        text not null default 'Lubumbashi',
  departement text not null default '',
  publie_le   date not null default current_date,
  cloture     date not null,
  resume      text not null default '',
  missions    jsonb not null default '[]'::jsonb,
  profil      jsonb not null default '[]'::jsonb,
  exemple     boolean not null default false,
  publie      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- Messages du formulaire de contact ----------
create table if not exists public.site_messages (
  id           uuid primary key default gen_random_uuid(),
  nom          text not null,
  organisation text,
  telephone    text,
  email        text,
  besoin       text,
  message      text not null,
  traite       boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ---------- Abonnés à la lettre d'information ----------
create table if not exists public.site_abonnes (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- Sécurité : lecture publique du contenu publié, écriture réservée à l'équipe
-- ==========================================================================
create or replace function public.est_admin_site()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.site_admins     enable row level security;
alter table public.site_actualites enable row level security;
alter table public.site_formations enable row level security;
alter table public.site_offres     enable row level security;
alter table public.site_messages   enable row level security;
alter table public.site_abonnes    enable row level security;

-- Lecture publique (uniquement ce qui est publié)
drop policy if exists "lecture publique actualites" on public.site_actualites;
create policy "lecture publique actualites" on public.site_actualites
  for select to anon, authenticated using (publie = true);

drop policy if exists "lecture publique formations" on public.site_formations;
create policy "lecture publique formations" on public.site_formations
  for select to anon, authenticated using (publie = true);

drop policy if exists "lecture publique offres" on public.site_offres;
create policy "lecture publique offres" on public.site_offres
  for select to anon, authenticated using (publie = true);

-- Écriture réservée aux membres inscrits dans site_admins
drop policy if exists "equipe gere actualites" on public.site_actualites;
create policy "equipe gere actualites" on public.site_actualites
  for all to authenticated using (public.est_admin_site()) with check (public.est_admin_site());

drop policy if exists "equipe gere formations" on public.site_formations;
create policy "equipe gere formations" on public.site_formations
  for all to authenticated using (public.est_admin_site()) with check (public.est_admin_site());

drop policy if exists "equipe gere offres" on public.site_offres;
create policy "equipe gere offres" on public.site_offres
  for all to authenticated using (public.est_admin_site()) with check (public.est_admin_site());

-- Messages : envoi public, lecture et traitement réservés à l'équipe
drop policy if exists "envoi message public" on public.site_messages;
create policy "envoi message public" on public.site_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "equipe lit messages" on public.site_messages;
create policy "equipe lit messages" on public.site_messages
  for select to authenticated using (public.est_admin_site());

drop policy if exists "equipe traite messages" on public.site_messages;
create policy "equipe traite messages" on public.site_messages
  for update to authenticated using (public.est_admin_site()) with check (public.est_admin_site());

-- Abonnés : inscription publique, lecture réservée à l'équipe
drop policy if exists "inscription publique" on public.site_abonnes;
create policy "inscription publique" on public.site_abonnes
  for insert to anon, authenticated with check (true);

drop policy if exists "equipe lit abonnes" on public.site_abonnes;
create policy "equipe lit abonnes" on public.site_abonnes
  for select to authenticated using (public.est_admin_site());

drop policy if exists "equipe lit admins" on public.site_admins;
create policy "equipe lit admins" on public.site_admins
  for select to authenticated using (public.est_admin_site());

create index if not exists site_actualites_date_idx on public.site_actualites (date desc);
create index if not exists site_formations_date_idx on public.site_formations (date);
create index if not exists site_offres_cloture_idx  on public.site_offres (cloture desc);

-- ---------- Ajouter un membre de l'équipe ----------
-- insert into public.site_admins (email, nom) values ('prenom.nom@exemple.com', 'Prénom Nom');
