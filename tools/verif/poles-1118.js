/* Page « Nos pôles » et barre de navigation des pages de pôle, d'après la structure de baobablearning.org/programs
   (18 novembre 2026) : grande carte d'en-tête, barre de pastilles vers chaque programme, une carte par programme
   (photo, nom, accroche, description, bandeau « ce que nous faisons » et liste sur deux colonnes, lien). Identité Ubora. */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const patch = (f, paires) => {
  let t = fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

patch('app.js', [
  /* ---------- la page « Nos pôles » ---------- */
  [`function pagePole(id) {`, `/* Vue d'ensemble des pôles (/poles) */
function pagePoles() {
  return \`<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>/</span><span>Nos pôles</span></nav>
        <span class="eyebrow">Nos pôles</span>
        <h1>Sept pôles, une même <span class="serif">chaîne</span>.</h1>
        <p>Du premier franc épargné au premier contrat de vente : chaque pôle tient un maillon, et l'Académie forme à chaque étape.</p>
      </div>
      <div class="pg-hero-photo">\${photo("terrain", "(max-width: 900px) 100vw, 55vw", "Une communauté réunie en plein air", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à un pôle">\${POLES.map(p => \`<a href="#\${p.id}" data-scroll="\${p.id}">\${esc(p.nom)}</a>\`).join("")}</nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    \${POLES.map(p => \`<article class="pg-carte" id="\${p.id}" style="--c:\${p.couleur}">
      <div class="pg-carte-g">
        \${p.photo ? \`<div class="pg-carte-photo">\${photo(p.photo[0], "(max-width: 900px) 100vw, 360px", p.photo[1]).replace("<img ", '<img loading="lazy" ')}</div>\` : ""}
        <h2>\${esc(p.nom)}</h2>
        <p class="pg-accroche">\${esc(p.accroche)}</p>
        <p>\${esc(p.lead)}</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Ce que nous faisons</div>
        <ul class="pg-domaines">\${(p.parcours || []).slice(0, 6).map(([t, x]) => \`<li><b>\${esc(t)}</b><span>\${esc(x)}</span></li>\`).join("")}</ul>
        <p class="pg-lien"><a class="link" href="\${p.chemin}">Découvrir \${esc(p.nom)} \${ICON.arrow}</a></p>
      </div>
    </article>\`).join("")}
  </div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}

/* Barre de pastilles sous l'en-tête d'une page de pôle : les sections de la page */
function ongletsPole(P) {
  const items = [
    P.video && ["video", "En vidéo"], ["contexte", "Le contexte"], P.chaine && ["chaine", "Chaîne de valeur"], ["demarche", "Notre démarche"],
    P.avec && ["credit", "Vers le crédit"], P.intermediation && ["intermediation", "Notre rôle"], P.canaux && ["debouches", "Les débouchés"],
    ["outils", (P.outils || []).length ? "Outils et publics" : "Nos publics"], P.boite && P.boite.statut === "disponible" && ["boite", "Boîte à outils"]
  ].filter(Boolean);
  return \`<section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page" style="--c:\${P.couleur}">\${items.map(([id, t]) => \`<a href="#\${id}" data-scroll="\${id}">\${t}</a>\`).join("")}</nav></div></section>\`;
}

function pagePole(id) {`],
  [`crumbs: [["Nos pôles", "/#poles"], [esc(P.nom)]], photo: P.photo,`, `crumbs: [["Nos pôles", "/poles"], [esc(P.nom)]], photo: P.photo,`],
  [`  }) + \`

  \${P.video ? blocVideo(P.video) : ""}

  <section><div class="wrap two">
    <div>
      <span class="eyebrow">Le contexte en RDC</span>`, `  }) + \`
  \${ongletsPole(P)}

  \${P.video ? blocVideo(P.video) : ""}

  <section id="contexte"><div class="wrap two">
    <div>
      <span class="eyebrow">Le contexte en RDC</span>`],
  [`  <section\${(P.programmes || P.entrees) && !P.chaine ? "" : ' class="band"'}><div class="wrap">
    \${secHead("Notre démarche", "Étape par étape")}`, `  <section id="demarche"\${(P.programmes || P.entrees) && !P.chaine ? "" : ' class="band"'}><div class="wrap">
    \${secHead("Notre démarche", "Étape par étape")}`],
  [`  \${P.avec ? \`<section class="band"><div class="wrap">
    \${secHead("Vers le crédit"`, `  \${P.avec ? \`<section class="band" id="credit"><div class="wrap">
    \${secHead("Vers le crédit"`],
  [`  \${P.canaux ? \`<section class="band"><div class="wrap">`, `  \${P.canaux ? \`<section class="band" id="debouches"><div class="wrap">`],
  [`  <section><div class="wrap">
    \${cartesOutils.length ? \`\${secHead("Outils et publics"`, `  <section id="outils"><div class="wrap">
    \${cartesOutils.length ? \`\${secHead("Outils et publics"`],
  /* ---------- route, titres, liens vers la vue d'ensemble ---------- */
  [`    case "ong": html = pageOng(); break;`, `    case "ong": html = pageOng(); break;
    case "poles": html = pagePoles(); break;`],
  [`mentions: "Mentions légales", confidentialite:`, `mentions: "Mentions légales", poles: "Nos pôles", confidentialite:`],
  [`  mentions: "Mentions légales du site d'Ubora`, `  poles: "Les sept pôles d'Ubora, entreprise à caractère social : groupes d'épargne, entrepreneurs, coopératives, accès au financement, accès au marché, environnement et formation, partout en RDC.",
  mentions: "Mentions légales du site d'Ubora`],
  [`mentions: "Mentions légales · Ubora, entreprise sociale", confidentialite:`, `mentions: "Mentions légales · Ubora, entreprise sociale", poles: "Nos pôles : AVEC, PME, coopératives, financement, marché, environnement, formation · Ubora", confidentialite:`],
  [`<div class="dd dd-mega"><div class="dd-col dd-poles"><h5>Nos pôles</h5><div class="dd-grille">\${POLES.map(p => item(p.chemin, p.nom, p.accroche, p.couleur, p.initiales)).join("")}</div></div></div></li>`,
   `<div class="dd dd-mega"><div class="dd-col dd-poles"><h5>Nos pôles</h5><div class="dd-grille">\${POLES.map(p => item(p.chemin, p.nom, p.accroche, p.couleur, p.initiales)).join("")}</div></div>
        <div class="dd-pied"><a href="/poles" class="dd-more">Vue d'ensemble des pôles \${ICON.arrow}</a></div></div></li>`],
  [`\${secHead("Nos pôles", \`Un accompagnement <span class="serif">complet</span>\`)}`, `\${secHead("Nos pôles", \`Un accompagnement <span class="serif">complet</span>\`, "", \`<a class="btn btn-ghost" href="/poles">Vue d'ensemble \${ICON.arrow}</a>\`)}`],
  [`<a class="link" href="/#poles">Vous pouvez aussi mobiliser directement l'un de nos pôles`, `<a class="link" href="/poles">Vous pouvez aussi mobiliser directement l'un de nos pôles`]
]);
patch('tools/prerender.js', [[`"/ong", "/mentions",`, `"/ong", "/poles", "/mentions",`]]);

fs.appendFileSync(R + 'styles.css', `
/* ==========================================================================
   « Nos pôles » et barre des pages de pôle (18 novembre 2026),
   d'après la structure de baobablearning.org/programs, dans l'identité d'Ubora.
   ========================================================================== */
.pg-tete { padding-block: clamp(18px, 3vw, 32px) 0; }
.pg-hero { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: clamp(320px, 38vw, 440px); overflow: hidden; border-radius: 16px; background: #0E2A1C; color: #fff; }
.pg-hero-txt { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: clamp(26px, 4.5vw, 56px); }
.pg-hero-txt .crumbs, .pg-hero-txt .crumbs a { color: rgba(255, 255, 255, .72); }
.pg-hero-txt .eyebrow { color: #9BE3B5; }
.pg-hero h1 { margin: 0; color: #fff; font-weight: 300; font-size: clamp(34px, 4.6vw, 58px); line-height: 1.05; letter-spacing: -.025em; }
.pg-hero h1 .serif { font-family: var(--f-display); font-style: normal; font-weight: 500; color: #9BE3B5; }
.pg-hero-txt p { margin: 0; max-width: 46ch; color: rgba(255, 255, 255, .86); font-size: clamp(16px, 1.4vw, 18px); }
.pg-hero-photo { position: absolute; inset: 0 0 0 38%; }
.pg-hero-photo img { width: 100%; height: 100%; max-width: 100%; object-fit: cover; }
.pg-hero-photo::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #0E2A1C 0%, rgba(14, 42, 28, .55) 30%, rgba(14, 42, 28, 0) 70%); }
@media (max-width: 900px) { .pg-hero { grid-template-columns: 1fr; } .pg-hero-photo { position: relative; inset: auto; height: 220px; order: -1; } .pg-hero-photo::before { background: linear-gradient(0deg, #0E2A1C 0%, rgba(14, 42, 28, 0) 60%); } }
.pg-onglets { display: flex; margin-top: 14px; overflow-x: auto; scrollbar-width: none; background: var(--c, var(--vert-texte)); border-radius: 12px; }
.pg-onglets::-webkit-scrollbar { display: none; }
.pg-onglets a { flex: 1 0 auto; padding: 13px 18px; text-align: center; color: #fff; text-decoration: none; font-size: 14.5px; white-space: nowrap; border-left: 1px solid rgba(255, 255, 255, .28); }
.pg-onglets a:first-child { border-left: 0; }
.pg-onglets a:hover, .pg-onglets a:focus-visible { background: rgba(0, 0, 0, .14); }
.pg-barre { padding-block: 14px 0; }
.pg-barre .pg-onglets { margin-top: 0; }
.pg-liste { background: var(--surface-2); }
.pg-liste .wrap { display: grid; gap: 22px; }
.pg-carte { scroll-margin-top: 110px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr); gap: clamp(20px, 3.5vw, 44px); padding: clamp(20px, 3vw, 34px); background: var(--surface); border: 1px solid var(--line); border-bottom: 4px solid var(--c); border-radius: 16px; }
@media (max-width: 900px) { .pg-carte { grid-template-columns: 1fr; } }
.pg-carte-g { display: grid; gap: 10px; align-content: start; }
.pg-carte-photo img { display: block; width: 100%; max-width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 12px; }
.pg-carte h2 { margin: 6px 0 0; font-weight: 300; font-size: clamp(26px, 2.6vw, 34px); }
.pg-carte p { margin: 0; color: var(--muted); }
.pg-carte .pg-accroche { color: var(--ink); font-weight: 500; }
.pg-bandeau { padding: 9px 14px; border-radius: 8px; background: color-mix(in srgb, var(--c) 14%, var(--surface)); color: color-mix(in srgb, var(--c) 70%, var(--ink)); font-size: 12.5px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; text-align: center; }
:root[data-theme="dark"] .pg-bandeau { color: color-mix(in srgb, var(--c) 45%, #fff); }
.pg-domaines { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 28px; margin: 18px 0 0; padding: 0; list-style: none; }
@media (max-width: 560px) { .pg-domaines { grid-template-columns: 1fr; } }
.pg-domaines li { display: grid; gap: 2px; }
.pg-domaines b { font-weight: 500; }
.pg-domaines span { font-size: 14.5px; line-height: 1.45; color: var(--muted); }
.pg-lien { margin-top: 22px !important; text-align: right; }
.pole-page [id], section[id] { scroll-margin-top: 100px; }
`);
console.log('styles.css : pôles');
