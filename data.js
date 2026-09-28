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
  adresse: "Lubumbashi, Haut-Katanga, RDC",
  zone: "Partout en RDC, sur le terrain et à distance",
  horaires: "Du lundi au vendredi, de 8 h à 17 h",
  /* Mentions légales. Un champ laissé vide n'est pas affiché sur le site. */
  legal: { rccm: "CD/KNM/RCCM/24-A-04755", idnat: "01-G4701-N86995I", impot: "", directeur: "" }
};

/* Bande déroulante. Les dernières actualités publiées s'y ajoutent d'elles-mêmes. */
const TICKER_MESSAGES = [
  ["Le générateur de business plan est en ligne sur bp.uborardc.com", "https://bp.uborardc.com"],
  ["Le projet se termine, l'accompagnement continue : Ubora prend le relais des ONG sur le terrain", "/conseil#relais"],
  ["Groupes d'épargne, ONG, réseaux : demandez notre boîte à outils AVEC", "/avec#boite"],
  ["Ubora Fin : un fonds de roulement pour les AVEC que nous accompagnons", "/financement#intermediation"],
  ["Ubora Market prépare une plateforme qui relie vendeurs et acheteurs", "/marche"],
  ["Notre siège est à Lubumbashi. Nous travaillons dans toute la RDC", "/contact"]
];

/* ---------- La méthode Ubora (page « Notre approche ») ---------- */
const METHODE = {
  nom: "La méthode Ubora",
  intro: "Nous avons vu trop de projets former des gens, puis partir. Et trop de logiciels installés que personne n'utilise six mois plus tard. Notre façon de travailler tient en six temps, toujours dans le même ordre, et nous restons tant que le groupe ou l'entreprise n'est pas capable de continuer seul.",
  etapes: [
    { titre: "Écouter", texte: "On commence sur place, avec les personnes concernées, dans leur langue. On regarde ce qui existe déjà avant de proposer quoi que ce soit.",
      pourquoi: "Un dispositif pensé depuis un bureau ne résiste pas au premier cycle sur le terrain." },
    { titre: "Structurer", texte: "On écrit les règles avec le groupe : statuts, règlement intérieur, rôles de chacun, séparation claire entre la caisse et le fonds social.",
      pourquoi: "La plupart des conflits naissent de règles jamais écrites, pas du manque d'argent." },
    { titre: "Former", texte: "Éducation financière, gestion, crédit. Et surtout, on forme des relais issus de la communauté, qui prendront le relais après nous.",
      pourquoi: "Quand le projet s'arrête, c'est le relais local qui reste." },
    { titre: "Outiller", texte: "On remplace le cahier par un outil numérique simple, qui marche sans réseau, en francs congolais et en dollars.",
      pourquoi: "Réseau instable, deux monnaies, niveaux d'instruction variés : l'outil doit s'adapter, pas l'inverse." },
    { titre: "Connecter", texte: "L'historique tenu dans nos outils devient un dossier que l'on présente aux institutions financières et aux acheteurs.",
      pourquoi: "Un groupe sérieux reste invisible tant que personne ne sait prouver sa régularité." },
    { titre: "Suivre", texte: "Visites régulières, indicateurs partagés, réponse rapide sur WhatsApp. On ne part que lorsque ça tient.",
      pourquoi: "L'abandon juste après la formation est la cause d'échec la plus fréquente des projets d'inclusion financière." }
  ]
};

/* ==========================================================================
   LES CINQ PÔLES
   Chaque pôle a sa page (et son sous-domaine), avec la même construction :
   le contexte en RDC, notre démarche, les outils liés, la boîte à outils.
   ========================================================================== */
