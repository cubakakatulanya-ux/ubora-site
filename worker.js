/* ==========================================================================
   UBORA — Routage à l'entrée du site (Cloudflare Worker)
   Une seule adresse par page, pour les visiteurs comme pour les moteurs :
   - http:// et www. renvoient (301) vers https://uborardc.com ;
   - chaque sous-domaine de pôle affiche la page de son pôle à sa racine
     (avec.uborardc.com affiche /avec, dont l'adresse canonique est
     https://uborardc.com/avec) ; ses autres pages renvoient vers uborardc.com ;
   - bp.uborardc.com affiche le générateur de business plan ;
   - hub.uborardc.com est servi par un autre Worker (Ubora Incubation) : il ne passe plus ici ;
   - une adresse inconnue reçoit une vraie erreur 404 (fichier 404.html).
   Les en-têtes de sécurité sont posés ici, sur toutes les réponses.
   ========================================================================== */
const APEX = "uborardc.com";
const POLES = { avec: "/avec", pme: "/pme", coop: "/cooperatives", fin: "/financement", market: "/marche", vert: "/vert" };
const ANCIENNES = {
  "/solutions/ubora-avec": "/avec", "/solutions/akiba": "/outils/akiba", "/solutions/ubora-pme": "/pme", "/solutions/ubora-coop": "/cooperatives",
  "/solutions/ubora-fin": "/financement", "/solutions/ubora-market": "/marche", "/solutions/ubora-hub": "/outils/hub", "/solutions/uborahub": "/outils/hub",
  "/solutions": "/outils", "/services": "/conseil", "/diagnostic": "/contact",
  "/rediger": "https://admin.uborardc.com/", "/admin": "https://admin.uborardc.com/", "/hub": "/outils/hub"
};
const FICHIER = /\.[a-z0-9]{2,5}$/i;
const VIDEO = /\.(mp4|webm)$/i;

const CSP_SITE = "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://uoshpvqdszygezkuhhco.supabase.co; connect-src 'self' https://uoshpvqdszygezkuhhco.supabase.co wss://uoshpvqdszygezkuhhco.supabase.co https://cloudflareinsights.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests";
const CSP_GENERATEUR = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://hub.uborardc.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";
const ENTETES = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin"
};

const renvoi = (adresse, code = 301) => Response.redirect(adresse, code);

/* Compteur de visites : le site signale chaque page vue à /_v, le Worker ajoute le pays et le type
   d'appareil, puis l'inscrit dans la base (table site_visites, lue dans l'espace équipe).
   Ni cookie, ni adresse IP, ni identifiant de visiteur ne sont enregistrés. */
const BASE = "https://uoshpvqdszygezkuhhco.supabase.co";
const CLE_PUBLIQUE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvc2hwdnFkc3p5Z2V6a3VoaGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjYwNzQsImV4cCI6MjEwNTg0MjA3NH0.mMV8Z2dl981BGl0o_CLSAsxPsO3QzQlAAWWwT4YVVW4";
const ROBOT = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|curl|wget|python|scrapy|facebookexternalhit|whatsapp|telegram/i;
const duSite = h => h === APEX || h.endsWith("." + APEX);

