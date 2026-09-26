/* ==========================================================================
   UBORA — Fonctionnement du site (pas besoin de modifier pour le contenu :
   tout le contenu est dans data.js)
   ========================================================================== */

/* ---------- Icônes ---------- */
const sv = (d, w = 1.9) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  finance: sv('<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>'),
  pme: sv('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>'),
  rocket: sv('<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15l-3-3c1-4 5-9 12-9 0 7-5 11-9 12z"/><circle cx="14.5" cy="9.5" r="1.5"/>'),
  flow: sv('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>'),
  leaf: sv('<path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20l8-8"/>'),
  tools: sv('<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>'),
  chain: sv('<circle cx="5" cy="12" r="2.5"/><circle cx="12" cy="6" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7 10.5l3-3M14 7.5l3 3M17 13.5l-3 3M10 16.5l-3-3"/>'),
  compass: sv('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>'),
  target: sv('<path d="M10 5h10M10 12h10M10 19h10"/><path d="M3 5l1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18"/>'),
  school: sv('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/><path d="M22 9v6"/>'),
  shield: sv('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
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
  search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>', 2),
  chev: sv('<path d="M6 9l6 6 6-6"/>', 2.2),
  bell: sv('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  seat: sv('<circle cx="12" cy="7" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/>', 2),
  heart: sv('<path d="M12 20s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.5-8 11-8 11z"/>'),
  spark: sv('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>')
};
const AXE_ICON = { finance: "finance", entreprises: "pme", agri: "leaf", programmes: "compass" };

/* ---------- Utilitaires ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $("#app");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const d12 = d => new Date(d + "T12:00:00");
const fmtDate = d => d12(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const fmtNum = n => Math.round(n).toLocaleString("fr-FR").replace(/[  ]/g, " ");
const todayISO = () => new Date().toISOString().slice(0, 10);
const STATUT = { dispo: ["Disponible", "st-dispo"], pilote: ["En pilote", "st-pilote"], bientot: ["Bientôt", "st-bientot"] };
const svc = id => SERVICES.find(s => s.id === id);
const sol = id => SOLUTIONS.find(s => s.id === id);
const axeOf = serviceId => AXES.find(a => a.services.includes(serviceId));
const hostOf = u => { try { return new URL(u).hostname; } catch (e) { return u; } };
const waLink = txt => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2800); }
function allNews() {
  const local = store.get("ubora_brouillons", []).map(n => ({ ...n, brouillon: true }));
  return [...local, ...DATA.actualites].sort((a, b) => b.date.localeCompare(a.date));
}
const arcs = cls => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="none" stroke="#3F74D6" stroke-width=".6" stroke-dasharray="160 130" transform="rotate(110 50 50)" opacity=".6"/><circle cx="50" cy="50" r="46" fill="none" stroke="#8BD346" stroke-width="1" stroke-dasharray="110 180" transform="rotate(-50 50 50)" opacity=".7"/><circle cx="50" cy="50" r="36" fill="none" stroke="#fff" stroke-width=".3" opacity=".25"/></svg>`;

/* ---------- Maquettes d'écran (données d'exemple) ---------- */
function mockAkiba() {
  return `<div class="phone"><div class="phone-screen">
    <div class="ph-top"><div class="ph-row"><span>AKIBA</span><span>Groupe Tujenge</span></div>
      <small>Caisse commune</small><b>4 860 000 FC</b>
      <small style="margin-top:8px">Semaine 24 / 36 · 25 membres</small><div class="ph-prog"><i></i></div></div>
    <div class="ph-body">
      <div class="ph-tx"><span>Cotisation · Mama Furaha</span><span>+20 000</span></div>
      <div class="ph-tx"><span>Remboursement · J.-P. K.</span><span>+55 000</span></div>
      <div class="ph-tx out"><span>Prêt · Esther M.</span><span>−150 000</span></div>
      <div class="ph-btn">+ Nouvelle cotisation</div>
    </div></div></div>`;
}
function browser(url, inner) {
  return `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>${inner}</div>`;
}
function areaChart(pts, w = 300, h = 80) {
  const max = Math.max(...pts) * 1.1, step = w / (pts.length - 1);
  const xy = pts.map((v, i) => [i * step, h - (v / max) * h]);
  const line = xy.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const last = xy[xy.length - 1];
  return `<svg viewBox="0 0 ${w} ${h + 4}" aria-hidden="true"><defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8BD346" stop-opacity=".45"/><stop offset="1" stop-color="#8BD346" stop-opacity="0"/></linearGradient></defs>
    ${[0.25, 0.5, 0.75].map(f => `<line x1="0" x2="${w}" y1="${h * f}" y2="${h * f}" stroke="rgba(255,255,255,.07)"/>`).join("")}
    <path d="${line} L${w} ${h} L0 ${h}Z" fill="url(#ag)"/><path d="${line}" fill="none" stroke="#9BDB5A" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="${last[0] - 3}" cy="${last[1]}" r="4.5" fill="#fff" stroke="#5DB53C" stroke-width="2.5"/></svg>`;
}
function mockHub() {
  const ppl = [["AM", "Amani Mode", 82, "#9BDB5A"], ["KB", "Kasongo Bio", 64, "#7FB3FF"], ["NT", "Neema Traiteur", 47, "#E3A064"]];
  return browser("www.uborahub.com/cohortes", `<div class="hub">
    <div class="hub-side"><div class="on">Tableau de bord</div><div>Candidatures</div><div>Cohortes</div><div>Coaching</div><div>Formations</div><div>Rapports</div></div>
    <div class="hub-main">
      <div class="hub-kpis"><div><small>Entrepreneurs</small><b>25</b><em>+5</em></div><div><small>Séances</small><b>142</b></div><div><small>CA moyen</small><b>+18%</b></div></div>
      <div class="hub-chart"><small>Chiffre d'affaires cumulé de la cohorte</small>${areaChart([12, 15, 14, 19, 22, 21, 27, 31, 30, 36, 41, 46])}</div>
      <div class="hub-list">${ppl.map(([i, n, p, c]) => `<div><span class="av" style="background:${c}">${i}</span><span>${n}</span><span class="bar"><i style="width:${p}%"></i></span></div>`).join("")}</div>
    </div></div>`);
}
function mockCoop() {
  const rows = [["Kabamba M.", "Kasenga", "1 250", 1], ["Ilunga T.", "Kasenga", "980", 1], ["Mwamba J.", "Kipushi", "1 540", 0], ["Nsenga R.", "Kipushi", "720", 1], ["Banza L.", "Sakania", "1 100", 0]];
  return browser("ubora-coop · Collecte maïs 2026", `<div style="padding:16px;display:grid;gap:12px">
    <div class="hub-kpis"><div><small>Membres</small><b>184</b></div><div><small>Collecté</small><b>62 t</b></div><div><small>Payé</small><b>78%</b></div></div>
    <div style="overflow-x:auto"><table class="coop-t"><thead><tr><th>Producteur</th><th>Village</th><th>Maïs (kg)</th><th>Paiement</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="${r[3] ? "ok" : "wait"}">${r[3] ? "Payé" : "En attente"}</td></tr>`).join("")}</tbody></table></div></div>`);
}
function mockFin() {
  return browser("ubora-fin · Portefeuille de crédit", `<div style="padding:16px;display:grid;gap:12px">
    <div class="hub-kpis"><div><small>Encours crédit</small><b>$48 200</b></div><div><small>Épargne</small><b>$61 900</b></div><div><small>PAR 30</small><b style="color:#9BDB5A">3,1%</b></div></div>
    <div class="hub-chart"><small>Encours de crédit (12 mois)</small>${areaChart([18, 20, 22, 25, 27, 29, 31, 34, 38, 41, 45, 48])}</div>
    <table class="coop-t"><thead><tr><th>Client</th><th>Crédit</th><th>Échéance</th><th>État</th></tr></thead><tbody>
      <tr><td>Mutombo A.</td><td>$1 200</td><td>28/09</td><td class="ok">À jour</td></tr>
      <tr><td>Kalenga F.</td><td>$650</td><td>30/09</td><td class="ok">À jour</td></tr>
      <tr><td>Tshibanda C.</td><td>$900</td><td>15/09</td><td class="wait">Retard 7 j</td></tr></tbody></table></div>`);
}
function mockPme() {
  const steps = [["Projet & équipe", 100], ["Étude de marché", 100], ["Stratégie commerciale", 70], ["Prévisions financières", 40], ["Dossier final", 0]];
  return browser("ubora-pme · Plan d'affaires", `<div style="padding:16px;display:grid;gap:12px">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><b style="font-family:var(--f-display);font-size:15px">Boulangerie Ujasiri · Plan d'affaires</b><span style="font-family:var(--f-mono);font-size:11px;color:#9BDB5A">62 % complété</span></div>
    <div class="hub-list">${steps.map(([n, p]) => `<div style="grid-template-columns:18px 1fr 90px"><span style="width:16px;height:16px;border-radius:50%;background:${p === 100 ? "#5DB53C" : "rgba(255,255,255,.15)"}"></span><span>${n}</span><span class="bar"><i style="width:${p}%"></i></span></div>`).join("")}</div>
    <div class="hub-kpis"><div><small>Investissement</small><b>$8 500</b></div><div><small>Seuil de rentabilité</small><b>mois 9</b></div><div><small>Marge nette an 2</small><b>21%</b></div></div>
    <div class="hub-chart"><small>Trésorerie prévisionnelle</small>${areaChart([5, 3, 2, 2.5, 4, 6, 8, 10, 13, 16, 19, 23])}</div></div>`);
}
const MOCKS = { akiba: mockAkiba, hub: mockHub, coop: mockCoop, fin: mockFin, pme: mockPme };
const mockFor = s => (MOCKS[s.mock] || mockHub)();

/* ---------- Petits composants ---------- */
function pageHead({ eyebrow, title, lead, crumbs = [], extra = "" }) {
  return `<section class="deep page-head"><span class="glow g1"></span><span class="glow g2"></span>${arcs("ph-arcs")}
    <div class="wrap">
      <nav class="crumbs" aria-label="Fil d'Ariane"><a href="#/">Accueil</a>${crumbs.map(([t, h]) => h ? `<span><a href="${h}">${t}</a></span>` : `<span>${t}</span>`).join("")}</nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
      ${extra}
    </div></section>`;
}
function statusPill(s) { const [l, c] = STATUT[s.statut] || STATUT.dispo; return `<span class="status ${c}">${l}</span>`; }
function solCard(s) {
  return `<a class="sol" href="#/solutions/${s.id}" style="--c:${s.couleur}">
    <div class="sol-head"><span class="mk">${esc(s.initiales)}</span>${statusPill(s)}</div>
    <h3>${esc(s.nom)}</h3><p class="tagline">${esc(s.tagline)}</p><p>${esc(s.resume)}</p>
    <span class="link">Découvrir ${esc(s.nom)} ${ICON.arrow}</span></a>`;
}
function cover(n) {
  const C = { "Solutions": ["#1F7A34", "#6FB33F"], "Programme": ["#0B2F6E", "#2F5FB0"], "Coopératives": ["#3E7F2A", "#9BC53D"], "Événement": ["#8C4A1F", "#C9793F"], "Partenariat": ["#273B5E", "#4F6A93"], "Formation": ["#0E5A6B", "#2E9CA8"], "Recrutement": ["#4A2F7A", "#7E5BC2"] };
  const [a, b] = C[n.categorie] || ["#0B2F6E", "#2E8B3A"];
  let seed = [...n.slug].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const cx = 260 + rnd() * 140, cy = 40 + rnd() * 120;
  let rings = "";
  for (let i = 1; i <= 8; i++) rings += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${i * 34}" fill="none" stroke="rgba(255,255,255,${(0.22 - i * 0.022).toFixed(3)})" stroke-width="${1.2 + (i % 2)}"/>`;
  return `<div class="cover" style="background:linear-gradient(135deg,${a},${b})">
    <svg class="pat" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 250" aria-hidden="true">${rings}</svg>
    <span class="big" aria-hidden="true">${esc(n.categorie.slice(0, 2))}</span>
    <span class="cat">${esc(n.categorie)}</span>
    ${n.brouillon ? '<span class="ex">Brouillon local</span>' : n.exemple ? '<span class="ex">Exemple</span>' : ""}</div>`;
}
function newsCard(n, feature) {
  return `<a class="card-news ${feature ? "news-feature" : ""}" href="#/actualites/${esc(n.slug)}">${cover(n)}
    <div style="display:grid;gap:10px"><span class="date">${fmtDate(n.date)} · ${esc(n.categorie)}</span><h3>${esc(n.titre)}</h3><p>${esc(n.extrait)}</p>
    ${feature ? `<span class="link">Lire l'article ${ICON.arrow}</span>` : ""}</div></a>`;
}
function gauge(pct, label) {
  const r = 80, c = Math.PI * r, off = c * (1 - pct / 100);
  return `<svg class="gauge" viewBox="0 0 200 128" role="img" aria-label="${label} : ${pct} sur 100">
    <defs><linearGradient id="gg" x1="0" x2="1"><stop offset="0" stop-color="#3FA535"/><stop offset="1" stop-color="#B6EB7E"/></linearGradient></defs>
    <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="16" stroke-linecap="round"/>
    <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="url(#gg)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
    <text x="100" y="98" text-anchor="middle" font-family="Outfit,sans-serif" font-weight="800" font-size="42" fill="currentColor">${pct}</text>
    <text x="100" y="124" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9.5" letter-spacing="1.5" fill="currentColor" opacity=".6">${label.toUpperCase()}</text></svg>`;
}
function faq(items) { return `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`; }
const FAQ = [
  ["Qui peut bénéficier de l'accompagnement d'Ubora ?", "Les PME, les porteurs de projet, les coopératives agricoles, les groupes d'épargne, les petites institutions de microfinance, ainsi que les organisations d'appui (ONG, incubateurs, programmes) qui souhaitent digitaliser leur accompagnement."],
  ["Intervenez-vous en dehors de Lubumbashi ?", "Oui. Notre siège est à Lubumbashi, mais nous intervenons partout en RDC, sur le terrain comme à distance grâce à nos outils numériques."],
  ["Vos solutions fonctionnent-elles sans internet ?", "Oui, nos applications de terrain permettent la saisie hors ligne et synchronisent les données dès que la connexion revient."],
  ["Proposez-vous des formations sur vos outils ?", "Oui. Chaque déploiement inclut une formation de prise en main, puis un accompagnement et un suivi jusqu'à l'autonomie. Consultez le calendrier des sessions dans la rubrique Formations."],
  ["Faut-il être une entreprise formelle ?", "Non. Nous accompagnons justement les entreprises informelles vers la formalisation, étape par étape, en expliquant les avantages concrets."],
  ["Combien coûte l'accompagnement ?", "Cela dépend du programme. Certains accompagnements sont gratuits pour les bénéficiaires grâce à nos partenaires ; contactez-nous pour un devis adapté."]
];