const POLES = [
  {
    id: "avec", chemin: "/avec", sousDomaine: "avec.uborardc.com",
    photo: ["avec", "Des femmes réunies en groupe, en pagnes colorés"],
    nom: "Ubora AVEC", initiales: "Av", couleur: "#23843A",
    accroche: "Épargner ensemble, emprunter sans crainte.",
    carte: "Nous créons, formons et suivons des groupes d'épargne, puis nous les aidons à accéder au crédit.",
    titre: `Des groupes d'épargne solides, et un vrai accès au <span class="serif">crédit</span>.`,
    lead: "Les Associations Villageoises d'Épargne et de Crédit sont souvent le premier service financier auquel une famille congolaise a accès. Nous les accompagnons de la création du groupe jusqu'à son premier financement : un prêt d'une institution financière, ou un fonds de roulement apporté par Ubora Fin.",
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
      ["Digitaliser", "Passage du cahier à AKIBA pour les cotisations, les prêts, les remboursements et le partage.", "Des comptes justes, que chaque membre peut vérifier."],
      ["Financer", "Deux voies : présenter l'historique du groupe aux IMF, aux COOPEC et aux banques, ou lui apporter un fonds de roulement par Ubora Fin, notre branche financière.", "Un groupe qui peut prêter davantage à ses membres, à des conditions raisonnables."],
      ["Suivre et faire grandir", "Supervision, graduation, activités génératrices de revenus, puis regroupement en fédération.", "Des groupes qui durent, et qui se renforcent ensemble."]
    ],
    avec: true,
    outils: ["akiba"],
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
    carte: "Nos programmes pour entrepreneurs : trouver l'idée, la tester, lancer l'entreprise puis la faire grandir.",
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
    nom: "Ubora Coop", initiales: "Co", couleur: "#4E8F2A",
    carte: "Nous aidons les organisations paysannes à devenir des coopératives bien gérées, qui vendent mieux.",
    titre: `Des coopératives bien gérées, et des producteurs <span class="serif">payés à temps</span>.`,
    lead: "Nous partons de ce qui existe : une organisation paysanne, un groupement de producteurs ou une coopérative qui ne fonctionne plus. Nous l'aidons à se constituer ou à se remettre en ordre, puis à gérer, vendre et se financer.",
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
    carte: "Nous préparons les emprunteurs, nous équipons les institutions et nous faisons le lien : des fonds levés auprès des financeurs, prêtés aux AVEC.",
    titre: `Rapprocher ceux qui ont besoin de crédit de ceux qui <span class="serif">prêtent</span>.`,
    lead: "Le crédit existe en RDC, mais il atteint mal les petits emprunteurs. Nous travaillons des deux côtés, et entre les deux : nous préparons les groupes, les coopératives et les PME, nous équipons les institutions financières, et nous faisons circuler l'argent des unes vers les autres.",
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
      ["Équiper l'institution", "Un logiciel pour gérer les membres, l'épargne, les crédits, la caisse et les rapports.", "De petits crédits suivis sans y perdre d'argent."],
      ["Mettre en relation", "Nous présentons les dossiers aux IMF, aux COOPEC et aux banques, et nous suivons la discussion.", "Un premier crédit, à des conditions supportables."],
      ["Apporter un fonds de roulement", "Pour les AVEC que nous suivons, Ubora Fin prête elle-même un fonds de roulement au groupe, remboursable sur le cycle, en plus de l'épargne des membres.", "Plus de prêts possibles pour les membres, sans attendre une banque."],
      ["Suivre le remboursement", "Échéances, relances, appui en cas de difficulté, des deux côtés.", "Un bon historique, qui ouvre la porte au crédit suivant."]
    ],
    intermediation: {
      titre: "Le lien entre ceux qui financent et les groupes d'épargne",
      intro: "Une banque ne peut pas étudier des centaines de petits dossiers dans des villages éloignés. Un groupe d'épargne ne sait pas à quelle porte frapper. Ubora Fin se place entre les deux : nous levons des fonds auprès de ceux qui veulent financer, et nous les prêtons aux AVEC que nous connaissons, sous forme de fonds de roulement.",
      etapes: [
        ["Lever des fonds", "Lignes de crédit d'institutions de microfinance et de banques, capitaux d'investisseurs d'impact, fonds de garantie apportés par des bailleurs."],
        ["Prêter aux groupes", "Un fonds de roulement accordé au groupe, et non à chaque membre, par paliers, selon l'historique enregistré dans AKIBA."],
        ["Suivre et rendre compte", "Les remboursements sont suivis semaine après semaine. Chaque financeur reçoit des rapports clairs sur l'usage de son argent."],
        ["Faire grandir", "Les groupes les plus solides passent en relation directe avec l'institution partenaire. Les sommes remboursées financent d'autres groupes."]
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
    outils: ["logiciel-fin", "akiba"],
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
    carte: "Nous mettons en relation les PME, les coopératives et les entrepreneurs avec des acheteurs.",
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
    ["Suivi des prêts", "Les retards sont repérés tard", "Échéances et rappels automatiques"],
    ["Historique", "Aucune trace en dehors du groupe", "Un historique à présenter à une institution financière"],
    ["Suivi d'un programme", "Des données lentes à collecter, souvent incomplètes", "Un tableau de bord pour l'ONG ou le bailleur"]
  ],
  passerelle: [
    ["Le groupe", "Quinze à trente membres qui épargnent chaque semaine et se prêtent entre eux."],
    ["AKIBA", "Les comptes sont tenus sur téléphone, sans réseau, et chacun peut les vérifier."],
    ["L'historique", "La régularité et les remboursements deviennent des indicateurs lisibles."],
    ["Le financement", "Une IMF, une COOPEC, une banque, ou Ubora Fin elle-même, apporte un fonds de roulement au groupe. Nous suivons le remboursement."]
  ]
};

