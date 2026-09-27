/* ==========================================================================
   UBORA — CONTENU DU SITE
   Modifiez ce fichier pour mettre à jour le site. Aucune autre connaissance
   technique n'est nécessaire : copiez un bloc existant, changez les textes.
   ========================================================================== */

/* Base de données (Supabase). Laissez vide pour utiliser uniquement ce fichier.
   Project Settings → API : "Project URL" et clé "anon public". */
const SUPABASE = {
  url: "https://uoshpvqdszygezkuhhco.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc2hwdnFkc3p5Z2V6a3VoaGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjYwNzQsImV4cCI6MjEwNTg0MjA3NH0.mMV8Z2dl981BGl0o_CLSAsxPsO3QzQlAAWWwT4YVVW4"
};

const CONFIG = {
  email: "contact@uborardc.com",
  telephone: "+243 998 275 144",
  whatsapp: "243998275144",           // format international sans "+"
  adresse: "Lubumbashi, Haut-Katanga, RDC",
  zone: "Partout en RDC, sur le terrain et à distance",
  horaires: "Lun – Ven · 8h00 – 17h00",
  tauxUSD: 2800                       // 1 USD = x FC (indicatif, pour le simulateur)
};

/* Messages de la bande déroulante (en plus des 4 dernières actualités) */
const TICKER_MESSAGES = [
  ["Appui aux AVEC : du cahier au numérique, jusqu'à la banque", "#/avec"],
  ["Formations Ubora AVEC & Ubora Hub : consultez le calendrier des sessions", "#/formations"],
  ["Nous recrutons : découvrez nos offres d'emploi", "#/carrieres"],
  ["Basés à Lubumbashi, nous intervenons partout en RDC", "#/contact"]
];

/* ---------- Les 4 axes d'intervention (regroupent les services) ---------- */
const AXES = [
  { id: "finance", titre: "Épargne communautaire & finance inclusive", accroche: "Des AVEC solides, digitalisées, puis connectées au financement formel.",
    services: ["avec", "inclusion"], solutions: ["ubora-avec", "ubora-fin"] },
  { id: "entreprises", titre: "Entreprises & entrepreneurs", accroche: "Des PME structurées, outillées et finançables.",
    services: ["pme", "entrepreneuriat", "outils"], solutions: ["ubora-pme"] },
  { id: "agri", titre: "Agriculture & filières", accroche: "Des coopératives fortes et des filières qui créent de la valeur.",
    services: ["cooperatives", "chaines-valeur"], solutions: ["ubora-coop"] },
  { id: "programmes", titre: "Conseil, formation & programmes", accroche: "Concevoir, piloter et outiller l'accompagnement.",
    services: ["conseil", "projets", "processus", "formation"], solutions: ["ubora-hub"] }
];

/* ---------- Notre méthodologie d'accompagnement ----------
   Utilisée sur l'accueil et sur la page AVEC. « pourquoi » explique
   ce que cette étape règle dans le contexte congolais. */
const METHODE = {
  nom: "La méthode Ubora",
  accroche: "Six temps, du terrain jusqu'au financement.",
  intro: "Nos concurrents s'arrêtent souvent à la formation, ou livrent un logiciel sans accompagnement. Nous faisons les deux, dans l'ordre, et nous restons jusqu'à ce que le groupe ou l'entreprise tienne sans nous.",
  etapes: [
    { titre: "Écouter", texte: "Diagnostic sur place, dans la langue des membres, avec les autorités locales et les structures déjà présentes.",
      pourquoi: "En RDC, un dispositif conçu depuis un bureau ne survit pas au premier cycle. Nous partons de ce qui existe déjà." },
    { titre: "Structurer", texte: "Statuts, règlement intérieur, comité élu, rôles précis, caisse et fonds social bien séparés.",
      pourquoi: "La majorité des conflits viennent de règles non écrites et de rôles confus, pas du manque d'argent." },
    { titre: "Former", texte: "Éducation financière pratique, gestion du crédit, et formation de formateurs relais issus de la communauté.",
      pourquoi: "Le relais local reste après notre départ : c'est lui qui forme les cycles suivants." },
    { titre: "Digitaliser", texte: "Passage du cahier à Ubora AVEC : saisie hors ligne, calculs automatiques, transparence pour tous les membres.",
      pourquoi: "Réseau intermittent, double monnaie, faible alphabétisation : l'outil est conçu pour ces contraintes, pas contre elles." },
    { titre: "Connecter", texte: "L'historique d'épargne et de remboursement devient un dossier crédible auprès des IMF, COOPEC et banques partenaires.",
      pourquoi: "Un groupe discipliné reste invisible pour le système financier tant que personne ne traduit sa régularité en preuves." },
    { titre: "Suivre", texte: "Visites de contrôle, indicateurs partagés, support WhatsApp, jusqu'à l'autonomie complète.",
      pourquoi: "L'abandon après la formation est la première cause d'échec des programmes d'inclusion financière." }
  ]
};

/* ---------- Page « Appui aux AVEC » ---------- */
const AVEC = {
  definition: "Une AVEC (Association Villageoise d'Épargne et de Crédit) réunit 15 à 30 personnes qui épargnent ensemble chaque semaine, s'accordent de petits crédits et partagent la caisse à la fin du cycle, généralement après 9 à 12 mois. Un fonds social couvre les coups durs : maladie, deuil, scolarité.",
  constats: [
    ["Environ un adulte sur quatre", "dispose d'un compte dans une institution financière formelle en RDC (Global Findex). Pour les autres, l'AVEC est souvent le seul service financier accessible."],
    ["Le cahier se perd", "Registres abîmés, calculs à la main, erreurs de report : la confiance s'effrite et les conflits apparaissent en fin de cycle."],
    ["Aucune trace exploitable", "Même après des années de discipline, le groupe n'a rien à présenter à une banque ou à une IMF."],
    ["Un suivi qui s'arrête", "Quand le projet financé se termine, l'accompagnement disparaît et beaucoup de groupes se dispersent."]
  ],
  avantApres: [
    ["Tenue des comptes", "Cahier manuscrit, recopié à chaque réunion", "Saisie sur téléphone, hors ligne, sauvegardée"],
    ["Calcul du partage", "Plusieurs heures, contestations fréquentes", "Instantané, au prorata de l'épargne de chacun"],
    ["Transparence", "Seul le trésorier connaît les soldes", "Chaque membre voit sa situation"],
    ["Suivi des prêts", "Retards repérés tard", "Échéancier et alertes automatiques"],
    ["Historique financier", "Inexistant hors du groupe", "Exportable et présentable à une institution financière"],
    ["Pilotage d'un programme", "Collecte de données lente et incomplète", "Tableau de bord consolidé pour l'ONG ou le bailleur"]
  ],
  passerelle: [
    ["1 à 2 cycles documentés", "Le groupe utilise Ubora AVEC et constitue un historique fiable de cotisations, de prêts et de remboursements."],
    ["Score de discipline", "Régularité, taux de remboursement et gouvernance sont résumés en indicateurs lisibles par un financier."],
    ["Dossier et mise en relation", "Nous préparons le dossier avec le groupe et l'accompagnons auprès des IMF, COOPEC et banques partenaires."],
    ["Crédit et suivi", "Le crédit finance des activités génératrices de revenus ; nous suivons les remboursements avec le groupe et l'institution."]
  ],
  pourQui: [
    ["Groupes et réseaux d'AVEC", "Constitution, formation, digitalisation et accès au crédit.", "#/contact"],
    ["ONG et programmes d'inclusion", "Déploiement à grande échelle, suivi des indicateurs et rapports aux bailleurs.", "#/solutions/ubora-hub"],
    ["IMF, COOPEC et banques", "Un portefeuille de groupes déjà structurés et un système de gestion adapté.", "#/solutions/ubora-fin"]
  ]
};

