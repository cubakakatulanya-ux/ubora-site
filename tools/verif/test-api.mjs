/* Tests des routes /api du Worker, avec une base factice (aucune requête ne part vers Supabase).
   node tools/verif/test-api.mjs */
const cache = new Map();
globalThis.caches = { default: {
  match: async u => cache.has(String(u)) ? new Response(cache.get(String(u))) : undefined,
  put: async (u, r) => { cache.set(String(u), await r.text()); }
} };
const appels = [];
globalThis.fetch = async (url, o = {}) => {
  url = String(url); appels.push({ url, o });
  if (url.includes("/auth/v1/token")) { const b = JSON.parse(o.body); return new Response(JSON.stringify(b.password === "bon-mot-de-passe" ? { access_token: "a".repeat(40), refresh_token: "r", expires_in: 3600, token_type: "bearer" } : { error: "invalid_grant" }), { status: b.password === "bon-mot-de-passe" ? 200 : 400 }); }
  if (url.includes("/storage/v1/object/")) return new Response("{}", { status: o.headers.Authorization === "Bearer " + "j".repeat(40) ? 200 : 403 });
  if (url.includes("/rest/v1/site_messages")) { const b = JSON.parse(o.body); return b.nom ? new Response(null, { status: 201 }) : new Response(JSON.stringify({ code: "23514", message: "check" }), { status: 400 }); }
  if (url.includes("/rest/v1/")) return new Response("[]", { status: 200 });
  return new Response("non", { status: 404 });
};
const w = (await import("../../worker.js")).default;
const env = { ASSETS: { fetch: async () => new Response("page") } };
const ctx = { waitUntil() {} };
let ok = 0, ko = 0;
const verifie = (nom, cond, detail = "") => { cond ? ok++ : ko++; console.log((cond ? "  ✓ " : "  ✗ ") + nom + (cond ? "" : "  → " + detail)); };
const req = (chemin, o = {}) => w.fetch(new Request("https://" + (o.hote || "uborardc.com") + chemin, { method: o.methode || "POST", headers: { Origin: o.origine === undefined ? "https://uborardc.com" : o.origine, "CF-Connecting-IP": o.ip || "203.0.113.7", ...(o.entetes || {}) }, body: o.corps }), env, ctx);
const corpsJSON = o => JSON.stringify(o);

console.log("Connexion");
for (let i = 1; i <= 5; i++) { const r = await req("/api/connexion", { corps: corpsJSON({ email: "x@y.cd", password: "faux" + i }) }); verifie(`essai ${i} refusé (401)`, r.status === 401, r.status); }
let r = await req("/api/connexion", { corps: corpsJSON({ email: "x@y.cd", password: "bon-mot-de-passe" }) });
verifie("6e essai dans la minute : bloqué (429), même avec le bon mot de passe", r.status === 429 && r.headers.get("Retry-After") === "900", r.status);
r = await req("/api/connexion", { corps: corpsJSON({ email: "x@y.cd", password: "bon-mot-de-passe" }) });
verifie("blocage maintenu ensuite (15 minutes)", r.status === 429, r.status);
r = await req("/api/connexion", { ip: "198.51.100.9", corps: corpsJSON({ email: "x@y.cd", password: "bon-mot-de-passe" }) });
const d = await r.json();
verifie("une autre adresse IP n'est pas touchée, et le bon mot de passe ouvre la session", r.status === 200 && d.ok && d.session.access_token, r.status);
r = await req("/api/connexion", { ip: "192.0.2.5", corps: corpsJSON({ email: "inconnu@y.cd", password: "faux" }) });
verifie("adresse inconnue : même message qu'un mauvais mot de passe", (await r.json()).erreur === "Adresse e-mail ou mot de passe incorrect.");
r = await req("/api/connexion", { ip: "192.0.2.6", origine: "https://pirate.example", corps: corpsJSON({ email: "x@y.cd", password: "bon-mot-de-passe" }) });
verifie("requête venue d'un autre site : refusée (403)", r.status === 403, r.status);
verifie("aucune adresse IP en clair dans le cache", [...cache.keys()].every(k => !k.includes("203.0.113.7")));