/* ---------- Navigation ---------- */
function buildMenu() {
  const mega = AXES.map(a => `<div class="dd-col"><h5>${a.titre}</h5>${a.services.map(id => `<a href="${svc(id).lien || "#/services#" + id}">${svc(id).titre}</a>`).join("")}</div>`).join("");
  const sols = SOLUTIONS.map(s => `<a href="#/solutions/${s.id}"><span class="mk" style="background:${s.couleur}">${esc(s.initiales)}</span><span><b>${esc(s.nom)}</b><small>${esc(s.tagline)}</small></span></a>`).join("");
  $("#menu").innerHTML = `
    <li><a href="#/a-propos" data-r="a-propos">À propos</a></li>
    <li><a class="nav-star" href="#/avec" data-r="avec">Appui aux AVEC</a></li>
    <li class="has-dd"><button class="dd-btn" data-r="services" aria-expanded="false">Expertises ${ICON.chev}</button>
      <div class="dd dd-mega">${mega}<div class="dd-foot"><span>${SERVICES.length} expertises réparties en ${AXES.length} axes</span><a class="link" href="#/services">Tout voir ${ICON.arrow}</a></div></div></li>
    <li class="has-dd"><button class="dd-btn" data-r="solutions" aria-expanded="false">Solutions ${ICON.chev}</button>
      <div class="dd dd-sol">${sols}<div class="dd-foot"><span>Outils numériques Ubora</span><a class="link" href="#/solutions">Toutes ${ICON.arrow}</a></div></div></li>
    <li><a href="#/formations" data-r="formations">Formations</a></li>
    <li><a href="#/actualites" data-r="actualites">Actualités</a></li>
    <li><a href="#/contact" data-r="contact">Contact</a></li>
    <li class="m-cta"><a class="btn btn-lime" href="#/diagnostic" style="justify-content:center">Diagnostic gratuit</a></li>`;
  $$(".dd-btn").forEach(b => b.addEventListener("click", () => {
    const li = b.parentElement, open = !li.classList.contains("open");
    $$(".has-dd").forEach(x => { x.classList.remove("open"); x.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); });
    if (open) { li.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  }));
  document.addEventListener("click", e => { if (!e.target.closest(".has-dd")) $$(".has-dd").forEach(x => x.classList.remove("open")); });
}
function buildFooter() {
  $("#footer").innerHTML = `<span class="glow g2" style="opacity:.6"></span><div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="#/"><img class="logo-img logo-foot" src="logo.png" alt=""><span class="brand-txt"><span class="brand-name">ub<b>o</b>ra</span><span class="brand-sub">Entreprise sociale</span></span></a>
        <p style="margin-top:18px;max-width:36ch">Bâtir la résilience économique des entreprises et des communautés, depuis Lubumbashi, partout en RDC.</p>
      </div>
      <div><h4>Expertises</h4><ul>${AXES.map(a => `<li><a href="#/services#axe-${a.id}">${a.titre}</a></li>`).join("")}</ul></div>
      <div><h4>Solutions</h4><ul>${SOLUTIONS.map(s => `<li><a href="${s.site || "#/solutions/" + s.id}"${s.site ? ' target="_blank" rel="noopener"' : ""}>${esc(s.nom)}${s.site ? " ↗" : ""}</a></li>`).join("")}</ul></div>
      <div><h4>Ubora</h4><ul><li><a href="#/a-propos">À propos</a></li><li><a href="#/formations">Formations</a></li><li><a href="#/actualites">Actualités</a></li><li><a href="#/carrieres">Carrières</a></li><li><a href="#/diagnostic">Diagnostic PME</a></li><li><a href="#/contact">Contact</a></li></ul></div>
      <div><h4>Nous joindre</h4><ul>
        <li><a href="tel:${CONFIG.telephone.replace(/\s/g, "")}">${esc(CONFIG.telephone)}</a></li>
        <li><a href="${waLink("Bonjour Ubora")}" target="_blank" rel="noopener">WhatsApp</a> · <a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>
        <li>Siège : ${esc(CONFIG.adresse)}</li></ul>
        <h4 style="margin-top:26px">Lettre d'information</h4>
        <form class="news-form" id="newsForm"><input id="nlEmail" type="email" required placeholder="Votre e-mail" aria-label="Adresse e-mail"><button class="btn btn-lime btn-sm" type="submit">S'inscrire</button></form>
      </div>
    </div>
    <div class="foot-big" aria-hidden="true">ubora</div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} Ubora Entreprise Sociale · Siège à Lubumbashi · Interventions dans toute la RDC</span><a href="#/admin">Espace équipe</a></div>
  </div>`;
  $("#newsForm").addEventListener("submit", async e => { e.preventDefault(); const mail = $("#nlEmail").value.trim(); e.target.reset(); const r = await UboraDB.subscribe(mail); toast(r.ok || r.offline ? "Merci ! Inscription enregistrée." : "Inscription impossible pour le moment."); });
}
function renderTicker() {
  const items = [...allNews().slice(0, 4).map(n => [n.titre, "#/actualites/" + n.slug, d12(n.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })]), ...TICKER_MESSAGES];
  const one = items.map(([t, h, d]) => `<a href="${h}">${d ? `<b>${esc(d)}</b>` : ""}${esc(t)}</a>`).join("");
  $("#tickerMove").innerHTML = one + one.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ');
}

/* ==========================================================================
   PAGES
   ========================================================================== */
function pageHome() {
  const words = ["PME", "entrepreneurs", "coopératives", "communautés", "microfinances"];
  return `
  <section class="deep hero"><canvas id="net" aria-hidden="true"></canvas><span class="glow g1"></span><span class="glow g2"></span><span class="glow g3"></span>
    <div class="wrap hero-grid">
      <div>
        <span class="pill"><b>Entreprise sociale</b> Siège à Lubumbashi · actifs dans toute la RDC</span>
        <h1>Bâtir la résilience économique des <span class="rot" id="rot" data-words="${words.join("|")}">${words[0]}</span> de la RDC.</h1>
        <p class="lead">Ubora conçoit des solutions numériques qui répondent aux contraintes réelles du terrain. Nous accompagnons aussi entrepreneurs, coopératives, microfinances et organisations d'appui par le conseil, la formation et la gestion de projets.</p>
        <div class="btn-row">
          <a class="btn btn-lime" href="#/solutions">Découvrir nos solutions ${ICON.arrow}</a>
          <a class="btn btn-glass" href="#/contact">Parler à un expert</a>
        </div>
        <div class="trust"><span>Compatible</span><span class="chip-d">M-Pesa</span><span class="chip-d">Airtel Money</span><span class="chip-d">Orange Money</span><span class="chip-d">Hors ligne</span><span class="chip-d">CDF & USD</span></div>
      </div>
      <div class="stage">
        ${mockHub()}
        ${mockAkiba()}
        <div class="float-card"><span class="ic">${ICON.check}</span><span><b>Cotisation reçue</b>+20 000 FC · Airtel Money</span></div>
        <span class="mock-note">Écrans illustratifs, données d'exemple</span>
      </div>
    </div>
  </section>

  <div class="wrap facts"><div class="facts-in">
    <div class="fact"><strong>${SERVICES.length}</strong><span>expertises complémentaires, du terrain au numérique</span></div>
    <div class="fact"><strong>${SOLUTIONS.length}</strong><span>solutions numériques conçues pour la RDC</span></div>
    <div class="fact"><strong>26</strong><span>provinces où nous pouvons intervenir</span></div>
    <div class="fact"><strong>100<small>%</small></strong><span>de nos déploiements incluent formation et suivi</span></div>
  </div></div>

  <section><div class="wrap mission">
    <div>
      <span class="eyebrow">Notre mission</span>
      <blockquote style="margin-top:20px">Mettre la <span class="serif">résilience économique</span> au cœur du développement des entreprises et des communautés congolaises.</blockquote>
      <p class="lead" style="margin-top:22px">Inflation, variations du franc, chocs climatiques, accès limité au crédit : les entrepreneurs congolais évoluent dans un environnement exigeant. Nous les aidons à tenir, puis à grandir.</p>
    </div>
    <div class="pillars3">
      <div class="p3 reveal"><span class="ic">${ICON.shield}</span><div><h4>Des organisations solides</h4><p>Formalisation, gouvernance, gestion rigoureuse : les bases qui permettent d'absorber les chocs.</p></div></div>
      <div class="p3 reveal"><span class="ic">${ICON.coins}</span><div><h4>Un accès équitable à la finance</h4><p>Épargne, crédit et microfinance mieux gérés, pour se constituer des réserves et investir.</p></div></div>
      <div class="p3 reveal"><span class="ic">${ICON.phoneM}</span><div><h4>Des outils adaptés au terrain</h4><p>Des solutions numériques simples, hors ligne, en CDF et USD, avec formation et suivi.</p></div></div>
    </div>
  </div></section>

  <section style="padding-top:0"><div class="wrap">
    <div class="deep avec-band"><span class="glow g1"></span><span class="glow g2"></span>
      <div>
        <span class="eyebrow">Approche phare</span>
        <h2>L'appui aux <span class="serif">AVEC</span>, du cahier jusqu'à la banque.</h2>
        <p class="lead">Les Associations Villageoises d'Épargne et de Crédit sont, pour des millions de Congolais, le seul service financier accessible. Nous les constituons, les formons, digitalisons leurs comptes avec AKIBA, puis transformons leur historique en dossier crédible auprès des institutions financières.</p>
        ${bridge()}
        <div class="btn-row" style="margin-top:30px"><a class="btn btn-lime" href="#/avec">Notre appui aux AVEC ${ICON.arrow}</a><a class="btn btn-glass" href="#/solutions/akiba">Voir AKIBA</a></div>
      </div>
      <div class="stage" style="min-height:0">${mockAkiba()}<span class="mock-note">Écran AKIBA, données d'exemple</span></div>
    </div>
  </div></section>

  <section class="band"><div class="wrap">
    <div class="sec-head split"><div style="display:grid;gap:16px"><span class="eyebrow">Nos expertises</span><h2>Quatre axes, <span class="serif">une</span> même exigence.</h2></div>
      <a class="btn btn-ghost" href="#/services">Toutes nos expertises ${ICON.arrow}</a></div>
    <div class="bento">${AXES.map((a, i) => `
      <div class="axe ${i === 0 ? "feature" : ""} reveal">
        <div class="axe-top"><span class="ic">${ICON[AXE_ICON[a.id]]}</span><span class="axe-num">${a.services.length} expertise${a.services.length > 1 ? "s" : ""}</span></div>
        <h3>${a.titre}</h3><p>${a.accroche}</p>
        <ul class="axe-list">${a.services.map(id => `<li><a href="#/services#${id}">${svc(id).titre}</a></li>`).join("")}</ul>
        <div class="axe-foot"><span class="muted" style="${i === 0 ? "color:var(--deep-muted)" : ""}">Outils : ${a.solutions.map(id => `<a href="#/solutions/${id}" style="color:inherit;font-weight:700">${esc(sol(id).nom)}</a>`).join(", ")}</span>
        <a class="link" href="#/services#axe-${a.id}">Découvrir ${ICON.arrow}</a></div>
      </div>`).join("")}</div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Solutions numériques</span><h2>Des outils nés <span class="serif">sur le terrain</span> congolais.</h2>
      <p class="lead">Hors ligne quand le réseau manque, en francs congolais comme en dollars, connectés au mobile money. Chaque outil est livré avec formation et suivi.</p></div>
    <div class="showcase">
      <div class="tabs" role="tablist" aria-label="Solutions">${SOLUTIONS.map((s, i) => `
        <button class="tab" role="tab" data-sol="${s.id}" aria-selected="${i === 0}">
          <span class="mk" style="background:${s.couleur}">${esc(s.initiales)}</span>
          <span><b>${esc(s.nom)}</b><small>${esc(s.tagline)}</small></span>${statusPill(s)}
          <span class="tab-desc">${esc(s.resume)}</span>
          <span class="tab-cta"><a class="btn btn-primary btn-sm" href="#/solutions/${s.id}">En savoir plus</a>${s.site ? `<a class="btn btn-ghost btn-sm" href="${s.site}" target="_blank" rel="noopener">Ouvrir ${esc(s.nom)} ${ICON.ext}</a>` : ""}</span>
        </button>`).join("")}</div>
      <div class="screen" id="screen" role="tabpanel"><span class="glow g1"></span><span class="glow g2"></span>${mockFor(SOLUTIONS[0])}<span class="screen-note">Données d'exemple</span></div>
    </div>
    <ul class="traits">
      <li>${ICON.wifi}<div><b>Hors ligne d'abord</b><span>Saisie sans réseau, synchronisation au retour de la connexion</span></div></li>
      <li>${ICON.coins}<div><b>CDF & USD</b><span>Double monnaie gérée nativement</span></div></li>
      <li>${ICON.phoneM}<div><b>Mobile money</b><span>M-Pesa, Airtel Money, Orange Money</span></div></li>
      <li>${ICON.school}<div><b>Formation & suivi</b><span>Jusqu'à l'autonomie complète</span></div></li>
    </ul>
  </div></section>

  ${methodSection(true)}

  <section style="padding-top:0"><div class="wrap">${teamBand()}</div></section>

  <section style="padding-top:0"><div class="wrap">
    <div class="deep cta-diag"><span class="glow g1"></span>
      <div><span class="eyebrow">Gratuit · 3 minutes</span><h2 style="margin-top:14px">Votre entreprise est-elle <span class="serif">résiliente</span> ?</h2>
        <p>Huit questions pour mesurer votre maturité en formalisation, finance, gestion et digital, avec des recommandations concrètes.</p>
        <div class="btn-row" style="margin-top:26px"><a class="btn btn-lime" href="#/diagnostic">Lancer le diagnostic ${ICON.arrow}</a></div></div>
      <div style="color:#fff">${gauge(68, "Exemple de score")}</div>
    </div>
  </div></section>

  <section class="band"><div class="wrap">
    <div class="sec-head split"><div style="display:grid;gap:16px"><span class="eyebrow">Actualités</span><h2>Nouvelles du <span class="serif">terrain</span>.</h2></div>
      <a class="btn btn-ghost" href="#/actualites">Toutes les actualités ${ICON.arrow}</a></div>
    <div class="news-grid">${allNews().slice(0, 3).map(n => newsCard(n)).join("")}</div>
  </div></section>

  <section><div class="wrap">${finalCta()}</div></section>`;
}
function teamBand() {
  return `<div class="deep team-band"><span class="glow g1"></span><span class="glow g3"></span>
    <div><span class="eyebrow">Notre équipe</span>
      <h2 style="margin-top:16px">Une équipe <span class="serif">expérimentée</span> qui connaît le terrain congolais.</h2>
      <p class="lead" style="margin-top:18px">Consultants, formateurs et développeurs, nous avons accompagné entrepreneurs, groupes d'épargne, coopératives et institutions financières, en ville comme en zone rurale. Nous connaissons les réalités de nos bénéficiaires parce que nous les partageons.</p>
      <div class="btn-row" style="margin-top:26px"><a class="btn btn-glass" href="#/carrieres">Rejoindre l'équipe ${ICON.arrow}</a></div></div>
    <ul class="team-list">
      <li><span class="ic">${ICON.map}</span><div><b>Expérience de terrain</b><span>Des années d'accompagnement de PME, coopératives et programmes en RDC.</span></div></li>
      <li><span class="ic">${ICON.spark}</span><div><b>Double compétence</b><span>Métier (finance, gestion, agriculture) et numérique, dans une même équipe.</span></div></li>
      <li><span class="ic">${ICON.users}</span><div><b>Proximité</b><span>Présents sur le terrain, joignables sur WhatsApp, réactifs.</span></div></li>
      <li><span class="ic">${ICON.handshake}</span><div><b>Réseau</b><span>Liens avec les microfinances, les bailleurs et les acteurs publics.</span></div></li>
    </ul></div>`;
}
function finalCta() {
  return `<div class="deep final"><span class="glow g1"></span><span class="glow g2"></span>${arcs("ph-arcs")}
    <span class="eyebrow">Travaillons ensemble</span>
    <h2>Construisons une économie plus <span class="serif">résiliente</span>.</h2>
    <p>Un projet, un programme à outiller, une microfinance à digitaliser, une équipe à former ? Parlons-en.</p>
    <div class="btn-row" style="justify-content:center"><a class="btn btn-wa" href="${waLink("Bonjour Ubora, je souhaite échanger sur un projet.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-glass" href="#/contact">Formulaire de contact</a></div></div>`;
}

