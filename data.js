/* ==========================================================================
   UBORA — CONTENU DU SITE
   Tous les textes du site sont ici. Pour une mise à jour simple, modifiez
   le texte entre guillemets, enregistrez, puis envoyez le fichier sur GitHub.
   Les actualités, formations et offres d'emploi se gèrent depuis l'espace
   équipe (uborardc.com/admin) et sont enregistrées dans la base de données.
   ========================================================================== */

const SUPABASE = {
  url: "https://uoshpvqdszygezkuhhco.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc2hwdnFkc3p5Z2V6a3VoaGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjYwNzQsImV4cCI6MjEwNTg0MjA3NH0.mMV8Z2dl981BGl0o_CLSAsxPsO3QzQlAAWWwT4YVVW4"
};

const CONFIG = {
  site: "https://uborardc.com",
  email: "contact@uborardc.com",
  telephone: "+243 998 275 144",
  whatsapp: "243998275144",
  adresse: "Avenue Mapendo, Q. Kalubwe, Lubumbashi, RDC",
  zone: "Partout en RDC, sur le terrain et à distance",
  horaires: "Du lundi au vendredi, de 8 h à 16 h",
  /* Mentions légales. Un champ laissé vide n'est pas affiché sur le site. */
  legal: { rccm: "CD/KNM/RCCM/24-A-04755", idnat: "01-G4701-N86995I", impot: "", directeur: "Christian Cubaka Katulanya, Directeur Gérant" }
};

/* Bande déroulante. Les dernières actualités publiées s'y ajoutent d'elles-mêmes. */
const TICKER_MESSAGES = [
  ["Ubora est une entreprise à caractère social : ses excédents sont réinvestis", "/soutenir"],
  ["Nouveau : l'Académie Ubora, plus de 100 cours en ligne avec certificat", "/academie"],
  ["Nouveau dans AKIBA : un reçu imprimé pour chaque membre", "/outils/akiba"],
  ["Nouvelle version du générateur de business plan", "/outils/bp"],
  ["Nouveau : Ubora Vert, pour protéger l'environnement et en vivre", "/vert"],
  ["Basés à Lubumbashi, nous intervenons partout en RDC", "/contact"]
];

/* ---------- Le Directeur Gérant (page « Notre équipe ») ----------
   Tiré de son CV. Les coordonnées personnelles et les références n'apparaissent pas sur le site. */
const DIRIGEANT = {
  nom: "Christian Cubaka Katulanya",
  fonction: "Directeur Gérant et fondateur",
  photo: "/img/equipe/christian-cubaka-800.webp",
  photoPetite: "/img/equipe/christian-cubaka-400.webp",
  accroche: "Plus de dix ans aux côtés des entrepreneurs, des coopératives et des groupes d'épargne en RDC.",
  bio: "Agronome de formation, Christian accompagne depuis plus de dix ans des entrepreneurs, des PME, des coopératives agricoles et des groupes d'épargne, en ville comme en zone rurale. Il a travaillé pour une banque, pour des programmes de coopération internationale et pour un grand projet d'appui aux PME, à Kinshasa, au Kivu et dans le Sud-Ubangi. Il a fondé Ubora pour que cet accompagnement dure au-delà des projets, et il y conçoit Ubora Hub et l'application AKIBA.",
  parcours: [
    ["Depuis 2026", "Entreprise sociale Ubora", "Fondateur et Directeur Gérant", "Conception d'Ubora Hub, incubateur numérique, et d'AKIBA, l'application hors ligne des AVEC."],
    ["Depuis 2026", "Programme de développement agricole, Sud-Ubangi", "Expert en entrepreneuriat agricole", "PME, coopératives, AVEC et incubateur provincial : structuration, plans d'affaires, accès au financement."],
    ["2024 – 2025", "Projet d'appui aux PME, Kinshasa", "Expert junior en entrepreneuriat et mutualisation des investissements", "Centres de PME, chaînes de valeur, modèles économiques et investissements partagés."],
    ["2021 – 2024", "Programme d'emploi et d'entrepreneuriat, Kinshasa", "Expert en incubation et entrepreneuriat urbain", "Deux incubateurs, programmes de formation et d'accélération, formation de formateurs."],
    ["2018 – 2021", "Programme de sécurité alimentaire, Sud-Kivu", "Coordinateur des activités génératrices de revenus", "Mise en place des AVEC, appui aux coopératives agricoles, aux jeunes et aux femmes entrepreneurs."],
    ["2015 – 2018", "Banque commerciale, Goma et Bukavu", "Chargé de clientèle agrobusiness", "Portefeuille de PME et de coopératives : analyse de viabilité, préparation au crédit."]
  ],
  domaines: ["Coopératives et AVEC", "Incubation et accompagnement des PME", "Modèles économiques et plans d'affaires", "Formation de formateurs et coaching", "Accès au financement", "Outils numériques"],
  formation: "Licence en agronomie (sciences du sol). Formations complémentaires : coaching entrepreneurial, développement des systèmes de marché, accompagnement des jeunes agri-preneurs.",
  langues: "Français, swahili, lingala, anglais"
};

/* ---------- La méthode Ubora (page « Notre approche ») ---------- */
const METHODE = {
  nom: "La méthode Ubora",
  intro: "Nous avons vu trop de projets former des gens, puis partir. Et trop de logiciels installés que personne n'utilise six mois plus tard. Que nous accompagnions un groupe d'épargne, un entrepreneur ou une coopérative, notre façon de travailler tient en six temps, toujours dans le même ordre, et nous restons tant qu'ils ne sont pas capables de continuer seuls.",
  /* pour chaque temps : ce qu'il donne pour un groupe d'épargne, un entrepreneur et une coopérative, dans cet ordre */
  publics: ["Groupe d'épargne", "Entrepreneur", "Coopérative"],
  etapes: [
    { titre: "Écouter", texte: "On commence sur place, avec les personnes concernées, dans leur langue. On regarde ce qui existe déjà avant de proposer quoi que ce soit.",
      exemples: ["Comment le groupe épargne et prête déjà, et ce qui coince.", "Son idée, ses premiers clients, ce qu'il a déjà essayé.", "Qui produit quoi, qui vend à qui, et où l'argent se perd."],
      pourquoi: "Un dispositif pensé depuis un bureau ne résiste pas au premier cycle sur le terrain." },
    { titre: "Structurer", texte: "On met par écrit ce qui était flou : qui décide, qui fait quoi, et où va l'argent.",
      exemples: ["Statuts, règlement intérieur, caisse séparée du fonds social.", "Un modèle économique testé auprès de vrais clients, puis un plan d'affaires.", "Statuts conformes à l'OHADA, immatriculation, organes de gestion."],
      pourquoi: "La plupart des conflits naissent de règles jamais écrites, pas du manque d'argent." },
    { titre: "Former", texte: "Gestion, éducation financière, vente, crédit : chacun apprend ce qu'il lui faut pour décider seul. Et nous formons des relais locaux, qui restent après nous.",
      exemples: ["Les membres, le comité et les animateurs.", "Coûts, prix, comptes et vente, en cohorte ou en ligne à l'Académie.", "Les dirigeants, les gérants et les producteurs."],
      pourquoi: "Quand le projet s'arrête, c'est le relais local qui reste." },
    { titre: "Outiller", texte: "On remplace le cahier et les fichiers dispersés par un outil numérique simple, qui marche sans réseau, en francs congolais et en dollars.",
      exemples: ["AKIBA, pour les réunions, la caisse et les reçus.", "Le générateur de business plan, et Ubora Hub pour l'incubateur qui le suit.", "Des registres clairs pour les membres, la collecte et les ventes ; le logiciel Ubora Coop est en préparation."],
      pourquoi: "Réseau instable, deux monnaies, niveaux d'instruction variés : l'outil doit s'adapter, pas l'inverse." },
    { titre: "Connecter", texte: "L'historique tenu dans nos outils devient un dossier que l'on présente aux institutions financières et aux acheteurs.",
      exemples: ["Un dossier pour une IMF, une COOPEC ou une banque.", "Un plan d'affaires chiffré et des rendez-vous avec des financeurs.", "Des acheteurs trouvés avant la récolte, et des contrats."],
      pourquoi: "Un groupe, une entreprise ou une coopérative sérieuse reste invisible tant que personne ne sait prouver sa régularité." },
    { titre: "Suivre", texte: "Visites régulières, indicateurs partagés, réponse rapide sur WhatsApp. On ne part que lorsque ça tient.",
      exemples: ["Jusqu'au partage de fin de cycle, puis au cycle suivant.", "Après le lancement, quand viennent les premières difficultés.", "Campagne après campagne, jusqu'au paiement des producteurs."],
      pourquoi: "L'abandon juste après la formation est la cause d'échec la plus fréquente des projets d'accompagnement." }
  ]
};