/* ---------- Services ---------- */
const SERVICES = [
  { id:"avec", ico:"coins", titre:"Appui aux AVEC (groupes d'épargne)", lien:"#/avec",
    court:"Créer, former, digitaliser et accompagner les Associations Villageoises d'Épargne et de Crédit, jusqu'à leur ouvrir l'accès au financement formel.",
    texte:"L'AVEC est le premier service financier accessible dans la plupart des communautés congolaises. Nous accompagnons les groupes sur tout leur cycle : mise en place et gouvernance, éducation financière, tenue des comptes avec Ubora AVEC, puis valorisation de leur historique auprès des institutions financières. C'est notre cœur de métier.",
    points:["Sensibilisation et constitution des groupes","Statuts, règlement intérieur et gouvernance","Éducation financière en langues locales","Formation des trésoriers et de formateurs relais","Digitalisation des comptes avec Ubora AVEC","Passerelle vers les IMF, COOPEC et banques"],
    pour:["Groupes AVEC / VSLA","Mutuelles de solidarité","Femmes et jeunes","ONG et programmes d'inclusion"] },
  { id:"inclusion", ico:"finance", titre:"Inclusion financière & microfinance",
    court:"Éducation financière, mobile money et outillage des petites institutions financières qui servent la base de la pyramide.",
    texte:"Au-delà des groupes d'épargne, nous travaillons avec les institutions qui financent les populations mal servies : COOPEC, petites IMF, programmes de crédit. Nous renforçons leurs pratiques et leur système de gestion pour qu'elles prêtent davantage, et mieux.",
    points:["Éducation financière des ménages et micro-entrepreneurs","Paiements et épargne par mobile money","Système de gestion Ubora Fin pour IMF et COOPEC","Suivi du portefeuille et des impayés","Produits adaptés aux groupes d'épargne","Conseil en inclusion financière"],
    pour:["COOPEC & petites IMF","Programmes de crédit","Ménages et micro-entrepreneurs"] },
  { id:"pme", ico:"pme", titre:"Structuration & digitalisation des PME",
    court:"Formalisation, organisation interne, outils numériques de gestion : bâtir une entreprise solide et finançable.",
    texte:"Une PME bien structurée vend mieux, recrute mieux et convainc les financeurs. Nous intervenons du diagnostic à la mise en place des outils, avec des solutions adaptées au contexte congolais (CDF/USD, mobile money, connectivité intermittente).",
    points:["Diagnostic organisationnel et financier","Formalisation : RCCM, id. nat., fiscalité","Procédures et organigramme","Comptabilité simplifiée et tableaux de bord","Outils numériques de caisse, stock, facturation","Présence en ligne et vente digitale"],
    pour:["PME","Commerces","Agro-transformateurs","Prestataires de services"] },
  { id:"entrepreneuriat", ico:"rocket", titre:"Accompagnement entrepreneurial",
    court:"De l'idée au premier financement : formation, coaching et mise en réseau des porteurs de projets.",
    texte:"Nos programmes combinent formation collective, coaching individuel et mise en relation. Nous aidons les entrepreneurs à valider leur marché, à construire leur modèle économique et à préparer des dossiers de financement solides.",
    points:["Idéation et validation de marché","Business model et plan d'affaires","Coaching individuel","Préparation au pitch et aux concours","Dossiers de financement","Mise en relation mentors & investisseurs"],
    pour:["Porteurs de projet","Jeunes diplômés","Start-up","Entrepreneurs en croissance"] },
  { id:"outils", ico:"tools", titre:"Outils de gestion entrepreneuriale",
    court:"Des outils simples et adaptés pour piloter son activité au quotidien, en CDF comme en USD.",
    texte:"Nous concevons et diffusons des outils pratiques : modèles de gestion, applications, tableaux de bord. Ils sont pensés pour des entrepreneurs qui n'ont pas de service comptable, et nous formons à leur usage.",
    points:["Modèles de caisse, stock, trésorerie","Ubora PME : gestion & plan d'affaires","Tableaux de bord simplifiés","Formations à l'usage","Support et suivi","Outils sur mesure"],
    pour:["Entrepreneurs","PME","Coopératives","Organisations d'appui"] },
  { id:"cooperatives", ico:"leaf", titre:"Accompagnement des coopératives agricoles",
    court:"Gouvernance, gestion, accès aux marchés et au financement pour les coopératives agricoles, partout en RDC.",
    texte:"Nous renforçons les coopératives dans leur gouvernance, leur gestion et leur relation avec les marchés. Nous le faisons dans le respect de l'Acte uniforme OHADA relatif aux sociétés coopératives.",
    points:["Mise en conformité OHADA","Gouvernance et vie associative","Gestion des membres et des stocks","Ventes groupées et contrats","Accès aux intrants et au crédit","Digitalisation avec Ubora Coop"],
    pour:["Coopératives","Unions","Groupements de producteurs"] },
  { id:"chaines-valeur", ico:"chain", titre:"Développement de chaînes de valeur",
    court:"Analyser et renforcer les filières, du producteur au marché, pour créer plus de valeur localement.",
    texte:"Nous analysons les filières agricoles et artisanales pour identifier les goulots d'étranglement et les opportunités. Nous connectons ensuite les acteurs entre eux : producteurs, coopératives, transformateurs, transporteurs, acheteurs et financeurs. L'objectif est qu'une plus grande part de la valeur reste entre les mains des producteurs et des PME congolaises.",
    points:["Analyse et cartographie de filières","Identification des acteurs et des goulots","Structuration des producteurs et agrégateurs","Appui à la transformation locale","Contrats et accès aux marchés","Financement de la chaîne (warrantage, crédit intrants)"],
    pour:["Coopératives","Transformateurs","Acheteurs & agro-industries","ONG & bailleurs"] },
  { id:"conseil", ico:"compass", titre:"Conseil & études",
    court:"Études de marché, stratégie, études de faisabilité et évaluations pour entreprises, ONG et institutions.",
    texte:"Nous mettons notre connaissance du tissu économique congolais au service des décideurs. Nous réalisons des études, des diagnostics et des évaluations, et nous conseillons en stratégie. Nos recommandations s'appuient sur des données de terrain et restent actionnables.",
    points:["Études de marché et de faisabilité","Diagnostics sectoriels et chaînes de valeur","Stratégie et plans de développement","Enquêtes terrain et collecte de données numérique","Évaluations de projets et d'impact","Conseil en inclusion financière"],
    pour:["Entreprises","ONG & agences","Institutions publiques","Bailleurs de fonds"] },
  { id:"projets", ico:"target", titre:"Gestion de projets",
    court:"Conception, mise en œuvre et suivi-évaluation de projets de développement économique et d'entrepreneuriat.",
    texte:"Nous concevons et pilotons des projets pour le compte de partenaires, ou à leurs côtés. Cela couvre le cadrage, la planification, la coordination terrain, le suivi-évaluation et le reporting. Nos propres outils numériques nous permettent de suivre chaque bénéficiaire et chaque indicateur.",
    points:["Conception et montage de projets","Rédaction de propositions de financement","Planification et coordination terrain","Suivi-évaluation (cadre logique, indicateurs)","Reporting aux bailleurs","Capitalisation et diffusion des résultats"],
    pour:["ONG","Bailleurs","Programmes publics","Entreprises (RSE)"] },
  { id:"processus", ico:"flow", titre:"Digitalisation des processus d'accompagnement",
    court:"Pour les incubateurs, ONG et programmes : digitaliser candidatures, suivi et rapports d'impact.",
    texte:"Beaucoup d'organisations d'appui gèrent encore leurs cohortes sur des fichiers dispersés. Avec Ubora Hub et notre accompagnement méthodologique, elles gagnent du temps, fiabilisent leurs données et rendent compte de leur impact plus facilement.",
    points:["Cartographie des processus existants","Paramétrage d'Ubora Hub","Grilles de diagnostic et d'évaluation","Indicateurs d'impact et tableaux de bord","Formation des équipes","Rapports automatisés pour les bailleurs"],
    pour:["Incubateurs","ONG","Programmes publics","Bailleurs de fonds"] },
  { id:"formation", ico:"school", titre:"Formation, accompagnement & suivi sur nos outils",
    court:"Des sessions pratiques pour maîtriser Ubora AVEC, Ubora Hub et nos outils, puis un suivi jusqu'à l'autonomie.",
    texte:"Un outil n'a de valeur que s'il est bien utilisé. Chaque déploiement s'accompagne donc de formations pratiques, sur place ou à distance, adaptées au niveau des utilisateurs : trésoriers de groupes d'épargne, gestionnaires de coopératives, équipes d'incubateurs, entrepreneurs. Nous assurons ensuite un suivi régulier et un support réactif jusqu'à l'autonomie complète.",
    points:["Formations de prise en main (présentiel ou en ligne)","Formation de formateurs relais","Guides pratiques et tutoriels vidéo","Accompagnement au démarrage sur le terrain","Suivi périodique et visites de contrôle","Support WhatsApp et assistance à distance"],
    pour:["Groupes d'épargne","Coopératives","Incubateurs & ONG","Entrepreneurs"] }
];

