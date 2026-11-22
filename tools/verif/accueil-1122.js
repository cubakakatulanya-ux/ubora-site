/* Accueil resserré : hauteur des sections domaines et vitrine, à 1366 px et 390 px, et vue de la zone. */
const fs = require("fs"), os = require("os"), path = require("path");
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const D = path.join(os.tmpdir(), "vues-ubora"); fs.mkdirSync(D, { recursive: true });
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  for (const [L, H, mob] of [[1366, 900, false], [390, 844, true]]) {
    for (const page of ["/", "/en"]) {
      await p.taille(L, H, mob);
      await p.aller(B + page + "?equipe=1");
      for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#solutions")')); k++) await p.attendre(300);
      await p.js(`document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('.jeu,.reveal,.img-mouv').forEach(e=>{e.classList.remove('jeu');e.classList.add('in','vu');}); document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager'); 0`);
      await p.attendre(1200);
      const h = await p.js(`(() => { const m = s => Math.round(document.querySelector(s).getBoundingClientRect().height); return { domaines: m('#poles'), vitrine: m('#solutions'), debord: document.documentElement.scrollWidth - innerWidth }; })()`);
      const y = await p.js(`Math.round(document.querySelector('#poles').getBoundingClientRect().top + scrollY)`);
      const vues = [];
      for (let k = 0; k < (mob ? 3 : 2); k++) { await p.js(`scrollTo(0, ${y + k * (H - 40)}); 0`); await p.attendre(600); vues.push(await sharp(await p.vue()).resize({ width: mob ? 390 : 800 }).toBuffer()); }
      const metas = await Promise.all(vues.map(v => sharp(v).metadata()));
      const sortie = path.join(D, `accueil${page === "/en" ? "-en" : ""}-${L}.jpg`);
      await sharp({ create: { width: (metas[0].width + 6) * vues.length - 6, height: Math.max(...metas.map(m => m.height)), channels: 3, background: "#777" } }).composite(vues.map((v, i) => ({ input: v, left: i * (metas[0].width + 6), top: 0 }))).jpeg({ quality: 78 }).toFile(sortie);
      console.log(page, L, JSON.stringify(h), sortie);
    }
  }
  console.log("erreurs :", p.erreurs.length ? p.erreurs.slice(0, 5) : "aucune");
};
