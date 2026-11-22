/* Sécurité (22 novembre 2026) : la connexion, les formulaires publics et les envois de photos passent par le Worker.
   - la clé Supabase n'est plus dans les pages publiques (data.js) ; le Worker la garde, et ne la remet qu'à l'espace équipe ;
   - connexion : 5 essais par minute et par adresse IP, puis blocage de 15 minutes (adresse IP jamais conservée : empreinte salée) ;
   - formulaires : limite par adresse IP au lieu d'une limite globale ;
   - photos : JPEG, PNG ou WebP seulement, 5 Mo au plus, type vérifié sur les premiers octets du fichier, nom aléatoire à l'enregistrement,
     envoi fait avec le jeton du membre de l'équipe (la base vérifie elle-même qu'il est administrateur). */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { if (!t.includes(a)) throw new Error(f + ' introuvable : ' + a.slice(0, 90)); t = t.replace(a, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

/* ---------- 1. Worker : les routes /api ---------- */
patch('worker.js', [
  [`/* Panne imprévue : une page simple`, `/* ==========================================================================
   API du site (22 novembre 2026) : tout ce qui écrit dans la base passe par ici.
   La clé publique Supabase reste dans le Worker ; les limites sont appliquées par
   adresse IP (empreinte salée, jamais conservée en clair, effacée au bout de 15 minutes au plus).
   ========================================================================== */
const MO = 1024 * 1024;
const LIMITES = {
  connexion: { essais: 5, fenetre: 60, blocage: 900 },          /* 5 essais par minute, puis 15 minutes de blocage */
  message: { essais: 5, fenetre: 600 }, abonnement: { essais: 5, fenetre: 600 }, question: { essais: 30, fenetre: 600 }
};
const TABLES = { message: "site_messages", abonnement: "site_abonnes", question: "site_questions" };
const CHAMPS = { message: ["nom", "organisation", "telephone", "email", "besoin", "message"], abonnement: ["email"], question: ["question", "repondu", "page"] };
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex", ...ENTETES, ...extra } });
async function empreinteIP(request) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "inconnue";
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ubora-limites-2026|" + ip));
  return [...new Uint8Array(d)].slice(0, 16).map(b => b.toString(16).padStart(2, "0")).join("");
}
/* compteurs et blocages dans le cache de Cloudflare (par centre de données), avec une durée de vie */
const cleCache = (sorte, nom, ip) => \`https://\${APEX}/__\${sorte}/\${nom}/\${ip}\`;
async function compter(nom, ip, fenetre) {
  const c = caches.default, url = cleCache("limites", nom, ip);
  const r = await c.match(url); const n = (r ? parseInt(await r.text(), 10) || 0 : 0) + 1;
  await c.put(url, new Response(String(n), { headers: { "Cache-Control": \`public, max-age=\${fenetre}\` } }));
  return n;
}
const estBloque = async (nom, ip) => !!(await caches.default.match(cleCache("blocage", nom, ip)));
const bloquer = (nom, ip, duree) => caches.default.put(cleCache("blocage", nom, ip), new Response("1", { headers: { "Cache-Control": \`public, max-age=\${duree}\` } }));
async function lireJSON(request, max) {
  if (Number(request.headers.get("Content-Length") || 0) > max) return null;
  try { const t = await request.text(); return t.length > max ? null : JSON.parse(t); } catch (e) { return null; }
}
/* vrai type d'une image, d'après ses premiers octets (la déclaration du navigateur ne compte pas) */
function typeImage(o) {
  if (o.length >= 3 && o[0] === 0xFF && o[1] === 0xD8 && o[2] === 0xFF) return ["image/jpeg", "jpg"];
  if (o.length >= 8 && [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A].every((b, i) => o[i] === b)) return ["image/png", "png"];
  if (o.length >= 12 && String.fromCharCode(...o.slice(0, 4)) === "RIFF" && String.fromCharCode(...o.slice(8, 12)) === "WEBP") return ["image/webp", "webp"];
  return null;
}
async function api(request, chemin, sd) {
  const nom = chemin.slice(5);
  let origine = ""; try { origine = new URL(request.headers.get("Origin") || "").hostname; } catch (e) {}
  if (nom === "config") {
    /* la clé publique n'est remise qu'à l'espace équipe, qui en a besoin pour sa session */
    if (request.method !== "GET" || sd !== "admin") return json({ erreur: "Introuvable." }, 404);
    return json({ url: BASE, cle: CLE_PUBLIQUE });
  }
  if (nom === "contenu") {
    if (request.method !== "GET") return json({ erreur: "Méthode non autorisée." }, 405, { Allow: "GET" });
    const h = { apikey: CLE_PUBLIQUE, Authorization: "Bearer " + CLE_PUBLIQUE };
    const lu = await Promise.all([["actualites", "date.desc"], ["formations", "date.asc"], ["offres", "publie_le.desc"], ["equipe", "ordre.asc,nom.asc"], ["realisations", "ordre.asc,created_at.desc"]]
      .map(([t, o]) => fetch(\`\${BASE}/rest/v1/site_\${t}?select=*&publie=eq.true&order=\${o}\`, { headers: h }).then(r => r.ok ? r.json() : null).catch(() => null)));
    const [actualites, formations, offres, equipe, realisations] = lu;
    return json({ actualites, formations, offres, equipe, realisations }, 200, { "Cache-Control": "public, max-age=60" });
  }
  if (request.method !== "POST") return json({ erreur: "Méthode non autorisée." }, 405, { Allow: "POST" });
  if (!duSite(origine)) return json({ erreur: "Origine refusée." }, 403);
  const ip = await empreinteIP(request);

  if (nom === "connexion") {
    const L = LIMITES.connexion;
    if (await estBloque("connexion", ip)) return json({ erreur: "Trop de tentatives de connexion. Réessayez dans 15 minutes.", bloque: true }, 429, { "Retry-After": String(L.blocage) });
    if (await compter("connexion", ip, L.fenetre) > L.essais) {
      await bloquer("connexion", ip, L.blocage);
      return json({ erreur: "Trop de tentatives de connexion. Réessayez dans 15 minutes.", bloque: true }, 429, { "Retry-After": String(L.blocage) });
    }
    const b = await lireJSON(request, 2048);
    if (!b || typeof b.email !== "string" || typeof b.password !== "string" || b.email.length > 160 || b.password.length > 200) return json({ erreur: "Adresse e-mail ou mot de passe incorrect." }, 400);
    const r = await fetch(\`\${BASE}/auth/v1/token?grant_type=password\`, { method: "POST", headers: { apikey: CLE_PUBLIQUE, "Content-Type": "application/json" }, body: JSON.stringify({ email: b.email.trim(), password: b.password }) });
    if (r.status === 429) return json({ erreur: "Trop de tentatives de connexion. Réessayez dans quelques minutes.", bloque: true }, 429);
    const d = await r.json().catch(() => ({}));
    /* même réponse pour une adresse inconnue et un mauvais mot de passe : rien ne révèle qui a un compte */
    if (!r.ok || !d.access_token) return json({ erreur: "Adresse e-mail ou mot de passe incorrect." }, 401);
    return json({ ok: true, session: { access_token: d.access_token, refresh_token: d.refresh_token, expires_in: d.expires_in, token_type: d.token_type } });
  }

  if (nom === "media") {
    const jeton = request.headers.get("Authorization") || "";
    if (!/^Bearer [A-Za-z0-9._-]{20,}$/.test(jeton)) return json({ erreur: "Connexion requise." }, 401);
    const dossier = new URL(request.url).searchParams.get("dossier") || "divers";
    if (!/^[a-z0-9-]{1,30}$/.test(dossier)) return json({ erreur: "Dossier invalide." }, 400);
    if (Number(request.headers.get("Content-Length") || 0) > 5 * MO) return json({ erreur: "Image trop lourde : 5 Mo au plus." }, 413);
    const octets = new Uint8Array(await request.arrayBuffer());
    if (octets.length > 5 * MO) return json({ erreur: "Image trop lourde : 5 Mo au plus." }, 413);
    const type = typeImage(octets);
    if (!type) return json({ erreur: "Seules les images JPEG, PNG et WebP sont acceptées." }, 415);
    const fichier = \`\${dossier}/\${crypto.randomUUID()}.\${type[1]}\`;
    const r = await fetch(\`\${BASE}/storage/v1/object/site-medias/\${fichier}\`, { method: "POST", headers: { apikey: CLE_PUBLIQUE, Authorization: jeton, "Content-Type": type[0], "Cache-Control": "max-age=31536000", "x-upsert": "false" }, body: octets });
    if (!r.ok) return json({ erreur: r.status === 400 || r.status === 401 || r.status === 403 ? "Envoi refusé : réservé à l'équipe du site." : "L'envoi n'a pas abouti." }, r.status === 400 || r.status === 401 || r.status === 403 ? 403 : 502);
    return json({ ok: true, url: \`\${BASE}/storage/v1/object/public/site-medias/\${fichier}\` });
  }

  if (TABLES[nom]) {
    const L = LIMITES[nom];
    if (await compter(nom, ip, L.fenetre) > L.essais) return json({ ok: false, limite: true, erreur: "Trop d'envois depuis cette connexion. Réessayez un peu plus tard." }, 429, { "Retry-After": String(L.fenetre) });
    const b = await lireJSON(request, 8192);
    if (!b || typeof b !== "object") return json({ ok: false, erreur: "Envoi illisible." }, 400);
    const ligne = Object.fromEntries(CHAMPS[nom].filter(k => k in b).map(k => [k, b[k]]));
    const r = await fetch(\`\${BASE}/rest/v1/\${TABLES[nom]}\`, { method: "POST", headers: { apikey: CLE_PUBLIQUE, Authorization: "Bearer " + CLE_PUBLIQUE, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(ligne) });
    if (r.ok) return json({ ok: true }, 201);
    const e = await r.json().catch(() => ({}));
    return json({ ok: false, code: e.code || null, limite: /trop/i.test(e.message || ""), erreur: "L'envoi a été refusé." }, r.status >= 500 ? 502 : 400);
  }
  return json({ erreur: "Introuvable." }, 404);
}

/* Panne imprévue : une page simple`],
  [`    if (request.method !== "GET" && request.method !== "HEAD") {`, `    /* 1 ter. API du site (connexion, formulaires, photos) */
    if (chemin.startsWith("/api/")) return api(request, chemin, sd);
    if (request.method !== "GET" && request.method !== "HEAD") {`]
]);
/* politique de contenu : les pages publiques ne parlent plus qu'au site lui-même ; l'espace équipe garde l'accès à la base */
patch('worker.js', [
  [`const CSP_GENERATEUR =`, `const CSP_PUBLIC = CSP_SITE.replace(/connect-src [^;]*;/, "connect-src 'self';");
const CSP_GENERATEUR =`],
  [`r.headers.set("Content-Security-Policy", sd === "bp" || chemin.startsWith("/generateur") ? CSP_GENERATEUR : CSP_SITE);`,
   `r.headers.set("Content-Security-Policy", sd === "bp" || chemin.startsWith("/generateur") ? CSP_GENERATEUR : sd === "admin" ? CSP_SITE : CSP_PUBLIC);`]
]);

/* ---------- 2. Pages publiques : plus de clé dans data.js ---------- */
patch('data.js', [[/const SUPABASE = \{\n  url: "https:\/\/uoshpvqdszygezkuhhco\.supabase\.co",\n  anonKey: "[^"]+"\n\};/.exec(lire('data.js'))[0],
  `/* La clé de la base n'est plus dans les pages publiques : les formulaires passent par le serveur du site (/api),
   et l'espace équipe reçoit la clé publique du serveur quand il en a besoin (/api/config). */
const SUPABASE = {
  url: "https://uoshpvqdszygezkuhhco.supabase.co"
};`]]);

/* ---------- 3. db.js : formulaires et lecture par /api, connexion et photos par /api, clé demandée au serveur ---------- */
patch('db.js', [
  [`  const configured = () => !!(typeof SUPABASE !== "undefined" && SUPABASE.url && SUPABASE.anonKey);`,
   `  const configured = () => !!(typeof SUPABASE !== "undefined" && SUPABASE.url);
  /* clé publique de la base : remise par le serveur du site, à l'espace équipe seulement */
  let cleCharge = null;
  function clePublique() {
    if (typeof SUPABASE !== "undefined" && SUPABASE.anonKey) return Promise.resolve(SUPABASE.anonKey);
    if (!cleCharge) cleCharge = fetch("/api/config", { credentials: "same-origin" }).then(r => r.ok ? r.json() : null).then(d => (d && d.cle) || null).catch(() => null).then(c => { if (!c) cleCharge = null; return c; });
    return cleCharge;
  }`],
  [`    const lib = await bibliotheque(); if (!lib) return null;
    if (!client) client = lib.createClient(SUPABASE.url, SUPABASE.anonKey, { auth: { persistSession: true, storageKey: "ubora-admin" } });`,
   `    const lib = await bibliotheque(); if (!lib) return null;
    if (!client) { const cle = await clePublique(); if (!cle) return null; client = lib.createClient(SUPABASE.url, cle, { auth: { persistSession: true, storageKey: "ubora-admin" } }); }`],
  [/  \/\* pages publiques : requêtes directes à la base[\s\S]*?\n  async function deposer\(table, ligne\) \{[\s\S]*?\n  \}\n/.exec(lire('db.js'))[0],
   `  /* pages publiques : tout passe par le serveur du site (/api), qui garde la clé et limite les envois par adresse IP */
  const ROUTES = { site_messages: "message", site_questions: "question", site_abonnes: "abonnement" };
  async function deposer(table, ligne) {
    try {
      const r = await delai(fetch("/api/" + ROUTES[table], { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ligne) }));
      if (r && r.error) return r;
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) return { error: null };
      return { error: { code: d.code, message: d.limite ? "trop d'envois" : (d.erreur || "HTTP " + r.status) } };
    } catch (e) { return { error: { message: String((e && e.message) || e) } }; }
  }
`],
  [/  async function load\(\) \{\n[\s\S]*?\n    return DATA;\n  \}/.exec(lire('db.js'))[0],
   `  async function load() {
    if (!configured() || typeof fetch === "undefined" || typeof window === "undefined" || window.UBORA_PRERENDER) return DATA;
    try {
      const r = await fetch("/api/contenu"); if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      if (d.actualites) DATA.actualites = d.actualites.map(fromNews);
      if (d.formations) DATA.formations = d.formations.map(fromTrain);
      if (d.offres) DATA.offres = d.offres.map(fromJob);
      if (d.equipe) DATA.equipe = d.equipe.map(fromMember);
      if (d.realisations) DATA.realisations = d.realisations.map(fromReal);
      DATA.source = "base";
    } catch (e) { console.warn("Ubora : base indisponible."); }
    return DATA;
  }`],
  [`    const c = await sb(); if (!c) return { ok: false, message: "La base de données est injoignable." };
    const { data, error } = await c.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, message: error.message === "Invalid login credentials" ? "Adresse e-mail ou mot de passe incorrect." : error.message };
    return { ok: true, user: data.user };`,
   `    const c = await sb(); if (!c) return { ok: false, message: "La base de données est injoignable." };
    /* la connexion passe par le serveur du site : 5 essais par minute et par adresse IP, puis 15 minutes de blocage */
    let r, d;
    try { r = await fetch("/api/connexion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); d = await r.json().catch(() => ({})); }
    catch (e) { return { ok: false, message: "Connexion impossible. Vérifiez votre réseau." }; }
    if (!r.ok || !d.session) return { ok: false, message: d.erreur || "Adresse e-mail ou mot de passe incorrect.", bloque: !!d.bloque };
    const { data, error } = await c.auth.setSession({ access_token: d.session.access_token, refresh_token: d.session.refresh_token });
    if (error) return { ok: false, message: "La session n'a pas pu s'ouvrir." };
    return { ok: true, user: data.user };`],
  [`    const c = await sb(); if (!c) return { ok: false, message: "Base injoignable." };
    const nom = \`\${dossier}/\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}.jpg\`;
    const { error } = await c.storage.from("site-medias").upload(nom, blob, { contentType: "image/jpeg", cacheControl: "31536000", upsert: false });
    if (error) return { ok: false, message: error.message };
    return { ok: true, url: c.storage.from("site-medias").getPublicUrl(nom).data.publicUrl };`,
   `    const c = await sb(); if (!c) return { ok: false, message: "Base injoignable." };
    if (blob.size > 5 * 1024 * 1024) return { ok: false, message: "image trop lourde (5 Mo au plus)." };
    /* le serveur vérifie le vrai type du fichier, sa taille, et lui donne un nom aléatoire ; la base vérifie que l'envoi vient de l'équipe */
    const { data } = await c.auth.getSession(); const jeton = data && data.session && data.session.access_token;
    if (!jeton) return { ok: false, message: "reconnectez-vous." };
    try {
      const r = await fetch("/api/media?dossier=" + encodeURIComponent(dossier), { method: "POST", headers: { Authorization: "Bearer " + jeton, "Content-Type": blob.type || "application/octet-stream" }, body: blob });
      const d = await r.json().catch(() => ({}));
      return r.ok && d.ok ? { ok: true, url: d.url } : { ok: false, message: d.erreur || "envoi refusé." };
    } catch (e) { return { ok: false, message: "envoi impossible, vérifiez votre réseau." }; }`]
]);

/* ---------- 4. Génération des pages : la clé est lue dans worker.js ---------- */
patch('tools/prerender.js', [[`  const h = { apikey: S.SUPABASE.anonKey, Authorization: "Bearer " + S.SUPABASE.anonKey };`,
  `  /* la clé publique n'est plus dans data.js : on la prend dans le Worker (ou dans la variable SUPABASE_ANON) */
  const cle = process.env.SUPABASE_ANON || (read("worker.js").match(/const CLE_PUBLIQUE = "([^"]+)"/) || [])[1];
  const h = { apikey: cle, Authorization: "Bearer " + cle };`]]);

/* ---------- 5. Confidentialité : dire ce que la protection contre les abus utilise ---------- */
patch('app.js', [[`      ["L'espace équipe", "E-mail et session des membres de l'équipe habilités", "La gestion du site", "Tant que la personne est habilitée"]`,
  `      ["L'espace équipe", "E-mail et session des membres de l'équipe habilités", "La gestion du site", "Tant que la personne est habilitée"],
      ["Protéger le site contre les abus", "Une empreinte chiffrée de l'adresse IP, jamais l'adresse elle-même, pour limiter les envois et les tentatives de connexion", "Notre intérêt à protéger le service", "15 minutes au plus"]`]]);
console.log('terminé');
