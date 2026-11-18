/* Règle du site : chaque destination n'est liée qu'une fois par page (contenu et pied de page ;
   le menu du haut est commun à tout le site), et aucune page ne renvoie vers elle-même.
   PAGES=accueil,avec,... (par défaut : toutes) ; signale aussi un débordement horizontal. */
const B = process.env.BASE || "http://localhost:5188";
const TOUTES = "accueil,avec,pme,cooperatives,financement,marche,vert,academie,poles,a-propos,outils,conseil,contact,ong,mentions,confidentialite,conditions,outils/akiba,outils/hub,outils/asbl,outils/bp";
module.exports = async p => {
  await p.taille(1366, 900, false);
  const pb = [];
  const pages = (process.env.PAGES || TOUTES).split(",");
  for (const nom of pages) {
    await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1");
    for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#footer .foot-links")')); k++) await p.attendre(300);
    const r = await p.js(`(() => {
      const compte = sel => { const n = {}; document.querySelectorAll(sel).forEach(a => { const h = a.getAttribute("href"); if (!h || h.startsWith("#") || h.startsWith("tel:") || h.startsWith("mailto:")) return; n[h] = (n[h] || 0) + 1; }); return Object.entries(n).filter(([, k]) => k > 1).map(([h, k]) => h + " ×" + k); };
      const ici = location.pathname.replace(/\\/$/, "") || "/";
      const autoliens = [...document.querySelectorAll("main a[href]")].map(a => a.getAttribute("href")).filter(h => h && !h.includes("#") && !h.includes("?") && (h.replace(/\\/$/, "") || "/") === ici);
      return { corps: compte("main a[href]"), pied: compte("#footer a[href]"), autoliens, debord: document.documentElement.scrollWidth - innerWidth };
    })()`);
    if (r.corps.length || r.pied.length || r.autoliens.length || r.debord) pb.push([nom, r]);
  }
  console.log(`${pages.length} pages contrôlées ;`, pb.length ? JSON.stringify(pb) : "aucun doublon, aucun autolien, aucun débordement", "; erreurs :", p.erreurs.length ? p.erreurs.slice(0, 3) : "aucune");
};
