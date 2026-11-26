/* Photographie un site de référence, écran par écran (URL=…, LARGEUR=…, ECRANS=…). */
const fs = require("fs"), os = require("os"), path = require("path");
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const D = path.join(os.tmpdir(), "vues-ubora"); fs.mkdirSync(D, { recursive: true });
module.exports = async p => {
  const L = +(process.env.LARGEUR || 1366), H = +(process.env.HAUTEUR || 860), N = +(process.env.ECRANS || 8), mob = L < 700;
  await p.taille(L, H, mob); await p.aller(process.env.URL); await p.attendre(3000);
  await p.js(`document.documentElement.style.scrollBehavior='auto'; document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager'); 0`);
  const total = await p.js("document.documentElement.scrollHeight"), vues = [];
  for (let k = 0, y = 0; k < N && y < total; k++, y += H - 40) { await p.js(`scrollTo(0, ${y}); 0`); await p.attendre(900); vues.push(await sharp(await p.vue()).resize({ width: mob ? 390 : 683 }).toBuffer()); }
  const m = await Promise.all(vues.map(v => sharp(v).metadata())), w = m[0].width, par = mob ? 6 : 4;
  for (let g = 0; g * par < vues.length; g++) {
    const lot = vues.slice(g * par, g * par + par), ml = m.slice(g * par, g * par + par);
    const sortie = path.join(D, `org-${L}-${g + 1}.jpg`);
    await sharp({ create: { width: (w + 6) * lot.length - 6, height: Math.max(...ml.map(x => x.height)), channels: 3, background: "#777" } }).composite(lot.map((v, i) => ({ input: v, left: i * (w + 6), top: 0 }))).jpeg({ quality: 74 }).toFile(sortie);
    console.log(sortie);
  }
  console.log("hauteur", total, "texte", (await p.js("document.body.innerText")).length);
};
