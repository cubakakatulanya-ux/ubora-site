/* ==========================================================================
   UBORA — Publication du générateur de business plan (bp.uborardc.com)
   Copie le générateur depuis son dossier de travail vers generateur/index.html
   et ajoute ce qu'il faut aux moteurs de recherche (titre, description,
   adresse canonique, aperçu de partage). À relancer après chaque mise à jour :
     node tools/publier-generateur.js
   ========================================================================== */
const fs = require("fs");
const path = require("path");

const SOURCE = process.argv[2] || "C:/Users/CUBAKA/Documents/Generateur_Business_Plan/Generateur_Business_Plan.html";
const CIBLE = path.join(__dirname, "..", "generateur", "index.html");

const TITRE = "Générateur de business plan pour la RDC · Ubora";
const DESC = "Construisez votre business plan pas à pas : huit questions, prévisions financières, score de viabilité et trois scénarios, en francs congolais ou en dollars.";

let html = fs.readFileSync(SOURCE, "utf8");
if (!/<title>[^<]*<\/title>/.test(html)) throw new Error("balise <title> introuvable dans le générateur");

const tete = `<title>${TITRE}</title>
<meta name="description" content="${DESC}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://bp.uborardc.com/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ubora">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${TITRE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="https://bp.uborardc.com/">
<meta property="og:image" content="https://uborardc.com/partage.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

html = html.replace(/<title>[^<]*<\/title>/, tete);
fs.writeFileSync(CIBLE, html);
console.log("Générateur publié dans generateur/index.html (" + Math.round(html.length / 1024) + " Ko).");
