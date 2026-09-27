/* ==========================================================================
   UBORA — Fonctionnement du site
   Le contenu est dans data.js. Ce fichier construit les pages.
   Les fonctions de rendu ne touchent pas au navigateur : elles servent aussi
   à générer les pages statiques lues par les moteurs de recherche.
   ========================================================================== */

/* ---------- Icônes ---------- */
const sv = (d, w = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  compass: sv('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>'),
  target: sv('<path d="M10 5h10M10 12h10M10 19h10"/><path d="M3 5l1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18"/>'),
  flow: sv('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>'),
  school: sv('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v6"/>'),
  users: sv('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3.2-6 6.5-6s6 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.2c2.8-.3 5 1.7 5.5 4.8"/>'),
  wifi: sv('<path d="M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0"/><path d="M3 3l18 18"/>'),
  coins: sv('<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3"/>'),
  phoneM: sv('<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>'),
  handshake: sv('<path d="M2 12l4-4 4 2 3-3 4 1 5 4"/><path d="M6 8v6l5 5 2-2M13 17l2 2 3-3M16 13l3 3"/>'),
  map: sv('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
  briefcase: sv('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/>'),
  calendar: sv('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 2),
  clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 2),
  pin: sv('<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>', 2),
  mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', 2),
  phone: sv('<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>', 2),
  check: sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.4),
  arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>', 2),
  ext: sv('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>', 2),
  chev: sv('<path d="M6 9l6 6 6-6"/>', 2.2),
  bell: sv('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  seat: sv('<circle cx="12" cy="7" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>', 2),
  heart: sv('<path d="M12 20s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.5-8 11-8 11z"/>'),
  spark: sv('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>'),
  doc: sv('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>')
};

/* ---------- Utilitaires ---------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const d12 = d => new Date(d + "T12:00:00");
const fmtDate = d => d12(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const todayISO = () => new Date().toISOString().slice(0, 10);
const waLink = txt => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
const pole = id => POLES.find(p => p.id === id);
const outil = id => OUTILS.find(o => o.id === id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const ext = url => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";

/* Typographie française : espace fine insécable avant ; : ! ? et dans les guillemets */
function typoHTML(html) {
  return html.split(/(<[^>]+>)/).map(part => part.startsWith("<") ? part
    : part.replace(/ ([;:!?»])/g, " $1").replace(/« /g, "« ")).join("");
}

/* ---------- Écrans illustratifs ---------- */
function browser(url, inner) {
  return `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>${inner}</div>`;
}
function areaChart(pts, w = 300, h = 80) {
  const max = Math.max(...pts) * 1.1, step = w / (pts.length - 1);
  const xy = pts.map((v, i) => [i * step, h - (v / max) * h]);
  const line = xy.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const last = xy[xy.length - 1];
  return `<svg viewBox="0 0 ${w} ${h + 4}" aria-hidden="true"><defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8DCB4F" stop-opacity=".4"/><stop offset="1" stop-color="#8DCB4F" stop-opacity="0"/></linearGradient></defs>
    ${[0.25, 0.5, 0.75].map(f => `<line x1="0" x2="${w}" y1="${h * f}" y2="${h * f}" stroke="rgba(255,255,255,.07)"/>`).join("")}
    <path d="${line} L${w} ${h} L0 ${h}Z" fill="url(#ag)"/><path d="${line}" fill="none" stroke="#9BD65E" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="${last[0] - 3}" cy="${last[1]}" r="4.5" fill="#fff" stroke="#5DB53C" stroke-width="2.5"/></svg>`;
}
function mockAkiba() {
  return `<div class="phone"><div class="phone-screen">
    <div class="ph-top"><div class="ph-row"><span>AKIBA</span><span>Groupe n° 12</span></div>
      <small>Caisse commune</small><b>4 860 000 FC</b>
      <small class="ph-gap">Semaine 24 sur 36 · 25 membres</small><div class="ph-prog"><i></i></div></div>
    <div class="ph-body">
      <div class="ph-tx"><span>Cotisation · membre 07</span><span>+20 000</span></div>
      <div class="ph-tx"><span>Remboursement · membre 14</span><span>+55 000</span></div>
      <div class="ph-tx out"><span>Prêt · membre 03</span><span>−150 000</span></div>
      <div class="ph-btn">+ Nouvelle cotisation</div>
    </div></div></div>`;
}
function mockHub() {
  const ppl = [["01", "Entreprise 01", 82, "#9BD65E"], ["02", "Entreprise 02", 64, "#7FB3FF"], ["03", "Entreprise 03", 47, "#E3A064"]];
  return browser("uborahub.com/cohortes", `<div class="hub">
    <div class="hub-side"><div class="on">Tableau de bord</div><div>Candidatures</div><div>Cohortes</div><div>Coaching</div><div>Rapports</div></div>
    <div class="hub-main">
      <div class="hub-kpis"><div><small>Entrepreneurs</small><b>25</b></div><div><small>Séances</small><b>142</b></div><div><small>Ventes</small><b>+18 %</b></div></div>
      <div class="hub-chart"><small>Ventes cumulées de la cohorte</small>${areaChart([12, 15, 14, 19, 22, 21, 27, 31, 30, 36, 41, 46])}</div>
      <div class="hub-list">${ppl.map(([i, n, p, c]) => `<div><span class="av" style="background:${c}">${i}</span><span>${n}</span><span class="bar"><i style="width:${p}%"></i></span></div>`).join("")}</div>
    </div></div>`);
}
/* rows : [colonne1, colonne2, colonne3, libellé d'état, état positif ?] */
function mockTable(url, kpis, head, rows, chart) {
  return browser(url, `<div class="mock-pad">
    <div class="hub-kpis">${kpis.map(([l, v]) => `<div><small>${l}</small><b>${v}</b></div>`).join("")}</div>
    ${chart ? `<div class="hub-chart"><small>${chart[0]}</small>${areaChart(chart[1])}</div>` : ""}
    <div class="table-x"><table class="mock-t"><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="${r[4] ? "ok" : "wait"}">${r[3]}</td></tr>`).join("")}</tbody></table></div></div>`);
}
const MOCKS = {
  akiba: mockAkiba,
  hub: mockHub,
  coop: () => mockTable("ubora-coop · collecte", [["Membres", "184"], ["Collecté", "62 t"], ["Payé", "78 %"]], ["Producteur", "Village", "Maïs (kg)", "Paiement"],
    [["Producteur 01", "Village A", "1 250", "Payé", 1], ["Producteur 02", "Village A", "980", "Payé", 1], ["Producteur 03", "Village B", "1 540", "En attente", 0], ["Producteur 04", "Village C", "720", "Payé", 1]]),
  fin: () => mockTable("ubora-fin · portefeuille", [["Encours", "48 200 $"], ["Épargne", "61 900 $"], ["Retards", "3,1 %"]], ["Client", "Crédit", "Échéance", "État"],
    [["Client 01", "1 200 $", "28/09", "À jour", 1], ["Client 02", "650 $", "30/09", "À jour", 1], ["Client 03", "900 $", "15/09", "En retard", 0]], ["Encours de crédit sur douze mois", [18, 20, 22, 25, 27, 29, 31, 34, 38, 41, 45, 48]]),
  market: () => mockTable("ubora-market · offre", [["Offre", "38 t"], ["Acheteurs", "6"], ["Sous contrat", "54 %"]], ["Produit", "Origine", "Volume", "État"],
    [["Maïs blanc", "Coopérative A", "18 t", "Sous contrat", 1], ["Soja", "Coopérative B", "7 t", "En discussion", 0], ["Farine de manioc", "Atelier C", "2,5 t", "Sous contrat", 1]]),
  pme: () => browser("bp.uborardc.com", `<div class="mock-pad">
    <div class="mock-title"><b>Plan d'affaires</b><span>62 % complété</span></div>
    <div class="hub-list">${[["Projet et équipe", 100], ["Marché", 100], ["Stratégie commerciale", 70], ["Prévisions financières", 40], ["Dossier final", 0]].map(([n, p]) => `<div class="bp-row"><span class="bp-dot${p === 100 ? " done" : ""}"></span><span>${n}</span><span class="bar"><i style="width:${p}%"></i></span></div>`).join("")}</div>
    <div class="hub-kpis"><div><small>Investissement</small><b>8 500 $</b></div><div><small>Rentable au</small><b>mois 9</b></div><div><small>Marge an 2</small><b>21 %</b></div></div></div>`)
};
const mockFor = id => (MOCKS[id] || mockHub)();

/* ---------- Composants ---------- */
function pageHead({ eyebrow, title, lead, crumbs = [], extra = "" }) {
  return `<section class="deep page-head"><div class="wrap">
      <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a>${crumbs.map(([t, h]) => h ? `<span><a href="${h}">${t}</a></span>` : `<span>${t}</span>`).join("")}</nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
      ${extra}
    </div></section>`;
}
function secHead(eyebrow, title, lead, action) {
  return `<div class="sec-head${action ? " split" : ""}"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ""}</div>${action || ""}</div>`;
}
function statut(o) {
  return o.statut === "en-ligne" ? `<span class="status st-live">En ligne</span>` : `<span class="status st-soon">En préparation</span>`;
}
function poleCard(p, feature) {
  return `<article class="pole${feature ? " feature" : ""}" style="--c:${p.couleur}">
    <div class="pole-top"><span class="mk">${esc(p.initiales)}</span><a class="pole-sub" href="https://${p.sousDomaine}">${esc(p.sousDomaine)}</a></div>
    <h3><a class="stretch" href="${p.chemin}">${esc(p.nom)}</a></h3>
    <p>${esc(p.carte)}</p>
    <span class="link">Découvrir le pôle ${ICON.arrow}</span>
  </article>`;
}
function outilCard(o) {
  const p = pole(o.pole);
  const href = o.statut === "en-ligne" ? o.url : "/outils#" + o.id;
  return `<article class="tool" style="--c:${o.couleur}">
    <div class="pole-top"><span class="mk">${esc(o.initiales)}</span>${statut(o)}</div>
    <h3><a class="stretch" href="${href}"${ext(href)}>${esc(o.nom)}</a></h3>
    <p>${esc(o.resume)}</p>
    <div class="tool-foot"><span>Pôle ${esc(p.nom)}</span>${o.sousDomaine ? `<span class="mono">${esc(o.sousDomaine)}</span>` : ""}</div>
  </article>`;
}
function constats(list) {
  return `<ul class="constats">${list.map(([t, x]) => `<li><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join("")}</ul>`;
}
function parcoursList(list) {
  return `<ol class="parcours">${list.map(([t, x, r], k) => `<li class="reveal"><span class="pn">${String(k + 1).padStart(2, "0")}</span>
    <div><h3>${esc(t)}</h3><p>${esc(x)}</p><p class="resultat">${esc(r)}</p></div></li>`).join("")}</ol>`;
}
function boiteOutils(b, sujet) {
  if (!b) return "";
  const dispo = b.statut === "disponible";
  return `<section class="band" id="boite"><div class="wrap">
    ${secHead(dispo ? "Boîte à outils" : "Bientôt disponible", esc(b.titre), esc(b.intro))}
    <ol class="boite">${b.outils.map(([t, x], i) => `<li><span class="bn">${String(i + 1).padStart(2, "0")}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <div class="notice"><span class="ic">${dispo ? ICON.doc : ICON.bell}</span>
      <div><b>${dispo ? "Recevoir la boîte à outils" : "Être prévenu de sa publication"}</b>
        <p>${dispo ? "Dites-nous qui vous êtes et comment vous comptez l'utiliser. Nous vous envoyons les documents et nous prenons le temps de vous les présenter." : "Laissez-nous vos coordonnées. Nous vous écrirons dès que les documents seront prêts."}</p></div>
      <div class="notice-btns"><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent(sujet)}">${dispo ? "Faire la demande" : "Me prévenir"}</a>
        ${dispo ? `<a class="btn btn-wa btn-sm" href="${waLink("Bonjour Ubora, je souhaite recevoir la " + b.titre.charAt(0).toLowerCase() + b.titre.slice(1) + ".")}" target="_blank" rel="noopener">Par WhatsApp</a>` : ""}</div>
    </div>
  </div></section>`;
}
function faq(items) { return `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`; }
function finalCta() {
  return `<div class="deep final">
    <span class="eyebrow">Travaillons ensemble</span>
    <h2>Un projet, un programme, une question ?</h2>
    <p>Dites-nous où vous en êtes. Nous vous répondons sous deux jours ouvrés.</p>
    <div class="btn-row"><a class="btn btn-wa" href="${waLink("Bonjour Ubora, je souhaite échanger avec vous.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-glass" href="/contact">Nous écrire</a></div></div>`;
}
function cover(n) {
  const C = { "Terrain": ["#1F7A34", "#6FB33F"], "Programme": ["#0F3170", "#2F5FB0"], "Coopératives": ["#3E7F2A", "#9BC53D"], "Événement": ["#8C4A1F", "#C9793F"], "Partenariat": ["#273B5E", "#4F6A93"], "Formation": ["#0E5A6B", "#2E9CA8"], "Recrutement": ["#4A2F7A", "#7E5BC2"] };
  const [a, b] = C[n.categorie] || ["#0F3170", "#23843A"];
  return `<div class="cover" style="background:linear-gradient(135deg,${a},${b})"><span class="cat">${esc(n.categorie)}</span></div>`;
}
function newsCard(n) {
  return `<a class="card-news" href="/actualites/${esc(n.slug)}">${cover(n)}
    <span class="date">${fmtDate(n.date)}</span><h3>${esc(n.titre)}</h3><p>${esc(n.extrait)}</p></a>`;
}
function allNews() {
  return [...DATA.actualites].sort((a, b) => b.date.localeCompare(a.date));
}

