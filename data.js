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
  youtube: "https://www.youtube.com/@uborardc",
  /* Mentions légales. Un champ laissé vide n'est pas affiché sur le site. */
  legal: { rccm: "CD/KNM/RCCM/24-A-04755", idnat: "01-G4701-N86995I", impot: "", directeur: "Christian Cubaka Katulanya, Directeur Gérant" }
};

/* Bande déroulante. Les dernières actualités publiées s'y ajoutent d'elles-mêmes. */
const TICKER_MESSAGES = [
  ["Ubora est une entreprise à caractère social : ses excédents sont réinvestis", "/soutenir"],
  ["Nouveau à l'Académie : cinq cas pratiques pour entreprendre dans l'agroalimentaire", "/academie"],
  ["Ubora Académie : plus de 140 cours en ligne avec certificat", "/academie"],
  ["Nouveau : ASBL Manager, la gestion des associations, des ONG et des entreprises sociales", "/outils/asbl"],
  ["Nouveau : Akiba Suivi, l'application des animateurs et des organisations qui suivent des AVEC", "/outils/akiba#acces"],
  ["En vidéo : AKIBA, le cahier de l'AVEC dans le téléphone, en trois minutes", "/outils/akiba#video"],
  ["En vidéo : Ubora Hub, de l'idée à l'entreprise, en quatre minutes", "/outils/hub#video"],
  ["Ubora Vert : protéger l'environnement, et en vivre", "/vert"],
  ["Ni ONG, ni entreprise classique : nos revenus financent notre présence auprès des plus fragiles", "/a-propos#modele"]
];

/* ---------- Le Directeur Gérant (page « Notre équipe ») ----------
   Tiré de son CV. Les coordonnées personnelles et les références n'apparaissent pas sur le site. */