/* ---------- Solutions numériques ----------
   statut : "dispo" | "pilote" | "bientot"
   mock   : "akiba" | "hub" | "coop" | "kit"  (maquette d'écran affichée) */
const SOLUTIONS = [
  {
    id: "ubora-avec", raccourci: "avec.uborardc.com", nom: "Ubora AVEC", initiales: "Av", couleur: "#2F8F38", statut: "dispo", mock: "akiba", app: "AKIBA",
    site: "https://cubakakatulanya-ux.github.io/akiba-avec/",
    tagline: "Épargne et crédit communautaires, digitalisés",
    resume: "La gestion des groupes d'épargne (AVEC, mutuelles, tontines) passe du cahier au téléphone : cotisations, prêts, remboursements et partage de fin de cycle, en toute transparence.",
    description: "Ubora AVEC est notre offre complète d'appui aux groupes d'épargne : constitution, gouvernance, formation, puis tenue numérique des comptes. Son outil numérique, AKIBA (« épargne » en swahili), donne aux groupes d'épargne et de crédit un registre numérique fiable. Chaque membre voit son solde, le trésorier n'a plus de calculs à la main, et le groupe se constitue un historique financier. Cet historique ouvre ensuite l'accès au crédit auprès des institutions de microfinance partenaires.",
    fonctionnalites: [
      ["Registre des cotisations", "Chaque dépôt est horodaté, attribué à un membre et visible par tout le groupe."],
      ["Prêts & remboursements", "Calcul automatique des intérêts, échéanciers et relances."],
      ["Partage de fin de cycle", "Répartition au prorata de l'épargne de chacun, sans erreur."],
      ["Mobile money", "Compatible avec les paiements M-Pesa, Airtel Money et Orange Money."],
      ["Mode hors ligne", "Saisie sans connexion, synchronisation dès que le réseau revient."],
      ["Historique de crédit", "Un score de discipline financière utile pour accéder à la microfinance."]
    ],
    pour: ["Groupes AVEC / VSLA", "Mutuelles de solidarité", "Coopératives", "ONG & programmes"],
    outils: [
      ["AKIBA", "L'application de tenue des comptes du groupe : cotisations, prêts, remboursements, amendes, fonds social et partage de fin de cycle. Fonctionne hors ligne sur un simple téléphone Android."],
      ["Registres et fiches modèles", "Statuts, règlement intérieur, fiches de membre et procès-verbaux types, conformes aux pratiques AVEC."],
      ["Tableau de bord programme", "Vue consolidée de tous les groupes d'un projet, avec indicateurs exportables pour l'ONG ou le bailleur."],
      ["Dossier de crédit", "Synthèse de l'historique du groupe, à présenter à une IMF, une COOPEC ou une banque."]
    ],
    deploiement: [
      ["Cadrage avec le groupe", "Nous partons des règles existantes : montant des parts, rythme des réunions, taux pratiqué, langue de travail."],
      ["Formation des responsables", "Une journée pour le trésorier, le secrétaire et le comité, sur leur propre matériel."],
      ["Démarrage accompagné", "Nous assistons deux à trois réunions pour sécuriser les premières saisies."],
      ["Suivi de cycle", "Visites de contrôle, appui au partage de fin de cycle, puis préparation du dossier de crédit."]
    ],
    usages: [
      ["Trésorier", "Saisit les cotisations, prêts et amendes pendant la réunion, sans connexion."],
      ["Secrétaire", "Vérifie les écritures et partage le récapitulatif avec les membres."],
      ["Membres", "Consultent leur épargne, leurs crédits en cours et leurs échéances."],
      ["ONG ou programme", "Suit tous les groupes et produit ses rapports sans collecte manuelle."],
      ["Institution financière", "Consulte l'historique du groupe pour instruire une demande de crédit."]
    ]
  },
  {
    id: "ubora-hub", raccourci: "hub.uborardc.com", nom: "Ubora Hub", initiales: "Hb", couleur: "#0B2F6E", statut: "dispo", mock: "hub",
    site: "https://www.uborahub.com",
    tagline: "La plateforme d'accompagnement des entrepreneurs",
    resume: "Un espace numérique qui réunit tout le parcours d'accompagnement : candidatures, diagnostics, coaching, formations, suivi des indicateurs et rapports aux bailleurs.",
    description: "Ubora Hub digitalise les processus des incubateurs, des programmes d'entrepreneuriat et des organisations d'appui. Les entrepreneurs y suivent leur parcours et y trouvent leurs ressources. Les équipes pilotent leurs cohortes, et les partenaires reçoivent des rapports d'impact fiables sans ressaisie.",
    fonctionnalites: [
      ["Appels à candidatures", "Formulaires, présélection et grilles d'évaluation partagées."],
      ["Suivi des cohortes", "Fiche par entrepreneur : diagnostic, plan d'action, séances de coaching."],
      ["Formations & ressources", "Modules, modèles de documents, outils de gestion téléchargeables."],
      ["Indicateurs d'impact", "Chiffre d'affaires, emplois, formalisation : suivis dans le temps."],
      ["Rapports bailleurs", "Tableaux de bord et exports prêts à envoyer."],
      ["Mise en relation", "Mentors, experts, financeurs et marchés."]
    ],
    pour: ["Incubateurs & accélérateurs", "Programmes d'entrepreneuriat", "ONG & bailleurs", "Entrepreneurs"],
    deploiement: [
      ["Cartographie du parcours", "Atelier avec vos équipes pour décrire vos étapes, vos critères et vos indicateurs actuels."],
      ["Paramétrage", "Formulaires de candidature, grilles d'évaluation, modèles de séances et indicateurs d'impact."],
      ["Formation des équipes", "Prise en main par les chargés de programme, les coachs et la direction."],
      ["Première cohorte accompagnée", "Nous restons présents sur le premier cycle complet, jusqu'au rapport final."]
    ],
    usages: [
      ["Chargé de programme", "Lance les appels à candidatures, constitue les cohortes, suit l'avancement."],
      ["Coach ou mentor", "Tient la fiche de l'entrepreneur, planifie les séances et note les décisions."],
      ["Entrepreneur", "Dépose sa candidature, suit son plan d'action et accède aux ressources."],
      ["Direction et bailleur", "Consulte les tableaux de bord et exporte les rapports d'impact."]
    ]
  },
  {
    id: "ubora-coop", raccourci: "coop.uborardc.com", nom: "Ubora Coop", initiales: "Co", couleur: "#5E9E2F", statut: "pilote", mock: "coop",
    tagline: "Créer, structurer et gérer une coopérative, jusqu'au marché",
    resume: "De la constitution du groupe à la vente groupée : création et immatriculation de la coopérative, structuration interne, formation des organes, logiciel de gestion, accès aux marchés et au crédit de campagne.",
    description: "Ubora Coop accompagne une coopérative depuis sa création. Beaucoup de groupements existent de fait — des producteurs qui travaillent ensemble — sans exister en droit : pas de statuts, pas d'immatriculation, donc pas de compte bancaire, pas de contrat possible, pas de crédit. Nous partons de là : constituer la coopérative, la formaliser, organiser ses organes, puis l'outiller. Le logiciel donne à la coopérative un registre fiable de ses membres, de ses parcelles, de ses collectes et de ses ventes. L'accompagnement met la gouvernance en conformité avec l'Acte uniforme OHADA, forme le comité et les agents de collecte, organise les ventes groupées et prépare l'accès au crédit de campagne. Une coopérative qui connaît ses volumes et paie ses producteurs à temps négocie mieux, et convainc acheteurs comme financeurs.",
    fonctionnalites: [
      ["Création & constitution", "Assemblée constitutive, adhésions, souscription des parts sociales, désignation des organes."],
      ["Formalisation", "Statuts conformes à l'Acte uniforme OHADA, immatriculation au registre des sociétés coopératives, identification nationale, compte bancaire."],
      ["Structuration interne", "Règlement intérieur, organigramme, séparation des rôles entre assemblée, conseil et gérance, procédures de caisse."],
      ["Registre des membres", "Profil, parcelles, cultures, parts sociales."],
      ["Collecte & stocks", "Pesées, qualité, entrepôts, pertes post-récolte."],
      ["Intrants à crédit", "Distribution et récupération sur les ventes."],
      ["Ventes groupées", "Contrats acheteurs, prix, livraisons."],
      ["Paiements producteurs", "Décomptes individuels, versements mobile money."],
      ["Gouvernance", "AG, PV, conformité OHADA des sociétés coopératives."],
      ["Formation & coaching", "Comité de gestion, gérant, comptable et agents de collecte formés sur leurs opérations réelles."],
      ["Accès aux marchés et au crédit", "Recherche d'acheteurs, contrats de vente groupée, préparation du crédit de campagne et des intrants."]
    ],
    pour: ["Coopératives agricoles", "Unions de coopératives", "Groupements de producteurs", "Acheteurs & agrégateurs", "ONG et programmes agricoles"],
    deploiement: [
      ["Recensement", "Enregistrement des membres, des parcelles, des cultures et des parts sociales."],
      ["Paramétrage de la campagne", "Cultures, prix, entrepôts, points de collecte et règles de paiement."],
      ["Formation du comité", "Gérant, comptable et agents de collecte formés sur leurs opérations quotidiennes."],
      ["Première campagne accompagnée", "Présence lors des collectes, puis appui à la vente groupée et aux paiements."]
    ],
    usages: [
      ["Agent de collecte", "Enregistre les pesées et la qualité, même sans réseau, au point de collecte."],
      ["Gérant", "Suit les stocks, prépare les ventes groupées et déclenche les paiements."],
      ["Comité de gestion", "Prépare l'assemblée générale avec des comptes à jour."],
      ["Producteur", "Reçoit son décompte détaillé et son paiement par mobile money."],
      ["Acheteur", "Obtient des volumes traçables et des livraisons planifiées."]
    ]
  },
  {
    id: "ubora-fin", raccourci: "fin.uborardc.com", nom: "Ubora Fin", initiales: "Fi", couleur: "#1D5FB8", statut: "dispo", mock: "fin",
    site: "",   // À COMPLÉTER : collez ici le lien vers Ubora Fin (ex. "https://...")
    tagline: "Gestion, formation et passerelle vers le financement",
    resume: "Un logiciel pour les petites institutions financières, la formation et le coaching des structures bénéficiaires, et la mise en relation avec les institutions de microfinance. Un projet de société de crédit dédiée au financement des AVEC est en préparation.",
    description: "Ubora Fin travaille les deux côtés du guichet. D'un côté, un système de gestion fiable et abordable pour les petites institutions financières : les agents gagnent du temps, le portefeuille est suivi en temps réel, la direction dispose des indicateurs attendus par la supervision. De l'autre, la formation et le coaching des structures bénéficiaires — groupes d'épargne, coopératives, PME — jusqu'à ce qu'elles soient en état d'emprunter et d'être acceptées par une institution de microfinance. Nous préparons enfin la création d'une société de crédit dédiée au financement des AVEC, pour les groupes qu'aucune institution ne sert aujourd'hui.",
    fonctionnalites: [
      ["Gestion des membres & clients", "Dossiers KYC, pièces d'identité, parts sociales."],
      ["Épargne & dépôts", "Comptes à vue, épargne bloquée, calcul des intérêts."],
      ["Crédits", "Instruction, échéanciers, décaissements, garanties."],
      ["Remboursements & retards", "Suivi des impayés, PAR 30, relances automatiques."],
      ["Caisse & guichet", "Opérations en CDF et USD, arrêtés de caisse."],
      ["Rapports & indicateurs", "Tableaux de bord de performance et rapports réglementaires."],
      ["Formation & coaching", "Préparation des groupes, coopératives et PME à l'emprunt : comptes tenus, dossier, garanties, discipline de remboursement."],
      ["Mise en relation", "Présentation des dossiers aux IMF, COOPEC et banques partenaires, et appui à la négociation."]
    ],
    pour: ["Petites IMF", "COOPEC", "Mutuelles d'épargne et de crédit", "Groupes AVEC", "PME et coopératives en recherche de crédit", "Programmes de crédit d'ONG"],
    deploiement: [
      ["Diagnostic", "Revue des procédures, des produits et de l'état du portefeuille."],
      ["Paramétrage", "Produits d'épargne et de crédit, taux, frais, agences et rôles des agents."],
      ["Reprise des données", "Import des membres, comptes et crédits en cours depuis vos fichiers actuels."],
      ["Formation et accompagnement", "Guichet et agents de crédit formés, puis présence sur le premier mois d'exploitation."]
    ],
    usages: [
      ["Caissier", "Enregistre dépôts, retraits et remboursements, en CDF comme en USD, et clôture sa caisse."],
      ["Agent de crédit", "Instruit les dossiers, génère les échéanciers et suit ses relances."],
      ["Comité de crédit", "Examine les demandes avec un historique complet du client ou du groupe."],
      ["Direction", "Suit l'encours, le PAR 30 et la rentabilité par agence."],
      ["Contrôle et supervision", "Produit les rapports réglementaires sans ressaisie."]
    ]
  },
  {
    id: "ubora-pme", raccourci: "pme.uborardc.com", nom: "Ubora PME", initiales: "Pm", couleur: "#B0642E", statut: "dispo", mock: "pme",
    tagline: "Programmes d'accompagnement : idéation, incubation, accélération",
    resume: "Le parcours qui mène une idée jusqu'à une entreprise viable : idéation, incubation puis accélération, en appliquant la démarche lean startup adaptée aux réalités congolaises.",
    description: "Ubora PME est notre offre de programmes d'accompagnement entrepreneurial. Nous y appliquons la démarche lean startup — construire, mesurer, apprendre — mais réécrite pour le terrain congolais : on teste avec de petits budgets, auprès de clients réels, souvent informels, sans attendre des données de marché qui n'existent pas. Chaque cohorte combine formation collective, coaching individuel, outils numériques et mise en relation avec les financeurs.",
    fonctionnalites: [
      ["Idéation", "Identifier un problème réel, formuler une proposition de valeur et confronter l'idée au terrain."],
      ["Validation du marché", "Tester auprès de vrais clients avec un produit minimum viable, avant d'investir."],
      ["Incubation", "Modèle économique, formalisation, premières ventes, organisation et outils de gestion."],
      ["Accélération", "Structurer la croissance : équipe, canaux de vente, financement, nouveaux marchés."],
      ["Coaching individuel", "Un accompagnateur dédié, des points réguliers et des objectifs mesurés."],
      ["Accès au financement", "Plan d'affaires, dossier de crédit et mise en relation avec IMF, banques et bailleurs."]
    ],
    pour: ["Porteurs de projet", "Jeunes entreprises", "PME en croissance", "Incubateurs & programmes partenaires"],
    outils: [
      ["Générateur de business plan", "L'outil en ligne qui construit le dossier de financement, étape par étape, avec les prévisions financières. Adresse : bp.uborardc.com"],
      ["Canevas de validation", "Proposition de valeur, hypothèses à tester, protocole d'expérimentation et critères de décision."],
      ["Outils de gestion", "Caisse, stock, facturation et tableau de bord, en francs congolais et en dollars."],
      ["Suivi dans Ubora Hub", "Le parcours de chaque entrepreneur, ses séances de coaching et ses indicateurs."]
    ],
    deploiement: [
      ["Appel à candidatures", "Sélection de la cohorte sur la base du problème traité, de l'équipe et de la motivation."],
      ["Diagnostic de départ", "Situer chaque participant : maturité de l'idée, formalisation, finances, compétences."],
      ["Programme", "Sessions collectives, coaching individuel, expérimentations terrain entre les séances."],
      ["Démonstration et financement", "Présentation des résultats, préparation des dossiers, rencontre des financeurs."],
      ["Suivi post-programme", "Points réguliers pendant plusieurs mois, jusqu'à la stabilisation de l'activité."]
    ],
    usages: [
      ["Porteur de projet", "Passe de l'idée à une offre testée, avec des premiers clients."],
      ["Jeune entreprise", "Structure sa gestion, formalise son activité et prépare son financement."],
      ["PME en croissance", "Ouvre de nouveaux marchés et organise son passage à l'échelle."],
      ["Incubateur partenaire", "Confie à Ubora l'animation d'une cohorte, ou s'appuie sur notre méthode et nos outils."],
      ["Bailleur", "Reçoit des indicateurs de résultats consolidés, entreprise par entreprise."]
    ]
  },
  {
    id: "ubora-market", raccourci: "market.uborardc.com", nom: "Ubora Market", initiales: "Mk", couleur: "#1F7A6B", statut: "pilote", mock: "market",
    tagline: "Connecter les producteurs et les entrepreneurs aux marchés",
    resume: "La vente est le maillon qui manque le plus souvent. Ubora Market met en relation coopératives, transformateurs, artisans et PME avec des acheteurs réels, et organise la vente groupée.",
    description: "Produire mieux ne sert à rien si l'on vend mal. Ubora Market s'attaque au débouché : recensement de l'offre disponible chez nos bénéficiaires, mise en relation avec des acheteurs identifiés, organisation de la vente groupée et suivi des livraisons et des paiements. L'outil s'accompagne d'un travail de terrain sur la qualité, le conditionnement et la fiabilité des volumes, sans lesquels aucun acheteur sérieux ne s'engage.",
    fonctionnalites: [
      ["Catalogue de l'offre", "Produits, volumes disponibles, périodes de récolte ou de production, zones."],
      ["Acheteurs référencés", "Agro-industries, grossistes, restaurants, institutions, exportateurs."],
      ["Vente groupée", "Agréger l'offre de plusieurs producteurs pour atteindre le volume demandé."],
      ["Contrats et livraisons", "Modèles de contrat, planification des livraisons, suivi des engagements."],
      ["Qualité et conditionnement", "Normes attendues par l'acheteur, appui à la mise à niveau."],
      ["Paiements", "Suivi des règlements jusqu'au producteur, par mobile money."]
    ],
    pour: ["Coopératives agricoles", "Transformateurs & artisans", "PME et commerces", "Acheteurs et agro-industries"],
    deploiement: [
      ["Recenser l'offre", "Ce que produisent réellement nos bénéficiaires, en quelles quantités et à quelles périodes."],
      ["Identifier la demande", "Rencontrer les acheteurs, comprendre leurs volumes, leurs prix et leurs exigences."],
      ["Mettre à niveau", "Qualité, conditionnement, régularité : ce qui fait la différence entre un test et un contrat."],
      ["Connecter et contractualiser", "Mise en relation, négociation, contrat de vente groupée."],
      ["Suivre", "Livraisons, paiements, qualité — et préparation de la campagne suivante."]
    ],
    usages: [
      ["Coopérative", "Annonce ses volumes et trouve un acheteur avant la récolte."],
      ["Transformateur ou artisan", "Accède à des clients réguliers au-delà de son quartier."],
      ["Acheteur", "Trouve des volumes traçables et un interlocuteur unique."],
      ["Ubora", "Vérifie la fiabilité des deux parties et sécurise la transaction."]
    ]
  }
];