/* ==========================================================================
   LES SEPT PÔLES (Ubora Académie est transversale : elle sert tous les autres)
   Chaque pôle a sa page (et son sous-domaine), avec la même construction :
   le contexte en RDC, notre démarche, les outils liés, la boîte à outils.
   ========================================================================== */
const POLES = [
  {
    id: "avec", chemin: "/avec", sousDomaine: "avec.uborardc.com",
    photo: ["avec", "Des femmes réunies en groupe, en pagnes colorés"],
    nom: "Ubora AVEC", initiales: "Av", couleur: "#23843A",
    accroche: "Épargner ensemble, emprunter sans crainte.",
    carte: "Quinze à trente personnes qui épargnent chaque semaine. Nous structurons le groupe, remplaçons le cahier par AKIBA et l'accompagnons jusqu'au crédit.",
    titre: `Des groupes d'épargne solides, et un vrai accès au <span class="serif">crédit</span>.`,
    lead: "Les Associations Villageoises d'Épargne et de Crédit sont souvent le premier service financier auquel une famille congolaise a accès. Nous les accompagnons de la création du groupe jusqu'à son premier financement : un prêt ou un fonds de roulement d'une institution financière, qu'Ubora Fin aide à mobiliser.",
    contexte: {
      intro: "En ville comme en zone rurale, beaucoup de ménages n'ont ni compte bancaire ni accès au crédit. L'AVEC comble ce vide avec des moyens très simples. Mais la plupart des groupes restent fragiles.",
      constats: [
        ["Peu de ménages sont bancarisés", "Pour une grande partie de la population, l'AVEC est le seul moyen d'épargner régulièrement et d'emprunter en cas de besoin."],
        ["Le cahier se perd ou s'abîme", "Les comptes sont recopiés à la main à chaque réunion. Une erreur, et la confiance s'effrite au moment du partage."],
        ["Des années d'épargne sans trace", "Un groupe peut épargner avec sérieux pendant des années et n'avoir rien à montrer à une banque."],
        ["Le suivi s'arrête avec le projet", "Quand le financement se termine, l'encadrement disparaît et beaucoup de groupes se dispersent."]
      ]
    },
    parcours: [
      ["Diagnostiquer", "Étude de référence, repérage des communautés, diagnostic des groupes qui existent déjà.", "On sait avec qui travailler, et par où commencer."],
      ["Mettre en place", "Sensibilisation, constitution du groupe, statuts, règlement intérieur, élection du comité.", "Un groupe organisé, avec des règles connues de tous."],
      ["Former", "Modules de formation des membres, éducation financière, formation des animateurs et des relais.", "Des membres qui comprennent ce qu'ils font, et des relais sur place."],
      ["Digitaliser", "Passage du cahier à AKIBA : réunion guidée en huit étapes, registre scellé, partage de fin de cycle calculé par le téléphone.", "Des comptes justes, que chaque membre peut vérifier."],
      ["Relier au financement", "Nous présentons l'historique du groupe aux IMF, aux COOPEC et aux banques, et Ubora Fin mobilise auprès des financeurs le capital dont le groupe a besoin.", "Un groupe qui peut prêter davantage à ses membres, à des conditions raisonnables."],
      ["Suivre et faire grandir", "Supervision, graduation, activités génératrices de revenus, puis regroupement en fédération.", "Des groupes qui durent, et qui se renforcent ensemble."]
    ],
    avec: true,
    outils: ["akiba", "academie"],
    publics: ["Groupes AVEC et mutuelles de solidarité", "Réseaux et fédérations d'AVEC", "ONG et programmes d'inclusion financière", "IMF, COOPEC et banques"],
    boite: {
      statut: "disponible",
      titre: "La boîte à outils AVEC",
      intro: "Seize documents issus de nos propres déploiements. Nous les remettons aux organisations et aux réseaux qui accompagnent des groupes d'épargne, avec un temps d'explication.",
      outils: [
        ["Guide général", "Comment utiliser l'ensemble des documents, et dans quel ordre."],
        ["Étude de référence", "Le questionnaire d'enquête avant de démarrer : besoins, habitudes d'épargne, acteurs présents."],
        ["Identification et sensibilisation", "Repérer les communautés, présenter la démarche, obtenir l'adhésion."],
        ["Formation des animateurs", "Le programme complet pour les agents et les relais communautaires."],
        ["Modules de formation des AVEC", "Les séances à animer avec le groupe, de sa création au premier partage."],
        ["Carnets, registres et règlement", "Carnet du membre, registre du groupe, règlement intérieur et statuts types."],
        ["Diagnostic des AVEC existantes", "La grille pour évaluer un groupe déjà en place et repérer ses points faibles."],
        ["Suivi, supervision et graduation", "Fiches de visite, indicateurs de maturité, critères de graduation."],
        ["Activités génératrices de revenus", "Choisir une activité, la chiffrer et la lancer."],
        ["Modules complémentaires", "Alphabétisation financière, gestion des conflits, leadership féminin."],
        ["Fédération des AVEC", "Regrouper plusieurs groupes en fédération et l'organiser."],
        ["Évaluation finale", "La méthode d'évaluation en fin de cycle ou en fin de projet."],
        ["Plan d'affaires simplifié", "Un format court pour les membres qui lancent une activité."],
        ["Livret du membre", "Ce que chaque membre garde : ses droits, ses devoirs, son épargne."],
        ["La méthode Ubora", "Notre démarche d'accompagnement, écrite pour être transmise."],
        ["Modèles vierges", "Tous les formulaires et tableaux, prêts à imprimer."]
      ]
    }
  },

  {
    id: "pme", chemin: "/pme", sousDomaine: "pme.uborardc.com",
    accroche: "De l'idée à l'entreprise qui vend.",
    photo: ["pme", "Un tailleur au travail sur sa machine à coudre"],
    nom: "Ubora PME", initiales: "Pm", couleur: "#B0622A",
    carte: "Tester l'idée auprès de vrais clients avant d'investir, lancer l'entreprise, puis la faire grandir et la financer.",
    titre: `Aider les entrepreneurs à passer de l'idée à une entreprise qui <span class="serif">vend</span>.`,
    lead: "Ubora PME regroupe nos programmes d'accompagnement : idéation, incubation et accélération. Nous y appliquons la démarche lean startup, adaptée à ce que vivent réellement les entrepreneurs en RDC.",
    contexte: {
      intro: "On demande encore trop souvent aux porteurs de projet un plan d'affaires de trente pages avant même qu'ils aient parlé à un client. Nous faisons l'inverse. On part d'une hypothèse, on la teste avec très peu de moyens auprès de vrais clients, puis on décide. Le plan d'affaires vient après, quand il y a quelque chose à financer.",
      constats: [
        ["Des idées jamais testées", "On passe des mois à fabriquer un produit que personne n'a demandé, puis on cherche des clients."],
        ["Peu de données sur les marchés", "Les études fiables sont rares. Il faut aller chercher l'information soi-même, au marché, chez les clients."],
        ["Des moyens très limités", "Impossible de dépenser beaucoup pour tester une idée. Chaque essai doit coûter presque rien."],
        ["Un accompagnement qui s'arrête trop tôt", "Beaucoup de programmes s'arrêtent au concours de pitch, juste avant les vraies difficultés : vendre, produire, recruter."]
      ]
    },
    programmes: [
      ["Idéation", "Pour les porteurs d'idée", "Partir d'un problème réel, formuler une proposition claire, et la confronter au terrain avant d'investir."],
      ["Incubation", "Pour les jeunes entreprises", "Trouver un modèle économique qui tient, se formaliser, faire ses premières ventes et tenir ses comptes."],
      ["Accélération", "Pour les PME qui grandissent", "Organiser la croissance : équipe, canaux de vente, nouveaux marchés et financement."]
    ],
    parcours: [
      ["Partir d'un problème", "On observe un besoin réel, on formule une proposition de valeur et on liste ce qu'il faut vérifier en premier.", "Une idée claire et des hypothèses à tester."],
      ["Tester sur le terrain", "Un produit minimum, présenté à de vrais clients. On regarde ce qu'ils font, pas seulement ce qu'ils disent.", "La preuve qu'il y a une demande, ou la décision de changer de cap."],
      ["Lancer l'entreprise", "Modèle économique, prix, formalisation, premières ventes, tenue de la caisse.", "Une entreprise qui vend et qui sait ce qu'elle gagne."],
      ["Faire grandir", "Canaux de vente, équipe, capacité de production, nouveaux marchés.", "Une croissance préparée plutôt que subie."],
      ["Financer", "Plan d'affaires construit avec notre générateur en ligne, dossier de crédit, rencontre des financeurs.", "Un dossier recevable et des rendez-vous obtenus."],
      ["Suivre", "Un point par mois après le programme, les indicateurs suivis, un appui à distance.", "Une entreprise qui tient une fois seule."]
    ],
    outils: ["bp", "hub"],
    publics: ["Porteurs de projet", "Jeunes entreprises", "PME en croissance", "Incubateurs et programmes partenaires"],
    boite: {
      statut: "bientot",
      titre: "La boîte à outils de l'entrepreneur",
      intro: "Nous mettons en forme les modèles que nous utilisons avec nos cohortes. Ils seront disponibles ici.",
      outils: [
        ["Proposition de valeur", "Le problème, le client et la solution, sur une seule page."],
        ["Hypothèses à tester", "Ce qu'il faut vérifier d'abord, et comment le vérifier à moindre coût."],
        ["Guide de l'entretien client", "Les bonnes questions à poser, et celles qu'il vaut mieux éviter."],
        ["Tenue de caisse", "Un tableur simple, en francs congolais et en dollars."],
        ["Prix de revient", "Pour fixer un prix qui couvre vraiment vos coûts."],
        ["Guide de la formalisation", "RCCM, identification nationale, impôts : les démarches, les pièces, les coûts."]
      ]
    }
  },

  {
    id: "cooperatives", chemin: "/cooperatives", sousDomaine: "coop.uborardc.com",
    accroche: "Produire ensemble, vendre mieux, être payé à temps.",
    photo: ["coop", "Des cultivateurs au travail dans un champ"],
    nom: "Ubora Coop", initiales: "Co", couleur: "#3E7A1F",
    carte: "Des statuts OHADA à la vente groupée : nous renforçons chaque maillon de la chaîne de valeur, et les producteurs sont payés à temps.",
    titre: `Des coopératives bien gérées, et des producteurs <span class="serif">payés à temps</span>.`,
    lead: "Nous partons de ce qui existe : une organisation paysanne, un groupement de producteurs ou une coopérative qui ne fonctionne plus. Nous l'aidons à se constituer ou à se remettre en ordre, puis à gérer, vendre et se financer. Nous travaillons sur toute la chaîne de valeur, des intrants jusqu'au paiement du producteur.",
    contexte: {
      intro: "Nous arrivons rarement devant une page blanche. Il y a presque toujours déjà un groupe de producteurs qui travaille ensemble, ou une coopérative créée il y a des années et restée en sommeil. Notre travail commence là.",
      constats: [
        ["Des groupements sans existence légale", "Les producteurs travaillent ensemble, mais sans statuts ni immatriculation. Pas de compte bancaire, pas de contrat, pas de crédit possible."],
        ["Des coopératives en sommeil", "Immatriculées un jour, puis plus d'assemblée, plus de comptes tenus, plus d'activité commune."],
        ["Des volumes que personne ne connaît", "Sans registre des membres et des parcelles, impossible d'annoncer une quantité fiable à un acheteur."],
        ["Des paiements en retard", "Quand les producteurs sont payés tard, ils vendent ailleurs à la campagne suivante."]
      ]
    },
    entrees: [
      ["Vous êtes une organisation paysanne ou un groupement", "Nous vous aidons à constituer la coopérative : assemblée constitutive, statuts conformes à l'OHADA, immatriculation, ouverture du compte."],
      ["Vous êtes une coopérative qui ne fonctionne plus", "Nous faisons le diagnostic, puis nous remettons les choses en ordre : révision des statuts, renouvellement des organes, reconstitution des comptes."]
    ],
    chaine: {
      titre: "Toute la chaîne de valeur, du champ jusqu'au paiement",
      intro: "Une coopérative ne gagne pas seulement en produisant plus. Elle gagne à chaque maillon qu'elle maîtrise : acheter ensemble, stocker au lieu de brader, transformer pour vendre plus cher. Nous analysons la filière avec les membres, puis nous renforçons les maillons qui rapportent le plus.",
      maillons: [
        ["Intrants", "Semences, engrais et outils achetés en groupe, à crédit si besoin.", "Des coûts en baisse, des intrants à temps."],
        ["Production", "Bonnes pratiques agricoles, calendrier de campagne, suivi des parcelles.", "Des rendements et une qualité réguliers."],
        ["Collecte", "Points de collecte, pesée contrôlée, fiche par producteur.", "Des volumes connus et vérifiables."],
        ["Stockage", "Entrepôt, séchage, conservation, crédit sur stock (warrantage).", "Vendre au bon moment, sans brader."],
        ["Transformation", "Décorticage, mouture, conditionnement, étiquetage.", "Plus de valeur gardée par la coopérative."],
        ["Vente", "Contrats de vente groupée avec les acheteurs, avec Ubora Market.", "Un meilleur prix, négocié ensemble."],
        ["Paiement", "Décompte par producteur, paiement par mobile money.", "Des producteurs payés à temps, qui restent."]
      ]
    },
    parcours: [
      ["Faire le diagnostic", "Statuts, gouvernance, comptes, activité : on regarde où en est l'organisation.", "Un point de départ clair, et le choix entre créer ou redresser."],
      ["Constituer ou remettre en ordre", "Assemblée constitutive et parts sociales, ou révision des statuts et renouvellement des organes.", "Une coopérative qui existe vraiment, avec des membres engagés."],
      ["Formaliser", "Statuts conformes à l'Acte uniforme OHADA, immatriculation au registre des sociétés coopératives, identification nationale.", "Une personnalité juridique : contrats, compte bancaire et crédit deviennent possibles."],
      ["Organiser", "Règlement intérieur, rôles séparés entre l'assemblée, le conseil et la gérance, procédures de caisse et de stock.", "Des règles écrites qui évitent les conflits."],
      ["Gérer au quotidien", "Registre des membres et des parcelles, collecte, stocks, caisse et banque, tableau de bord du gérant.", "Des comptes à jour, que les membres peuvent vérifier."],
      ["Vendre ensemble", "Recherche d'acheteurs, contrats de vente groupée, planification des livraisons.", "Un meilleur prix que chacun de son côté."],
      ["Payer et financer", "Décomptes par producteur, paiements par mobile money, crédit de campagne et intrants.", "Des producteurs payés à temps, qui restent fidèles."],
      ["Suivre", "Appui aux assemblées, aux rapports et à la vie de la coopérative.", "Une coopérative autonome au bout d'une campagne."]
    ],
    outils: ["logiciel-coop"],
    publics: ["Organisations paysannes", "Groupements de producteurs", "Coopératives agricoles", "Unions de coopératives", "ONG et programmes agricoles"],
    boite: {
      statut: "bientot",
      titre: "La boîte à outils de gestion coopérative",
      intro: "Les documents que nous installons dans chaque coopérative accompagnée, de la constitution jusqu'aux comptes de fin de campagne.",
      outils: [
        ["Statuts types conformes à l'OHADA", "Pour une coopérative simplifiée ou avec conseil d'administration."],
        ["Règlement intérieur", "Droits et devoirs des membres, fonctionnement des organes, sanctions."],
        ["Dossier de constitution", "Convocation, procès-verbal de l'assemblée constitutive, liste des parts souscrites."],
        ["Registre des membres et des parcelles", "À tenir dès la première campagne."],
        ["Registre des parts sociales", "Souscriptions, libérations, cessions, remboursements."],
        ["Livre de caisse et de banque", "En francs congolais et en dollars, avec un arrêté chaque mois."],
        ["Fiche de collecte et de pesée", "Du producteur jusqu'à l'entrepôt."],
        ["Fiche de stock et d'inventaire", "Entrées, sorties, pertes, valeur du stock."],
        ["Suivi des intrants à crédit", "Distribution, récupération sur les ventes, solde par producteur."],
        ["Contrat de vente groupée", "Les clauses à ne pas oublier face à un acheteur."],
        ["Décompte de paiement producteur", "Le détail remis à chaque membre après la vente."],
        ["Procès-verbal d'assemblée", "Pour des décisions claires et archivées."],
        ["Budget de campagne", "Prévoir les besoins, les recettes et la trésorerie de la saison."],
        ["Tableau de bord du gérant", "Collecte, stock, ventes, trésorerie, impayés : ce qu'il faut suivre chaque mois."],
        ["Rapport annuel", "Le compte rendu à présenter en assemblée générale."]
      ]
    }
  },

  {
    id: "financement", chemin: "/financement", sousDomaine: "fin.uborardc.com",
    accroche: "Le crédit, jusqu'où il n'allait pas.",
    photo: ["fin", "Trois femmes échangent autour d'une table de réunion"],
    nom: "Ubora Fin", initiales: "Fi", couleur: "#1D5FB8",
    carte: "Nous préparons les emprunteurs, les présentons aux institutions financières et mobilisons le capital des financeurs au profit des groupes que nous accompagnons.",
    titre: `Rapprocher ceux qui ont besoin de crédit de ceux qui <span class="serif">prêtent</span>.`,
    lead: "Le crédit existe en RDC, mais il atteint mal les petits emprunteurs. Nous travaillons des deux côtés, et entre les deux : nous préparons les groupes, les coopératives et les PME, nous les présentons aux institutions financières, et nous mobilisons le capital des financeurs à leur profit. Ubora Fin ne prête pas elle-même : elle fait venir le capital là où il manque.",
    contexte: {
      intro: "D'un côté, des emprunteurs qui n'ont rien à présenter. De l'autre, des institutions qui n'ont pas les moyens d'étudier de petits dossiers sans y perdre de l'argent. Tant que l'on ne travaille qu'un seul côté, rien ne bouge.",
      constats: [
        ["Pas d'historique, pas de crédit", "Un groupe qui épargne depuis trois ans reste invisible pour une banque s'il ne peut rien prouver."],
        ["Des dossiers refusés d'emblée", "Sans comptes ni prévisions, la demande est écartée avant même d'être étudiée."],
        ["Un coût d'étude trop élevé", "Étudier un crédit de 500 dollars coûte presque autant qu'un crédit de 50 000. Beaucoup d'institutions renoncent."],
        ["Des impayés repérés trop tard", "Sans outil de suivi, les retards se découvrent quand il est déjà difficile d'agir."]
      ]
    },
    parcours: [
      ["Former et coacher", "Éducation financière, gestion du crédit, tenue des comptes. On apprend à bien gérer avant d'emprunter.", "Des emprunteurs préparés, pas seulement demandeurs."],
      ["Monter le dossier", "Comptes tenus, plan d'affaires chiffré, garanties réalistes.", "Un dossier qu'une institution peut réellement étudier."],
      ["Constituer un historique", "Les cotisations, les prêts et les remboursements enregistrés dans nos outils servent de preuves.", "Des indicateurs qu'un financier sait lire."],
      ["Mettre en relation", "Nous présentons les dossiers aux IMF, aux COOPEC et aux banques, et nous suivons la discussion.", "Un premier crédit, à des conditions supportables."],
      ["Mobiliser le capital", "Pour les groupes que nous suivons, Ubora Fin mobilise le capital auprès d'institutions financières, d'investisseurs d'impact et de bailleurs. Ce sont eux qui financent ; nous préparons, présentons et suivons.", "Un fonds de roulement pour le groupe, en plus de l'épargne des membres."],
      ["Suivre le remboursement", "Échéances, relances, appui en cas de difficulté, des deux côtés.", "Un bon historique, qui ouvre la porte au crédit suivant."]
    ],
    intermediation: {
      titre: "Le lien entre ceux qui financent et les groupes d'épargne",
      intro: "Une banque ne peut pas étudier des centaines de petits dossiers dans des villages éloignés. Un groupe d'épargne ne sait pas à quelle porte frapper. Ubora Fin se place entre les deux : nous ne prêtons pas nous-mêmes, nous mobilisons le capital de ceux qui veulent financer au profit des AVEC que nous connaissons, sous forme de fonds de roulement.",
      etapes: [
        ["Mobiliser le capital", "Lignes de crédit d'institutions de microfinance et de banques, capitaux d'investisseurs d'impact, fonds de garantie apportés par des bailleurs."],
        ["L'orienter vers les groupes", "Le capital va au groupe, et non à chaque membre, par paliers, selon l'historique enregistré dans AKIBA et son niveau « prête pour une IMF »."],
        ["Suivre et rendre compte", "Les remboursements sont suivis semaine après semaine. Chaque financeur reçoit des rapports clairs sur l'usage de son argent."],
        ["Faire grandir", "Les groupes les plus solides passent en relation directe avec l'institution partenaire. Le capital remboursé peut servir d'autres groupes."]
      ],
      gains: [
        ["Pour les institutions financières", "Une clientèle nouvelle, déjà formée et suivie, sans coût d'étude dossier par dossier. Le risque est réparti sur de nombreux groupes et porté par la caution solidaire des membres."],
        ["Pour les AVEC", "Plus d'argent à prêter aux membres, au bon moment de l'année, sans garantie matérielle, à un coût raisonnable et avec un accompagnement."],
        ["Pour les bailleurs et les investisseurs", "Un fonds qui tourne au lieu d'une subvention consommée une seule fois, et un impact mesuré à partir de données réelles."]
      ]
    },
    projet: {
      titre: "Une société de crédit pour les AVEC",
      texte: "Pour porter ce rôle d'intermédiaire à plus grande échelle, dans un cadre agréé, nous préparons la création d'une société de crédit dédiée aux AVEC. Elle s'appuiera sur l'historique d'épargne des groupes et sur leur discipline collective.",
      etat: "Projet en préparation. L'étude de faisabilité, le cadre réglementaire et la recherche de partenaires financiers sont en cours.",
      appel: "Institution, bailleur ou investisseur intéressé ? Parlons-en."
    },
    outils: ["akiba", "academie"],
    publics: ["Groupes AVEC", "Coopératives et PME qui cherchent un crédit", "Petites IMF et COOPEC", "Mutuelles d'épargne et de crédit", "Programmes de crédit des ONG"],
    boite: {
      statut: "bientot",
      titre: "Les outils de l'accès au financement",
      intro: "Les documents que nous utilisons pour préparer un dossier de crédit seront bientôt disponibles.",
      outils: [
        ["Dossier de crédit type", "Ce qu'attendent les IMF et les banques congolaises."],
        ["Capacité de remboursement", "Calculer ce qu'un emprunteur peut réellement rembourser."],
        ["Prévisions de trésorerie", "Sur douze mois, en francs congolais et en dollars."],
        ["Fiche de discipline du groupe", "Les indicateurs qui rassurent un financier."]
      ]
    }
  },

  {
    id: "marche", chemin: "/marche", sousDomaine: "market.uborardc.com",
    accroche: "Un bon produit mérite un acheteur.",
    photo: ["market", "Un étal de tomates et de légumes sur un marché"],
    nom: "Ubora Market", initiales: "Mk", couleur: "#1F7A6B",
    carte: "Nous trouvons l'acheteur avant la récolte, et nous suivons chaque vente jusqu'au paiement du producteur.",
    titre: `Produire, c'est bien. Trouver des <span class="serif">acheteurs</span>, c'est mieux.`,
    lead: "Ubora Market met en relation les vendeurs que nous accompagnons, PME, coopératives et entrepreneurs, avec des acheteurs : entreprises, institutions et particuliers. Une plateforme dédiée est en préparation.",
    contexte: {
      intro: "Le maillon qui casse le plus souvent n'est ni la production ni le financement. C'est la vente. Un producteur qui écoule mal sa récolte perd sa campagne, rembourse mal son crédit et finit par se décourager.",
      constats: [
        ["Vendre au premier venu", "Sans acheteur trouvé à l'avance, on brade sa récolte au premier intermédiaire qui passe."],
        ["Des volumes trop petits", "Seul, un producteur n'atteint jamais la quantité qu'exige un acheteur important."],
        ["Une qualité irrégulière", "Emballage, séchage, calibrage : les exigences des acheteurs sont rarement connues."],
        ["La confiance qui manque", "Acheteurs et vendeurs se méfient les uns des autres, faute de quelqu'un qui garantisse l'échange."]
      ]
    },
    canaux: {
      titre: "Quatre débouchés, quatre façons de vendre",
      intro: "Le bon débouché dépend du produit, de la quantité et de la capacité à livrer. Nous le choisissons avec le vendeur, puis nous le préparons à ce que ce débouché exige.",
      liste: [
        ["Entreprises (B2B)", "Agro-industries, grossistes, hôtels, restaurants.", "De gros volumes et des contrats réguliers, mais des exigences strictes sur la qualité, la régularité et la facturation."],
        ["Particuliers (B2C)", "Vente directe, boutiques, réseaux sociaux, livraison.", "Une meilleure marge et un paiement immédiat, en échange d'un effort commercial de tous les jours."],
        ["Institutions et programmes", "Écoles, hôpitaux, ONG, projets, marchés publics.", "Des commandes prévisibles, à condition d'être formalisé et de savoir répondre à un appel d'offres."],
        ["Export régional", "Zambie, Tanzanie et pays voisins.", "De meilleurs prix pour les filières qui atteignent la quantité et les normes demandées."]
      ]
    },
    parcours: [
      ["Recenser l'offre", "Ce que produisent nos bénéficiaires, en quelle quantité, à quelle période et où.", "Une offre que l'on peut annoncer et vérifier."],
      ["Connaître la demande", "Rencontrer les acheteurs pour comprendre leurs volumes, leurs prix et leurs exigences.", "Des débouchés précis, avec leurs conditions."],
      ["Choisir le débouché", "Entreprises, particuliers, institutions ou export, selon le produit et la capacité à livrer.", "Une stratégie commerciale réaliste."],
      ["Se mettre à niveau", "Qualité, emballage, régularité des livraisons, documents demandés.", "Une offre conforme à ce que l'acheteur attend."],
      ["Regrouper et présenter", "Rassembler l'offre de plusieurs vendeurs et organiser la rencontre avec l'acheteur.", "Une quantité suffisante et une négociation équilibrée."],
      ["Signer", "Contrat, prix, calendrier de livraison, conditions de paiement.", "Un engagement écrit, des deux côtés."],
      ["Suivre jusqu'au paiement", "Livraisons, contrôle de la qualité, paiement jusqu'au producteur.", "Des vendeurs payés, et un acheteur qui revient."]
    ],
    projet: {
      titre: "Une plateforme de mise en relation",
      texte: "Nous préparons une plateforme en ligne où les vendeurs que nous accompagnons publieront leur offre : produit, quantité, période, lieu. Les acheteurs y trouveront directement des fournisseurs vérifiés, chacun avec l'historique de ses livraisons. C'est ce qui rassure vraiment un acheteur.",
      etat: "Projet en cours de développement. Les premiers essais se font avec des acheteurs et des coopératives pilotes.",
      appel: "Acheteur ou vendeur, vous voulez participer à la phase pilote ? Écrivez-nous."
    },
    outils: ["plateforme-market"],
    publics: ["PME et commerces", "Coopératives agricoles", "Transformateurs et artisans", "Acheteurs, grossistes et agro-industries"],
    boite: {
      statut: "bientot",
      titre: "Les outils de l'accès au marché",
      intro: "Les documents commerciaux que nous utilisons avec nos bénéficiaires seront bientôt disponibles.",
      outils: [
        ["Contrat de vente groupée", "Les clauses à ne pas oublier face à un acheteur."],
        ["Fiche technique produit", "Présenter son produit comme un acheteur le demande."],
        ["Grille qualité et emballage", "Ce qui est contrôlé à la réception."],
        ["Calendrier de campagne", "Prévoir la récolte, la collecte et la livraison."]
      ]
    }
  },

  {
    id: "vert", chemin: "/vert", sousDomaine: "vert.uborardc.com",
    accroche: "Protéger la terre, et en vivre.",
    photo: ["vert", "Des mains tiennent un jeune plant dans un sachet de pépinière"],
    nom: "Ubora Vert", initiales: "Ve", couleur: "#557A17",
    carte: "Reboisement, recyclage, agroécologie, énergie propre : nous faisons de la protection de l'environnement une source de revenus pour les communautés.",
    titre: `Protéger l'environnement, et en faire une <span class="serif">source de revenus</span>.`,
    lead: "Ubora Vert réunit tout ce que nous faisons pour l'environnement : reboisement, recyclage et valorisation des déchets, agriculture durable, énergie propre, sensibilisation. Notre conviction : une action pour l'environnement dure quand elle fait vivre ceux qui la portent.",
    contexte: {
      intro: "Dans les villes minières comme dans les villages, la pression sur l'environnement se voit chaque jour : collines déboisées pour le charbon de bois, déchets plastiques dans les caniveaux, sols épuisés, saisons des pluies de moins en moins prévisibles. Ce sont d'abord les familles modestes qui en paient le prix.",
      constats: [
        ["Des forêts qui reculent", "Le charbon de bois reste la première énergie pour cuisiner. Chaque année, on coupe les arbres un peu plus loin des villes."],
        ["Des déchets sans filière", "Plastique, ferraille, déchets organiques : peu de collecte et peu de tri, alors que beaucoup de ces déchets ont une valeur."],
        ["Des sols fatigués", "Sans rotation ni fumure organique, les rendements baissent, et les engrais coûtent de plus en plus cher."],
        ["Un climat moins prévisible", "Pluies décalées, sécheresses : une récolte perdue emporte souvent l'épargne de toute une famille."]
      ]
    },
    parcours: [
      ["Diagnostiquer", "Les pressions sur l'environnement du territoire, les pratiques actuelles, les acteurs présents et les activités vertes possibles.", "Des priorités claires, décidées avec la communauté."],
      ["Sensibiliser", "Causeries, écoles, groupes d'épargne, radios communautaires : expliquer simplement ce qui se joue, et ce que chacun peut faire.", "Une communauté qui comprend l'enjeu et s'engage."],
      ["Reboiser", "Pépinières communautaires, plantations, agroforesterie, suivi de la survie des plants.", "Des arbres qui poussent, et des pépiniéristes qui en vivent."],
      ["Recycler et valoriser", "Tri à la source, collecte, recyclage du plastique et de la ferraille, compostage des déchets organiques.", "Des déchets qui deviennent des revenus."],
      ["Produire autrement", "Agroécologie, compost, gestion de l'eau, foyers améliorés, énergie solaire.", "Moins de dépenses, des sols et des récoltes qui tiennent."],
      ["Financer", "Capital vert mobilisé par Ubora Fin, montage de projets pour les fonds climat et les programmes environnementaux.", "Des activités vertes qui trouvent leur financement."],
      ["Mesurer et suivre", "Arbres plantés et vivants, déchets valorisés, énergie économisée, revenus créés.", "Des résultats que l'on peut montrer aux partenaires."]
    ],
    outils: [],
    publics: ["Communautés et groupes AVEC", "Coopératives agricoles", "Recycleurs, PME et artisans", "Écoles et jeunes", "ONG et programmes environnementaux", "Entreprises et collectivités locales"],
    boite: {
      statut: "bientot",
      titre: "La boîte à outils verte",
      intro: "Les guides pratiques que nous utilisons sur le terrain seront bientôt disponibles.",
      outils: [
        ["Diagnostic environnemental communautaire", "Repérer les pressions et choisir les actions prioritaires."],
        ["Monter une pépinière", "Semences, sachets, arrosage, calendrier : de la graine au plant."],
        ["Tri et valorisation des déchets", "Organiser la collecte, et vendre ce qui peut l'être."],
        ["Guide du compostage", "Transformer les déchets organiques en fumure."],
        ["Monter un projet vert finançable", "Ce qu'attendent les fonds climat et les bailleurs."]
      ]
    }
  },

  {
    id: "academie", chemin: "/academie", sousDomaine: "academie.uborardc.com", transversal: true,
    accroche: "Apprendre, pratiquer, être certifié.",
    photo: ["formation", "Un formateur s'adresse à un groupe dans une salle"],
    nom: "Ubora Académie", initiales: "Ac", couleur: "#9A5522",
    /* vidéo de présentation (montage du 9 octobre 2026) : captures réelles d'academie.uborardc.com */
    video: { src: "/img/video/ubora-academie.mp4", affiche: "/img/video/ubora-academie-couverture.webp", duree: "1 min 21",
      titre: "Ubora Académie en une minute vingt", legende: "Les images sont des captures réelles d'academie.uborardc.com. Photo : marché de Goma, MONUSCO / M. Asmani, CC BY-SA." },
    carte: "L'école d'Ubora, au service de tous nos pôles : cours en ligne utilisables sans réseau, sessions sur le terrain, formation de formateurs et certificats vérifiables.",
    titre: `Une académie pour tous nos pôles : apprendre, pratiquer, être <span class="serif">certifié</span>.`,
    lead: "Ubora Académie forme celles et ceux que nos pôles accompagnent, et les équipes qui les accompagnent : membres d'AVEC, animateurs, entrepreneurs, coopératives, agents de terrain. Ses cours en ligne fonctionnent même sans réseau, et chaque parcours mène à un certificat vérifiable.",
    contexte: {
      intro: "La formation est au cœur de chacun de nos pôles. Mais une formation donnée une seule fois, en salle, pendant la durée d'un projet, s'oublie vite. L'Académie la rend durable : accessible partout, à son rythme, et reconnue.",
      constats: [
        ["Des formations qui s'arrêtent avec le projet", "Les supports restent dans les bureaux, et les nouveaux membres ne sont jamais formés."],
        ["Former loin coûte cher", "Déplacer un formateur prend du temps et de l'argent, et le réseau manque souvent en zone rurale."],
        ["Des compétences difficiles à prouver", "Un animateur ou un trésorier formé n'a rien à montrer à un employeur ou à une institution financière."],
        ["Des relais à former", "Sans formateurs relais bien préparés, la qualité baisse à chaque nouvelle génération de formés."]
      ]
    },
    programmesTitre: ["Les parcours de l'Académie", "Six parcours, du membre d'AVEC au formateur"],
    programmes: [
      ["AVEC : bureau et membres", "4 cours", "Les principes, le bureau et le règlement, la réunion pas à pas, le partage et le nouveau cycle."],
      ["AVEC : animateur", "6 cours", "Créer des AVEC, animer les 7 modules, les calculs sans erreur, le kit et Akiba, le suivi, l'éthique."],
      ["AVEC : comprendre et piloter", "3 cours", "Le modèle AVEC, la conduite et l'évaluation d'un programme, la croissance du réseau."],
      ["AGR individuelles et collectives", "4 cours", "L'idée et le marché, les coûts et le prix, les comptes et la vente, le crédit."],
      ["Éducation financière (PNEF)", "5 cours", "Le budget, l'épargne, le crédit, la négociation, la finance numérique."],
      ["Formateur AVEC et AGR", "4 cours", "Former des adultes, certifier des animateurs, préparer et évaluer une séance."]
    ],
    parcours: [
      ["Identifier les besoins", "Avec chaque pôle et chaque partenaire : qui former, à quoi, et à quel niveau.", "Un plan de formation adapté au programme."],
      ["Concevoir les cours", "À partir de nos documents de terrain : leçons courtes, exemples congolais, exercices avec de vrais chiffres.", "Des cours d'environ 50 minutes, éprouvés sur le terrain."],
      ["Former en ligne et en salle", "L'Académie en ligne, utilisable sans réseau, et des sessions en présentiel pour la pratique.", "Chacun avance à son rythme, accompagné."],
      ["Évaluer et certifier", "Quiz chronométrés, test final, certificat numéroté avec code QR, vérifiable en ligne.", "Des compétences prouvées."],
      ["Former les formateurs", "Parcours formateur, micro-enseignement, plan de progrès.", "Des relais locaux qui forment à leur tour."],
      ["Suivre et améliorer", "Taux de réussite, questionnaires de satisfaction, mise à jour des cours.", "Des formations qui progressent avec le terrain."]
    ],
    outils: ["academie"],
    publics: ["Membres et bureaux d'AVEC", "Animateurs et agents de terrain", "Entrepreneurs et coopératives", "Formateurs relais", "ONG, programmes et institutions"]
  }
];

