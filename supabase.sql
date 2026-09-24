-- ==========================================================================
-- UBORA — Base de données (Supabase / PostgreSQL)
-- À coller dans : Supabase → votre projet → SQL Editor → New query → Run
-- ==========================================================================

-- ---------- Actualités ----------
create table if not exists public.actualites (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  date        date not null default current_date,
  categorie   text not null default 'Programme',
  titre       text not null,
  extrait     text not null default '',
  contenu     jsonb not null default '[]'::jsonb,   -- liste de paragraphes
  exemple     boolean not null default false,
  publie      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- Formations ----------
create table if not exists public.formations (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  titre        text not null,
  outil        text not null default 'general',     -- akiba, uborahub, ubora-coop, ubora-fin, ubora-pme, general
  date         date not null,
  duree        text not null default '1 jour',
  mode         text not null default 'Présentiel',  -- Présentiel | En ligne | Hybride
  lieu         text not null default 'Lubumbashi',
  public_cible text not null default '',
  places       integer not null default 20,
  programme    jsonb not null default '[]'::jsonb,
  exemple      boolean not null default false,
  publie       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------- Offres d'emploi ----------
create table if not exists public.offres (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  titre       text not null,
  type        text not null default 'CDD',          -- CDI | CDD | Stage | Consultance | Bénévolat
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

-- ---------- Messages reçus par le formulaire de contact ----------
create table if not exists public.messages (
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
create table if not exists public.abonnes (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- Sécurité : lecture publique du contenu publié, écriture réservée à l'équipe
-- ==========================================================================
alter table public.actualites enable row level security;
alter table public.formations enable row level security;
alter table public.offres     enable row level security;
alter table public.messages   enable row level security;
alter table public.abonnes    enable row level security;

-- Lecture publique (uniquement ce qui est publié)
drop policy if exists "lecture publique actualites" on public.actualites;
create policy "lecture publique actualites" on public.actualites for select to anon, authenticated using (publie = true);

drop policy if exists "lecture publique formations" on public.formations;
create policy "lecture publique formations" on public.formations for select to anon, authenticated using (publie = true);

drop policy if exists "lecture publique offres" on public.offres;
create policy "lecture publique offres" on public.offres for select to anon, authenticated using (publie = true);

-- Écriture réservée aux comptes connectés (équipe Ubora)
drop policy if exists "equipe gere actualites" on public.actualites;
create policy "equipe gere actualites" on public.actualites for all to authenticated using (true) with check (true);

drop policy if exists "equipe gere formations" on public.formations;
create policy "equipe gere formations" on public.formations for all to authenticated using (true) with check (true);

drop policy if exists "equipe gere offres" on public.offres;
create policy "equipe gere offres" on public.offres for all to authenticated using (true) with check (true);

-- Messages : tout le monde peut écrire, seule l'équipe peut lire
drop policy if exists "envoi message public" on public.messages;
create policy "envoi message public" on public.messages for insert to anon, authenticated with check (true);

drop policy if exists "equipe lit messages" on public.messages;
create policy "equipe lit messages" on public.messages for select to authenticated using (true);

drop policy if exists "equipe gere messages" on public.messages;
create policy "equipe gere messages" on public.messages for update to authenticated using (true) with check (true);

-- Abonnés : inscription publique, lecture réservée à l'équipe
drop policy if exists "inscription publique" on public.abonnes;
create policy "inscription publique" on public.abonnes for insert to anon, authenticated with check (true);

drop policy if exists "equipe lit abonnes" on public.abonnes;
create policy "equipe lit abonnes" on public.abonnes for select to authenticated using (true);

-- Index utiles
create index if not exists actualites_date_idx on public.actualites (date desc);
create index if not exists formations_date_idx on public.formations (date);
create index if not exists offres_cloture_idx  on public.offres (cloture desc);