/* ---------- En-tête, pied de page, bande déroulante ---------- */
function menuHTML() {
  return `
    <li><a href="/" data-r="">Accueil</a></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="a-propos" aria-expanded="false">Ubora ${ICON.chev}</button>
      <div class="dd dd-list">
        <a href="/a-propos"><b>Qui sommes-nous</b><small>Mission, modèle social, équipe</small></a>
        <a href="/approche"><b>Notre approche</b><small>La méthode Ubora</small></a>
        <a href="/conseil"><b>Conseil et programmes</b><small>Pour les ONG et les bailleurs</small></a>
        <a href="/carrieres"><b>Carrières</b><small>Rejoindre l'équipe</small></a>
      </div></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="poles" aria-expanded="false">Pôles et outils ${ICON.chev}</button>
      <div class="dd dd-mega">
        <div class="dd-col"><h5>Nos pôles</h5>${POLES.map(p => `<a href="${p.chemin}" class="dd-item"><span class="mk" style="background:${p.couleur}">${p.initiales}</span><span><b>${esc(p.nom)}</b><small>${esc(p.sousDomaine)}</small></span></a>`).join("")}</div>
        <div class="dd-col"><h5>Nos outils</h5>${OUTILS.filter(o => o.statut === "en-ligne").map(o => `<a href="${o.url}" target="_blank" rel="noopener" class="dd-item"><span class="mk" style="background:${o.couleur}">${o.initiales}</span><span><b>${esc(o.nom)}</b><small>${esc(o.sousDomaine)}</small></span></a>`).join("")}
          <a href="/outils" class="dd-more">Tous les outils ${ICON.arrow}</a><a href="/formations" class="dd-more">Formations ${ICON.arrow}</a></div>
      </div></li>
    <li><a href="/actualites" data-r="actualites">Actualités</a></li>
    <li><a href="/contact" data-r="contact">Contact</a></li>
    <li class="m-cta"><a class="btn btn-accent" href="/contact">Nous contacter</a></li>`;
}
function footerHTML() {
  return `<div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="/"><img class="logo-img" src="/logo.png" alt="" width="64" height="64"><span class="brand-txt"><span class="brand-name">ub<b>o</b>ra</span><span class="brand-sub">Entreprise sociale</span></span></a>
        <p>Nous aidons les groupes d'épargne, les entrepreneurs, les coopératives et les institutions financières de la RDC à devenir plus solides.</p>
      </div>
      <div><h4>Nos pôles</h4><ul>${POLES.map(p => `<li><a href="${p.chemin}">${esc(p.nom)}</a><a class="foot-sub" href="https://${p.sousDomaine}">${esc(p.sousDomaine)}</a></li>`).join("")}</ul></div>
      <div><h4>Nos outils</h4><ul>${OUTILS.filter(o => o.statut === "en-ligne").map(o => `<li><a href="${o.url}" target="_blank" rel="noopener">${esc(o.nom)}</a><span class="foot-sub">${esc(o.sousDomaine)}</span></li>`).join("")}<li><a href="/outils">Tous les outils</a></li><li><a href="/formations">Formations</a></li></ul></div>
      <div><h4>Ubora</h4><ul><li><a href="/a-propos">Qui sommes-nous</a></li><li><a href="/approche">Notre approche</a></li><li><a href="/conseil">Conseil et programmes</a></li><li><a href="/actualites">Actualités</a></li><li><a href="/carrieres">Carrières</a></li><li><a href="/contact">Contact</a></li></ul></div>
      <div><h4>Nous joindre</h4><ul>
        <li><a href="tel:${CONFIG.telephone.replace(/\s/g, "")}">${esc(CONFIG.telephone)}</a></li>
        <li><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>
        <li>${esc(CONFIG.adresse)}</li></ul>
        <h4 class="h4-gap">Lettre d'information</h4>
        <form class="news-form" id="newsForm"><input id="nlEmail" type="email" required maxlength="160" placeholder="Votre adresse e-mail" aria-label="Adresse e-mail"><input class="hp" id="nlSite" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn btn-accent btn-sm" type="submit">S'inscrire</button></form>
      </div>
    </div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} Ubora, entreprise sociale · Siège à Lubumbashi · Interventions dans toute la RDC</span><span class="foot-links"><a href="/mentions">Mentions légales</a><a href="/admin" rel="nofollow">Espace équipe</a></span></div>
  </div>`;
}
function tickerHTML() {
  const items = [...allNews().slice(0, 3).map(n => [n.titre, "/actualites/" + n.slug]), ...TICKER_MESSAGES];
  const one = items.map(([t, h]) => `<a href="${h}"${ext(h)}>${esc(t)}</a>`).join("");
  return one + one.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ');
}

