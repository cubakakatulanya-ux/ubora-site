/* Pages plus légères (18 novembre 2026) : la bibliothèque Supabase et le code de l'espace équipe
   ne sont plus chargés sur les pages publiques. Les lectures et les formulaires passent par des
   requêtes directes à la base (même clé publique, mêmes règles d'accès) ; la bibliothèque n'est
   chargée que pour l'espace équipe, à la demande, avec son empreinte SRI. */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { const x = a instanceof RegExp ? (a.exec(t) || [])[0] : a; if (!x || !t.includes(x)) throw new Error(f + ' introuvable : ' + String(a).slice(0, 90)); t = t.replace(x, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};
const SRI = 'sha384-GFr3yTh5lJznCbZfpTtXnwboFsxqtTQoeTZCRHhE0579KrRmlCzen5AA8ohaB5ug';

patch('db.js', [
  [`  function sb() {
    if (!configured() || typeof window === "undefined" || !window.supabase) return null;
    if (!client) client = window.supabase.createClient(SUPABASE.url, SUPABASE.anonKey, { auth: { persistSession: true, storageKey: "ubora-admin" } });
    return client;
  }`, `  /* la bibliothèque Supabase n'est chargée qu'à la demande (espace équipe), avec son empreinte SRI */
  let chargement = null;
  function bibliotheque() {
    if (typeof window === "undefined" || typeof document === "undefined" || !document.createElement) return Promise.resolve(null);
    if (window.supabase) return Promise.resolve(window.supabase);
    if (!chargement) chargement = new Promise(ok => {
      const s = document.createElement("script");
      s.src = "/lib/supabase-2.45.4.min.js"; s.integrity = "${SRI}";
      s.onload = () => ok(window.supabase || null);
      s.onerror = () => { chargement = null; ok(null); };
      document.head.appendChild(s);
    });
    return chargement;
  }
  async function sb() {
    if (!configured()) return null;
    const lib = await bibliotheque(); if (!lib) return null;
    if (!client) client = lib.createClient(SUPABASE.url, SUPABASE.anonKey, { auth: { persistSession: true, storageKey: "ubora-admin" } });
    return client;
  }
  const pret = async () => !!(await sb());

  /* pages publiques : requêtes directes à la base, sans bibliothèque (même clé publique, mêmes règles d'accès) */
  const entetes = () => ({ apikey: SUPABASE.anonKey, Authorization: "Bearer " + SUPABASE.anonKey });
  async function lireTable(table, ordre) {
    const r = await fetch(\`\${SUPABASE.url}/rest/v1/\${table}?select=*&publie=eq.true&order=\${ordre}\`, { headers: entetes() });
    if (!r.ok) throw new Error(table + " : " + r.status);
    return r.json();
  }
  async function deposer(table, ligne) {
    try {
      const r = await delai(fetch(\`\${SUPABASE.url}/rest/v1/\${table}\`, { method: "POST", headers: { ...entetes(), "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(ligne) }));
      if (r && r.error) return r;
      if (r.ok) return { error: null };
      let e = {}; try { e = await r.json(); } catch (x) {}
      return { error: { code: e.code, message: e.message || "HTTP " + r.status } };
    } catch (e) { return { error: { message: String((e && e.message) || e) } }; }
  }`],
  [/  async function load\(\) \{\n    const c = sb\(\); if \(!c\) return DATA;\n    try \{\n      const \[a, f, o, e, r\] = await Promise\.all\(\[[\s\S]*?\n    \} catch \(e\) \{ console\.warn\("Ubora : base indisponible\.", e\); \}\n    return DATA;\n  \}/,
   `  async function load() {
    if (!configured() || typeof fetch === "undefined" || typeof window === "undefined" || window.UBORA_PRERENDER) return DATA;
    const lu = await Promise.allSettled([lireTable("site_actualites", "date.desc"), lireTable("site_formations", "date.asc"), lireTable("site_offres", "publie_le.desc"),
      lireTable("site_equipe", "ordre.asc,nom.asc"), lireTable("site_realisations", "ordre.asc,created_at.desc")]);
    const [a, f, o, e, r] = lu.map(x => x.status === "fulfilled" ? x.value : null);
    if (a) DATA.actualites = a.map(fromNews);
    if (f) DATA.formations = f.map(fromTrain);
    if (o) DATA.offres = o.map(fromJob);
    if (e) DATA.equipe = e.map(fromMember);
    if (r) DATA.realisations = r.map(fromReal);
    if (lu.some(x => x.status === "fulfilled")) DATA.source = "base"; else console.warn("Ubora : base indisponible.");
    return DATA;
  }`],
  [`  async function sendMessage(m) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await delai(c.from("site_messages").insert([m]));
    return { ok: !error, error, limite: limite(error) };
  }
  async function logQuestion(q) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await delai(c.from("site_questions").insert([q]));
    return { ok: !error, error };
  }
  async function subscribe(email) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await delai(c.from("site_abonnes").insert([{ email: email.toLowerCase() }]));
    return { ok: !error || error.code === "23505", error, limite: limite(error) };
  }`, `  async function sendMessage(m) {
    if (!configured()) return { ok: false };
    const { error } = await deposer("site_messages", m);
    return { ok: !error, error, limite: limite(error) };
  }
  async function logQuestion(q) {
    if (!configured()) return { ok: false };
    const { error } = await deposer("site_questions", q);
    return { ok: !error, error };
  }
  async function subscribe(email) {
    if (!configured()) return { ok: false };
    const { error } = await deposer("site_abonnes", { email: email.toLowerCase() });
    return { ok: !error || error.code === "23505", error, limite: limite(error) };
  }`]
]);
/* les fonctions de l'espace équipe attendent la bibliothèque */
let db = lire('db.js');
const avant = (db.match(/= sb\(\)/g) || []).length;
db = db.split('= sb()').join('= await sb()');
db = db.replace('return { configured, mappers, load,', 'return { configured, pret, mappers, load,');
fs.writeFileSync(R + 'db.js', db); console.log('db.js : appels à la bibliothèque attendus :', avant);
/* « delai » est défini plus bas que « deposer » : il doit exister avant le premier envoi, ce qui est le cas (appel à l'exécution) */

patch('admin.js', [[`if (!UboraDB.configured() || !window.supabase) {`, `if (!UboraDB.configured() || !(await UboraDB.pret())) {`]]);

patch('tools/shell.html', [
  [`<script src="/lib/supabase-2.45.4.min.js" integrity="${SRI}"></script>\n`, ``],
  [`<script src="/admin.js?v={{VERSION}}"></script>\n`, ``]
]);

patch('app.js', [[`function boot() {\n`, `function boot() {
  /* l'espace équipe charge son code à la demande (les pages publiques ne le téléchargent pas) */
  if (typeof pageAdmin !== "function" && (/^admin\\./.test(location.hostname) || location.pathname.replace(/\\/+$/, "") === "/admin")) {
    const v = ((document.querySelector('script[src*="/app.js"]') || {}).src || "").split("v=")[1] || "";
    const s = document.createElement("script"); s.src = "/admin.js" + (v ? "?v=" + v : ""); s.onload = boot; s.onerror = boot;
    document.head.appendChild(s); return;
  }
`]]);
