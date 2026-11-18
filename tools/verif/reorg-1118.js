/* Réorganisation de fond (18 novembre 2026, « certaines choses peuvent disparaître ») :
   - Notre approche, Notre équipe et Soutenir nos actions deviennent des sections de Qui sommes-nous ;
   - Formations rejoint la page Académie ;
   - le bandeau défilant « À la une » disparaît ;
   - menu : Pôles · Solutions · Bailleurs et ONG · Académie · À propos · Nous contacter.
   Les anciennes adresses redirigent (301) vers leur nouvelle place. */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};
const NOUVEAU = { "/approche": "/a-propos#methode", "/equipe": "/a-propos#equipe", "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions" };

/* ---------- 1. Qui sommes-nous : la page qui réunit tout ---------- */
patch('app.js', [[/function teamBand\(surPageEquipe\) \{[\s\S]*?\n\}\n\nfunction pageAbout\(\) \{[\s\S]*?\n\}\n\nfunction pageApproche\(\) \{[\s\S]*?\n\}\n/, `function pageAbout() {
  const membres = DATA.equipe;
  const ongletsPropos = [["mission", "Mission"], ["modele", "Notre modèle"], ["methode", "Notre méthode"], ["equipe", "L'équipe"], ["valeurs", "Nos valeurs"], ["soutenir", "Nous soutenir"], ["faq", "Questions"]];
  const distingue = [
    ["Le but", "Rémunérer ses propriétaires.", "Rendre plus solides ceux que nous accompagnons."],
    ["Qui est servi", "Ceux qui peuvent payer le prix du marché.", "Aussi ceux qui ne le peuvent pas, à tarif solidaire."],
    ["Les excédents", "Distribués aux propriétaires.", "Réinvestis dans nos outils, les relais locaux et le terrain."],
    ["Quand le projet s'arrête", "La prestation s'arrête avec le contrat.", "Nous restons, et le suivi continue."]
  ];
  const voies = [
    [ICON.briefcase, "Confier une mission", "Commencez par un projet pilote : chaque prestation finance aussi nos services à tarif solidaire.", "/conseil#pilote", "Le projet pilote"],
    [ICON.coins, "Apporter du capital", "Ubora Fin oriente votre capital vers les groupes que nous accompagnons, et vous en rend compte.", "/financement#intermediation", "Le rôle d'Ubora Fin"],
    [ICON.handshake, "Devenir partenaire", "Compétences, équipements, mises en relation : dites-nous ce que vous pouvez apporter.", "/contact?sujet=" + encodeURIComponent("Partenariat"), "Proposer un partenariat"],
    [ICON.heart, "Faire un don", "Les dons et les subventions vont à l'association UBORA, qui conduit les projets sans but lucratif.", "/ong", "L'association UBORA"]
  ];
  return pageHead({ eyebrow: "Qui sommes-nous", title: \`Une entreprise sociale, pour que l'effort des familles <span class="serif">porte ses fruits</span>.\`, crumbs: [["Qui sommes-nous"]], photo: ["terrain", "Une communauté réunie en plein air"],
    lead: "Ubora veut dire « excellence » en swahili : c'est ce que nous devons à ceux que nous accompagnons, qui n'ont pas droit à l'erreur." }) + \`
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page">\${ongletsPropos.map(([id, t]) => \`<a href="#\${id}" data-scroll="\${id}">\${t}</a>\`).join("")}</nav></div></section>

  <section id="mission"><div class="wrap two">
    <div><span class="eyebrow">Mission</span>
      <p class="quote">Aider les entreprises et les communautés congolaises à tenir face aux chocs, puis à grandir.</p></div>
    <div class="prose-sm">
      <p>La plupart des entreprises du pays restent informelles et loin du crédit : au moindre choc, elles perdent ce qu'elles ont construit. Nous renforçons ce qui les rend solides : l'organisation, l'épargne, le crédit, les compétences et des outils adaptés au terrain.</p>
    </div>
  </div></section>

  <section class="band" id="modele"><div class="wrap">
    \${secHead("Notre modèle", \`Pourquoi nous avons choisi d'être une <span class="serif">entreprise sociale</span>\`, "Un projet de deux ou trois ans s'arrête quand les progrès commencent. Nous voulions pouvoir rester.")}
    <div class="grid-4">
      <div class="fcard"><span class="ic">\${ICON.briefcase}</span><h3>Qui paie</h3><p>Les organisations qui nous confient des missions : ONG, bailleurs, institutions financières, programmes.</p></div>
      <div class="fcard"><span class="ic">\${ICON.heart}</span><h3>Qui en bénéficie</h3><p>Groupes d'épargne, jeunes, femmes et producteurs ruraux, à tarif solidaire.</p></div>
      <div class="fcard"><span class="ic">\${ICON.coins}</span><h3>Ce que nous mobilisons</h3><p>Par Ubora Fin, le capital des financeurs pour les groupes accompagnés. Ubora Fin ne prête pas.</p></div>
      <div class="fcard"><span class="ic">\${ICON.spark}</span><h3>Ce que nous réinvestissons</h3><p>Nos outils, les relais locaux et le suivi après la fin des projets.</p></div>
    </div>
    <div class="table-wrap"><table class="compare"><thead><tr><th></th><th>Une entreprise classique</th><th>Ubora, entreprise sociale</th></tr></thead>
      <tbody>\${distingue.map(([a, b, c]) => \`<tr><th scope="row">\${a}</th><td>\${b}</td><td class="ok">\${c}</td></tr>\`).join("")}</tbody></table></div>
  </div></section>

  <section id="methode"><div class="wrap">
    \${secHead(METHODE.nom, "Six temps, toujours dans le même ordre", "Pour un groupe d'épargne, un entrepreneur ou une coopérative : seul le contenu change.")}
    <ol class="steps steps-court">\${METHODE.etapes.map((e, i) => \`<li><span class="pn">\${String(i + 1).padStart(2, "0")}</span><h3>\${esc(e.titre)}</h3><p>\${esc(e.texte)}</p></li>\`).join("")}</ol>
  </div></section>

  <section class="band" id="equipe"><div class="wrap">
    \${secHead("L'équipe", \`Des gens de terrain, et des <span class="serif">spécialistes</span>\`)}
    \${profilDirigeant()}
    \${membres.length ? \`<div class="team-grid">\${membres.map(memberCard).join("")}</div>\` : ""}
    <p class="suite"><a class="link" href="/carrieres">Nous rejoindre : offres et candidature spontanée \${ICON.arrow}</a></p>
  </div></section>

  <section id="valeurs"><div class="wrap">
    \${secHead("Nos valeurs", \`Quatre mots <span class="serif">swahili</span> qui nous guident\`)}
    <div class="grid-4">
      <div class="value"><small lang="sw">ubora</small><h3>L'excellence</h3><p>Un travail sérieux et des outils fiables. Nos bénéficiaires ne méritent pas moins.</p></div>
      <div class="value"><small lang="sw">ustahimilivu</small><h3>La résilience</h3><p>Aider les familles et les entreprises à traverser les crises, puis à repartir.</p></div>
      <div class="value"><small lang="sw">uwazi</small><h3>La transparence</h3><p>Des comptes clairs et des données partagées. La confiance se construit ainsi.</p></div>
      <div class="value"><small lang="sw">umoja</small><h3>La solidarité</h3><p>Personne n'est laissé de côté. Les femmes, les jeunes et les zones rurales d'abord.</p></div>
    </div>
    <div class="odd">
      <span><b style="background:#E5243B">1</b> Pas de pauvreté</span><span><b style="background:#DDA63A">2</b> Faim « zéro »</span><span><b style="background:#FF3A21">5</b> Égalité entre les sexes</span>
      <span><b style="background:#A21942">8</b> Travail décent et croissance</span><span><b style="background:#FD6925">9</b> Industrie et innovation</span><span><b style="background:#DD1367">10</b> Inégalités réduites</span>
    </div>
  </div></section>

  <section class="band" id="soutenir"><div class="wrap">
    \${secHead("Nous soutenir", \`Quatre façons d'<span class="serif">agir</span> avec nous\`, "L'entreprise sociale ne reçoit pas de dons : ils vont à l'association UBORA.")}
    <div class="grid-4">\${voies.map(([ic, t, x, lien, lib]) => \`<div class="fcard"><span class="ic">\${ic}</span><h3>\${t}</h3><p>\${x}</p><a class="link" href="\${lien}">\${lib} \${ICON.arrow}</a></div>\`).join("")}</div>
  </div></section>

  <section id="faq"><div class="wrap">\${secHead("Questions fréquentes", "Vous vous demandez peut-être")}\${faq(FAQ)}</div></section>
  <section><div class="wrap">\${finalCta()}</div></section>\`;
}
`]]);

