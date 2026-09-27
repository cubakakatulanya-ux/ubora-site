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

-- ==========================================================================
-- Questions posées à l'assistant du site
-- ==========================================================================
create table if not exists public.site_questions (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  repondu    boolean not null default false,
  page       text,
  created_at timestamptz not null default now()
);
alter table public.site_questions enable row level security;

drop policy if exists "question publique" on public.site_questions;
create policy "question publique" on public.site_questions
  for insert to anon, authenticated with check (char_length(question) between 2 and 500);

drop policy if exists "equipe lit questions" on public.site_questions;
create policy "equipe lit questions" on public.site_questions
  for select to authenticated using (public.est_admin_site());

-- ==========================================================================
-- Renforcement (27 septembre 2026)
-- ==========================================================================
-- Limites sur ce que les visiteurs peuvent envoyer
alter table public.site_messages
  add constraint site_messages_nom_len check (char_length(nom) between 1 and 120),
  add constraint site_messages_org_len check (organisation is null or char_length(organisation) <= 160),
  add constraint site_messages_tel_len check (telephone is null or char_length(telephone) <= 40),
  add constraint site_messages_email_fmt check (email is null or (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  add constraint site_messages_besoin_len check (besoin is null or char_length(besoin) <= 160),
  add constraint site_messages_message_len check (char_length(message) between 2 and 4000);
alter table public.site_abonnes
  add constraint site_abonnes_email_fmt check (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
alter table public.site_questions
  add constraint site_questions_page_len check (page is null or char_length(page) <= 200);

-- Un visiteur ne peut pas déposer un message déjà « traité »
drop policy if exists "envoi message public" on public.site_messages;
create policy "envoi message public" on public.site_messages
  for insert to anon, authenticated with check (traite = false);

-- L'équipe peut supprimer un message indésirable, désinscrire un abonné, effacer une question
drop policy if exists "equipe supprime messages" on public.site_messages;
create policy "equipe supprime messages" on public.site_messages
  for delete to authenticated using (public.est_admin_site());
drop policy if exists "equipe supprime abonnes" on public.site_abonnes;
create policy "equipe supprime abonnes" on public.site_abonnes
  for delete to authenticated using (public.est_admin_site());
drop policy if exists "equipe supprime questions" on public.site_questions;
create policy "equipe supprime questions" on public.site_questions
  for delete to authenticated using (public.est_admin_site());

-- La fonction de contrôle ne sert qu'aux membres connectés
revoke execute on function public.est_admin_site() from public, anon;
grant execute on function public.est_admin_site() to authenticated;

-- ==========================================================================
-- Équipe, réalisations et photos (27 septembre 2026)
-- ==========================================================================
create table if not exists public.site_equipe (
  id         uuid primary key default gen_random_uuid(),
  nom        text not null check (char_length(nom) between 2 and 120),
  fonction   text not null check (char_length(fonction) between 2 and 120),
  bio        text check (bio is null or char_length(bio) <= 600),
  photo_url  text check (photo_url is null or photo_url ~ '^https://'),
  linkedin   text check (linkedin is null or linkedin ~ '^https://'),
  ordre      integer not null default 100,
  publie     boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.site_realisations (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  titre      text not null check (char_length(titre) between 3 and 160),
  pole       text not null default 'avec' check (pole in ('avec','pme','cooperatives','financement','marche','conseil')),
  periode    text not null default '' check (char_length(periode) <= 40),
  lieu       text not null default '' check (char_length(lieu) <= 120),
  partenaire text not null default '' check (char_length(partenaire) <= 160),
  resume     text not null default '' check (char_length(resume) <= 1200),
  resultats  jsonb not null default '[]'::jsonb,
  image_url  text check (image_url is null or image_url ~ '^https://'),
  ordre      integer not null default 100,
  publie     boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.site_equipe       enable row level security;
alter table public.site_realisations enable row level security;
create policy "lecture publique equipe" on public.site_equipe for select to anon, authenticated using (publie = true);
create policy "equipe gere equipe" on public.site_equipe for all to authenticated using (public.est_admin_site()) with check (public.est_admin_site());
create policy "lecture publique realisations" on public.site_realisations for select to anon, authenticated using (publie = true);
create policy "equipe gere realisations" on public.site_realisations for all to authenticated using (public.est_admin_site()) with check (public.est_admin_site());

-- Photos : lecture publique, dépôt réservé à l'équipe, 2 Mo maximum
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-medias', 'site-medias', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "site medias depot equipe" on storage.objects for insert to authenticated with check (bucket_id = 'site-medias' and public.est_admin_site());
create policy "site medias modif equipe" on storage.objects for update to authenticated using (bucket_id = 'site-medias' and public.est_admin_site());
create policy "site medias suppr equipe" on storage.objects for delete to authenticated using (bucket_id = 'site-medias' and public.est_admin_site());

-- ==========================================================================
-- Application COOPEC (même projet) : fonctions réservées aux utilisateurs connectés
-- ==========================================================================
revoke execute on function public.creer_compte(text, text, text, text, text, text, text) from public, anon;
revoke execute on function public.desactiver_compte(text) from public, anon;
revoke execute on function public.enregistrer_profil(uuid, text, text, text, text, text) from public, anon;
revoke execute on function public.marquer_revision() from public, anon;
revoke execute on function public.profil_agence() from public, anon;
revoke execute on function public.profil_role() from public, anon;
revoke execute on function public.reserver_bloc(text, integer) from public, anon;
