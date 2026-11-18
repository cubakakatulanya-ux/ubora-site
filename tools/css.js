/* ==========================================================================
   UBORA — Feuille de style servie aux visiteurs (styles.min.css)
   Lit styles.css (la source, lisible, celle qu'on modifie) et produit une version
   allégée, sans changer l'affichage :
   1. retire les sélecteurs qui visent une classe ou un identifiant absent de tout
      le code du site (app.js, admin.js, chat.js, data.js, db.js, theme.js,
      tools/shell.html) ; le contenu de :not() ne compte pas, et dans le doute on garde ;
   2. retire une déclaration quand le même sélecteur redéclare plus loin la même
      propriété dans le même contexte (même @media) : seule la dernière s'appliquait ;
   3. compacte le tout.
   Lancé par tools/prerender.js à chaque génération ; à la main : node tools/css.js
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

/* découpe au premier niveau (hors parenthèses, crochets et guillemets) */
function decouper(s, sep) {
  const out = []; let prof = 0, cur = "", q = null;
  for (const ch of s) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === "(" || ch === "[") prof++;
    if (ch === ")" || ch === "]") prof--;
    if (ch === sep && !prof) { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim()).filter(Boolean);
}

function analyser(css) {
  let i = 0;
  function bloc(ctx) {
    const noeuds = [];
    while (i < css.length) {
      const fin = css.indexOf("}", i), ouvre = css.indexOf("{", i);
      if (fin !== -1 && (ouvre === -1 || fin < ouvre)) { i = fin + 1; return noeuds; }
      if (ouvre === -1) { i = css.length; break; }
      const prelude = css.slice(i, ouvre).trim().replace(/\s+/g, " ");
      i = ouvre + 1;
      if (/^@(media|supports|layer|container)/.test(prelude)) { noeuds.push({ type: "groupe", prelude, enfants: bloc(prelude) }); continue; }
      let prof = 1, j = i;
      while (j < css.length && prof) { if (css[j] === "{") prof++; else if (css[j] === "}") prof--; j++; }
      const corps = css.slice(i, j - 1); i = j;
      if (prelude.startsWith("@")) { noeuds.push({ type: "brut", prelude, corps }); continue; }
      const decls = decouper(corps, ";").map(d => { const k = d.indexOf(":"); if (k < 0) return null; const prop = d.slice(0, k).trim().toLowerCase(), val = d.slice(k + 1).trim(); return { prop, val, imp: /!important\s*$/i.test(val) }; }).filter(Boolean);
      noeuds.push({ type: "regle", sels: decouper(prelude, ","), decls, ctx });
    }
    return noeuds;
  }
  return bloc("");
}

function construire() {
  const source = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
  const code = ["app.js", "admin.js", "chat.js", "data.js", "db.js", "theme.js", "tools/shell.html"].map(f => fs.readFileSync(path.join(ROOT, f), "utf8")).join("\n");
  const mots = new Set(code.match(/[A-Za-z_][\w-]*/g));
  const arbre = analyser(source.replace(/\/\*[\s\S]*?\*\//g, ""));
  const st = { selecteurs: 0, declarations: 0 };

  /* 1. sélecteurs inutiles */
  const utile = sel => { const s = sel.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, "").replace(/\[[^\]]*\]/g, ""); return [...s.matchAll(/[.#](-?[A-Za-z_][\w-]*)/g)].every(m => mots.has(m[1])); };
  const regles = [];
  (function parcourir(n) { for (const x of n) { if (x.type === "groupe") parcourir(x.enfants); else if (x.type === "regle") { const avant = x.sels.length; x.sels = x.sels.filter(utile); st.selecteurs += avant - x.sels.length; regles.push(x); } } })(arbre);

  /* 2. déclarations écrasées plus loin par le même sélecteur, dans le même contexte */
  const derniere = new Map(); /* « contexte | sélecteur | propriété » -> importance de la dernière déclaration rencontrée */
  for (let r = regles.length - 1; r >= 0; r--) {
    const x = regles[r];
    if (!x.sels.length) continue;
    x.decls = x.decls.filter(d => {
      if (d.prop.startsWith("--") === false && !/^[a-z-]+$/.test(d.prop)) return true;
      const ecrasee = x.sels.every(s => { const k = x.ctx + "|" + s.replace(/\s+/g, " ") + "|" + d.prop; return derniere.has(k) && (derniere.get(k) || !d.imp); });
      if (ecrasee) { st.declarations++; return false; }
      return true;
    });
    for (const s of x.sels) for (const d of x.decls) { const k = x.ctx + "|" + s.replace(/\s+/g, " ") + "|" + d.prop; if (!derniere.has(k) || d.imp) derniere.set(k, derniere.get(k) || d.imp); }
  }

  /* 3. écriture compacte */
  const compacter = v => v.replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").replace(/\s*!important/i, "!important");
  const ecrire = n => n.map(x => {
    if (x.type === "groupe") { const d = ecrire(x.enfants); return d ? x.prelude.replace(/\s*:\s*/g, ":") + "{" + d + "}" : ""; }
    if (x.type === "brut") return x.prelude + "{" + x.corps.replace(/\s+/g, " ").replace(/\s*([:;,{}])\s*/g, "$1").replace(/;}/g, "}").trim() + "}";
    if (!x.sels.length || !x.decls.length) return "";
    return x.sels.map(s => s.replace(/\s+/g, " ").replace(/\s*([>+~])\s*/g, "$1")).join(",") + "{" + x.decls.map(d => d.prop + ":" + compacter(d.val)).join(";") + "}";
  }).join("");
  const min = ecrire(arbre);
  fs.writeFileSync(path.join(ROOT, "styles.min.css"), min + "\n");
  return { avant: Buffer.byteLength(source), apres: Buffer.byteLength(min), ...st };
}

module.exports = construire;
if (require.main === module) {
  const r = construire();
  console.log(`styles.min.css : ${Math.round(r.avant / 1024)} Ko → ${Math.round(r.apres / 1024)} Ko (${r.selecteurs} sélecteurs inutilisés et ${r.declarations} déclarations écrasées retirés)`);
}