/* ---------- 2. Formations rejoint l'Académie ---------- */
let app = lire('app.js');
const i0 = app.indexOf('function pageFormations() {'), i1 = app.indexOf('\n}\n', i0) + 3;
const formations = app.slice(i0, i1);
const debutSessions = formations.indexOf('  <section class="tight-top"><div class="wrap">\n    ${secHead("Prochaines sessions"');
const finSessions = formations.indexOf('  <section class="band"><div class="wrap">\n    ${secHead("Ce que nous enseignons"');
if (debutSessions < 0 || finSessions < 0) throw new Error('blocs de la page Formations introuvables');
const sessions = formations.slice(debutSessions, finSessions)
  .replace('  <section class="tight-top"><div class="wrap">\n    ${secHead("Prochaines sessions", "Le calendrier")}', '  <section id="sessions"><div class="wrap">\n    ${secHead("Sur place", "Sessions et formations à la demande", "Dans votre province ou en ligne, pour vos équipes et vos relais.")}');
const bloc = `/* Formations sur place : le calendrier des sessions et ce que nous enseignons (page Académie) */
function blocFormations() {
  const t = todayISO();
  const sessions = [...DATA.formations].filter(f => f.date >= t).sort((a, b) => a.date.localeCompare(b.date));
  return \`${sessions.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}    <ul class="catalogue">\${CATALOGUE.map(([t, pid]) => { const p = pole(pid); return \`<li style="--c:\${p.couleur}"><span class="tag" style="background:\${p.couleur};color:#fff">\${esc(p.nom)}</span>\${esc(t)}</li>\`; }).join("")}</ul>
  </div></section>\`;
}
`;
app = app.slice(0, i0) + bloc + app.slice(i1);
/* le bloc copié referme sa section sur la liste du catalogue : on retire la fermeture d'origine avant le catalogue */
app = app.replace(bloc, bloc.replace(/  <\/div><\/section>\n    <ul class="catalogue">/, '    <ul class="catalogue">'));
fs.writeFileSync(R + 'app.js', app); console.log('app.js : formations → académie');
patch('app.js', [
  [`  \${boiteOutils(P.boite, P.boite ? P.boite.titre : P.nom)}

  <section><div class="wrap">\${finalCta()}</div></section>\`;
}`, `  \${boiteOutils(P.boite, P.boite ? P.boite.titre : P.nom)}

  \${P.id === "academie" ? blocFormations() : ""}

  <section><div class="wrap">\${finalCta()}</div></section>\`;
}`],
  [`["outils", (P.outils || []).length ? "Outils et publics" : "Nos publics"], P.boite && P.boite.statut === "disponible" && ["boite", "Boîte à outils"]`,
   `["outils", (P.outils || []).length ? "Outils et publics" : "Nos publics"], P.boite && P.boite.statut === "disponible" && ["boite", "Boîte à outils"], P.id === "academie" && ["sessions", "Sur place"]`]
]);

