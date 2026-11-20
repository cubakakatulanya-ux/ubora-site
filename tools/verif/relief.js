/* Photographie le relief 3D : souris posée sur des éléments (vrais événements de souris), écrans de biais.
   ZONES="page|sélecteur;…" (la souris est posée au quart haut-gauche de l'élément) */
const fs = require("fs"), os = require("os"), path = require("path");
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const D = path.join(os.tmpdir(), "vues-ubora"); fs.mkdirSync(D, { recursive: true });
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  await p.taille(1366, 820, false);
  const vues = [], etats = [];
  for (const z of (process.env.ZONES || "accueil|.r-hero-photo;accueil|.vitrine-grille .solution;outils/akiba|.pg-ecran .screen;solutions|#pme .pg-carte-photo").split(";")) {
    const [page, sel] = z.split("|");
    await p.aller(B + (page === "accueil" ? "/" : "/" + page) + "?equipe=1");
    for (let k = 0; k < 40 && !(await p.js(`!!document.querySelector(${JSON.stringify(sel)})`)); k++) await p.attendre(300);
    await p.js(`document.documentElement.style.scrollBehavior='auto'; const e = document.querySelector(${JSON.stringify(sel)}); scrollTo(0, Math.max(0, e.getBoundingClientRect().top + scrollY - 140)); 0`);
    await p.attendre(1800);
    const b = await p.js(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; })()`);
    for (const [fx, fy] of [[.5, .5], [.3, .3], [.22, .22]]) { await p.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: b.x + b.w * fx, y: b.y + b.h * fy }); await p.attendre(120); }
    await p.attendre(700);
    etats.push(await p.js(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); return ${JSON.stringify(sel)} + " → " + (e.classList.contains("r3d-actif") ? "incliné " + getComputedStyle(e).transform.slice(0, 40) : "au repos " + getComputedStyle(e).transform.slice(0, 40)); })()`));
    vues.push(await sharp(await p.vue()).resize({ width: 900 }).toBuffer());
  }
  const metas = await Promise.all(vues.map(v => sharp(v).metadata()));
  const sortie = path.join(D, "relief.jpg");
  await sharp({ create: { width: 906 * vues.length - 6, height: Math.max(...metas.map(m => m.height)), channels: 3, background: "#777" } }).composite(vues.map((v, i) => ({ input: v, left: i * 906, top: 0 }))).jpeg({ quality: 80 }).toFile(sortie);
  etats.forEach(e => console.log(e));
  console.log(sortie, "; erreurs :", p.erreurs.length ? p.erreurs.slice(0, 3) : "aucune");
};