/* ==========================================================================
   LES OUTILS NUMÉRIQUES
   Chaque outil est rattaché à un pôle. statut : "en-ligne" ou "en-cours".
   ========================================================================== */
const OUTILS = [
  {
    id: "akiba", nom: "AKIBA", pole: "avec", statut: "en-ligne", mock: "akiba", couleur: "#23843A", initiales: "Ak",
    sousDomaine: "akiba.uborardc.com", url: "https://akiba.uborardc.com",
    resume: "L'application qui remplace le cahier des AVEC. Elle fonctionne sans réseau, sur un simple téléphone Android.",
    points: ["Cotisations, prêts, remboursements et amendes", "Fonds social et partage de fin de cycle", "Fonctionne hors ligne", "Francs congolais et dollars", "Historique à présenter à une institution"]
  },
  {
    id: "bp", nom: "Générateur de business plan", pole: "pme", statut: "en-ligne", mock: "pme", couleur: "#B0622A", initiales: "Bp",
    sousDomaine: "bp.uborardc.com", url: "https://bp.uborardc.com",
    resume: "Il guide l'entrepreneur question par question et produit un plan d'affaires complet, avec les prévisions financières.",
    points: ["Projet, marché, concurrence et stratégie", "Compte de résultat et trésorerie calculés", "Seuil de rentabilité", "Dossier prêt à présenter", "Utilisable hors connexion une fois ouvert"]
  },
  {
    id: "hub", nom: "Ubora Hub", pole: "pme", statut: "en-ligne", mock: "hub", couleur: "#0F3170", initiales: "Hb",
    sousDomaine: "hub.uborardc.com", url: "https://www.uborahub.com",
    resume: "La plateforme des incubateurs et des programmes d'entrepreneuriat : candidatures, suivi des cohortes, coaching et rapports.",
    points: ["Appels à candidatures et sélection", "Fiche de suivi par entrepreneur", "Séances de coaching", "Indicateurs d'impact", "Rapports pour les bailleurs"]
  },
  {
    id: "logiciel-fin", nom: "Ubora Fin, le logiciel", pole: "financement", statut: "en-cours", mock: "fin", couleur: "#1D5FB8", initiales: "Fi",
    resume: "Un logiciel de gestion pour les petites IMF et les COOPEC : membres, épargne, crédits, caisse et rapports.",
    points: ["Dossiers des membres et des clients", "Épargne et dépôts", "Crédits, échéanciers et retards", "Caisse en francs congolais et en dollars", "Rapports et indicateurs"]
  },
  {
    id: "logiciel-coop", nom: "Ubora Coop, le logiciel", pole: "cooperatives", statut: "en-cours", mock: "coop", couleur: "#4E8F2A", initiales: "Co",
    resume: "Le registre numérique de la coopérative : membres, parcelles, collectes, stocks, ventes et paiements.",
    points: ["Membres, parcelles et parts sociales", "Collecte et pesées", "Stocks et intrants à crédit", "Ventes groupées", "Paiements par mobile money"]
  },
  {
    id: "plateforme-market", nom: "Ubora Market, la plateforme", pole: "marche", statut: "en-cours", mock: "market", couleur: "#1F7A6B", initiales: "Mk",
    resume: "Une place de marché où les vendeurs accompagnés publient leur offre et où les acheteurs trouvent des fournisseurs vérifiés.",
    points: ["Offres des vendeurs vérifiés", "Recherche par produit et par zone", "Historique des livraisons", "Mise en relation encadrée"]
  }
];

