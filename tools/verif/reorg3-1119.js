/* Nouvelle organisation demandée par Christian (19 novembre 2026) :
   menu À propos · Notre approche · Nos solutions · Nos réalisations · Notre équipe · Nous contacter.
   - Notre approche (/approche) : la méthode, et en synthèse ce que nous offrons aux bailleurs et aux ONG (ancienne page /conseil) ;
   - Nos solutions (/solutions) : les sept pôles avec leurs applications (anciennes pages /poles et /outils) ;
   - Nos réalisations (/realisations) : ce qui est déjà en place, en attendant les réalisations de terrain publiées dans la base ;
   - Notre équipe (/equipe) : le directeur, l'équipe et les carrières ;
   - À propos (/a-propos) : mission, modèle, valeurs, nous soutenir, questions.
   Anciennes adresses redirigées (301). */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

/* ---------- 1. Nouvelles pages : Nos solutions, Notre approche, Notre équipe ---------- */
patch('app.js', [[`/* Vue d'ensemble des pôles (/poles) */
function pagePoles() {`, `/* Nos solutions (/solutions) : les pôles, chacun avec ses applications, en synthèse */
function pageSolutions() {
  const lienO = o => o.fiche ? "/outils/" + o.id : o.url;
  const ligne = o => o.statut === "en-ligne"
    ? \`<li><a href="\${lienO(o)}"\${ext(lienO(o))}><span class="mk" style="background:\${o.couleur}">\${esc(o.initiales)}</span><span><b>\${esc(o.nom)}</b><small>\${esc(o.court || "")}</small></span></a></li>\`
    : \`<li class="bientot"><span class="mk" style="background:\${o.couleur}">\${esc(o.initiales)}</span><span><b>\${esc(o.nom)}</b><small>En construction</small></span></li>\`;
  const outilsDe = id => OUTILS.filter(o => o.pole === id);
  const orga = outilsDe("conseil");
  return \`<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>Nos solutions</span></nav>
        <span class="eyebrow">Nos solutions</span>
        <h1>Sept pôles, et les outils qui les <span class="serif">servent</span>.</h1>
        <p>Du premier franc épargné au premier contrat de vente : chaque pôle tient un maillon, avec des applications pensées pour le terrain.</p>
      </div>
      <div class="pg-hero-photo">\${photo("akiba", "(max-width: 900px) 100vw, 55vw", "Un groupe d'épargne tient ses comptes sur téléphone", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à un pôle">\${POLES.map(p => \`<a href="#\${p.id}" data-scroll="\${p.id}">\${esc(p.nom)}</a>\`).join("")}\${orga.length ? \`<a href="#organisations" data-scroll="organisations">Organisations</a>\` : ""}</nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    \${POLES.map(p => { const o = outilsDe(p.id); return \`<article class="pg-carte" id="\${p.id}" style="--c:\${p.couleur}">
      <div class="pg-carte-g">
        \${p.photo ? \`<div class="pg-carte-photo">\${photo(p.photo[0], "(max-width: 900px) 100vw, 360px", p.photo[1]).replace("<img ", '<img loading="lazy" ')}</div>\` : ""}
        <h2>\${esc(p.nom)}</h2>
        <p class="pg-accroche">\${esc(p.accroche)}</p>
        <p>\${esc(p.lead)}</p>
      </div>
      <div class="pg-carte-d">
        \${o.length ? \`<div class="pg-bandeau">Les outils du pôle</div><ul class="pg-outils">\${o.map(ligne).join("")}</ul>\` : ""}
        <div class="pg-bandeau">Ce que nous faisons</div>
        <ul class="pg-etapes">\${(p.parcours || []).map(([t]) => \`<li>\${esc(t)}</li>\`).join("")}</ul>
        <p class="pg-lien"><a class="link" href="\${p.chemin}">Découvrir \${esc(p.nom)} \${ICON.arrow}</a></p>
      </div>
    </article>\`; }).join("")}
    \${orga.length ? \`<article class="pg-carte" id="organisations" style="--c:\${orga[0].couleur}">
      <div class="pg-carte-g">
        <h2>Pour les organisations</h2>
        <p class="pg-accroche">Associations, ONG, entreprises sociales et projets financés par des bailleurs.</p>
        <p>Une gestion rigoureuse, avec des circuits de validation clairs, pour rendre compte aux membres et aux bailleurs.</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Les outils</div><ul class="pg-outils">\${orga.map(ligne).join("")}</ul>
        <p class="pg-lien"><a class="link" href="/approche#bailleurs">Nos services aux bailleurs et aux ONG \${ICON.arrow}</a></p>
      </div>
    </article>\` : ""}
  </div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}

/* Notre approche (/approche) : la méthode, puis ce que nous offrons aux bailleurs et aux ONG */
function pageApproche() {
  const onglets = [["methode", "Notre méthode"], ["bailleurs", "Bailleurs et ONG"], ["pilote", "Le projet pilote"], ["mise-en-oeuvre", "La mise en œuvre"], ["prestations", "Nos prestations"], ["relais", "Après le projet"]];
  return pageHead({ eyebrow: "Notre approche", title: \`Former sans outiller ne suffit pas. Outiller sans accompagner <span class="serif">non plus</span>.\`, crumbs: [["Notre approche"]],
    lead: METHODE.intro }) + \`
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page">\${onglets.map(([id, t]) => \`<a href="#\${id}" data-scroll="\${id}">\${t}</a>\`).join("")}</nav></div></section>
  <section id="methode"><div class="wrap">
    \${secHead(METHODE.nom, "Six temps, toujours dans le même ordre", "Pour un groupe d'épargne, un entrepreneur ou une coopérative : seul le contenu change.")}
    <ol class="steps steps-court">\${METHODE.etapes.map((e, i) => \`<li><span class="pn">\${String(i + 1).padStart(2, "0")}</span><h3>\${esc(e.titre)}</h3><p>\${esc(e.texte)}</p></li>\`).join("")}</ol>
  </div></section>
  <section class="band" id="bailleurs"><div class="wrap">
    \${secHead("Bailleurs, ONG et programmes", \`Vos programmes méritent de durer plus longtemps que leur <span class="serif">financement</span>\`, "Nous les mettons en œuvre sur le terrain, nous en suivons les résultats en direct, puis nous prenons le relais.")}
    <div id="pilote" class="approche-bloc">
      <h3 class="sous-titre">Commencer par un projet pilote</h3>
      <p class="muted">La façon la plus sûre de commencer avec nous. Le pilote est confié à l'entreprise sociale (prestation) ou à l'association UBORA (subvention).</p>
      <ol class="chaine quatre">\${PILOTE.temps.map(([t, x], i) => \`<li><span class="pn">\${String(i + 1).padStart(2, "0")}</span><h3>\${esc(t)}</h3><p>\${esc(x)}</p></li>\`).join("")}</ol>
      <div class="grid-3 pilotes">\${PILOTE.exemples.map(([id, t, x, m]) => { const p = poleReal(id); return \`<div class="fcard" style="--c:\${p.couleur}"><span class="tag" style="background:\${p.couleur};color:#fff">\${esc(p.nom)}</span><h3>\${esc(t)}</h3><p class="mesure"><b>À mesurer</b> \${esc(m)}</p></div>\`; }).join("")}</div>
    </div>
    <div id="mise-en-oeuvre" class="approche-bloc">
      <h3 class="sous-titre">Mettre en œuvre votre projet</h3>
      <div class="grid-2 formules">\${MISE_EN_OEUVRE.formules.map(([t, x]) => \`<div class="fcard"><h3>\${esc(t)}</h3><p>\${esc(x)}</p></div>\`).join("")}</div>
    </div>
    <div id="prestations" class="approche-bloc">
      <h3 class="sous-titre">Nos prestations</h3>
      <div class="grid-4">\${CONSEIL.map(s => \`<div class="fcard"><span class="ic">\${ICON[s.ico]}</span><h3>\${esc(s.titre)}</h3><p>\${esc(s.texte)}</p></div>\`).join("")}</div>
    </div>
    <div class="btn-row centre"><a class="btn btn-accent" href="/contact?sujet=\${encodeURIComponent("Projet pilote")}">Proposer un projet pilote \${ICON.arrow}</a><a class="btn btn-ghost" href="/contact?sujet=\${encodeURIComponent("Présentation d'Ubora")}">Demander notre présentation</a></div>
  </div></section>
  <section id="relais"><div class="wrap">\${relais(false)}</div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}

/* Notre équipe (/equipe) : le directeur, l'équipe et les carrières */
function pageEquipe() {
  const membres = DATA.equipe;
  return pageHead({ eyebrow: "Notre équipe", title: \`Des gens de terrain, et des <span class="serif">spécialistes</span>.\`, crumbs: [["Notre équipe"]],
    lead: "Consultants, formateurs, agents de terrain et développeurs, partout en RDC." }) + \`
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page"><a href="#direction" data-scroll="direction">La direction</a>\${membres.length ? \`<a href="#membres" data-scroll="membres">L'équipe</a>\` : ""}<a href="#carrieres" data-scroll="carrieres">Carrières</a></nav></div></section>
  <section id="direction"><div class="wrap">\${profilDirigeant()}</div></section>
  \${membres.length ? \`<section class="band" id="membres"><div class="wrap">
    \${secHead("L'équipe", "Celles et ceux qui font Ubora")}
    <div class="team-grid">\${membres.map(memberCard).join("")}</div>
  </div></section>\` : ""}
  \${blocOffres(typeof window !== "undefined" && window.location ? (location.hash.match(/^#offre-(.+)$/) || [])[1] : null)}
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}

/* Vue d'ensemble des pôles (/poles) — remplacée par Nos solutions */
function pagePoles() {`]]);