/* Bande de photos qui défile sur l'accueil : [fichier, légende] */
const PHOTOS = [
  ["avec", "Groupes d'épargne"],
  ["pme", "Entrepreneurs"],
  ["coop", "Coopératives agricoles"],
  ["akiba", "Le téléphone au quotidien"],
  ["fin", "Accès au crédit"],
  ["market", "Accès au marché"],
  ["vert", "Environnement"],
  ["formation", "Formation"],
  ["terrain", "Communautés"]
];

/* Page AVEC : éléments propres à ce pôle */
const AVEC = {
  definition: "Une AVEC réunit en général quinze à trente personnes. Chaque semaine, les membres épargnent ensemble et s'accordent de petits prêts. À la fin du cycle, souvent au bout de neuf à douze mois, la caisse est partagée entre tous. Un fonds social aide les membres en cas de coup dur : maladie, deuil, frais scolaires.",
  avantApres: [
    ["Tenue des comptes", "Un cahier recopié à chaque réunion", "Une saisie sur téléphone, même sans réseau"],
    ["Calcul du partage", "Plusieurs heures, et souvent des contestations", "Immédiat, selon l'épargne de chacun"],
    ["Transparence", "Seul le trésorier connaît les soldes", "Chaque membre voit sa situation"],
    ["Suivi des prêts", "Les retards sont repérés tard", "Échéances et alertes pour l'animateur"],
    ["Fraude", "Une page arrachée, un chiffre corrigé, et personne ne le voit", "Un registre scellé : toute modification se voit"],
    ["Reçu du membre", "Rien, ou un chiffre noté à la main dans le carnet", "Un reçu imprimé ou envoyé par WhatsApp, vérifiable contre le journal"],
    ["Langue", "Des comptes en français, que tous ne lisent pas", "L'application en lingala, kiswahili, kikongo, tshiluba, avec un guide audio"],
    ["Accès au crédit", "Aucune trace en dehors du groupe", "Un niveau « prête pour une IMF » et un dossier à lui présenter"],
    ["Suivi d'un programme", "Des données lentes à collecter, souvent incomplètes", "Tableau de bord, écran Impact et export Excel pour l'ONG ou le bailleur"]
  ],
  passerelle: [
    ["Le groupe", "Quinze à trente membres qui épargnent chaque semaine et se prêtent entre eux."],
    ["AKIBA", "Les comptes sont tenus sur téléphone, sans réseau, dans un registre scellé que chacun peut vérifier."],
    ["L'historique", "Un indice de qualité des données et un niveau « prête pour une IMF » rendent la régularité du groupe lisible."],
    ["Le financement", "Une IMF, une COOPEC ou une banque apporte un fonds de roulement au groupe, avec l'appui d'Ubora Fin, qui mobilise le capital. Nous suivons le remboursement."]
  ]
};