/* ---------- Conseil et programmes (pour les organisations) ---------- */
const CONSEIL = [
  { id: "etudes", ico: "compass", titre: "Conseil et études",
    texte: "Études de marché et de faisabilité, diagnostics de filières, évaluations de projets. Nous allons chercher l'information sur le terrain et nous rendons des recommandations que l'on peut appliquer.",
    points: ["Études de marché et de faisabilité", "Analyse de filières", "Enquêtes de terrain", "Évaluations de projets et d'impact"] },
  { id: "projets", ico: "target", titre: "Gestion de projets",
    texte: "Nous concevons et conduisons des projets de développement économique pour nos partenaires, ou à leurs côtés, du montage jusqu'au rapport final.",
    points: ["Conception et montage", "Propositions de financement", "Coordination sur le terrain", "Suivi, évaluation et rapports"] },
  { id: "digitalisation", ico: "flow", titre: "Digitalisation de l'accompagnement",
    texte: "Beaucoup d'organisations suivent encore leurs bénéficiaires dans des fichiers dispersés. Nous les aidons à organiser et à outiller ce suivi, notamment avec Ubora Hub.",
    points: ["Analyse des pratiques existantes", "Mise en place d'Ubora Hub", "Indicateurs et tableaux de bord", "Formation des équipes"] },
  { id: "capacites", ico: "school", titre: "Formation et renforcement des équipes",
    texte: "Nous formons les équipes des ONG, des institutions et des programmes à nos méthodes et à nos outils, et nous formons des formateurs relais.",
    points: ["Formation de formateurs", "Méthodologie AVEC", "Accompagnement d'entrepreneurs", "Gestion des coopératives"] }
];

/* ---------- Catalogue des formations proposées ---------- */
const CATALOGUE = [
  ["AKIBA pour les trésoriers et les comités", "avec", "Tenir les comptes du groupe sur téléphone, préparer le partage de fin de cycle."],
  ["Devenir formateur relais AVEC", "avec", "Animer les séances, accompagner et suivre les groupes."],
  ["De l'idée au premier client", "pme", "Tester une idée d'entreprise avec très peu de moyens."],
  ["Rédiger son plan d'affaires", "pme", "Construire son dossier avec le générateur en ligne."],
  ["Gérer une coopérative", "cooperatives", "Gouvernance, registres, caisse et comptabilité simplifiée."],
  ["Préparer un dossier de crédit", "financement", "Ce qu'une institution financière attend, et comment le présenter."],
  ["Ubora Hub pour les équipes d'accompagnement", "pme", "Suivre une cohorte, ses séances de coaching et ses résultats."]
];

/* ---------- Questions fréquentes ---------- */
const FAQ = [
  ["Qui peut travailler avec Ubora ?", "Les groupes d'épargne, les entrepreneurs et les PME, les coopératives et les organisations paysannes, les petites institutions financières, ainsi que les ONG, les incubateurs et les bailleurs qui accompagnent ces publics."],
  ["Travaillez-vous en dehors de Lubumbashi ?", "Oui. Notre siège est à Lubumbashi, mais nous intervenons dans toute la RDC, sur place ou à distance."],
  ["Vos outils fonctionnent-ils sans internet ?", "AKIBA fonctionne sans réseau et synchronise les données dès que la connexion revient. Le générateur de business plan reste utilisable une fois ouvert."],
  ["Proposez-vous des formations sur vos outils ?", "Oui. Chaque déploiement comprend une formation de prise en main, puis un suivi. Nous organisons aussi des sessions sur demande, dans votre province ou en ligne."],
  ["Faut-il être une entreprise déclarée pour être accompagné ?", "Non. Nous accompagnons justement beaucoup d'entrepreneurs et de groupements vers la formalisation, étape par étape."],
  ["Que devient l'accompagnement quand le projet d'une ONG se termine ?", "Nous restons. Les groupes, les entrepreneurs et les coopératives continuent d'être suivis après la clôture du projet. Notre modèle économique finance une partie de ces activités de terrain, et les outils mis en place restent en service."],
  ["Ubora peut-elle financer notre groupe d'épargne ?", "Oui, par Ubora Fin, notre branche financière. Pour les AVEC que nous accompagnons, nous pouvons apporter un fonds de roulement, remboursable sur le cycle, en plus de l'épargne des membres. Nous pouvons aussi présenter le groupe à une IMF, une COOPEC ou une banque partenaire."],
  ["Combien coûte l'accompagnement ?", "Cela dépend du programme et du nombre de bénéficiaires. Les prestations facturées aux organisations nous permettent de proposer des tarifs solidaires aux groupes d'épargne et aux micro-entrepreneurs. Contactez-nous pour en parler."]
];

/* Contenus gérés depuis l'espace équipe (base de données).
   Ces listes restent vides : le site affiche ce qui est publié dans la base. */
const ACTUALITES = [];
const FORMATIONS = [];
const OFFRES = [];