/* ---------- Méthodologie (accueil + page AVEC) ---------- */
function methodSection(band) {
  return `<section class="${band ? "band" : ""}" id="methode"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Notre méthodologie</span><h2>${esc(METHODE.nom)} : <span class="serif">${esc(METHODE.accroche)}</span></h2>
      <p class="lead">${esc(METHODE.intro)}</p></div>
    <ol class="steps-grid">${METHODE.etapes.map((e, i) => `<li class="reveal">
      <span class="step-n">${String(i + 1).padStart(2, "0")}</span>
      <h4>${esc(e.titre)}</h4><p>${esc(e.texte)}</p>
      <p class="why"><b>Pourquoi en RDC</b>${esc(e.pourquoi)}</p></li>`).join("")}</ol>
  </div></section>`;
}

/* ---------- La passerelle AVEC → institution financière ---------- */
function bridge() {
  const etapes = [["Le groupe", "15 à 30 membres, épargne hebdomadaire, crédits internes"], ["AKIBA", "Comptes tenus sur téléphone, hors ligne, transparents"], ["Historique", "Régularité et remboursements traduits en indicateurs"], ["Financement", "IMF, COOPEC ou banque : crédit accordé et suivi"]];
  return `<ol class="bridge">${etapes.map((e, i) => `<li><span class="bn">${i + 1}</span><div><b>${e[0]}</b><span>${e[1]}</span></div></li>`).join("")}</ol>`;
}