/* ---------- Formations (calendrier) ----------
   outil : id d'une solution ci-dessus, ou "general"
   mode  : "Présentiel" | "En ligne" | "Hybride"
   exemple:true = session d'exemple, à remplacer */
const FORMATIONS = [
  { id:"akiba-tresoriers-oct", titre:"Ubora AVEC : prise en main pour trésoriers et secrétaires", outil:"ubora-avec", date:"2026-10-08", duree:"1 jour", mode:"Présentiel", lieu:"Lubumbashi", public:"Trésoriers et secrétaires de groupes d'épargne", places:20, exemple:true,
    programme:["Créer le groupe et ses membres","Saisir cotisations, prêts et remboursements","Travailler hors ligne et synchroniser","Préparer le partage de fin de cycle"] },
  { id:"uborahub-equipes-oct", titre:"Ubora Hub pour les équipes d'accompagnement", outil:"ubora-hub", date:"2026-10-15", duree:"2 demi-journées", mode:"En ligne", lieu:"Visioconférence", public:"Chargés de programme, coachs, incubateurs", places:30, exemple:true,
    programme:["Paramétrer un appel à candidatures","Suivre une cohorte et ses séances de coaching","Définir et suivre les indicateurs d'impact","Générer les rapports bailleurs"] },
  { id:"formateurs-relais-nov", titre:"Devenir formateur relais Ubora AVEC", outil:"ubora-avec", date:"2026-11-05", duree:"3 jours", mode:"Hybride", lieu:"Lubumbashi + en ligne", public:"Animateurs d'ONG, agents de terrain", places:15, exemple:true,
    programme:["Pédagogie pour adultes","Maîtrise avancée d'Ubora AVEC","Animer une session de formation","Assurer le suivi des groupes"] },
  { id:"coop-gestion-nov", titre:"Ubora Coop : gérer membres, collectes et ventes", outil:"ubora-coop", date:"2026-11-19", duree:"2 jours", mode:"Présentiel", lieu:"Sur site, dans votre province", public:"Gérants et comités de coopératives", places:25, exemple:true,
    programme:["Enregistrer membres et parcelles","Suivre collectes et stocks","Organiser une vente groupée","Calculer les paiements producteurs"] },
  { id:"ubora-fin-agents-nov", titre:"Ubora Fin : guichet, crédits et suivi du portefeuille", outil:"ubora-fin", date:"2026-11-26", duree:"2 jours", mode:"Présentiel", lieu:"Lubumbashi ou dans vos locaux", public:"Agents de crédit, caissiers et gérants d'IMF / COOPEC", places:20, exemple:true,
    programme:["Enregistrer membres, comptes et dépôts","Instruire et décaisser un crédit","Suivre les retards et le PAR","Produire les rapports de fin de mois"] },
  { id:"plan-affaires-dec", titre:"Rédiger son plan d'affaires avec Ubora PME", outil:"ubora-pme", date:"2026-12-10", duree:"2 jours", mode:"Hybride", lieu:"Lubumbashi + en ligne", public:"Porteurs de projet et PME en recherche de financement", places:30, exemple:true,
    programme:["Présenter son projet et son marché","Construire ses prévisions financières","Calculer son seuil de rentabilité","Préparer son dossier de financement"] },
  { id:"gestion-pme-dec", titre:"Tenir sa gestion au quotidien avec Ubora PME (caisse, stock, marge)", outil:"ubora-pme", date:"2026-12-03", duree:"1 jour", mode:"Présentiel", lieu:"Lubumbashi", public:"Entrepreneurs et commerçants", places:30, exemple:true,
    programme:["Séparer finances perso et entreprise","Tenir sa caisse en CDF et USD","Calculer sa vraie marge","Piloter avec un tableau de bord simple"] }
];

