-- ==========================================================================
-- COOPEC — correction proposée des règles d'accès (22 novembre 2026)
-- NON APPLIQUÉE : à valider par Christian, car elle change le fonctionnement de l'application COOPEC.
-- Ce fichier n'est pas publié sur le site (les fichiers .sql sont exclus par .assetsignore).
--
-- Faille constatée : la règle actuelle de « documents » laisse passer tout compte connecté
-- qui n'a pas de profil COOPEC actif (profil_agence() est alors vide), et tout document sans agence.
-- Mesuré le 22/11 : un compte connecté quelconque lit 5 documents sur 5.
--
-- Règle voulue : chacun ne voit que les documents de son agence ; seul un administrateur actif
-- voit tout (y compris les documents sans agence) ; un compte sans profil actif ne voit rien.
-- ==========================================================================

begin;

drop policy if exists documents_lecture on public.documents;
create policy documents_lecture on public.documents for select to authenticated
  using (public.profil_role() is not null and (public.profil_role() = 'ADMIN' or (agence_id is not null and agence_id = public.profil_agence())));

drop policy if exists documents_ecriture on public.documents;
create policy documents_ecriture on public.documents for insert to authenticated
  with check (public.profil_role() is not null and (public.profil_role() = 'ADMIN' or (agence_id is not null and agence_id = public.profil_agence())));

drop policy if exists documents_maj on public.documents;
create policy documents_maj on public.documents for update to authenticated
  using (public.profil_role() is not null and (public.profil_role() = 'ADMIN' or (agence_id is not null and agence_id = public.profil_agence())))
  with check (public.profil_role() is not null and (public.profil_role() = 'ADMIN' or (agence_id is not null and agence_id = public.profil_agence())));

-- « profils » : la règle actuelle est juste (chacun voit sa ligne ; ADMIN et GERANT voient tout ; seul ADMIN écrit).
-- « compteurs » : aucune règle, donc fermée à tous ; on n'y accède que par reserver_bloc(), qui doit exiger un profil actif :
create or replace function public.reserver_bloc(prefixe text, taille integer default 50)
returns table(debut bigint, fin bigint) language plpgsql security definer set search_path to 'public' as $function$
declare n int := greatest(1, least(coalesce(taille, 50), 500)); dernier_val bigint;
begin
  if auth.uid() is null then raise exception 'connexion requise'; end if;
  if public.profil_role() is null then raise exception 'profil COOPEC actif requis'; end if;
  -- … reprendre ici le reste du corps actuel de la fonction (insertion dans public.compteurs), inchangé.
  raise exception 'à compléter avec le corps actuel avant application';
end $function$;

-- vérification, à lancer avant le « commit » : un compte sans profil ne doit plus rien voir
-- (le résultat attendu est 0 document)
-- set local role authenticated; select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}', true); select count(*) from public.documents; reset role;

rollback;  -- remplacer par « commit » une fois validé
