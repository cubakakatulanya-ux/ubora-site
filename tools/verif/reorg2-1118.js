/* Réorganisation, suite (18 novembre 2026) :
   - Carrières devient la section « Nous rejoindre » de Qui sommes-nous (/carrieres et /carrieres/<offre> redirigent) ;
   - « Nos outils » devient « Nos solutions », sur le modèle de « Nos pôles » (structure de baobablearning.org/programs). */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

/* ---------- 1. Les offres : bloc repris tel quel de pageCareers, sans le recopier à la main ---------- */
let app = lire('app.js');
const DEJA = app.includes('function blocOffres(openId) {');
const c0 = DEJA ? -1 : app.indexOf('function pageCareers(openId) {'), c1 = app.indexOf('\n}\n', c0) + 3;
if (!DEJA) {
const careers = app.slice(c0, c1);
const o0 = careers.indexOf('  <section class="band" id="offres"><div class="wrap">'), o1 = careers.lastIndexOf('  </div></section>`;');
if (o0 < 0 || o1 < 0) throw new Error('bloc des offres introuvable');
const offres = careers.slice(o0, o1 + '  </div></section>'.length)
  .replace('  <section class="band" id="offres"><div class="wrap">', '  <section class="band" id="rejoindre"><div class="wrap">')
  .replace('${secHead("Offres", "Les postes ouverts")}', '${secHead("Nous rejoindre", "Offres d\'emploi, de stage et de consultance")}');
app = app.slice(0, c0) + `/* Offres d'emploi et candidature spontanée (section « Nous rejoindre » de Qui sommes-nous) */
function blocOffres(openId) {
  const t = todayISO();
  const ouvertes = [...DATA.offres].filter(o => o.cloture >= t).sort((a, b) => (b.publie || "").localeCompare(a.publie || ""));
  return \`${offres}\`;
}
` + app.slice(c1);
fs.writeFileSync(R + 'app.js', app); console.log('app.js : offres → Qui sommes-nous');

patch('app.js', [
  [`["valeurs", "Nos valeurs"], ["soutenir", "Nous soutenir"], ["faq", "Questions"]];`, `["valeurs", "Nos valeurs"], ["soutenir", "Nous soutenir"], ["rejoindre", "Nous rejoindre"], ["faq", "Questions"]];`],
  [`\n    <p class="suite"><a class="link" href="/carrieres">Nous rejoindre : offres et candidature spontanée \${ICON.arrow}</a></p>`, ``],
  [`  <section id="faq"><div class="wrap">\${secHead("Questions fréquentes", "Vous vous demandez peut-être")}\${faq(FAQ)}</div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}`, `\${blocOffres(typeof window !== "undefined" && window.location ? (location.hash.match(/^#offre-(.+)$/) || [])[1] : null)}

  <section id="faq"><div class="wrap">\${secHead("Questions fréquentes", "Vous vous demandez peut-être")}\${faq(FAQ)}</div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}`],
  [`    case "carrieres": html = pageCareers(sub); canon = "/carrieres"; break;\n`, ``],
  [`  const alias = ANCIENNES[path];
  if (alias) return { redirect: alias };`, `  const alias = ANCIENNES[path];
  if (alias) return { redirect: alias };
  /* les offres d'emploi sont dans « Nous rejoindre », sur Qui sommes-nous (18 novembre 2026) */
  if (base === "carrieres") return { redirect: sub ? "/a-propos#offre-" + encodeURIComponent(sub) : "/a-propos#rejoindre" };`],
  [`        <a href="/carrieres"><b>Carrières</b><small>Rejoindre l'équipe</small></a>`, `        <a href="/a-propos#rejoindre"><b>Nous rejoindre</b><small>Offres et candidature spontanée</small></a>`],
  [`(a.dataset.r === "a-propos" && ["a-propos", "carrieres", "ong", "realisations", "actualites"].includes(r.base))`, `(a.dataset.r === "a-propos" && ["a-propos", "ong", "realisations", "actualites"].includes(r.base))`],
  [`[\"\", \"actualites\", \"a-propos\", \"carrieres\", \"realisations\"].includes(r.base)`, `[\"\", \"actualites\", \"a-propos\", \"realisations\"].includes(r.base)`]
]);
}
patch('chat.js', [[`"Nos postes ouverts, stages et consultances sont publiés sur la page Carrières. Vous pouvez aussi envoyer une candidature spontanée.", "/carrieres"`,
  `"Nos postes ouverts, stages et consultances sont publiés dans la section « Nous rejoindre ». Vous pouvez aussi envoyer une candidature spontanée.", "/a-propos#rejoindre"`]]);