/* ==========================================================================
   LES OUTILS NUMÉRIQUES
   Chaque outil est rattaché à un pôle. statut : "en-ligne" ou "en-cours".
   ========================================================================== */
const OUTILS = [
  {
    id: "akiba", nom: "AKIBA", court: "L'application des groupes d'épargne", pole: "avec", statut: "en-ligne", mock: "akiba", couleur: "#23843A", initiales: "Ak",
    sousDomaine: "akiba.uborardc.com", url: "https://akiba.uborardc.com",
    fiche: {
      titre: `Le cahier de l'AVEC dans le téléphone, même sans <span class="serif">réseau</span>.`,
      seo: ["AKIBA : l'application des groupes d'épargne (AVEC) en RDC", "AKIBA tient les comptes de l'AVEC sur téléphone, même sans réseau : réunion guidée, registre scellé, reçus imprimés et dossier pour la microfinance. Une application d'Ubora."],
      ouvrir: "Ouvrir AKIBA",
      /* film de présentation (montage du 10 octobre 2026) : captures réelles de l'application, données de démonstration */
      video: { src: "/img/video/akiba.mp4", affiche: "/img/video/akiba-couverture.webp", duree: "3 min 11", leger: ["/img/video/akiba-leger.mp4", "3,8 Mo"],
        titre: "AKIBA en trois minutes", legende: "Écrans réels de l'application. Démonstration : le groupe et les personnes sont fictifs." },
      atouts: "Des comptes que tout le groupe peut vérifier",
      pour: ["Trésoriers et comités d'AVEC", "Animateurs et agents de terrain", "ONG et programmes qui suivent des groupes", "Institutions de microfinance"],
      acces: [
        ["Essayez la démonstration", "Elle est libre : ouvrez akiba.uborardc.com sur un téléphone et parcourez une réunion complète, sans engagement."],
        ["Demandez votre code de validation", "Pour une vraie AVEC, Ubora délivre un code de validation. Écrivez-nous : nous vous répondons rapidement."],
        ["Formez le comité", "Chaque déploiement comprend une formation de prise en main, puis un suivi sur le terrain."]
      ]
    },
    resume: "Le cahier de l'AVEC dans le téléphone, même sans réseau. Chaque franc est écrit au moment où il bouge, chaque membre repart avec son reçu, et l'historique du groupe devient un dossier qu'une IMF peut étudier.",
    points: ["Réunion guidée en 8 étapes, de la présence à la clôture à trois clés", "Registre scellé : toute modification se voit", "Reçus des membres et journal imprimés sur imprimante Bluetooth (bientôt sur terminal POS), ou envoyés par WhatsApp et SMS", "Indice de qualité des données et niveau « prête pour une IMF »", "Dossier pour l'IMF et export Excel, sans données personnelles", "Crédit d'une IMF suivi de bout en bout, garantie comprise", "Espaces AVEC, animateur et organisation, avec un écran Impact", "Langues de la RDC, guide audio et 7 modules de formation AVEC", "Démonstration libre ; code de validation Ubora pour une vraie AVEC"]
  },
  {
    id: "bp", nom: "Générateur de business plan", court: "Votre plan d'affaires, étape par étape", pole: "pme", statut: "en-ligne", mock: "pme", couleur: "#B0622A", initiales: "Bp",
    sousDomaine: "bp.uborardc.com", url: "https://bp.uborardc.com",
    fiche: {
      titre: `Un business plan complet, construit <span class="serif">étape par étape</span>.`,
      seo: ["Générateur de business plan en ligne pour la RDC · Ubora", "Construisez votre business plan étape par étape : prévisions financières, seuil de rentabilité, score de viabilité et conseils, en francs congolais ou en dollars. Un outil d'Ubora."],
      ouvrir: "Ouvrir le générateur",
      atouts: "Des chiffres calculés, des conseils sur votre projet",
      pour: ["Porteurs de projet", "Entrepreneurs et PME", "Coopératives", "Incubateurs et coachs"],
      acces: [
        ["Ouvrez le générateur", "Il s'ouvre dans le navigateur, à l'adresse bp.uborardc.com."],
        ["Répondez à huit questions", "Elles décrivent votre projet ; le parcours s'adapte à vos réponses."],
        ["Complétez vos chiffres", "Ventes, investissements, crédits : les tableaux se calculent, avec un diagnostic et des conseils sur vos propres chiffres."]
      ]
    },
    resume: "Il guide l'entrepreneur étape par étape, à partir de huit questions sur son projet, et produit un business plan complet : prévisions financières, diagnostic de viabilité et conseils sur ses propres chiffres.",
    points: ["Un parcours étape par étape, adapté au projet en huit réponses", "Ventes avec saisonnalité, investissements, crédits et besoin en fonds de roulement", "Compte de résultat, bilan et trésorerie calculés, mois par mois", "Seuil de rentabilité et trois scénarios, avec calculs inverses", "Score de viabilité : « Mon projet peut-il démarrer ? »", "Conseils ciblés : phasage des investissements, durée du crédit, module agricole", "En francs congolais ou en dollars ; imprimable en PDF ou exportable vers Word"]
  },
  {
    id: "hub", nom: "Ubora Hub", court: "Le logiciel des incubateurs", pole: "pme", statut: "en-ligne", mock: "hub", couleur: "#0F3170", initiales: "Hb",
    sousDomaine: "hub.uborardc.com", url: "https://hub.uborardc.com",
    resume: "Le logiciel des incubateurs et des programmes d'entrepreneuriat : il les aide à sélectionner, former et suivre leurs entrepreneurs, du premier jour jusqu'au business plan.",
    points: ["Appels à candidatures en ligne, jury et sélection", "Parcours en trois phases : idéation, incubation, post-incubation", "Modules de formation, exercices et séances de coaching", "Business plan de chaque entrepreneur, relié au générateur", "Tableau de bord, indicateurs et rapports pour les bailleurs", "Un espace séparé pour chaque incubateur, utilisable hors ligne"],
    /* inscriptionOuverte : la page hub.uborardc.com/inscription est en ligne (remettre false pour revenir au formulaire de contact) */
    inscription: "https://hub.uborardc.com/inscription", inscriptionOuverte: true,
    fiche: {
      titre: `Le logiciel des incubateurs : sélectionner, accompagner, <span class="serif">rendre compte</span>.`,
      seo: ["Ubora Hub : logiciel de gestion d'incubateurs en RDC", "Ubora Hub aide les incubateurs, universités, ONG et programmes publics à sélectionner, former et suivre leurs entrepreneurs, jusqu'au business plan. Inscription validée par Ubora."],
      ouvrir: "Se connecter",
      /* film de présentation (montage du 10 octobre 2026) : captures réelles du logiciel, données de démonstration */
      video: { src: "/img/video/ubora-hub-leger.mp4", affiche: "/img/video/ubora-hub-couverture.webp", duree: "4 min 05",
        sousTitres: "/img/video/ubora-hub.vtt", titre: "Ubora Hub en quatre minutes", legende: "Écrans réels du logiciel. Démonstration : les personnes et l'entreprise sont fictives. Sous-titres français disponibles dans le lecteur." },
      atouts: "De la candidature au rapport, dans un seul outil",
      fonctions: [
        ["Sélectionner", "Appels à candidatures en ligne, formulaire de candidature, jury et classement."],
        ["Structurer le parcours", "Des programmes et des cohortes, en trois phases : idéation, incubation, post-incubation."],
        ["Former", "Modules de formation, exercices et quiz, utilisables même hors ligne."],
        ["Accompagner", "Séances de coaching, plans d'action et calendrier partagé."],
        ["Bâtir le business plan", "Chaque entrepreneur construit son plan d'affaires dans le générateur, relié à son dossier."],
        ["Rendre compte", "Tableau de bord, indicateurs et rapports en PDF pour la direction et les bailleurs."]
      ],
      phases: ["Candidature", "Idéation", "Incubation", "Post-incubation"],
      pour: ["Incubateurs et hubs", "Universités", "ONG et programmes d'entrepreneuriat", "Structures publiques et bailleurs"],
      espaces: ["Trois espaces, un seul logiciel", [
        ["L'espace de direction", "Le directeur et son équipe pilotent les appels à candidatures, les cohortes, le calendrier et les rapports."],
        ["L'espace du coach", "Chaque coach suit ses entrepreneurs, leurs exercices et leurs séances."],
        ["L'espace de l'entrepreneur", "Son parcours, ses modules et son business plan, sur son téléphone."]
      ]],
      accesTitre: "Un accès ouvert après validation",
      acces: [
        ["Présentez votre incubateur", "Dites-nous qui vous êtes et décrivez votre incubateur : sa mission, son public, ses programmes."],
        ["Ubora valide votre demande", "Nous étudions chaque demande. Une fois validée, l'espace de votre incubateur est ouvert et vous êtes prévenu."],
        ["Invitez votre équipe et vos entrepreneurs", "Vous vous connectez, puis vous ajoutez vos chargés de programme, vos coachs et vos entrepreneurs."]
      ]
    }
  },
  {
    id: "academie", nom: "Académie Ubora", court: "L'école en ligne, avec certificats", pole: "academie", statut: "en-ligne", mock: "academie", couleur: "#9A5522", initiales: "Ac",
    sousDomaine: "academie.uborardc.com", url: "https://academie.uborardc.com", page: "/academie",
    resume: "L'école en ligne d'Ubora : plus de 100 cours, regroupés en parcours, sur les AVEC, les activités génératrices de revenus, les coopératives, l'entrepreneuriat, l'agriculture et l'éducation financière, utilisables même sans réseau, avec badges et certificats vérifiables.",
    points: ["Six parcours, du membre d'AVEC au formateur", "Les 5 modules du PNEF de la Banque centrale du Congo", "Exercices corrigés et quiz chronométrés", "Cours téléchargés utilisables sans réseau", "Badges et certificats vérifiables en ligne"]
  },
  {
    id: "logiciel-coop", nom: "Ubora Coop, le logiciel", pole: "cooperatives", statut: "en-cours", mock: "coop", couleur: "#3E7A1F", initiales: "Co",
    resume: "Le registre numérique de la coopérative : membres, parcelles, collectes, stocks, ventes et paiements.",
    points: ["Membres, parcelles et parts sociales", "Collecte et pesées", "Stocks et intrants à crédit", "Ventes groupées", "Paiements par mobile money"]
  },
  {
    id: "plateforme-market", nom: "Ubora Market, la plateforme", pole: "marche", statut: "en-cours", mock: "market", couleur: "#1F7A6B", initiales: "Mk",
    resume: "Une place de marché où les vendeurs accompagnés publient leur offre et où les acheteurs trouvent des fournisseurs vérifiés.",
    points: ["Offres des vendeurs vérifiés", "Recherche par produit et par zone", "Historique des livraisons", "Mise en relation encadrée"]
  }
];

