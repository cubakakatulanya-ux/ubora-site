/* Preuve que styles.min.css affiche exactement comme styles.css : chaque page est photographiée
   avec l'une puis l'autre feuille, écran par écran, et les pixels différents sont comptés.
   PAGES=... LARGEUR=1366 THEME=dark OUVRIR=sélecteur (bouton à cliquer avant la photo) */
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  const L = +(process.env.LARGEUR || 1366), H = 900, mobile = L < 700;
  await p.taille(L, H, mobile);
  const pages = (process.env.PAGES || "accueil,avec,outils,outils/akiba,conseil,contact,confidentialite,admin,ong,a-propos,formations").split(",");
  let total = 0;
  for (const nom of pages) {
    const photos = {};
    for (const feuille of ["styles.css", "styles.min.css"]) {
      await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1");
      for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#footer .foot-links")')); k++) await p.attendre(300);
      await p.js(`(async () => {
        document.documentElement.style.scrollBehavior = 'auto';
        ${process.env.THEME ? `document.documentElement.dataset.theme = ${JSON.stringify(process.env.THEME)};` : ""}
        const l = document.querySelector('link[rel=stylesheet][href*="styles"]');
        const h = '/${"${feuille}"}?v=comparaison';
        if (!l.href.includes(${JSON.stringify(feuille)} + "?")) await new Promise(r => { const n = l.cloneNode(); n.href = '/' + ${JSON.stringify(feuille)} + '?v=cmp'; n.onload = r; l.after(n); l.remove(); });
        document.querySelectorAll('.jeu,.reveal,.img-mouv').forEach(e => { e.classList.remove('jeu'); e.classList.add('in', 'vu'); });
        document.querySelectorAll('*').forEach(e => { e.style.animation = 'none'; e.style.transition = 'none'; });
        document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
        return 0; })()`);
      if (process.env.OUVRIR) await p.js(`(() => { const b = document.querySelector(${JSON.stringify(process.env.OUVRIR)}); b && b.click(); return 0; })()`);
      await p.attendre(1800);
      const hauteur = await p.js("document.documentElement.scrollHeight");
      photos[feuille] = [];
      for (let y = 0; y < Math.min(hauteur, H * 5); y += H) { await p.js(`scrollTo(0, ${y}); 0`); await p.attendre(500); photos[feuille].push(await sharp(await p.vue()).raw().toBuffer()); }
    }
    const [a, b] = [photos["styles.css"], photos["styles.min.css"]];
    let diff = 0, n = 0;
    for (let k = 0; k < Math.min(a.length, b.length); k++) { n += a[k].length / 3; for (let j = 0; j < a[k].length; j += 3) if (Math.abs(a[k][j] - b[k][j]) + Math.abs(a[k][j + 1] - b[k][j + 1]) + Math.abs(a[k][j + 2] - b[k][j + 2]) > 30) diff++; }
    if (a.length !== b.length) diff += 1e6;
    total += diff;
    console.log(`/${nom} : ${a.length} écrans, ${diff} pixels différents sur ${n}${diff ? "  <-- À REGARDER" : ""}`);
  }
  console.log(total ? "DIFFÉRENCES TROUVÉES" : "IDENTIQUE partout", "; erreurs :", p.erreurs.length ? p.erreurs.slice(0, 3) : "aucune");
};
