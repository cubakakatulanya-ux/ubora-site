/* Boutons flottants visibles sur téléphone et sur ordinateur (site en ligne par défaut). */
const B = process.env.BASE || "https://uborardc.com";
module.exports = async p => {
  for (const [l, h, m] of [[390, 844, true], [1366, 820, false]]) {
    await p.taille(l, h, m);
    await p.aller(B + "/?equipe=1&f=" + Date.now()); await p.attendre(4000);
    const r = await p.js(`(() => { const vis = s => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== "none" && e.getBoundingClientRect().width > 0; };
      return { assistant: vis(".chat-fab"), whatsapp: vis(".wa-float") }; })()`);
    console.log(l + " px :", JSON.stringify(r));
  }
};