/* ---------- Projets et conseil (pour les organisations) ---------- */
const CONSEIL = [
  { id: "projets", ico: "target", titre: "Mise en œuvre de projets",
    texte: "Nous mettons en œuvre des projets de développement économique sur le terrain, pour le compte de nos partenaires ou à leurs côtés, du montage jusqu'au rapport final.",
    points: ["Conception et montage du projet", "Propositions de financement", "Mise en œuvre et coordination sur le terrain", "Suivi, évaluation et rapports"] },
  { id: "etudes", ico: "compass", titre: "Conseil et études",
    texte: "Études de marché et de faisabilité, diagnostics de filières, évaluations de projets. Nous allons chercher l'information sur le terrain et nous rendons des recommandations que l'on peut appliquer.",
    points: ["Études de marché et de faisabilité", "Analyse de filières", "Enquêtes de terrain", "Évaluations de projets et d'impact"] },
  { id: "digitalisation", ico: "flow", titre: "Digitalisation de l'accompagnement",
    texte: "Beaucoup d'organisations suivent encore leurs bénéficiaires dans des fichiers dispersés. Nous les aidons à organiser et à outiller ce suivi, notamment avec Ubora Hub.",
    points: ["Analyse des pratiques existantes", "Mise en place d'Ubora Hub", "Indicateurs et tableaux de bord", "Formation des équipes"] },
  { id: "capacites", ico: "school", titre: "Formation et renforcement des équipes",
    texte: "Nous formons les équipes des ONG, des institutions et des programmes à nos méthodes et à nos outils, et nous formons des formateurs relais.",
    points: ["Formation de formateurs", "Méthodologie AVEC", "Accompagnement d'entrepreneurs", "Gestion des coopératives"] }
];

