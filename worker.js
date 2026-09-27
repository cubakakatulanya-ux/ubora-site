/* Worker du site Ubora.
   Sert les fichiers statiques, et fait répondre bp.uborardc.com
   directement avec le générateur de business plan (dossier /bp). */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    if (host.startsWith("bp.") && !url.pathname.startsWith("/bp/")) {
      const cible = new URL(url);
      cible.pathname = "/bp/index.html";
      return env.ASSETS.fetch(new Request(cible, request));
    }
    return env.ASSETS.fetch(request);
  }
};