function pageAvec() {
  return pageHead({
    eyebrow: "Approche phare", title: 'Du cahier au <span class="serif">financement</span> : notre appui aux AVEC.',
    crumbs: [["Appui aux AVEC"]],
    lead: "Les Associations Villageoises d'Épargne et de Crédit sont la porte d'entrée de millions de Congolais vers les services financiers. Nous les accompagnons de leur constitution jusqu'à leur reconnaissance par une institution financière.",
    extra: `<div class="btn-row" style="margin-top:28px"><a class="btn btn-lime" href="#/contact?sujet=${encodeURIComponent("Appui aux AVEC")}">Faire accompagner nos groupes ${ICON.arrow}</a><a class="btn btn-glass" href="#/solutions/akiba">Découvrir AKIBA</a></div>`
  }) + `
  <section><div class="wrap two" style="align-items:start">
    <div><span class="eyebrow">Ce qu'est une AVEC</span>
      <h2 style="font-size:clamp(26px,3.2vw,38px);margin:14px 0 16px">Une banque de village, gérée par ses membres.</h2>
      <p class="lead">${esc(AVEC.definition)}</p>
      <div class="for" style="margin-top:20px"><span>15 à 30 membres</span><span>Cycle de 9 à 12 mois</span><span>Fonds social</span><span>Majorité de femmes</span></div>
    </div>
    <div class="panel"><span class="eyebrow">Le constat en RDC</span>
      <ul class="constats">${AVEC.constats.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul>
    </div>
  </div></section>

  ${methodSection(true)}

  <section><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Digitalisation</span><h2>Ce que change le passage à <span class="serif">AKIBA</span>.</h2>
      <p class="lead">Le groupe garde ses règles et ses habitudes de réunion. Seule la tenue des comptes change, et elle devient vérifiable par tous.</p></div>
    <div class="two" style="align-items:center">
      <div class="table-wrap"><table class="compare">
        <thead><tr><th></th><th>Avec le cahier</th><th>Avec AKIBA</th></tr></thead>
        <tbody>${AVEC.avantApres.map(([q, a, b]) => `<tr><th scope="row">${esc(q)}</th><td>${esc(a)}</td><td class="ok">${esc(b)}</td></tr>`).join("")}</tbody>
      </table></div>
      <div class="screen"><span class="glow g1"></span>${mockAkiba()}<span class="screen-note">Données d'exemple</span></div>
    </div>
    ${trainBox(sol("akiba"))}
  </div></section>

  <section class="band"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Passerelle financière</span><h2>Transformer la discipline d'un groupe en <span class="serif">accès au crédit</span>.</h2>
      <p class="lead">Un groupe qui épargne depuis trois ans reste invisible pour une banque s'il ne peut rien prouver. Notre rôle est de rendre cette régularité lisible, des deux côtés du guichet : nous outillons aussi les institutions financières avec Ubora Fin.</p></div>
    ${bridge()}
    <div class="sol-grid" style="margin-top:44px">${["akiba", "ubora-fin"].map(id => solCard(sol(id))).join("")}</div>
  </div></section>

  <section><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Avec qui nous travaillons</span><h2>Trois portes d'entrée, <span class="serif">un</span> même dispositif.</h2></div>
    <div class="field-grid" style="grid-template-columns:repeat(3,1fr)">
      ${AVEC.pourQui.map(([t, d, h]) => `<a class="fcard reveal" href="${h}" style="text-decoration:none;color:inherit"><span class="ic">${ICON.users}</span><h4>${esc(t)}</h4><p>${esc(d)}</p><span class="link">En savoir plus ${ICON.arrow}</span></a>`).join("")}
    </div>
  </div></section>

  <section style="padding-top:0"><div class="wrap">${finalCta()}</div></section>`;
}

function pageAbout() {
  return pageHead({ eyebrow: "À propos", title: 'La <span class="serif">résilience</span> économique comme boussole.', crumbs: [["À propos"]],
    lead: "Ubora (« excellence » en swahili) est une entreprise sociale née à Lubumbashi et active dans toute la RDC. Nous développons des solutions numériques et accompagnons les acteurs économiques pour qu'ils résistent aux chocs, puis se développent." }) + `
  <section><div class="wrap mission">
    <div><span class="eyebrow">Mission & vision</span>
      <blockquote style="margin-top:20px">Des entreprises et des communautés congolaises <span class="serif">capables de résister</span> aux chocs et de prospérer.</blockquote></div>
    <div style="display:grid;gap:18px">
      <p>La majorité des entreprises congolaises restent informelles, gérées sans outils et éloignées du crédit. Au moindre choc (inflation, dépréciation du franc, mauvaise récolte, maladie), elles perdent ce qu'elles ont construit.</p>
      <p>Ubora agit sur les leviers de la résilience économique : structuration, accès à la finance, outils numériques de gestion et compétences. Nos solutions sont pensées à partir des contraintes réelles du terrain : connectivité limitée, double monnaie CDF/USD, mobile money, faible bancarisation.</p>
      <p class="muted"><b style="color:var(--ink)">Notre modèle d'entreprise sociale :</b> les services aux organisations et aux programmes financent l'accès à des tarifs solidaires pour les micro-entrepreneurs et les groupes d'épargne.</p>
    </div></div></section>
  <section class="band"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Nos valeurs</span><h2>Quatre mots <span class="serif">swahili</span> qui nous guident.</h2></div>
    <div class="values">
      <div class="value reveal"><small>ubora</small><h4>Excellence</h4><p>Un travail rigoureux et des outils fiables, parce que nos bénéficiaires méritent le meilleur.</p></div>
      <div class="value reveal"><small>ustahimilivu</small><h4>Résilience</h4><p>Préparer les entreprises et les ménages à traverser les crises et à rebondir.</p></div>
      <div class="value reveal"><small>uwazi</small><h4>Transparence</h4><p>Des comptes clairs, des données partagées, une confiance qui se construit.</p></div>
      <div class="value reveal"><small>umoja</small><h4>Solidarité</h4><p>Personne n'est laissé de côté : femmes, jeunes et zones rurales d'abord.</p></div>
    </div></div></section>
  <section><div class="wrap">${teamBand()}</div></section>
  <section class="band"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Nos ambitions d'ici 2028</span><h2>Mesurer ce qui <span class="serif">compte</span>.</h2></div>
    <div class="amb-grid">
      <div class="amb"><strong>1 000</strong><span>PME structurées et outillées</span></div>
      <div class="amb"><strong>500</strong><span>groupes d'épargne digitalisés</span></div>
      <div class="amb"><strong>50</strong><span>coopératives et microfinances accompagnées</span></div>
      <div class="amb"><strong>60 %</strong><span>de femmes parmi les bénéficiaires</span></div>
    </div>
    <div style="margin-top:56px"><span class="eyebrow">Objectifs de développement durable</span>
      <div class="odd" style="margin-top:18px">
        <span><b style="background:#E5243B">1</b> Pas de pauvreté</span><span><b style="background:#DDA63A">2</b> Faim « zéro »</span><span><b style="background:#FF3A21">5</b> Égalité entre les sexes</span>
        <span><b style="background:#A21942">8</b> Travail décent et croissance</span><span><b style="background:#FD6925">9</b> Industrie, innovation</span><span><b style="background:#DD1367">10</b> Inégalités réduites</span>
      </div></div>
  </div></section>
  <section><div class="wrap" style="max-width:920px"><div class="sec-head"><span class="eyebrow">Questions fréquentes</span><h2>Vous vous <span class="serif">demandez</span>…</h2></div>${faq(FAQ)}</div></section>`;
}

function pageServices() {
  return pageHead({ eyebrow: "Expertises", title: 'Du terrain au <span class="serif">numérique</span>.', crumbs: [["Expertises"]],
    lead: `${SERVICES.length} expertises regroupées en ${AXES.length} axes. Chacune peut être mobilisée seule ou combinée dans un programme sur mesure.` }) + `
  <section><div class="wrap svc-layout">
    <nav class="svc-nav" aria-label="Axes">${AXES.map(a => `<a href="#/services#axe-${a.id}" data-spy="axe-${a.id}">${a.titre}</a>`).join("")}</nav>
    <div>${AXES.map(a => `
      <div class="axe-block" id="axe-${a.id}">
        <header><h2>${a.titre}</h2><span class="muted">Outils : ${a.solutions.map(id => `<a class="link" href="#/solutions/${id}">${esc(sol(id).nom)}</a>`).join(" · ")}</span></header>
        ${a.services.map(id => { const s = svc(id); return `<article class="svc" id="${s.id}"><span class="ic">${ICON[s.ico]}</span><div>
          <h3>${s.titre}</h3><p>${s.texte}</p><ul class="ticks">${s.points.map(p => `<li>${p}</li>`).join("")}</ul>
          <div class="for">${s.pour.map(p => `<span>${p}</span>`).join("")}</div>${s.lien ? `<div class="btn-row" style="margin-top:18px"><a class="btn btn-primary btn-sm" href="${s.lien}">Voir notre appui aux AVEC ${ICON.arrow}</a></div>` : ""}</div></article>`; }).join("")}
      </div>`).join("")}</div>
  </div></section>
  <section style="padding-top:0"><div class="wrap">${finalCta()}</div></section>`;
}