/* La mise en œuvre d'un projet, temps par temps (page « Projets et conseil »). */
const MISE_EN_OEUVRE = {
  intro: "ONG, bailleurs, institutions et programmes nous confient tout ou partie d'un projet de développement économique. Nous le conduisons sur le terrain, avec nos équipes, notre méthode et nos outils.",
  formules: [
    ["Nous mettons en œuvre pour vous", "Vous fixez les objectifs et le budget. Nous conduisons le projet de bout en bout et nous vous rendons compte."],
    ["Nous mettons en œuvre avec vous", "Vos équipes restent en première ligne. Nous apportons la méthode, les outils, la formation et le suivi."]
  ],
  temps: [
    ["Concevoir", "Diagnostic sur place, objectifs, budget et calendrier, construits avec vous.", "Un projet réaliste, que le terrain peut porter."],
    ["Mettre en œuvre", "Nos équipes structurent, forment et outillent les groupes, les entrepreneurs et les coopératives ciblés.", "Des activités menées jusqu'au bout, pas seulement lancées."],
    ["Suivre et mesurer", "Les données sont tenues dans nos outils dès le premier jour.", "Des indicateurs à jour, sans attendre la fin du projet."],
    ["Rendre compte", "Rapports techniques et financiers, au rythme convenu avec vous.", "Un partenaire qui sait où va chaque activité."],
    ["Rester", "À la clôture, les relais locaux, les outils et le suivi restent en place.", "Des résultats qui tiennent après le financement."]
  ]
};

