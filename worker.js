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

export default {
  async fetch(request, env) {
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
    const r = new Response(reponse.body, reponse);
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
