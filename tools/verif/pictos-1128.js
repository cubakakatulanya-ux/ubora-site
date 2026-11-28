/* Domaines et applications mieux présentés (28 novembre 2026, demande « Bien présenter ceci ») :
   - un pictogramme à la place des deux lettres (« Av », « Pm »…) partout où un domaine ou une application a sa pastille ;
   - menu « Nos solutions » : les six domaines en deux colonnes, Ubora Académie sur toute la largeur (elle sert tous les domaines),
     les applications avec une vignette de leur vrai écran et le signe « s'ouvre dans un autre site » ;
   - Ubora Fin : une accroche fidèle à son rôle (elle ne prête pas, elle mobilise le capital) et une couleur ocre au lieu du bleu.
   Usage : node tools/verif/pictos-1128.js <dossier du site>/ */
const fs = require('fs');
const R = process.argv[2];
const patch = (f, paires) => {
  let a = fs.readFileSync(R + f, 'utf8');
  const crlf = a.includes('\r\n'), nl = t => crlf ? t.replace(/\r?\n/g, '\r\n') : t;
  for (let [x, y, tous] of paires) {
    x = nl(x); y = nl(y);
    if (!a.includes(x)) throw new Error(f + ' : introuvable : ' + x.slice(0, 90));
    a = tous ? a.split(x).join(y) : a.replace(x, () => y);
  }
  fs.writeFileSync(R + f, a);
  console.log(f + ' : ' + paires.length + ' modification(s)');
};

patch('data.js', [
  [`    accroche: "Le crédit, jusqu'où il n'allait pas.",`, `    accroche: "Le capital, jusqu'à ceux qu'il n'atteignait pas.",`],
  [`    nom: "Ubora Fin", initiales: "Fi", couleur: "#1D5FB8",`, `    nom: "Ubora Fin", initiales: "Fi", couleur: "#8A6810",`]
]);

patch('app.js', [
  /* trois pictogrammes de plus */
  [`  doc: sv(`, `  store: sv('<path d="M4 10v10h16V10"/><path d="M3 4h18l-1.4 5.2a2.6 2.6 0 0 1-5 .1 2.6 2.6 0 0 1-5.2 0 2.6 2.6 0 0 1-5.2 0 2.6 2.6 0 0 1-.6-.1z"/><path d="M10 20v-5h4v5"/>'),
  leaf: sv('<path d="M5 20c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 20l9-9"/>'),
  chart: sv('<path d="M3 20h18"/><path d="M6 16v-5M11 16V6M16 16v-8M21 16V9"/>'),
  doc: sv(`],
  /* le pictogramme d'un domaine ou d'une application ; les initiales ne servent plus qu'en dernier recours */
  [`/* ---------- Utilitaires ---------- */`, `/* pictogramme d'un domaine ou d'une application, à la place des deux lettres */
const PICTOS = { avec: "coins", pme: "briefcase", cooperatives: "users", financement: "handshake", marche: "store", vert: "leaf", academie: "school", conseil: "compass",
  akiba: "phoneM", "akiba-suivi": "chart", bp: "doc", hub: "flow", asbl: "seat", "logiciel-coop": "users", "plateforme-market": "store", agrolab: "leaf", biashara: "briefcase" };
const picto = x => ICON[PICTOS[(x || {}).id]] || esc((x || {}).initiales);

/* ---------- Utilitaires ---------- */`],
  [`<div class="pole-top"><span class="mk">\${esc(p.initiales)}</span>`, `<div class="pole-top"><span class="mk">\${picto(p)}</span>`],
  [`<div class="pole-top"><span class="mk">\${esc(o.initiales)}</span>`, `<div class="pole-top"><span class="mk">\${picto(o)}</span>`],
  [`<div class="real-img real-cover"><span class="mk">\${esc(p.initiales)}</span></div>`, `<div class="real-img real-cover"><span class="mk">\${picto(p)}</span></div>`],
  [`style="--c:\${p.couleur}"><span class="mk">\${esc(p.initiales)}</span><b>`, `style="--c:\${p.couleur}"><span class="mk">\${picto(p)}</span><b>`],
  [`<span class="mk" style="background:\${o.couleur}">\${esc(o.initiales)}</span>`, `<span class="mk" style="background:\${o.couleur}">\${picto(o)}</span>`, true],
  [`<div class="bientot-img" aria-hidden="true"><span class="mk">\${esc(o.initiales)}</span>`, `<div class="bientot-img" aria-hidden="true"><span class="mk">\${picto(o)}</span>`],
  /* le menu « Nos solutions » */
  [`  const item = (h, b, s, c, ini, externe) => \`<a href="\${h}"\${externe ? ' target="_blank" rel="noopener"' : ""} class="dd-item"><span class="mk" style="background:\${c}">\${esc(ini)}</span><span><b>\${esc(b)}</b><small>\${esc(s || "")}</small></span></a>\`;`,
   `  const domaine = p => \`<a href="\${p.chemin}" class="dd-item dd-domaine\${p.transversal ? " large" : ""}" style="--c:\${p.couleur}"><span class="dd-picto">\${picto(p)}</span><span><b>\${esc(p.nom)}\${p.transversal ? '<em class="dd-tag">Pour tous les domaines</em>' : ""}</b><small>\${esc(p.accroche)}</small></span></a>\`;
  const appli = o => \`<a href="\${o.url}" target="_blank" rel="noopener" class="dd-item dd-appli"><img class="dd-ecran" src="/img/solutions/\${o.id}-160.webp" alt="" width="64" height="40" loading="lazy" decoding="async"><span><b>\${esc(o.nom)} \${ICON.ext}</b><small>\${esc(o.court || "")}</small></span></a>\`;`],
  [`<div class="dd-grille">\${POLES.map(p => item(p.chemin, p.nom, p.accroche, p.couleur, p.initiales)).join("")}</div></div>`,
   `<div class="dd-grille">\${POLES.map(domaine).join("")}</div></div>`],
  [`<h5>Applications en ligne</h5>\${enLigne.map(o => item(o.url, o.nom, o.court, o.couleur, o.initiales, true)).join("")}</div>`,
   `<h5>Applications en ligne</h5>\${enLigne.map(appli).join("")}</div>`]
]);

