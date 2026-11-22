/* ==========================================================================
   UBORA — Moteur de traduction de la version anglaise (uborardc.com/en/…)
   Les pages sont écrites en français dans app.js ; ce moteur remplace chaque
   bloc de texte par sa traduction (dictionnaire tools/en.json) et fait pointer
   les liens internes vers /en/. Un texte absent du dictionnaire reste en
   français (la commande « node tools/prerender.js » liste les manquants).
   Ce fichier est recopié dans i18n.js, avec le dictionnaire, par le pré-rendu.
   ========================================================================== */
const BLOCS_I18N = new Set(("address article aside blockquote body button canvas caption dd details dialog div dl dt fieldset figcaption figure footer form " +
  "h1 h2 h3 h4 h5 h6 head header hr html iframe img input label legend li link main meta nav noscript ol optgroup option p picture pre section select " +
  "source summary table tbody td template textarea tfoot th thead title tr track ul video audio").split(" "));
const OPAQUES_I18N = new Set(["svg", "script", "style", "code", "pre"]);
const VIDES_I18N = new Set(["br", "wbr", "img", "input", "hr", "meta", "link", "source", "track", "area", "col", "embed", "param"]);
const ATTRS_I18N = /(\s(?:alt|title|aria-label|placeholder|data-plus|data-l|content)=")([^"]*)(")/g;
/* liens internes vers une page (pas vers un fichier, l'espace équipe ou un article, qui n'existe qu'en français) */
const PAGE_I18N = /^\/(?!en(?:[/?#]|$)|img\/|lib\/|polices\/|generateur|admin|api\/|_v|actualites\/[^?#]|[^?#]*\.[a-z0-9]{2,5}(?:[?#]|$))/i;

function enAnglais(href) {
  if (!PAGE_I18N.test(href) && href !== "/" && !/^\/[?#]/.test(href)) return href;
  return href === "/" ? "/en" : /^\/[?#]/.test(href) ? "/en" + href.slice(1) : "/en" + href;
}

const normI18N = s => s.replace(/\s+/g, " ").trim();
const aDesLettres = s => /[A-Za-zÀ-ÿ]/.test(s.replace(/&[a-z#0-9]+;/gi, ""));

/* traduire(html, manquants?) : renvoie le html traduit ; « manquants » (un Set) reçoit les textes absents du dictionnaire */
function traduire(html, manquants) {
  if (html == null) return html;
  const D = typeof EN_I18N === "object" ? EN_I18N : {};
  const morceaux = String(html).split(/(<!--[\s\S]*?-->|<[^>]*>)/);
  const sortie = [];
  let run = [], opaque = null, profondeurOpaque = 0;

  const traduireAttrs = tag => tag
    .replace(ATTRS_I18N, (m, a, v, z) => { const k = normI18N(v); if (!k || !aDesLettres(k)) return m; if (D[k] != null) return a + D[k] + z; if (manquants && !/^(width=|text\/|image\/|#|https?:|summary|website|article|index|noindex)/.test(k)) manquants.add(k); return m; });

  const tagNom = t => (/^<\/?([a-zA-Z0-9-]+)/.exec(t) || [])[1]?.toLowerCase();
  const estOuvrant = t => !t.startsWith("</") && !t.startsWith("<!");
  const autoFerme = t => /\/>$/.test(t);

  function vider() {
    if (!run.length) return;
    const textes = run.map((m, i) => (m.t === "x" && /\S/.test(m.s)) ? i : -1).filter(i => i >= 0);
    if (!textes.length) { run.forEach(m => sortie.push(m.t === "g" ? traduireAttrs(m.s) : m.s)); run = []; return; }
    const i = textes[0], j = textes[textes.length - 1];
    /* les balises d'un bloc sont-elles équilibrées ? (sinon on traduit chaque texte séparément) */
    let pile = [], ok = true;
    for (let k = i; k <= j; k++) {
      const m = run[k]; if (m.t !== "g") continue;
      const n = tagNom(m.s); if (!n || VIDES_I18N.has(n) || autoFerme(m.s) || m.s.startsWith("<!")) continue;
      if (estOuvrant(m.s)) pile.push(n); else if (pile[pile.length - 1] === n) pile.pop(); else { ok = false; break; }
    }
    if (pile.length) ok = false;
    const avant = run.slice(0, i).map(m => m.t === "g" ? traduireAttrs(m.s) : m.s).join("");
    const apres = run.slice(j + 1).map(m => m.t === "g" ? traduireAttrs(m.s) : m.s).join("");
    const premier = run[i].s, dernier = run[j].s;
    const blancDebut = premier.match(/^\s*/)[0], blancFin = dernier.match(/\s*$/)[0];
    const cleBrute = run.slice(i, j + 1).map(m => m.s).join("");
    const cle = normI18N(cleBrute);
    let milieu;
    if (ok && D[cle] != null) milieu = blancDebut + D[cle] + blancFin;
    else {
      if (ok && manquants && aDesLettres(cle)) manquants.add(cle);
      milieu = run.slice(i, j + 1).map(m => {
        if (m.t === "g") return traduireAttrs(m.s);
        const k = normI18N(m.s); if (!k) return m.s;
        if (D[k] != null) return m.s.match(/^\s*/)[0] + D[k] + m.s.match(/\s*$/)[0];
        if (!ok && manquants && aDesLettres(k)) manquants.add(k);
        return m.s;
      }).join("");
    }
    sortie.push(avant + milieu + apres);
    run = [];
  }

  for (const s of morceaux) {
    if (s === "") continue;
    const estTag = s.startsWith("<") && s.length > 1 && /^<[a-zA-Z/!]/.test(s);
    if (opaque) {
      sortie.push(s);
      if (estTag && tagNom(s) === opaque) { if (estOuvrant(s) && !autoFerme(s)) profondeurOpaque++; else if (!estOuvrant(s)) profondeurOpaque--; }
      if (profondeurOpaque === 0) opaque = null;
      continue;
    }
    if (!estTag) { run.push({ t: "x", s }); continue; }
    if (s.startsWith("<!--")) { run.push({ t: "c", s }); continue; }
    const n = tagNom(s);
    if (OPAQUES_I18N.has(n) && estOuvrant(s)) {
      vider(); sortie.push(traduireAttrs(s));
      if (!autoFerme(s)) { opaque = n; profondeurOpaque = 1; }
      continue;
    }
    if (BLOCS_I18N.has(n) || OPAQUES_I18N.has(n)) { vider(); sortie.push(traduireAttrs(s)); continue; }
    run.push({ t: "g", s });
  }
  vider();
  /* liens internes vers les pages anglaises, y compris ceux qui sont dans un texte traduit (sans effet sur un lien déjà en /en) */
  return sortie.join("").replace(/(<a\b[^>]*\shref=")([^"]*)(")/g, (m, a, v, z) => a + enAnglais(v) + z);
}
