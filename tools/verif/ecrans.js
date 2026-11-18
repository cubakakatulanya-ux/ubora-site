/* Une page écran par écran, sans animation d'entrée, assemblée en une planche.
   PAGES=accueil,conseil LARGEUR=1440 HAUTEUR=900 ECRANS=4 BASE=http://localhost:5188 THEME=dark
   Sortie : %TEMP%/vues-ubora/ecrans-<page>-<largeur>.jpg ; affiche aussi le débordement horizontal et le nombre de mots. */
const fs = require("fs"), os = require("os"), path = require("path");
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const D = path.join(os.tmpdir(), "vues-ubora"); fs.mkdirSync(D, { recursive: true });
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  const L = +(process.env.LARGEUR || 1440), H = +(process.env.HAUTEUR || 900), N = +(process.env.ECRANS || 4), mobile = L < 700;
  for (const nom of (process.env.PAGES || "accueil").split(",")) {
    await p.taille(L, H, mobile);
    await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1");
    for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#footer .foot-links")')); k++) await p.attendre(400);
    if (process.env.THEME) await p.js(`document.documentElement.dataset.theme = ${JSON.stringify(process.env.THEME)}; 0`);
    await p.js(`document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('.jeu,.reveal,.img-mouv').forEach(e=>{e.classList.remove('jeu');e.classList.add('in','vu');}); document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager'); 0`);
    await p.attendre(1500);
    const total = await p.js("document.documentElement.scrollHeight");
    const vues = [];
    for (let k = 0, y = 0; k < N && y < total; k++, y += H - 60) { await p.js(`scrollTo(0, ${y}); 0`); await p.attendre(700); vues.push(await sharp(await p.vue()).resize({ width: mobile ? L : 720 }).toBuffer()); }
    const metas = await Promise.all(vues.map(v => sharp(v).metadata())), w = metas[0].width;
    const sortie = path.join(D, `ecrans-${nom.split("/").join("-")}-${L}${process.env.THEME ? "-" + process.env.THEME : ""}.jpg`);
    await sharp({ create: { width: (w + 6) * vues.length - 6, height: Math.max(...metas.map(m => m.height)), channels: 3, background: "#777" } })
      .composite(vues.map((v, i) => ({ input: v, left: i * (w + 6), top: 0 }))).jpeg({ quality: 76 }).toFile(sortie);
    console.log(`/${nom} ${L}px : ${vues.length} écrans ; débord ${await p.js("document.documentElement.scrollWidth - innerWidth")} ; mots ${await p.js(`document.querySelector('#app').innerText.split(/\\s+/).length`)} ; ${sortie}`);
  }
  console.log("erreurs :", p.erreurs.length ? p.erreurs.slice(0, 5) : "aucune");
};
