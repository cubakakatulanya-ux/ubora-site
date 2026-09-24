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
  email: "contact@ubora.cd",          // À REMPLACER par votre vraie adresse
  telephone: "+243 998 275 144",
  whatsapp: "243998275144",           // format international sans "+"
  adresse: "Lubumbashi, Haut-Katanga, RDC",
  zone: "Partout en RDC, sur le terrain et à distance",
  horaires: "Lun – Ven · 8h00 – 17h00",
  tauxUSD: 2800                       // 1 USD = x FC (indicatif, pour le simulateur)
};

/* Messages de la bande déroulante (en plus des 4 dernières actualités) */
const TICKER_MESSAGES = [
  ["Diagnostic PME gratuit : évaluez votre entreprise en 3 minutes", "#/diagnostic"],
  ["Formations AKIBA & UboraHub : consultez le calendrier des sessions", "#/formations"],
  ["UboraHub : la plateforme d'accompagnement des entrepreneurs", "#/solutions/uborahub"],
  ["Nous recrutons : découvrez nos offres d'emploi", "#/carrieres"],
  ["Basés à Lubumbashi, nous intervenons partout en RDC", "#/contact"]
];

/* ---------- Les 4 axes d'intervention (regroupent les services) ---------- */
const AXES = [
  { id: "finance", titre: "Finance inclusive", accroche: "Rendre l'épargne et le crédit accessibles à tous.",
    services: ["inclusion"], solutions: ["akiba", "ubora-fin"] },
  { id: "entreprises", titre: "Entreprises & entrepreneurs", accroche: "Des PME structurées, outillées et finançables.",
    services: ["pme", "entrepreneuriat", "outils"], solutions: ["ubora-pme"] },
  { id: "agri", titre: "Agriculture & filières", accroche: "Des coopératives fortes et des filières qui créent de la valeur.",
    services: ["cooperatives", "chaines-valeur"], solutions: ["ubora-coop"] },
  { id: "programmes", titre: "Conseil, formation & programmes", accroche: "Concevoir, piloter et outiller l'accompagnement.",
    services: ["conseil", "projets", "processus", "formation"], solutions: ["uborahub"] }
];

/* ---------- Services ---------- */
const SERVICES = [
  { id:"inclusion", ico:"finance", titre:"Inclusion financière",
    court:"Épargne communautaire, éducation financière et accès au crédit pour les ménages et micro-entrepreneurs.",
    texte:"Nous aidons les personnes exclues du système bancaire, en particulier les femmes et les jeunes, à épargner, à gérer leur argent et à accéder au crédit. Nous passons pour cela par les groupes d'épargne, le mobile money et des partenariats avec la microfinance.",
    points:["Création et suivi de groupes AVEC / VSLA","Éducation financière pratique","Digitalisation avec AKIBA","Connexion aux institutions de microfinance","Épargne et paiements mobile money","Suivi de la discipline de remboursement"],
    pour:["Femmes entrepreneures","Jeunes","Ménages ruraux","Micro-commerçants"] },
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
    texte:"Beaucoup d'organisations d'appui gèrent encore leurs cohortes sur des fichiers dispersés. Avec UboraHub et notre accompagnement méthodologique, elles gagnent du temps, fiabilisent leurs données et rendent compte de leur impact plus facilement.",
    points:["Cartographie des processus existants","Paramétrage d'UboraHub","Grilles de diagnostic et d'évaluation","Indicateurs d'impact et tableaux de bord","Formation des équipes","Rapports automatisés pour les bailleurs"],
    pour:["Incubateurs","ONG","Programmes publics","Bailleurs de fonds"] },
  { id:"formation", ico:"school", titre:"Formation, accompagnement & suivi sur nos outils",
    court:"Des sessions pratiques pour maîtriser AKIBA, UboraHub et nos outils, puis un suivi jusqu'à l'autonomie.",
    texte:"Un outil n'a de valeur que s'il est bien utilisé. Chaque déploiement s'accompagne donc de formations pratiques, sur place ou à distance, adaptées au niveau des utilisateurs : trésoriers de groupes d'épargne, gestionnaires de coopératives, équipes d'incubateurs, entrepreneurs. Nous assurons ensuite un suivi régulier et un support réactif jusqu'à l'autonomie complète.",
    points:["Formations de prise en main (présentiel ou en ligne)","Formation de formateurs relais","Guides pratiques et tutoriels vidéo","Accompagnement au démarrage sur le terrain","Suivi périodique et visites de contrôle","Support WhatsApp et assistance à distance"],
    pour:["Groupes d'épargne","Coopératives","Incubateurs & ONG","Entrepreneurs"] }
];

