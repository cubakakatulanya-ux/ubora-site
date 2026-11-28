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
  store: sv('<path d="M4 10v10h16V10"/><path d="M3 4h18l-1.4 5.2a2.6 2.6 0 0 1-5 .1 2.6 2.6 0 0 1-5.2 0 2.6 2.6 0 0 1-5.2 0 2.6 2.6 0 0 1-.6-.1z"/><path d="M10 20v-5h4v5"/>'),
  leaf: sv('<path d="M5 20c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 20l9-9"/>'),
  chart: sv('<path d="M3 20h18"/><path d="M6 16v-5M11 16V6M16 16v-8M21 16V9"/>'),
  doc: sv('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>')
};

/* pictogramme d'un domaine ou d'une application, à la place des deux lettres */
const PICTOS = { avec: "coins", pme: "briefcase", cooperatives: "users", financement: "handshake", marche: "store", vert: "leaf", academie: "school", conseil: "compass",
  akiba: "phoneM", "akiba-suivi": "chart", bp: "doc", hub: "flow", asbl: "seat", "logiciel-coop": "users", "plateforme-market": "store", agrolab: "leaf", biashara: "briefcase" };
const picto = x => ICON[PICTOS[(x || {}).id]] || esc((x || {}).initiales);

/* ---------- Utilitaires ---------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const d12 = d => new Date(d + "T12:00:00");
/* langue de la page : « en » sous uborardc.com/en/… (voir tools/i18n-moteur.js) */
let LANGUE = "fr";
const T = s => LANGUE === "en" && typeof traduire === "function" ? traduire(s) : s;
const fmtDate = d => d12(d).toLocaleDateString(LANGUE === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
const todayISO = () => new Date().toISOString().slice(0, 10);
const waLink = txt => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
const pole = id => POLES.find(p => p.id === id);
const outil = id => OUTILS.find(o => o.id === id);
/* page qui présente un logiciel : sa fiche (/outils/<id>), la page de son domaine, ou à défaut le logiciel lui-même */
const lienOutil = o => o.page || (o.fiche ? "/outils/" + o.id : pole(o.pole).chemin);
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
  return `<div class="browser" role="img" aria-label="Écran illustratif : ${esc(url)}"><div class="browser-bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>${inner}</div>`;
}
function areaChart(pts, w = 300, h = 80) {
  const max = Math.max(...pts) * 1.1, step = w / (pts.length - 1);
  const xy = pts.map((v, i) => [i * step, h - (v / max) * h]);
  const line = xy.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const last = xy[xy.length - 1];
  return `<svg viewBox="0 0 ${w} ${h + 4}" aria-hidden="true"><defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5FC48E" stop-opacity=".4"/><stop offset="1" stop-color="#5FC48E" stop-opacity="0"/></linearGradient></defs>
    ${[0.25, 0.5, 0.75].map(f => `<line x1="0" x2="${w}" y1="${h * f}" y2="${h * f}" stroke="currentColor" stroke-opacity=".09"/>`).join("")}
    <path d="${line} L${w} ${h} L0 ${h}Z" fill="url(#ag)"/><path d="${line}" fill="none" stroke="#2FA36B" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="${last[0] - 3}" cy="${last[1]}" r="4.5" fill="#fff" stroke="#2FA36B" stroke-width="2.5"/></svg>`;
}
function mockAkiba() {
  return `<div class="phone" role="img" aria-label="Écran illustratif de l'application AKIBA"><div class="phone-screen">
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
  const ppl = [["01", "Entreprise 01", 82, "#7FD8A6"], ["02", "Entreprise 02", 64, "#7FB3FF"], ["03", "Entreprise 03", 47, "#E3A064"]];
  return browser("hub.uborardc.com/cohortes", `<div class="hub">
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
  asbl: () => mockTable("asbl.uborardc.com · dépenses", [["Budget engagé", "62 %"], ["À valider", "4"], ["Devises", "USD · CDF"]], ["Demande", "Activité", "Montant", "État"],
    [["Dépense 014", "Atelier de formation", "850 $", "Payée", 1], ["Dépense 015", "Mission de terrain", "420 $", "Approuvée", 1], ["Dépense 016", "Fournitures", "135 $", "À valider", 0]]),
  hub: mockHub,
  academie: () => browser("academie.uborardc.com", `<div class="mock-pad">
    <div class="mock-title"><b>Mon carnet</b><span>2 badges</span></div>
    <div class="hub-list">${[["Mon AVEC : principes, droits et devoirs", 100], ["La réunion pas à pas", 100], ["Le partage et le nouveau cycle", 60], ["Gérer le budget de son ménage", 25]].map(([n, p]) => `<div class="bp-row"><span class="bp-dot${p === 100 ? " done" : ""}"></span><span>${n}</span><span class="bar"><i style="width:${p}%"></i></span></div>`).join("")}</div>
    <div class="hub-kpis"><div><small>Cours suivis</small><b>4</b></div><div><small>Quiz réussis</small><b>2</b></div><div><small>Temps</small><b>3 h 20</b></div></div></div>`),
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

/* ---------- Photos : trois tailles, le navigateur choisit selon l'écran ---------- */
const photo = (nom, sizes, alt = "", extra = "") =>
  `<img src="/img/${nom}-1600.webp" srcset="/img/${nom}-800.webp 800w, /img/${nom}-1200.webp 1200w, /img/${nom}-1600.webp 1600w, /img/${nom}-2400.webp 2400w" sizes="${sizes}" alt="${esc(alt)}" width="1600" height="1067" decoding="async"${extra}>`;

/* ---------- Composants ---------- */
function pageHead({ eyebrow, title, lead, crumbs = [], extra = "", photo: visuel, ecran }) {
  /* même en-tête partout (18 novembre 2026) : une grande carte arrondie, vert foncé avec la photo ou l'écran, claire sans visuel */
  const texte = `<nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a>${crumbs.map(([t, h]) => h ? `<span><a href="${h}">${t}</a></span>` : `<span>${t}</span>`).join("")}</nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
      ${extra}`;
  const carte = (classe, visuelHTML) => `<section class="pg-tete"><div class="wrap"><div class="pg-hero ${classe}"><div class="pg-hero-txt">${texte}</div>${visuelHTML}</div></div></section>`;
  if (ecran) return carte("pg-hero-ecran", `<div class="pg-ecran"><div class="screen">${ecran}</div><span class="mock-note" aria-hidden="true">Écran illustratif</span></div>`);
  if (!visuel) return carte("pg-hero-clair", "");
  return carte("", `<div class="pg-hero-photo">${photo(visuel[0], "(max-width: 900px) 100vw, 55vw", visuel[1], ' fetchpriority="high"')}</div>`);
}
function bandePhotos() {
  const une = PHOTOS.map(([nom, t]) => `<figure>${photo(nom, "360px", "", ' loading="lazy"')}<figcaption>${esc(t)}</figcaption></figure>`).join("");
  return `<section class="photos" aria-label="Sur le terrain"><div class="photos-track"><div class="photos-move">${une}${une.replace(/<figure>/g, '<figure aria-hidden="true">')}</div></div></section>`;
}
function secHead(eyebrow, title, lead, action) {
  return `<div class="sec-head${action ? " split" : ""}"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ""}</div>${action || ""}</div>`;
}
function statut(o) {
  return o.statut === "en-ligne" ? `<span class="status st-live">En ligne</span>` : `<span class="status st-soon">En construction</span>`;
}
function poleCard(p, feature, compact) {
  const img = !compact && p.photo;
  return `<article class="pole${feature ? " feature" : ""}${img ? " has-img" : ""}${p.transversal ? " transversal" : ""}" style="--c:${p.couleur}">
    ${img ? `<div class="pole-img">${photo(p.photo[0], feature ? "(max-width: 860px) 100vw, 800px" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px", "", ' loading="lazy"')}</div>` : ""}
    <div class="pole-body">
      <div class="pole-top"><span class="mk">${picto(p)}</span><span class="pole-sub">${esc(p.sousDomaine)}</span>${p.transversal ? '<span class="pole-tag">Pour tous les domaines</span>' : ""}</div>
      <h3><a class="stretch" href="${p.chemin}">${esc(p.nom)}</a></h3>
      ${p.accroche ? `<p class="accroche">${esc(p.accroche)}</p>` : ""}
      <p>${esc(p.carte)}</p>
      <span class="link">Découvrir le domaine ${ICON.arrow}</span>
    </div>
  </article>`;
}
/* Solutions en ligne présentées avec l'écran réel de leur page d'accueil (img/solutions, capturé le 15 novembre 2026) */
const VITRINE = ["akiba", "akiba-suivi", "hub", "bp", "academie", "asbl"];
/* solutions en construction : une place dans la vitrine, sans lien vers une application qui n'est pas encore ouverte */
const CHANTIER = ["agrolab", "logiciel-coop", "plateforme-market", "biashara"];
const banniere = (o, sizes) => VITRINE.includes(o.id) && o.statut === "en-ligne"
  ? `<img class="solution-img" src="/img/solutions/${o.id}-480.webp" srcset="/img/solutions/${o.id}-480.webp 480w, /img/solutions/${o.id}-960.webp 960w" sizes="${sizes}" width="480" height="300" alt="Page d'accueil de ${esc(o.nom)}" loading="lazy" decoding="async">` : "";
function vitrine() {
  const liste = VITRINE.map(outil).filter(o => o && o.statut === "en-ligne" && o.url);
  const bientot = CHANTIER.map(outil).filter(o => o && o.statut !== "en-ligne");
  return `<section id="solutions" class="vitrine compacte">
    <div class="vitrine-banniere"><div class="wrap vitrine-tete">
      <div><span class="eyebrow">Nos solutions numériques</span>
      <h2>${liste.length} applications en ligne</h2></div>
      <p>Sur téléphone ou ordinateur, même avec une connexion faible. Chacune s'accompagne d'une formation.</p>
    </div></div>
    <div class="wrap">
      <div class="vitrine-grille">${liste.map(o => `<a class="solution" href="${o.url}" target="_blank" rel="noopener" style="--c:${o.couleur}">
        ${banniere(o, "120px")}
        <span class="solution-txt"><b>${esc(o.nom)}</b><span>${esc(o.court || "")}</span><span class="solution-lien">${esc(o.sousDomaine || new URL(o.url).hostname)} ${ICON.ext}</span></span>
      </a>`).join("")}</div>
      <div class="vitrine-pied">
        <p class="vitrine-bientot"><span class="status st-soon">En construction</span> ${bientot.map(o => `<span class="puce" style="--c:${o.couleur}">${esc(o.nom)}</span>`).join("")}</p>
        <a class="link" href="/solutions">Toutes nos solutions, en détail ${ICON.arrow}</a>
      </div>
    </div>
  </section>`;
}
function outilCard(o, court) {
  const p = poleReal(o.pole);
  const href = lienOutil(o);
  return `<article class="tool${banniere(o, "") ? " avec-img" : ""}" style="--c:${o.couleur}" data-f="${o.statut} ${o.pole}">
    ${banniere(o, "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 380px")}
    <div class="pole-top"><span class="mk">${picto(o)}</span>${statut(o)}</div>
    <h3>${o.statut === "en-ligne" || o.fiche ? `<a class="stretch" href="${href}"${ext(href)}>${esc(o.nom)}</a>` : esc(o.nom)}</h3>
    <p>${esc(court && o.court ? o.court : o.resume)}</p>
    <div class="tool-foot"><span>${pole(o.pole) ? "Domaine " : ""}${esc(p.nom)}</span>${o.sousDomaine ? `<span class="mono">${esc(o.sousDomaine)}</span>` : ""}</div>
  </article>`;
}
function constats(list) {
  return `<ul class="constats">${list.map(([t, x]) => `<li><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join("")}</ul>`;
}
/* Bouton « voir plus » : il déplie le bloc qui le précède */
function plusBtn(label) {
  return `<button class="plus-btn" type="button" data-plus="${esc(label)}" aria-expanded="false"><span class="plus-t">${esc(label)}</span>${ICON.chev}</button>`;
}
function parcoursList(list) {
  const long = list.length > 4;
  return `<ol class="parcours${long ? " replie" : ""}">${list.map(([t, x, r], k) => `<li class="reveal"><span class="pn">${String(k + 1).padStart(2, "0")}</span>
    <div><h3>${esc(t)}</h3><p>${esc(x)}</p></div></li>`).join("")}</ol>${long ? plusBtn(`Voir toute la démarche (${list.length} étapes)`) : ""}`;
}
function boiteOutils(b, sujet) {
  if (!b) return "";
  const dispo = b.statut === "disponible";
  return `<section class="band" id="boite"><div class="wrap">
    ${secHead(dispo ? "Boîte à outils" : "Bientôt disponible", esc(b.titre), esc(b.intro))}
    ${dispo ? (() => {
      const item = ([t], i) => `<li><span class="bn">${String(i + 1).padStart(2, "0")}</span><div><b>${esc(t)}</b></div></li>`;
      const reste = b.outils.slice(6);
      return `<ol class="boite">${b.outils.slice(0, 6).map(item).join("")}</ol>`
        + (reste.length ? `<details class="boite-plus"><summary>Voir les ${reste.length} autres documents</summary><ol class="boite">${reste.map((o, i) => item(o, i + 6)).join("")}</ol></details>` : "");
    })() : ""}
    <div class="notice"><span class="ic">${dispo ? ICON.doc : ICON.bell}</span>
      <div><b>${dispo ? "Recevoir la boîte à outils" : "Être prévenu de sa publication"}</b>
        <p>${dispo ? "Dites-nous qui vous êtes et comment vous l'utiliserez : nous vous envoyons les documents et nous vous les présentons." : "Laissez vos coordonnées : nous vous écrirons dès que les documents seront prêts."}</p></div>
      <div class="notice-btns"><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent(sujet)}">${dispo ? "Faire la demande" : "Me prévenir"}</a>
        ${dispo ? `<a class="btn btn-wa btn-sm" href="${waLink("Bonjour Ubora, je souhaite recevoir la " + b.titre.charAt(0).toLowerCase() + b.titre.slice(1) + ".")}" target="_blank" rel="noopener">Par WhatsApp</a>` : ""}</div>
    </div>
  </div></section>`;
}
/* Pérenniser les actions des partenaires au-delà du projet */
const RELAIS = [["Pendant le projet","Nous formons, outillons et suivons avec vos équipes. Les données sont dans nos outils dès le premier jour."],["À la clôture","Groupes, relais formés, outils et historique restent en place. Rien ne repart de zéro."],["Après le projet","Nous poursuivons le suivi, financé en partie par nos propres revenus."]];
function relais(lien) {
  return `<div class="deep relais">
    <div class="relais-txt"><span class="eyebrow">Pour les ONG, les bailleurs et les programmes</span>
      <h2>Le projet se termine. <span class="serif">L'accompagnement continue.</span></h2>
      <p class="lead">Un programme dure deux ou trois ans ; les groupes, les entrepreneurs et les coopératives ont besoin de plus. Nous mettons en œuvre vos projets sur le terrain, puis nous prenons le relais.</p>
      ${lien ? `<div class="btn-row"><a class="btn btn-accent" href="/approche#mise-en-oeuvre">Mise en œuvre de projets ${ICON.arrow}</a><a class="btn btn-ghost" href="/approche#relais">Préparer la suite de votre projet</a></div>` : `<a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent("Partenariat")}">Parlons de votre programme ${ICON.arrow}</a>`}</div>
    <ol class="relais-temps">${RELAIS.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b></div></li>`).join("")}</ol>
  </div>`;
}
/* Pour les bailleurs et les ONG : commencer par un projet pilote, et ce qui permet de nous faire confiance */
function blocPilote() {
  const n = OUTILS.filter(o => o.statut === "en-ligne").length;
  const points = [
    ["Des outils déjà en ligne", `${n} logiciels à essayer avant de signer.`],
    ["Une équipe qui connaît les programmes", "Plus de dix ans de programmes de coopération en RDC."],
    ["Des résultats suivis en direct", "Tableaux de bord et exports, pas seulement un rapport final."],
    ["Deux façons de financer", "Prestation avec l'entreprise sociale, ou subvention à l'association UBORA."]
  ];
  return `<div class="deep relais pilote">
    <div class="relais-txt"><span class="eyebrow">Bailleurs, ONG et programmes</span>
      <h2>Commencez par un <span class="serif">projet pilote</span>.</h2>
      <p class="lead">Un périmètre réduit, des indicateurs fixés ensemble, des données suivies en direct. Puis vous décidez sur preuves.</p>
      <div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent("Projet pilote")}">Proposer un projet pilote ${ICON.arrow}</a><a class="btn btn-ghost" href="/approche#pilote">Voir comment ça se passe</a></div></div>
    <ol class="relais-temps">${points.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
  </div>`;
}
/* Expertise : ce que le terrain nous a appris, et ce que chacun peut vérifier */
function expertise() {
  const lecons = [
    ["avec", "Dans un groupe d'épargne, la plupart des conflits naissent de règles jamais écrites. Pas du manque d'argent.", "Alors nous écrivons les règles avec le groupe, et AKIBA rend chaque compte vérifiable par tous les membres."],
    ["financement", "Étudier un crédit de 500 dollars coûte presque autant qu'un crédit de 50 000. Voilà pourquoi les petits emprunteurs sont oubliés.", "Alors Ubora Fin mobilise le capital pour le groupe entier, pas dossier par dossier, en s'appuyant sur son historique d'épargne."],
    ["marche", "Le maillon qui casse le plus souvent n'est ni la production ni le crédit. C'est la vente.", "Alors nous cherchons l'acheteur avant la récolte, et nous suivons la vente jusqu'au paiement du producteur."]
  ];
  return `<div class="lecons">${lecons.map(([id, q, r]) => { const p = pole(id); return `<figure class="lecon reveal" style="--c:${p.couleur}"><span class="lecon-pole">${esc(p.nom)}</span><blockquote>${esc(q)}</blockquote></figure>`; }).join("")}</div>`;
}
/* Pastilles de filtre : elles filtrent les enfants du bloc qui suit (attribut data-f) */
function filtres(label, options) {
  return `<div class="chips filtres" role="group" aria-label="${esc(label)}"><button class="chip" type="button" data-f="*" aria-pressed="true">Tous</button>${options.map(([v, t]) => `<button class="chip" type="button" data-f="${esc(v)}" aria-pressed="false">${esc(t)}</button>`).join("")}</div>`;
}
const cle = t => String(t || "").toLowerCase().normalize("NFD").replace(/[^a-z]/g, "");
function faq(items) { return `<div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`; }
function finalCta() {
  return `<div class="deep final">
    <span class="eyebrow">Travaillons ensemble</span>
    <h2>Un projet ? Demandez-nous un <span class="serif">devis</span>.</h2>
    <p>Réponse sous deux jours ouvrés. Les groupes d'épargne et les petits entrepreneurs bénéficient d'un tarif solidaire.</p>
    <div class="btn-row"><a class="btn btn-wa" href="${waLink("Bonjour Ubora, je souhaite un devis.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-glass" href="/contact?sujet=${encodeURIComponent("Demande de devis")}">Demander un devis</a></div></div>`;
}
function cover(n) {
  const C = { "Terrain": ["#1F7A34", "#6FB33F"], "Programme": ["#0F3170", "#2F5FB0"], "Coopératives": ["#3E7F2A", "#9BC53D"], "Événement": ["#8C4A1F", "#C9793F"], "Partenariat": ["#273B5E", "#4F6A93"], "Formation": ["#0E5A6B", "#2E9CA8"], "Recrutement": ["#4A2F7A", "#7E5BC2"] };
  const [a, b] = C[n.categorie] || ["#0F3170", "#23843A"];
  return `<div class="cover" style="background:linear-gradient(135deg,${a},${b})"><span class="cat">${esc(n.categorie)}</span></div>`;
}
function newsCard(n) {
  return `<a class="card-news" href="/actualites/${esc(n.slug)}" data-f="${cle(n.categorie)}">${cover(n)}
    <span class="date">${fmtDate(n.date)}</span><h3>${esc(n.titre)}</h3><p>${esc(n.extrait)}</p></a>`;
}
function allNews() {
  return [...DATA.actualites].sort((a, b) => b.date.localeCompare(a.date));
}
const initialesDe = nom => String(nom || "").split(/\s+/).filter(Boolean).slice(0, 2).map(m => m[0]).join("").toUpperCase();
function memberCard(m) {
  return `<article class="member reveal">
    ${m.photo ? `<img class="member-photo" src="${esc(m.photo)}" alt="${esc(m.nom)}" loading="lazy" width="400" height="400">` : `<span class="member-photo member-ini" aria-hidden="true">${esc(initialesDe(m.nom))}</span>`}
    <div class="member-txt"><h3>${esc(m.nom)}</h3><p class="sub">${esc(m.fonction)}</p>${m.bio ? `<p>${esc(m.bio)}</p>` : ""}
      ${m.linkedin ? `<a class="link" href="${esc(m.linkedin)}" target="_blank" rel="noopener">LinkedIn ${ICON.ext}</a>` : ""}</div>
  </article>`;
}
/* domaine d'une réalisation ; « conseil » regroupe les missions pour les ONG et les bailleurs */
const poleReal = id => pole(id) || { id: "conseil", nom: "Conseil et programmes", initiales: "Cp", couleur: "#0F3170", chemin: "/approche#bailleurs" };
function realCard(r) {
  const p = poleReal(r.pole);
  return `<article class="real reveal" style="--c:${p.couleur}">
    ${r.image ? `<img class="real-img" src="${esc(r.image)}" alt="" loading="lazy">` : `<div class="real-img real-cover"><span class="mk">${picto(p)}</span></div>`}
    <div class="real-txt">
      <div class="tags"><a class="tag" style="background:${p.couleur};color:#fff" href="${p.chemin}">${esc(p.nom)}</a>${r.periode ? `<span class="tag">${esc(r.periode)}</span>` : ""}</div>
      <h3>${esc(r.titre)}</h3>
      ${r.lieu || r.partenaire ? `<div class="meta-line">${r.lieu ? `<span>${ICON.pin}${esc(r.lieu)}</span>` : ""}${r.partenaire ? `<span>${ICON.handshake}${esc(r.partenaire)}</span>` : ""}</div>` : ""}
      ${r.resume ? `<p>${esc(r.resume)}</p>` : ""}
      ${(r.resultats || []).length ? `<ul class="checks">${r.resultats.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    </div>
  </article>`;
}

/* ---------- En-tête, pied de page, bande déroulante ---------- */
function menuHTML() {
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne");
  const domaine = p => `<a href="${p.chemin}" class="dd-item dd-domaine${p.transversal ? " large" : ""}" style="--c:${p.couleur}"><span class="dd-picto">${picto(p)}</span><span><b>${esc(p.nom)}${p.transversal ? '<em class="dd-tag">Pour tous les domaines</em>' : ""}</b><small>${esc(p.accroche)}</small></span></a>`;
  const appli = o => `<a href="${o.url}" target="_blank" rel="noopener" class="dd-item dd-appli"><img class="dd-ecran" src="/img/solutions/${o.id}-160.webp" alt="" width="64" height="40" loading="lazy" decoding="async"><span><b>${esc(o.nom)} ${ICON.ext}</b><small>${esc(o.court || "")}</small></span></a>`;
  return `
    <li><a href="/a-propos" data-r="a-propos">À propos</a></li>
    <li><a href="/approche" data-r="approche">Notre approche</a></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="solutions" aria-expanded="false">Nos solutions ${ICON.chev}</button>
      <div class="dd dd-mega"><div class="dd-col dd-poles"><h5>Nos domaines</h5><div class="dd-grille">${POLES.map(domaine).join("")}</div></div>
        <div class="dd-col dd-outils"><h5>Applications en ligne</h5>${enLigne.map(appli).join("")}</div>
        <div class="dd-pied"><a href="/solutions" class="dd-more">Vue d'ensemble des solutions ${ICON.arrow}</a></div></div></li>
    <li><a href="/realisations" data-r="realisations">Nos réalisations</a></li>
    <li><a href="/equipe" data-r="equipe">Notre équipe</a></li>
    <li class="m-cta"><a class="btn btn-accent" href="/contact">Nous contacter</a></li>`;
}
function footerHTML() {
  const L = CONFIG.legal || {};
  const legal = [L.rccm && "RCCM " + L.rccm, L.idnat && "ID NAT " + L.idnat].filter(Boolean).join(" · ");
  const tel = CONFIG.telephone.replace(/\s/g, "");
  return `<div class="wrap">
    <div class="foot-social">
      <p><b>Ubora est une entreprise à caractère social.</b> Nos excédents sont réinvestis dans nos outils, la formation de relais locaux et notre présence sur le terrain.</p>
    </div>
    <div class="foot-news">
      <div class="foot-news-txt"><b>Nouvelles du terrain</b><span>Recevez nos nouvelles par e-mail.</span></div>
      <form class="news-form" id="newsForm" aria-label="Lettre d'information">
        <label class="news-label" for="nlEmail">Votre adresse e-mail</label>
        <div class="news-row"><input id="nlEmail" type="email" required maxlength="160" autocomplete="email" placeholder="Votre adresse e-mail"><input class="hp" id="nlSite" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn btn-accent btn-sm" type="submit">S'inscrire</button></div>
        <p class="news-note">Des nouvelles de temps en temps, sans publicité. Désinscription à tout moment.</p>
      </form>
    </div>
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="/"><img class="logo-img" src="/logo-ubora-112.webp" alt="" width="56" height="56" loading="lazy"><span class="brand-txt"><span class="brand-name">Ub<b>o</b>ra</span><span class="brand-sub">Entreprise sociale</span></span></a>
        <p class="foot-accroche">Partout en RDC, sur le terrain et à distance.</p>
      </div>
      <div class="foot-contact"><h4>Nous joindre</h4><ul>
        <li><span class="ic">${ICON.phone}</span><a href="tel:${tel}">${esc(CONFIG.telephone)}</a></li>
        <li><span class="ic">${ICON.mail}</span><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>
        <li><span class="ic">${ICON.pin}</span><span>${esc(CONFIG.adresse)}</span></li>
        ${CONFIG.youtube ? `<li><span class="ic">${sv('<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z"/>')}</span><a href="${CONFIG.youtube}" target="_blank" rel="noopener">Nos films sur YouTube</a></li>` : ""}</ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} Ubora, entreprise sociale${legal ? ` · <span class="foot-legal">${esc(legal)}</span>` : ""}</span>
      <span class="foot-links"><a href="/mentions">Mentions légales</a><a href="/confidentialite">Confidentialité et cookies</a><a href="/conditions">Conditions d'utilisation</a><a href="https://admin.uborardc.com" rel="nofollow">Espace équipe</a></span>
    </div>
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
/* photo d'ouverture de l'accueil : sous un voile sombre, une petite image suffit sur téléphone ; le pré-rendu la précharge */
const HERO = { srcset: "/img/avec-480.webp 480w, /img/avec-800.webp 800w, /img/avec-1200.webp 1200w, /img/avec-1600.webp 1600w, /img/avec-2400.webp 2400w", sizes: "(max-width: 700px) 40vw, 100vw" };
const ENGAGEMENTS = [
  ["Un devis écrit avant chaque mission", "Prix, délais et livrables sont fixés par écrit avant de commencer."],
  ["Un tarif solidaire", "Les prestations aux organisations financent des tarifs réduits pour les groupes et les micro-entrepreneurs."],
  ["Des excédents réinvestis", "Dans nos outils, la formation de relais locaux et notre présence sur le terrain."],
  ["Des résultats suivis en direct", "Indicateurs fixés ensemble, données dans nos outils dès le premier jour."],
  ["Des outils qui restent", "À la clôture, les groupes, les relais formés, les outils et l'historique restent en place."],
  ["Les dons à part", "L'entreprise vit de ses prestations. Les dons et subventions vont à l'association UBORA, entité distincte."]
];
function pageHome() {
  const news = allNews().slice(0, 3);
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne").length;
  return `
  <section class="r-hero r-hero-plein">
    <div class="r-hero-fond"><img src="/img/avec-1600.webp" srcset="${HERO.srcset}" sizes="${HERO.sizes}" alt="Des femmes réunies en groupe d'épargne" width="1600" height="1067" decoding="async" fetchpriority="high"></div>
    <div class="wrap r-hero-txt">
      <span class="r-sur">Entreprise à caractère social · Lubumbashi, RDC</span>
      <h1>Épargner. Entreprendre. <span class="serif">Vendre.</span></h1>
      <p class="r-chapeau">Formation, mise en œuvre de projets et logiciels pour l'épargne, l'entrepreneuriat et les coopératives. Les organisations paient le prix du service ; les groupes et les petits entrepreneurs, un tarif solidaire.</p>
      <div class="btn-row"><a class="btn btn-accent" href="#solutions" data-scroll="solutions">Nos solutions ${ICON.arrow}</a><a class="btn btn-glass" href="/contact?sujet=${encodeURIComponent("Demande de devis")}">Demander un devis</a></div>
      <form class="r-demander" data-demander aria-label="Poser une question à l'assistant Ubora">
        <span class="ic" aria-hidden="true">${ICON.spark}</span>
        <input name="q" maxlength="300" autocomplete="off" placeholder="Posez votre question sur Ubora…" aria-label="Votre question à l'assistant Ubora">
        <button class="btn btn-sm" type="submit">Demander</button>
      </form>
      <p class="r-demander-note">L'assistant répond à partir des informations de ce site.</p>
    </div>
  </section>

  <section class="r-chiffres" aria-label="Ubora en chiffres"><div class="wrap"><ul>
    <li><b data-compte="${POLES.length}">${POLES.length}</b><span>domaines d'intervention</span></li>
    <li><b data-compte="${enLigne}">${enLigne}</b><span>applications en ligne</span></li>
    <li><b data-compte="140" data-suffixe="+">140+</b><span>cours à l'Académie</span></li>
    <li><b>Hors ligne</b><span>nos outils marchent sans réseau</span></li>
  </ul></div></section>

  <section class="r-globe" aria-labelledby="titre-globe"><div class="wrap r-globe-in">
    <div class="r-globe-scene">
      <canvas id="globe" tabindex="0" role="img" aria-label="Globe en relief : la République démocratique du Congo et Lubumbashi, siège d'Ubora. Faites-le tourner avec la souris, le doigt ou les flèches du clavier."></canvas>
      <p class="r-globe-aide" aria-hidden="true">Faites glisser pour tourner le globe</p>
    </div>
    <div class="r-globe-txt">
      <span class="eyebrow">Où nous intervenons</span>
      <h2 id="titre-globe">Basés à Lubumbashi, au service de toute la <span class="serif">RDC</span>.</h2>
      <p>Notre siège est à Lubumbashi, dans le Haut-Katanga. Nous travaillons partout en RDC, sur le terrain et à distance : nos applications fonctionnent même sans réseau.</p>
      <ul class="r-globe-reperes">
        <li><b>Lubumbashi</b><span>notre siège, dans le Haut-Katanga</span></li>
        <li><b data-compte="26">26</b><span>provinces où nous pouvons intervenir</span></li>
      </ul>
    </div>
  </div></section>

  <section id="poles"><div class="wrap">
    ${secHead("Nos domaines", `Un accompagnement <span class="serif">complet</span>`)}
    <div class="r-poles">${POLES.map(p => `<a class="r-pole${p.transversal ? " transversal" : ""}" href="${p.chemin}" style="--c:${p.couleur}"><span class="mk">${picto(p)}</span><b>${esc(p.nom)}</b><span>${esc(p.accroche)}</span></a>`).join("")}</div>
  </div></section>

  ${vitrine()}

  <section class="r-methode"><div class="wrap">
    <div class="r-tete"><div><span class="eyebrow">${esc(METHODE.nom)}</span><h2>De l'écoute au suivi, en six temps.</h2></div>
      <p>Pour un groupe d'épargne, un entrepreneur ou une coopérative : seul le contenu change. Nous restons jusqu'à ce que les résultats tiennent.</p></div>
    <ol class="r-etapes">${METHODE.etapes.map((e, i) => `<li><span class="pn">${String(i + 1).padStart(2, "0")}</span><b>${esc(e.titre)}</b><span>${esc(e.texte)}</span></li>`).join("")}</ol>
    <a class="link" href="/approche#methode">Notre approche en détail ${ICON.arrow}</a>
  </div></section>

  <section class="r-engagements"><div class="wrap">
    <div class="r-tete"><div><span class="eyebrow">Nos engagements</span><h2>Une entreprise qui rend des comptes.</h2></div>
      <p>Nos clients paient un service : ils savent ce qu'ils achètent, et ce que devient l'excédent.</p></div>
    <ul class="r-engage">${ENGAGEMENTS.map(([t, x]) => `<li><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join("")}</ul>
  </div></section>

  <section class="r-avec"><div class="wrap">
    <div class="r-tete"><div><span class="eyebrow">Nos clients</span><h2>Trois clientèles, une même <span class="serif">exigence</span>.</h2></div><p>Ce que paient les organisations finance le tarif solidaire des groupes et des petits entrepreneurs.</p></div>
    <div class="r-portes">
      <div class="r-porte"><span class="ic">${ICON.handshake}</span><h3>Bailleurs, ONG et programmes</h3><p>Mise en œuvre, suivi et outils, sur devis. Pour commencer : un projet pilote aux indicateurs fixés ensemble.</p><a class="link" href="/approche#pilote">Le projet pilote ${ICON.arrow}</a></div>
      <div class="r-porte"><span class="ic">${ICON.users}</span><h3>Groupes, entrepreneurs et coopératives</h3><p>Formations, accompagnement et applications à tarif solidaire. Dites-nous où vous en êtes.</p><a class="link" href="${waLink("Bonjour Ubora, je souhaite être accompagné.")}" target="_blank" rel="noopener">Écrire sur WhatsApp ${ICON.arrow}</a></div>
      <div class="r-porte"><span class="ic">${ICON.coins}</span><h3>Institutions financières et acheteurs</h3><p>Des clients formés et suivis pour les IMF et les COOPEC, des producteurs organisés pour les acheteurs.</p><a class="link" href="/contact">Nous écrire ${ICON.arrow}</a></div>
    </div>
  </div></section>

  <section class="r-citation"><div class="wrap">
    <blockquote><p>Ceux qui peuvent payer financent l'accompagnement de ceux qui ne le peuvent pas.</p>
      <footer><a class="link" href="/a-propos#modele">Notre modèle d'entreprise sociale ${ICON.arrow}</a></footer></blockquote>
  </div></section>

  ${news.length ? `<section><div class="wrap">
    ${secHead("Actualités", "Nouvelles du terrain", "", `<a class="btn btn-ghost" href="/actualites">Toutes les actualités ${ICON.arrow}</a>`)}
    <div class="news-grid">${news.map(newsCard).join("")}</div>
  </div></section>` : ""}`;
}
function pageAbout() {
  const membres = DATA.equipe;
  const ongletsPropos = [["mission", "Mission"], ["modele", "Notre modèle"], ["valeurs", "Nos valeurs"], ["soutenir", "Travailler avec nous"], ["faq", "Questions"]];
  const distingue = [
    ["Le but", "Rémunérer ses propriétaires.", "Rendre plus solides ceux que nous accompagnons."],
    ["Qui est servi", "Ceux qui peuvent payer le prix du marché.", "Aussi ceux qui ne le peuvent pas, à tarif solidaire."],
    ["Les excédents", "Distribués aux propriétaires.", "Réinvestis dans nos outils, les relais locaux et le terrain."],
    ["Quand le projet s'arrête", "La prestation s'arrête avec le contrat.", "Nous restons, et le suivi continue."]
  ];
  const voies = [
    [ICON.briefcase, "Confier une mission", "Commencez par un projet pilote : chaque prestation finance aussi nos services à tarif solidaire.", "/approche#pilote", "Le projet pilote"],
    [ICON.coins, "Apporter du capital", "Ubora Fin oriente votre capital vers les groupes que nous accompagnons, et vous en rend compte.", "/financement#intermediation", "Le rôle d'Ubora Fin"],
    [ICON.handshake, "Devenir partenaire", "Compétences, équipements, mises en relation : dites-nous ce que vous pouvez apporter.", "/contact?sujet=" + encodeURIComponent("Partenariat"), "Proposer un partenariat"],
    [ICON.heart, "Un don ?", "L'entreprise n'en reçoit pas : dons et subventions vont à l'association UBORA, qui conduit les projets sans but lucratif.", "/ong", "L'association UBORA"]
  ];
  return pageHead({ eyebrow: "À propos", title: `Une entreprise sociale, pour que l'effort des familles <span class="serif">porte ses fruits</span>.`, crumbs: [["À propos"]], photo: ["terrain", "Une communauté réunie en plein air"],
    lead: "Ubora veut dire « excellence » en swahili : c'est ce que nous devons à ceux que nous accompagnons, qui n'ont pas droit à l'erreur." }) + `
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page">${ongletsPropos.map(([id, t]) => `<a href="#${id}" data-scroll="${id}">${t}</a>`).join("")}</nav></div></section>

  <section id="mission"><div class="wrap two">
    <div><span class="eyebrow">Mission</span>
      <p class="quote">Aider les entreprises et les communautés congolaises à tenir face aux chocs, puis à grandir.</p></div>
    <div class="prose-sm">
      <p>La plupart des entreprises du pays restent informelles et loin du crédit : au moindre choc, elles perdent ce qu'elles ont construit. Nous renforçons ce qui les rend solides : l'organisation, l'épargne, le crédit, les compétences et des outils adaptés au terrain.</p>
    </div>
  </div></section>

  <section class="band" id="modele"><div class="wrap">
    ${secHead("Notre modèle", `Pourquoi nous avons choisi d'être une <span class="serif">entreprise sociale</span>`, "Un projet de deux ou trois ans s'arrête quand les progrès commencent. Nous voulions pouvoir rester.")}
    <div class="grid-4">
      <div class="fcard"><span class="ic">${ICON.briefcase}</span><h3>Qui paie</h3><p>Les organisations qui nous confient des missions : ONG, bailleurs, institutions financières, programmes.</p></div>
      <div class="fcard"><span class="ic">${ICON.heart}</span><h3>Qui en bénéficie</h3><p>Groupes d'épargne, jeunes, femmes et producteurs ruraux, à tarif solidaire.</p></div>
      <div class="fcard"><span class="ic">${ICON.coins}</span><h3>Ce que nous mobilisons</h3><p>Par Ubora Fin, le capital des financeurs pour les groupes accompagnés. Ubora Fin ne prête pas.</p></div>
      <div class="fcard"><span class="ic">${ICON.spark}</span><h3>Ce que nous réinvestissons</h3><p>Nos outils, les relais locaux et le suivi après la fin des projets.</p></div>
    </div>
    <div class="table-wrap"><table class="compare"><thead><tr><th></th><th>Une entreprise classique</th><th>Ubora, entreprise sociale</th></tr></thead>
      <tbody>${distingue.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td data-l="Une entreprise classique">${b}</td><td class="ok" data-l="Ubora, entreprise sociale">${c}</td></tr>`).join("")}</tbody></table></div>
  </div></section>



  <section id="valeurs"><div class="wrap">
    ${secHead("Nos valeurs", `Quatre mots <span class="serif">swahili</span> qui nous guident`)}
    <div class="grid-4">
      <div class="value"><small lang="sw">ubora</small><h3>L'excellence</h3><p>Un travail sérieux et des outils fiables. Nos clients ne méritent pas moins.</p></div>
      <div class="value"><small lang="sw">ustahimilivu</small><h3>La résilience</h3><p>Aider les familles et les entreprises à traverser les crises, puis à repartir.</p></div>
      <div class="value"><small lang="sw">uwazi</small><h3>La transparence</h3><p>Des comptes clairs et des données partagées. La confiance se construit ainsi.</p></div>
      <div class="value"><small lang="sw">umoja</small><h3>La solidarité</h3><p>Personne n'est laissé de côté. Les femmes, les jeunes et les zones rurales d'abord.</p></div>
    </div>
    <div class="odd">
      <span><b style="background:#E5243B">1</b> Pas de pauvreté</span><span><b style="background:#DDA63A">2</b> Faim « zéro »</span><span><b style="background:#FF3A21">5</b> Égalité entre les sexes</span>
      <span><b style="background:#A21942">8</b> Travail décent et croissance</span><span><b style="background:#FD6925">9</b> Industrie et innovation</span><span><b style="background:#DD1367">10</b> Inégalités réduites</span>
    </div>
  </div></section>

  <section class="band" id="soutenir"><div class="wrap">
    ${secHead("Travailler avec nous", `Quatre façons de travailler avec <span class="serif">Ubora</span>`, "Trois relèvent de l'entreprise, sur devis ou par contrat. Les dons, eux, vont à l'association UBORA, entité distincte.")}
    <div class="grid-4">${voies.map(([ic, t, x, lien, lib]) => `<div class="fcard"><span class="ic">${ic}</span><h3>${t}</h3><p>${x}</p><a class="link" href="${lien}">${lib} ${ICON.arrow}</a></div>`).join("")}</div>
  </div></section>


  <section id="faq"><div class="wrap">${secHead("Questions fréquentes", "Vous vous demandez peut-être")}${faq(FAQ)}</div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* ---------- Page d'un domaine ---------- */
/* Nos solutions (/solutions) : les domaines, chacun avec ses applications, en synthèse */
function pageSolutions() {
  const lienO = o => o.fiche ? "/outils/" + o.id : o.url;
  const ligne = o => o.statut === "en-ligne"
    ? `<li><a href="${lienO(o)}"${ext(lienO(o))}><span class="mk" style="background:${o.couleur}">${picto(o)}</span><span><b>${esc(o.nom)}</b><small>${esc(o.court || "")}</small></span></a></li>`
    : `<li class="bientot"><span class="mk" style="background:${o.couleur}">${picto(o)}</span><span><b>${esc(o.nom)}</b><small>En construction</small></span></li>`;
  const outilsDe = id => OUTILS.filter(o => o.pole === id);
  const orga = outilsDe("conseil");
  return `<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>Nos solutions</span></nav>
        <span class="eyebrow">Nos solutions</span>
        <h1>Sept domaines, et les outils qui les <span class="serif">servent</span>.</h1>
        <p>Du premier franc épargné au premier contrat de vente : chaque domaine tient un maillon, avec des applications pensées pour le terrain.</p>
      </div>
      <div class="pg-hero-photo">${photo("akiba", "(max-width: 900px) 100vw, 55vw", "Un groupe d'épargne tient ses comptes sur téléphone", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à un domaine">${POLES.map(p => `<a href="#${p.id}" data-scroll="${p.id}">${esc(p.nom)}</a>`).join("")}${orga.length ? `<a href="#organisations" data-scroll="organisations">Organisations</a>` : ""}</nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    ${POLES.map(p => { const o = outilsDe(p.id); return `<article class="pg-carte" id="${p.id}" style="--c:${p.couleur}">
      <div class="pg-carte-g">
        ${p.photo ? `<div class="pg-carte-photo">${photo(p.photo[0], "(max-width: 900px) 100vw, 360px", p.photo[1]).replace("<img ", '<img loading="lazy" ')}</div>` : ""}
        <h2>${esc(p.nom)}</h2>
        <p class="pg-accroche">${esc(p.accroche)}</p>
        <p>${esc(p.lead)}</p>
      </div>
      <div class="pg-carte-d">
        ${o.length ? `<div class="pg-bandeau">Les outils du domaine</div><ul class="pg-outils">${o.map(ligne).join("")}</ul>` : ""}
        <div class="pg-bandeau">Ce que nous faisons</div>
        <ul class="pg-etapes">${(p.parcours || []).map(([t]) => `<li>${esc(t)}</li>`).join("")}</ul>
        <p class="pg-lien"><a class="link" href="${p.chemin}">Découvrir ${esc(p.nom)} ${ICON.arrow}</a></p>
      </div>
    </article>`; }).join("")}
    ${orga.length ? `<article class="pg-carte" id="organisations" style="--c:${orga[0].couleur}">
      <div class="pg-carte-g">
        <h2>Pour les organisations</h2>
        <p class="pg-accroche">Associations, ONG, entreprises sociales et projets financés par des bailleurs.</p>
        <p>Une gestion rigoureuse, avec des circuits de validation clairs, pour rendre compte aux membres et aux bailleurs.</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Les outils</div><ul class="pg-outils">${orga.map(ligne).join("")}</ul>
        <p class="pg-lien"><a class="link" href="/approche#bailleurs">Nos services aux bailleurs et aux ONG ${ICON.arrow}</a></p>
      </div>
    </article>` : ""}
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* Notre approche (/approche) : la méthode, puis ce que nous offrons aux bailleurs et aux ONG */
function pageApproche() {
  const onglets = [["methode", "Notre méthode"], ["bailleurs", "Bailleurs et ONG"], ["pilote", "Le projet pilote"], ["mise-en-oeuvre", "La mise en œuvre"], ["prestations", "Nos prestations"], ["relais", "Après le projet"]];
  return pageHead({ eyebrow: "Notre approche", title: `Former sans outiller ne suffit pas. Outiller sans accompagner <span class="serif">non plus</span>.`, crumbs: [["Notre approche"]],
    lead: METHODE.intro }) + `
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page">${onglets.map(([id, t]) => `<a href="#${id}" data-scroll="${id}">${t}</a>`).join("")}</nav></div></section>
  <section id="methode"><div class="wrap">
    ${secHead(METHODE.nom, "Six temps, toujours dans le même ordre", "Pour un groupe d'épargne, un entrepreneur ou une coopérative : seul le contenu change.")}
    <ol class="steps steps-court">${METHODE.etapes.map((e, i) => `<li><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p></li>`).join("")}</ol>
  </div></section>
  <section class="band" id="bailleurs"><div class="wrap">
    ${secHead("Bailleurs, ONG et programmes", `Vos programmes méritent de durer plus longtemps que leur <span class="serif">financement</span>`, "Nous les mettons en œuvre sur le terrain, nous en suivons les résultats en direct, puis nous prenons le relais.")}
    <div id="pilote" class="approche-bloc">
      <h3 class="sous-titre">Commencer par un projet pilote</h3>
      <p class="muted">La façon la plus sûre de commencer avec nous. Le pilote est confié à l'entreprise sociale (prestation) ou à l'association UBORA (subvention).</p>
      <ol class="chaine quatre">${PILOTE.temps.map(([t, x], i) => `<li><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join("")}</ol>
      <div class="grid-3 pilotes">${PILOTE.exemples.map(([id, t, x, m]) => { const p = poleReal(id); return `<div class="fcard" style="--c:${p.couleur}"><span class="tag" style="background:${p.couleur};color:#fff">${esc(p.nom)}</span><h3>${esc(t)}</h3><p class="mesure"><b>À mesurer</b> ${esc(m)}</p></div>`; }).join("")}</div>
    </div>
    <div id="mise-en-oeuvre" class="approche-bloc">
      <h3 class="sous-titre">Mettre en œuvre votre projet</h3>
      <div class="grid-2 formules">${MISE_EN_OEUVRE.formules.map(([t, x]) => `<div class="fcard"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
    </div>
    <div id="prestations" class="approche-bloc">
      <h3 class="sous-titre">Nos prestations</h3>
      <div class="grid-4">${CONSEIL.map(s => `<div class="fcard"><span class="ic">${ICON[s.ico]}</span><h3>${esc(s.titre)}</h3><p>${esc(s.texte)}</p></div>`).join("")}</div>
    </div>
    <div class="btn-row centre"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent("Projet pilote")}">Proposer un projet pilote ${ICON.arrow}</a><a class="btn btn-ghost" href="/contact?sujet=${encodeURIComponent("Présentation d'Ubora")}">Demander notre présentation</a></div>
  </div></section>
  <section id="relais"><div class="wrap">${relais(false)}</div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* Notre équipe (/equipe) : le directeur, l'équipe et les carrières */
function pageEquipe() {
  const membres = DATA.equipe;
  return pageHead({ eyebrow: "Notre équipe", title: `Des gens de terrain, et des <span class="serif">spécialistes</span>.`, crumbs: [["Notre équipe"]],
    lead: "Consultants, formateurs, agents de terrain et développeurs, partout en RDC." }) + `
  <section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page"><a href="#direction" data-scroll="direction">La direction</a>${membres.length ? `<a href="#membres" data-scroll="membres">L'équipe</a>` : ""}<a href="#carrieres" data-scroll="carrieres">Carrières</a></nav></div></section>
  <section id="direction"><div class="wrap">${profilDirigeant()}</div></section>
  ${membres.length ? `<section class="band" id="membres"><div class="wrap">
    ${secHead("L'équipe", "Celles et ceux qui font Ubora")}
    <div class="team-grid">${membres.map(memberCard).join("")}</div>
  </div></section>` : ""}
  ${blocOffres(typeof window !== "undefined" && window.location ? (location.hash.match(/^#offre-(.+)$/) || [])[1] : null)}
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* Vue d'ensemble des domaines (/poles) — remplacée par Nos solutions */
function pagePoles() {
  return `<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>Nos domaines</span></nav>
        <span class="eyebrow">Nos domaines</span>
        <h1>Sept domaines, une même <span class="serif">chaîne</span>.</h1>
        <p>Du premier franc épargné au premier contrat de vente : chaque domaine tient un maillon, et l'Académie forme à chaque étape.</p>
      </div>
      <div class="pg-hero-photo">${photo("terrain", "(max-width: 900px) 100vw, 55vw", "Une communauté réunie en plein air", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à un domaine">${POLES.map(p => `<a href="#${p.id}" data-scroll="${p.id}">${esc(p.nom)}</a>`).join("")}</nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    ${POLES.map(p => `<article class="pg-carte" id="${p.id}" style="--c:${p.couleur}">
      <div class="pg-carte-g">
        ${p.photo ? `<div class="pg-carte-photo">${photo(p.photo[0], "(max-width: 900px) 100vw, 360px", p.photo[1]).replace("<img ", '<img loading="lazy" ')}</div>` : ""}
        <h2>${esc(p.nom)}</h2>
        <p class="pg-accroche">${esc(p.accroche)}</p>
        <p>${esc(p.lead)}</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Ce que nous faisons</div>
        <ul class="pg-domaines">${(p.parcours || []).slice(0, 6).map(([t, x]) => `<li><b>${esc(t)}</b><span>${esc(x)}</span></li>`).join("")}</ul>
        <p class="pg-lien"><a class="link" href="${p.chemin}">Découvrir ${esc(p.nom)} ${ICON.arrow}</a></p>
      </div>
    </article>`).join("")}
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* Barre de pastilles sous l'en-tête d'une page de domaine : les sections de la page */
function ongletsPole(P) {
  const items = [
    P.video && ["video", "En vidéo"], ["contexte", "Le contexte"], P.chaine && ["chaine", "Chaîne de valeur"], ["demarche", "Notre démarche"],
    P.avec && ["credit", "Vers le crédit"], P.intermediation && ["intermediation", "Notre rôle"], P.canaux && ["debouches", "Les débouchés"],
    ["outils", (P.outils || []).length ? "Outils et publics" : "Nos publics"], P.boite && P.boite.statut === "disponible" && ["boite", "Boîte à outils"], P.id === "academie" && ["sessions", "Sur place"]
  ].filter(Boolean);
  return `<section class="pg-barre"><div class="wrap"><nav class="pg-onglets" aria-label="Sur cette page" style="--c:${P.couleur}">${items.map(([id, t]) => `<a href="#${id}" data-scroll="${id}">${t}</a>`).join("")}</nav></div></section>`;
}

function pagePole(id) {
  const P = pole(id); if (!P) return notFound();
  const outilsLies = (P.outils || []).map(outil).filter(Boolean);
  const enLigne = outilsLies.filter(o => o.statut === "en-ligne");
  /* la grille des outils ne renvoie pas vers la page elle-même (l'Académie s'ouvre déjà depuis l'en-tête) */
  const cartesOutils = outilsLies.filter(o => !(o.statut === "en-ligne" && lienOutil(o) === P.chemin));
  const reals = DATA.realisations.filter(r => r.pole === P.id);
  return pageHead({
    eyebrow: esc(P.nom), title: P.titre, lead: esc(P.lead), crumbs: [["Nos solutions", "/solutions"], [esc(P.nom)]], photo: P.photo,
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(P.nom)}">Parler de votre projet ${ICON.arrow}</a>
      ${P.boite && P.boite.statut === "disponible" ? `<a class="btn btn-glass" href="#boite" data-scroll="boite">La boîte à outils</a>` : ""}
      ${enLigne.filter(o => o.pole === P.id && (o.fiche || lienOutil(o) === P.chemin)).map(o => lienOutil(o) === P.chemin ? `<a class="btn btn-glass" href="${o.url}" target="_blank" rel="noopener">Ouvrir ${esc(o.nom)} ${ICON.ext}</a>` : "").join("")}</div>`
  }) + `
  ${ongletsPole(P)}

  ${P.video ? blocVideo(P.video) : ""}

  <section id="contexte"><div class="wrap two">
    <div>
      <span class="eyebrow">Le contexte en RDC</span>
      <h2 class="h2-md">Ce que nous constatons sur le terrain</h2>
      <p class="lead">${esc(P.contexte.intro)}</p>
      ${P.avec ? `<details class="definition"><summary>Qu'est-ce qu'une AVEC ?</summary><p>${esc(AVEC.definition)}</p></details>` : ""}
    </div>
    <div class="panel">${constats(P.contexte.constats)}</div>
  </div></section>

  ${P.programmes ? `<section class="band"><div class="wrap">
    ${secHead(P.programmesTitre ? P.programmesTitre[0] : "Nos offres", P.programmesTitre ? P.programmesTitre[1] : "Trois offres, selon le stade de l'entreprise")}
    <div class="${P.programmes.length > 3 && P.programmes.length !== 6 ? "grid-4" : "grid-3"}">${P.programmes.map(([t, q, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p class="sub">${esc(q)}</p><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.entrees ? `<section class="band"><div class="wrap">
    ${secHead("Deux points de départ", "Nous partons toujours de ce qui existe")}
    <div class="grid-2">${P.entrees.map(([t, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.chaine ? `<section id="chaine"><div class="wrap">
    ${secHead("Chaîne de valeur", esc(P.chaine.titre), esc(P.chaine.intro))}
    <ol class="chaine">${P.chaine.maillons.map(([t, x, r], i) => `<li class="reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join("")}</ol>
  </div></section>` : ""}

  <section id="demarche"${(P.programmes || P.entrees) && !P.chaine ? "" : ' class="band"'}><div class="wrap">
    ${secHead("Notre démarche", "Étape par étape")}
    ${parcoursList(P.parcours)}
  </div></section>

  ${P.avec ? `<section class="band" id="credit"><div class="wrap">
    ${secHead("Vers le crédit", `Transformer la discipline d'un groupe en <span class="serif">accès au crédit</span>`)}
    <ol class="bridge">${AVEC.passerelle.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <p class="suite"><a class="link" href="/financement#intermediation">Comment Ubora Fin mobilise le capital pour les groupes ${ICON.arrow}</a></p>
  </div></section>` : ""}

  ${P.intermediation ? `<section id="intermediation"><div class="wrap">
    ${secHead("Notre rôle d'intermédiaire", esc(P.intermediation.titre), esc(P.intermediation.intro))}
    <div class="flux" role="group" aria-label="Circulation des fonds">
      <span>Institutions financières, investisseurs, bailleurs</span><i aria-hidden="true">${ICON.arrow}</i>
      <span class="on">Ubora Fin</span><i aria-hidden="true">${ICON.arrow}</i>
      <span>AVEC</span><i aria-hidden="true">${ICON.arrow}</i><span>Membres</span>
    </div>
    <div class="grid-3 gains">${P.intermediation.gains.map(([t, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.canaux ? `<section class="band" id="debouches"><div class="wrap">
    ${secHead("Les débouchés", esc(P.canaux.titre), esc(P.canaux.intro))}
    <div class="grid-2">${P.canaux.liste.map(([t, q, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p class="sub">${esc(q)}</p><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.projet ? `<section><div class="wrap">
    <div class="deep projet"><span class="eyebrow">En préparation</span>
      <h2>${esc(P.projet.titre)}</h2><p class="lead">${esc(P.projet.texte)}</p><p class="etat">${esc(P.projet.etat)}</p>
      <p class="appel">${esc(P.projet.appel)}</p>
      <div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(P.projet.titre)}">Nous écrire ${ICON.arrow}</a><a class="btn btn-glass" href="${waLink("Bonjour Ubora, je m'intéresse au projet : " + P.projet.titre + ".")}" target="_blank" rel="noopener">WhatsApp</a></div></div>
  </div></section>` : ""}

  ${reals.length ? `<section class="band"><div class="wrap">
    ${secHead("Sur le terrain", `Nos réalisations avec ${esc(P.nom)}`, "", `<a class="btn btn-ghost" href="/realisations?pole=${P.id}">Toutes ${ICON.arrow}</a>`)}
    <div class="real-grid">${reals.slice(0, 3).map(realCard).join("")}</div>
  </div></section>` : ""}

  <section id="outils"><div class="wrap">
    ${cartesOutils.length ? `${secHead("Outils et publics", `Les outils du domaine ${esc(P.nom)}`)}
    <div class="tools">${cartesOutils.map(o => outilCard(o, true)).join("")}</div>` : secHead("Nos publics", "Avec qui nous travaillons")}
    <div class="publics"><b>Pour qui</b>${P.publics.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>

  ${boiteOutils(P.boite, P.boite ? P.boite.titre : P.nom)}

  ${P.id === "academie" ? blocFormations() : ""}

  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageOutils() {
  const enLigne = OUTILS.filter(o => o.statut === "en-ligne"), chantier = OUTILS.filter(o => o.statut !== "en-ligne");
  const plus = o => o.fiche ? "/outils/" + o.id : (o.page && o.page.startsWith("/") ? o.page : "");
  return `<section class="pg-tete"><div class="wrap">
    <div class="pg-hero">
      <div class="pg-hero-txt">
        <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span>Nos solutions</span></nav>
        <span class="eyebrow">Nos solutions numériques</span>
        <h1>Des outils qui tiennent là où le réseau <span class="serif">lâche</span>.</h1>
        <p>Pensés pour le village sans réseau et pour qui n'a jamais ouvert un tableur. Chacun s'accompagne d'une formation.</p>
      </div>
      <div class="pg-hero-photo">${photo("akiba", "(max-width: 900px) 100vw, 55vw", "Un groupe d'épargne tient ses comptes sur téléphone", ' fetchpriority="high"')}</div>
    </div>
    <nav class="pg-onglets" aria-label="Aller à une solution">${enLigne.map(o => `<a href="#${o.id}" data-scroll="${o.id}">${esc(o.nom)}</a>`).join("")}<a href="#chantier" data-scroll="chantier">En construction</a></nav>
  </div></section>
  <section class="pg-liste"><div class="wrap">
    ${enLigne.map(o => `<article class="pg-carte" id="${o.id}" style="--c:${o.couleur}">
      <div class="pg-carte-g">
        <div class="pg-carte-photo">${banniere(o, "(max-width: 900px) 100vw, 360px")}</div>
        <h2>${esc(o.nom)}</h2>
        <p class="pg-accroche">${esc(o.court || "")}</p>
        <p>${esc(o.resume)}</p>
      </div>
      <div class="pg-carte-d">
        <div class="pg-bandeau">Ce que fait ${esc(o.nomPhrase || o.nom)}</div>
        <ul class="pg-domaines pg-points">${(o.points || []).slice(0, 6).map(x => `<li><b>${esc(x)}</b></li>`).join("")}</ul>
        <div class="pg-actions"><a class="btn btn-accent" href="${o.url}" target="_blank" rel="noopener">Ouvrir ${esc(o.nom)} ${ICON.ext}</a>${plus(o) ? `<a class="link" href="${plus(o)}">En savoir plus ${ICON.arrow}</a>` : ""}</div>
      </div>
    </article>`).join("")}
    <div id="chantier">
      <h2 class="sous-titre vitrine-titre">En construction</h2>
      <div class="vitrine-grille chantier">${chantier.map(o => `<article class="solution bientot" style="--c:${o.couleur}">
        <div class="bientot-img" aria-hidden="true"><span class="mk">${picto(o)}</span><span class="status st-soon">En construction</span></div>
        <div class="solution-txt"><b>${esc(o.nom)}</b><span>${esc(o.resume)}</span><span class="solution-pole">${esc(poleReal(o.pole).nom)}</span></div>
      </article>`).join("")}</div>
    </div>
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* ---------- Page de présentation d'un logiciel (/outils/<id>) ---------- */
/* Vidéo de présentation (page d'un domaine ou d'un logiciel). Elle ne se charge qu'à la demande ;
   « leger » est une version de plus petite taille, proposée pour les connexions lentes. */
function blocVideo(v) {
  return `<section id="video"><div class="wrap">
    ${secHead("En vidéo", esc(v.titre))}
    <figure class="video-cadre">
      <video controls preload="none" playsinline width="1280" height="720" poster="${v.affiche}"><source src="${v.src}" type="video/mp4">${v.sousTitres ? `<track kind="subtitles" srclang="fr" label="Français" src="${v.sousTitres}">` : ""}Votre navigateur ne lit pas cette vidéo. <a href="${v.src}">Ouvrir le fichier</a>.</video>
      <figcaption>${esc(v.legende)}${v.youtube ? ` <a href="https://www.youtube.com/watch?v=${v.youtube}" target="_blank" rel="noopener">Voir sur YouTube</a>` : ""}${v.leger ? ` <a href="${v.leger[0]}" target="_blank" rel="noopener">Connexion lente ? Version légère (${esc(v.leger[1])})</a>` : ""}</figcaption>
    </figure>
  </div></section>`;
}

function pageOutil(o) {
  const F = o.fiche, p = poleReal(o.pole);
  const inscription = o.inscription ? (o.inscriptionOuverte
    ? `<a class="btn btn-accent" href="${o.inscription}" target="_blank" rel="noopener">Inscrire mon incubateur ${ICON.ext}</a>`
    : `<a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(o.nom)}">Demander un accès ${ICON.arrow}</a>`) : "";
  const ouvrir = classe => `<a class="btn ${classe}" href="${o.url}" target="_blank" rel="noopener">${esc(F.ouvrir)} ${ICON.ext}</a>`;
  return pageHead({
    eyebrow: esc(o.nom), title: F.titre, lead: esc(F.lead || o.resume), crumbs: [["Nos solutions", "/solutions"], [esc(o.nom)]], ecran: mockFor(o.mock),
    extra: `<div class="btn-row">${inscription}${ouvrir(inscription ? "btn-glass" : "btn-accent")}</div>`
  }) + `

  ${F.video ? blocVideo(F.video) : ""}

  <section><div class="wrap">
    ${secHead("Ce que fait " + esc(o.nomPhrase || o.nom), esc(F.atouts))}
    ${F.fonctions
      ? `<div class="grid-3">${F.fonctions.map(([t, x], i) => `<div class="fcard fonction reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>`
      : `<div class="panel"><ul class="checks cols">${o.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`}
    ${F.phases ? `<div class="flux phases" role="group" aria-label="${esc(F.phasesTitre || "Le parcours de l'entrepreneur")}"><b>${esc(F.phasesTitre || "Le parcours de l'entrepreneur")}</b>${F.phases.map(x => `<span>${esc(x)}</span>`).join(`<i aria-hidden="true">${ICON.arrow}</i>`)}</div>` : ""}
    <div class="publics"><b>Pour qui</b>${F.pour.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>

  ${o.id === "akiba" ? `<section class="band"><div class="wrap">
    ${secHead("Avant, après", `Ce qui change avec <span class="serif">AKIBA</span>`, "Le groupe garde ses règles et ses réunions. Seule la tenue des comptes change, et tout le monde peut désormais la vérifier.")}
    <div class="table-wrap replie"><table class="compare"><thead><tr><th></th><th>Avec le cahier</th><th>Avec AKIBA</th></tr></thead>
      <tbody>${AVEC.avantApres.map(([q, x, y]) => `<tr><th scope="row">${esc(q)}</th><td data-l="Avec le cahier">${esc(x)}</td><td class="ok" data-l="Avec AKIBA">${esc(y)}</td></tr>`).join("")}</tbody></table></div>${plusBtn("Voir toute la comparaison")}
  </div></section>` : ""}

  <section id="acces"><div class="wrap">
    ${secHead("Pour commencer", esc(F.accesTitre || "Trois étapes pour démarrer"))}
    <ol class="bridge">${F.acces.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <div class="btn-row centre">${F.android ? `<a class="btn btn-primary" href="${F.android}" target="_blank" rel="noopener">Installer sur Android ${ICON.ext}</a>` : ""}<a class="btn btn-ghost" href="/contact?sujet=${encodeURIComponent(o.nom)}">Une question ? Écrivez-nous</a></div>
    ${F.accesNote ? `<p class="suite">${esc(F.accesNote)}</p>` : ""}
    <p class="suite">${pole(o.pole) ? `Ce logiciel accompagne le domaine <a class="link" href="${p.chemin}">${esc(p.nom)}</a>.` : `Ce logiciel accompagne nos <a class="link" href="/approche#bailleurs">projets et conseil</a> aux organisations.`}</p>
  </div></section>`;
}


/* Formations sur place : le calendrier des sessions et ce que nous enseignons (page Académie) */
function blocFormations() {
  const t = todayISO();
  const sessions = [...DATA.formations].filter(f => f.date >= t).sort((a, b) => a.date.localeCompare(b.date));
  return `  <section id="sessions"><div class="wrap">
    ${secHead("Sur place", "Sessions et formations à la demande", "Dans votre province ou en ligne, pour vos équipes et vos relais.")}
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
    }).join("")}</div>` : `<div class="empty"><b>Le prochain calendrier est en préparation.</b><p>En attendant, nous organisons des sessions à la demande.</p><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent("Formation")}">Demander une formation</a></div>`}
    <ul class="catalogue">${CATALOGUE.map(([t, pid]) => { const p = pole(pid); return `<li style="--c:${p.couleur}"><span class="tag" style="background:${p.couleur};color:#fff">${esc(p.nom)}</span>${esc(t)}</li>`; }).join("")}</ul>
  </div></section>`;
}

function pageNews() {
  const list = allNews();
  return pageHead({ eyebrow: "Actualités", title: "Nouvelles du terrain", crumbs: [["Actualités"]],
    lead: "Nos programmes, nos déploiements, nos formations et ce que nous apprenons en chemin." }) + `
  <section><div class="wrap">
    ${(() => { const cats = [...new Set(list.map(n => n.categorie))]; return cats.length > 1 ? filtres("Filtrer par catégorie", cats.map(c => [cle(c), c])) : ""; })()}
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

function profilDirigeant() {
  const D = DIRIGEANT;
  return `<article class="dirigeant">
    <div class="dir-id">
      <img class="dir-photo" src="${D.photo}" srcset="${D.photoPetite} 400w, ${D.photo} 800w" sizes="(max-width: 760px) 60vw, 280px" alt="${esc(D.nom)}, ${esc(D.fonction)} d'Ubora" width="800" height="800" loading="lazy">
      <div class="dir-nom"><h2>${esc(D.nom)}</h2><p>${esc(D.fonction)}</p></div>
      <ul class="dir-tags">${D.domaines.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn btn-ghost btn-sm" href="/contact?sujet=${encodeURIComponent("CV du Directeur Gérant")}">Demander le CV complet</a>
    </div>
    <div class="dir-txt">
      <span class="eyebrow">Le Directeur Gérant</span>
      <p class="dir-accroche">${esc(D.accroche)}</p>
      <p>${esc(D.bio)}</p>
      <h3>Parcours</h3>
      <ol class="dir-parcours">${D.parcours.map(([p, o, f, x]) => `<li><span class="dir-date">${esc(p)}</span><div><b>${esc(f)}</b><span class="dir-org">${esc(o)}</span><span>${esc(x)}</span></div></li>`).join("")}</ol>
      <p class="dir-plus"><b>Formation</b> ${esc(D.formation)}</p>
      <p class="dir-plus"><b>Langues</b> ${esc(D.langues)}</p>
    </div>
  </article>`;
}

function pageRealisations(params) {
  const tout = DATA.realisations;
  const filtre = (params && params.get("pole")) || "";
  const liste = filtre ? tout.filter(r => r.pole === filtre) : tout;
  const presents = [...new Set(tout.map(r => r.pole))];
  return pageHead({ eyebrow: "Nos réalisations", title: `Ce que nous avons fait, et ce que cela a <span class="serif">changé</span>.`, crumbs: [["Nos réalisations"]],
    lead: "Ce que nous avons déjà construit, et bientôt les programmes menés sur le terrain avec nos partenaires : le contexte, ce que nous avons fait, les résultats." }) + `
  <section><div class="wrap">
    ${secHead("Déjà en place", "Ce que nous avons construit", "Des outils et des contenus en service, que chacun peut ouvrir et vérifier.")}
    <div class="grid-3 deja">
      <div class="fcard"><b class="deja-n">${OUTILS.filter(o => o.statut === "en-ligne").length}</b><h3>Applications en ligne</h3><ul class="deja-liste">${OUTILS.filter(o => o.statut === "en-ligne").map(o => { const h = o.fiche ? "/outils/" + o.id : o.url; return `<li><a href="${h}"${ext(h)}>${esc(o.nom)}</a></li>`; }).join("")}</ul></div>
      <div class="fcard"><b class="deja-n">140+</b><h3>Cours à l'Académie</h3><p>En 26 parcours et sept domaines, avec des certificats vérifiables. Un cours téléchargé se suit sans réseau.</p></div>
      <div class="fcard"><b class="deja-n">${pole("avec").boite.outils.length}</b><h3>Documents de la boîte à outils AVEC</h3><p>Tirés de nos déploiements : guide, études, formation des animateurs, carnets et règlements.</p></div>
    </div>
    ${secHead("Sur le terrain", "Programmes et missions")}
    ${presents.length > 1 ? `<nav class="chips filtres" aria-label="Filtrer par domaine"><a class="chip" href="/realisations"${filtre ? "" : ' aria-current="page"'}>Toutes</a>${presents.map(id => `<a class="chip" href="/realisations?pole=${id}"${filtre === id ? ' aria-current="page"' : ""}>${esc(poleReal(id).nom)}</a>`).join("")}</nav>` : ""}
    ${liste.length ? `<div class="real-grid">${liste.map(realCard).join("")}</div>`
      : `<div class="empty"><b>Nos réalisations seront présentées ici prochainement.</b><p>Vous préparez un programme avec des groupes d'épargne, des entrepreneurs ou des coopératives ? Parlons de ce que nous pouvons faire ensemble.</p><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent("Partenariat")}">Nous écrire</a></div>`}
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

/* Offres d'emploi et candidature spontanée (section « Carrières » de Notre équipe) */
function blocOffres(openId) {
  const t = todayISO();
  const ouvertes = [...DATA.offres].filter(o => o.cloture >= t).sort((a, b) => (b.publie || "").localeCompare(a.publie || ""));
  return `  <section class="band" id="carrieres"><div class="wrap">
    ${secHead("Carrières", "Offres d'emploi, de stage et de consultance")}
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

/* L'association UBORA : d'après ses statuts du 1er novembre 2025 */
function pageOng() {
  const sujet = "/contact?sujet=" + encodeURIComponent("UBORA, l'association");
  return pageHead({ eyebrow: "UBORA · association à vocation d'ONG", title: `L'association UBORA, au service des <span class="serif">communautés</span>.`, crumbs: [["À propos", "/a-propos"], ["L'association UBORA"]], photo: ["terrain", "Une communauté réunie en plein air"],
    lead: "L'association sans but lucratif de l'écosystème Ubora : des projets communautaires financés par des dons et des subventions, pour les femmes, les jeunes et les plus vulnérables.",
    extra: `<div class="btn-row"><a class="btn btn-accent" href="${LANGUE === "en" ? "https://uborardc.org/en/" : "https://uborardc.org/"}">Visiter le site de l'association : uborardc.org ${ICON.arrow}</a><a class="btn btn-glass" href="${sujet}">Financer un projet de l'association ${ICON.arrow}</a><a class="btn btn-glass" href="#lien" data-scroll="lien">L'association et l'entreprise sociale</a></div>` }) + `
  <section><div class="wrap two">
    <div><span class="eyebrow">Vision</span><p class="quote">${esc(ONG.vision)}</p></div>
    <div class="prose-sm"><p><b>Mission.</b> ${esc(ONG.mission)}</p><p class="muted">${esc(ONG.statut)} ${esc(ONG.creation)}</p>
      <div class="publics"><b>Valeurs</b>${ONG.valeurs.map(v => `<span>${esc(v)}</span>`).join("")}</div></div>
  </div></section>
  <section class="band"><div class="wrap">
    ${secHead("Secteurs d'intervention", `Ce que fait <span class="serif">l'association</span>`, "Études, formation, sensibilisation et mise en œuvre de projets, partout en RDC, seule ou en partenariat.")}
    <div class="grid-4">${ONG.secteurs.map(([id, t, x]) => { const p = id && pole(id); return `<div class="fcard"${p ? ` style="--c:${p.couleur}"` : ""}><h3>${esc(t)}</h3>${p ? `<a class="link" href="${p.chemin}">${esc(p.nom)} ${ICON.arrow}</a>` : ""}</div>`; }).join("")}</div>
    <div class="publics"><b>Pour qui</b>${ONG.beneficiaires.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>
  <section><div class="wrap">
    ${secHead("Gouvernance", `Des organes qui se <span class="serif">contrôlent</span>`, )}
    <div class="grid-4">${ONG.organes.map(([t, x]) => `<div class="fcard"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
    <ul class="checks cols engagements">${ONG.engagements.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <p class="suite muted">Président du conseil d'administration : ${esc(DIRIGEANT.nom)}.</p>
  </div></section>
  <section class="band" id="lien"><div class="wrap">
    ${secHead("L'écosystème Ubora", `Deux structures, une même mission : elles se <span class="serif">complètent</span>`)}
    <div class="grid-2">${ONG.lien.map(([t, x]) => `<div class="fcard"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
    <h3 class="sous-titre">Ensemble</h3>
    <ol class="relais-temps complements">${ONG.complementarite.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
  </div></section>
  <section class="tight-top"><div class="wrap"><div class="deep final">
    <span class="eyebrow">Agir avec l'association</span>
    <h2>Financer un projet, devenir membre, <span class="serif">s'engager</span>.</h2>
    <p>Dons, subventions, partenariats ou adhésion : écrivez-nous, une personne de l'association vous répond.</p>
    <div class="btn-row"><a class="btn btn-wa" href="${waLink("Bonjour, je souhaite agir avec l'association UBORA.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-glass" href="/approche#bailleurs">Confier une mission à l'entreprise sociale</a></div>
  </div></div></section>`;
}


function pageContact(params) {
  const sujet = params.get("sujet") || "";
  const besoins = ["Ubora AVEC (groupes d'épargne)", "Ubora PME (entrepreneuriat)", "Ubora Coop (coopératives)", "Ubora Fin (accès au financement)", "Ubora Market (accès au marché)", "Ubora Vert (environnement)", "Ubora Académie (formations)", "Boîte à outils", "Demande de devis", "Projet pilote", "Présentation d'Ubora", "Conseil et programmes", "Formation", "UBORA, l'association", "Partenariat", "Recrutement", "Autre"];
  const low = sujet.toLowerCase();
  const sel = !low ? "" : low.includes("boîte") || low.startsWith("les outils de") ? "Boîte à outils"
    : besoins.find(b => low.includes(b.split(" (")[0].toLowerCase()) || b.toLowerCase().includes(low)) || "Autre";
  return pageHead({ eyebrow: "Contact", title: `<span lang="sw">Karibu</span>. Parlons de votre <span class="serif">projet</span>.`, crumbs: [["Contact"]],
    lead: "Une demande de devis, une question, un programme à monter ? Où que vous soyez en RDC, nous vous répondons sous deux jours ouvrés." }) + `
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
        <label><span>Organisation <small>(facultatif)</small></span><input id="c-org" maxlength="160" autocomplete="organization"></label>
        <label><span>Téléphone <small>(ou e-mail)</small></span><input id="c-tel" type="tel" maxlength="30" autocomplete="tel" placeholder="+243"></label>
        <label><span>E-mail <small>(ou téléphone)</small></span><input id="c-mail" type="email" maxlength="160" autocomplete="email"></label>
        <label class="full">Objet<select id="c-besoin"><option value="" disabled${sel ? "" : " selected"}>Choisissez un objet</option>${besoins.map(b => `<option${b === sel ? " selected" : ""}>${esc(b)}</option>`).join("")}</select></label>
        <label class="full">Message<textarea id="c-msg" required maxlength="3000" placeholder="Présentez-vous en quelques lignes et dites-nous ce dont vous avez besoin.">${sujet && sujet !== sel ? esc(sujet) : ""}</textarea></label>
        <input class="hp" id="c-site" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="form-err full" id="c-err" role="alert"></p>
        <p class="form-note full">Ces informations servent uniquement à vous répondre et sont conservées ${CONSERVATION.messages}. <a href="/confidentialite">Confidentialité</a></p>
        <div class="full"><button class="btn btn-primary" type="submit">Envoyer ${ICON.arrow}</button></div>
      </form>
      <div id="sent" tabindex="-1" hidden></div>
    </div>
  </div></section>`;
}

/* Durées de conservation : les mêmes que celles appliquées par la base (fonction site_purger). */
const CONSERVATION = { messages: "3 ans après notre dernier échange", abonnes: "jusqu'à votre désinscription", questions: "12 mois", visites: "25 mois", candidatures: "2 ans après la fin du recrutement" };
const VERSION_LEGALE = { numero: "1.0", date: "14 novembre 2026" };
const piedLegal = () => `<p class="legal-version">Version ${VERSION_LEGALE.numero}, en vigueur depuis le ${VERSION_LEGALE.date}. En cas de modification importante, la nouvelle version est datée ici et annoncée sur le site.</p>`;
const tableLegale = (entetes, lignes) => `<div class="legal-table"><table><thead><tr>${entetes.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map((c, i) => i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const liensLegaux = actuel => `<nav class="legal-nav" aria-label="Informations légales">${[["/mentions", "Mentions légales"], ["/confidentialite", "Confidentialité et cookies"], ["/conditions", "Conditions d'utilisation"]].map(([h, t]) => h === actuel ? `<span aria-current="page">${t}</span>` : `<a href="${h}">${t}</a>`).join("")}</nav>`;

function pageMentions() {
  const L = CONFIG.legal || {};
  const lignes = [["Dénomination", "Ubora, entreprise sociale"], ["Siège", CONFIG.adresse], ["RCCM", L.rccm], ["Identification nationale", L.idnat], ["Numéro d'impôt", L.impot], ["Téléphone", CONFIG.telephone], ["E-mail", CONFIG.email], ["Directeur de la publication", L.directeur]].filter(([, v]) => v);
  return pageHead({ eyebrow: "Informations légales", title: "Mentions légales", crumbs: [["Mentions légales"]] }) + `
  <section><div class="wrap narrow legal-page">
    ${liensLegaux("/mentions")}
    <h2>Éditeur du site</h2><dl class="legal">${lignes.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
    <p>L'association UBORA, présentée sur <a href="/ong">sa page</a>, est une personne morale distincte de l'entreprise sociale.</p>
    <h2>Hébergement</h2><p>Le site est hébergé par Cloudflare, Inc. (États-Unis), qui gère aussi le nom de domaine et l'acheminement des e-mails. Les données des formulaires sont conservées par Supabase, Inc., sur des serveurs situés à Francfort, en Allemagne.</p>
    <h2>Propriété intellectuelle</h2><p>Le logo, les noms Ubora AVEC, Ubora PME, Ubora Coop, Ubora Fin, Ubora Market, Ubora Vert, Ubora Académie, Ubora Hub et AKIBA, ainsi que les textes, les films et les documents de ce site, appartiennent à Ubora. Toute reproduction sans autorisation écrite est interdite.</p>
    <p>Les polices Ubuntu (Ubuntu Font Licence 1.0) et IBM Plex Mono (SIL Open Font License 1.1) sont servies par le site lui-même, selon leur licence.</p>
    <h2>Photos</h2><p>Les photos d'ambiance proviennent de la banque d'images Unsplash et sont utilisées selon sa licence. Elles illustrent nos domaines d'intervention et ne représentent pas des clients ni des projets d'Ubora. Les photos des pages « Notre équipe » et « Nos réalisations » sont les nôtres.</p>
    <h2>Signaler un contenu</h2><p>Une erreur, un contenu qui vous concerne ou qui vous semble illicite ? Écrivez à <a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a> : nous répondons sous deux jours ouvrés.</p>
    ${piedLegal()}
  </div></section>`;
}

function pageConfidentialite() {
  const C = CONSERVATION;
  return pageHead({ eyebrow: "Informations légales", title: "Confidentialité et cookies", lead: "Ce que nous recueillons, pourquoi, combien de temps, et comment exercer vos droits.", crumbs: [["Confidentialité"]] }) + `
  <section><div class="wrap narrow legal-page">
    ${liensLegaux("/confidentialite")}
    <h2>En bref</h2>
    <ul class="checks"><li>Aucun cookie, aucune publicité, aucun traceur, aucun profilage.</li><li>Nous ne recueillons que ce que vous nous écrivez, et des visites comptées sans vous identifier.</li><li>Vos données ne sont ni vendues ni cédées, et ne servent pas à entraîner une intelligence artificielle.</li><li>Vous pouvez à tout moment les consulter, les corriger ou les faire supprimer.</li></ul>
    <h2>Responsable du traitement</h2><p>Ubora, entreprise sociale (RCCM ${esc((CONFIG.legal || {}).rccm || "")}), ${esc(CONFIG.adresse)}. Contact : <a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a>. Nous appliquons les règles de protection des données personnelles en vigueur en République démocratique du Congo, notamment le Code du numérique, et les mêmes garanties à tous les visiteurs, où qu'ils se trouvent.</p>
    <h2>Ce que nous recueillons</h2>
    ${tableLegale(["Pour quoi", "Données", "Raison", "Durée"], [
      ["Vous répondre (formulaire de contact)", "Nom, organisation (facultatif), téléphone ou e-mail, objet, message", "Votre demande", C.messages],
      ["La lettre d'information", "Adresse e-mail", "Votre accord, retirable à tout moment", C.abonnes],
      ["Améliorer l'assistant du site", "Texte de la question, page, réponse trouvée ou non ; aucune donnée d'identification", "Notre intérêt à mieux répondre", C.questions],
      ["Compter les visites", "Page vue, site d'où l'on vient, pays, type d'appareil ; ni adresse IP, ni cookie, ni identifiant", "Notre intérêt à savoir quelles pages sont lues", C.visites],
      ["Recruter (candidature par e-mail)", "Ce que contient votre candidature", "Votre candidature", C.candidatures],
      ["L'espace équipe", "E-mail et session des membres de l'équipe habilités", "La gestion du site", "Tant que la personne est habilitée"],
      ["Protéger le site contre les abus", "Une empreinte chiffrée de l'adresse IP, jamais l'adresse elle-même, pour limiter les envois et les tentatives de connexion", "Notre intérêt à protéger le service", "15 minutes au plus"]
    ])}
    <p>Les durées passées, les données sont effacées automatiquement par la base. Ne nous envoyez pas de données sensibles (santé, opinions, pièces d'identité) : le formulaire n'en a pas besoin.</p>
    <h2>L'assistant du site</h2><p>L'assistant cherche ses réponses dans le contenu du site, directement dans votre navigateur : aucune question n'est envoyée à un service d'intelligence artificielle. Ses réponses peuvent être incomplètes ; pour une décision, écrivez-nous.</p>
    <h2>Qui y a accès</h2>
    ${tableLegale(["Destinataire", "Rôle", "Lieu"], [
      ["L'équipe d'Ubora", "Seules les personnes habilitées lisent les messages, après connexion personnelle", "RDC"],
      ["Cloudflare, Inc.", "Hébergement du site et acheminement des e-mails ; voit techniquement l'adresse IP pour livrer la page, sans qu'Ubora l'enregistre", "Réseau mondial, société aux États-Unis"],
      ["Supabase, Inc.", "Base de données des formulaires et des visites comptées", "Francfort, Allemagne"]
    ])}
    <p>Ces prestataires agissent sur nos instructions, dans le cadre de leurs engagements contractuels de protection des données, y compris pour les transferts hors de la RDC. Si vous cliquez vers WhatsApp, YouTube ou une autre application, ce sont leurs propres règles qui s'appliquent ; aucune de leurs vidéos ni aucun de leurs scripts n'est intégré à nos pages.</p>
    <h2>Sécurité</h2><p>Connexion chiffrée imposée, en-têtes de sécurité, aucune ressource chargée depuis un autre site, base de données verrouillée (un visiteur peut déposer un message mais ne peut en lire aucun), limites d'envoi contre les abus, accès de l'équipe nominatif. En cas d'incident touchant vos données, nous le contenons, nous en évaluons la portée et nous informons sans tarder les personnes concernées et, lorsque la loi l'exige, l'autorité compétente.</p>
    <h2>Vos droits</h2><p>Vous pouvez demander à consulter vos données, à les corriger, à les supprimer, à en recevoir une copie, ou vous opposer à leur usage. Pour la lettre d'information, il suffit de répondre « désinscription » à l'un de nos e-mails ou de nous écrire. Écrivez à <a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a> : nous répondons sous trente jours au plus, après une vérification d'identité proportionnée. Vous pouvez aussi saisir l'autorité compétente en RDC.</p>
    <h2>Mineurs</h2><p>Le site s'adresse aux adultes et aux organisations. Nous ne recueillons pas sciemment de données d'enfants de moins de 18 ans ; si cela arrive, écrivez-nous et nous les supprimons.</p>
    <h2 id="cookies">Cookies et stockage dans votre navigateur</h2><p>Le site ne dépose aucun cookie et ne charge aucun outil de mesure ou de publicité d'un tiers : il n'y a donc rien à accepter, et pas de bandeau. Votre navigateur garde seulement ceci, sans rien transmettre à personne :</p>
    ${tableLegale(["Élément", "À quoi il sert", "Durée"], [
      ["Choix clair ou sombre", "Garder l'affichage que vous avez choisi", "Jusqu'à ce que vous l'effaciez"],
      ["Date de la dernière visite", "Compter une visite par jour, sans identifiant", "Remplacée chaque jour"],
      ["Brouillon du formulaire", "Ne pas perdre votre message si la connexion coupe", "Effacé à l'envoi ou à la fermeture de l'onglet"],
      ["Session de l'espace équipe", "Garder connecté un membre de l'équipe", "Jusqu'à la déconnexion"]
    ])}
    <p>Si un outil facultatif devait un jour être ajouté, il ne s'activerait qu'après votre accord, et refuser serait aussi simple qu'accepter.</p>
    <div class="prefs panel" id="prefs">
      <b>Vos réglages dans ce navigateur</b>
      <p id="prefEtat" role="status">Vos visites sont comptées, sans vous identifier.</p>
      <div class="btn-row"><button class="btn btn-ghost btn-sm" type="button" id="prefMesure">Ne plus compter mes visites</button><button class="btn btn-ghost btn-sm" type="button" id="prefEffacer">Effacer ce que le site garde ici</button></div>
    </div>
    ${piedLegal()}
  </div></section>`;
}

function pageConditions() {
  return pageHead({ eyebrow: "Informations légales", title: "Conditions d'utilisation", lead: "Les règles d'usage du site uborardc.com et de ses pages de domaines.", crumbs: [["Conditions d'utilisation"]] }) + `
  <section><div class="wrap narrow legal-page">
    ${liensLegaux("/conditions")}
    <h2>Objet</h2><p>Ces conditions s'appliquent au site uborardc.com et à ses pages de domaines (avec, pme, coop, fin, market, vert et ong.uborardc.com). Le site est gratuit et accessible sans compte. L'utiliser vaut acceptation de ces conditions.</p>
    <h2>Ce que propose le site</h2><p>De l'information sur Ubora et ses domaines, un formulaire de contact, une lettre d'information facultative et un assistant qui répond à partir du contenu du site.</p>
    <p>Le site ne vend rien, ne prend aucun paiement et ne collecte aucun don en ligne. Nos prestations font l'objet d'un devis ou d'un contrat écrit, qui en fixe le prix, les délais, l'annulation et le remboursement éventuel. Ubora Fin ne prête pas et ne recueille pas d'épargne : elle mobilise le capital d'institutions financières, d'investisseurs et de bailleurs.</p>
    <h2>Nos applications</h2><p>AKIBA, Akiba Suivi, Ubora Hub, ASBL Manager, Ubora Académie et le générateur de business plan ont leurs propres conditions, affichées dans chaque application. Lorsqu'une application est payante, son prix, sa durée et ses conditions de renouvellement et de résiliation sont indiqués avant tout engagement.</p>
    <h2>Usage acceptable</h2><p>Il est interdit d'utiliser le site pour :</p>
    <ul class="checks"><li>envoyer des messages en masse, publicitaires ou automatisés ;</li><li>transmettre un contenu illicite, injurieux ou qui porte atteinte aux droits d'autrui ;</li><li>tenter d'accéder à l'espace équipe ou à la base sans y être habilité, ou d'en perturber le fonctionnement ;</li><li>copier le contenu en masse ou le réutiliser sans autorisation.</li></ul>
    <p>Les envois sont limités pour protéger le service ; au-delà, un message vous invite à patienter.</p>
    <h2>Informations publiées</h2><p>Nous veillons à l'exactitude des informations, qui restent générales. Elles ne remplacent pas un conseil financier, juridique ou fiscal adapté à votre situation. Les exemples marqués comme tels sont des démonstrations.</p>
    <h2>Disponibilité et responsabilité</h2><p>Nous faisons de notre mieux pour que le site reste disponible et sûr, sans pouvoir garantir l'absence de toute interruption. Ubora n'est pas responsable du contenu des sites extérieurs vers lesquels le site renvoie.</p>
    <h2>Droit applicable</h2><p>Ces conditions relèvent du droit de la République démocratique du Congo. En cas de désaccord, nous cherchons d'abord une solution amiable ; à défaut, les juridictions compétentes du ressort du siège d'Ubora sont saisies.</p>
    ${piedLegal()}
  </div></section>`;
}

function notFound() {
  return pageHead({ eyebrow: "Page introuvable", title: "Cette page n'existe pas, ou plus.", lead: "Le lien est peut-être ancien. Vous pouvez repartir de l'accueil ou nous écrire.",
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/">Retour à l'accueil</a><a class="btn btn-glass" href="/contact">Nous contacter</a></div>` });
}

/* ==========================================================================
   ROUTAGE
   ========================================================================== */
const SOUS_DOMAINES = { ong: "ong", avec: "avec", pme: "pme", coop: "cooperatives", fin: "financement", market: "marche", vert: "vert", admin: "admin" };
/* bp. et hub. mènent directement à l'outil ; akiba. est servi à part (GitHub Pages). */
const EXTERNES = { bp: "/generateur/" };
const ANCIENNES = {
  "solutions/ubora-avec": "/avec", "solutions/akiba": "/avec", "solutions/ubora-pme": "/pme", "solutions/ubora-coop": "/cooperatives",
  "solutions/ubora-fin": "/financement", "solutions/ubora-market": "/marche", "solutions/ubora-hub": "/outils/hub", "solutions/uborahub": "/outils/hub",
  "services": "/approche#bailleurs", "diagnostic": "/contact", "rediger": "/admin", "hub": "/outils/hub",
  "soutenir": "/a-propos#soutenir", "formations": "/academie#sessions",
  "poles": "/solutions", "outils": "/solutions", "conseil": "/approche#bailleurs"
};
const DESCR = {
  "": "Entreprise à caractère social, Ubora réinvestit ses excédents pour accompagner les groupes d'épargne (AVEC), les entrepreneurs et les coopératives, partout en RDC.",
  "a-propos": "Qui est Ubora : une entreprise à caractère social qui vit de ses prestations et réinvestit ses excédents sur le terrain, et son association, UBORA, distincte, pour les projets financés par des dons. Mission, modèle économique, valeurs.",
  approche: "L'approche d'Ubora : une méthode en six temps, et pour les bailleurs et les ONG, des projets pilotes, la mise en œuvre de programmes et le relais après le projet, partout en RDC.",
  solutions: "Les solutions d'Ubora : sept domaines (AVEC, PME, coopératives, financement, marché, environnement, Académie) et leurs applications, AKIBA, Ubora Hub, ASBL Manager et les autres.",
  outils: "AKIBA et Akiba Suivi, le générateur de business plan, Ubora Hub, Ubora Académie, ASBL Manager et les outils en préparation : des outils numériques conçus pour la RDC.",
  conseil: "Projets pilotes et mise en œuvre de projets de développement économique pour les bailleurs, les ONG et les institutions en RDC : indicateurs fixés ensemble, résultats suivis en direct.",
  formations: "Formations d'Ubora en RDC : Académie en ligne (plus de 140 cours avec certificat), prise en main des outils, AVEC, entrepreneuriat et gestion coopérative.",
  actualites: "Les actualités d'Ubora : programmes, déploiements, formations et nouvelles du terrain en RDC.",
  carrieres: "Offres d'emploi, de stage et de consultance chez Ubora, entreprise à caractère social qui intervient dans toute la RDC.",
  contact: "Contacter Ubora, entreprise à caractère social, par téléphone, WhatsApp ou e-mail. Une personne de l'équipe vous répond sous deux jours ouvrés.",
  poles: "Les sept domaines d'Ubora, entreprise à caractère social : groupes d'épargne, entrepreneurs, coopératives, accès au financement, accès au marché, environnement et formation, partout en RDC.",
  mentions: "Mentions légales du site d'Ubora, entreprise sociale : éditeur, hébergement, propriété intellectuelle.",
  confidentialite: "Politique de confidentialité d'Ubora : données recueillies, durées de conservation, destinataires, sécurité, vos droits. Aucun cookie ni traceur.",
  conditions: "Conditions d'utilisation du site d'Ubora, entreprise sociale : objet, usage acceptable, applications, responsabilité, droit applicable.",
  equipe: "L'équipe d'Ubora, entreprise à caractère social : direction, consultants, formateurs, agents de terrain et développeurs, partout en RDC. Offres d'emploi, de stage et de consultance.",
  ong: "UBORA, association sans but lucratif à vocation d'ONG de développement en RDC : épargne communautaire, entrepreneuriat inclusif, agriculture durable, formation et environnement, au service des femmes, des jeunes et des plus vulnérables.",
  soutenir: "Ubora n'est pas une entreprise classique : son objectif est social et ses excédents sont réinvestis. Confier une mission, apporter du capital, devenir partenaire : les façons de soutenir nos actions en RDC.",
  realisations: "Les réalisations d'Ubora en RDC : groupes d'épargne, entrepreneurs, coopératives, accès au financement et au marché. Contexte, actions et résultats."
};
/* Titre et description des domaines pour les moteurs de recherche */
const SEO_POLES = {
  avec: ["Ubora AVEC : accompagner les groupes d'épargne (AVEC) en RDC", "Le domaine d'Ubora, entreprise à caractère social, consacré aux groupes d'épargne : création, formation et suivi des AVEC, et leur cahier dans le téléphone avec l'application AKIBA."],
  pme: ["Ubora PME : de l'idée à l'entreprise, pour les entrepreneurs en RDC", "Le domaine entrepreneuriat d'Ubora, entreprise à caractère social : idéation, incubation, lancement de l'entreprise et mise à niveau des PME, avec Ubora Hub et le générateur de business plan."],
  cooperatives: ["Ubora Coop : créer et gérer une coopérative en RDC", "Le domaine coopératives d'Ubora, entreprise à caractère social : statuts OHADA, gestion, collecte, stockage, transformation et vente groupée, jusqu'au paiement des producteurs."],
  financement: ["Ubora Fin : mobiliser le capital pour les petits emprunteurs en RDC", "Ubora Fin ne prête pas : ce domaine d'Ubora, entreprise à caractère social, prépare les groupes, les coopératives et les PME, les présente aux institutions financières et mobilise le capital à leur profit."],
  academie: ["Ubora Académie : formations en ligne certifiantes en RDC", "L'école d'Ubora, entreprise à caractère social : plus de 140 cours en ligne, utilisables sans réseau, sur les AVEC, les AGR, l'entrepreneuriat, l'agriculture et les coopératives, avec certificats vérifiables."],
  vert: ["Ubora Vert : protéger l'environnement et en vivre, en RDC", "Le domaine environnement d'Ubora, entreprise à caractère social : reboisement, recyclage, agroécologie et énergie propre, pour que protéger l'environnement fasse vivre ceux qui le portent."],
  marche: ["Ubora Market : trouver des acheteurs pour les producteurs en RDC", "Le domaine marché d'Ubora, entreprise à caractère social : relier les coopératives, les PME et les entrepreneurs accompagnés à des acheteurs, et suivre chaque vente jusqu'au paiement."]
};
/* Titres complets pour la balise <title> ; TITRES reste court (fil d'Ariane, menus) */
const SEO_TITRES = { approche: "Notre approche : la méthode Ubora et nos services aux bailleurs et aux ONG", solutions: "Nos solutions : sept domaines et leurs applications · Ubora", equipe: "Notre équipe et nos carrières · Ubora, entreprise sociale", ong: "UBORA, association à vocation d'ONG de développement en RDC", soutenir: "Soutenir Ubora : une entreprise à objectif social en RDC", "a-propos": "À propos d'Ubora, entreprise sociale en RDC", approche: "Notre approche : la méthode Ubora en six temps", outils: "Outils numériques pour les AVEC, les PME et les organisations · Ubora", conseil: "Projets pilotes, mise en œuvre et conseil en RDC · Ubora", formations: "Formations AVEC, entrepreneuriat et coopératives · Ubora", actualites: "Actualités d'Ubora : nouvelles du terrain en RDC", realisations: "Nos réalisations en RDC · Ubora, entreprise sociale", equipe: "Notre équipe · Ubora, entreprise sociale en RDC", carrieres: "Carrières : rejoindre Ubora, entreprise sociale en RDC", contact: "Contacter Ubora, entreprise sociale en RDC", mentions: "Mentions légales · Ubora, entreprise sociale", poles: "Nos domaines : AVEC, PME, coopératives, financement, marché, environnement, formation · Ubora", confidentialite: "Confidentialité et cookies · Ubora, entreprise sociale", conditions: "Conditions d'utilisation · Ubora, entreprise sociale" };
const ROBOTS = "index, follow, max-image-preview:large";
const TITRES = { approche: "Notre approche", solutions: "Nos solutions", equipe: "Notre équipe", ong: "L'association UBORA", soutenir: "Soutenir nos actions", "": "Ubora : entreprise sociale en RDC (AVEC, PME, coopératives)", "a-propos": "À propos", approche: "Notre approche", outils: "Nos solutions", conseil: "Projets et conseil", formations: "Formations", actualites: "Actualités", carrieres: "Carrières", contact: "Contact", mentions: "Mentions légales", poles: "Nos domaines", confidentialite: "Confidentialité", conditions: "Conditions d'utilisation", admin: "Espace équipe", equipe: "Notre équipe", realisations: "Nos réalisations" };

/* Construit une page à partir d'une adresse. */
function resolve(pathname, search, host) {
  const en = /^\/en(\/|$)/.test(pathname || "");
  LANGUE = en ? "en" : "fr";
  const r = resolveFR(en ? (pathname.slice(3) || "/") : pathname, search, host);
  if (!en) return r;
  if (r.redirect) return { redirect: /^https?:/.test(r.redirect) ? r.redirect : "/en" + (r.redirect === "/" ? "" : r.redirect) };
  let html = traduire(r.html);
  /* pages légales : le texte français fait foi */
  if (["mentions", "confidentialite", "conditions"].includes(r.base)) html = html.replace('<p class="legal-version">', '<p class="legal-version">This English version is provided for information. The French version is the authoritative text.</p><p class="legal-version">');
  return { ...r, html, title: traduire(r.title), court: traduire(r.court), desc: traduire(r.desc), canon: r.canon === "/" ? "/en" : "/en" + r.canon };
}
/* adresse de la même page dans l'autre langue */
const autreLangue = p => /^\/en(\/|$)/.test(p) ? (p.slice(3) || "/") : p === "/" ? "/en" : "/en" + p;
function resolveFR(pathname, search, host) {
  const path = decodeURIComponent(pathname || "/").replace(/^\/+|\/+$/g, "");
  const params = new URLSearchParams(search || "");
  const parts = (host || "").split(".");
  const sd = parts.length > 2 ? parts[0] : "";
  let [base, sub] = path.split("/");
  base = base || "";
  if (!base && SOUS_DOMAINES[sd]) base = SOUS_DOMAINES[sd];
  const alias = ANCIENNES[path];
  if (alias) return { redirect: alias };
  /* les offres d'emploi sont dans « Nous rejoindre », sur À propos (18 novembre 2026) */
  if (base === "carrieres") return { redirect: sub ? "/equipe#offre-" + encodeURIComponent(sub) : "/equipe#carrieres" };

  let html, title, desc, canon = "/" + path;
  const P = pole(base);
  if (sub && !["actualites", "carrieres", "outils"].includes(base)) { html = notFound(); title = "Page introuvable"; }
  else if (P) { html = pagePole(base); [title, desc] = SEO_POLES[P.id] || [P.nom, P.lead]; canon = P.chemin; }
  else switch (base) {
    case "": html = pageHome(); break;
    case "a-propos": html = pageAbout(); break;
    case "outils": {
      const o = sub && outil(sub);
      if (o && o.fiche) { html = pageOutil(o); [title, desc] = o.fiche.seo; }
      else if (sub) { html = notFound(); title = "Page introuvable"; }
      else html = pageOutils();
      break;
    }
    case "actualites": {
      if (sub) { const n = allNews().find(x => x.slug === sub); html = pageArticle(sub); if (n) { title = n.titre; desc = n.extrait; } else title = "Page introuvable"; }
      else html = pageNews();
      break;
    }
    case "realisations": html = pageRealisations(params); break;
    case "contact": html = pageContact(params); break;
    case "ong": html = pageOng(); break;
    case "solutions": html = pageSolutions(); break;
    case "approche": html = pageApproche(); break;
    case "equipe": html = pageEquipe(); break;
    case "mentions": html = pageMentions(); break;
    case "confidentialite": html = pageConfidentialite(); break;
    case "conditions": html = pageConditions(); break;
    /* adresse propre à l'espace équipe : sans elle, admin.uborardc.com garderait le contenu de l'accueil déjà dans la page */
    case "admin": html = typeof pageAdmin === "function" ? pageAdmin() : notFound(); canon = "/admin"; break;
    default: html = notFound(); title = "Page introuvable";
  }
  const court = title || TITRES[base] || "Ubora";
  title = title || SEO_TITRES[base] || TITRES[base] || "Ubora";
  desc = desc || DESCR[base] || DESCR[""];
  const found = !html.includes("Page introuvable");
  /* une rubrique encore vide n'est pas proposée aux moteurs de recherche */
  const vide = (base === "actualites" && !sub && !allNews().length) || false;
  const robots = base === "admin" || !found ? "noindex" : vide ? "noindex, follow" : ROBOTS;
  return { html, title: base === "" ? TITRES[""] : /Ubora/.test(title) ? title : title + " · Ubora", court, desc, canon: canon === "/" ? "/" : canon, base, sub, found, robots };
}

/* ==========================================================================
   NAVIGATEUR
   ========================================================================== */
function boot() {
  /* l'espace équipe charge son code à la demande (les pages publiques ne le téléchargent pas) */
  if (typeof pageAdmin !== "function" && (/^admin\./.test(location.hostname) || location.pathname.replace(/\/+$/, "") === "/admin")) {
    const v = ((document.querySelector('script[src*="/app.js"]') || {}).src || "").split("v=")[1] || "";
    const s = document.createElement("script"); s.src = "/admin.js" + (v ? "?v=" + v : ""); s.onload = boot; s.onerror = boot;
    document.head.appendChild(s); return;
  }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  window.$ = $; window.$$ = $$;
  LANGUE = /^\/en(\/|$)/.test(location.pathname) ? "en" : "fr";

  function toast(msg) { const t = $("#toast"); t.textContent = T(msg); t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 3000); }
  window.toast = toast;

  function typo(root) {
    if (!root || LANGUE === "en") return;
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

  const fermerDD = () => $$(".has-dd").forEach(x => { x.classList.remove("open"); const b = x.querySelector(".dd-btn"); if (b) b.setAttribute("aria-expanded", "false"); });
  let premier = true, baseConsultee = false;

  /* Compteur de visites, lu dans l'espace équipe : la page vue et le site d'où l'on vient.
     Ni cookie ni identifiant ; le navigateur retient seulement la date de la dernière visite. */
  const memoire = { lire: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, ecrire: (k, v) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  let derniereVue = null, entree = true;
  function compter(r) {
    if (!/(^|\.)uborardc\.com$/.test(location.hostname) || sd === "admin" || r.base === "admin" || !r.found || navigator.webdriver) return;
    /* l'équipe peut exclure ses propres visites : uborardc.com/?equipe=1 (et ?equipe=0 pour les compter à nouveau) */
    const equipe = new URLSearchParams(location.search).get("equipe");
    if (equipe === "1") memoire.ecrire("ubora-equipe", "1"); else if (equipe === "0") memoire.ecrire("ubora-equipe", null);
    if (memoire.lire("ubora-equipe") || memoire.lire("ubora-sans-mesure") || navigator.globalPrivacyControl === true || r.canon === derniereVue) return;
    derniereVue = r.canon;
    const jour = todayISO(), nouveau = memoire.lire("ubora-vu") !== jour;
    if (nouveau) memoire.ecrire("ubora-vu", jour);
    const corps = JSON.stringify({ c: r.canon, r: entree ? document.referrer : "", n: nouveau });
    entree = false;
    try { fetch("/_v", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: corps }).catch(() => {}); } catch (e) {}
  }

  function route(opts) {
    const keep = !!(opts && opts.keep === true);
    if (location.hash.startsWith("#/")) history.replaceState({}, "", location.hash.slice(1));
    const r = resolve(location.pathname, location.search, location.hostname);
    if (r.redirect && /^https?:/.test(r.redirect)) { location.replace(r.redirect); return; }
    if (r.redirect) { history.replaceState({}, "", r.redirect); return route(); }
    /* l'espace équipe a sa propre adresse */
    if (r.base === "admin" && sd !== "admin" && /(^|\.)uborardc\.com$/.test(location.hostname)) { location.replace("https://admin.uborardc.com/"); return; }
    /* article publié depuis le dernier pré-rendu : on attend la base avant de conclure « introuvable » */
    if (!r.found && r.base === "actualites" && r.sub && !baseConsultee) { premier = false; app.innerHTML = T('<div class="wrap"><div class="empty" style="margin-block:80px">Chargement de l\'article…</div></div>'); return; }
    stopNet(); stopDiapo(); stopGlobe();
    compter(r);
    const garder = premier && !keep && app.dataset.pre === CONFIG.site + r.canon && !location.search && !["formations", "carrieres"].includes(r.base);
    premier = false; delete app.dataset.pre;
    if (!garder) app.innerHTML = `<div class="fade">${r.html}</div>`;
    document.title = r.title;
    setMeta('meta[name="description"]', "content", r.desc);
    setMeta('meta[property="og:description"]', "content", r.desc);
    setMeta('meta[property="og:title"]', "content", r.title);
    setMeta('link[rel="canonical"]', "href", CONFIG.site + r.canon);
    setMeta('meta[property="og:url"]', "content", CONFIG.site + r.canon);
    setMeta('meta[name="robots"]', "content", r.robots);
    const lg = $("#langBtn"); if (lg) lg.href = autreLangue(location.pathname) + location.hash;
    $$("#menu [data-r]").forEach(a => {
      const on = a.dataset.r === r.base || (a.dataset.r === "solutions" && (!!pole(r.base) || r.base === "outils")) || (a.dataset.r === "a-propos" && ["ong", "actualites"].includes(r.base));
      a.classList.toggle("current", on);
      if (a.tagName === "A") on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    if (!keep) { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); fermerDD(); }
    if (r.base === "") { startNet(); startDiapo(); startGlobe(); bindDemander(); }
    if (r.base === "contact") bindContact();
    if (r.base === "confidentialite") bindPrefs();
    if (r.base === "admin" && typeof bindAdmin === "function") bindAdmin();
    $$("[data-scroll]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }); }));
    const anchor = location.hash.slice(1), ancre = anchor && !anchor.startsWith("/");
    /* la page va remonter en haut : les cartes se mesurent depuis le haut de la page, pas depuis l'ancienne position */
    reveal(); mouvement(keep || garder || ancre ? 0 : scrollY); relief(keep || garder || ancre ? 0 : scrollY); compteurs(); if (!garder) typo(app);
    if (keep) return;
    if (route.deja) app.focus({ preventScroll: true });
    route.deja = true;
    if (ancre) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }));
    else if (!garder) window.scrollTo(0, 0);
  }
  window.route = route;

  /* réglages de confidentialité de ce navigateur */
  function bindPrefs() {
    const etat = $("#prefEtat"), b = $("#prefMesure"); if (!etat || !b) return;
    const maj = () => {
      const refus = !!memoire.lire("ubora-sans-mesure"), gpc = navigator.globalPrivacyControl === true;
      etat.textContent = T(gpc ? "Votre navigateur demande de ne pas être suivi : vos visites ne sont pas comptées." : refus ? "Vos visites ne sont plus comptées dans ce navigateur." : "Vos visites sont comptées, sans vous identifier.");
      b.textContent = T(refus ? "Compter à nouveau mes visites" : "Ne plus compter mes visites"); b.hidden = gpc;
    };
    b.addEventListener("click", () => { memoire.ecrire("ubora-sans-mesure", memoire.lire("ubora-sans-mesure") ? null : "1"); maj(); });
    $("#prefEffacer").addEventListener("click", () => {
      const refus = memoire.lire("ubora-sans-mesure");
      try { ["ubora_theme_2026", "ubora-vu", "ubora-equipe"].forEach(k => localStorage.removeItem(k)); sessionStorage.removeItem("ubora-brouillon"); } catch (e) {}
      if (refus) memoire.ecrire("ubora-sans-mesure", "1");
      toast("C'est fait : le site ne garde plus rien dans ce navigateur" + (refus ? ", sauf votre refus d'être compté." : "."));
    });
    maj();
  }

  function bindContact() {
    const f = $("#contactForm"); if (!f) return;
    const debut = Date.now();
    const CHAMPS = ["c-nom", "c-org", "c-tel", "c-mail", "c-msg"];
    const brouillon = { lire() { try { return JSON.parse(sessionStorage.getItem("ubora-brouillon") || "null"); } catch (e) { return null; } }, ecrire(o) { try { o ? sessionStorage.setItem("ubora-brouillon", JSON.stringify(o)) : sessionStorage.removeItem("ubora-brouillon"); } catch (e) {} } };
    const garde = brouillon.lire();
    if (garde) CHAMPS.forEach(id => { const c = $("#" + id); if (c && !c.value && garde[id]) c.value = garde[id]; });
    f.addEventListener("input", () => brouillon.ecrire(Object.fromEntries(CHAMPS.map(id => [id, $("#" + id).value]))));
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const v = id => $("#" + id).value.trim();
      const err = $("#c-err");
      if (v("c-site")) return;
      const trop = 2500 - (Date.now() - debut); if (trop > 0) await new Promise(r => setTimeout(r, trop));
      $$("#contactForm [aria-invalid]").forEach(x => x.removeAttribute("aria-invalid"));
      const signaler = (msg, id) => { err.textContent = T(msg); const c = $("#" + id); if (c) { c.setAttribute("aria-invalid", "true"); c.focus(); } };
      if (!v("c-nom") || !v("c-msg")) { signaler("Merci d'indiquer votre nom et votre message.", v("c-nom") ? "c-msg" : "c-nom"); return; }
      if (!v("c-tel") && !v("c-mail")) { signaler("Laissez-nous un téléphone ou une adresse e-mail pour que nous puissions vous répondre.", "c-tel"); return; }
      if (v("c-mail") && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("c-mail"))) { signaler("L'adresse e-mail semble incomplète (exemple : nom@domaine.com).", "c-mail"); return; }
      if (!v("c-besoin")) { signaler("Choisissez l'objet de votre message.", "c-besoin"); return; }
      err.textContent = "";
      const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = T("Envoi en cours…");
      const res = await UboraDB.sendMessage({ nom: v("c-nom"), organisation: v("c-org") || null, telephone: v("c-tel") || null, email: v("c-mail") || null, besoin: v("c-besoin"), message: v("c-msg") });
      const texte = `Bonjour Ubora,\n\n${v("c-msg")}\n\n${v("c-nom")}${v("c-org") ? " (" + v("c-org") + ")" : ""}\nObjet : ${v("c-besoin")}${v("c-tel") ? "\nTél. : " + v("c-tel") : ""}${v("c-mail") ? "\nE-mail : " + v("c-mail") : ""}`;
      if (res.ok) brouillon.ecrire(null);
      f.hidden = true;
      const s = $("#sent"); s.hidden = false;
      s.innerHTML = T(res.ok
        ? `<div class="sent"><b>Merci, votre message est bien arrivé.</b><p>Nous vous répondons sous deux jours ouvrés. Si c'est urgent, écrivez-nous aussi sur WhatsApp.</p><div class="btn-row"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(texte)}">Envoyer aussi par WhatsApp</a></div></div>`
        : `<div class="sent"><b>Votre message n'a pas pu être enregistré.</b><p>Envoyez-le directement par WhatsApp ou par e-mail : il est déjà rédigé.</p><div class="btn-row"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(texte)}">WhatsApp</a><a class="btn btn-ghost" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(v("c-besoin"))}&body=${encodeURIComponent(texte)}">E-mail</a></div></div>`);
      typo(s); s.focus();
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

  /* Jeu des cartes : dans une grille, les cartes entrent tour à tour par la gauche et par la droite
     (par le bas pour celles du milieu), et leur pictogramme se dessine. Les photos arrivent floues,
     décalées et agrandies, puis se mettent en place. Seul ce qui est encore sous l'écran est animé :
     ce que le visiteur voit déjà ne bouge pas. */
  const GRILLES = ".poles, .grid-2, .grid-3, .grid-4, .steps, .lecons, .chaine, .tools-mini, .tools, .model, .relais-temps, .list-rows";
  const calme = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ioJeu;
  function mouvement(depart = 0) {
    ioJeu?.disconnect();
    if (calme() || !("IntersectionObserver" in window)) return;
    ioJeu = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      ioJeu.unobserve(el);
      el.classList.add("vu");
      /* une fois en place, la carte retrouve ses réglages habituels (survol, transitions) */
      if (el.classList.contains("jeu")) setTimeout(() => { el.classList.remove("jeu", "vu"); el.style.removeProperty("--retard"); delete el.dataset.dir; }, 1900);
    }), { rootMargin: "0px 0px -8% 0px" });
    const sousEcran = el => el.getBoundingClientRect().top + depart > innerHeight * .92;
    $$(GRILLES, app).forEach(g => {
      const cartes = [...g.children];
      const colonnes = Math.max(1, getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length);
      cartes.forEach((c, i) => {
        if (!sousEcran(c)) return;
        const col = i % colonnes;
        c.dataset.dir = colonnes === 1 ? (i % 2 ? "d" : "g") : col === 0 ? "g" : col === colonnes - 1 ? "d" : "b";
        c.style.setProperty("--retard", col * 90 + "ms");
        c.querySelectorAll(".ic svg *, .pn + svg *").forEach(t => t.setAttribute("pathLength", "1"));
        c.classList.add("jeu");
        ioJeu.observe(c);
      });
    });
    $$(".pole-img img, .member img, .real img, .lecon img", app).forEach(im => { if (sousEcran(im)) { im.classList.add("img-mouv"); ioJeu.observe(im); } });
  }

  /* Relief 3D : les photos, les écrans et les cartes s'inclinent en perspective sous la souris, avec un reflet
     de lumière ; au défilement, les cartes se redressent depuis un léger angle. Souris seulement pour l'inclinaison,
     et rien du tout si le visiteur a demandé moins d'animations. */
  let ioRelief;
  function relief(depart = 0) {
    ioRelief?.disconnect();
    if (calme()) return;
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      $$(".r-hero-photo, .pg-hero, .solution:not(.bientot), .r-pole, .pg-carte-photo, .pg-ecran .screen", app).forEach(el => {
        if (el.dataset.relief) return;
        el.dataset.relief = "1"; el.classList.add("r3d-tilt");
        const max = el.matches(".pg-hero") ? 2.5 : el.matches(".r-pole") ? 5 : 7;
        let raf = 0;
        el.addEventListener("pointermove", e => {
          const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.setProperty("--ry", ((x - .5) * 2 * max).toFixed(2) + "deg");
            el.style.setProperty("--rx", ((.5 - y) * 2 * max).toFixed(2) + "deg");
            el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
            el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
            el.classList.add("r3d-actif");
          });
        });
        el.addEventListener("pointerleave", () => { cancelAnimationFrame(raf); el.classList.remove("r3d-actif"); ["--rx", "--ry"].forEach(v => el.style.removeProperty(v)); });
      });
    }
    if (!("IntersectionObserver" in window)) return;
    ioRelief = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; ioRelief.unobserve(el); el.classList.add("r3d-vu");
      setTimeout(() => { el.classList.remove("r3d-entree", "r3d-vu"); el.style.removeProperty("--r3d-retard"); }, 1600);
    }), { rootMargin: "0px 0px -6% 0px" });
    $$(".pg-carte, .vitrine-grille > .solution, .r-poles > .r-pole, .r-chiffres li, .r-bande", app).forEach((el, i) => {
      if (el.getBoundingClientRect().top + depart < innerHeight * .95) return;
      el.classList.add("r3d-entree"); el.style.setProperty("--r3d-retard", (i % 4) * 80 + "ms"); ioRelief.observe(el);
    });
  }

  /* Accueil : la photo de la bannière change toutes les six secondes et demie, avec le même mouvement.
     Pas de défilement si le visiteur économise ses données ou a une connexion très lente. */
  let diapoStop = null;
  function stopDiapo() { if (diapoStop) diapoStop(); }
  function startDiapo() {
    stopDiapo();
    const cadre = $(".hero-photo"), c = navigator.connection;
    if (!cadre || calme() || (c && (c.saveData || /2g/.test(c.effectiveType || "")))) return;
    const vues = ["avec", "pme", "cooperatives", "vert"].map(id => pole(id).photo);
    let i = 0;
    const minuteur = setInterval(() => {
      if (document.hidden || !cadre.isConnected) return;
      i = (i + 1) % vues.length;
      const boite = document.createElement("div");
      boite.innerHTML = photo(vues[i][0], "(max-width: 1080px) 100vw, 40vw", vues[i][1], ' class="diapo"');
      const im = boite.firstElementChild;
      const montrer = () => {
        if (!cadre.isConnected) return;
        cadre.appendChild(im);
        requestAnimationFrame(() => requestAnimationFrame(() => im.classList.add("vu")));
        setTimeout(() => [...cadre.querySelectorAll("img")].slice(0, -1).forEach(x => x.remove()), 3200);
      };
      im.decode ? im.decode().then(montrer, montrer) : montrer();
    }, 6500);
    diapoStop = () => { clearInterval(minuteur); diapoStop = null; };
  }

  /* Chiffres qui s'animent : quand un chiffre entre à l'écran, il monte de zéro à sa valeur (1,3 s).
     La valeur finale est déjà écrite dans la page ; rien ne bouge si le visiteur a demandé moins d'animations. */
  let ioCompte;
  function compteurs() {
    ioCompte?.disconnect();
    if (calme() || !("IntersectionObserver" in window)) return;
    ioCompte = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, fin = +el.dataset.compte, suffixe = el.dataset.suffixe || "";
      ioCompte.unobserve(el);
      if (!fin) return;
      let t0 = 0;
      const pas = t => {
        if (!el.isConnected) return;
        t0 = t0 || t;
        const k = Math.min(1, (t - t0) / 1300);
        el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffixe : "");
        if (k < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    }), { threshold: .6 });
    $$("[data-compte]", app).forEach(el => ioCompte.observe(el));
  }

  /* Question directe à l'assistant depuis la bannière de l'accueil */
  function bindDemander() {
    $$("[data-demander]", app).forEach(f => f.addEventListener("submit", e => {
      e.preventDefault();
      const champ = f.querySelector("input"), q = champ.value.trim();
      if (!q) return champ.focus();
      if (typeof UboraChat === "undefined") { nav("/contact"); return; }
      if ($("#chatBox")?.hidden !== false) UboraChat.toggle();
      UboraChat.send(q);
      champ.value = "";
    }));
  }

  /* Globe 3D de l'accueil : des points répartis sur une sphère (Afrique, Madagascar, RDC en vert vif),
     projection orthographique, Lubumbashi signalé. Il tourne seul lentement, se fait glisser à la souris ou au doigt,
     et répond aux flèches du clavier. Il ne s'anime que s'il est à l'écran ; immobile si le visiteur a demandé moins d'animations. */
  const D2R = Math.PI / 180;
  const AFRIQUE = [[-5.9,35.8],[-1.5,35.2],[3,36.8],[10.2,37.3],[11,35.2],[10.1,33.8],[11.5,33.1],[15.2,32.3],[19.9,30.9],[20.1,32.4],[23.1,32.6],[25,31.7],[29,30.9],[32.3,31.3],[32.5,29.9],[35,24],[37.3,19],[38.5,17.9],[39.5,15.5],[43.3,12.5],[44.5,10.4],[51.2,11.8],[51,10.4],[49.5,8],[48,4.5],[44,1],[41.5,-1.7],[39.7,-4.5],[39.3,-8],[40.5,-10.5],[40.6,-15],[36.5,-19],[35.4,-22],[32.9,-25.9],[32.6,-28.5],[31,-29.8],[27.5,-33.6],[22.5,-34],[20,-34.8],[18.4,-34.2],[17.8,-32],[16.5,-28.6],[14.5,-22.9],[11.8,-17.2],[13.4,-12],[13.1,-9],[12.2,-6],[11.9,-3.5],[9.3,-1],[9.6,2.5],[9.6,3.8],[8.5,4.5],[5.6,4.2],[3,6.4],[-2,4.8],[-7.5,4.4],[-11,6.9],[-13.3,9],[-15.1,11],[-16.8,13.1],[-17.5,14.7],[-16.5,19.5],[-17,21],[-15,24],[-13,27.5],[-9.8,30],[-9.5,32.5],[-6.8,34]];
  const MADAGASCAR = [[49.3,-12],[50.4,-15.5],[49.5,-17.5],[47.1,-24.9],[45.2,-25.6],[44,-25],[43.3,-22],[44.4,-16.2],[47.5,-14.5]];
  const RDC = [[12.2,-6],[12.5,-5.7],[13.1,-4.8],[14.4,-4.9],[15.3,-4.3],[16.2,-2.2],[17.7,-0.5],[18,2],[18.6,3.5],[18.5,4.3],[19.5,5.1],[22.4,4.1],[24.5,5],[27.4,5.1],[29,4.4],[30.8,3.5],[31.2,2.2],[29.9,0.6],[29.6,-1.4],[29,-2.8],[29.2,-4.5],[29.5,-6],[30.5,-8.2],[28.9,-8.5],[28.4,-9.2],[28.6,-10.6],[29.4,-12.4],[29.8,-13.4],[29,-13.4],[27.5,-12.3],[26,-11],[25.3,-11.2],[24,-10.9],[22.3,-11],[22,-9.6],[21.8,-7.3],[20.3,-7],[19.4,-8],[17.6,-8.1],[16.2,-5.9],[13,-5.9]];
  const LUBUMBASHI = [-11.66, 27.48];
  const dedans = (lon, lat, P) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  /* n points répartis régulièrement sur la sphère (spirale de Fibonacci) ; garder() rend la famille du point, ou -1 */
  const fibo = (n, garder) => {
    const out = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, lat = Math.asin(y) / D2R, lon = ((ga * i / D2R) % 360) - 180, t = garder(lon, lat);
      if (t >= 0) out.push([lat * D2R, lon * D2R, t]);
    }
    return out;
  };
  let globeStop = null;
  function stopGlobe() { if (globeStop) globeStop(); }
  function startGlobe() {
    stopGlobe();
    const cv = $("#globe"), ctx = cv && cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    const immobile = calme(), petit = innerWidth < 640;
    const terre = (lon, lat) => dedans(lon, lat, AFRIQUE) || dedans(lon, lat, MADAGASCAR);
    const pts = fibo(petit ? 1300 : 2200, (lon, lat) => terre(lon, lat) ? -1 : 0)
      .concat(fibo(petit ? 20000 : 32000, (lon, lat) => dedans(lon, lat, RDC) ? 2 : terre(lon, lat) ? 1 : -1));
    const COUL = ["rgb(150,196,170)", "rgb(196,232,206)", "rgb(141,203,79)"], TAILLE = [1.4, 1.8, 2.3], BASE = [.32, .8, 1];
    const etiquette = T("Lubumbashi · siège"), pays = T("RDC");
    let W = 0, H = 0, dpr = 1, Rr = 0, lon0 = 22, lat0 = -6, vx = 0, vy = 0, glisse = false, px = 0, py = 0, repos = -1e9, actif = false, raf = 0;
    const norm = x => ((x + 180) % 360 + 360) % 360 - 180;
    const taille = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      Rr = Math.min(W, H) * .43;
    };
    const proj = (lat, lon, c0, s0, l0) => {
      const cl = Math.cos(lat), dl = lon - l0, X = cl * Math.sin(dl), Y = Math.sin(lat), Z = cl * Math.cos(dl);
      return [X, Y * c0 - Z * s0, Y * s0 + Z * c0];
    };
    const dessiner = t => {
      if (!W) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, l0 = lon0 * D2R, c0 = Math.cos(lat0 * D2R), s0 = Math.sin(lat0 * D2R);
      /* halo, puis la sphère éclairée en haut à gauche */
      const g = ctx.createRadialGradient(cx, cy, Rr * .6, cx, cy, Rr * 1.25);
      g.addColorStop(0, "rgba(141,203,79,.14)"); g.addColorStop(.55, "rgba(141,203,79,.07)"); g.addColorStop(1, "rgba(141,203,79,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Rr * 1.25, 0, 7); ctx.fill();
      const d = ctx.createRadialGradient(cx - Rr * .35, cy - Rr * .4, Rr * .1, cx, cy, Rr);
      d.addColorStop(0, "#1E7A50"); d.addColorStop(1, "#06301F");
      ctx.fillStyle = d; ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(190,235,205,.22)"; ctx.lineWidth = 1; ctx.stroke();
      /* les points : la face cachée n'est pas dessinée, ceux du bord sont plus petits et plus pâles */
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = COUL[k];
        for (const p of pts) {
          if (p[2] !== k) continue;
          const q = proj(p[0], p[1], c0, s0, l0); if (q[2] <= .02) continue;
          ctx.globalAlpha = BASE[k] * (.25 + .75 * q[2]);
          const s = TAILLE[k] * (.6 + .4 * q[2]);
          ctx.fillRect(cx + q[0] * Rr - s / 2, cy - q[1] * Rr - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
      /* le nom du pays */
      const c = proj(-3.2 * D2R, 23.5 * D2R, c0, s0, l0);
      if (c[2] > .25) {
        ctx.globalAlpha = Math.min(1, (c[2] - .25) * 2);
        ctx.font = "700 " + Math.round(Rr * .075) + "px Ubuntu, system-ui, sans-serif"; ctx.textAlign = "center";
        ctx.lineWidth = 4; ctx.strokeStyle = "rgba(4,30,19,.75)"; ctx.strokeText(pays, cx + c[0] * Rr, cy - c[1] * Rr);
        ctx.fillStyle = "#fff"; ctx.fillText(pays, cx + c[0] * Rr, cy - c[1] * Rr);
        ctx.globalAlpha = 1;
      }
      /* Lubumbashi : un point jaune et deux ondes */
      const m = proj(LUBUMBASHI[0] * D2R, LUBUMBASHI[1] * D2R, c0, s0, l0);
      if (m[2] > .05) {
        const mx = cx + m[0] * Rr, my = cy - m[1] * Rr;
        ctx.globalAlpha = Math.min(1, m[2] * 3);
        if (!immobile) for (let r = 0; r < 2; r++) {
          const ph = ((t / 2200) + r / 2) % 1;
          ctx.strokeStyle = "rgba(242,183,5," + ((1 - ph) * .9).toFixed(3) + ")"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(mx, my, 4 + ph * Rr * .14, 0, 7); ctx.stroke();
        }
        ctx.fillStyle = "#F2B705"; ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(mx, my, 2, 0, 7); ctx.fill();
        const fs = Math.max(12, Math.round(Rr * .06));
        ctx.font = "500 " + fs + "px Ubuntu, system-ui, sans-serif";
        let lx = mx + Rr * .1; const ly = my + Rr * .16, tw = ctx.measureText(etiquette).width;
        if (lx + tw + 16 > W) lx = W - tw - 16;
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mx + 3, my + 3); ctx.lineTo(lx, ly - fs * .4); ctx.stroke();
        ctx.fillStyle = "rgba(4,30,19,.85)"; ctx.fillRect(lx - 6, ly - fs - 4, tw + 12, fs + 12);
        ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.fillText(etiquette, lx, ly + 1);
        ctx.globalAlpha = 1;
      }
    };
    const boucle = t => {
      if (!glisse) {
        if (t - repos > 2600 && !immobile) {
          /* au repos, le globe oscille doucement autour de l'Afrique centrale */
          const cl = 22 + 26 * Math.sin(t / 9000), cb = -6 + 7 * Math.sin(t / 13000);
          lon0 += norm(cl - lon0) * .015; lat0 += (cb - lat0) * .015;
        } else { lon0 += vx; lat0 += vy; vx *= .94; vy *= .94; }
        lat0 = Math.max(-65, Math.min(65, lat0)); lon0 = norm(lon0);
      }
      dessiner(t);
      raf = actif && !immobile ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => { if (!raf) raf = requestAnimationFrame(boucle); };
    const ici = new AbortController(), o = { signal: ici.signal };
    cv.addEventListener("pointerdown", e => { glisse = true; px = e.clientX; py = e.clientY; vx = vy = 0; try { cv.setPointerCapture(e.pointerId); } catch (x) {} }, o);
    cv.addEventListener("pointermove", e => {
      if (!glisse) return;
      const k = 57.3 / Rr, dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      lon0 = norm(lon0 - dx * k); lat0 = Math.max(-65, Math.min(65, lat0 + dy * k));
      vx = Math.max(-2.5, Math.min(2.5, -dx * k)); vy = Math.max(-2, Math.min(2, dy * k));
      if (immobile) dessiner(performance.now()); else relancer();
    }, o);
    const lacher = () => { if (glisse) { glisse = false; repos = performance.now(); } };
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(n => cv.addEventListener(n, lacher, o));
    cv.addEventListener("keydown", e => {
      const p = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 8], ArrowDown: [0, -8] }[e.key]; if (!p) return;
      e.preventDefault(); lon0 = norm(lon0 + p[0]); lat0 = Math.max(-65, Math.min(65, lat0 + p[1])); repos = performance.now(); vx = vy = 0;
      dessiner(performance.now()); relancer();
    }, o);
    taille();
    const ro = window.ResizeObserver ? new ResizeObserver(() => { taille(); dessiner(performance.now()); }) : null;
    ro?.observe(cv);
    const io = window.IntersectionObserver ? new IntersectionObserver(es => { actif = es[0].isIntersecting && !document.hidden; if (actif) { taille(); relancer(); } }) : null;
    if (io) io.observe(cv); else { actif = true; relancer(); }
    document.addEventListener("visibilitychange", () => { actif = !document.hidden && cv.isConnected; if (actif) relancer(); }, o);
    dessiner(0);
    globeStop = () => { cancelAnimationFrame(raf); raf = 0; actif = false; ici.abort(); ro?.disconnect(); io?.disconnect(); globeStop = null; };
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
  $("#menu").innerHTML = T(menuHTML());
  $("#footer").innerHTML = T(footerHTML());
  $$(".dd-btn").forEach(b => b.addEventListener("click", () => {
    const li = b.parentElement, open = !li.classList.contains("open");
    $$(".has-dd").forEach(x => { x.classList.remove("open"); x.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); });
    if (open) { li.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  }));
  document.addEventListener("click", e => {
    if (!e.target.closest(".has-dd")) fermerDD();
    const a = e.target.closest && e.target.closest("a");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.id === "langBtn") return;
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/generateur")) return;
    e.preventDefault();
    const [p, h] = href.split("#");
    /* sur un sous-domaine d'un domaine, seuls les liens vers le domaine lui-même restent sur place ; le reste mène au site principal */
    if (SOUS_DOMAINES[sd]) {
      if (p.split("?")[0] !== "/" + SOUS_DOMAINES[sd]) { location.href = CONFIG.site + href; return; }
      if (h) document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }); else scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    /* changer de langue recharge la page (menu, pied de page et dictionnaire) */
    if (/^\/en(\/|$)/.test(p || "/") !== (LANGUE === "en")) { location.href = href; return; }
    if ((p || "/") === location.pathname && h) { document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }); return; }
    nav(href);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") fermerDD(); });
  $$(".has-dd").forEach(li => li.addEventListener("focusout", e => { if (!li.contains(e.relatedTarget)) { li.classList.remove("open"); li.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); } }));
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-plus]"); if (!b) return;
    const bloc = b.previousElementSibling; if (!bloc) return;
    const ouvert = bloc.classList.toggle("ouvert");
    b.setAttribute("aria-expanded", String(ouvert));
    b.querySelector(".plus-t").textContent = ouvert ? T("Réduire") : b.dataset.plus;
    if (!ouvert) bloc.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest(".filtres button[data-f]"); if (!b) return;
    const g = b.parentElement, f = b.dataset.f, cible = g.nextElementSibling;
    g.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    if (cible) [...cible.children].forEach(el => { el.hidden = f !== "*" && !(el.dataset.f || "").split(" ").includes(f); });
  });
  window.addEventListener("popstate", route);
  $("#burger").addEventListener("click", () => {
    const o = $("#menu").classList.toggle("open");
    $("#burger").setAttribute("aria-expanded", o); document.body.classList.toggle("menu-open", o);
  });
  $("#themeBtn").setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
  $("#themeBtn").addEventListener("click", () => {
    const r = document.documentElement, next = r.dataset.theme === "dark" ? "light" : "dark";
    r.dataset.theme = next; store.set("ubora_theme_2026", next);
    $("#themeBtn").setAttribute("aria-pressed", String(next === "dark"));
  });
  $("#newsForm").addEventListener("submit", async e => {
    e.preventDefault();
    if ($("#nlSite").value) return;
    const btn = e.target.querySelector("button[type=submit]"), mail = $("#nlEmail").value.trim();
    if (btn.disabled) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) { toast("L'adresse e-mail semble incomplète (exemple : nom@domaine.com)."); $("#nlEmail").focus(); return; }
    const libelle = btn.textContent; btn.disabled = true; btn.textContent = T("Envoi…");
    const r = await UboraDB.subscribe(mail);
    btn.disabled = false; btn.textContent = libelle;
    if (r.ok) e.target.reset();
    toast(r.ok ? "Merci, votre inscription est enregistrée." : r.limite ? "Beaucoup d'envois en ce moment. Réessayez dans quelques minutes." : "L'inscription n'a pas abouti. Vérifiez votre connexion et réessayez.");
  });
  $("#waFloat").href = waLink(LANGUE === "en" ? "Hello Ubora, I would like some information." : "Bonjour Ubora, je souhaite avoir des informations.");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    $("#readBar").style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
    $("#toTop").classList.toggle("show", scrollY > 900);
    $(".site-header").classList.toggle("scrolled", scrollY > 40);
  }, { passive: true });
  $("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  route();
  typo($("#footer")); typo($(".site-header"));

  /* contenu publié dans la base : on réaffiche les pages qui l'utilisent */
  /* contenu publié dans la base : on ne réaffiche la page que si quelque chose a changé depuis sa génération */
  const empreinte = () => JSON.stringify([DATA.actualites, DATA.formations, DATA.offres, DATA.equipe, DATA.realisations]);
  const avant = empreinte();
  /* le contenu est déjà dans la page : on ne consulte la base qu'une fois la page affichée, pour ne pas ralentir son chargement */
  const relire = () => UboraDB.load().catch(() => {}).then(() => {
    baseConsultee = true;
    const ici = resolve(location.pathname, location.search, location.hostname);
    if (ici.base === "actualites" && ici.sub) { route({ keep: true }); return; }
    if (empreinte() === avant) return;
    const tk = $("#tickerMove"); if (tk) tk.innerHTML = T(tickerHTML());
    const r = resolve(location.pathname, location.search, location.hostname);
    if (["", "actualites", "a-propos", "realisations"].includes(r.base) || pole(r.base)) route({ keep: true });
  });
  const plusTard = () => setTimeout(relire, 1200);
  if (document.readyState === "complete") plusTard(); else addEventListener("load", plusTard, { once: true });
}

if (typeof window !== "undefined" && window.document && !window.UBORA_PRERENDER) boot();