/* la section des offres s'appelle désormais « Carrières » */
patch('app.js', [
  [`<section class="band" id="rejoindre"><div class="wrap">`, `<section class="band" id="carrieres"><div class="wrap">`],
  [`\${secHead("Nous rejoindre", "Offres d'emploi, de stage et de consultance")}`, `\${secHead("Carrières", "Offres d'emploi, de stage et de consultance")}`]
]);

/* ---------- 2. À propos : sans la méthode, l'équipe ni les offres ---------- */
patch('app.js', [
  [`  const ongletsPropos = [["mission", "Mission"], ["modele", "Notre modèle"], ["methode", "Notre méthode"], ["equipe", "L'équipe"], ["valeurs", "Nos valeurs"], ["soutenir", "Nous soutenir"], ["rejoindre", "Nous rejoindre"], ["faq", "Questions"]];`,
   `  const ongletsPropos = [["mission", "Mission"], ["modele", "Notre modèle"], ["valeurs", "Nos valeurs"], ["soutenir", "Nous soutenir"], ["faq", "Questions"]];`],
  [/\n  <section id="methode"><div class="wrap">\n    \$\{secHead\(METHODE\.nom[\s\S]*?<\/ol>\n  <\/div><\/section>\n/, `\n`],
  [/\n  <section class="band" id="equipe"><div class="wrap">[\s\S]*?\n  <\/div><\/section>\n/, `\n`]
]);
{ /* la section des offres quitte À propos (elle passe dans Notre équipe) : retrait dans le corps de pageAbout seulement */
  let t = lire('app.js');
  const i = t.indexOf('function pageAbout() {'), j = t.indexOf('\nfunction ', i + 10);
  const corps = t.slice(i, j), ligne = corps.split('\n').find(l => l.includes('${blocOffres('));
  if (!ligne) throw new Error('offres introuvables dans pageAbout');
  t = t.slice(0, i) + corps.replace(ligne + '\n', '') + t.slice(j);
  fs.writeFileSync(R + 'app.js', t); console.log('app.js : offres retirées d\'À propos');
}

/* ---------- 3. Nos réalisations : ce qui est déjà en place ---------- */
patch('app.js', [[`  <section><div class="wrap">
    \${presents.length > 1 ?`, `  <section><div class="wrap">
    \${secHead("Déjà en place", "Ce que nous avons construit", "Des outils et des contenus en service, que chacun peut ouvrir et vérifier.")}
    <div class="grid-3 deja">
      <div class="fcard"><b class="deja-n">\${OUTILS.filter(o => o.statut === "en-ligne").length}</b><h3>Applications en ligne</h3><ul class="deja-liste">\${OUTILS.filter(o => o.statut === "en-ligne").map(o => { const h = o.fiche ? "/outils/" + o.id : o.url; return \`<li><a href="\${h}"\${ext(h)}>\${esc(o.nom)}</a></li>\`; }).join("")}</ul></div>
      <div class="fcard"><b class="deja-n">140+</b><h3>Cours à l'Académie</h3><p>En 26 parcours et sept domaines, avec des certificats vérifiables. Un cours téléchargé se suit sans réseau.</p></div>
      <div class="fcard"><b class="deja-n">\${pole("avec").boite.outils.length}</b><h3>Documents de la boîte à outils AVEC</h3><p>Tirés de nos déploiements : guide, études, formation des animateurs, carnets et règlements.</p></div>
    </div>
    \${secHead("Sur le terrain", "Programmes et missions")}
    \${presents.length > 1 ?`]]);
patch('app.js', [[`(base === "realisations" && !DATA.realisations.length)`, `false`]]);

/* ---------- 4. Menu ---------- */
patch('app.js', [[/function menuHTML\(\) \{[\s\S]*?\n\}\nfunction footerHTML/, `function menuHTML() {
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne");
  const item = (h, b, s, c, ini, externe) => \`<a href="\${h}"\${externe ? ' target="_blank" rel="noopener"' : ""} class="dd-item"><span class="mk" style="background:\${c}">\${esc(ini)}</span><span><b>\${esc(b)}</b><small>\${esc(s || "")}</small></span></a>\`;
  return \`
    <li><a href="/a-propos" data-r="a-propos">À propos</a></li>
    <li><a href="/approche" data-r="approche">Notre approche</a></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="solutions" aria-expanded="false">Nos solutions \${ICON.chev}</button>
      <div class="dd dd-mega"><div class="dd-col dd-poles"><h5>Nos pôles</h5><div class="dd-grille">\${POLES.map(p => item(p.chemin, p.nom, p.accroche, p.couleur, p.initiales)).join("")}</div></div>
        <div class="dd-col dd-outils"><h5>Applications en ligne</h5>\${enLigne.map(o => item(o.url, o.nom, o.court, o.couleur, o.initiales, true)).join("")}</div>
        <div class="dd-pied"><a href="/solutions" class="dd-more">Vue d'ensemble des solutions \${ICON.arrow}</a></div></div></li>
    <li><a href="/realisations" data-r="realisations">Nos réalisations</a></li>
    <li><a href="/equipe" data-r="equipe">Notre équipe</a></li>
    <li class="m-cta"><a class="btn btn-accent" href="/contact">Nous contacter</a></li>\`;
}
function footerHTML`]]);
patch('app.js', [[`const on = a.dataset.r === r.base || (a.dataset.r === "poles" && !!pole(r.base) && r.base !== "academie") || (a.dataset.r === "a-propos" && ["a-propos", "ong", "realisations", "actualites"].includes(r.base));`,
  `const on = a.dataset.r === r.base || (a.dataset.r === "solutions" && (!!pole(r.base) || r.base === "outils")) || (a.dataset.r === "a-propos" && ["ong", "actualites"].includes(r.base));`]]);

/* ---------- 5. Routes, titres, redirections ---------- */
patch('app.js', [
  [`    case "poles": html = pagePoles(); break;`, `    case "solutions": html = pageSolutions(); break;
    case "approche": html = pageApproche(); break;
    case "equipe": html = pageEquipe(); break;`],
  [`    case "conseil": html = pageConseil(); break;\n`, ``],
  [`"solutions": "/outils", "services": "/conseil",`, `"services": "/approche#bailleurs",`],
  [`  "approche": "/a-propos#methode", "equipe": "/a-propos#equipe", "soutenir": "/a-propos#soutenir", "formations": "/academie#sessions"`,
   `  "soutenir": "/a-propos#soutenir", "formations": "/academie#sessions",
  "poles": "/solutions", "outils": "/solutions", "conseil": "/approche#bailleurs"`],
  [`  if (base === "carrieres") return { redirect: sub ? "/a-propos#offre-" + encodeURIComponent(sub) : "/a-propos#rejoindre" };`,
   `  if (base === "carrieres") return { redirect: sub ? "/equipe#offre-" + encodeURIComponent(sub) : "/equipe#carrieres" };`],
  [/  approche: "La méthode Ubora en six temps[^\n]*/, `  approche: "L'approche d'Ubora : une méthode en six temps, et pour les bailleurs et les ONG, des projets pilotes, la mise en œuvre de programmes et le relais après le projet, partout en RDC.",
  solutions: "Les solutions d'Ubora : sept pôles (AVEC, PME, coopératives, financement, marché, environnement, Académie) et leurs applications, AKIBA, Ubora Hub, ASBL Manager et les autres.",`],
  [/  equipe: "L'équipe d'Ubora[^\n]*/, `  equipe: "L'équipe d'Ubora, entreprise à caractère social : direction, consultants, formateurs, agents de terrain et développeurs, partout en RDC. Offres d'emploi, de stage et de consultance.",`],
  [`const SEO_TITRES = { ong:`, `const SEO_TITRES = { approche: "Notre approche : la méthode Ubora et nos services aux bailleurs et aux ONG", solutions: "Nos solutions : sept pôles et leurs applications · Ubora", equipe: "Notre équipe et nos carrières · Ubora, entreprise sociale", ong:`],
  [`const TITRES = { ong: "L'association UBORA",`, `const TITRES = { approche: "Notre approche", solutions: "Nos solutions", equipe: "Notre équipe", ong: "L'association UBORA",`]
]);
/* pageConseil n'est plus utilisée */
patch('app.js', [[/\nfunction pageConseil\(\) \{[\s\S]*?\n\}\n/, `\n`]]);
patch('worker.js', [
  [`"/solutions": "/outils", "/services": "/conseil",`, `"/services": "/approche#bailleurs",`],
  [`  "/approche": "/a-propos#methode", "/equipe": "/a-propos#equipe", "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions", "/carrieres": "/a-propos#rejoindre"`,
   `  "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions",
  /* nouvelle organisation du 19 novembre 2026 */
  "/carrieres": "/equipe#carrieres", "/poles": "/solutions", "/outils": "/solutions", "/conseil": "/approche#bailleurs"`],
  [`    if (offre) return renvoi(\`https://\${APEX}/a-propos#offre-\${offre[1]}\`);`, `    if (offre) return renvoi(\`https://\${APEX}/equipe#offre-\${offre[1]}\`);`]
]);
patch('tools/prerender.js', [
  [`"/ong", "/poles", "/mentions",`, `"/ong", "/mentions",`],
  [`"/a-propos", "/outils", "/conseil", "/actualites",`, `"/a-propos", "/approche", "/solutions", "/equipe", "/actualites",`]
]);
for (const f of ['poles.html', 'outils.html', 'conseil.html']) if (fs.existsSync(R + f)) { fs.unlinkSync(R + f); console.log('supprimé :', f); }

/* ---------- 6. Liens vers les anciennes adresses ---------- */
const NOUVEAU = [
  ['"/conseil#pilote"', '"/approche#pilote"'], ['"/conseil#mise-en-oeuvre"', '"/approche#mise-en-oeuvre"'], ['"/conseil#relais"', '"/approche#relais"'], ['"/conseil"', '"/approche#bailleurs"'],
  ['"/poles"', '"/solutions"'], ['"/outils"', '"/solutions"'],
  ['"/a-propos#methode"', '"/approche#methode"'], ['"/a-propos#equipe"', '"/equipe"'], ['"/a-propos#rejoindre"', '"/equipe#carrieres"']
];
for (const f of ['app.js', 'chat.js', 'data.js']) {
  let t = lire(f), n = 0;
  for (const [a, b] of NOUVEAU) { const avant = t; t = t.split(a).join(b); if (t !== avant) n += avant.split(a).length - 1; }
  /* les clés de redirection (sans guillemets autour du chemin complet) ne sont pas touchées ; les fils d'Ariane le sont */
  fs.writeFileSync(R + f, t); console.log(f, ': liens mis à jour', n);
}
patch('app.js', [
  [`crumbs: [["Nos pôles", "/solutions"], [esc(P.nom)]]`, `crumbs: [["Nos solutions", "/solutions"], [esc(P.nom)]]`],
  /* accueil : un seul lien vers Nos solutions (celui de la vitrine) */
  [`\${secHead("Nos pôles", \`Un accompagnement <span class="serif">complet</span>\`, "", \`<a class="btn btn-ghost" href="/solutions">Vue d'ensemble \${ICON.arrow}</a>\`)}`, `\${secHead("Nos pôles", \`Un accompagnement <span class="serif">complet</span>\`)}`]
]);

fs.appendFileSync(R + 'styles.css', `
/* Nouvelle organisation (19 novembre 2026) : outils par pôle, étapes en pastilles, blocs de Notre approche, réalisations déjà en place */
.pg-carte-d { display: grid; gap: 14px; align-content: start; }
.pg-outils { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.pg-outils li > a, .pg-outils li.bientot { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 10px; text-decoration: none; color: var(--ink); background: var(--surface); }
.pg-outils li > a:hover { border-color: var(--c); }
.pg-outils .mk { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 9px; color: #fff; font-size: 13px; font-weight: 500; }
.pg-outils b { display: block; font-weight: 500; }
.pg-outils small { display: block; color: var(--muted); font-size: 13.5px; }
.pg-outils li.bientot { opacity: .8; border-style: dashed; }
.pg-etapes { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.pg-etapes li { padding: 6px 12px; border-radius: 999px; background: var(--surface-2); color: var(--ink); font-size: 14px; }
.pg-carte-d .pg-lien { margin-top: 6px !important; }
.approche-bloc { margin-top: 34px; scroll-margin-top: 110px; }
.approche-bloc .muted { max-width: 70ch; margin: 0 0 16px; }
#bailleurs .btn-row.centre { margin-top: 30px; }
.deja { margin-bottom: 40px; }
.deja .deja-n { display: block; font-size: 40px; font-weight: 300; line-height: 1; color: var(--vert-texte); }
.deja-liste { display: grid; gap: 6px; margin: 8px 0 0; padding: 0; list-style: none; }
.deja-liste a { color: var(--ink); }
`);
console.log('styles.css : nouvelle organisation');
