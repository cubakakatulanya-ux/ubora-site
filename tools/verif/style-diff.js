/* Compare le style calculé d'éléments entre styles.css et styles.min.css : PAGE=contact SEL="#c-besoin" */
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  await p.taille(1366, 900, false);
  const res = {};
  for (const f of ["styles.css", "styles.min.css"]) {
    await p.aller(`${B}/${process.env.PAGE || "contact"}?equipe=1`);
    for (let k = 0; k < 40 && !(await p.js(`!!document.querySelector(${JSON.stringify(process.env.SEL)})`)); k++) await p.attendre(300);
    res[f] = await p.js(`(async () => { const l = document.querySelector('link[rel=stylesheet][href*="styles"]'); if (${JSON.stringify(f)} === "styles.min.css") await new Promise(r => { const n = l.cloneNode(); n.href = '/styles.min.css?v=cmp'; n.onload = r; l.after(n); l.remove(); });
      await new Promise(r => setTimeout(r, 800));
      const out = {}; document.querySelectorAll(${JSON.stringify(process.env.SEL)}).forEach((e, i) => { const s = getComputedStyle(e); for (const k of s) out[i + ":" + k] = s.getPropertyValue(k); }); return out; })()`);
  }
  const a = res["styles.css"], b = res["styles.min.css"];
  const d = Object.keys({ ...a, ...b }).filter(k => a[k] !== b[k]);
  console.log(d.length ? d.map(k => `${k} : « ${a[k]} » → « ${b[k]} »`).join("\n") : "aucune différence de style calculé");
};