async function visite(request) {
  const agent = request.headers.get("User-Agent") || "";
  let origine = "";
  try { origine = new URL(request.headers.get("Origin") || "").hostname; } catch (e) {}
  if (!duSite(origine) || !agent || ROBOT.test(agent)) return null;
  let b;
  try { b = JSON.parse((await request.text()).slice(0, 1000)); } catch (e) { return null; }
  if (!b || typeof b.c !== "string" || !b.c.startsWith("/")) return null;
  let source = null;
  try { const h = new URL(String(b.r || "")).hostname.toLowerCase().replace(/^www\./, ""); if (h && !duSite(h)) source = h.slice(0, 100); } catch (e) {}
  const pays = String((request.cf && request.cf.country) || "").toUpperCase();
  return {
    chemin: b.c.split(/[?#]/)[0].slice(0, 200),
    source,
    pays: /^[A-Z]{2}$/.test(pays) ? pays : null,
    appareil: /ipad|tablet|android(?!.*mobile)/i.test(agent) ? "tablette" : /mobi|iphone|android/i.test(agent) ? "mobile" : "ordinateur",
    nouveau: b.n === true
  };
}
const inscrire = ligne => fetch(BASE + "/rest/v1/site_visites", {
  method: "POST",
  headers: { apikey: CLE_PUBLIQUE, Authorization: "Bearer " + CLE_PUBLIQUE, "Content-Type": "application/json", Prefer: "return=minimal" },
  body: JSON.stringify(ligne)
}).catch(() => {});

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const hote = url.hostname.toLowerCase();
    const chemin = url.pathname;

    /* 1. Une seule origine : https et sans www */
    if (url.protocol === "http:" || hote === "www." + APEX) {
      url.protocol = "https:";
      if (hote === "www." + APEX) url.hostname = APEX;
      return renvoi(url.href);
    }
    const sd = hote.endsWith("." + APEX) ? hote.slice(0, -(APEX.length + 1)) : "";

    /* 1 bis. Compteur de visites */
    if (chemin === "/_v") {
      if (request.method === "POST" && sd !== "admin") {
        const ligne = await visite(request);
        if (ligne) ctx.waitUntil(inscrire(ligne));
      }
      return new Response(null, { status: 204, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
    }
    const versSite = () => renvoi(`https://${APEX}${chemin}${url.search}`);

    /* 2. Anciennes adresses du site */
    const ancienne = ANCIENNES[chemin.replace(/\/+$/, "")];
    if (ancienne) return renvoi(ancienne.startsWith("http") ? ancienne : `https://${APEX}${ancienne}`);

    /* 3. Sous-domaines */
    let cible = null;
    if (POLES[sd]) {
      if (chemin === "/") cible = POLES[sd];
      else if (!FICHIER.test(chemin)) return versSite();
    } else if (sd === "bp") {
      if (chemin === "/") cible = "/generateur/";
      else if (chemin === "/generateur" || chemin === "/generateur/") return renvoi(`https://bp.${APEX}/`);
      else if (!FICHIER.test(chemin)) return versSite();
    } else if (sd === "admin") {
      if (chemin !== "/" && !FICHIER.test(chemin)) return versSite();
    } else if (!sd && (chemin === "/generateur" || chemin === "/generateur/")) {
      return renvoi(`https://bp.${APEX}/`);
    }

    /* 4. Pas de barre oblique finale (sauf à la racine) */
    if (!cible && chemin.length > 1 && chemin.endsWith("/")) {
      url.pathname = chemin.replace(/\/+$/, "");
      return renvoi(url.href);
    }

    /* 5. Fichiers du site, avec les en-têtes de sécurité */
    const demande = cible ? new Request(new URL(cible, url), request) : request;
    const reponse = await env.ASSETS.fetch(demande);
    let r = new Response(reponse.body, reponse);
    /* Vidéos : les iPhone ne lisent une vidéo que si le serveur sait en envoyer un morceau (en-tête Range).
       Les fichiers du site sont rendus entiers ; on découpe donc ici le morceau demandé. */
    if (VIDEO.test(chemin) && reponse.status === 200) {
      r.headers.set("Accept-Ranges", "bytes");
      const m = /^bytes=(\d*)-(\d*)$/.exec((request.headers.get("Range") || "").trim());
      if (m && (m[1] || m[2])) {
        const tout = await r.arrayBuffer(), n = tout.byteLength;
        const debut = m[1] ? parseInt(m[1], 10) : Math.max(0, n - parseInt(m[2], 10));
        const fin = m[1] && m[2] ? Math.min(parseInt(m[2], 10), n - 1) : n - 1;
        const entetes = new Headers(reponse.headers);
        entetes.set("Accept-Ranges", "bytes");
        if (debut >= n || debut > fin) {
          entetes.set("Content-Range", `bytes */${n}`);
          r = new Response(null, { status: 416, headers: entetes });
        } else {
          entetes.set("Content-Range", `bytes ${debut}-${fin}/${n}`);
          entetes.set("Content-Length", String(fin - debut + 1));
          r = new Response(tout.slice(debut, fin + 1), { status: 206, headers: entetes });
        }
      }
    }
    for (const [cle, valeur] of Object.entries(ENTETES)) r.headers.set(cle, valeur);
    r.headers.set("Content-Security-Policy", sd === "bp" || chemin.startsWith("/generateur") ? CSP_GENERATEUR : CSP_SITE);
    if (sd === "admin") r.headers.set("X-Robots-Tag", "noindex, nofollow");
    if (chemin.startsWith("/img/")) r.headers.set("Cache-Control", "public, max-age=2592000");
    else if (chemin === "/logo.png") r.headers.set("Cache-Control", "public, max-age=604800");
    /* fichiers versionnés (?v=…) : leur adresse change à chaque mise à jour, on peut les garder un an */
    if (reponse.ok && /\.(css|js)$/.test(chemin) && url.searchParams.has("v")) r.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    else if (reponse.ok && (/^\/(favicon|icon-|apple-touch-icon)/.test(chemin) || chemin === "/partage.jpg")) r.headers.set("Cache-Control", "public, max-age=604800");
    return r;
  }
};