patch('worker.js', [
  [`  "/approche": "/a-propos#methode", "/equipe": "/a-propos#equipe", "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions"`,
   `  "/approche": "/a-propos#methode", "/equipe": "/a-propos#equipe", "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions", "/carrieres": "/a-propos#rejoindre"`],
  [`    const ancienne = ANCIENNES[chemin.replace(/\\/+$/, "")];`, `    const ancienne = ANCIENNES[chemin.replace(/\\/+$/, "")];
    /* une ancienne adresse d'offre d'emploi mène à l'offre, dans « Nous rejoindre » */
    const offre = /^\\/carrieres\\/([^/]+)\\/?$/.exec(chemin);
    if (offre) return renvoi(\`https://\${APEX}/a-propos#offre-\${offre[1]}\`);`]
]);
patch('tools/prerender.js', [[`"/realisations", "/carrieres", "/contact", `, `"/realisations", "/contact", `]]);
if (fs.existsSync(R + 'carrieres.html')) { fs.unlinkSync(R + 'carrieres.html'); console.log('supprimé : carrieres.html'); }

/* ---------- 2. Nos solutions ---------- */
patch('app.js', [[/function pageOutils\(\) \{[\s\S]*?\n\}\n/, `function pageOutils() {
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne"), chantier = OUTILS.filter(o => o.statut !== "en-ligne");
  const plus = o => o.fiche ? "/outils/" + o.id : (o.page && o.page.startsWith("/") ? o.page : "");
  return \`<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>Nos solutions</span></nav>
        <span class="eyebrow">Nos solutions numériques</span>
        <h1>Des outils qui tiennent là où le réseau <span class="serif">lâche</span>.</h1>
        <p>Pensés pour le village sans réseau et pour qui n'a jamais ouvert un tableur. Chacun s'accompagne d'une formation.</p>
      </div>
      <div class="pg-hero-photo">\${photo("akiba", "(max-width: 900px) 100vw, 55vw", "Un groupe d'épargne tient ses comptes sur téléphone", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à une solution">\${enLigne.map(o => \`<a href="#\${o.id}" data-scroll="\${o.id}">\${esc(o.nom)}</a>\`).join("")}<a href="#chantier" data-scroll="chantier">En construction</a></nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    \${enLigne.map(o => \`<article class="pg-carte" id="\${o.id}" style="--c:\${o.couleur}">
      <div class="pg-carte-g">
        <div class="pg-carte-photo">\${banniere(o, "(max-width: 900px) 100vw, 360px")}</div>
        <h2>\${esc(o.nom)}</h2>
        <p class="pg-accroche">\${esc(o.court || "")}</p>
        <p>\${esc(o.resume)}</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Ce que fait \${esc(o.nomPhrase || o.nom)}</div>
        <ul class="pg-domaines pg-points">\${(o.points || []).slice(0, 6).map(x => \`<li><b>\${esc(x)}</b></li>\`).join("")}</ul>
        <div class="pg-actions"><a class="btn btn-accent" href="\${o.url}" target="_blank" rel="noopener">Ouvrir \${esc(o.nom)} \${ICON.ext}</a>\${plus(o) ? \`<a class="link" href="\${plus(o)}">En savoir plus \${ICON.arrow}</a>\` : ""}</div>
      </div>
    </article>\`).join("")}
    <div id="chantier">
      <h2 class="sous-titre vitrine-titre">En construction</h2>
      <div class="vitrine-grille chantier">\${chantier.map(o => \`<article class="solution bientot" style="--c:\${o.couleur}">
        <div class="bientot-img" aria-hidden="true"><span class="mk">\${esc(o.initiales)}</span><span class="status st-soon">En construction</span></div>
        <div class="solution-txt"><b>\${esc(o.nom)}</b><span>\${esc(o.resume)}</span><span class="solution-pole">\${esc(poleReal(o.pole).nom)}</span></div>
      </article>\`).join("")}</div>
    </div>
  </div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}
`]]);
patch('app.js', [
  [`outils: "Nos outils numériques"`, `outils: "Nos solutions"`],
  [`<a href="/outils" class="dd-more">Fiches détaillées des outils \${ICON.arrow}</a>`, `<a href="/outils" class="dd-more">Toutes nos solutions \${ICON.arrow}</a>`],
  [`<p class="vitrine-pied"><a class="link" href="/outils">Fiches détaillées de tous les outils \${ICON.arrow}</a></p>`, `<p class="vitrine-pied"><a class="link" href="/outils">Toutes nos solutions, en détail \${ICON.arrow}</a></p>`],
  [`crumbs: [["Nos outils", "/outils"], [esc(o.nom)]]`, `crumbs: [["Nos solutions", "/outils"], [esc(o.nom)]]`]
]);

fs.appendFileSync(R + 'styles.css', `
/* Nos solutions (18 novembre 2026) : cartes des applications, sur le modèle de Nos pôles */
.pg-carte-photo .solution-img { border-radius: 12px; border: 1px solid var(--line); }
.pg-points { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.pg-points li { position: relative; padding-left: 18px; }
.pg-points li::before { content: ""; position: absolute; left: 0; top: .55em; width: 7px; height: 7px; border-radius: 50%; background: var(--c); }
.pg-points b { font-weight: 400; font-size: 15px; }
.pg-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 12px 22px; margin-top: 24px; }
#chantier { scroll-margin-top: 110px; }
#chantier .vitrine-grille.chantier .solution-txt > span:nth-child(2) { font-size: 14px; }
`);
console.log('styles.css : solutions');