const DIRIGEANT = {
  nom: "Christian Cubaka Katulanya",
  fonction: "Directeur Gérant et fondateur",
  photo: "/img/equipe/christian-cubaka-800.webp",
  photoPetite: "/img/equipe/christian-cubaka-400.webp",
  accroche: "Plus de dix ans aux côtés des entrepreneurs, des coopératives et des groupes d'épargne en RDC.",
  bio: "Agronome, passé par la banque et par des programmes de coopération à Kinshasa, au Kivu et dans le Sud-Ubangi, Christian a fondé Ubora pour que l'accompagnement dure au-delà des projets. Il y conçoit Ubora Hub et AKIBA.",
  parcours: [
    ["Depuis 2024", "Entreprise Sociale Ubora", "Fondateur et Directeur Gérant", "Conception d'Ubora Hub, le logiciel d'incubation, et d'AKIBA, l'application hors ligne des AVEC."],
    ["Depuis 2026", "Programme de développement agricole, Sud-Ubangi", "Expert en entrepreneuriat agricole", "PME, coopératives, AVEC et incubateur provincial : structuration, plans d'affaires, accès au financement."],
    ["2024 – 2025", "Projet d'appui aux PME, Kinshasa", "Expert en entrepreneuriat et mutualisation des investissements", "Centres de PME, chaînes de valeur, modèles économiques et investissements partagés."],
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
  intro: "Trop de projets forment, puis partent. Trop de logiciels sont oubliés six mois plus tard. Notre méthode tient en six temps, et nous restons jusqu'à ce que les résultats tiennent.",
  /* pour chaque temps : ce qu'il donne pour un groupe d'épargne, un entrepreneur et une coopérative, dans cet ordre */
  publics: ["Groupe d'épargne", "Entrepreneur", "Coopérative"],
  etapes: [
    { titre: "Écouter", texte: "Sur place, avec les personnes concernées, dans leur langue. On regarde ce qui existe avant de proposer.",
      exemples: ["Comment il épargne et prête déjà.","Son idée, ses premiers clients.","Qui produit, qui vend, où l'argent se perd."],
      pourquoi: "Un dispositif pensé depuis un bureau ne résiste pas au premier cycle sur le terrain." },
    { titre: "Structurer", texte: "Écrire ce qui était flou : qui décide, qui fait quoi, où va l'argent.",
      exemples: ["Statuts, règlement, caisse et fonds social.","Un modèle testé, puis un plan d'affaires.","Statuts OHADA et organes de gestion."],
      pourquoi: "La plupart des conflits naissent de règles jamais écrites, pas du manque d'argent." },
    { titre: "Former", texte: "Chacun apprend ce qu'il faut pour décider seul. Et des relais locaux restent après nous.",
      exemples: ["Membres, comité, animateurs.","Coûts, prix, comptes, vente.","Dirigeants, gérants, producteurs."],
      pourquoi: "Quand le projet s'arrête, c'est le relais local qui reste." },
    { titre: "Outiller", texte: "Un outil simple remplace le cahier : sans réseau, en francs et en dollars.",
      exemples: ["AKIBA, pour la réunion et les reçus.","Le générateur de business plan et Ubora Hub.","Des registres clairs ; le logiciel Ubora Coop est en préparation."],
      pourquoi: "Réseau instable, deux monnaies, niveaux d'instruction variés : l'outil doit s'adapter, pas l'inverse." },
    { titre: "Connecter", texte: "L'historique tenu dans nos outils devient un dossier pour les financeurs et les acheteurs.",
      exemples: ["Un dossier pour une IMF ou une COOPEC.","Des rendez-vous avec des financeurs.","Des acheteurs trouvés avant la récolte."],
      pourquoi: "Un groupe, une entreprise ou une coopérative sérieuse reste invisible tant que personne ne sait prouver sa régularité." },
    { titre: "Suivre", texte: "Visites, indicateurs partagés, réponses sur WhatsApp. On ne part que lorsque ça tient.",
      exemples: ["Jusqu'au cycle suivant.","Au-delà des premières difficultés.","Jusqu'au paiement des producteurs."],
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
    carte: "Des groupes structurés, un cahier remplacé par AKIBA, un accompagnement jusqu'au crédit.",
    titre: `Des groupes d'épargne solides, et un vrai accès au <span class="serif">crédit</span>.`,
    lead: "Pour beaucoup de familles congolaises, l'AVEC est le premier service financier. Nous accompagnons le groupe de sa création jusqu'à son premier financement.",
    contexte: {
      intro: "L'AVEC comble l'absence de banque avec des moyens très simples. Mais la plupart des groupes restent fragiles.",
      constats: [
        ["Le cahier se perd ou s'abîme","Une erreur de recopie, et la confiance s'effrite au moment du partage."],
        ["Des années d'épargne sans trace","Un groupe sérieux n'a souvent rien à montrer à une banque."],
        ["Le suivi s'arrête avec le projet","Sans encadrement, beaucoup de groupes se dispersent."]
      ]
    },
    parcours: [
      ["Diagnostiquer","Étude de référence et repérage des groupes existants.","On sait par où commencer."],
      ["Mettre en place","Constitution du groupe, statuts, règlement, élection du comité.","Des règles connues de tous."],
      ["Former","Membres, animateurs et relais locaux, éducation financière comprise.","Des membres qui décident seuls."],
      ["Digitaliser","Du cahier à AKIBA : réunion guidée, registre scellé, partage calculé.","Des comptes que chacun vérifie."],
      ["Relier au financement","L'historique présenté aux IMF, COOPEC et banques ; le capital mobilisé par Ubora Fin.","Plus d'argent à prêter aux membres."],
      ["Suivre et faire grandir","Supervision, graduation, activités génératrices de revenus, fédération.","Des groupes qui durent."]
    ],
    avec: true,
    outils: ["akiba", "akiba-suivi", "academie"],
    publics: ["Groupes AVEC et mutuelles de solidarité", "Réseaux et fédérations d'AVEC", "ONG et programmes d'inclusion financière", "IMF, COOPEC et banques"],
    boite: {
      statut: "disponible",
      titre: "La boîte à outils AVEC",
      intro: "Seize documents tirés de nos déploiements, remis avec un temps d'explication aux organisations qui accompagnent des groupes d'épargne.",
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
    carte: "Tester l'idée auprès de vrais clients, lancer l'entreprise, la faire grandir.",
    titre: `Aider les entrepreneurs à passer de l'idée à une entreprise qui <span class="serif">vend</span>.`,
    lead: "Quatre phases, les mêmes que dans Ubora Hub, notre logiciel d'incubation : idéation, incubation, lancement, mise à niveau. Et une règle : tester auprès de vrais clients avant d'investir.",
    contexte: {
      intro: "On demande encore un plan d'affaires de trente pages avant le premier client. Nous faisons l'inverse : tester d'abord, avec presque rien, puis décider.",
      constats: [
        ["Des idées jamais testées","On fabrique pendant des mois un produit que personne n'a demandé."],
        ["Des moyens très limités","Chaque essai doit coûter presque rien."],
        ["Un accompagnement qui s'arrête trop tôt","Souvent au concours de pitch, juste avant les vraies difficultés."]
      ]
    },
    programmesTitre: ["Nos programmes", "Quatre phases, selon le stade de l'entreprise"],
    programmes: [
      ["Idéation", "Pour les porteurs d'idée", "Trouver et vérifier un problème réel, et une idée de solution que des clients veulent."],
      ["Incubation", "Pour les projets qui démarrent", "Construire l'offre, la tester, faire les premières ventes et bâtir le plan d'affaires."],
      ["Lancement de l'entreprise", "Pour les jeunes entreprises", "Installer l'entreprise : vendre régulièrement, bien gérer, se formaliser et trouver son financement."],
      ["Mise à niveau des PME", "Pour les entreprises établies", "Renforcer l'entreprise selon son diagnostic, pour la préparer à un financement."]
    ],
    parcours: [
      ["Partir d'un problème","Un besoin réel, une proposition de valeur, les hypothèses à vérifier.","Une idée claire."],
      ["Tester sur le terrain","Un produit minimum, face à de vrais clients.","La preuve d'une demande, ou un changement de cap."],
      ["Lancer l'entreprise","Prix, formalisation, premières ventes, tenue de caisse.","Une entreprise qui vend et sait ce qu'elle gagne."],
      ["Faire grandir","Canaux de vente, équipe, production, nouveaux marchés.","Une croissance préparée, pas subie."],
      ["Financer","Plan d'affaires avec notre générateur, dossier de crédit, rencontre des financeurs.","Des rendez-vous obtenus."],
      ["Suivre","Un point par mois après le programme, un appui à distance.","Une entreprise qui tient seule."]
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
    carte: "Des statuts OHADA à la vente groupée, toute la chaîne de valeur renforcée.",
    titre: `Des coopératives bien gérées, et des producteurs <span class="serif">payés à temps</span>.`,
    lead: "Un groupement sans statuts ou une coopérative en sommeil : nous partons de ce qui existe, et nous l'amenons à gérer, vendre et se financer. Des intrants jusqu'au paiement du producteur.",
    contexte: {
      intro: "Nous arrivons rarement devant une page blanche : il y a presque toujours un groupement qui travaille ensemble, ou une coopérative restée en sommeil.",
      constats: [
        ["Sans existence légale","Pas de statuts, donc ni compte, ni contrat, ni crédit."],
        ["Des volumes que personne ne connaît","Sans registre, impossible d'annoncer une quantité fiable à un acheteur."],
        ["Des paiements en retard","Payé tard, le producteur vend ailleurs à la campagne suivante."]
      ]
    },
    entrees: [
      ["Un groupement sans statuts","Assemblée constitutive, statuts OHADA, immatriculation, ouverture du compte."],
      ["Une coopérative en sommeil","Diagnostic, révision des statuts, renouvellement des organes, comptes reconstitués."]
    ],
    chaine: {
      titre: "Toute la chaîne de valeur, du champ jusqu'au paiement",
      intro: "Une coopérative gagne à chaque maillon qu'elle maîtrise : acheter ensemble, stocker au lieu de brader, transformer pour vendre plus cher. Nous renforçons ceux qui rapportent le plus.",
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
      ["Diagnostiquer","Statuts, gouvernance, comptes, activité.","Créer ou redresser : le choix est clair."],
      ["Formaliser","Statuts OHADA, immatriculation, identification nationale.","Contrats, compte et crédit deviennent possibles."],
      ["Organiser","Règlement intérieur, rôles séparés, procédures de caisse et de stock.","Des règles écrites qui évitent les conflits."],
      ["Gérer et vendre","Registres, collecte, stocks, comptes, ventes groupées.","Des comptes vérifiables, un meilleur prix."],
      ["Payer et suivre","Décomptes par producteur, mobile money, appui aux assemblées.","Une coopérative autonome au bout d'une campagne."]
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
    carte: "Nous préparons les emprunteurs et mobilisons pour eux le capital des financeurs.",
    titre: `Rapprocher ceux qui ont besoin de crédit de ceux qui <span class="serif">prêtent</span>.`,
    lead: "Le crédit existe en RDC, mais il atteint mal les petits emprunteurs. Ubora Fin ne prête pas : elle les prépare, les présente aux institutions financières et mobilise le capital à leur profit.",
    contexte: {
      intro: "D'un côté, des emprunteurs qui n'ont rien à présenter. De l'autre, des institutions qui perdent de l'argent sur les petits dossiers. Il faut travailler les deux côtés.",
      constats: [
        ["Pas d'historique, pas de crédit","Trois ans d'épargne restent invisibles tant que rien ne les prouve."],
        ["Un coût d'étude trop élevé","Étudier un crédit de 500 dollars coûte presque autant qu'un crédit de 50 000."],
        ["Des impayés repérés trop tard","Sans suivi, les retards se découvrent quand il est difficile d'agir."]
      ]
    },
    parcours: [
      ["Former","Éducation financière, gestion du crédit, tenue des comptes.","Des emprunteurs préparés, pas seulement demandeurs."],
      ["Monter le dossier","Comptes, plan d'affaires chiffré, garanties réalistes, historique tiré de nos outils.","Un dossier qu'une institution peut étudier."],
      ["Mettre en relation","Présentation aux IMF, COOPEC et banques, et suivi de la discussion.","Un premier crédit, à des conditions supportables."],
      ["Mobiliser le capital","Auprès d'institutions financières, d'investisseurs d'impact et de bailleurs. Eux financent ; nous préparons et suivons.","Un fonds de roulement, en plus de l'épargne."],
      ["Suivre le remboursement","Échéances, relances, appui en cas de difficulté.","Un bon historique pour le crédit suivant."]
    ],
    intermediation: {
      titre: "Le lien entre ceux qui financent et les groupes d'épargne",
      intro: "Une banque ne peut pas étudier des centaines de petits dossiers éloignés ; un groupe ne sait pas à quelle porte frapper. Ubora Fin fait le lien, sans prêter elle-même.",
      etapes: [
        ["Mobiliser","Lignes de crédit d'IMF et de banques, capitaux d'impact, fonds de garantie de bailleurs."],
        ["Orienter vers les groupes","Au groupe, pas à chaque membre, par paliers, selon l'historique tenu dans AKIBA."],
        ["Suivre et rendre compte","Remboursements suivis chaque semaine, rapports clairs pour chaque financeur."],
        ["Faire grandir","Les groupes solides passent en relation directe ; le capital remboursé sert d'autres groupes."]
      ],
      gains: [
        ["Pour les institutions financières","Une clientèle formée et suivie, sans coût d'étude dossier par dossier, avec la caution solidaire des membres."],
        ["Pour les AVEC","Plus d'argent à prêter, au bon moment, sans garantie matérielle, à un coût raisonnable."],
        ["Pour les bailleurs et les investisseurs","Un fonds qui tourne au lieu d'une subvention consommée une fois, et un impact mesuré."]
      ]
    },
    projet: {
      titre: "Une société de crédit pour les AVEC",
      texte: "Pour porter ce rôle à plus grande échelle, dans un cadre agréé, nous préparons une société de crédit dédiée aux AVEC, appuyée sur leur historique d'épargne et leur discipline collective.",
      etat: "Étude de faisabilité, cadre réglementaire et recherche de partenaires financiers en cours.",
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
    carte: "L'acheteur trouvé avant la récolte, la vente suivie jusqu'au paiement.",
    titre: `Produire, c'est bien. Trouver des <span class="serif">acheteurs</span>, c'est mieux.`,
    lead: "Nous relions les coopératives, les PME et les entrepreneurs que nous accompagnons à des acheteurs : entreprises, institutions, particuliers.",
    contexte: {
      intro: "Le maillon qui casse le plus souvent n'est ni la production ni le crédit. C'est la vente.",
      constats: [
        ["Vendre au premier venu","Sans acheteur trouvé à l'avance, on brade sa récolte."],
        ["Des volumes trop petits","Seul, un producteur n'atteint jamais la quantité demandée."],
        ["La confiance qui manque","Personne ne garantit l'échange entre l'acheteur et le vendeur."]
      ]
    },
    canaux: {
      titre: "Quatre débouchés, quatre façons de vendre",
      intro: "Le bon débouché dépend du produit, du volume et de la capacité à livrer. Nous le choisissons avec le vendeur.",
      liste: [
        ["Entreprises (B2B)","Agro-industries, grossistes, hôtels, restaurants.","Gros volumes et contrats réguliers, exigences strictes."],
        ["Particuliers (B2C)","Vente directe, boutiques, réseaux sociaux.","Meilleure marge et paiement immédiat."],
        ["Institutions et programmes","Écoles, hôpitaux, ONG, marchés publics.","Des commandes prévisibles, pour qui est formalisé."],
        ["Export régional","Zambie, Tanzanie et pays voisins.","De meilleurs prix pour les filières aux normes."]
      ]
    },
    parcours: [
      ["Recenser l'offre","Quoi, combien, quand et où.","Une offre que l'on peut annoncer."],
      ["Connaître la demande","Volumes, prix et exigences des acheteurs.","Des débouchés précis."],
      ["Se mettre à niveau","Qualité, emballage, régularité, documents.","Une offre conforme."],
      ["Regrouper et signer","L'offre de plusieurs vendeurs, puis contrat, prix et calendrier.","Une négociation équilibrée, un engagement écrit."],
      ["Suivre jusqu'au paiement","Livraison, contrôle de la qualité, paiement du producteur.","Un acheteur qui revient."]
    ],
    projet: {
      titre: "Une plateforme de mise en relation",
      texte: "Les vendeurs accompagnés y publieront leur offre ; les acheteurs y trouveront des fournisseurs vérifiés, avec l'historique de leurs livraisons. C'est ce qui rassure vraiment un acheteur.",
      etat: "En développement, avec des acheteurs et des coopératives pilotes.",
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
    carte: "Reboisement, recyclage, agroécologie, énergie propre : des revenus pour les communautés.",
    titre: `Protéger l'environnement, et en faire une <span class="serif">source de revenus</span>.`,
    lead: "Reboisement, recyclage, agriculture durable, énergie propre. Notre conviction : une action pour l'environnement dure quand elle fait vivre ceux qui la portent.",
    contexte: {
      intro: "Collines déboisées pour le charbon, plastique dans les caniveaux, sols épuisés : ce sont d'abord les familles modestes qui en paient le prix.",
      constats: [
        ["Des forêts qui reculent","Le charbon de bois reste la première énergie pour cuisiner."],
        ["Des déchets sans filière","Peu de tri, alors que beaucoup de déchets ont une valeur."],
        ["Un climat moins prévisible","Une récolte perdue emporte l'épargne de toute une famille."]
      ]
    },
    parcours: [
      ["Diagnostiquer et sensibiliser","Pressions locales et activités possibles ; écoles, groupes d'épargne, radios communautaires.","Des priorités choisies avec la communauté."],
      ["Reboiser","Pépinières communautaires, plantations, agroforesterie.","Des arbres qui poussent, des pépiniéristes qui en vivent."],
      ["Recycler et valoriser","Tri, collecte, plastique, ferraille, compost.","Des déchets qui deviennent des revenus."],
      ["Produire autrement","Agroécologie, gestion de l'eau, foyers améliorés, solaire.","Moins de dépenses, des récoltes qui tiennent."],
      ["Financer et mesurer","Fonds climat, capital vert mobilisé par Ubora Fin ; arbres vivants, déchets valorisés, revenus créés.","Des résultats à montrer."]
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
      titre: "Ubora Académie en une minute vingt", youtube: "X7eC9dx4l_k", legende: "Les images sont des captures réelles d'academie.uborardc.com. Photo : marché de Goma, MONUSCO / M. Asmani, CC BY-SA." },
    carte: "L'école de tous nos pôles : cours en ligne sans réseau, sessions sur le terrain, certificats vérifiables.",
    titre: `Une académie pour tous nos pôles : apprendre, pratiquer, être <span class="serif">certifié</span>.`,
    lead: "L'école d'Ubora forme ceux que nos pôles accompagnent, et leurs équipes. Des cours en ligne qui marchent sans réseau, et des certificats vérifiables.",
    contexte: {
      intro: "Une formation donnée une fois, en salle, le temps d'un projet, s'oublie vite. L'Académie la rend durable : accessible partout, à son rythme, et reconnue.",
      constats: [
        ["Des formations qui s'arrêtent avec le projet","Les nouveaux membres ne sont jamais formés."],
        ["Former loin coûte cher","Et le réseau manque souvent en zone rurale."],
        ["Des compétences difficiles à prouver","Un trésorier formé n'a rien à montrer."]
      ]
    },
    programmesTitre: ["Les domaines de l'Académie", "Plus de 140 cours en 26 parcours, dans sept domaines"],
    programmes: [
      ["Groupes d'épargne (AVEC)", "Du membre au cadre", "Créer, gérer, animer et piloter des AVEC, du premier jour à l'autonomie : membres et bureau, animateurs, formateurs, cadres."],
      ["Activités génératrices de revenus", "Petites activités", "Choisir, lancer et faire grandir une petite activité : idée et marché, coûts et prix, comptes, crédit, transformation, formalisation."],
      ["Éducation financière", "L'argent de la famille et de l'activité", "Budget, épargne, crédit, négociation, finance numérique."],
      ["Entreprendre", "Créer et développer son entreprise", "Du problème du client au produit qui se vend : créer son entreprise de zéro, comprendre l'écosystème congolais."],
      ["Agriculture et filières", "Entreprises agricoles", "Bâtir une entreprise agricole rentable et réussir sa filière : vivriers, café, cacao, palmier, élevage, pisciculture, et des cas pratiques en agroalimentaire."],
      ["Coopératives", "Organisations de producteurs", "Faire vivre une coopérative : organes, argent, vente groupée, plan d'affaires."],
      ["Accompagner", "Coachs, incubateurs, programmes", "Coacher des entrepreneurs, diriger un incubateur, concevoir un programme d'appui, accompagner sur le terrain."]
    ],
    parcours: [
      ["Identifier les besoins","Qui former, à quoi, à quel niveau.","Un plan de formation sur mesure."],
      ["Concevoir les cours","Leçons courtes, exemples congolais, exercices chiffrés.","Des cours éprouvés sur le terrain."],
      ["Former en ligne et en salle","En ligne sans réseau, en présentiel pour la pratique.","Chacun à son rythme, accompagné."],
      ["Certifier","Quiz chronométrés, test final, certificat à code QR.","Des compétences prouvées."],
      ["Former les formateurs","Parcours formateur, micro-enseignement, plan de progrès.","Des relais qui forment à leur tour."]
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
  definition: "Quinze à trente personnes qui épargnent chaque semaine et s'accordent de petits prêts. En fin de cycle, souvent après neuf à douze mois, la caisse est partagée. Un fonds social aide en cas de coup dur.",
  avantApres: [
    ["Tenue des comptes", "Un cahier recopié à chaque réunion", "Une saisie sur téléphone, même sans réseau"],
    ["Calcul du partage", "Plusieurs heures, et souvent des contestations", "Immédiat, selon l'épargne de chacun"],
    ["Transparence", "Seul le trésorier connaît les soldes", "Chaque membre voit sa situation"],
    ["Suivi des prêts", "Les retards sont repérés tard", "Échéances et alertes pour l'animateur"],
    ["Fraude", "Une page arrachée, un chiffre corrigé, et personne ne le voit", "Un registre scellé : toute modification se voit"],
    ["Reçu du membre", "Rien, ou un chiffre noté à la main dans le carnet", "Un reçu imprimé ou envoyé par WhatsApp, vérifiable contre le journal"],
    ["Langue", "Des comptes en français, que tous ne lisent pas", "L'application en lingala, swahili, kikongo et tshiluba, avec un guide audio"],
    ["Accès au crédit", "Aucune trace en dehors du groupe", "Un niveau « prête pour une IMF » et un dossier à lui présenter"],
    ["Suivi d'un programme", "Des données lentes à collecter, souvent incomplètes", "Dans Akiba Suivi : tableau de bord, écran Impact et export Excel pour l'ONG ou le bailleur"]
  ],
  passerelle: [
    ["Le groupe","Quinze à trente membres qui épargnent et se prêtent entre eux."],
    ["AKIBA","Des comptes tenus sur téléphone, sans réseau, dans un registre scellé."],
    ["L'historique","Un niveau « prête pour une IMF » rend la régularité du groupe lisible."],
    ["Le financement","Une IMF, une COOPEC ou une banque apporte un fonds de roulement ; Ubora Fin mobilise le capital et suit le remboursement."]
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
      lead: "Chaque franc est écrit au moment où il bouge, chaque membre repart avec son reçu, et l'historique du groupe devient un dossier qu'une IMF peut étudier.",
      seo: ["AKIBA : l'application des groupes d'épargne (AVEC) en RDC", "AKIBA tient les comptes de l'AVEC sur téléphone, même sans réseau : réunion guidée, registre scellé, reçus imprimés et dossier pour la microfinance. Une application de l'entreprise à caractère social Ubora."],
      ouvrir: "Ouvrir AKIBA",
      accesNote: "Animateur, organisation ou programme ? Le suivi des groupes se fait dans Akiba Suivi, sur akibas.uborardc.com.",
      /* film de présentation (montage du 10 octobre 2026) : captures réelles de l'application, données de démonstration */
      video: { src: "/img/video/akiba.mp4", affiche: "/img/video/akiba-couverture.webp", duree: "3 min 11", leger: ["/img/video/akiba-leger.mp4", "3,8 Mo"],
        titre: "AKIBA en trois minutes", youtube: "T1I5V5P-myg", legende: "Écrans réels de l'application. Démonstration : le groupe et les personnes sont fictifs." },
      atouts: "Des comptes que tout le groupe peut vérifier",
      pour: ["Trésoriers et comités d'AVEC", "Animateurs et agents de terrain", "ONG et programmes qui suivent des groupes", "Institutions de microfinance"],
      acces: [
        ["Essayez la démonstration", "Libre et sans engagement : une réunion complète, sur akiba.uborardc.com."],
        ["Demandez votre code de validation", "Pour une vraie AVEC, Ubora délivre un code. Écrivez-nous."],
        ["Formez le comité", "Une formation de prise en main, puis un suivi sur le terrain."]
      ]
    },
    resume: "Le cahier de l'AVEC dans le téléphone, même sans réseau : chaque franc écrit au moment où il bouge, un reçu pour chaque membre, un historique qu'une IMF peut étudier.",
    points: ["Réunion guidée en 8 étapes, de la présence à la clôture à trois clés", "Registre scellé : toute modification se voit", "Reçus des membres et journal imprimés sur imprimante Bluetooth (bientôt sur terminal POS), ou envoyés par WhatsApp et SMS", "Indice de qualité des données et niveau « prête pour une IMF »", "Dossier pour l'IMF et export Excel, sans données personnelles", "Crédit d'une IMF suivi de bout en bout, garantie comprise", "Akiba Suivi pour les animateurs et les organisations, avec un écran Impact", "Point GPS du groupe, pris sans réseau", "Langues de la RDC, guide audio et 7 modules de formation AVEC", "Démonstration libre ; code de validation Ubora pour une vraie AVEC"]
  },
  {
    id: "akiba-suivi", nom: "Akiba Suivi", court: "Le suivi des AVEC, pour les animateurs et les organisations", pole: "avec", statut: "en-ligne", mock: "akiba", couleur: "#2463A6", initiales: "As",
    sousDomaine: "akibas.uborardc.com", url: "https://akibas.uborardc.com", page: "https://akibas.uborardc.com",
    resume: "L'application des animateurs, des organisations et de l'équipe d'Ubora : elle réunit les journaux scellés des AVEC, avec tableau de bord, qualité des données, dossier pour une institution de microfinance et export Excel.",
    points: ["Tableau de bord des animateurs et des organisations", "Journaux scellés reçus des groupes", "Qualité des données et dossier pour une IMF", "Export Excel"]
  },
  {
    id: "bp", nom: "Générateur de business plan", nomPhrase: "le générateur de business plan", court: "Votre plan d'affaires, étape par étape", pole: "pme", statut: "en-ligne", mock: "pme", couleur: "#B0622A", initiales: "Bp",
    sousDomaine: "bp.uborardc.com", url: "https://bp.uborardc.com",
    fiche: {
      titre: `Un business plan complet, construit <span class="serif">étape par étape</span>.`,
      lead: "Huit questions sur votre projet, puis des prévisions financières, un score de viabilité et des conseils sur vos propres chiffres, en francs congolais ou en dollars.",
      seo: ["Générateur de business plan en ligne pour la RDC · Ubora", "Construisez votre business plan étape par étape : prévisions financières, seuil de rentabilité, score de viabilité et conseils, en francs congolais ou en dollars. Un outil de l'entreprise à caractère social Ubora."],
      ouvrir: "Ouvrir le générateur",
      atouts: "Des chiffres calculés, des conseils sur votre projet",
      pour: ["Porteurs de projet", "Entrepreneurs et PME", "Coopératives", "Incubateurs et coachs"],
      acces: [
        ["Ouvrez le générateur", "Il s'ouvre dans le navigateur, à l'adresse bp.uborardc.com."],
        ["Répondez à huit questions", "Elles décrivent votre projet ; le parcours s'adapte à vos réponses."],
        ["Complétez vos chiffres", "Les tableaux se calculent, avec un diagnostic et des conseils."]
      ]
    },
    resume: "Huit questions sur votre projet, et un business plan complet : prévisions financières, viabilité, conseils sur vos propres chiffres.",
    points: ["Un parcours étape par étape, adapté au projet en huit réponses", "Ventes avec saisonnalité, investissements, crédits et besoin en fonds de roulement", "Compte de résultat, bilan et trésorerie calculés, mois par mois", "Seuil de rentabilité et trois scénarios, avec calculs inverses", "Score de viabilité : « Mon projet peut-il démarrer ? »", "Conseils ciblés : phasage des investissements, durée du crédit, module agricole", "En francs congolais ou en dollars ; imprimable en PDF ou exportable vers Word"]
  },
  {
    id: "hub", nom: "Ubora Hub", court: "Le logiciel d'incubation, de l'idée à l'entreprise", pole: "pme", statut: "en-ligne", mock: "hub", couleur: "#0F3170", initiales: "Hb",
    sousDomaine: "hub.uborardc.com", url: "https://hub.uborardc.com",
    resume: "Le logiciel d'incubation d'Ubora : les incubateurs y sélectionnent, forment et suivent leurs entrepreneurs ; un entrepreneur seul peut y suivre le parcours libre.",
    points: ["Appels à candidatures en ligne, jury et sélection", "Parcours en quatre phases, de l'idée à la mise à niveau des PME", "Modules courts, exercices appliqués au projet et suivi d'un coach", "Plan d'affaires construit au fil des exercices, relié au générateur", "Tableau de bord, indicateurs et rapports pour les bailleurs", "Parcours libre pour l'entrepreneur sans incubateur, même hors connexion"],
    /* inscriptionOuverte : la page hub.uborardc.com/inscription est en ligne (remettre false pour revenir au formulaire de contact) */
    inscription: "https://hub.uborardc.com/inscription", inscriptionOuverte: true,
    fiche: {
      titre: `Le logiciel d'incubation : sélectionner, accompagner, <span class="serif">rendre compte</span>.`,
      lead: "Les incubateurs y sélectionnent, forment et suivent leurs entrepreneurs. Un entrepreneur sans incubateur peut aussi y suivre seul le parcours libre, jusqu'au plan d'affaires.",
      accesNote: "Entrepreneur sans incubateur ? Inscrivez-vous directement sur hub.uborardc.com et suivez le parcours libre.",
      seo: ["Ubora Hub : logiciel d'incubation d'entrepreneurs en RDC", "Le logiciel d'incubation d'Ubora, entreprise à caractère social : les incubateurs y sélectionnent, forment et suivent leurs entrepreneurs ; un entrepreneur seul peut y suivre le parcours libre, jusqu'au plan d'affaires."],
      ouvrir: "Se connecter",
      /* film de présentation (montage du 10 octobre 2026) : captures réelles du logiciel, données de démonstration */
      video: { src: "/img/video/ubora-hub-leger.mp4", affiche: "/img/video/ubora-hub-couverture.webp", duree: "4 min 05",
        sousTitres: "/img/video/ubora-hub.vtt", titre: "Ubora Hub en quatre minutes", youtube: "gthnqU1pQfk", legende: "Écrans réels du logiciel. Démonstration : les personnes et l'entreprise sont fictives. Sous-titres français disponibles dans le lecteur." },
      atouts: "De la candidature au rapport, dans un seul outil",
      fonctions: [
        ["Sélectionner", "Appels à candidatures en ligne, formulaire de candidature, jury et classement."],
        ["Structurer le parcours", "Des programmes et des cohortes, en quatre phases : idéation, incubation, lancement de l'entreprise, puis mise à niveau des PME déjà établies."],
        ["Former", "Modules, exercices et quiz utilisables hors ligne, et une formation intégrée pour les coachs et les directeurs."],
        ["Accompagner", "Séances de coaching, plans d'action et calendrier partagé."],
        ["Bâtir le business plan", "Chaque entrepreneur construit son plan d'affaires dans le générateur, relié à son dossier."],
        ["Rendre compte", "Tableau de bord, indicateurs et rapports en PDF pour la direction et les bailleurs."]
      ],
      phases: ["Idéation", "Incubation", "Lancement de l'entreprise", "Mise à niveau des PME"],
      pour: ["Incubateurs et hubs", "Universités", "ONG et programmes d'entrepreneuriat", "Structures publiques et bailleurs", "Entrepreneurs sans incubateur (parcours libre)", "Entreprises et institutions (programmes sur demande)"],
      espaces: ["Trois espaces, un seul logiciel", [
        ["L'espace de direction", "Le directeur et son équipe pilotent les appels à candidatures, les cohortes, le calendrier et les rapports."],
        ["L'espace du coach", "Chaque coach suit ses entrepreneurs, leurs exercices et leurs séances."],
        ["L'espace de l'entrepreneur", "Son parcours, ses modules et son plan d'affaires, sur téléphone ou ordinateur, avec ou sans incubateur."]
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
    id: "asbl", nom: "ASBL Manager", court: "La gestion des associations, des ONG et des entreprises sociales", pole: "conseil", statut: "en-ligne", mock: "asbl", couleur: "#0B3A32", initiales: "Am",
    sousDomaine: "asbl.uborardc.com", url: "https://asbl.uborardc.com",
    resume: "Le logiciel de gestion des associations, des ONG et des entreprises sociales : gouvernance, plan de travail, finances, projets, logistique, personnel et suivi-évaluation, avec des circuits de validation clairs.",
    points: ["Gouvernance, membres et cotisations", "Plan de travail (PTBA), termes de référence et fiches d'activité", "Dépenses, trésorerie en francs et en dollars, comptabilité", "Projets, bailleurs et rapports", "Achats, stocks, personnel et missions", "Un espace par rôle, même hors connexion"],
    fiche: {
      titre: `Gérer son organisation avec la rigueur qu'attendent ses membres et ses <span class="serif">bailleurs</span>.`,
      lead: "Gouvernance, programmes, finances, logistique, personnel et suivi-évaluation réunis dans une seule application, avec un espace de travail pour chaque rôle.",
      seo: ["ASBL Manager : logiciel de gestion des ASBL et des ONG en RDC", "Gouvernance, PTBA, finances, projets, logistique, personnel et suivi-évaluation dans une seule application, avec circuits de validation et séparation des fonctions. Conçu par l'entreprise à caractère social Ubora."],
      ouvrir: "Ouvrir ASBL Manager",
      atouts: "Tout le fonctionnement d'une organisation, sans double saisie",
      fonctions: [
        ["Gouvernance et membres", "Adhésions, cotisations, assemblées générales, conseil d'administration, commission de contrôle, procès-verbaux et registre des décisions."],
        ["Plan de travail (PTBA)", "Activités rattachées au cadre de résultats, termes de référence, fiches d'activité et avancement."],
        ["Finances et comptabilité", "Dépenses, fonds à justifier, trésorerie en francs et en dollars, rapprochement bancaire, comptabilité et états financiers."],
        ["Projets et bailleurs", "Conventions et profils de bailleurs, budgets par projet, réallocations avec l'accord du bailleur, clôture de projet et rapports."],
        ["Logistique et personnel", "Achats et marchés, stocks et équipements ; contrats, feuilles de temps, congés, missions, paie et évaluations."],
        ["Suivi-évaluation et rapports", "Indicateurs, vérification des données, plaintes et signalements confidentiels, rapports ; un assistant IA pour rédiger et repérer les appels à financement."]
      ],
      phasesTitre: "Le circuit d'une dépense",
      phases: ["Demande", "Contrôle budgétaire", "Approbation", "Paiement", "Justification"],
      pour: ["ASBL et associations", "ONG", "Entreprises sociales (SARL)", "Projets financés par des bailleurs"],
      accesTitre: "Démarrer en trois étapes",
      acces: [
        ["Créez votre compte", "Avec votre adresse e-mail et un mot de passe personnel."],
        ["Enregistrez votre organisation", "Nom, forme juridique, exercice et devise. Ou ouvrez d'abord l'organisation de démonstration."],
        ["Invitez votre équipe", "Chaque collaborateur reçoit un rôle et retrouve aussitôt son espace de travail."]
      ],
      accesNote: "Une organisation de démonstration permet d'essayer toutes les fonctions sans saisir vos données."
    }
  },
  {
    id: "academie", nom: "Ubora Académie", court: "L'école en ligne, avec certificats", pole: "academie", statut: "en-ligne", mock: "academie", couleur: "#9A5522", initiales: "Ac",
    sousDomaine: "academie.uborardc.com", url: "https://academie.uborardc.com", page: "/academie",
    resume: "L'école en ligne d'Ubora : plus de 140 cours en 26 parcours, plus de 200 heures de formation, utilisables sans réseau, avec certificats vérifiables.",
    points: ["26 parcours, du membre d'AVEC au formateur", "Les 5 modules du PNEF de la Banque centrale du Congo", "Exercices corrigés et quiz chronométrés", "Cours téléchargés utilisables sans réseau", "Badges et certificats vérifiables en ligne"]
  },
  {
    id: "logiciel-coop", nom: "Ubora Coop, le logiciel", pole: "cooperatives", statut: "en-cours", mock: "coop", couleur: "#3E7A1F", initiales: "Co",
    resume: "La gestion des organisations paysannes, du groupement à la coopérative et à l'union : membres et parcelles, collecte, stocks, ventes, finances, crédits et gouvernance, même hors connexion.",
    points: ["Groupement, association, SCOOPS, COOP-CA ou union", "Membres, parcelles géolocalisées et capital social", "Collecte, reçus et paiement des livraisons", "Stocks, ventes groupées, finances en francs et en dollars", "Assemblées, organes et registre des décisions", "Contrôle interne et repérage des anomalies"]
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
    texte: "Sur le terrain, pour nos partenaires ou à leurs côtés, du montage jusqu'au rapport final.",
    points: ["Conception et montage du projet", "Propositions de financement", "Mise en œuvre et coordination sur le terrain", "Suivi, évaluation et rapports"] },
  { id: "etudes", ico: "compass", titre: "Conseil et études",
    texte: "Marché, faisabilité, filières, évaluations : l'information prise sur le terrain, et des recommandations applicables.",
    points: ["Études de marché et de faisabilité", "Analyse de filières", "Enquêtes de terrain", "Évaluations de projets et d'impact"] },
  { id: "digitalisation", ico: "flow", titre: "Digitalisation de l'accompagnement",
    texte: "Du suivi dans des fichiers dispersés à un suivi outillé, avec Ubora Hub pour l'accompagnement et ASBL Manager pour la gestion de l'organisation.",
    points: ["Analyse des pratiques existantes", "Mise en place d'Ubora Hub ou d'ASBL Manager", "Indicateurs et tableaux de bord", "Formation des équipes"] },
  { id: "capacites", ico: "school", titre: "Formation et renforcement des équipes",
    texte: "Vos équipes formées à nos méthodes et à nos outils, et des formateurs relais.",
    points: ["Formation de formateurs", "Méthodologie AVEC", "Accompagnement d'entrepreneurs", "Gestion des coopératives"] }
];

/* Le projet pilote : la façon la plus sûre, pour un bailleur ou une ONG, de commencer avec Ubora. */
const PILOTE = {
  temps: [
    ["Cadrer ensemble", "Le public, la zone, la durée et le budget, à votre mesure. Les indicateurs sont fixés avant de commencer.", "Un pilote clair, signé des deux côtés."],
    ["Lancer sur le terrain", "Nos équipes structurent, forment et outillent ; les données sont saisies dès le premier jour.", "Des activités qui démarrent vite."],
    ["Suivre en direct", "Vous accédez aux tableaux de bord et aux exports, avec un point d'étape à mi-parcours.", "Pas de surprise en fin de projet."],
    ["Décider sur preuves", "Un rapport final : indicateurs atteints, leçons, et ce qu'il faudrait pour étendre.", "Étendre, ajuster ou arrêter : vous décidez."]
  ],
  exemples: [
    ["avec", "Digitaliser des groupes d'épargne", "Structurer ou reprendre des AVEC, passer du cahier à AKIBA, suivre les groupes dans Akiba Suivi.", "épargne mobilisée, remboursements, qualité des données"],
    ["pme", "Accompagner une cohorte d'entrepreneurs", "Idéation ou incubation dans Ubora Hub, avec un coach et le générateur de business plan.", "plans d'affaires validés, premières ventes"],
    ["cooperatives", "Remettre une coopérative en ordre", "Diagnostic, statuts, registres, puis une première vente groupée.", "membres enregistrés, volumes collectés, paiements à temps"],
    ["financement", "Préparer des groupes au crédit", "Former, constituer l'historique, présenter les groupes à une institution financière.", "dossiers déposés, crédits obtenus, remboursements"],
    ["academie", "Former des animateurs et des relais", "Sessions sur le terrain et cours de l'Académie, avec certificats vérifiables.", "personnes certifiées, relais actifs"],
    ["conseil", "Équiper une organisation partenaire", "ASBL Manager pour la gestion, Ubora Hub ou Akiba Suivi pour le suivi des bénéficiaires.", "circuits tenus, rapports remis à temps"]
  ]
};

/* La mise en œuvre d'un projet, temps par temps (page « Projets et conseil »). */
const MISE_EN_OEUVRE = {
  intro: "ONG, bailleurs et institutions nous confient tout ou partie d'un projet. Nous le conduisons sur le terrain, avec notre méthode et nos outils.",
  formules: [
    ["Nous mettons en œuvre pour vous", "Vous fixez les objectifs et le budget. Nous conduisons le projet de bout en bout et nous vous rendons compte."],
    ["Nous mettons en œuvre avec vous", "Vos équipes restent en première ligne. Nous apportons la méthode, les outils, la formation et le suivi."]
  ],
  temps: [
    ["Concevoir","Diagnostic, objectifs, budget et calendrier, avec vous.","Un projet que le terrain peut porter."],
    ["Mettre en œuvre","Nos équipes structurent, forment et outillent les publics ciblés.","Des activités menées jusqu'au bout."],
    ["Suivre et mesurer","Les données sont dans nos outils dès le premier jour.","Des indicateurs toujours à jour."],
    ["Rendre compte","Rapports techniques et financiers, au rythme convenu.","Vous savez où va chaque activité."],
    ["Rester","Relais locaux, outils et suivi restent après la clôture.","Des résultats qui tiennent."]
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
  ["Où intervenez-vous ?", "Dans toute la RDC, sur place ou à distance."],
  ["Vos outils fonctionnent-ils sans internet ?", "Oui. AKIBA fonctionne entièrement sans réseau ; dès que le réseau revient, le groupe envoie ses données à l'animateur et à l'organisation, et l'application se met à jour d'elle-même. Ubora Hub fonctionne aussi hors connexion, les cours téléchargés de l'Académie se suivent sans réseau, et le générateur de business plan reste utilisable une fois ouvert."],
  ["Proposez-vous des formations sur vos outils ?", "Oui. Chaque déploiement comprend une formation de prise en main, puis un suivi. Notre Académie en ligne, academie.uborardc.com, propose aussi plus de 140 cours avec certificat. Nous organisons également des sessions sur demande, dans votre province ou en ligne."],
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
