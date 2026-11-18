/* Localise les pixels qui changent entre styles.css et styles.min.css sur une page : PAGE=contact ECRAN=0 */
const sharp = require("C:/Users/CUBAKA/Documents/academie-ubora/node_modules/sharp");
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  await p.taille(1366, 900, false);
  const vues = {};
  for (const f of ["styles.css", "styles.min.css"]) {
    await p.aller(`${B}/${process.env.PAGE || "contact"}?equipe=1`);
    for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#footer .foot-links")')); k++) await p.attendre(300);
    await p.js(`(async () => { const l = document.querySelector('link[rel=stylesheet][href*="styles"]'); if (${JSON.stringify(f)} === "styles.min.css") await new Promise(r => { const n = l.cloneNode(); n.href = '/styles.min.css?v=cmp'; n.onload = r; l.after(n); l.remove(); });
      document.querySelectorAll('*').forEach(e => { e.style.animation = 'none'; e.style.transition = 'none'; }); scrollTo(0, ${(+process.env.ECRAN || 0) * 900}); return 0; })()`);
    await p.attendre(1500);
    vues[f] = await p.vue();
  }
  const a = await sharp(vues["styles.css"]).raw().toBuffer({ resolveWithObject: true }), b = await sharp(vues["styles.min.css"]).raw().toBuffer();
  const { width: W, channels: C } = a.info; let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let i = 0; i < a.data.length; i += C) if (Math.abs(a.data[i] - b[i]) + Math.abs(a.data[i + 1] - b[i + 1]) + Math.abs(a.data[i + 2] - b[i + 2]) > 30) { const px = (i / C) % W, py = Math.floor(i / C / W); x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py); }
  console.log("zone :", x0, y0, x1, y1);
  const el = await p.js(`(() => { const e = document.elementFromPoint(${Math.round((x0 + x1) / 2)}, ${Math.round((y0 + y1) / 2)}); return e ? e.outerHTML.slice(0, 300) : null; })()`);
  console.log("élément :", el);
  if (x1 >= 0) { const box = { left: Math.max(0, x0 - 60), top: Math.max(0, y0 - 40), width: Math.min(W - Math.max(0, x0 - 60), x1 - x0 + 120), height: Math.min(900 - Math.max(0, y0 - 40), y1 - y0 + 80) };
    const os = require("os"), path = require("path");
    await sharp({ create: { width: box.width * 2 + 10, height: box.height, channels: 3, background: "#f00" } }).composite([{ input: await sharp(vues["styles.css"]).extract(box).toBuffer(), left: 0, top: 0 }, { input: await sharp(vues["styles.min.css"]).extract(box).toBuffer(), left: box.width + 10, top: 0 }]).png().toFile(path.join(os.tmpdir(), "vues-ubora", "zone-diff.png"));
  }
};