fs.appendFileSync(R + 'styles.css', (t => t.replace(/\r?\n/g, '\r\n'))(`
/* ==========================================================================
   Domaines et applications (28 novembre 2026) : pictogrammes au lieu des initiales,
   menu « Nos solutions » avec vignettes des vrais écrans et Ubora Académie sur toute la largeur
   ========================================================================== */
.mk svg { width: 54%; height: 54%; }
.dd-picto { width: 36px; height: 36px; flex: none; display: grid; place-items: center; border-radius: 10px;
  color: var(--c); background: color-mix(in srgb, var(--c) 13%, transparent); transition: background .2s, color .2s; }
.dd-picto svg { width: 19px; height: 19px; }
.dd-domaine:hover .dd-picto, .dd-domaine:focus-visible .dd-picto { background: var(--c); color: #fff; }
:root[data-theme="dark"] .dd-picto { color: color-mix(in srgb, var(--c) 55%, #fff); background: color-mix(in srgb, var(--c) 30%, transparent); }
.dd-tag { margin-left: 2px; padding: 1px 7px; border-radius: 999px; font: 500 11px/1.6 var(--f-body); font-style: normal; color: var(--vert-texte); background: color-mix(in srgb, var(--green) 12%, transparent); }
.dd-grille .dd-domaine.large { margin-top: 4px; padding-top: 12px; border-top: 1px solid var(--bord-fin, var(--line)); border-radius: 0 0 10px 10px; }
.dd-ecran { width: 64px; height: 40px; flex: none; object-fit: cover; object-position: top center; border-radius: 6px;
  border: 1px solid var(--bord-fin, var(--line)); background: var(--surface-2); box-shadow: 0 1px 2px rgba(16, 24, 40, .06); }
.dd-appli b svg { width: 12px; height: 12px; opacity: .5; vertical-align: -1px; }
.dd-appli:hover .dd-ecran { border-color: color-mix(in srgb, var(--green) 45%, var(--line)); }
@media (max-width: 1100px) {
  .dd-ecran { width: 56px; height: 35px; }
  .dd-grille .dd-domaine.large { border-top: 0; margin-top: 0; padding-top: 9px; }
}
`));
console.log('styles.css : couche « domaines et applications »');
