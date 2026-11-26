/* Vérifie qu'aucune adresse d'un plan du site n'est interdite par le robots.txt de son domaine
   (cause de « Bloquée par le fichier robots.txt » dans la Search Console).
   node tools/verif/robots-sitemaps.mjs */
const HOTES = ["uborardc.com", "akiba.uborardc.com", "akibas.uborardc.com", "hub.uborardc.com", "academie.uborardc.com", "asbl.uborardc.com", "bp.uborardc.com", "uborardc.org"];
const lire = async u => { try { const r = await fetch(u, { signal: AbortSignal.timeout(12000), redirect: "follow" }); return r.ok ? await r.text() : ""; } catch (e) { return ""; } };
/* règles pour « * » (Google applique la règle la plus longue ; à longueur égale, Allow l'emporte) */
function regles(txt) {
  const out = []; let actif = false;
  for (const l of txt.split(/\r?\n/)) {
    const [k, ...v] = l.replace(/#.*/, "").split(":"); const cle = (k || "").trim().toLowerCase(), val = v.join(":").trim();
    if (cle === "user-agent") actif = val === "*";
    else if (actif && (cle === "allow" || cle === "disallow") && val) out.push([cle, val]);
  }
  return out;
}
const motif = p => new RegExp("^" + p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$"));
function autorise(R, chemin) {
  let meilleur = null;
  for (const [t, p] of R) if (motif(p).test(chemin) && (!meilleur || p.length > meilleur[1].length || (p.length === meilleur[1].length && t === "allow"))) meilleur = [t, p];
  return !meilleur || meilleur[0] === "allow" ? null : meilleur[1];
}
const vus = new Set(); let bloquees = 0, total = 0;
async function plan(url, R0) {
  if (vus.has(url)) return; vus.add(url);
  const x = await lire(url);
  for (const loc of [...x.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1])) {
    if (/sitemap[^/]*\.xml$/.test(loc) && x.includes("<sitemapindex")) { await plan(loc); continue; }
    const u = new URL(loc); total++;
    const R = cache[u.host] || (cache[u.host] = regles(await lire(`https://${u.host}/robots.txt`)));
    const regle = autorise(R, u.pathname + u.search);
    if (regle) { bloquees++; console.log(`BLOQUÉE  ${loc}  (Disallow: ${regle}, plan ${url})`); }
  }
}
const cache = {};
for (const h of HOTES) {
  const rob = await lire(`https://${h}/robots.txt`); cache[h] = regles(rob);
  const plans = [...rob.matchAll(/^sitemap:\s*(\S+)/gim)].map(m => m[1]);
  for (const p of plans.length ? plans : [`https://${h}/sitemap.xml`]) await plan(p);
}
console.log(`${total} adresses dans les plans du site, ${bloquees} bloquée(s) par robots.txt.`);