/* ---------- Solutions numériques ----------
   statut : "dispo" | "pilote" | "bientot"
   mock   : "akiba" | "hub" | "coop" | "kit"  (maquette d'écran affichée) */
const SOLUTIONS = [
  {
    id: "akiba", nom: "AKIBA", initiales: "Ak", couleur: "#2F8F38", statut: "dispo", mock: "akiba",
    site: "https://cubakakatulanya-ux.github.io/akiba-avec/",
    tagline: "Épargne et crédit communautaires, digitalisés",
    resume: "La gestion des groupes d'épargne (AVEC, mutuelles, tontines) passe du cahier au téléphone : cotisations, prêts, remboursements et partage de fin de cycle, en toute transparence.",
    description: "« Akiba » signifie épargne en swahili. La plateforme donne aux groupes d'épargne et de crédit un registre numérique fiable. Chaque membre voit son solde, le trésorier n'a plus de calculs à la main, et le groupe se constitue un historique financier. Cet historique ouvre ensuite l'accès au crédit auprès des institutions de microfinance partenaires.",
    fonctionnalites: [
      ["Registre des cotisations", "Chaque dépôt est horodaté, attribué à un membre et visible par tout le groupe."],
      ["Prêts & remboursements", "Calcul automatique des intérêts, échéanciers et relances."],
      ["Partage de fin de cycle", "Répartition au prorata de l'épargne de chacun, sans erreur."],
      ["Mobile money", "Compatible avec les paiements M-Pesa, Airtel Money et Orange Money."],
      ["Mode hors ligne", "Saisie sans connexion, synchronisation dès que le réseau revient."],
      ["Historique de crédit", "Un score de discipline financière utile pour accéder à la microfinance."]
    ],
    pour: ["Groupes AVEC / VSLA", "Mutuelles de solidarité", "Coopératives", "ONG & programmes"],
    simulateur: true
  },
  {
    id: "uborahub", nom: "UboraHub", initiales: "Hb", couleur: "#0B2F6E", statut: "dispo", mock: "hub",
    site: "https://www.uborahub.com",
    tagline: "La plateforme d'accompagnement des entrepreneurs",
    resume: "Un espace numérique qui réunit tout le parcours d'accompagnement : candidatures, diagnostics, coaching, formations, suivi des indicateurs et rapports aux bailleurs.",
    description: "UboraHub digitalise les processus des incubateurs, des programmes d'entrepreneuriat et des organisations d'appui. Les entrepreneurs y suivent leur parcours et y trouvent leurs ressources. Les équipes pilotent leurs cohortes, et les partenaires reçoivent des rapports d'impact fiables sans ressaisie.",
    fonctionnalites: [
      ["Appels à candidatures", "Formulaires, présélection et grilles d'évaluation partagées."],
      ["Suivi des cohortes", "Fiche par entrepreneur : diagnostic, plan d'action, séances de coaching."],
      ["Formations & ressources", "Modules, modèles de documents, outils de gestion téléchargeables."],
      ["Indicateurs d'impact", "Chiffre d'affaires, emplois, formalisation : suivis dans le temps."],
      ["Rapports bailleurs", "Tableaux de bord et exports prêts à envoyer."],
      ["Mise en relation", "Mentors, experts, financeurs et marchés."]
    ],
    pour: ["Incubateurs & accélérateurs", "Programmes d'entrepreneuriat", "ONG & bailleurs", "Entrepreneurs"]
  },
  {
    id: "ubora-coop", nom: "Ubora Coop", initiales: "Co", couleur: "#5E9E2F", statut: "pilote", mock: "coop",
    tagline: "La gestion de coopérative agricole, de la parcelle à la vente",
    resume: "Registre des membres et parcelles, collecte des récoltes, intrants à crédit, ventes groupées et paiements aux producteurs.",
    description: "Ubora Coop outille les coopératives agricoles de toute la RDC pour professionnaliser leur gestion. La coopérative connaît ses membres et leurs volumes, la traçabilité s'améliore et les producteurs sont payés à temps. Ce sont des arguments décisifs face aux acheteurs et aux financeurs.",
    fonctionnalites: [
      ["Registre des membres", "Profil, parcelles, cultures, parts sociales."],
      ["Collecte & stocks", "Pesées, qualité, entrepôts, pertes post-récolte."],
      ["Intrants à crédit", "Distribution et récupération sur les ventes."],
      ["Ventes groupées", "Contrats acheteurs, prix, livraisons."],
      ["Paiements producteurs", "Décomptes individuels, versements mobile money."],
      ["Gouvernance", "AG, PV, conformité OHADA des sociétés coopératives."]
    ],
    pour: ["Coopératives agricoles", "Unions de coopératives", "Acheteurs & agrégateurs"]
  },
  {
    id: "ubora-fin", nom: "Ubora Fin", initiales: "Fi", couleur: "#1D5FB8", statut: "dispo", mock: "fin",
    site: "",   // À COMPLÉTER : collez ici le lien vers Ubora Fin (ex. "https://...")
    tagline: "Le logiciel de gestion des petites institutions de microfinance",
    resume: "Membres, comptes d'épargne, crédits, remboursements, caisse et rapports réglementaires : tout ce qu'il faut pour gérer une petite microfinance, une COOPEC ou une mutuelle d'épargne et de crédit.",
    description: "Ubora Fin donne aux petites institutions financières un système de gestion fiable, abordable et adapté au contexte congolais. Les agents gagnent du temps au guichet et le portefeuille de crédit est suivi en temps réel. La direction dispose aussi des indicateurs et rapports attendus par les autorités de supervision.",
    fonctionnalites: [
      ["Gestion des membres & clients", "Dossiers KYC, pièces d'identité, parts sociales."],
      ["Épargne & dépôts", "Comptes à vue, épargne bloquée, calcul des intérêts."],
      ["Crédits", "Instruction, échéanciers, décaissements, garanties."],
      ["Remboursements & retards", "Suivi des impayés, PAR 30, relances automatiques."],
      ["Caisse & guichet", "Opérations en CDF et USD, arrêtés de caisse."],
      ["Rapports & indicateurs", "Tableaux de bord de performance et rapports réglementaires."]
    ],
    pour: ["Petites IMF", "COOPEC", "Mutuelles d'épargne et de crédit", "Programmes de crédit d'ONG"]
  },
  {
    id: "ubora-pme", nom: "Ubora PME", initiales: "Pm", couleur: "#B0642E", statut: "dispo", mock: "pme",
    site: "",   // À COMPLÉTER si Ubora PME a son propre lien
    tagline: "Gestion quotidienne et plan d'affaires pour la petite entreprise",
    resume: "Caisse, stock, factures et tableau de bord en CDF et USD, plus un logiciel de plan d'affaires qui guide l'entrepreneur jusqu'au dossier de financement.",
    description: "Ubora PME réunit deux outils complémentaires. Le module de gestion permet de tenir sa caisse, de suivre son stock, d'émettre des factures et de connaître sa marge réelle. Le logiciel de plan d'affaires guide l'entrepreneur pas à pas, de la présentation du projet aux prévisions financières, pour produire un dossier présentable aux banques, aux IMF et aux bailleurs.",
    fonctionnalites: [
      ["Plan d'affaires guidé", "Questions pas à pas : projet, marché, concurrence, stratégie, équipe."],
      ["Prévisions financières", "Compte de résultat, trésorerie et seuil de rentabilité calculés automatiquement."],
      ["Dossier de financement", "Export d'un plan d'affaires complet, prêt à présenter."],
      ["Caisse & dépenses", "Entrées et sorties quotidiennes, en CDF et USD."],
      ["Stock & factures", "Alertes de rupture, devis et factures envoyés par WhatsApp."],
      ["Tableau de bord", "Marge, trésorerie, meilleurs produits."]
    ],
    pour: ["Porteurs de projet", "PME & commerces", "Artisans", "Programmes d'entrepreneuriat"]
  }
];