/* ==========================================================================
   PAGES
   ========================================================================== */
function pageHome() {
  const news = allNews().slice(0, 3);
  return `
  <section class="deep hero"><canvas id="net" aria-hidden="true"></canvas>
    <div class="wrap hero-grid">
      <div>
        <span class="pill"><b>Entreprise sociale</b> Lubumbashi · RDC</span>
        <h1>Bâtir la <span class="serif">résilience économique</span> des familles, des entreprises et des coopératives congolaises.</h1>
        <p class="lead">Ubora accompagne les groupes d'épargne, les entrepreneurs, les coopératives et les institutions financières. Nous travaillons sur le terrain, avec des outils numériques pensés pour les réalités du pays.</p>
        <div class="btn-row"><a class="btn btn-accent" href="#poles" data-scroll="poles">Découvrir nos pôles ${ICON.arrow}</a><a class="btn btn-glass" href="/contact">Nous contacter</a></div>
        <ul class="trust"><li>Fonctionne sans réseau</li><li>Francs congolais et dollars</li><li>Compatible mobile money</li></ul>
      </div>
      <div class="stage">${mockHub()}${mockAkiba()}
        <div class="float-card"><span class="ic">${ICON.check}</span><span><b>Cotisation reçue</b>+20 000 FC par Airtel Money</span></div>
        <span class="mock-note">Écrans illustratifs</span></div>
    </div>
  </section>

  <section id="poles"><div class="wrap">
    ${secHead("Nos pôles", `Cinq pôles, chacun avec sa <span class="serif">démarche</span>`, "Chaque pôle a sa propre adresse. Vous y trouverez le contexte dans lequel nous travaillons, nos étapes d'accompagnement, les outils associés et une boîte à outils.")}
    <div class="poles">${POLES.map((p, i) => poleCard(p, i === 0)).join("")}</div>
  </div></section>

  <section class="band"><div class="wrap social">
    <div>
      <span class="eyebrow">Une entreprise sociale</span>
      <h2>Notre modèle fait payer ceux qui peuvent, pour servir ceux qui ne peuvent pas.</h2>
      <p class="lead">Nous ne sommes ni une ONG qui dépend d'un financement, ni une entreprise qui ne sert que les clients solvables. Nos revenus viennent de nos prestations. Ils financent notre présence auprès de ceux qui en ont le plus besoin.</p>
      <a class="btn btn-ghost" href="/a-propos#modele">Comprendre notre modèle ${ICON.arrow}</a>
    </div>
    <ol class="model">
      <li><span class="bn">1</span><div><b>Les organisations paient</b><span>ONG, bailleurs, institutions financières, programmes publics et privés financent nos prestations.</span></div></li>
      <li><span class="bn">2</span><div><b>Les plus fragiles accèdent à tarif solidaire</b><span>Groupes d'épargne, femmes et jeunes entrepreneurs, producteurs ruraux.</span></div></li>
      <li><span class="bn">3</span><div><b>Les excédents sont réinvestis</b><span>Dans nos outils, dans la formation de relais locaux et dans notre présence sur le terrain.</span></div></li>
    </ol>
  </div></section>

  <section><div class="wrap">
    ${secHead("Nos outils numériques", `Des outils faits pour le <span class="serif">terrain</span> congolais`, "Chaque outil est lié à un pôle et livré avec une formation. Trois sont déjà en ligne, d'autres sont en préparation.", `<a class="btn btn-ghost" href="/outils">Voir tous les outils ${ICON.arrow}</a>`)}
    <div class="tools">${OUTILS.map(outilCard).join("")}</div>
  </div></section>

  <section class="band"><div class="wrap">
    ${secHead("Pourquoi Ubora", `Une équipe de terrain, avec ses propres <span class="serif">outils</span>`)}
    <div class="grid-4">
      <div class="fcard reveal"><span class="ic">${ICON.map}</span><h3>Nous connaissons le terrain</h3><p>Groupes d'épargne, coopératives, PME et institutions financières, en ville comme en zone rurale.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.compass}</span><h3>Une méthode éprouvée</h3><p>Six temps, toujours dans le même ordre, du premier diagnostic jusqu'à l'autonomie.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.phoneM}</span><h3>Nos propres outils</h3><p>Conçus, déployés et maintenus par nous, pour les contraintes du pays.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.handshake}</span><h3>Un modèle qui dure</h3><p>Nos revenus viennent de nos prestations, pas d'un projet qui se termine.</p></div>
    </div>
  </div></section>

  ${news.length ? `<section><div class="wrap">
    ${secHead("Actualités", "Nouvelles du terrain", "", `<a class="btn btn-ghost" href="/actualites">Toutes les actualités ${ICON.arrow}</a>`)}
    <div class="news-grid">${news.map(newsCard).join("")}</div>
  </div></section>` : ""}

  <section><div class="wrap">${finalCta()}</div></section>`;
}

function teamBand() {
  return `<div class="deep team-band">
    <div><span class="eyebrow">Notre équipe</span>
      <h2>Une équipe qui a de l'expérience et qui connaît le terrain.</h2>
      <p class="lead">Consultants, formateurs et développeurs, nous avons accompagné des entrepreneurs, des groupes d'épargne, des coopératives et des institutions financières. Nous connaissons les réalités de nos bénéficiaires parce que nous les vivons aussi.</p>
      <a class="btn btn-glass" href="/carrieres">Nous rejoindre ${ICON.arrow}</a></div>
    <ul class="team-list">
      <li><span class="ic">${ICON.map}</span><div><b>L'expérience du terrain</b><span>Des années d'accompagnement en RDC, dans plusieurs provinces.</span></div></li>
      <li><span class="ic">${ICON.spark}</span><div><b>Deux compétences réunies</b><span>La finance, la gestion et l'agriculture d'un côté, le numérique de l'autre.</span></div></li>
      <li><span class="ic">${ICON.users}</span><div><b>La proximité</b><span>Sur place quand il le faut, joignables sur WhatsApp le reste du temps.</span></div></li>
      <li><span class="ic">${ICON.handshake}</span><div><b>Un réseau</b><span>Des liens avec les microfinances, les bailleurs et les acteurs publics.</span></div></li>
    </ul></div>`;
}