/* ---------- Offres d'emploi ----------
   type : "CDI" | "CDD" | "Stage" | "Consultance" | "Bénévolat"
   cloture : date limite (AAAA-MM-JJ). Passée cette date, l'offre s'affiche « Clôturée ».
   exemple:true = offre d'exemple, à remplacer ou supprimer */
const OFFRES = [
  { id:"charge-accompagnement-pme", titre:"Chargé·e d'accompagnement PME", type:"CDD", lieu:"Lubumbashi", departement:"Accompagnement", publie:"2026-09-15", cloture:"2026-10-15", exemple:true,
    resume:"Accompagner une cohorte de PME dans leur structuration et leur digitalisation, du diagnostic au suivi.",
    missions:["Réaliser les diagnostics des entreprises accompagnées","Animer des formations et du coaching individuel","Suivre les indicateurs dans Ubora Hub","Préparer les rapports d'activité"],
    profil:["Bac+3 minimum en gestion, économie ou équivalent","2 ans d'expérience en appui aux PME ou entrepreneuriat","Aisance avec les outils numériques","Français courant, swahili apprécié"] },
  { id:"formateur-terrain-akiba", titre:"Formateur·rice terrain Ubora AVEC", type:"CDD", lieu:"Haut-Katanga (déplacements fréquents)", departement:"Inclusion financière", publie:"2026-09-10", cloture:"2026-10-10", exemple:true,
    resume:"Former et suivre sur le terrain les groupes d'épargne qui utilisent Ubora AVEC.",
    missions:["Former les trésoriers et secrétaires de groupes","Assurer le suivi et les visites de contrôle","Remonter les besoins d'amélioration de l'outil","Accompagner la connexion avec la microfinance"],
    profil:["Expérience avec les groupes AVEC / VSLA","Pédagogie et patience","Maîtrise du swahili indispensable","Permis moto apprécié"] },
  { id:"stage-developpeur", titre:"Stage : développeur·se web & mobile", type:"Stage", lieu:"Lubumbashi / hybride", departement:"Solutions numériques", publie:"2026-09-01", cloture:"2026-10-31", exemple:true,
    resume:"Contribuer au développement de nos solutions numériques (Ubora AVEC, Ubora Hub).",
    missions:["Développer de nouvelles fonctionnalités","Corriger les anomalies remontées du terrain","Participer aux tests avec les utilisateurs"],
    profil:["Étudiant·e ou jeune diplômé·e en informatique","JavaScript / HTML / CSS","Curiosité et envie d'impact social"] }
];

