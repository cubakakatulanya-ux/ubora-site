# Site web d'Ubora, entreprise sociale

Site officiel d'Ubora, entreprise sociale basée à Lubumbashi et active dans toute la RDC.

- **Site principal :** https://uborardc.com
- **Pôles :** avec., pme., coop., fin. et market.uborardc.com (chaque sous-domaine affiche la page du pôle)
- **Outils :** akiba.uborardc.com (application AKIBA), bp.uborardc.com (générateur de business plan), hub.uborardc.com (Ubora Hub)
- **Espace équipe :** https://admin.uborardc.com

## Les fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | Tous les textes : coordonnées, mentions légales, pôles, méthode, outils, catalogue de formations, FAQ. |
| `app.js` | Construction des pages et navigation. |
| `db.js` | Connexion à la base de données Supabase. |
| `admin.js` | Espace équipe : messages, actualités, formations, offres, abonnés, questions. |
| `chat.js` | Assistant du site (répond à partir du contenu, sans service extérieur). |
| `styles.css` | Apparence : couleurs, typographies, mises en page, thème sombre. |
| `theme.js` | Applique le thème choisi par le visiteur avant l'affichage. |
| `*.html` | Pages générées par `tools/prerender.js`, une par adresse. **Ne pas modifier à la main.** |
| `tools/shell.html` | Modèle commun à toutes les pages (en-tête HTML, scripts). |
| `tools/prerender.js` | Génère les pages, `sitemap.xml` et `robots.txt`. |
| `generateur/` | Générateur de business plan (servi sur bp.uborardc.com). |
| `_headers` | En-têtes de sécurité (CSP, HSTS, etc.). |
| `_redirects` | Redirections des anciennes adresses. |
| `.assetsignore` | Fichiers du dépôt qui ne sont jamais publiés (ce fichier, `supabase.sql`, `tools/`…). |
| `supabase.sql` | Structure et règles de la base (déjà appliquées). |

## Modifier le contenu

**Actualités, formations, offres d'emploi, réalisations, équipe :** espace équipe, sur https://admin.uborardc.com.
Ce qui est publié apparaît aussitôt sur le site. Chaque nuit, une tâche automatique
(`.github/workflows/pages.yml`) régénère les pages et le plan du site pour que les moteurs
de recherche voient les nouveautés. On peut aussi la lancer à la main depuis l'onglet
*Actions* du dépôt GitHub.

**Textes fixes** (pôles, méthode, coordonnées, mentions légales) : modifier `data.js`, puis lancer

```bash
node tools/prerender.js
```

et envoyer les changements sur GitHub (`git push`). Le site se met à jour en une à deux minutes.

## Base de données

Projet Supabase **coopec-gestion** (`uoshpvqdszygezkuhhco`, eu-central-1). Les tables du site sont
préfixées `site_` : `site_actualites`, `site_formations`, `site_offres`, `site_messages`,
`site_abonnes`, `site_questions`, `site_equipe`, `site_realisations`, `site_admins`. Les photos sont dans le stockage `site-medias`.

La clé *anon* de `data.js` est faite pour être publique : les règles d'accès de la base empêchent
un visiteur de lire les messages, les abonnés ou les brouillons, et de modifier quoi que ce soit.
**Ne publiez jamais la clé `service_role`.**

### Ajouter un membre de l'équipe

1. Dans Supabase, *Authentication → Users → Add user* : saisir son adresse et un mot de passe provisoire.
2. Dans le *SQL Editor* :

```sql
insert into public.site_admins (email, nom) values ('prenom.nom@exemple.com', 'Prénom Nom');
```

La personne peut alors se connecter sur https://admin.uborardc.com.

## Hébergement

Le site est servi par **Cloudflare Workers** (projet `ubora-site`), relié à ce dépôt : chaque
`git push` sur `main` redéploie automatiquement. Pour rattacher un sous-domaine :
*Workers & Pages → ubora-site → Settings → Domains & Routes → Add → Custom domain*.

## Travailler en local

N'importe quel serveur statique convient, par exemple :

```bash
npx serve .
```