function pageSolutions() {
  return pageHead({ eyebrow: "Solutions", title: 'Nos outils <span class="serif">numériques</span>.', crumbs: [["Solutions"]],
    lead: "Des plateformes conçues avec nos bénéficiaires pour digitaliser l'épargne, la microfinance, l'accompagnement, les coopératives et la gestion des PME. De nouvelles solutions s'ajoutent régulièrement." }) + `
  <section><div class="wrap"><div class="sol-grid">${SOLUTIONS.map(solCard).join("")}
    <a class="sol sol-add" href="#/contact" style="--c:#7CC242"><span class="eyebrow">Partenariat</span><h3 style="font-size:22px">Une solution sur mesure ?</h3><p>Nous co-construisons des outils avec les organisations qui partagent notre mission.</p><span class="link">Parlons-en ${ICON.arrow}</span></a>
  </div></div></section>
  <section style="padding-top:0"><div class="wrap">${trainBox()}</div></section>`;
}
function trainBox(s) {
  return `<div class="train-box"><span class="ic">${ICON.school}</span><div><b>Formation, accompagnement et suivi inclus</b><p>${s ? `Vos équipes sont formées à ${esc(s.nom)}` : "Chaque outil est livré avec une formation de prise en main"}, puis accompagnées jusqu'à l'autonomie : formateurs relais, visites de suivi, support WhatsApp.</p></div><a class="btn btn-primary" href="#/formations${s ? "?outil=" + s.id : ""}">Voir les formations ${ICON.arrow}</a></div>`;
}
function pageSolution(id) {
  const s = sol(id); if (!s) return notFound();
  return `<section class="deep page-head"><span class="glow g1"></span><span class="glow g2"></span>
    <div class="wrap sd-grid"><div>
      <nav class="crumbs"><a href="#/">Accueil</a><span><a href="#/solutions">Solutions</a></span><span>${esc(s.nom)}</span></nav>
      ${statusPill(s)}
      <h1>${esc(s.nom)}</h1>
      <p class="lead" style="color:#fff;font-weight:600">${esc(s.tagline)}</p>
      <p class="lead" style="margin-top:14px">${esc(s.description)}</p>
      <div class="btn-row" style="margin-top:30px">
        ${s.site ? `<a class="btn btn-lime" href="${s.site}" target="_blank" rel="noopener">Ouvrir ${esc(s.nom)} ${ICON.ext}</a>` : ""}
        <a class="btn ${s.site ? "btn-glass" : "btn-lime"}" href="#/contact?sujet=${encodeURIComponent("Démo " + s.nom)}">${s.statut === "bientot" ? "Être informé du lancement" : "Demander une démo"}</a>
        ${s.simulateur ? `<a class="btn btn-glass" href="#sim" data-scroll="sim">Simuler un cycle</a>` : ""}
      </div></div>
      <div class="stage" style="min-height:0">${mockFor(s)}</div>
    </div></section>
  <section><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Fonctionnalités</span><h2>Ce que ${esc(s.nom)} <span class="serif">permet</span>.</h2></div>
    <div class="feat">${s.fonctionnalites.map(([t, d]) => `<div class="reveal"><b>${t}</b><p>${d}</p></div>`).join("")}</div>
    <div class="for" style="margin-top:28px"><b style="margin-right:6px">Pour :</b>${s.pour.map(p => `<span>${p}</span>`).join("")}</div>
    ${trainBox(s)}
  </div></section>
  ${s.simulateur ? simulator() : ""}
  <section class="band"><div class="wrap"><div class="sec-head"><span class="eyebrow">Autres solutions</span></div>
    <div class="sol-grid">${SOLUTIONS.filter(x => x.id !== s.id).map(solCard).join("")}</div></div></section>`;
}
function simulator() {
  return `<section id="sim" style="padding-top:0"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Simulateur AKIBA</span><h2>Combien votre groupe peut-il <span class="serif">épargner</span> ?</h2><p class="lead">Ajustez les paramètres de votre groupe pour estimer la caisse et le partage en fin de cycle.</p></div>
    <div class="sim"><div>
      <div class="field"><label for="s-m">Nombre de membres <output id="o-m"></output></label><input type="range" id="s-m" min="5" max="30" value="25"></div>
      <div class="field"><label for="s-c">Cotisation par semaine <output id="o-c"></output></label><input type="range" id="s-c" min="1000" max="50000" step="1000" value="10000"></div>
      <div class="field"><label for="s-w">Durée du cycle <output id="o-w"></output></label><input type="range" id="s-w" min="12" max="52" step="4" value="36"></div>
      <div class="field"><label for="s-t">Intérêt mensuel sur les prêts <output id="o-t"></output></label><input type="range" id="s-t" min="0" max="10" step="1" value="5"></div>
      <div class="field"><label for="s-u">Part de la caisse prêtée <output id="o-u"></output></label><input type="range" id="s-u" min="0" max="90" step="10" value="60"></div>
      <div class="seg" role="group" aria-label="Devise"><button type="button" data-cur="CDF" aria-pressed="true">Francs congolais</button><button type="button" data-cur="USD" aria-pressed="false">Dollars US</button></div>
    </div>
    <div class="sim-out" aria-live="polite">
      <div class="sim-row"><span>Épargne totale du groupe</span><strong id="r-e"></strong></div>
      <div class="sim-row"><span>Intérêts générés (estimation)</span><strong id="r-i"></strong></div>
      <div class="sim-row"><span>Caisse en fin de cycle</span><strong id="r-t"></strong></div>
      <div class="sim-row big"><span>Partage par membre</span><strong id="r-p"></strong></div>
      <div class="sim-row"><span>Rendement pour chaque membre</span><strong id="r-r"></strong></div>
      <small>Estimation indicative. 1 USD = ${fmtNum(CONFIG.tauxUSD)} FC.</small>
    </div></div></div></section>`;
}
function bindSimulator() {
  if (!$("#s-m")) return;
  let cur = "CDF";
  const money = v => cur === "CDF" ? fmtNum(v) + " FC" : "$" + fmtNum(v / CONFIG.tauxUSD);
  const run = () => {
    const m = +$("#s-m").value, c = +$("#s-c").value, w = +$("#s-w").value, t = +$("#s-t").value / 100, u = +$("#s-u").value / 100;
    $("#o-m").textContent = m; $("#o-c").textContent = money(c); $("#o-w").textContent = w + " semaines";
    $("#o-t").textContent = Math.round(t * 100) + " %"; $("#o-u").textContent = Math.round(u * 100) + " %";
    const ep = m * c * w, it = (ep / 2) * u * t * (w / 4.33), tot = ep + it;
    $("#r-e").textContent = money(ep); $("#r-i").textContent = money(it); $("#r-t").textContent = money(tot);
    $("#r-p").textContent = money(tot / m); $("#r-r").textContent = "+" + (ep ? (it / ep * 100).toFixed(1).replace(".", ",") : 0) + " %";
  };
  $$("#sim input").forEach(i => i.addEventListener("input", run));
  $$(".seg button").forEach(b => b.addEventListener("click", () => { cur = b.dataset.cur; $$(".seg button").forEach(x => x.setAttribute("aria-pressed", x === b)); run(); }));
  run();
}

