/* Vitesse sur un téléphone modeste en 4G lente : LCP, CLS, poids téléchargé, nombre de requêtes.
   PAGES=accueil,avec BASE=https://uborardc.com (par défaut le site en ligne) */
const B = process.env.BASE || "https://uborardc.com";
module.exports = async p => {
  await p.cdp("Network.enable");
  await p.cdp("Network.setCacheDisabled", { cacheDisabled: true });
  await p.cdp("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  await p.cdp("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.taille(390, 844, true);
  for (const nom of (process.env.PAGES || "accueil,poles,avec,outils,a-propos,contact").split(",")) {
    await p.cdp("Page.addScriptToEvaluateOnNewDocument", { source: `window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver(l => l.getEntries().forEach(e => window.__lcp = e.startTime)).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true });` });
    const t0 = Date.now();
    await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1&mesure=" + t0);
    await p.attendre(6000);
    const m = await p.js(`(() => { const r = performance.getEntriesByType("resource"), n = performance.getEntriesByType("navigation")[0];
      const octets = r.reduce((s, e) => s + (e.transferSize || 0), 0) + (n ? n.transferSize : 0);
      return { lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), ko: Math.round(octets / 1024), requetes: r.length + 1, charge: n ? Math.round(n.loadEventEnd) : null }; })()`);
    const note = m.lcp <= 2500 ? "bon" : m.lcp <= 4000 ? "à améliorer" : "lent";
    console.log(`/${nom} : LCP ${(m.lcp / 1000).toFixed(1)} s (${note}) · CLS ${m.cls} · ${m.ko} Ko · ${m.requetes} requêtes · chargement complet ${(m.charge / 1000).toFixed(1)} s`);
  }
  console.log("erreurs :", p.erreurs.length ? p.erreurs.slice(0, 3) : "aucune");
};
