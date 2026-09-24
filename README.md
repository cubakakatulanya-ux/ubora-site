# Site web — Ubora Entreprise Sociale

Site officiel d'Ubora, entreprise sociale basée à Lubumbashi et active dans toute la RDC :
résilience économique, inclusion financière, structuration et digitalisation des PME,
accompagnement entrepreneurial, coopératives et chaînes de valeur, conseil, formation et gestion de projets.

**En ligne :** https://cubakakatulanya-ux.github.io/ubora-site/

## Les fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | **Tout le contenu du site** : coordonnées, axes, services, solutions, formations, offres d'emploi, actualités. C'est le seul fichier à modifier pour une mise à jour simple. |
| `index.html` | Structure de la page (en-tête, pied de page, scripts). |
| `styles.css` | Apparence : couleurs, typographies, mises en page, mode sombre. |
| `app.js` | Fonctionnement : navigation, pages, simulateur, diagnostic, formulaires. |
| `db.js` | Connexion à la base de données Supabase (facultative). |
| `admin.js` | Espace équipe : administration du contenu en ligne (`#/admin`). |
| `supabase.sql` | Script de création de la base de données. |
| `logo.png` | Logo Ubora. |

## Modifier le contenu

**Sans base de données** — ouvrez `data.js`, copiez un bloc existant, changez les textes, enregistrez,
puis envoyez le fichier sur GitHub (bouton *Edit* directement sur github.com, ou `git push`).
Le site se met à jour en une à deux minutes.

**Avec la base de données** — allez sur `/#/admin`, connectez-vous, et gérez vos actualités,
formations et offres d'emploi depuis le navigateur. Aucune manipulation de code.

## Activer la base de données (Supabase, gratuit)

1. Créez un compte sur [supabase.com](https://supabase.com), puis un nouveau projet (région Europe recommandée).
2. Ouvrez **SQL Editor → New query**, collez tout le contenu de `supabase.sql`, cliquez sur **Run**.
3. Ouvrez **Authentication → Users → Add user** : créez le compte de l'équipe (e-mail + mot de passe).
   C'est ce compte qui permettra de se connecter à `/#/admin`.
4. Ouvrez **Project Settings → API** et copiez :
   - *Project URL* (ex. `https://abcdefgh.supabase.co`)
   - la clé **anon public**
5. Collez-les dans `data.js` :
   ```js
   const SUPABASE = {
     url: "https://abcdefgh.supabase.co",
     anonKey: "eyJhbGciOi..."
   };
   ```
6. Envoyez la modification sur GitHub. Rendez-vous ensuite sur `/#/admin`, connectez-vous,
   et cliquez sur **Importer le contenu du fichier** pour transférer les actualités,
   formations et offres existantes dans la base.

> La clé *anon public* est faite pour être visible dans un site web : l'écriture reste protégée
> par les règles de sécurité créées par `supabase.sql`. **Ne publiez jamais la clé `service_role`.**

### Ce que la base contient

- `actualites`, `formations`, `offres` : contenus affichés sur le site (lecture publique de ce qui est publié).
- `messages` : messages envoyés par le formulaire de contact, consultables dans l'espace équipe.
- `abonnes` : inscriptions à la lettre d'information.

## Utiliser votre propre domaine (ex. ubora.cd)

1. Dans ce dépôt : **Settings → Pages → Custom domain**, saisissez votre domaine.
2. Chez votre hébergeur de domaine, créez un enregistrement `CNAME` pointant vers
   `cubakakatulanya-ux.github.io`.
3. Cochez **Enforce HTTPS** une fois le certificat délivré.

## Travailler en local

```bash
python -m http.server 8000
```
puis ouvrez http://localhost:8000 (ou utilisez n'importe quel serveur statique).

## À compléter

- Adresse e-mail définitive dans `data.js` (`CONFIG.email`).
- Liens d'**Ubora Fin** et d'**Ubora PME** (champ `site` des solutions).
- Les contenus marqués « Exemple » (actualités, formations, offres) sont à remplacer par les vrais.
- Les objectifs 2028 de la page « À propos » sont à ajuster.