console.log("Photos");
const jpeg = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0, 0x10, 0x4A, 0x46, 0x49, 0x46, 0, 1, 1, 0]);
const png = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0, 0, 0, 13]);
const webp = new Uint8Array([...new TextEncoder().encode("RIFF"), 0, 0, 0, 0, ...new TextEncoder().encode("WEBPVP8 ")]);
const svg = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
const jeton = { Authorization: "Bearer " + "j".repeat(40), "Content-Type": "image/jpeg" };
for (const [nom, octets, attendu] of [["JPEG", jpeg, 200], ["PNG", png, 200], ["WebP", webp, 200], ["SVG déclaré image/jpeg", svg, 415]]) {
  r = await req("/api/media?dossier=equipe", { entetes: jeton, corps: octets });
  const j = await r.json();
  verifie(`${nom} → ${attendu}`, r.status === attendu, r.status + " " + JSON.stringify(j));
  if (attendu === 200) { const a = appels[appels.length - 1]; verifie(`  ${nom} renommé au hasard avec la bonne extension et le bon type`, /\/site-medias\/equipe\/[0-9a-f-]{36}\.(jpg|png|webp)$/.test(a.url) && a.o.headers["Content-Type"] === { JPEG: "image/jpeg", PNG: "image/png", WebP: "image/webp" }[nom], a.url); }
}
r = await req("/api/media?dossier=equipe", { entetes: jeton, corps: new Uint8Array(5 * 1024 * 1024 + 10).fill(0xFF) });
verifie("plus de 5 Mo → 413", r.status === 413, r.status);
r = await req("/api/media?dossier=equipe", { entetes: { "Content-Type": "image/jpeg" }, corps: jpeg });
verifie("sans jeton de connexion → 401", r.status === 401, r.status);
r = await req("/api/media?dossier=equipe", { entetes: { Authorization: "Bearer " + "x".repeat(40) }, corps: jpeg });
verifie("jeton d'un compte qui n'est pas de l'équipe → refus de la base (403)", r.status === 403, r.status);
r = await req("/api/media?dossier=../../etc", { entetes: jeton, corps: jpeg });
verifie("dossier piégé (../) → 400", r.status === 400, r.status);

console.log("Formulaires");
r = await req("/api/message", { ip: "192.0.2.50", corps: corpsJSON({ nom: "Test", message: "Bonjour", role: "admin", traite: true }) });
const envoye = JSON.parse(appels[appels.length - 1].o.body);
verifie("message accepté (201), champs non prévus retirés (pas de « traite » ni « role »)", r.status === 201 && !("traite" in envoye) && !("role" in envoye), JSON.stringify(envoye));
verifie("la clé de la base est ajoutée par le serveur", appels[appels.length - 1].o.headers.apikey && appels[appels.length - 1].o.headers.apikey.startsWith("eyJ"));
r = await req("/api/message", { ip: "192.0.2.50", corps: corpsJSON({ message: "sans nom" }) });
verifie("message invalide → refus de la base relayé (400, code 23514)", r.status === 400 && (await r.json()).code === "23514", r.status);
for (let i = 0; i < 4; i++) await req("/api/message", { ip: "192.0.2.50", corps: corpsJSON({ nom: "T", message: "M" }) });
r = await req("/api/message", { ip: "192.0.2.50", corps: corpsJSON({ nom: "T", message: "M" }) });
verifie("au-delà de 5 messages en 10 minutes depuis une même adresse → 429", r.status === 429, r.status);

console.log("Clé et contenu");
r = await req("/api/config", { methode: "GET" });
verifie("la clé n'est pas remise aux pages publiques (/api/config → 404)", r.status === 404, r.status);
r = await req("/api/config", { methode: "GET", hote: "admin.uborardc.com" });
verifie("l'espace équipe la reçoit", r.status === 200 && (await r.json()).cle, r.status);
r = await req("/api/contenu", { methode: "GET" });
verifie("contenu publié lisible (/api/contenu)", r.status === 200, r.status);
r = await w.fetch(new Request("https://uborardc.com/"), env, ctx);
verifie("pages publiques : la politique de contenu ne permet plus d'appeler la base directement", /connect-src 'self';/.test(r.headers.get("Content-Security-Policy")), r.headers.get("Content-Security-Policy"));
r = await w.fetch(new Request("https://admin.uborardc.com/"), env, ctx);
verifie("espace équipe : l'accès à la base reste autorisé", /connect-src 'self' https:\/\/uoshpvqdszygezkuhhco/.test(r.headers.get("Content-Security-Policy")));

console.log(`\n${ok} réussis, ${ko} échoués`);
process.exit(ko ? 1 : 0);