/* ---------- Formations (calendrier) ----------
   outil : id d'une solution ci-dessus, ou "general"
   mode  : "Présentiel" | "En ligne" | "Hybride"
   exemple:true = session d'exemple, à remplacer */
const FORMATIONS = [
  { id:"akiba-tresoriers-oct", titre:"AKIBA : prise en main pour trésoriers et secrétaires", outil:"akiba", date:"2026-10-08", duree:"1 jour", mode:"Présentiel", lieu:"Lubumbashi", public:"Trésoriers et secrétaires de groupes d'épargne", places:20, exemple:true,
    programme:["Créer le groupe et ses membres","Saisir cotisations, prêts et remboursements","Travailler hors ligne et synchroniser","Préparer le partage de fin de cycle"] },
  { id:"uborahub-equipes-oct", titre:"UboraHub pour les équipes d'accompagnement", outil:"uborahub", date:"2026-10-15", duree:"2 demi-journées", mode:"En ligne", lieu:"Visioconférence", public:"Chargés de programme, coachs, incubateurs", places:30, exemple:true,
    programme:["Paramétrer un appel à candidatures","Suivre une cohorte et ses séances de coaching","Définir et suivre les indicateurs d'impact","Générer les rapports bailleurs"] },
  { id:"formateurs-relais-nov", titre:"Devenir formateur relais AKIBA", outil:"akiba", date:"2026-11-05", duree:"3 jours", mode:"Hybride", lieu:"Lubumbashi + en ligne", public:"Animateurs d'ONG, agents de terrain", places:15, exemple:true,
    programme:["Pédagogie pour adultes","Maîtrise avancée d'AKIBA","Animer une session de formation","Assurer le suivi des groupes"] },
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
    missions:["Réaliser les diagnostics des entreprises accompagnées","Animer des formations et du coaching individuel","Suivre les indicateurs dans UboraHub","Préparer les rapports d'activité"],
    profil:["Bac+3 minimum en gestion, économie ou équivalent","2 ans d'expérience en appui aux PME ou entrepreneuriat","Aisance avec les outils numériques","Français courant, swahili apprécié"] },
  { id:"formateur-terrain-akiba", titre:"Formateur·rice terrain AKIBA", type:"CDD", lieu:"Haut-Katanga (déplacements fréquents)", departement:"Inclusion financière", publie:"2026-09-10", cloture:"2026-10-10", exemple:true,
    resume:"Former et suivre sur le terrain les groupes d'épargne qui utilisent AKIBA.",
    missions:["Former les trésoriers et secrétaires de groupes","Assurer le suivi et les visites de contrôle","Remonter les besoins d'amélioration de l'outil","Accompagner la connexion avec la microfinance"],
    profil:["Expérience avec les groupes AVEC / VSLA","Pédagogie et patience","Maîtrise du swahili indispensable","Permis moto apprécié"] },
  { id:"stage-developpeur", titre:"Stage : développeur·se web & mobile", type:"Stage", lieu:"Lubumbashi / hybride", departement:"Solutions numériques", publie:"2026-09-01", cloture:"2026-10-31", exemple:true,
    resume:"Contribuer au développement de nos solutions numériques (AKIBA, UboraHub).",
    missions:["Développer de nouvelles fonctionnalités","Corriger les anomalies remontées du terrain","Participer aux tests avec les utilisateurs"],
    profil:["Étudiant·e ou jeune diplômé·e en informatique","JavaScript / HTML / CSS","Curiosité et envie d'impact social"] }
];

/* ---------- Actualités (la plus récente s'affiche en premier) ---------- */
const ACTUALITES = [
  {
    slug: "lancement-akiba-kipushi", date: "2026-09-10", categorie: "Solutions", exemple: true,
    titre: "AKIBA déployée auprès de 40 groupes d'épargne à Kipushi",
    extrait: "Après six mois de pilote, la plateforme d'épargne communautaire passe à l'échelle dans le territoire de Kipushi.",
    contenu: [
      "Après une phase pilote de six mois, AKIBA est désormais utilisée par quarante groupes d'épargne et de crédit dans le territoire de Kipushi. Les trésoriers, formés en deux sessions, saisissent les cotisations directement sur téléphone, même sans connexion.",
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
    extrait: "Ubora engage des discussions avec des institutions de microfinance pour valoriser l'historique financier des groupes AKIBA.",
    contenu: [
      "L'historique d'épargne et de remboursement enregistré dans AKIBA peut servir de garantie morale auprès des institutions financières. Ubora travaille à un cadre de partenariat pour faciliter l'accès au crédit des groupes les plus réguliers."
    ]
  }
];