/* ---------- 3. Pages fusionnées : plus de génération, redirections ---------- */
patch('app.js', [
  [/\nfunction pageEquipe\(\) \{[\s\S]*?\n\}\n/, `\n`],
  [/\n\/\* Soutenir nos actions : [^\n]*\nfunction pageSoutenir\(\) \{[\s\S]*?\n\}\n/, `\n`],
  [`    case "approche": html = pageApproche(); break;\n`, ``],
  [`    case "formations": html = pageFormations(); break;\n`, ``],
  [`    case "equipe": html = pageEquipe(); break;\n`, ``],
  [`    case "soutenir": html = pageSoutenir(); break;\n`, ``],
  [`"solutions": "/outils", "services": "/conseil", "diagnostic": "/contact", "rediger": "/admin", "hub": "/outils/hub"`,
   `"solutions": "/outils", "services": "/conseil", "diagnostic": "/contact", "rediger": "/admin", "hub": "/outils/hub",
  "approche": "/a-propos#methode", "equipe": "/a-propos#equipe", "soutenir": "/a-propos#soutenir", "formations": "/academie#sessions"`]
]);
patch('worker.js', [[`"/rediger": "https://admin.uborardc.com/", "/admin": "https://admin.uborardc.com/", "/hub": "/outils/hub"`,
  `"/rediger": "https://admin.uborardc.com/", "/admin": "https://admin.uborardc.com/", "/hub": "/outils/hub",
  /* pages fusionnées le 18 novembre 2026 */
  "/approche": "/a-propos#methode", "/equipe": "/a-propos#equipe", "/soutenir": "/a-propos#soutenir", "/formations": "/academie#sessions"`]]);