/* ---------- Formations ---------- */
let trainFilter = "all";
function pageFormations(params) {
  trainFilter = params.get("outil") || "all";
  const outils = [...new Set(DATA.formations.map(f => f.outil))];
  const label = o => o === "general" ? "Gestion & entrepreneuriat" : (sol(o)?.nom || o);
  return pageHead({ eyebrow: "Formations", title: 'Maîtriser nos outils, <span class="serif">durablement</span>.', crumbs: [["Formations"]],
    lead: "Formation, accompagnement et suivi : nous formons les utilisateurs de nos solutions, sur place ou à distance, puis nous restons à leurs côtés jusqu'à l'autonomie." }) + `
  <section><div class="wrap">
    <div class="field-grid" style="margin-bottom:64px">
      <div class="fcard reveal"><span class="ic">${ICON.school}</span><h4>Prise en main</h4><p>Sessions pratiques pour trésoriers, agents de crédit, gérants de coopératives, équipes et entrepreneurs.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.users}</span><h4>Formateurs relais</h4><p>Nous formons vos animateurs pour démultiplier l'impact sur le terrain.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.map}</span><h4>Accompagnement terrain</h4><p>Présence au démarrage et visites de suivi pour ancrer les bonnes pratiques.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.phone}</span><h4>Support & suivi</h4><p>Assistance WhatsApp et à distance, points de suivi réguliers.</p></div>
    </div>
    <div class="sec-head split" style="margin-bottom:28px"><div style="display:grid;gap:14px"><span class="eyebrow">Calendrier</span><h2>Prochaines <span class="serif">sessions</span></h2></div></div>
    <div class="toolbar"><div class="chips" role="group" aria-label="Filtrer par outil">
      <button class="chip" data-f="all" aria-pressed="${trainFilter === "all"}">Toutes</button>
      ${outils.map(o => `<button class="chip" data-f="${o}" aria-pressed="${trainFilter === o}">${esc(label(o))}</button>`).join("")}</div></div>
    <div class="list-rows" id="trainList"></div>
    <div class="train-box" style="margin-top:40px"><span class="ic">${ICON.spark}</span><div><b>Besoin d'une formation sur mesure ?</b><p>Pour votre organisation, dans votre province, sur vos propres outils : nous adaptons le programme.</p></div><a class="btn btn-primary" href="#/contact?sujet=${encodeURIComponent("Formation sur mesure")}">Demander un programme</a></div>
  </div></section>`;
}
function renderTrainings() {
  const el = $("#trainList"); if (!el) return;
  const t = todayISO();
  const list = DATA.formations.filter(f => trainFilter === "all" || f.outil === trainFilter).sort((a, b) => a.date.localeCompare(b.date));
  if (!list.length) { el.innerHTML = `<div class="empty">Aucune session programmée pour cet outil. <a href="#/contact">Contactez-nous</a> pour organiser une session.</div>`; return; }
  el.innerHTML = list.map(f => {
    const d = d12(f.date), past = f.date < t, s = sol(f.outil);
    const msg = `Bonjour Ubora, je souhaite m'inscrire à la formation « ${f.titre} » du ${fmtDate(f.date)}.\nNom :\nOrganisation :\nNombre de participants :`;
    return `<article class="row-card">
      <div class="datebox"><b>${d.getDate()}</b><span>${d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")} ${d.getFullYear()}</span></div>
      <div>
        <div style="margin-bottom:8px">${s ? `<span class="tag" style="background:${s.couleur};color:#fff">${esc(s.nom)}</span>` : `<span class="tag">Gestion</span>`}<span class="tag">${esc(f.mode)}</span>${past ? '<span class="tag closed">Terminée</span>' : ""}${f.exemple ? '<span class="tag ex">Exemple</span>' : ""}</div>
        <h3>${esc(f.titre)}</h3>
        <div class="meta-line"><span>${ICON.clock}${esc(f.duree)}</span><span>${ICON.pin}${esc(f.lieu)}</span><span>${ICON.seat}${f.places} places</span></div>
        <details class="more-info"><summary>Programme et public</summary><p class="muted" style="margin-top:8px;font-size:15px"><b style="color:var(--ink)">Public :</b> ${esc(f.public)}</p><ul>${f.programme.map(p => `<li>${esc(p)}</li>`).join("")}</ul></details>
      </div>
      <div>${past ? `<span class="muted">Session passée</span>` : `<a class="btn btn-primary" href="${waLink(msg)}" target="_blank" rel="noopener">S'inscrire</a>`}</div>
    </article>`;
  }).join("");
}
function bindFormations() {
  $$(".chip[data-f]").forEach(b => b.addEventListener("click", () => { trainFilter = b.dataset.f; $$(".chip[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b)); renderTrainings(); }));
  renderTrainings();
}

/* ---------- Carrières ---------- */
function pageCareers(openId) {
  const t = todayISO();
  const offers = [...DATA.offres].sort((a, b) => b.publie.localeCompare(a.publie));
  const open = offers.filter(o => o.cloture >= t).length;
  return pageHead({ eyebrow: "Carrières", title: 'Rejoignez une équipe <span class="serif">engagée</span>.', crumbs: [["Carrières"]],
    lead: "Vous voulez mettre vos compétences au service de la résilience économique en RDC ? Découvrez nos offres d'emploi, de stage et de consultance.",
    extra: `<div class="btn-row" style="margin-top:28px"><a class="btn btn-lime" href="#offres" data-scroll="offres">${open} offre${open > 1 ? "s" : ""} ouverte${open > 1 ? "s" : ""} ${ICON.arrow}</a></div>` }) + `
  <section><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Pourquoi Ubora</span><h2>Un travail qui a du <span class="serif">sens</span>.</h2></div>
    <div class="perks">
      <div class="fcard reveal"><span class="ic">${ICON.heart}</span><h4>Un impact concret</h4><p>Vous voyez chaque jour les effets de votre travail sur des entrepreneurs et des familles.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.map}</span><h4>Le terrain</h4><p>Des missions au contact des bénéficiaires, partout en RDC.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.school}</span><h4>Apprendre en continu</h4><p>Formation interne, montée en compétences sur le numérique et l'accompagnement.</p></div>
      <div class="fcard reveal"><span class="ic">${ICON.users}</span><h4>Une équipe soudée</h4><p>Des profils complémentaires, expérimentés et bienveillants.</p></div>
    </div>
  </div></section>
  <section class="band" id="offres"><div class="wrap">
    <div class="sec-head"><span class="eyebrow">Offres</span><h2>Postes <span class="serif">ouverts</span></h2></div>
    <div class="list-rows">${offers.length ? offers.map(o => {
      const closed = o.cloture < t;
      const subj = `Candidature : ${o.titre}`;
      return `<article class="row-card" id="offre-${o.id}" style="grid-template-columns:1fr auto">
        <div>
          <div style="margin-bottom:8px"><span class="tag" style="background:var(--navy);color:var(--bg)">${esc(o.type)}</span><span class="tag">${esc(o.departement)}</span>${closed ? '<span class="tag closed">Clôturée</span>' : ""}${o.exemple ? '<span class="tag ex">Exemple</span>' : ""}</div>
          <h3>${esc(o.titre)}</h3>
          <div class="meta-line"><span>${ICON.pin}${esc(o.lieu)}</span><span>${ICON.calendar}Date limite : ${fmtDate(o.cloture)}</span></div>
          <p class="muted" style="margin-top:10px;font-size:15.5px">${esc(o.resume)}</p>
          <details class="more-info" ${openId === o.id ? "open" : ""}><summary>Voir le détail du poste</summary>
            <div class="job-detail"><div><h4>Missions</h4><ul>${o.missions.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div><div><h4>Profil recherché</h4><ul>${o.profil.map(m => `<li>${esc(m)}</li>`).join("")}</ul></div></div>
          </details>
        </div>
        <div style="display:grid;gap:8px">${closed ? `<span class="muted">Offre clôturée</span>` : `
          <a class="btn btn-primary" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent("Bonjour,\n\nVeuillez trouver ci-joint ma candidature (CV et lettre de motivation) pour le poste « " + o.titre + " ».\n\nCordialement,")}">Postuler par e-mail</a>
          <a class="btn btn-ghost btn-sm" href="${waLink(subj + " — je souhaite avoir plus d'informations.")}" target="_blank" rel="noopener">Question WhatsApp</a>`}
          <button class="btn btn-ghost btn-sm" data-copy="#/carrieres/${o.id}">Partager</button></div>
      </article>`; }).join("") : `<div class="empty">Aucune offre ouverte pour le moment. Envoyez-nous une candidature spontanée.</div>`}</div>
    <div class="train-box" style="margin-top:36px"><span class="ic">${ICON.briefcase}</span><div><b>Candidature spontanée</b><p>Votre profil ne correspond à aucune offre mais notre mission vous parle ? Envoyez-nous votre CV.</p></div>
      <a class="btn btn-primary" href="mailto:${CONFIG.email}?subject=${encodeURIComponent("Candidature spontanée")}">Envoyer mon CV</a></div>
  </div></section>`;
}

/* ---------- Actualités ---------- */
let newsState = { cat: "Toutes", q: "", limit: 7 };
function pageNews() {
  const cats = ["Toutes", ...new Set(allNews().map(n => n.categorie))];
  return pageHead({ eyebrow: "Actualités", title: 'Nouvelles du <span class="serif">terrain</span>.', crumbs: [["Actualités"]],
    lead: "Programmes, lancements, formations, événements et histoires d'entrepreneurs accompagnés par Ubora." }) + `
  <section><div class="wrap">
    <div class="toolbar"><div class="chips" role="group" aria-label="Filtrer par catégorie">${cats.map(c => `<button class="chip" data-cat="${esc(c)}" aria-pressed="${c === newsState.cat}">${esc(c)}</button>`).join("")}</div>
      <label class="search">${ICON.search}<input id="newsQ" type="search" placeholder="Rechercher un article" value="${esc(newsState.q)}" aria-label="Rechercher un article"></label></div>
    <div id="newsList"></div>
  </div></section>`;
}
function renderNewsList() {
  const q = newsState.q.trim().toLowerCase();
  const list = allNews().filter(n => (newsState.cat === "Toutes" || n.categorie === newsState.cat) && (!q || (n.titre + " " + n.extrait + " " + n.contenu.join(" ")).toLowerCase().includes(q)));
  const el = $("#newsList");
  if (!list.length) { el.innerHTML = `<div class="empty">Aucun article ne correspond à « ${esc(newsState.q)} ». Essayez un autre mot ou une autre catégorie.</div>`; return; }
  const shown = list.slice(0, newsState.limit);
  el.innerHTML = `<div class="news-grid">${shown.map((n, i) => newsCard(n, i === 0 && newsState.cat === "Toutes" && !q)).join("")}</div>
    ${list.length > shown.length ? `<div style="text-align:center;margin-top:40px"><button class="btn btn-ghost" id="moreNews">Afficher plus d'articles</button></div>` : ""}`;
  const more = $("#moreNews"); if (more) more.onclick = () => { newsState.limit += 6; renderNewsList(); };
}
function bindNews() {
  $$(".chip[data-cat]").forEach(b => b.addEventListener("click", () => { newsState.cat = b.dataset.cat; newsState.limit = 7; $$(".chip[data-cat]").forEach(x => x.setAttribute("aria-pressed", x === b)); renderNewsList(); }));
  $("#newsQ").addEventListener("input", e => { newsState.q = e.target.value; renderNewsList(); });
  renderNewsList();
}
function renderContent(blocks) {
  let html = "", inList = false;
  for (const b of blocks) {
    if (b.startsWith("- ")) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${esc(b.slice(2))}</li>`; continue; }
    if (inList) { html += "</ul>"; inList = false; }
    html += b.startsWith("### ") ? `<h3>${esc(b.slice(4))}</h3>` : `<p>${esc(b)}</p>`;
  }
  return html + (inList ? "</ul>" : "");
}
function pageArticle(slug) {
  const n = allNews().find(x => x.slug === slug); if (!n) return notFound();
  const words = n.contenu.join(" ").split(/\s+/).length, url = location.href;
  const others = allNews().filter(x => x.slug !== slug).slice(0, 3);
  return pageHead({ eyebrow: esc(n.categorie), title: esc(n.titre), crumbs: [["Actualités", "#/actualites"], [esc(n.categorie)]],
    extra: `<div class="meta-line" style="color:var(--deep-muted)"><span>${ICON.calendar}${fmtDate(n.date)}</span><span>${ICON.clock}${Math.max(1, Math.round(words / 200))} min de lecture</span></div>` }) + `
  <section style="padding-top:56px"><div class="wrap"><article class="article">
    ${cover(n)}
    <div class="prose"><p class="chapo">${esc(n.extrait)}</p>${renderContent(n.contenu)}</div>
    <div class="share"><b>Partager :</b>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(n.titre + " — " + url)}">WhatsApp</a>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a>
      <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}">LinkedIn</a>
      <button class="btn btn-ghost btn-sm" data-copy="">Copier le lien</button></div>
  </article></div></section>
  ${others.length ? `<section class="band"><div class="wrap"><div class="sec-head"><span class="eyebrow">À lire aussi</span></div><div class="news-grid">${others.map(o => newsCard(o)).join("")}</div></div></section>` : ""}`;
}

/* ---------- Diagnostic ---------- */
const DIAG = [
  { dim: "Formalisation", q: "Votre entreprise est-elle enregistrée (RCCM, identification nationale) ?", o: ["Non, activité informelle", "En cours ou partiellement", "Oui, entièrement en règle"] },
  { dim: "Formalisation", q: "Avez-vous des rôles et des responsabilités clairement définis ?", o: ["Je fais tout moi-même", "Quelques rôles, mais flous", "Oui, organigramme et fiches de poste"] },
  { dim: "Finance", q: "Séparez-vous l'argent de l'entreprise de votre argent personnel ?", o: ["Non, tout est mélangé", "Parfois", "Oui, compte ou caisse séparés"] },
  { dim: "Finance", q: "Disposez-vous d'une épargne de précaution pour faire face à un choc ?", o: ["Aucune réserve", "Quelques jours d'activité", "Plus d'un mois de charges"] },
  { dim: "Gestion", q: "Comment suivez-vous vos ventes et vos dépenses ?", o: ["Je ne les note pas", "Dans un cahier", "Dans un logiciel ou tableur, chaque jour"] },
  { dim: "Gestion", q: "Avez-vous un plan d'affaires à jour ?", o: ["Non", "Une ancienne version", "Oui, avec des prévisions financières"] },
  { dim: "Digital", q: "Acceptez-vous les paiements par mobile money ?", o: ["Non", "Oui, de manière informelle", "Oui, avec un compte marchand"] },
  { dim: "Digital", q: "Votre entreprise est-elle visible en ligne ?", o: ["Pas du tout", "WhatsApp ou Facebook personnel", "Page professionnelle, site ou catalogue"] }
];
const RECOS = {
  "Formalisation": ["Structuration & formalisation", "Nous vous guidons pas à pas vers la formalisation et une organisation claire.", "#/services#pme"],
  "Finance": ["Inclusion financière & épargne de précaution", "Séparez vos finances, constituez des réserves et préparez l'accès au crédit.", "#/services#inclusion"],
  "Gestion": ["Ubora PME : gestion & plan d'affaires", "Suivez caisse, stock et marge, et construisez un plan d'affaires solide.", "#/solutions/ubora-pme"],
  "Digital": ["Digitalisation de votre PME", "Mobile money marchand, présence en ligne et outils numériques adaptés.", "#/services#pme"]
};
let diagState = { i: 0, a: [] };
function pageDiag() {
  return pageHead({ eyebrow: "Diagnostic PME · gratuit", title: 'Votre entreprise est-elle <span class="serif">résiliente</span> ?', crumbs: [["Diagnostic"]],
    lead: "Huit questions, trois minutes. Vos réponses restent sur votre appareil." }) + `<section><div class="wrap"><div class="diag" id="diag"></div></div></section>`;
}
function renderDiag() {
  const el = $("#diag"); if (!el) return;
  const { i, a } = diagState;
  if (i >= DIAG.length) return renderDiagResult(el);
  const d = DIAG[i];
  el.innerHTML = `<div class="diag-progress"><span>Question ${i + 1} sur ${DIAG.length}</span><span>${Math.round(i / DIAG.length * 100)} %</span></div>
    <div class="progress" style="margin:0 0 22px"><i style="width:${i / DIAG.length * 100}%"></i></div>
    <div class="q fade"><span class="dim">${d.dim}</span><h3>${d.q}</h3>
      <div class="opts">${d.o.map((o, k) => `<button class="opt" data-k="${k}" aria-pressed="${a[i] === k}"><i></i>${o}</button>`).join("")}</div>
      <div class="q-nav"><button class="btn btn-ghost" id="dPrev" ${i === 0 ? "style='visibility:hidden'" : ""}>← Précédent</button>
        <button class="btn btn-primary" id="dNext" ${a[i] === undefined ? "disabled style='opacity:.45'" : ""}>${i === DIAG.length - 1 ? "Voir mon résultat" : "Suivant →"}</button></div></div>`;
  $$(".opt", el).forEach(b => b.onclick = () => { diagState.a[i] = +b.dataset.k; $$(".opt", el).forEach(x => x.setAttribute("aria-pressed", x === b)); setTimeout(() => { diagState.i++; renderDiag(); }, 200); });
  $("#dPrev").onclick = () => { diagState.i--; renderDiag(); };
  $("#dNext").onclick = () => { if (a[i] !== undefined) { diagState.i++; renderDiag(); } };
}
function renderDiagResult(el) {
  const dims = {};
  DIAG.forEach((d, k) => { dims[d.dim] = dims[d.dim] || [0, 0]; dims[d.dim][0] += diagState.a[k] ?? 0; dims[d.dim][1] += 2; });
  const scores = Object.entries(dims).map(([k, [s, m]]) => [k, Math.round(s / m * 100)]);
  const total = Math.round(scores.reduce((s, [, v]) => s + v, 0) / scores.length);
  const niveau = total < 35 ? "Fragile" : total < 70 ? "En consolidation" : "Résiliente";
  const weak = [...scores].sort((x, y) => x[1] - y[1]).filter(([, v]) => v < 100).slice(0, 3);
  store.set("ubora_diag", { total, scores, date: new Date().toISOString() });
  const resume = `Diagnostic Ubora : score ${total}/100 (${niveau}). ` + scores.map(([k, v]) => `${k} ${v}%`).join(", ");
  el.innerHTML = `<div class="q fade"><span class="dim">Votre résultat</span><h3>Niveau de résilience : ${niveau}</h3>
    <div class="result"><div style="color:var(--ink)">${gauge(total, "Score global").replace('stroke="rgba(255,255,255,.12)"', 'stroke="var(--line)"')}</div>
      <div class="bars">${scores.map(([k, v]) => `<div class="bar-row"><span>${k}</span><span class="track"><i style="width:${v}%;background:${v < 40 ? "var(--copper)" : v < 70 ? "var(--lime)" : "var(--green)"}"></i></span><b>${v}%</b></div>`).join("")}</div></div>
    ${weak.length ? `<h4 style="margin-top:34px;font-size:19px">Nos recommandations pour vous</h4><div class="recos">${weak.map(([k]) => { const [t, d, h] = RECOS[k]; return `<a class="reco" href="${h}">${ICON.arrow}<div><b>${t}</b><span>${d}</span></div></a>`; }).join("")}</div>`
      : `<p style="margin-top:24px">Excellent ! Votre entreprise est bien structurée. Parlons croissance et financement.</p>`}
    <div class="btn-row" style="margin-top:30px"><a class="btn btn-primary" href="#/contact?sujet=${encodeURIComponent("Suite au diagnostic")}&msg=${encodeURIComponent(resume)}">Parler à un conseiller</a>
      <a class="btn btn-wa" href="${waLink(resume)}" target="_blank" rel="noopener">Envoyer sur WhatsApp</a><button class="btn btn-ghost" id="dRestart">Recommencer</button></div></div>`;
  $("#dRestart").onclick = () => { diagState = { i: 0, a: [] }; renderDiag(); };
}

/* ---------- Contact ---------- */
function pageContact(params) {
  const sujet = params.get("sujet") || "", msg = params.get("msg") || "";
  const besoins = ["Accompagnement de ma PME", "Inclusion financière / groupe d'épargne", "Microfinance (Ubora Fin)", "Plan d'affaires (Ubora PME)", "Coopérative / chaîne de valeur", "Formation sur nos outils", "Conseil / étude", "Gestion de projet", "Partenariat / programme", "Recrutement", "Autre"];
  const low = sujet.toLowerCase();
  const sel = besoins.find(b => low && (b.toLowerCase().includes(low.replace("démo ", "")) || low.includes(b.toLowerCase().split(" ")[0]))) || "";
  return pageHead({ eyebrow: "Contact", title: 'Karibu ! Parlons de votre <span class="serif">projet</span>.', crumbs: [["Contact"]],
    lead: "Une question, une démo, une formation, un partenariat ? Où que vous soyez en RDC, notre équipe vous répond sous 48 heures ouvrées." }) + `
  <section><div class="wrap contact-grid">
    <div style="display:grid;gap:28px">
      <ul class="contact-list">
        <li><span class="ic">${ICON.phone}</span><div><small>Téléphone</small><b><a href="tel:${CONFIG.telephone.replace(/\s/g, "")}">${esc(CONFIG.telephone)}</a></b></div></li>
        <li><span class="ic" style="background:#DDF7E6;color:#128C4A">${ICON.phoneM}</span><div><small>WhatsApp</small><b><a href="${waLink("Bonjour Ubora")}" target="_blank" rel="noopener">${esc(CONFIG.telephone)}</a></b></div></li>
        <li><span class="ic">${ICON.mail}</span><div><small>E-mail</small><b><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></b></div></li>
        <li><span class="ic">${ICON.pin}</span><div><small>Siège</small><b>${esc(CONFIG.adresse)}</b></div></li>
        <li><span class="ic">${ICON.map}</span><div><small>Zone d'intervention</small><b>${esc(CONFIG.zone)}</b></div></li>
        <li><span class="ic">${ICON.clock}</span><div><small>Horaires</small><b>${esc(CONFIG.horaires)}</b></div></li>
      </ul>
      ${faq(FAQ.slice(1, 4))}
    </div>
    <div class="panel">
      <h3 style="font-size:24px;margin-bottom:6px">Écrivez-nous</h3><p class="muted" style="margin-bottom:22px;font-size:15px">Votre message sera préparé pour WhatsApp ou e-mail.</p>
      <form class="form" id="contactForm">
        <label>Nom complet<input id="c-nom" required autocomplete="name"></label>
        <label>Organisation<input id="c-org" autocomplete="organization"></label>
        <label>Téléphone<input id="c-tel" type="tel" autocomplete="tel" placeholder="+243 …"></label>
        <label>E-mail<input id="c-mail" type="email" autocomplete="email"></label>
        <label class="full">Votre besoin<select id="c-besoin">${besoins.map(b => `<option ${b === sel ? "selected" : ""}>${b}</option>`).join("")}</select></label>
        <label class="full">Message<textarea id="c-msg" required placeholder="Décrivez brièvement votre activité et votre besoin.">${esc(msg || (sujet && !sel ? sujet : ""))}</textarea></label>
        <div class="full"><button class="btn btn-primary" type="submit">Préparer mon message ${ICON.arrow}</button></div>
      </form>
      <div id="sent" hidden></div>
    </div>
  </div></section>`;
}
function bindContact() {
  const f = $("#contactForm"); if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => $("#" + id).value.trim();
    const texte = `Bonjour Ubora,\n\n${v("c-msg")}\n\n— ${v("c-nom")}${v("c-org") ? " (" + v("c-org") + ")" : ""}\nBesoin : ${v("c-besoin")}${v("c-tel") ? "\nTél : " + v("c-tel") : ""}${v("c-mail") ? "\nE-mail : " + v("c-mail") : ""}`;
    UboraDB.sendMessage({ nom: v("c-nom"), organisation: v("c-org"), telephone: v("c-tel"), email: v("c-mail"), besoin: v("c-besoin"), message: v("c-msg") });
    const s = $("#sent"); s.hidden = false;
    s.innerHTML = `<div class="sent"><b>Votre message est prêt.</b> Choisissez comment l'envoyer :
      <div class="btn-row"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(texte)}">Envoyer par WhatsApp</a>
      <a class="btn btn-ghost" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(v("c-besoin"))}&body=${encodeURIComponent(texte)}">Envoyer par e-mail</a></div></div>`;
  });
}

