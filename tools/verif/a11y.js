/* Contrôle d'accessibilité automatique (bases WCAG 2.2 AA) : langue, textes alternatifs, noms des liens et
   boutons, libellés des champs, identifiants en double, ordre des titres, contrastes du texte.
   Les couleurs sont lues en les peignant sur un canevas : tous les formats (color-mix, color(srgb …)) sont compris.
   PAGES=... BASE=... THEME=dark */
const B = process.env.BASE || "http://localhost:5188";
const CONTROLE = `(() => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const visible = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none" && !el.closest("[hidden],[aria-hidden=true]"); };
  const court = el => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className.trim() ? "." + el.className.trim().split(/\\s+/).slice(0, 2).join(".") : "");
  const nom = el => (el.getAttribute("aria-label") || el.getAttribute("title") || el.textContent || (el.querySelector("img[alt]") || {}).alt || "").trim();
  const p = [];
  if (!document.documentElement.lang) p.push("lang manquant");
  document.querySelectorAll("img").forEach(i => { if (!i.hasAttribute("alt")) p.push("image sans alt : " + (i.getAttribute("src") || "").slice(0, 60)); });
  document.querySelectorAll("a[href], button").forEach(el => { if (visible(el) && !nom(el)) p.push("sans nom : " + court(el)); });
  document.querySelectorAll("input, select, textarea").forEach(el => { if (el.type === "hidden" || el.classList.contains("hp") || !visible(el)) return; const lab = el.closest("label") || (el.id && document.querySelector('label[for="' + el.id + '"]')); if (!lab && !el.getAttribute("aria-label")) p.push("champ sans libellé : " + court(el)); });
  const ids = {}; document.querySelectorAll("[id]").forEach(e => ids[e.id] = (ids[e.id] || 0) + 1); Object.entries(ids).filter(([, n]) => n > 1).forEach(([i]) => p.push("id en double : " + i));
  const h1 = [...document.querySelectorAll("main h1")].filter(visible).length; if (h1 !== 1) p.push("main contient " + h1 + " h1 visibles");
  let prec = 1; document.querySelectorAll("main h1, main h2, main h3").forEach(h => { if (!visible(h)) return; const n = +h.tagName[1]; if (n > prec + 1) p.push("titre qui saute un niveau : " + h.tagName + " « " + h.textContent.trim().slice(0, 40) + " »"); prec = n; });
  /* fond effectif : premier ancêtre au fond opaque ; un texte posé sur une photo ou un dégradé n'est pas mesurable ici */
  const fond = el => { for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.backgroundImage && s.backgroundImage !== "none") return null; const c = rgba(s.backgroundColor); if (c[3] > .95) return c; } return rgba(getComputedStyle(document.body).backgroundColor); };
  const vus = new Set(); let n = 0;
  document.querySelectorAll("main *, footer *, header *").forEach(el => {
    if (!visible(el) || ![...el.childNodes].some(t => t.nodeType === 3 && t.textContent.trim().length > 1)) return;
    const s = getComputedStyle(el); if (parseFloat(s.opacity) < .99) return;
    const c = rgba(s.color), f = fond(el); if (!f || c[3] < .99) return;
    const l1 = lum(c), l2 = lum(f), r = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
    const grand = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700); const seuil = grand ? 3 : 4.5; n++;
    if (r < seuil) { const k = court(el) + s.color; if (!vus.has(k)) { vus.add(k); p.push("contraste " + r.toFixed(2) + " < " + seuil + " : " + court(el) + " « " + el.textContent.trim().slice(0, 30) + " » (rgb " + c.slice(0, 3).join(",") + " sur rgb " + f.slice(0, 3).join(",") + ")"); } }
  });
  return { textes: n, problemes: p };
})()`;
module.exports = async p => {
  await p.taille(+(process.env.LARGEUR || 1366), 900, (+(process.env.LARGEUR || 1366)) < 700);
  const res = {};
  for (const nom of (process.env.PAGES || "accueil,poles,avec,outils,outils/akiba,conseil,academie,a-propos,ong,contact,confidentialite").split(",")) {
    await p.aller(B + (nom === "accueil" ? "/" : "/" + nom) + "?equipe=1");
    for (let k = 0; k < 40 && !(await p.js('!!document.querySelector("#footer .foot-links")')); k++) await p.attendre(300);
    if (process.env.THEME) await p.js(`document.documentElement.dataset.theme = ${JSON.stringify(process.env.THEME)}; 0`);
    await p.js(`document.querySelectorAll('.jeu,.reveal,.img-mouv').forEach(e=>{e.classList.remove('jeu');e.classList.add('in','vu');}); document.querySelectorAll('*').forEach(e=>{e.style.transition='none';e.style.animation='none';}); 0`);
    await p.attendre(1200);
    const r = await p.js(CONTROLE);
    res[nom] = r.problemes.length ? r.problemes : `aucun problème (${r.textes} textes mesurés)`;
  }
  console.log(JSON.stringify(res, null, 1));
  console.log("erreurs :", p.erreurs.length ? p.erreurs.slice(0, 3) : "aucune");
};