/* ---------- Catalogue des formations proposées ---------- */
const CATALOGUE = [
  ["AKIBA pour les trésoriers et les comités", "avec", "Tenir la réunion sur téléphone, imprimer les reçus, lire l'indice de qualité, préparer le partage de fin de cycle."],
  ["Devenir formateur relais AVEC", "avec", "Animer les séances, accompagner et suivre les groupes."],
  ["De l'idée au premier client", "pme", "Tester une idée d'entreprise avec très peu de moyens."],
  ["Rédiger son plan d'affaires", "pme", "Construire son dossier avec le générateur en ligne, lire son score de viabilité et ses scénarios."],
  ["Gérer une coopérative", "cooperatives", "Gouvernance, registres, caisse et comptabilité simplifiée."],
  ["Préparer un dossier de crédit", "financement", "Ce qu'une institution financière attend, et comment le présenter."],
  ["Ubora Hub pour les équipes d'accompagnement", "pme", "Suivre une cohorte, ses séances de coaching et ses résultats."]
];

/* ---------- Questions fréquentes ---------- */
const FAQ = [
  ["Qui peut travailler avec Ubora ?", "Les groupes d'épargne, les entrepreneurs et les PME, les coopératives et les organisations paysannes, les petites institutions financières, ainsi que les ONG, les incubateurs et les bailleurs qui accompagnent ces publics."],
  ["Travaillez-vous en dehors de Lubumbashi ?", "Oui. Notre siège est à Lubumbashi, mais nous intervenons dans toute la RDC, sur place ou à distance."],
  ["Vos outils fonctionnent-ils sans internet ?", "Oui. AKIBA fonctionne entièrement sans réseau ; dès que le réseau revient, le groupe envoie ses données à l'animateur et à l'organisation, et l'application se met à jour d'elle-même. Le générateur de business plan reste utilisable une fois ouvert."],
  ["Proposez-vous des formations sur vos outils ?", "Oui. Chaque déploiement comprend une formation de prise en main, puis un suivi. Notre Académie en ligne, academie.uborardc.com, propose aussi plus de 100 cours avec certificat. Nous organisons aussi des sessions sur demande, dans votre province ou en ligne."],
  ["Faut-il être une entreprise déclarée pour être accompagné ?", "Non. Nous accompagnons justement beaucoup d'entrepreneurs et de groupements vers la formalisation, étape par étape."],
  ["Que devient l'accompagnement quand le projet d'une ONG se termine ?", "Nous restons. Les groupes, les entrepreneurs et les coopératives continuent d'être suivis après la clôture du projet. Notre modèle économique finance une partie de ces activités de terrain, et les outils mis en place restent en service."],
  ["Ubora peut-elle financer notre groupe d'épargne ?", "Ubora ne prête pas elle-même. Par Ubora Fin, nous mobilisons le capital d'institutions financières, d'investisseurs et de bailleurs au profit des AVEC que nous accompagnons, et nous présentons le groupe à une IMF, une COOPEC ou une banque partenaire. Le groupe obtient ainsi un fonds de roulement, en plus de l'épargne de ses membres."],
  ["Que fait Ubora pour l'environnement ?", "Par Ubora Vert, nous accompagnons les communautés, les coopératives et les PME dans le reboisement, le recyclage et la valorisation des déchets, l'agroécologie et l'énergie propre. Notre principe : une action pour l'environnement dure quand elle crée des revenus pour ceux qui la portent."],
  ["Combien coûte l'accompagnement ?", "Cela dépend du programme et du nombre de bénéficiaires. Les prestations facturées aux organisations nous permettent de proposer des tarifs solidaires aux groupes d'épargne et aux micro-entrepreneurs. Contactez-nous pour en parler."]
];

/* Contenus gérés depuis l'espace équipe (base de données).
   Ces listes restent vides : le site affiche ce qui est publié dans la base. */
const ACTUALITES = [];
const FORMATIONS = [];
const OFFRES = [];

/* ---------- L'Académie en ligne (adresse) ---------- */
const ACADEMIE = { url: "https://academie.uborardc.com" };