/* ---------- Espace équipe ---------- */
function pageEditor() {
  const cats = ["Solutions", "Programme", "Coopératives", "Événement", "Partenariat", "Formation", "Recrutement"];
  const drafts = store.get("ubora_brouillons", []);
  return pageHead({ eyebrow: "Espace équipe", title: 'Rédiger une <span class="serif">actualité</span>.', crumbs: [["Espace équipe"]],
    lead: "Rédigez l'article, prévisualisez-le sur ce navigateur, puis copiez le code généré au début de la liste ACTUALITES du fichier data.js pour le publier pour tous." }) + `
  <section><div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:32px;align-items:start">
    <div class="panel"><form class="form" id="edForm">
      <label class="full">Titre<input id="e-titre" required></label>
      <label>Catégorie<select id="e-cat">${cats.map(c => `<option>${c}</option>`).join("")}</select></label>
      <label>Date<input id="e-date" type="date" value="${todayISO()}" required></label>
      <label class="full">Chapeau (résumé)<textarea id="e-extrait" style="min-height:80px" required></textarea></label>
      <label class="full">Contenu<textarea id="e-contenu" style="min-height:200px" placeholder="Un paragraphe par ligne vide.&#10;### pour un intertitre&#10;- pour une liste" required></textarea></label>
      <div class="full"><button class="btn btn-primary" type="submit">Générer & prévisualiser</button></div></form></div>
    <div style="display:grid;gap:20px"><div id="edOut" class="empty">L'aperçu et le code apparaîtront ici.</div>
      ${drafts.length ? `<div class="panel"><b>Brouillons sur ce navigateur (${drafts.length})</b><ul style="padding-left:1.1em;margin:10px 0">${drafts.map(d => `<li><a href="#/actualites/${esc(d.slug)}">${esc(d.titre)}</a></li>`).join("")}</ul><button class="btn btn-ghost btn-sm" id="clearDrafts">Effacer les brouillons</button></div>` : ""}</div>
  </div></section>`;
}
function bindEditor() {
  const f = $("#edForm"); if (!f) return;
  const clr = $("#clearDrafts"); if (clr) clr.onclick = () => { store.set("ubora_brouillons", []); toast("Brouillons effacés"); route(); };
  f.addEventListener("submit", e => {
    e.preventDefault();
    const titre = $("#e-titre").value.trim();
    const slug = titre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "article";
    const n = { slug, date: $("#e-date").value, categorie: $("#e-cat").value, titre, extrait: $("#e-extrait").value.trim(),
      contenu: $("#e-contenu").value.split(/\n\s*\n|\n(?=- |### )/).map(s => s.trim()).filter(Boolean) };
    const code = "  " + JSON.stringify(n, null, 2).replace(/\n/g, "\n  ") + ",";
    const out = $("#edOut"); out.className = "panel";
    out.innerHTML = `<div style="display:grid;gap:16px">${newsCard(n)}<b>Code à coller au début de la liste ACTUALITES (data.js) :</b><pre class="code">${esc(code)}</pre>
      <div class="btn-row"><button class="btn btn-ghost" id="edCopy">Copier le code</button><button class="btn btn-primary" id="edSave">Voir dans les actualités (brouillon local)</button></div></div>`;
    $("#edCopy").onclick = async () => { try { await navigator.clipboard.writeText(code); toast("Code copié"); } catch (err) { toast("Sélectionnez le code et copiez-le manuellement"); } };
    $("#edSave").onclick = () => { const d = store.get("ubora_brouillons", []).filter(x => x.slug !== slug); d.unshift(n); store.set("ubora_brouillons", d); renderTicker(); location.hash = "#/actualites/" + slug; };
  });
}
function notFound() {
  return pageHead({ eyebrow: "Erreur 404", title: "Cette page n'existe pas.", lead: "Le lien est peut-être ancien. Revenez à l'accueil ou consultez nos actualités.",
    extra: `<div class="btn-row" style="margin-top:26px"><a class="btn btn-lime" href="#/">Accueil</a><a class="btn btn-glass" href="#/actualites">Actualités</a></div>` });
}

/* ==========================================================================
   EFFETS
   ========================================================================== */
let netStop = null;
function startNet() {
  if (netStop) netStop();
  const c = $("#net"); if (!c) return;
  const ctx = c.getContext("2d"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, nodes = [], raf, visible = true;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.round(w * h / 15000));
    nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, r: Math.random() * 1.6 + .8, k: Math.random() }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < 130) { ctx.strokeStyle = `rgba(139,211,70,${(1 - d / 130) * .22})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.fillStyle = a.k > .85 ? "rgba(227,157,99,.9)" : a.k > .5 ? "rgba(155,219,90,.9)" : "rgba(150,185,255,.8)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduce && visible) raf = requestAnimationFrame(draw);
  };
  resize(); draw();
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } });
  io.observe(c);
  window.addEventListener("resize", resize);
  netStop = () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); netStop = null; };
}
let rotTimer = null;
function startRotator() {
  clearInterval(rotTimer);
  const el = $("#rot"); if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const words = el.dataset.words.split("|"); let i = 0;
  rotTimer = setInterval(() => {
    if (!document.body.contains(el)) return clearInterval(rotTimer);
    el.classList.add("out");
    setTimeout(() => { i = (i + 1) % words.length; el.textContent = words[i]; el.classList.remove("out"); }, 350);
  }, 2600);
}
function startReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e, k) => { e.style.transitionDelay = (k % 4) * 70 + "ms"; io.observe(e); });
}
function bindShowcase() {
  const tabs = $$(".tab[data-sol]"); if (!tabs.length) return;
  tabs.forEach(t => t.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    tabs.forEach(x => x.setAttribute("aria-selected", x === t));
    const s = sol(t.dataset.sol), sc = $("#screen");
    sc.innerHTML = `<span class="glow g1"></span><span class="glow g2"></span><div class="fade" style="width:100%;display:grid;place-items:center">${mockFor(s)}</div><span class="screen-note">Données d'exemple</span>`;
  }));
}
function bindSpy() {
  const links = $$(".svc-nav a"); if (!links.length) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle("on", l.dataset.spy === e.target.id)); }), { rootMargin: "-40% 0px -55% 0px" });
  $$(".axe-block").forEach(b => io.observe(b));
}
document.addEventListener("pointermove", e => {
  const card = e.target.closest?.(".axe"); if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", (e.clientX - r.left) + "px"); card.style.setProperty("--my", (e.clientY - r.top) + "px");
});
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#readBar").style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
  $("#toTop").classList.toggle("show", scrollY > 900);
}, { passive: true });
$("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ==========================================================================
   ROUTEUR
   ========================================================================== */
const TITLES = { "": "Accueil", "a-propos": "À propos", avec: "Appui aux AVEC", services: "Expertises", solutions: "Solutions", formations: "Formations", actualites: "Actualités", carrieres: "Carrières", diagnostic: "Diagnostic PME", contact: "Contact", rediger: "Espace équipe", admin: "Administration" };
function route() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [pathPart, anchor] = raw.split("#");
  const [path, qs] = pathPart.split("?");
  const params = new URLSearchParams(qs || "");
  const [base, sub] = path.split("/");
  let html;
  switch (base) {
    case "": html = pageHome(); break;
    case "a-propos": html = pageAbout(); break;
    case "avec": html = pageAvec(); break;
    case "services": html = pageServices(); break;
    case "solutions": html = sub ? pageSolution(sub) : pageSolutions(); break;
    case "formations": html = pageFormations(params); break;
    case "actualites": html = sub ? pageArticle(sub) : pageNews(); break;
    case "carrieres": html = pageCareers(sub); break;
    case "diagnostic": diagState = { i: 0, a: [] }; html = pageDiag(); break;
    case "contact": html = pageContact(params); break;
    case "rediger": html = pageEditor(); break;
    case "admin": html = pageAdmin(); break;
    case "cooperatives": location.replace("#/services#axe-agri"); return;
    default: html = notFound();
  }
  if (netStop) netStop();
  app.innerHTML = `<div class="fade">${html}</div>`;
  const s = base === "solutions" && sub ? sol(sub) : null;
  const art = base === "actualites" && sub ? allNews().find(n => n.slug === sub) : null;
  document.title = (art ? art.titre : s ? s.nom : TITLES[base] || "Page introuvable") + " · Ubora Entreprise Sociale";
  $$("#menu [data-r]").forEach(a => { const on = a.dataset.r === base; a.classList.toggle("current", on); if (a.tagName === "A") on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
  $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
  $$(".has-dd").forEach(x => x.classList.remove("open"));
  if (base === "") { startNet(); startRotator(); bindShowcase(); }
  if (base === "services") bindSpy();
  if (base === "actualites" && !sub) bindNews();
  if (base === "solutions" && sub) bindSimulator();
  if (base === "formations") bindFormations();
  if (base === "diagnostic") renderDiag();
  if (base === "contact") bindContact();
  if (base === "rediger") bindEditor();
  if (base === "admin") bindAdmin();
  $$("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    const url = b.dataset.copy ? location.href.split("#")[0] + b.dataset.copy : location.href;
    try { await navigator.clipboard.writeText(url); toast("Lien copié"); } catch (e) { toast("Copiez le lien depuis la barre d'adresse"); }
  }));
  $$("[data-scroll]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }); }));
  startReveal();
  const target = anchor || (base === "carrieres" && sub ? "offre-" + sub : "");
  if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  else window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

/* ---------- Démarrage ---------- */
$("#burger").addEventListener("click", () => {
  const o = $("#menu").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : "";
});
$("#themeBtn").addEventListener("click", () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark"; store.set("ubora_theme", r.dataset.theme);
});
const savedTheme = store.get("ubora_theme", null); if (savedTheme) document.documentElement.dataset.theme = savedTheme;
$("#waFloat").href = waLink("Bonjour Ubora, je souhaite avoir des informations.");
buildMenu(); buildFooter(); renderTicker(); route();
UboraDB.load().then(() => {
  renderTicker();
  const base = location.hash.replace("#", "").replace("/", "").split("/")[0].split("?")[0];
  if (["", "actualites", "formations", "carrieres"].includes(base)) route();
});