patch('tools/prerender.js', [[/"\/approche", "\/a-propos", "\/outils", "\/conseil", "\/formations", "\/actualites", "\/realisations", "\/equipe", "\/carrieres", "\/contact", "\/soutenir", /,
  `"/a-propos", "/outils", "/conseil", "/actualites", "/realisations", "/carrieres", "/contact", `]]);
for (const f of ['approche.html', 'equipe.html', 'soutenir.html', 'formations.html']) if (fs.existsSync(R + f)) { fs.unlinkSync(R + f); console.log('supprimé :', f); }

/* ---------- 4. Menu ---------- */
patch('app.js', [
  [`    <li><a href="/formations" data-r="formations">Formations</a></li>`, `    <li><a href="/academie" data-r="academie">Académie</a></li>`],
  [`        <a href="/approche"><b>Notre approche</b><small>La méthode Ubora</small></a>
        <a href="/equipe"><b>Notre équipe</b><small>Les personnes derrière Ubora</small></a>`, `        <a href="/a-propos#methode"><b>Notre méthode</b><small>Six temps, toujours dans le même ordre</small></a>
        <a href="/a-propos#equipe"><b>L'équipe</b><small>Les personnes derrière Ubora</small></a>`],
  [`        <a href="/soutenir"><b>Soutenir nos actions</b><small>Une entreprise à objectif social</small></a>`, `        <a href="/a-propos#soutenir"><b>Nous soutenir</b><small>Une entreprise à objectif social</small></a>`],
  [`(a.dataset.r === "poles" && !!pole(r.base)) || (a.dataset.r === "a-propos" && ["a-propos", "approche", "carrieres", "equipe", "ong", "soutenir", "realisations", "actualites"].includes(r.base))`,
   `(a.dataset.r === "poles" && !!pole(r.base) && r.base !== "academie") || (a.dataset.r === "a-propos" && ["a-propos", "carrieres", "ong", "realisations", "actualites"].includes(r.base))`]
]);

/* ---------- 5. Liens restants vers les anciennes pages ---------- */
for (const f of ['app.js', 'chat.js', 'data.js']) {
  let t = lire(f), n = 0;
  for (const [a, b] of Object.entries(NOUVEAU)) t = t.replace(new RegExp(`(["'(])${a.replace('/', '\\/')}(["')#?])`, 'g'), (m, g1, g2) => { n++; return g1 + b + (g2 === '#' || g2 === '?' ? '' : g2); });
  fs.writeFileSync(R + f, t); console.log(f, ': liens mis à jour', n);
}
patch('chat.js', [[`basés à Lubumbashi`, `présents partout en RDC`]]);

/* ---------- 6. Bandeau défilant retiré ---------- */
patch('tools/shell.html', [[/\n  <div class="ticker">[\s\S]*?\n  <\/div>\n<\/header>/, `\n</header>`]]);

fs.appendFileSync(R + 'styles.css', `
/* Réorganisation (18 novembre 2026) : méthode en version courte, catalogue de l'Académie, en-tête sans bandeau défilant */
.steps.steps-court { grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 900px) { .steps.steps-court { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .steps.steps-court { grid-template-columns: 1fr; } }
#modele .table-wrap { margin-top: 26px; }
#equipe .dirigeant { margin-top: 8px; }
.catalogue { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 22px; margin: 26px 0 0; padding: 0; list-style: none; }
@media (max-width: 700px) { .catalogue { grid-template-columns: 1fr; } }
.catalogue li { display: flex; align-items: baseline; gap: 10px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--c); border-radius: 8px; }
.catalogue .tag { flex: none; font-size: 11.5px; }
`);
console.log('styles.css : réorganisation');
