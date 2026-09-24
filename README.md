# Site web — Ubora Entreprise Sociale

Site officiel d'Ubora, entreprise sociale basée à Lubumbashi et active dans toute la RDC :
résilience économique, inclusion financière, structuration et digitalisation des PME,
accompagnement entrepreneurial, coopératives et chaînes de valeur, conseil, formation et gestion de projets.

**En ligne :** https://cubakakatulanya-ux.github.io/ubora-site/
**Espace équipe :** https://cubakakatulanya-ux.github.io/ubora-site/#/admin

## Les fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | Contenu de secours et réglages : coordonnées, axes, services, solutions, identifiants Supabase. |
| `index.html` | Structure de la page (en-tête, pied de page, scripts). |
| `styles.css` | Apparence : couleurs, typographies, mises en page, mode sombre. |
| `app.js` | Fonctionnement : navigation, pages, simulateur, diagnostic, formulaires. |
| `db.js` | Connexion à la base de données Supabase. |
| `admin.js` | Espace équipe : administration du contenu en ligne. |
| `supabase.sql` | Script de création de la base (déjà appliqué). |
| `logo.png` | Logo Ubora. |

## Modifier le contenu

**Actualités, formations, offres d'emploi** — rendez-vous sur `/#/admin`, connectez-vous,
et gérez tout depuis le navigateur. Les changements apparaissent aussitôt sur le site.

**Textes fixes** (services, solutions, coordonnées, valeurs) — modifiez `data.js`,
puis envoyez le fichier sur GitHub (bouton *Edit* sur github.com, ou `git push`).
Le site se met à jour en une à deux minutes.

## Base de données (déjà connectée)

Le site est relié au projet Supabase **coopec-gestion** (`uoshpvqdszygezkuhhco`, région eu-central-1).
Les tables du site y sont préfixées `site_` pour cohabiter avec les autres données du projet :
`site_actualites`, `site_formations`, `site_offres`, `site_messages`, `site_abonnes`, `site_admins`.

Les identifiants publics sont dans `data.js` (constante `SUPABASE`). La clé *anon* est prévue pour
être visible dans un site web ; l'écriture est protégée par les règles décrites dans `supabase.sql`.
**Ne publiez jamais la clé `service_role`.**

Si la base est vide ou inaccessible, le site retombe automatiquement sur le contenu écrit dans
`data.js` : il reste donc toujours consultable.

### Qui peut publier

Seules les adresses e-mail inscrites dans la table `site_admins` peuvent créer ou modifier du contenu
et lire les messages reçus. Pour ajouter un membre de l'équipe, exécutez dans le SQL Editor de Supabase :

```sql
insert into public.site_admins (email, nom) values ('prenom.nom@exemple.com', 'Prénom Nom');
```

La personne se rend ensuite sur `/#/admin`, ouvre « Première connexion ? » et choisit son mot de passe.

### Ce que la base contient

- `site_actualites`, `site_formations`, `site_offres` : contenus affichés sur le site (lecture publique de ce qui est publié).
- `site_messages` : messages envoyés par le formulaire de contact, consultables dans l'espace équipe.
- `site_abonnes` : inscriptions à la lettre d'information.
- `site_admins` : personnes autorisées à publier.

## Utiliser votre propre domaine (ex. ubora.cd)

1. Dans ce dépôt : **Settings → Pages → Custom domain**, saisissez votre domaine.
2. Chez votre hébergeur de domaine, créez un enregistrement `CNAME` pointant vers
   `cubakakatulanya-ux.github.io`.
3. Cochez **Enforce HTTPS** une fois le certificat délivré.
4. Dans Supabase : **Authentication → URL Configuration**, ajoutez la nouvelle adresse.

## Travailler en local

```bash
python -m http.server 8000
```
puis ouvrez http://localhost:8000 (ou tout autre serveur statique).

## À compléter

- Adresse e-mail définitive dans `data.js` (`CONFIG.email`).
- Liens d'**Ubora Fin** et d'**Ubora PME** (champ `site` des solutions).
- Les contenus marqués « Exemple » (actualités, formations, offres), à remplacer depuis l'espace équipe.
- Les objectifs 2028 de la page « À propos ».
