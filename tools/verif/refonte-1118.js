/* Refonte, étape 1 (18 novembre 2026) : accueil et navigation, à la manière de Cloudflare, LinkedIn et transforme.cd,
   dans l'identité d'Ubora (vert, Ubuntu fin, logo). Peu de texte, des blocs frappants, un lien par destination. */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const patch = (f, paires) => {
  let t = fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

/* ---------- 1. Accueil ---------- */
patch('app.js', [[/function pageHome\(\) \{[\s\S]*?\n\}\n\nfunction teamBand/, `function pageHome() {
  const news = allNews().slice(0, 3);
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne").length;
  return \`
  <section class="r-hero"><div class="wrap r-hero-grille">
    <div class="r-hero-txt">
      <span class="r-sur">Entreprise à caractère social · RDC</span>
      <h1>Épargner. Entreprendre. <span class="serif">Vendre.</span></h1>
      <p class="r-chapeau">Nous accompagnons les groupes d'épargne, les entrepreneurs et les coopératives, jusqu'au crédit et jusqu'à l'acheteur.</p>
      <div class="btn-row"><a class="btn btn-accent" href="#solutions" data-scroll="solutions">Nos solutions \${ICON.arrow}</a><a class="btn btn-ghost" href="#poles" data-scroll="poles">Nos pôles</a></div>
    </div>
    <figure class="r-hero-photo">\${photo("avec", "(max-width: 900px) 100vw, 46vw", "Des femmes réunies en groupe d'épargne", ' fetchpriority="high"')}
      <figcaption class="r-hero-badge"><b>\${enLigne}</b><span>applications en ligne, conçues pour le terrain</span></figcaption></figure>
  </div></section>

  <section class="r-chiffres" aria-label="Ubora en chiffres"><div class="wrap"><ul>
    <li><b>\${POLES.length}</b><span>pôles d'intervention</span></li>
    <li><b>\${enLigne}</b><span>applications en ligne</span></li>
    <li><b>140+</b><span>cours à l'Académie</span></li>
    <li><b>Hors ligne</b><span>nos outils marchent sans réseau</span></li>
  </ul></div></section>

  <section id="poles"><div class="wrap">
    \${secHead("Nos pôles", \`Un accompagnement <span class="serif">complet</span>\`)}
    <div class="r-poles">\${POLES.map(p => \`<a class="r-pole" href="\${p.chemin}" style="--c:\${p.couleur}"><span class="mk">\${esc(p.initiales)}</span><b>\${esc(p.nom)}</b><span>\${esc(p.accroche)}</span></a>\`).join("")}</div>
  </div></section>

  \${vitrine()}

  <section><div class="wrap"><div class="r-bande">
    <div><span class="eyebrow">Bailleurs, ONG et programmes</span>
      <h2>Commencez par un <span class="serif">projet pilote</span>.</h2>
      <p>Un périmètre réduit, des indicateurs fixés ensemble, des résultats suivis en direct.</p></div>
    <div class="btn-row"><a class="btn btn-accent" href="/conseil#pilote">Comment ça marche \${ICON.arrow}</a></div>
  </div></div></section>

  <section class="r-citation"><div class="wrap">
    <blockquote><p>Ceux qui peuvent payer financent l'accompagnement de ceux qui ne le peuvent pas.</p>
      <footer><a class="link" href="/a-propos#modele">Notre modèle d'entreprise sociale \${ICON.arrow}</a></footer></blockquote>
  </div></section>

  \${news.length ? \`<section><div class="wrap">
    \${secHead("Actualités", "Nouvelles du terrain", "", \`<a class="btn btn-ghost" href="/actualites">Toutes les actualités \${ICON.arrow}</a>\`)}
    <div class="news-grid">\${news.map(newsCard).join("")}</div>
  </div></section>\` : ""}

  <section><div class="wrap">\${finalCta()}</div></section>\`;
}

function teamBand`]]);

/* ---------- 2. Menu : cinq entrées et un seul bouton ---------- */
patch('app.js', [[/function menuHTML\(\) \{[\s\S]*?\n\}\nfunction footerHTML/, `function menuHTML() {
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne");
  const chantier = OUTILS.filter(o => o.statut !== "en-ligne");
  const item = (h, b, s, c, ini, externe) => \`<a href="\${h}"\${externe ? ' target="_blank" rel="noopener"' : ""} class="dd-item"><span class="mk" style="background:\${c}">\${esc(ini)}</span><span><b>\${esc(b)}</b><small>\${esc(s || "")}</small></span></a>\`;
  return \`
    <li class="has-dd"><button class="dd-btn" type="button" data-r="poles" aria-expanded="false">Pôles \${ICON.chev}</button>
      <div class="dd dd-mega"><div class="dd-col dd-poles"><h5>Nos pôles</h5><div class="dd-grille">\${POLES.map(p => item(p.chemin, p.nom, p.accroche, p.couleur, p.initiales)).join("")}</div></div></div></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="outils" aria-expanded="false">Solutions \${ICON.chev}</button>
      <div class="dd dd-mega"><div class="dd-col dd-outils"><h5>En ligne</h5>\${enLigne.map(o => item(o.url, o.nom, o.court, o.couleur, o.initiales, true)).join("")}</div>
        <div class="dd-col"><h5>En construction</h5><ul class="dd-chantier">\${chantier.map(o => \`<li><span class="mk" style="background:\${o.couleur}">\${esc(o.initiales)}</span>\${esc(o.nom)}</li>\`).join("")}</ul></div>
        <div class="dd-pied"><a href="/outils" class="dd-more">Fiches détaillées des outils \${ICON.arrow}</a></div></div></li>
    <li><a href="/conseil" data-r="conseil">Bailleurs et ONG</a></li>
    <li><a href="/formations" data-r="formations">Formations</a></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="a-propos" aria-expanded="false">À propos \${ICON.chev}</button>
      <div class="dd dd-list">
        <a href="/a-propos"><b>Qui sommes-nous</b><small>Mission, modèle social, valeurs</small></a>
        <a href="/approche"><b>Notre approche</b><small>La méthode Ubora</small></a>
        <a href="/equipe"><b>Notre équipe</b><small>Les personnes derrière Ubora</small></a>
        <a href="/ong"><b>L'association UBORA</b><small>Les projets financés par des dons</small></a>
        <a href="/soutenir"><b>Soutenir nos actions</b><small>Une entreprise à objectif social</small></a>
        \${DATA.realisations.length ? \`<a href="/realisations"><b>Nos réalisations</b><small>Ce que nous avons fait</small></a>\` : ""}
        \${allNews().length ? \`<a href="/actualites"><b>Actualités</b><small>Nouvelles du terrain</small></a>\` : ""}
        <a href="/carrieres"><b>Carrières</b><small>Rejoindre l'équipe</small></a>
      </div></li>
    <li class="m-cta"><a class="btn btn-accent" href="/contact">Nous contacter</a></li>\`;
}
function footerHTML`]]);

/* ---------- 3. En-tête : un seul bouton, logo léger ---------- */
patch('tools/shell.html', [
  [`      <a class="btn btn-ghost btn-sm btn-soutenir" href="/soutenir">Soutenir nos actions</a>\n`, ``],
  [`<a class="btn btn-accent btn-sm" href="/contact" aria-label="Nous contacter">Contact</a>`, `<a class="btn btn-accent btn-sm" href="/contact">Nous contacter</a>`],
  [`<img class="logo-img" src="/logo-ubora.png" alt="" width="50" height="50">`, `<img class="logo-img" src="/logo-ubora-112.webp" alt="" width="50" height="50">`]
]);
patch('app.js', [[`<img class="logo-img" src="/logo-ubora.png" alt="" width="56" height="56" loading="lazy">`, `<img class="logo-img" src="/logo-ubora-112.webp" alt="" width="56" height="56" loading="lazy">`]]);

/* ---------- 4. Styles de la refonte ---------- */
fs.appendFileSync(R + 'styles.css', `
/* ==========================================================================
   REFONTE (18 novembre 2026) — accueil et navigation.
   Inspirée de Cloudflare (grand titre, bande de chiffres, grille de produits),
   LinkedIn (sobriété, entrées claires) et transforme.cd (ton institutionnel).
   Identité Ubora conservée : vert, Ubuntu fin, logo.
   ========================================================================== */
.r-hero { padding-block: clamp(36px, 6vw, 84px) clamp(28px, 4vw, 56px); background: linear-gradient(180deg, var(--menthe) 0%, var(--bg) 100%); }
.r-hero-grille { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
@media (max-width: 900px) { .r-hero-grille { grid-template-columns: 1fr; } }
.r-sur { display: inline-block; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--vert-texte); font-weight: 500; }
.r-hero h1 { margin: 14px 0 18px; font-weight: 300; font-size: clamp(40px, 6.4vw, 78px); line-height: 1.02; letter-spacing: -.03em; color: var(--ink); }
.r-hero h1 .serif { font-family: var(--f-display); font-style: normal; font-weight: 500; color: var(--vert-texte); }
.r-chapeau { margin: 0 0 26px; max-width: 34ch; font-size: clamp(17px, 1.6vw, 20px); line-height: 1.5; color: var(--muted); }
.r-hero-photo { position: relative; margin: 0; }
.r-hero-photo img { display: block; width: 100%; max-width: 100%; height: auto; aspect-ratio: 4 / 3.4; object-fit: cover; border-radius: 14px; }
.r-hero-badge { position: absolute; left: -18px; bottom: 22px; display: flex; align-items: center; gap: 12px; max-width: 260px; padding: 14px 18px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 18px 40px -22px rgba(13, 59, 40, .45); }
.r-hero-badge b { font-size: 34px; font-weight: 300; color: var(--vert-texte); line-height: 1; }
.r-hero-badge span { font-size: 13.5px; line-height: 1.35; color: var(--muted); }
@media (max-width: 900px) { .r-hero-badge { left: 12px; bottom: 12px; } }
.r-chiffres { padding-block: 0; }
.r-chiffres ul { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; border-block: 1px solid var(--line); }
.r-chiffres li { display: grid; gap: 4px; padding: 26px 22px; border-left: 1px solid var(--line); }
.r-chiffres li:first-child { border-left: 0; }
.r-chiffres b { font-size: clamp(30px, 3.6vw, 44px); font-weight: 300; line-height: 1.05; color: var(--ink); letter-spacing: -.02em; }
.r-chiffres span { font-size: 14px; color: var(--muted); }
@media (max-width: 800px) { .r-chiffres ul { grid-template-columns: repeat(2, minmax(0, 1fr)); } .r-chiffres li:nth-child(3) { border-left: 0; } .r-chiffres li:nth-child(n+3) { border-top: 1px solid var(--line); } }
.r-poles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
@media (max-width: 1000px) { .r-poles { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .r-poles { grid-template-columns: 1fr; } }
.r-pole { display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; column-gap: 14px; row-gap: 2px; align-items: center; padding: 18px; background: var(--surface); color: var(--ink); text-decoration: none; border: 1px solid var(--line); border-radius: 10px; transition: border-color .2s, transform .2s, box-shadow .2s; }
.r-pole .mk { grid-row: 1 / 3; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 10px; background: var(--c); color: #fff; font-weight: 500; }
.r-pole b { font-size: 16.5px; font-weight: 500; }
.r-pole > span:last-child { font-size: 14px; line-height: 1.4; color: var(--muted); }
.r-pole:hover, .r-pole:focus-visible { border-color: var(--c); transform: translateY(-2px); box-shadow: 0 12px 26px -18px rgba(13, 59, 40, .5); }
.r-bande { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 22px 40px; padding: clamp(26px, 4vw, 44px); background: var(--menthe); border: 1px solid var(--menthe-bord); border-radius: 14px; }
.r-bande h2 { margin: 8px 0 8px; font-weight: 300; }
.r-bande p { margin: 0; color: var(--muted); max-width: 52ch; }
.r-citation blockquote { margin: 0 auto; max-width: 860px; text-align: center; }
.r-citation blockquote p { margin: 0 0 18px; font-size: clamp(26px, 3.4vw, 42px); font-weight: 300; line-height: 1.2; letter-spacing: -.02em; color: var(--ink); }
.r-citation footer { font-size: 15px; }
/* menu : liste des solutions en construction */
.dd-chantier { display: grid; gap: 10px; margin: 4px 0 0; padding: 0 10px; list-style: none; font-size: 14.5px; color: var(--muted); }
.dd-chantier li { display: flex; align-items: center; gap: 10px; }
.dd-chantier .mk { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 7px; color: #fff; font-size: 12px; font-weight: 500; opacity: .75; }
`);
console.log('styles.css : refonte');
