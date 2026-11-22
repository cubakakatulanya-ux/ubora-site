-- ==========================================================================
-- COOPEC — correction des règles d'accès (22 novembre 2026)
-- NON APPLIQUÉE : à valider par Christian, car elle change le fonctionnement de l'application COOPEC.
-- Ce fichier n'est pas publié sur le site (les fichiers .sql sont exclus par .assetsignore).
--
-- 1. Faille constatée : la règle actuelle de « documents » laisse passer tout compte connecté
--    qui n'a pas de profil COOPEC actif (profil_agence() est alors vide), et tout document sans agence.
--    Mesuré le 22/11 : un compte connecté sans profil lit 5 documents sur 5.
-- 2. Panne constatée : reserver_bloc() échoue à chaque appel
--    (« column reference "prefixe" is ambiguous ») ; la table compteurs est vide, aucun bloc n'a jamais été réservé.
--
-- Règle voulue : chacun ne voit que les documents de son agence ; seul un administrateur actif
-- voit tout (y compris les documents sans agence) ; un compte sans profil actif ne voit rien.
--
-- État au 22/11 : 2 comptes ; 1 profil actif (ADMIN, sans agence) ; 5 documents, tous sans agence.
-- Essai complet dans une transaction annulée, le 22/11 :
--   compte sans profil : 5 documents avant, 0 après ; réservation de numéros refusée ;
--   administrateur : 5 documents après ; réservation acceptée (blocs 1-50 puis 51-60).
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
-- « compteurs » : aucune règle, donc fermée à tous ; on n'y accède que par reserver_bloc(),
-- qui exige désormais un profil actif et ne bute plus sur le nom « prefixe ».
create or replace function public.reserver_bloc(prefixe text, taille integer default 50)
returns table(debut bigint, fin bigint) language plpgsql security definer set search_path to 'public' as $function$
#variable_conflict use_column
declare
  n int := greatest(1, least(coalesce(taille, 50), 500));
  dernier_val bigint;
begin
  if auth.uid() is null then raise exception 'connexion requise'; end if;
  if public.profil_role() is null then raise exception 'profil COOPEC actif requis'; end if;
  insert into public.compteurs (prefixe, dernier)
    values (reserver_bloc.prefixe, n)
    on conflict (prefixe) do update set dernier = public.compteurs.dernier + n
    returning public.compteurs.dernier into dernier_val;
  return query select dernier_val - n + 1, dernier_val;
end;
$function$;

commit;

-- Retour en arrière (règles d'avant), si besoin :
-- drop policy documents_lecture on public.documents;
-- create policy documents_lecture on public.documents for select to authenticated using ((profil_agence() is null) or (agence_id is null) or (agence_id = profil_agence()));
-- (même chose pour documents_ecriture « with check » et documents_maj « using » + « with check »)
