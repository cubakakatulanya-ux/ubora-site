/* Capture de zones précises, côte à côte : ZONES="page|sélecteur;page|sélecteur" NOM=... LARGEUR=1366 HAUTEUR=820 OUVRIR=sélecteur-à-survoler */
const fs = require("fs"), os = require("os"), path = require("path");
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const D = path.join(os.tmpdir(), "vues-ubora"); fs.mkdirSync(D, { recursive: true });
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  const L = +(process.env.LARGEUR || 1366), H = +(process.env.HAUTEUR || 820);
  await p.taille(L, H, L < 700);
  const vues = [];
  for (const z of (process.env.ZONES || "").split(";").filter(Boolean)) {
    const [page, sel, action] = z.split("|");
    await p.aller(B + (page === "accueil" ? "/" : "/" + page) + "?equipe=1");
    for (let k = 0; k < 40 && !(await p.js(`!!document.querySelector(${JSON.stringify(sel)})`)); k++) await p.attendre(400);
    if (process.env.THEME) await p.js(`document.documentElement.dataset.theme = ${JSON.stringify(process.env.THEME)}; 0`);
    await p.js(`document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('.jeu,.reveal,.img-mouv').forEach(e=>{e.classList.remove('jeu');e.classList.add('in','vu');}); const e = document.querySelector(${JSON.stringify(sel)}); scrollTo(0, Math.max(0, e.getBoundingClientRect().top + scrollY - 110)); 0`);
    if (action) await p.js(`(() => { const b = document.querySelector(${JSON.stringify(action)}); b && b.click(); return 0; })()`);
    await p.attendre(1300);
    vues.push(await sharp(await p.vue()).resize({ width: Math.min(L, 900) }).toBuffer());
  }
  const metas = await Promise.all(vues.map(v => sharp(v).metadata())), w = metas[0].width;
  const sortie = path.join(D, (process.env.NOM || "zones") + ".jpg");
  await sharp({ create: { width: (w + 6) * vues.length - 6, height: Math.max(...metas.map(m => m.height)), channels: 3, background: "#777" } })
    .composite(vues.map((v, i) => ({ input: v, left: i * (w + 6), top: 0 }))).jpeg({ quality: 80 }).toFile(sortie);
  console.log(sortie, "; erreurs :", p.erreurs.length ? p.erreurs.slice(0, 5) : "aucune");
};