/* ---------- Actualités (la plus récente s'affiche en premier) ---------- */
const ACTUALITES = [
  {
    slug: "lancement-akiba-kipushi", date: "2026-09-10", categorie: "Solutions", exemple: true,
    titre: "Ubora AVEC déployée auprès de 40 groupes d'épargne à Kipushi",
    extrait: "Après six mois de pilote, la plateforme d'épargne communautaire passe à l'échelle dans le territoire de Kipushi.",
    contenu: [
      "Après une phase pilote de six mois, Ubora AVEC est désormais utilisée par quarante groupes d'épargne et de crédit dans le territoire de Kipushi. Les trésoriers, formés en deux sessions, saisissent les cotisations directement sur téléphone, même sans connexion.",
      "### Ce qui change pour les membres",
      "Chaque membre reçoit un récapitulatif de son épargne après chaque réunion. Les partages de fin de cycle se font en quelques minutes, contre plusieurs heures de calcul auparavant.",
      "La prochaine étape consiste à connecter les groupes les plus réguliers aux institutions de microfinance partenaires, sur la base de leur historique."
    ]
  },
  {
    slug: "cohorte-2026-uborahub", date: "2026-08-22", categorie: "Programme", exemple: true,
    titre: "Appel à candidatures : cohorte d'accompagnement PME 2026",
    extrait: "Vingt-cinq PME seront accompagnées pendant six mois : structuration, digitalisation et préparation au financement.",
    contenu: [
      "Ubora ouvre les candidatures pour sa nouvelle cohorte. Le programme s'adresse aux PME en activité depuis au moins un an, dans le commerce, l'agro-transformation, les services et l'artisanat.",
      "### Au programme",
      "- Diagnostic complet de l'entreprise",
      "- Formalisation (RCCM, fiscalité, statuts)",
      "- Mise en place d'outils de gestion numériques",
      "- Coaching individuel mensuel",
      "- Préparation d'un dossier de financement",
      "Les candidatures se font en ligne sur www.uborahub.com. Les entrepreneuses sont vivement encouragées à postuler."
    ]
  },
  {
    slug: "cooperatives-mais-registre", date: "2026-07-30", categorie: "Coopératives", exemple: true,
    titre: "Coopératives de maïs : un registre numérique pour mieux vendre",
    extrait: "Ubora accompagne cinq coopératives dans l'enregistrement de leurs membres et parcelles, un préalable aux contrats avec les acheteurs.",
    contenu: [
      "Connaître précisément ses membres, leurs surfaces et leurs volumes attendus : c'est la première question que posent les acheteurs aux coopératives. Avec Ubora Coop, cinq coopératives de maïs ont enregistré leurs producteurs et leurs parcelles.",
      "Cette base permet de planifier la collecte, de négocier des ventes groupées et de distribuer les intrants au bon moment."
    ]
  },
  {
    slug: "atelier-digitalisation-pme", date: "2026-06-18", categorie: "Événement", exemple: true,
    titre: "Atelier « Digitaliser sa PME » à Lubumbashi",
    extrait: "Une matinée pratique pour découvrir les outils numériques de gestion adaptés aux petites entreprises congolaises.",
    contenu: [
      "Une soixantaine d'entrepreneurs ont participé à l'atelier organisé par Ubora. Au menu : tenue de caisse numérique, paiements mobile money, présence en ligne et facturation.",
      "Les participants sont repartis avec un plan d'action personnalisé et un accès à Ubora PME pour rédiger leur plan d'affaires."
    ]
  },
  {
    slug: "partenariat-microfinance", date: "2026-05-05", categorie: "Partenariat", exemple: true,
    titre: "Vers un pont entre groupes d'épargne et microfinance",
    extrait: "Ubora engage des discussions avec des institutions de microfinance pour valoriser l'historique financier des groupes Ubora AVEC.",
    contenu: [
      "L'historique d'épargne et de remboursement enregistré dans Ubora AVEC peut servir de garantie morale auprès des institutions financières. Ubora travaille à un cadre de partenariat pour faciliter l'accès au crédit des groupes les plus réguliers."
    ]
  }
];

/* ---------- Boîte à outils AVEC (16 documents, remis sur demande) ---------- */
const OUTILS_AVEC = [
  ["Guide général de la boîte à outils", "Comment utiliser l'ensemble des documents, dans quel ordre et avec qui."],
  ["Étude de référence", "Le canevas d'enquête préalable : besoins, pratiques d'épargne existantes, cartographie des acteurs."],
  ["Identification et sensibilisation", "Comment repérer les communautés, présenter la démarche et susciter l'adhésion."],
  ["Formation des animateurs", "Le programme complet de formation des agents et relais communautaires."],
  ["Modules de formation des AVEC", "Les séances à animer avec le groupe, de la constitution au premier partage."],
  ["Kit carnets, registres et règlement", "Carnet du membre, registre du groupe, règlement intérieur type et statuts."],
  ["Diagnostic des AVEC existantes", "La grille pour évaluer un groupe déjà constitué et repérer ses faiblesses."],
  ["Suivi, supervision et graduation", "Fiches de visite, indicateurs de maturité et critères de graduation."],
  ["Modules AGR", "Activités génératrices de revenus : choisir, chiffrer et lancer une activité."],
  ["Modules complémentaires", "Alphabétisation financière, gestion des conflits, leadership féminin."],
  ["Fédération des AVEC (FAVEC)", "Comment regrouper plusieurs AVEC en fédération et l'organiser."],
  ["Évaluation finale", "Le protocole d'évaluation de fin de cycle ou de fin de projet."],
  ["Plan d'affaires simplifié", "Un format court, adapté aux membres qui lancent une activité."],
  ["Livret du membre", "Le document remis à chaque membre : droits, devoirs, suivi de son épargne."],
  ["La méthode Ubora", "Notre démarche d'accompagnement, formalisée et transmissible."],
  ["Templates vierges", "Tous les formulaires et tableaux, prêts à imprimer ou à adapter."]
];

