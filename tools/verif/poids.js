/* Ce qu'une page télécharge sur téléphone, fichier par fichier, avec le moment où chaque fichier arrive.
   PAGE=accueil BASE=https://uborardc.com */
const B = process.env.BASE || "https://uborardc.com";
module.exports = async p => {
  await p.cdp("Network.enable");
  await p.cdp("Network.setCacheDisabled", { cacheDisabled: true });
  await p.cdp("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  await p.cdp("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.taille(390, 844, true);
  const nom = process.env.PAGE || "accueil";
  await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1&poids=" + Date.now());
  await p.attendre(7000);
  const r = await p.js(`(() => { const n = performance.getEntriesByType("navigation")[0];
    return [{ name: location.pathname, transferSize: n.transferSize, responseEnd: n.responseEnd, initiatorType: "page" }, ...performance.getEntriesByType("resource")]
      .map(e => ({ f: e.name.replace(location.origin, "").split("?")[0], ko: Math.round((e.transferSize || 0) / 102.4) / 10, fin: Math.round(e.responseEnd), type: e.initiatorType })); })()`);
  r.sort((a, b) => b.ko - a.ko).forEach(e => console.log(String(e.ko).padStart(7), "Ko  arrivé à", String((e.fin / 1000).toFixed(1)).padStart(5), "s ", e.type.padEnd(8), e.f));
};