function pageAbout() {
  return pageHead({ eyebrow: "Qui sommes-nous", title: `Une entreprise sociale au service de la <span class="serif">résilience économique</span>.`, crumbs: [["Qui sommes-nous"]],
    lead: "Ubora veut dire « excellence » en swahili. Nous sommes nés à Lubumbashi et nous travaillons dans toute la RDC, pour que les familles, les entreprises et les coopératives résistent mieux aux coups durs et puissent se développer." }) + `
  <section><div class="wrap two">
    <div><span class="eyebrow">Mission</span>
      <p class="quote">Aider les entreprises et les communautés congolaises à tenir face aux chocs, puis à grandir.</p></div>
    <div class="prose-sm">
      <p>La plupart des entreprises du pays restent informelles, sans outils de gestion et loin du crédit. Au moindre choc, une hausse des prix, la chute du franc, une mauvaise récolte ou une maladie, elles perdent ce qu'elles ont construit.</p>
      <p>Nous agissons sur ce qui rend une activité plus solide : une organisation claire, l'accès à l'épargne et au crédit, des outils de gestion adaptés et des compétences. Nos outils sont conçus pour les contraintes réelles du pays : un réseau instable, deux monnaies, le mobile money et une faible bancarisation.</p>
    </div>
  </div></section>

  <section class="band" id="modele"><div class="wrap">
    ${secHead("Notre modèle", `Pourquoi nous avons choisi d'être une <span class="serif">entreprise sociale</span>`, "Les projets financés pour deux ou trois ans s'arrêtent souvent au moment où les bénéficiaires commencent à progresser. Nous voulions pouvoir rester.")}
    <div class="grid-3">
      <div class="fcard"><span class="ic">${ICON.briefcase}</span><h3>Qui paie</h3><p>Les ONG, les bailleurs, les institutions financières, les incubateurs et les programmes publics ou privés qui nous confient des missions.</p></div>
      <div class="fcard"><span class="ic">${ICON.heart}</span><h3>Qui en bénéficie</h3><p>Les groupes d'épargne, les femmes et les jeunes entrepreneurs, les producteurs ruraux, qui accèdent à nos services à tarif solidaire.</p></div>
      <div class="fcard"><span class="ic">${ICON.spark}</span><h3>Ce que nous réinvestissons</h3><p>Le développement de nos outils, la formation de relais locaux et le temps passé sur le terrain, là où c'est nécessaire.</p></div>
    </div>
    <p class="note">Être rentables n'est pas une fin en soi. C'est ce qui nous permet d'être encore là au cycle suivant.</p>
  </div></section>

  <section><div class="wrap">
    ${secHead("Nos valeurs", `Quatre mots <span class="serif">swahili</span> qui nous guident`)}
    <div class="grid-4">
      <div class="value"><small>ubora</small><h3>L'excellence</h3><p>Un travail sérieux et des outils fiables. Nos bénéficiaires ne méritent pas moins.</p></div>
      <div class="value"><small>ustahimilivu</small><h3>La résilience</h3><p>Aider les familles et les entreprises à traverser les crises, puis à repartir.</p></div>
      <div class="value"><small>uwazi</small><h3>La transparence</h3><p>Des comptes clairs et des données partagées. La confiance se construit ainsi.</p></div>
      <div class="value"><small>umoja</small><h3>La solidarité</h3><p>Personne n'est laissé de côté. Les femmes, les jeunes et les zones rurales d'abord.</p></div>
    </div>
  </div></section>

  <section class="tight-top"><div class="wrap">${teamBand()}</div></section>

  <section class="band"><div class="wrap">
    ${secHead("Objectifs de développement durable", "Ce à quoi notre travail contribue")}
    <div class="odd">
      <span><b style="background:#E5243B">1</b> Pas de pauvreté</span><span><b style="background:#DDA63A">2</b> Faim « zéro »</span><span><b style="background:#FF3A21">5</b> Égalité entre les sexes</span>
      <span><b style="background:#A21942">8</b> Travail décent et croissance</span><span><b style="background:#FD6925">9</b> Industrie et innovation</span><span><b style="background:#DD1367">10</b> Inégalités réduites</span>
    </div>
  </div></section>

  <section id="faq"><div class="wrap narrow">${secHead("Questions fréquentes", "Vous vous demandez peut-être")}${faq(FAQ)}</div></section>`;
}

function pageApproche() {
  return pageHead({ eyebrow: "Notre approche", title: `Former sans outiller ne suffit pas. Outiller sans accompagner non plus.`, crumbs: [["Notre approche"]],
    lead: METHODE.intro }) + `
  <section><div class="wrap">
    ${secHead(METHODE.nom, "Six temps, toujours dans le même ordre")}
    <ol class="steps">${METHODE.etapes.map((e, i) => `<li class="reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p><p class="why"><b>Pourquoi en RDC</b>${esc(e.pourquoi)}</p></li>`).join("")}</ol>
  </div></section>

  <section class="band"><div class="wrap">
    ${secHead("Nos principes", `Chaque contrainte du terrain devient une <span class="serif">règle</span> de conception`)}
    <div class="grid-4">
      <div class="fcard reveal"><span class="ic">${ICON.wifi}</span><h3>Sans réseau d'abord</h3><p>Hors des villes, le réseau va et vient. On saisit sans connexion, la synchronisation se fait au retour du signal.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.coins}</span><h3>Deux monnaies</h3><p>L'économie congolaise vit en francs et en dollars. Nos outils gèrent les deux.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.phoneM}</span><h3>Le mobile money</h3><p>L'argent circule par M-Pesa, Airtel Money et Orange Money bien plus que par les banques.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.school}</span><h3>La formation comprise</h3><p>Un outil que personne ne maîtrise ne sert à rien. Chaque déploiement inclut formation et suivi.</p></div>
    </div>
  </div></section>

  <section><div class="wrap">
    ${secHead("Sur le terrain", "La méthode, appliquée à chacun de nos pôles")}
    <div class="poles poles-sm">${POLES.map(p => poleCard(p, false)).join("")}</div>
  </div></section>

  <section class="tight-top"><div class="wrap">${finalCta()}</div></section>`;
}

/* ---------- Page d'un pôle ---------- */
function pagePole(id) {
  const P = pole(id); if (!P) return notFound();
  const outilsLies = (P.outils || []).map(outil).filter(Boolean);
  const enLigne = outilsLies.filter(o => o.statut === "en-ligne");
  return pageHead({
    eyebrow: esc(P.nom), title: P.titre, lead: esc(P.lead), crumbs: [["Nos pôles", "/#poles"], [esc(P.nom)]],
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(P.nom)}">Parler de votre projet ${ICON.arrow}</a>
      ${P.boite ? `<a class="btn btn-glass" href="#boite" data-scroll="boite">La boîte à outils</a>` : ""}
      ${enLigne.map(o => `<a class="btn btn-glass" href="${o.url}" target="_blank" rel="noopener">Ouvrir ${esc(o.nom)} ${ICON.ext}</a>`).join("")}</div>
      <a class="sub-chip" href="https://${P.sousDomaine}">${esc(P.sousDomaine)}</a>`
  }) + `

  <section><div class="wrap two">
    <div>
      <span class="eyebrow">Le contexte en RDC</span>
      <h2 class="h2-md">Ce que nous constatons sur le terrain</h2>
      <p class="lead">${esc(P.contexte.intro)}</p>
      ${P.avec ? `<div class="definition"><b>Qu'est-ce qu'une AVEC ?</b><p>${esc(AVEC.definition)}</p></div>` : ""}
    </div>
    <div class="panel">${constats(P.contexte.constats)}</div>
  </div></section>

  ${P.programmes ? `<section class="band"><div class="wrap">
    ${secHead("Nos programmes", "Trois programmes, selon le stade de l'entreprise")}
    <div class="grid-3">${P.programmes.map(([t, q, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p class="sub">${esc(q)}</p><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.entrees ? `<section class="band"><div class="wrap">
    ${secHead("Deux points de départ", "Nous partons toujours de ce qui existe")}
    <div class="grid-2">${P.entrees.map(([t, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  <section${P.programmes || P.entrees ? "" : ' class="band"'}><div class="wrap">
    ${secHead("Notre démarche", "Étape par étape", "Chaque étape doit produire un résultat concret avant que l'on passe à la suivante.")}
    ${parcoursList(P.parcours)}
  </div></section>

  ${P.avec ? `<section class="band"><div class="wrap">
    ${secHead("Digitalisation", `Ce qui change avec <span class="serif">AKIBA</span>`, "Le groupe garde ses règles et ses réunions. Seule la tenue des comptes change, et tout le monde peut désormais la vérifier.")}
    <div class="two align-center">
      <div class="table-wrap"><table class="compare"><thead><tr><th></th><th>Avec le cahier</th><th>Avec AKIBA</th></tr></thead>
        <tbody>${AVEC.avantApres.map(([q, a, b]) => `<tr><th scope="row">${esc(q)}</th><td>${esc(a)}</td><td class="ok">${esc(b)}</td></tr>`).join("")}</tbody></table></div>
      <div class="screen">${mockAkiba()}<span class="mock-note">Écran illustratif</span></div>
    </div>
  </div></section>
  <section><div class="wrap">
    ${secHead("Vers le crédit", `Transformer la discipline d'un groupe en <span class="serif">accès au crédit</span>`, "Un groupe qui épargne depuis trois ans reste invisible pour une banque s'il ne peut rien prouver. Notre rôle est de rendre cette régularité lisible.")}
    <ol class="bridge">${AVEC.passerelle.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
  </div></section>` : ""}

  ${P.canaux ? `<section class="band"><div class="wrap">
    ${secHead("Les débouchés", esc(P.canaux.titre), esc(P.canaux.intro))}
    <div class="grid-2">${P.canaux.liste.map(([t, q, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p class="sub">${esc(q)}</p><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.projet ? `<section><div class="wrap">
    <div class="deep projet"><span class="eyebrow">En préparation</span>
      <h2>${esc(P.projet.titre)}</h2><p class="lead">${esc(P.projet.texte)}</p><p class="etat">${esc(P.projet.etat)}</p>
      <p class="appel">${esc(P.projet.appel)}</p>
      <div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(P.projet.titre)}">Nous écrire ${ICON.arrow}</a><a class="btn btn-glass" href="${waLink("Bonjour Ubora, je m'intéresse au projet : " + P.projet.titre + ".")}" target="_blank" rel="noopener">WhatsApp</a></div></div>
  </div></section>` : ""}

  <section><div class="wrap">
    ${secHead("Outils et publics", `Les outils du pôle ${esc(P.nom)}`)}
    <div class="tools">${outilsLies.map(outilCard).join("")}</div>
    <div class="publics"><b>Pour qui</b>${P.publics.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>

  ${boiteOutils(P.boite, P.boite ? P.boite.titre : P.nom)}

  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageOutils() {
  return pageHead({ eyebrow: "Nos outils", title: `Des outils numériques pensés pour la <span class="serif">RDC</span>.`, crumbs: [["Nos outils"]],
    lead: "Ils fonctionnent avec un réseau instable, en francs congolais et en dollars, et ils sont toujours livrés avec une formation. Chacun est rattaché à l'un de nos pôles." }) + `
  <section><div class="wrap outil-rows">${OUTILS.map((o, i) => {
    const p = pole(o.pole);
    return `<article class="outil-row${i % 2 ? " flip" : ""}" id="${o.id}">
      <div class="outil-txt">
        <div class="pole-top"><span class="mk" style="background:${o.couleur}">${esc(o.initiales)}</span>${statut(o)}</div>
        <h2>${esc(o.nom)}</h2><p class="lead">${esc(o.resume)}</p>
        <ul class="checks">${o.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="muted small">Pôle <a href="${p.chemin}">${esc(p.nom)}</a>${o.sousDomaine ? ` · adresse directe <a href="https://${o.sousDomaine}" target="_blank" rel="noopener">${esc(o.sousDomaine)}</a>` : ""}</p>
        <div class="btn-row">${o.statut === "en-ligne" ? `<a class="btn btn-primary" href="${o.url}" target="_blank" rel="noopener">Ouvrir l'outil ${ICON.ext}</a>` : `<a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent(o.nom)}">Être informé du lancement</a>`}<a class="btn btn-ghost" href="/formations">Formations</a></div>
      </div>
      <div class="screen">${mockFor(o.mock)}<span class="mock-note">Écran illustratif</span></div>
    </article>`;
  }).join("")}</div></section>
  <section class="tight-top"><div class="wrap">${finalCta()}</div></section>`;
}

function pageConseil() {
  return pageHead({ eyebrow: "Conseil et programmes", title: `Pour les ONG, les bailleurs et les institutions.`, crumbs: [["Conseil et programmes"]],
    lead: "Vous accompagnez des groupes, des entrepreneurs ou des coopératives en RDC ? Nous pouvons concevoir votre programme, le conduire avec vous, équiper vos équipes et mesurer vos résultats." }) + `
  <section><div class="wrap grid-2">${CONSEIL.map(s => `<article class="svc reveal" id="${s.id}"><span class="ic">${ICON[s.ico]}</span><div><h2>${esc(s.titre)}</h2><p>${esc(s.texte)}</p><ul class="checks">${s.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></article>`).join("")}</div></section>
  <section class="band"><div class="wrap">
    ${secHead("Nos pôles au service de votre programme", "Vous pouvez aussi mobiliser directement l'un de nos pôles")}
    <div class="poles poles-sm">${POLES.map(p => poleCard(p, false)).join("")}</div>
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageFormations() {
  const t = todayISO();
  const sessions = [...DATA.formations].filter(f => f.date >= t).sort((a, b) => a.date.localeCompare(b.date));
  return pageHead({ eyebrow: "Formations", title: `Apprendre à utiliser les outils, puis à s'en servir seul.`, crumbs: [["Formations"]],
    lead: "Chaque déploiement comprend une formation de prise en main et un suivi. Nous organisons aussi des sessions à Lubumbashi, dans votre province ou en ligne." }) + `
  <section><div class="wrap">
    ${secHead("Prochaines sessions", "Le calendrier")}
    ${sessions.length ? `<div class="list-rows">${sessions.map(f => {
      const d = d12(f.date), p = pole(f.outil);
      const msg = `Bonjour Ubora, je souhaite m'inscrire à la formation « ${f.titre} » du ${fmtDate(f.date)}.`;
      return `<article class="row-card">
        <div class="datebox"><b>${d.getDate()}</b><span>${d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")} ${d.getFullYear()}</span></div>
        <div><div class="tags">${p ? `<span class="tag" style="background:${p.couleur};color:#fff">${esc(p.nom)}</span>` : ""}<span class="tag">${esc(f.mode)}</span></div>
          <h3>${esc(f.titre)}</h3>
          <div class="meta-line"><span>${ICON.clock}${esc(f.duree)}</span><span>${ICON.pin}${esc(f.lieu)}</span><span>${ICON.seat}${esc(f.places)} places</span></div>
          ${f.programme && f.programme.length ? `<details class="more-info"><summary>Programme</summary><p class="muted">Public : ${esc(f.public)}</p><ul>${f.programme.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>` : ""}</div>
        <a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">S'inscrire</a>
      </article>`;
    }).join("")}</div>` : `<div class="empty"><b>Le prochain calendrier est en préparation.</b><p>En attendant, nous organisons des sessions à la demande pour votre organisation, votre réseau ou votre coopérative.</p><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent("Formation")}">Demander une formation</a></div>`}
  </div></section>
  <section class="band"><div class="wrap">
    ${secHead("Ce que nous enseignons", "Le catalogue")}
    <div class="grid-3">${CATALOGUE.map(([t, pid, x]) => { const p = pole(pid); return `<div class="fcard reveal"><span class="tag" style="background:${p.couleur};color:#fff">${esc(p.nom)}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`; }).join("")}</div>
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageNews() {
  const list = allNews();
  return pageHead({ eyebrow: "Actualités", title: "Nouvelles du terrain", crumbs: [["Actualités"]],
    lead: "Nos programmes, nos déploiements, nos formations et ce que nous apprenons en chemin." }) + `
  <section><div class="wrap">
    ${list.length ? `<div class="news-grid">${list.map(newsCard).join("")}</div>`
      : `<div class="empty"><b>Nos premières actualités arrivent bientôt.</b><p>Inscrivez-vous à la lettre d'information, en bas de page, pour les recevoir.</p></div>`}
  </div></section>`;
}
function renderContent(blocks) {
  let html = "", inList = false;
  for (const b of blocks || []) {
    if (b.startsWith("- ")) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${esc(b.slice(2))}</li>`; continue; }
    if (inList) { html += "</ul>"; inList = false; }
    html += b.startsWith("### ") ? `<h3>${esc(b.slice(4))}</h3>` : `<p>${esc(b)}</p>`;
  }
  return html + (inList ? "</ul>" : "");
}
function pageArticle(slug) {
  const n = allNews().find(x => x.slug === slug); if (!n) return notFound();
  const url = CONFIG.site + "/actualites/" + n.slug;
  return pageHead({ eyebrow: esc(n.categorie), title: esc(n.titre), crumbs: [["Actualités", "/actualites"], [esc(n.categorie)]],
    extra: `<div class="meta-line on-deep"><span>${ICON.calendar}${fmtDate(n.date)}</span></div>` }) + `
  <section><div class="wrap narrow"><article class="article">
    <div class="prose"><p class="chapo">${esc(n.extrait)}</p>${renderContent(n.contenu)}</div>
    <div class="share"><b>Partager</b>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(n.titre + " " + url)}">WhatsApp</a>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}">LinkedIn</a></div>
  </article></div></section>`;
}

function pageCareers(openId) {
  const t = todayISO();
  const ouvertes = [...DATA.offres].filter(o => o.cloture >= t).sort((a, b) => (b.publie || "").localeCompare(a.publie || ""));
  return pageHead({ eyebrow: "Carrières", title: `Rejoindre une équipe <span class="serif">engagée</span>.`, crumbs: [["Carrières"]],
    lead: "Vous voulez mettre vos compétences au service des familles, des entrepreneurs et des coopératives de la RDC ? Nos offres d'emploi, de stage et de consultance sont publiées ici." }) + `
  <section><div class="wrap">
    ${secHead("Pourquoi nous rejoindre", "Un travail qui a du sens")}
    <div class="grid-4">
      <div class="fcard reveal"><span class="ic">${ICON.heart}</span><h3>Un impact visible</h3><p>Vous voyez chaque jour ce que votre travail change pour des familles et des entrepreneurs.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.map}</span><h3>Le terrain</h3><p>Des missions au contact des bénéficiaires, dans plusieurs provinces.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.school}</span><h3>Apprendre sans cesse</h3><p>Formation interne, numérique, méthodes d'accompagnement.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.users}</span><h3>Une équipe soudée</h3><p>Des profils complémentaires, qui s'entraident.</p></div>
    </div>
  </div></section>
  <section class="band" id="offres"><div class="wrap">
    ${secHead("Offres", "Les postes ouverts")}
    ${ouvertes.length ? `<div class="list-rows">${ouvertes.map(o => {
      const subj = "Candidature : " + o.titre;
      return `<article class="row-card two-cols" id="offre-${esc(o.id)}">
        <div><div class="tags"><span class="tag tag-navy">${esc(o.type)}</span>${o.departement ? `<span class="tag">${esc(o.departement)}</span>` : ""}</div>
          <h3>${esc(o.titre)}</h3>
          <div class="meta-line"><span>${ICON.pin}${esc(o.lieu)}</span><span>${ICON.calendar}Jusqu'au ${fmtDate(o.cloture)}</span></div>
          <p class="muted">${esc(o.resume)}</p>
          <details class="more-info"${openId === o.id ? " open" : ""}><summary>Voir le détail du poste</summary>
            <div class="job-detail"><div><h4>Missions</h4><ul>${(o.missions || []).map(m => `<li>${esc(m)}</li>`).join("")}</ul></div><div><h4>Profil recherché</h4><ul>${(o.profil || []).map(m => `<li>${esc(m)}</li>`).join("")}</ul></div></div></details>
        </div>
        <div class="stack"><a class="btn btn-primary" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(subj)}">Postuler par e-mail</a>
          <a class="btn btn-ghost btn-sm" href="${waLink(subj)}" target="_blank" rel="noopener">Question par WhatsApp</a></div>
      </article>`;
    }).join("")}</div>` : `<div class="empty"><b>Aucun poste n'est ouvert pour le moment.</b><p>Notre mission vous parle ? Envoyez-nous votre CV, nous le garderons pour nos prochains recrutements.</p><a class="btn btn-primary" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("Candidature spontanée")}">Envoyer mon CV</a></div>`}
  </div></section>`;
}

function pageContact(params) {
  const sujet = params.get("sujet") || "";
  const besoins = ["Ubora AVEC (groupes d'épargne)", "Ubora PME (entrepreneuriat)", "Ubora Coop (coopératives)", "Ubora Fin (accès au financement)", "Ubora Market (accès au marché)", "Boîte à outils", "Conseil et programmes", "Formation", "Partenariat", "Recrutement", "Autre"];
  const low = sujet.toLowerCase();
  const sel = !low ? "" : low.includes("boîte") ? "Boîte à outils"
    : besoins.find(b => low.includes(b.split(" (")[0].toLowerCase()) || b.toLowerCase().includes(low)) || "";
  return pageHead({ eyebrow: "Contact", title: `Karibu. Parlons de votre <span class="serif">projet</span>.`, crumbs: [["Contact"]],
    lead: "Une question, une demande de boîte à outils, un programme à monter ? Où que vous soyez en RDC, nous vous répondons sous deux jours ouvrés." }) + `
  <section><div class="wrap contact-grid">
    <ul class="contact-list">
      <li><span class="ic">${ICON.phone}</span><div><small>Téléphone et WhatsApp</small><b><a href="tel:${CONFIG.telephone.replace(/\s/g, "")}">${esc(CONFIG.telephone)}</a></b></div></li>
      <li><span class="ic">${ICON.mail}</span><div><small>E-mail</small><b><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></b></div></li>
      <li><span class="ic">${ICON.pin}</span><div><small>Siège</small><b>${esc(CONFIG.adresse)}</b></div></li>
      <li><span class="ic">${ICON.map}</span><div><small>Zone d'intervention</small><b>${esc(CONFIG.zone)}</b></div></li>
      <li><span class="ic">${ICON.clock}</span><div><small>Horaires</small><b>${esc(CONFIG.horaires)}</b></div></li>
    </ul>
    <div class="panel">
      <h2 class="h2-sm">Écrivez-nous</h2>
      <form class="form" id="contactForm" novalidate>
        <label>Nom complet<input id="c-nom" required maxlength="120" autocomplete="name"></label>
        <label>Organisation<input id="c-org" maxlength="160" autocomplete="organization"></label>
        <label>Téléphone<input id="c-tel" type="tel" maxlength="30" autocomplete="tel" placeholder="+243"></label>
        <label>E-mail<input id="c-mail" type="email" maxlength="160" autocomplete="email"></label>
        <label class="full">Objet<select id="c-besoin">${besoins.map(b => `<option${b === sel ? " selected" : ""}>${esc(b)}</option>`).join("")}</select></label>
        <label class="full">Message<textarea id="c-msg" required maxlength="3000" placeholder="Présentez-vous en quelques lignes et dites-nous ce dont vous avez besoin.">${sujet && !sel ? esc(sujet) : ""}</textarea></label>
        <input class="hp" id="c-site" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="form-err full" id="c-err" hidden></p>
        <div class="full"><button class="btn btn-primary" type="submit">Envoyer ${ICON.arrow}</button></div>
      </form>
      <div id="sent" hidden></div>
    </div>
  </div></section>`;
}

function pageMentions() {
  const L = CONFIG.legal || {};
  const lignes = [["Dénomination", "Ubora, entreprise sociale"], ["Siège", CONFIG.adresse], ["RCCM", L.rccm], ["Identification nationale", L.idnat], ["Numéro d'impôt", L.impot], ["Téléphone", CONFIG.telephone], ["E-mail", CONFIG.email], ["Directeur de la publication", L.directeur]].filter(([, v]) => v);
  return pageHead({ eyebrow: "Informations légales", title: "Mentions légales et données personnelles", crumbs: [["Mentions légales"]] }) + `
  <section><div class="wrap narrow legal-page">
    <h2>Éditeur du site</h2><dl class="legal">${lignes.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
    <h2>Hébergement</h2><p>Le site est hébergé par Cloudflare, Inc. (San Francisco, États-Unis), qui gère aussi le nom de domaine et la messagerie. Les données des formulaires sont stockées par Supabase, sur des serveurs situés à Francfort, en Allemagne.</p>
    <h2>Données personnelles</h2><p>Nous ne collectons que ce que vous nous transmettez :</p>
    <ul class="checks"><li>le formulaire de contact : nom, organisation, téléphone, e-mail et message, pour vous répondre ;</li><li>la lettre d'information : votre adresse e-mail, jusqu'à votre désinscription ;</li><li>l'assistant du site : le texte de vos questions, sans aucune donnée d'identification.</li></ul>
    <p>Ces données ne sont ni vendues ni cédées. Pour les consulter, les corriger ou les faire supprimer, écrivez à <a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a>.</p>
    <h2>Cookies</h2><p>Le site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. Votre navigateur garde seulement votre choix d'affichage clair ou sombre.</p>
    <h2>Propriété intellectuelle</h2><p>Le logo, les noms Ubora AVEC, Ubora PME, Ubora Coop, Ubora Fin, Ubora Market et AKIBA, ainsi que les textes et les documents de ce site, appartiennent à Ubora. Toute reproduction sans autorisation est interdite.</p>
  </div></section>`;
}

function notFound() {
  return pageHead({ eyebrow: "Page introuvable", title: "Cette page n'existe pas, ou plus.", lead: "Le lien est peut-être ancien. Vous pouvez repartir de l'accueil ou nous écrire.",
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/">Retour à l'accueil</a><a class="btn btn-glass" href="/contact">Nous contacter</a></div>` });
}

/* ==========================================================================
   ROUTAGE
   ========================================================================== */
const SOUS_DOMAINES = { avec: "avec", pme: "pme", coop: "cooperatives", fin: "financement", market: "marche" };
/* bp. et hub. mènent directement à l'outil ; akiba. est servi à part (GitHub Pages). */
const EXTERNES = { hub: "https://www.uborahub.com", bp: "/generateur/" };
const ANCIENNES = {
  "solutions/ubora-avec": "/avec", "solutions/akiba": "/avec", "solutions/ubora-pme": "/pme", "solutions/ubora-coop": "/cooperatives",
  "solutions/ubora-fin": "/financement", "solutions/ubora-market": "/marche", "solutions/ubora-hub": "/outils#hub", "solutions/uborahub": "/outils#hub",
  "solutions": "/outils", "services": "/conseil", "diagnostic": "/contact", "rediger": "/admin"
};
const DESCR = {
  "": "Ubora, entreprise sociale à Lubumbashi : appui aux groupes d'épargne (AVEC), accompagnement des entrepreneurs et des coopératives, accès au financement et au marché, dans toute la RDC.",
  "a-propos": "Qui est Ubora : une entreprise sociale née à Lubumbashi, sa mission, son modèle, ses valeurs et son équipe de terrain.",
  approche: "La méthode Ubora en six temps : écouter, structurer, former, outiller, connecter et suivre, pensée pour les réalités de la RDC.",
  outils: "AKIBA, le générateur de business plan, Ubora Hub et les outils en préparation : des outils numériques conçus pour la RDC.",
  conseil: "Conseil, études, gestion de projets, digitalisation de l'accompagnement et formation d'équipes, pour les ONG, les bailleurs et les institutions en RDC.",
  formations: "Les formations d'Ubora : prise en main des outils, formateurs relais, entrepreneuriat, gestion coopérative et dossier de crédit.",
  actualites: "Les actualités d'Ubora : programmes, déploiements, formations et nouvelles du terrain en RDC.",
  carrieres: "Offres d'emploi, de stage et de consultance chez Ubora, entreprise sociale basée à Lubumbashi.",
  contact: "Contacter Ubora par téléphone, WhatsApp ou e-mail. Siège à Lubumbashi, interventions dans toute la RDC.",
  mentions: "Mentions légales et politique de données personnelles du site d'Ubora."
};
/* Titre et description des pôles pour les moteurs de recherche */
const SEO_POLES = {
  avec: ["Ubora AVEC : accompagner les groupes d'épargne en RDC", "Création, formation et suivi des groupes d'épargne (AVEC), application AKIBA et passerelle vers les institutions financières, partout en RDC."],
  pme: ["Ubora PME : incubation et accélération d'entrepreneurs en RDC", "Idéation, incubation et accélération d'entrepreneurs et de PME en RDC, avec une démarche lean startup adaptée et un générateur de business plan."],
  cooperatives: ["Ubora Coop : créer et gérer une coopérative en RDC", "Structuration, formalisation et gestion de coopératives en RDC, à partir d'une organisation paysanne, d'un groupement ou d'une coopérative existante."],
  financement: ["Ubora Fin : accès au crédit et microfinance en RDC", "Préparer les groupes, les coopératives et les PME au crédit, les relier aux institutions de microfinance et équiper ces institutions, en RDC."],
  marche: ["Ubora Market : vendre plus, trouver des acheteurs en RDC", "Relier les PME, les coopératives et les entrepreneurs de la RDC à des acheteurs : ventes B2B et B2C, marchés institutionnels et export."]
};
const TITRES = { "":"Ubora, entreprise sociale en RDC", "a-propos": "Qui sommes-nous", approche: "Notre approche", outils: "Nos outils numériques", conseil: "Conseil et programmes", formations: "Formations", actualites: "Actualités", carrieres: "Carrières", contact: "Contact", mentions: "Mentions légales", admin: "Espace équipe" };

/* Construit une page à partir d'une adresse. */
function resolve(pathname, search, host) {
  const path = decodeURIComponent(pathname || "/").replace(/^\/+|\/+$/g, "");
  const params = new URLSearchParams(search || "");
  const parts = (host || "").split(".");
  const sd = parts.length > 2 ? parts[0] : "";
  let [base, sub] = path.split("/");
  base = base || "";
  if (!base && SOUS_DOMAINES[sd]) base = SOUS_DOMAINES[sd];
  const alias = ANCIENNES[path];
  if (alias) return { redirect: alias };

  let html, title, desc, canon = "/" + path;
  const P = pole(base);
  if (P) { html = pagePole(base); [title, desc] = SEO_POLES[P.id] || [P.nom, P.lead]; canon = P.chemin; }
  else switch (base) {
    case "": html = pageHome(); break;
    case "a-propos": html = pageAbout(); break;
    case "approche": html = pageApproche(); break;
    case "outils": html = pageOutils(); break;
    case "conseil": html = pageConseil(); break;
    case "formations": html = pageFormations(); break;
    case "actualites": {
      if (sub) { const n = allNews().find(x => x.slug === sub); html = pageArticle(sub); if (n) { title = n.titre; desc = n.extrait; } else title = "Page introuvable"; }
      else html = pageNews();
      break;
    }
    case "carrieres": html = pageCareers(sub); break;
    case "contact": html = pageContact(params); break;
    case "mentions": html = pageMentions(); break;
    case "admin": html = typeof pageAdmin === "function" ? pageAdmin() : notFound(); break;
    default: html = notFound(); title = "Page introuvable";
  }
  title = title || TITRES[base] || "Ubora";
  desc = desc || DESCR[base] || DESCR[""];
  return { html, title: base === "" ? TITRES[""] : /Ubora/.test(title) ? title : title + " · Ubora", desc, canon: canon === "/" ? "/" : canon, base, sub, found: !html.includes("Page introuvable") };
}

/* ==========================================================================
   NAVIGATEUR
   ========================================================================== */
function boot() {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  window.$ = $; window.$$ = $$;

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 3000); }
  window.toast = toast;

  function typo(root) {
    if (!root) return;
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest("pre,code,input,textarea,script,style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let n;
    while ((n = walk.nextNode())) { const t = n.nodeValue; if (/ [;:!?»]|« /.test(t)) n.nodeValue = t.replace(/ ([;:!?»])/g, " $1").replace(/« /g, "« "); }
  }

  /* sous-domaines qui mènent directement à une application */
  const parts = location.hostname.split(".");
  const sd = parts.length > 2 ? parts[0] : "";
  if (EXTERNES[sd] && location.pathname === "/") { location.replace(EXTERNES[sd]); return; }

  function nav(path) { history.pushState({}, "", path); route(); }
  window.nav = nav;
  function setMeta(sel, attr, val) { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val); }

  function route(opts) {
    const keep = !!(opts && opts.keep === true);
    if (location.hash.startsWith("#/")) history.replaceState({}, "", location.hash.slice(1));
    const r = resolve(location.pathname, location.search, location.hostname);
    if (r.redirect) { history.replaceState({}, "", r.redirect); return route(); }
    stopNet();
    app.innerHTML = `<div class="fade">${r.html}</div>`;
    document.title = r.title;
    setMeta('meta[name="description"]', "content", r.desc);
    setMeta('meta[property="og:description"]', "content", r.desc);
    setMeta('meta[property="og:title"]', "content", r.title);
    setMeta('link[rel="canonical"]', "href", CONFIG.site + r.canon);
    setMeta('meta[property="og:url"]', "content", CONFIG.site + r.canon);
    setMeta('meta[name="robots"]', "content", r.base === "admin" || !r.found ? "noindex" : "index, follow");
    $$("#menu [data-r]").forEach(a => {
      const on = a.dataset.r === r.base || (a.dataset.r === "poles" && (!!pole(r.base) || ["outils", "formations"].includes(r.base))) || (a.dataset.r === "a-propos" && ["a-propos", "approche", "conseil", "carrieres"].includes(r.base));
      a.classList.toggle("current", on);
      if (a.tagName === "A") on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open");
    $$(".has-dd").forEach(x => x.classList.remove("open"));
    if (r.base === "") startNet();
    if (r.base === "contact") bindContact();
    if (r.base === "admin" && typeof bindAdmin === "function") bindAdmin();
    $$("[data-scroll]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }); }));
    reveal(); typo(app);
    if (keep) return;
    const anchor = location.hash.slice(1);
    if (anchor && !anchor.startsWith("/")) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }));
    else window.scrollTo(0, 0);
  }
  window.route = route;

  function bindContact() {
    const f = $("#contactForm"); if (!f) return;
    const debut = Date.now();
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const v = id => $("#" + id).value.trim();
      const err = $("#c-err");
      if (v("c-site") || Date.now() - debut < 2500) return;
      if (!v("c-nom") || !v("c-msg")) { err.hidden = false; err.textContent = "Merci d'indiquer votre nom et votre message."; return; }
      if (!v("c-tel") && !v("c-mail")) { err.hidden = false; err.textContent = "Laissez-nous un téléphone ou une adresse e-mail pour que nous puissions vous répondre."; return; }
      err.hidden = true;
      const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Envoi en cours…";
      const res = await UboraDB.sendMessage({ nom: v("c-nom"), organisation: v("c-org") || null, telephone: v("c-tel") || null, email: v("c-mail") || null, besoin: v("c-besoin"), message: v("c-msg") });
      const texte = `Bonjour Ubora,\n\n${v("c-msg")}\n\n${v("c-nom")}${v("c-org") ? " (" + v("c-org") + ")" : ""}\nObjet : ${v("c-besoin")}${v("c-tel") ? "\nTél. : " + v("c-tel") : ""}${v("c-mail") ? "\nE-mail : " + v("c-mail") : ""}`;
      f.hidden = true;
      const s = $("#sent"); s.hidden = false;
      s.innerHTML = res.ok
        ? `<div class="sent"><b>Merci, votre message est bien arrivé.</b><p>Nous vous répondons sous deux jours ouvrés. Si c'est urgent, écrivez-nous aussi sur WhatsApp.</p><div class="btn-row"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(texte)}">Envoyer aussi par WhatsApp</a></div></div>`
        : `<div class="sent"><b>Votre message n'a pas pu être enregistré.</b><p>Envoyez-le directement par WhatsApp ou par e-mail : il est déjà rédigé.</p><div class="btn-row"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(texte)}">WhatsApp</a><a class="btn btn-ghost" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(v("c-besoin"))}&body=${encodeURIComponent(texte)}">E-mail</a></div></div>`;
      typo(s);
    });
  }

  /* apparition douce des blocs */
  let io;
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
    io?.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" });
    els.forEach((e, k) => { e.style.transitionDelay = (k % 4) * 60 + "ms"; io.observe(e); });
  }

  /* réseau animé de l'accueil, discret */
  let netStop = null;
  function stopNet() { if (netStop) netStop(); }
  function startNet() {
    stopNet();
    const c = $("#net"); if (!c) return;
    const ctx = c.getContext("2d"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, nodes = [], raf, visible = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.min(70, Math.round(w * h / 18000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.4 + .7, k: Math.random() }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
        for (let j = i + 1; j < nodes.length; j++) { const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 120) { ctx.strokeStyle = `rgba(141,203,79,${(1 - d / 120) * .18})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
        ctx.fillStyle = a.k > .5 ? "rgba(155,214,94,.85)" : "rgba(150,185,255,.7)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } });
    obs.observe(c); window.addEventListener("resize", resize);
    netStop = () => { cancelAnimationFrame(raf); obs.disconnect(); window.removeEventListener("resize", resize); netStop = null; };
  }

  /* en-tête, pied de page, bande */
  $("#menu").innerHTML = menuHTML();
  $("#footer").innerHTML = footerHTML();
  $("#tickerMove").innerHTML = tickerHTML();
  $$(".dd-btn").forEach(b => b.addEventListener("click", () => {
    const li = b.parentElement, open = !li.classList.contains("open");
    $$(".has-dd").forEach(x => { x.classList.remove("open"); x.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); });
    if (open) { li.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  }));
  document.addEventListener("click", e => {
    if (!e.target.closest(".has-dd")) $$(".has-dd").forEach(x => x.classList.remove("open"));
    const a = e.target.closest && e.target.closest("a");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/generateur")) return;
    e.preventDefault();
    const [p, h] = href.split("#");
    /* sur un sous-domaine de pôle, seuls les liens vers le pôle lui-même restent sur place ; le reste mène au site principal */
    if (SOUS_DOMAINES[sd]) {
      if (p.split("?")[0] !== pole(SOUS_DOMAINES[sd]).chemin) { location.href = CONFIG.site + href; return; }
      if (h) document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }); else scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if ((p || "/") === location.pathname && h) { document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }); return; }
    nav(href);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".has-dd").forEach(x => x.classList.remove("open")); });
  window.addEventListener("popstate", route);
  $("#burger").addEventListener("click", () => {
    const o = $("#menu").classList.toggle("open");
    $("#burger").setAttribute("aria-expanded", o); document.body.classList.toggle("menu-open", o);
  });
  $("#themeBtn").addEventListener("click", () => {
    const r = document.documentElement, next = r.dataset.theme === "dark" ? "light" : "dark";
    r.dataset.theme = next; store.set("ubora_theme_2026", next);
  });
  $("#newsForm").addEventListener("submit", async e => {
    e.preventDefault();
    if ($("#nlSite").value) return;
    const mail = $("#nlEmail").value.trim(); e.target.reset();
    const r = await UboraDB.subscribe(mail);
    toast(r.ok ? "Merci, votre inscription est enregistrée." : "L'inscription n'a pas abouti. Réessayez un peu plus tard.");
  });
  $("#waFloat").href = waLink("Bonjour Ubora, je souhaite avoir des informations.");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    $("#readBar").style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
    $("#toTop").classList.toggle("show", scrollY > 900);
  }, { passive: true });
  $("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  route();
  typo($("#footer")); typo($(".site-header"));

  /* contenu publié dans la base : on réaffiche les pages qui l'utilisent */
  UboraDB.load().then(() => {
    $("#tickerMove").innerHTML = tickerHTML();
    const base = location.pathname.split("/")[1] || "";
    if (["", "actualites", "formations", "carrieres"].includes(base) && !(base === "" && SOUS_DOMAINES[sd])) route({ keep: true });
  });
}

if (typeof window !== "undefined" && window.document && !window.UBORA_PRERENDER) boot();