/* ---------- Pages thématiques des sous-domaines ----------
   Chaque entrée produit une page complète : constat, méthodologie, outils,
   boîte à outils. Les clés correspondent aux adresses /pme, /financement,
   /cooperatives — respectivement pme., fin. et coop. uborardc.com */
const DOMAINES = {
  pme: {
    sousDomaine: "pme.uborardc.com",
    eyebrow: "Ubora PME",
    titre: 'De l'+"'"+'idée à l'+"'"+'entreprise, par la <span class="serif">preuve</span>.',
    lead: "Nos programmes d'accompagnement entrepreneurial : idéation, incubation et accélération, avec la démarche lean startup adaptée aux réalités congolaises.",
    intro: "La plupart des accompagnements commencent par un plan d'affaires de trente pages écrit avant d'avoir parlé à un seul client. Nous faisons l'inverse : formuler une hypothèse, la tester à petit budget auprès de vrais clients, décider sur des faits. Le plan d'affaires vient après, quand il y a quelque chose à financer.",
    constats: [
      ["Des idées jamais confrontées au marché", "On construit pendant des mois un produit que personne n'a demandé, puis on cherche des clients."],
      ["Pas de données de marché", "Les études sectorielles fiables sont rares en RDC : il faut aller chercher l'information soi-même, sur le terrain."],
      ["Des budgets de test minuscules", "Impossible de dépenser des milliers de dollars en expérimentation : chaque test doit coûter presque rien."],
      ["Un accompagnement qui s'arrête trop tôt", "Beaucoup de programmes finissent au pitch, juste avant les difficultés réelles : vendre, produire, recruter."]
    ],
    parcours: [
      ["Idéation", "Partir d'un problème observé, pas d'une solution. Formuler la proposition de valeur et lister les hypothèses risquées.", "Une idée formulée clairement et des hypothèses à tester."],
      ["Validation terrain", "Construire un produit minimum viable, le présenter à de vrais clients, mesurer ce qu'ils font — pas ce qu'ils disent.", "La preuve qu'il existe une demande, ou la décision de changer de direction."],
      ["Incubation", "Modèle économique, prix, formalisation, premières ventes, outils de gestion et tenue de caisse.", "Une entreprise qui vend et sait ce qu'elle gagne."],
      ["Accélération", "Canaux de distribution, équipe, capacité de production, nouveaux marchés.", "Une croissance organisée, pas subie."],
      ["Financement", "Plan d'affaires construit avec le générateur en ligne, dossier de crédit, rencontre des financeurs.", "Un dossier recevable et des rendez-vous obtenus."],
      ["Suivi", "Coaching mensuel après le programme, indicateurs suivis, appui à distance.", "Une entreprise qui tient une fois seule."]
    ],
    solutions: ["ubora-pme"],
    apps: [["Générateur de business plan", "Votre dossier de financement construit pas à pas, utilisable hors connexion.", "https://bp.uborardc.com", "bp.uborardc.com"]],
    boite: { statut: "bientot", titre: "Une boîte à outils pour entreprendre", intro: "Les canevas que nous utilisons en cohorte seront mis à disposition des entrepreneurs.",
      outils: [
        ["Canevas de proposition de valeur", "Le problème, le client, la solution, en une page."],
        ["Grille d'hypothèses et de tests", "Ce qu'il faut vérifier en premier, et comment le vérifier à moindre coût."],
        ["Guide de l'entretien client", "Les questions à poser — et celles à ne jamais poser."],
        ["Modèle de tenue de caisse", "Tableur simple, en CDF et USD, avec arrêté journalier."],
        ["Grille de prix de revient", "Pour fixer un prix qui couvre réellement vos coûts."],
        ["Guide de la formalisation", "RCCM, identification nationale, fiscalité : démarches, pièces et coûts."]
      ] },
    services: ["entrepreneuriat", "pme"]
  },

  marche: {
    sousDomaine: "market.uborardc.com",
    eyebrow: "Ubora Market",
    titre: 'Trouver des <span class="serif">acheteurs</span>, pas seulement produire.',
    lead: "Connecter les coopératives, les transformateurs et les PME que nous accompagnons à des acheteurs réels : recensement de l'offre, mise à niveau, vente groupée et suivi des paiements.",
    intro: "Le maillon qui casse le plus souvent n'est ni la production ni le financement : c'est la vente. Un producteur qui n'écoule pas sa récolte au bon prix perd sa campagne, rembourse mal son crédit et se décourage. Ubora Market s'occupe de ce maillon.",
    constats: [
      ["Vendre au plus offrant du jour", "Sans acheteur identifié à l'avance, le producteur brade sa récolte au premier intermédiaire venu."],
      ["Des volumes trop petits", "Pris isolément, aucun producteur n'atteint le volume qu'exige un acheteur institutionnel."],
      ["Une qualité irrégulière", "Conditionnement, humidité, calibrage : les exigences des acheteurs sont rarement connues des producteurs."],
      ["La confiance manquante", "Acheteurs et producteurs se méfient mutuellement, faute d'un tiers qui sécurise la transaction."]
    ],
    parcours: [
      ["Recenser l'offre", "Produits, volumes, périodes et zones de nos bénéficiaires, consignés dans un catalogue.", "Une offre annonçable et vérifiable."],
      ["Identifier la demande", "Rencontrer agro-industries, grossistes, institutions et exportateurs pour connaître leurs besoins.", "Des débouchés nommés, avec leurs exigences."],
      ["Mettre à niveau", "Qualité, conditionnement, régularité des livraisons, documents exigés.", "Une offre conforme à ce que l'acheteur attend."],
      ["Agréger et connecter", "Regrouper l'offre de plusieurs producteurs et organiser la rencontre commerciale.", "Un volume suffisant et une négociation équilibrée."],
      ["Contractualiser", "Contrat de vente groupée, prix, calendrier de livraison, conditions de paiement.", "Un engagement écrit des deux côtés."],
      ["Suivre jusqu'au paiement", "Livraisons, contrôle qualité, règlements jusqu'au producteur.", "Des producteurs payés, et une relation qui se répète."]
    ],
    solutions: ["ubora-market", "ubora-coop"],
    apps: [],
    boite: { statut: "bientot", titre: "Outils d'accès au marché", intro: "Les documents commerciaux que nous utilisons seront mis à disposition.",
      outils: [
        ["Modèle de contrat de vente groupée", "Les clauses à ne pas oublier face à un acheteur."],
        ["Fiche technique produit", "Décrire son produit comme un acheteur le demande."],
        ["Grille de qualité et de conditionnement", "Les critères contrôlés à la réception."],
        ["Calendrier de campagne", "Planifier récolte, collecte et livraison."]
      ] },
    services: ["chaines-valeur", "cooperatives"]
  },

  financement: {
    sousDomaine: "fin.uborardc.com",
    eyebrow: "Accès au financement",
    titre: 'Rendre le crédit <span class="serif">accessible</span>, des deux côtés du guichet.',
    lead: "Nous préparons les groupes, les coopératives et les PME à emprunter, et nous outillons les institutions qui prêtent. C'est en travaillant les deux côtés que le crédit circule vraiment.",
    intro: "En RDC, le crédit existe mais ne rencontre pas la demande : les emprunteurs n'ont rien à présenter, et les institutions manquent de systèmes pour instruire de petits dossiers à un coût raisonnable. Nous intervenons sur les deux versants.",
    constats: [
      ["Pas d'historique, pas de crédit", "Un groupe qui épargne depuis trois ans reste invisible pour une banque s'il ne peut rien prouver."],
      ["Des dossiers non recevables", "Sans états financiers ni prévisions, la demande est refusée avant même l'analyse."],
      ["Un coût d'instruction trop élevé", "Analyser un crédit de 500 dollars coûte presque aussi cher que d'en analyser un de 50 000 : les IMF s'en détournent."],
      ["Le suivi des impayés", "Sans système, les retards se découvrent trop tard et le portefeuille se dégrade."]
    ],
    parcours: [
      ["Former et coacher", "Éducation financière, gestion du crédit, tenue des comptes : les structures bénéficiaires apprennent d'abord à gérer avant d'emprunter.", "Des emprunteurs préparés, pas seulement demandeurs."],
      ["Préparer le dossier", "Discipline d'épargne, comptes tenus, plan d'affaires chiffré, garanties réalistes.", "Un dossier qu'une institution peut réellement instruire."],
      ["Construire l'historique", "Les cotisations, prêts et remboursements enregistrés dans nos outils deviennent des preuves.", "Un score de discipline lisible par un financier."],
      ["Outiller l'institution", "Ubora Fin : gestion des membres, de l'épargne, des crédits, du guichet et des rapports.", "Instruire et suivre de petits crédits sans y perdre d'argent."],
      ["Mettre en relation", "Nous présentons les dossiers aux IMF, COOPEC et banques partenaires, et accompagnons la négociation.", "Un premier crédit obtenu, à des conditions tenables."],
      ["Suivre le remboursement", "Échéanciers, relances, appui en cas de difficulté, des deux côtés.", "Un historique positif qui ouvre le crédit suivant."]
    ],
    projet: {
      titre: "Une société de crédit dédiée aux AVEC",
      texte: "Malgré tout ce travail de préparation, une partie des groupes reste hors du champ des institutions existantes : montants trop petits, zones trop éloignées, absence de garanties classiques. Nous préparons donc la création d'une société de crédit conçue pour eux, qui prêterait aux AVEC sur la base de leur historique d'épargne et de leur discipline collective.",
      etat: "Projet en préparation : étude de faisabilité, cadre réglementaire et recherche de partenaires financiers en cours.",
      appel: "Institutions, bailleurs ou investisseurs intéressés par ce projet : écrivez-nous."
    },
    solutions: ["ubora-fin", "ubora-avec"],
    apps: [],
    boite: { statut: "bientot", titre: "Outils d'accès au financement", intro: "Les documents que nous utilisons pour préparer un dossier de crédit seront mis à disposition.",
      outils: [
        ["Dossier de crédit type", "La trame attendue par les IMF et banques congolaises."],
        ["Grille d'analyse de la capacité de remboursement", "Calculer ce qu'un emprunteur peut réellement rembourser."],
        ["Modèle de prévisions de trésorerie", "Sur douze mois, en CDF et USD."],
        ["Fiche de score de discipline d'un groupe", "Les indicateurs qui rassurent un financier."]
      ] },
    services: ["inclusion", "avec"]
  },

  cooperatives: {
    sousDomaine: "coop.uborardc.com",
    eyebrow: "Coopératives",
    titre: 'Des coopératives <span class="serif">solides</span>, des producteurs mieux payés.',
    lead: "Gouvernance conforme, gestion rigoureuse, accès aux marchés et au financement : notre accompagnement des coopératives agricoles, de la parcelle jusqu'à la vente groupée.",
    intro: "Une coopérative bien organisée négocie mieux, accède aux intrants et au crédit, et paie ses producteurs à temps. La plupart échouent non par manque de volonté, mais parce que les règles, les comptes et les volumes ne sont écrits nulle part.",
    constats: [
      ["Des groupements sans existence légale", "Des producteurs travaillent déjà ensemble, mais sans statuts ni immatriculation : ni compte bancaire, ni contrat, ni crédit possible."],
      ["Une gouvernance floue", "Statuts non conformes à l'Acte uniforme OHADA, assemblées irrégulières, décisions contestées."],
      ["Des membres mal connus", "Sans registre des membres et des parcelles, impossible d'annoncer un volume crédible à un acheteur."],
      ["Des pertes après récolte", "Faute de stockage et de suivi, une partie de la production est perdue ou bradée."],
      ["Des paiements tardifs", "Quand les producteurs ne sont pas payés à temps, ils vendent ailleurs au cycle suivant."]
    ],
    parcours: [
      ["Constituer", "Mobilisation des membres, assemblée constitutive, souscription des parts sociales, élection des organes.", "Une coopérative qui existe, avec des membres engagés."],
      ["Formaliser", "Statuts conformes à l'Acte uniforme OHADA, immatriculation au registre des sociétés coopératives, identification nationale, ouverture du compte.", "Une personnalité juridique : contrats, compte bancaire et crédit deviennent possibles."],
      ["Structurer", "Règlement intérieur, rôles séparés entre assemblée, conseil et gérance, procédures de caisse et de stock.", "Des règles écrites qui évitent les conflits."],
      ["Recenser", "Membres, parcelles, cultures, parts sociales : le registre de base.", "Des volumes annonçables et vérifiables."],
      ["Produire et collecter", "Planification des campagnes, intrants à crédit, pesées, qualité, gestion des stocks.", "Moins de pertes, une production maîtrisée."],
      ["Gérer au quotidien", "Caisse et banque, comptabilité simplifiée, inventaires, suivi des parts sociales et des ristournes, tableau de bord mensuel du gérant.", "Des comptes à jour, vérifiables par les membres à tout moment."],
      ["Vendre groupé", "Recherche d'acheteurs, contrats, négociation des prix, planification des livraisons.", "Un meilleur prix que la vente individuelle."],
      ["Payer et financer", "Décomptes individuels, paiements mobile money, accès au crédit de campagne.", "Des producteurs payés à temps, qui restent fidèles."],
      ["Suivre", "Appui à la vie associative, aux assemblées et au reporting.", "Une coopérative autonome au bout d'une campagne."]
    ],
    solutions: ["ubora-coop"],
    apps: [],
    boite: { statut: "bientot", titre: "La boîte à outils de gestion coopérative", intro: "Tous les documents que nous installons dans une coopérative accompagnée : de la constitution aux comptes de fin de campagne. Ils seront mis à disposition des coopératives et des programmes agricoles.",
      outils: [
        ["Statuts type conformes OHADA", "Pour une société coopérative simplifiée ou avec conseil d'administration."],
        ["Règlement intérieur", "Droits et devoirs des membres, fonctionnement des organes, sanctions."],
        ["Dossier de constitution", "Convocation, procès-verbal d'assemblée constitutive, liste de souscription des parts."],
        ["Registre des membres et des parcelles", "Le format de base à tenir dès la première campagne."],
        ["Registre des parts sociales", "Souscriptions, libérations, cessions et remboursements."],
        ["Livre de caisse et de banque", "Tenue quotidienne, en francs congolais et en dollars, avec arrêté mensuel."],
        ["Fiche de collecte et de pesée", "Traçabilité du producteur jusqu'à l'entrepôt."],
        ["Fiche de stock et d'inventaire", "Entrées, sorties, pertes, valorisation du stock."],
        ["Suivi des intrants à crédit", "Distribution, récupération sur les ventes, soldes par producteur."],
        ["Modèle de contrat de vente groupée", "Les clauses à ne pas oublier face à un acheteur."],
        ["Décompte et bordereau de paiement producteur", "Le détail remis à chaque membre après la vente."],
        ["Canevas de procès-verbal d'assemblée", "Pour des décisions opposables et archivées."],
        ["Budget et plan de campagne", "Prévoir les besoins, les recettes et la trésorerie de la saison."],
        ["Tableau de bord du gérant", "Les indicateurs à suivre chaque mois : collecte, stock, ventes, trésorerie, impayés."],
        ["Rapport annuel type", "Le compte rendu à présenter à l'assemblée générale."]
      ] },
    services: ["cooperatives", "chaines-valeur"]
  }
};
