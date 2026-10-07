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
/* page qui présente un logiciel : sa fiche (/outils/<id>), la page de son pôle, ou à défaut le logiciel lui-même */
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
  const texte = `<nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a>${crumbs.map(([t, h]) => h ? `<span><a href="${h}">${t}</a></span>` : `<span>${t}</span>`).join("")}</nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
      ${extra}`;
  if (ecran) return `<section class="deep page-head has-photo has-ecran"><div class="wrap head-grid">
      <div>${texte}</div>
      <div class="screen head-ecran">${ecran}<span class="mock-note" aria-hidden="true">Écran illustratif</span></div>
    </div></section>`;
  if (!visuel) return `<section class="deep page-head"><div class="wrap">${texte}</div></section>`;
  return `<section class="deep page-head has-photo"><div class="wrap head-grid">
      <div>${texte}</div>
      <figure class="head-photo">${photo(visuel[0], "(max-width: 900px) 100vw, 44vw", visuel[1], ' fetchpriority="high"')}</figure>
    </div></section>`;
}
function bandePhotos() {
  const une = PHOTOS.map(([nom, t]) => `<figure>${photo(nom, "360px", "", ' loading="lazy"')}<figcaption>${esc(t)}</figcaption></figure>`).join("");
  return `<section class="photos" aria-label="Sur le terrain"><div class="photos-track"><div class="photos-move">${une}${une.replace(/<figure>/g, '<figure aria-hidden="true">')}</div></div></section>`;
}
function secHead(eyebrow, title, lead, action) {
  return `<div class="sec-head${action ? " split" : ""}"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ""}</div>${action || ""}</div>`;
}
function statut(o) {
  return o.statut === "en-ligne" ? `<span class="status st-live">En ligne</span>` : `<span class="status st-soon">En préparation</span>`;
}
function poleCard(p, feature, compact) {
  const img = !compact && p.photo;
  return `<article class="pole${feature ? " feature" : ""}${img ? " has-img" : ""}${p.transversal ? " transversal" : ""}" style="--c:${p.couleur}">
    ${img ? `<div class="pole-img">${photo(p.photo[0], feature ? "(max-width: 860px) 100vw, 800px" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px", "", ' loading="lazy"')}</div>` : ""}
    <div class="pole-body">
      <div class="pole-top"><span class="mk">${esc(p.initiales)}</span><span class="pole-sub">${esc(p.sousDomaine)}</span>${p.transversal ? '<span class="pole-tag">Pour tous les pôles</span>' : ""}</div>
      <h3><a class="stretch" href="${p.chemin}">${esc(p.nom)}</a></h3>
      ${p.accroche ? `<p class="accroche">${esc(p.accroche)}</p>` : ""}
      <p>${esc(p.carte)}</p>
      <span class="link">Découvrir le pôle ${ICON.arrow}</span>
    </div>
  </article>`;
}
function outilCard(o) {
  const p = pole(o.pole);
  const href = lienOutil(o);
  return `<article class="tool" style="--c:${o.couleur}" data-f="${o.statut} ${o.pole}">
    <div class="pole-top"><span class="mk">${esc(o.initiales)}</span>${statut(o)}</div>
    <h3><a class="stretch" href="${href}"${ext(href)}>${esc(o.nom)}</a></h3>
    <p>${esc(o.resume)}</p>
    <div class="tool-foot"><span>Pôle ${esc(p.nom)}</span>${o.sousDomaine ? `<span class="mono">${esc(o.sousDomaine)}</span>` : ""}</div>
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
    <div><h3>${esc(t)}</h3><p>${esc(x)}</p><p class="resultat">${esc(r)}</p></div></li>`).join("")}</ol>${long ? plusBtn(`Voir toute la démarche (${list.length} étapes)`) : ""}`;
}
function boiteOutils(b, sujet) {
  if (!b) return "";
  const dispo = b.statut === "disponible";
  return `<section class="band" id="boite"><div class="wrap">
    ${secHead(dispo ? "Boîte à outils" : "Bientôt disponible", esc(b.titre), esc(b.intro))}
    ${(() => {
      const item = ([t, x], i) => `<li><span class="bn">${String(i + 1).padStart(2, "0")}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`;
      const reste = b.outils.slice(6);
      return `<ol class="boite">${b.outils.slice(0, 6).map(item).join("")}</ol>`
        + (reste.length ? `<details class="boite-plus"><summary>Voir les ${reste.length} autres documents</summary><ol class="boite">${reste.map((o, i) => item(o, i + 6)).join("")}</ol></details>` : "");
    })()}
    <div class="notice"><span class="ic">${dispo ? ICON.doc : ICON.bell}</span>
      <div><b>${dispo ? "Recevoir la boîte à outils" : "Être prévenu de sa publication"}</b>
        <p>${dispo ? "Dites-nous qui vous êtes et comment vous comptez l'utiliser. Nous vous envoyons les documents et nous prenons le temps de vous les présenter." : "Laissez-nous vos coordonnées. Nous vous écrirons dès que les documents seront prêts."}</p></div>
      <div class="notice-btns"><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent(sujet)}">${dispo ? "Faire la demande" : "Me prévenir"}</a>
        ${dispo ? `<a class="btn btn-wa btn-sm" href="${waLink("Bonjour Ubora, je souhaite recevoir la " + b.titre.charAt(0).toLowerCase() + b.titre.slice(1) + ".")}" target="_blank" rel="noopener">Par WhatsApp</a>` : ""}</div>
    </div>
  </div></section>`;
}
/* Pérenniser les actions des partenaires au-delà du projet */
const RELAIS = [["Pendant le projet","Nous formons, outillons et suivons les bénéficiaires avec vos équipes. Les données sont tenues dans nos outils dès le premier jour."],["À la clôture","Les groupes, les relais locaux formés, les outils et l'historique restent en place. Rien ne repart de zéro."],["Après le projet","Nous poursuivons le suivi sur le terrain. Notre modèle économique en finance une partie, avec nos propres revenus."]];
function relais(lien) {
  return `<div class="deep relais">
    <div class="relais-txt"><span class="eyebrow">Pour les ONG, les bailleurs et les programmes</span>
      <h2>Le projet se termine. <span class="serif">L'accompagnement continue.</span></h2>
      <p class="lead">Un programme dure deux ou trois ans. Les groupes d'épargne, les entrepreneurs et les coopératives ont besoin d'un suivi plus long. Nous prenons le relais : notre modèle économique finance une partie des activités sur le terrain après la fin du projet.</p>
      ${lien ? `<a class="btn btn-accent" href="/conseil#relais">Préparer la suite de votre projet ${ICON.arrow}</a>` : `<a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent("Partenariat")}">Parlons de votre programme ${ICON.arrow}</a>`}</div>
    <ol class="relais-temps">${RELAIS.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
  </div>`;
}
/* Expertise : ce que le terrain nous a appris, et ce que chacun peut vérifier */
function expertise() {
  const L = CONFIG.legal || {};
  const lecons = [
    ["avec", "Dans un groupe d'épargne, la plupart des conflits naissent de règles jamais écrites. Pas du manque d'argent.", "Alors nous écrivons les règles avec le groupe, et AKIBA rend chaque compte vérifiable par tous les membres."],
    ["financement", "Étudier un crédit de 500 dollars coûte presque autant qu'un crédit de 50 000. Voilà pourquoi les petits emprunteurs sont oubliés.", "Alors Ubora Fin prête au groupe entier, pas dossier par dossier, en s'appuyant sur son historique d'épargne."],
    ["marche", "Le maillon qui casse le plus souvent n'est ni la production ni le crédit. C'est la vente.", "Alors nous cherchons l'acheteur avant la récolte, et nous suivons la vente jusqu'au paiement du producteur."]
  ];
  const preuves = [
    [String(OUTILS.filter(o => o.statut === "en-ligne").length), "outils en ligne", "AKIBA, le générateur de business plan, Ubora Hub et l'Académie Ubora. Essayez-les avant même de nous appeler.", "/outils", "Les essayer"],
    [String(pole("avec").boite.outils.length), "documents de terrain", "La boîte à outils AVEC, de l'étude de référence jusqu'au partage de fin de cycle.", "/avec#boite", "La demander"],
    [String(METHODE.etapes.length), "temps de méthode", "Toujours dans le même ordre, et pour chacun la raison qui le justifie en RDC.", "/approche", "Lire la méthode"],
    [ICON.check, "entreprise immatriculée", [L.rccm && "RCCM " + L.rccm, L.idnat && "ID NAT " + L.idnat].filter(Boolean).join(" · "), "/mentions", "Nos mentions légales"]
  ];
  return `<div class="lecons">${lecons.map(([id, q, r]) => { const p = pole(id); return `<figure class="lecon reveal" style="--c:${p.couleur}"><span class="lecon-pole">${esc(p.nom)}</span><blockquote>${esc(q)}</blockquote><figcaption>${esc(r)}</figcaption><a class="link" href="${p.chemin}" aria-label="Voir comment : ${esc(p.nom)}">Voir comment ${ICON.arrow}</a></figure>`; }).join("")}</div>
    <ul class="preuves" aria-label="À vérifier par vous-même">${preuves.map(([n, t, x, h, l]) => `<li><b>${n}</b><span class="preuve-t">${esc(t)}</span><p>${esc(x)}</p><a class="link" href="${h}">${esc(l)} ${ICON.arrow}</a></li>`).join("")}</ul>`;
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
    <h2>Parlons de ce que vous voulez faire avancer.</h2>
    <p>Un groupe à structurer, un programme à lancer, un crédit à obtenir, un acheteur à trouver : dites-nous où vous en êtes. Une personne de l'équipe vous répond sous deux jours ouvrés.</p>
    <div class="btn-row"><a class="btn btn-wa" href="${waLink("Bonjour Ubora, je souhaite échanger avec vous.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a><a class="btn btn-glass" href="/contact">Nous écrire</a></div></div>`;
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
/* pôle d'une réalisation ; « conseil » regroupe les missions pour les ONG et les bailleurs */
const poleReal = id => pole(id) || { id: "conseil", nom: "Conseil et programmes", initiales: "Cp", couleur: "#0F3170", chemin: "/conseil" };
function realCard(r) {
  const p = poleReal(r.pole);
  return `<article class="real reveal" style="--c:${p.couleur}">
    ${r.image ? `<img class="real-img" src="${esc(r.image)}" alt="" loading="lazy">` : `<div class="real-img real-cover"><span class="mk">${esc(p.initiales)}</span></div>`}
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
  return `
    <li><a href="/" data-r="">Accueil</a></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="a-propos" aria-expanded="false">Ubora ${ICON.chev}</button>
      <div class="dd dd-list">
        <a href="/a-propos"><b>Qui sommes-nous</b><small>Mission, modèle social, valeurs</small></a>
        <a href="/equipe"><b>Notre équipe</b><small>Les personnes derrière Ubora</small></a>
        <a href="/approche"><b>Notre approche</b><small>La méthode Ubora</small></a>
        <a href="/carrieres"><b>Carrières</b><small>Rejoindre l'équipe</small></a>
      </div></li>
    <li class="has-dd"><button class="dd-btn" type="button" data-r="poles" aria-expanded="false">Pôles et outils ${ICON.chev}</button>
      <div class="dd dd-mega">
        <div class="dd-col dd-poles"><h5>Nos pôles</h5><div class="dd-grille">${POLES.map(p => `<a href="${p.chemin}" class="dd-item${p.transversal ? " large" : ""}"><span class="mk" style="background:${p.couleur}">${p.initiales}</span><span><b>${esc(p.nom)}</b><small>${esc(p.accroche)}</small></span></a>`).join("")}</div></div>
        <div class="dd-col dd-outils"><h5>Nos logiciels</h5>${OUTILS.filter(o => o.statut === "en-ligne").map(o => `<a href="${lienOutil(o)}" class="dd-item"><span class="mk" style="background:${o.couleur}">${o.initiales}</span><span><b>${esc(o.nom)}</b><small>${esc(o.court || o.sousDomaine)}</small></span></a>`).join("")}</div>
        <div class="dd-pied"><a href="/outils" class="dd-more">Tous les outils ${ICON.arrow}</a></div>
      </div></li>
    <li><a href="/conseil" data-r="conseil">Conseil</a></li>
    <li><a href="/formations" data-r="formations">Formations</a></li>
    ${/* une rubrique encore vide n'encombre pas le menu : elle y revient dès qu'elle a du contenu */ ""}${DATA.realisations.length ? `<li><a href="/realisations" data-r="realisations">Réalisations</a></li>` : ""}
    ${allNews().length ? `<li><a href="/actualites" data-r="actualites">Actualités</a></li>` : ""}
    <li class="m-cta"><a class="btn btn-accent" href="/contact">Nous contacter</a></li>`;
}
function footerHTML() {
  const L = CONFIG.legal || {};
  const legal = [L.rccm && "RCCM " + L.rccm, L.idnat && "ID NAT " + L.idnat].filter(Boolean).join(" · ");
  const tel = CONFIG.telephone.replace(/\s/g, "");
  return `<div class="wrap">
    <div class="foot-news">
      <div class="foot-news-txt"><b>Nouvelles du terrain</b><span>Recevez nos nouvelles par e-mail.</span></div>
      <form class="news-form" id="newsForm" aria-label="Lettre d'information">
        <label class="news-label" for="nlEmail">Votre adresse e-mail</label>
        <div class="news-row"><input id="nlEmail" type="email" required maxlength="160" autocomplete="email" placeholder="Votre adresse e-mail"><input class="hp" id="nlSite" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn btn-accent btn-sm" type="submit">S'inscrire</button></div>
      </form>
    </div>
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="/"><img class="logo-img" src="/logo-ubora.png" alt="" width="56" height="56" loading="lazy"><span class="brand-txt"><span class="brand-name">Ub<b>o</b>ra</span><span class="brand-sub">Entreprise sociale</span></span></a>
        <p class="foot-accroche">Basée à Lubumbashi, présente partout en RDC.</p>
      </div>
      <nav aria-label="Nos pôles"><h4>Nos pôles</h4><ul class="deux">${POLES.map(p => `<li><a class="foot-pole" href="${p.chemin}" style="--c:${p.couleur}">${esc(p.nom)}</a></li>`).join("")}</ul></nav>
      <nav aria-label="Ubora"><h4>Ubora</h4><ul class="deux"><li><a href="/a-propos">Qui sommes-nous</a></li><li><a href="/equipe">Notre équipe</a></li><li><a href="/approche">Notre approche</a></li><li><a href="/conseil">Conseil</a></li><li><a href="/outils">Outils numériques</a></li><li><a href="/formations">Formations</a></li>${DATA.realisations.length ? `<li><a href="/realisations">Nos réalisations</a></li>` : ""}${allNews().length ? `<li><a href="/actualites">Actualités</a></li>` : ""}<li><a href="/carrieres">Carrières</a></li></ul></nav>
      <div class="foot-contact"><h4>Nous joindre</h4><ul>
        <li><span class="ic">${ICON.phone}</span><a href="tel:${tel}">${esc(CONFIG.telephone)}</a></li>
        <li><span class="ic">${ICON.mail}</span><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>
        <li><span class="ic">${ICON.pin}</span><span>${esc(CONFIG.adresse)}</span></li></ul>
        <a class="btn btn-wa btn-sm foot-wa" href="${waLink("Bonjour Ubora, je souhaite échanger avec vous.")}" target="_blank" rel="noopener">Écrire sur WhatsApp</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} Ubora, entreprise sociale${legal ? ` · <span class="foot-legal">${esc(legal)}</span>` : ""}</span>
      <span class="foot-links"><a href="/mentions">Mentions légales</a><a href="https://admin.uborardc.com" rel="nofollow">Espace équipe</a></span>
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
function pageHome() {
  const news = allNews().slice(0, 3);
  return `
  <section class="deep hero">
    <div class="wrap hero-grid">
      <div>
        <h1 class="pill"><b>Ubora</b> Entreprise sociale à Lubumbashi, partout en RDC</h1>
        <p class="hero-titre">Des familles qui épargnent, des entrepreneurs qui vendent, des coopératives qui <span class="serif">durent</span>.</p>
        <p class="lead">Partout en RDC, nous formons, outillons et suivons les groupes d'épargne, les entrepreneurs et les coopératives. Nous les relions aux institutions financières et aux acheteurs, et nous agissons pour l'environnement. Sur le terrain, avec des outils qui marchent sans réseau. Et nous restons quand le projet qui nous a fait venir se termine.</p>
        <div class="btn-row"><a class="btn btn-accent" href="#poles" data-scroll="poles">Découvrir nos pôles ${ICON.arrow}</a><a class="btn btn-glass" href="/contact">Nous contacter</a></div>
      </div>
      <div class="stage stage-photo">
        <span class="pierre" aria-hidden="true"></span>
        <figure class="hero-photo">${photo("avec", "(max-width: 1080px) 100vw, 40vw", "Des femmes réunies en groupe, en pagnes colorés", ' fetchpriority="high"')}</figure>
        ${mockAkiba()}
        <div class="float-card" aria-hidden="true"><span class="ic">${ICON.check}</span><span><b>Reçu imprimé</b>Membre 07 · épargne 20 000 FC</span></div>
        <span class="mock-note" aria-hidden="true">Application AKIBA, écran illustratif</span></div>
    </div>
    <div class="wrap"><ul class="reperes">
      <li><b>${POLES.length}</b><span>pôles d'intervention</span></li>
      <li><b>${OUTILS.filter(o => o.statut === "en-ligne").length}</b><span>outils numériques en ligne</span></li>
      <li><b>${pole("avec").boite.outils.length}</b><span>documents dans la boîte à outils AVEC</span></li>
      <li><b>RDC</b><span>siège à Lubumbashi, interventions dans tout le pays</span></li>
    </ul></div>
  </section>

  <section id="poles"><div class="wrap">
    ${secHead("Nos pôles", `De la première épargne au premier <span class="serif">contrat de vente</span>`, "Chaque pôle tient un maillon, tous se passent le relais, et notre Académie forme chacun en chemin.")}
    <div class="poles">${POLES.map(p => poleCard(p)).join("")}</div>
  </div></section>

  <section class="tight-top" id="expertise"><div class="wrap">
    ${secHead("Notre expertise", `Ce que le terrain nous a <span class="serif">appris</span>`, "Des années auprès des groupes d'épargne, des entrepreneurs et des coopératives nous ont laissé quelques leçons simples.")}
    ${expertise()}
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
      <li><span class="bn">3</span><div><b>L'argent circule jusqu'aux groupes</b><span>Par Ubora Fin, nous levons des fonds auprès des financeurs et les prêtons aux AVEC en fonds de roulement. Ce qui est remboursé finance d'autres groupes.</span></div></li>
      <li><span class="bn">4</span><div><b>Les excédents sont réinvestis</b><span>Dans nos outils, dans la formation de relais locaux et dans notre présence sur le terrain.</span></div></li>
    </ol>
  </div></section>

  <section><div class="wrap">${relais(true)}</div></section>

  <section class="tight-top"><div class="wrap">
    ${secHead("Nos outils numériques", `Des outils faits pour le <span class="serif">terrain</span> congolais`, "", `<a class="btn btn-ghost" href="/outils">Voir tous les outils ${ICON.arrow}</a>`)}
    <div class="tools-mini">${OUTILS.filter(o => o.statut === "en-ligne").map(o => `<a class="tool-mini" href="${lienOutil(o)}" style="--c:${o.couleur}"><span class="mk">${esc(o.initiales)}</span><span><b>${esc(o.nom)}</b><small>${esc(o.court || "")}</small></span>${ICON.arrow}</a>`).join("")}</div>
  </div></section>

  ${DATA.realisations.length ? `<section><div class="wrap">
    ${secHead("Nos réalisations", `Ce que nous avons <span class="serif">fait</span>`, "", `<a class="btn btn-ghost" href="/realisations">Toutes les réalisations ${ICON.arrow}</a>`)}
    <div class="real-grid">${DATA.realisations.slice(0, 3).map(realCard).join("")}</div>
  </div></section>` : ""}

  ${news.length ? `<section><div class="wrap">
    ${secHead("Actualités", "Nouvelles du terrain", "", `<a class="btn btn-ghost" href="/actualites">Toutes les actualités ${ICON.arrow}</a>`)}
    <div class="news-grid">${news.map(newsCard).join("")}</div>
  </div></section>` : ""}

  <section><div class="wrap">${finalCta()}</div></section>`;
}

function teamBand(surPageEquipe) {
  return `<div class="deep team-band">
    <div><span class="eyebrow">${surPageEquipe ? "Ce qui nous rassemble" : "Notre équipe"}</span>
      <h2>Une équipe qui a de l'expérience et qui connaît le terrain.</h2>
      <p class="lead">Consultants, formateurs et développeurs, nous avons accompagné des entrepreneurs, des groupes d'épargne, des coopératives et des institutions financières. Nous connaissons les réalités de nos bénéficiaires parce que nous les vivons aussi.</p>
      <div class="btn-row">${surPageEquipe ? "" : `<a class="btn btn-accent" href="/equipe">Rencontrer l'équipe ${ICON.arrow}</a>`}<a class="btn btn-glass" href="/carrieres">Nous rejoindre</a></div></div>
    <ul class="team-list">
      <li><span class="ic">${ICON.map}</span><div><b>L'expérience du terrain</b><span>Des années d'accompagnement en RDC, dans plusieurs provinces.</span></div></li>
      <li><span class="ic">${ICON.spark}</span><div><b>Deux compétences réunies</b><span>La finance, la gestion et l'agriculture d'un côté, le numérique de l'autre.</span></div></li>
      <li><span class="ic">${ICON.users}</span><div><b>La proximité</b><span>Sur place quand il le faut, joignables sur WhatsApp le reste du temps.</span></div></li>
      <li><span class="ic">${ICON.handshake}</span><div><b>Un réseau</b><span>Des liens avec les microfinances, les bailleurs et les acteurs publics.</span></div></li>
    </ul></div>`;
}

function pageAbout() {
  return pageHead({ eyebrow: "Qui sommes-nous", title: `Une entreprise sociale, pour que l'effort des familles <span class="serif">porte ses fruits</span>.`, crumbs: [["Qui sommes-nous"]], photo: ["terrain", "Une communauté réunie en plein air"],
    lead: "Ubora veut dire « excellence » en swahili. C'est une exigence que nous nous imposons, parce que les personnes que nous accompagnons n'ont pas droit à l'erreur : une mauvaise récolte, la chute du franc ou une maladie peuvent effacer des années d'efforts. Nés à Lubumbashi, nous travaillons dans toute la RDC pour rendre leurs activités assez solides pour tenir, puis grandir." }) + `
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
    <div class="grid-4">
      <div class="fcard"><span class="ic">${ICON.briefcase}</span><h3>Qui paie</h3><p>Les ONG, les bailleurs, les institutions financières, les incubateurs et les programmes publics ou privés qui nous confient des missions.</p></div>
      <div class="fcard"><span class="ic">${ICON.heart}</span><h3>Qui en bénéficie</h3><p>Les groupes d'épargne, les femmes et les jeunes entrepreneurs, les producteurs ruraux, qui accèdent à nos services à tarif solidaire.</p></div>
      <div class="fcard"><span class="ic">${ICON.coins}</span><h3>Ce que nous prêtons</h3><p>Par Ubora Fin, un fonds de roulement pour les AVEC que nous accompagnons, grâce à des fonds levés auprès d'institutions et d'investisseurs. Ce qui est remboursé repart vers d'autres groupes.</p></div>
      <div class="fcard"><span class="ic">${ICON.spark}</span><h3>Ce que nous réinvestissons</h3><p>Nos outils, la formation de relais locaux, et le suivi sur le terrain quand le projet d'un partenaire s'achève.</p></div>
    </div>
    <p class="note">Être rentables n'est pas une fin en soi. C'est ce qui nous permet d'être encore là au cycle suivant.</p>
  </div></section>

  <section><div class="wrap">
    ${secHead("Nos valeurs", `Quatre mots <span class="serif">swahili</span> qui nous guident`)}
    <div class="grid-4">
      <div class="value"><small lang="sw">ubora</small><h3>L'excellence</h3><p>Un travail sérieux et des outils fiables. Nos bénéficiaires ne méritent pas moins.</p></div>
      <div class="value"><small lang="sw">ustahimilivu</small><h3>La résilience</h3><p>Aider les familles et les entreprises à traverser les crises, puis à repartir.</p></div>
      <div class="value"><small lang="sw">uwazi</small><h3>La transparence</h3><p>Des comptes clairs et des données partagées. La confiance se construit ainsi.</p></div>
      <div class="value"><small lang="sw">umoja</small><h3>La solidarité</h3><p>Personne n'est laissé de côté. Les femmes, les jeunes et les zones rurales d'abord.</p></div>
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

  <section id="faq"><div class="wrap">${secHead("Questions fréquentes", "Vous vous demandez peut-être")}${faq(FAQ)}</div></section>`;
}

function pageApproche() {
  return pageHead({ eyebrow: "Notre approche", title: `Former sans outiller ne suffit pas. Outiller sans accompagner non plus.`, crumbs: [["Notre approche"]],
    lead: METHODE.intro }) + `
  <section><div class="wrap">
    ${secHead(METHODE.nom, "Six temps, toujours dans le même ordre")}
    <ol class="steps">${METHODE.etapes.map((e, i) => `<li class="reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p><details class="why"><summary>Pourquoi en RDC</summary><p>${esc(e.pourquoi)}</p></details></li>`).join("")}</ol>
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
    <div class="poles poles-sm">${POLES.map(p => poleCard(p, false, true)).join("")}</div>
  </div></section>

  <section class="tight-top"><div class="wrap">${finalCta()}</div></section>`;
}

/* ---------- Page d'un pôle ---------- */
function pagePole(id) {
  const P = pole(id); if (!P) return notFound();
  const outilsLies = (P.outils || []).map(outil).filter(Boolean);
  const enLigne = outilsLies.filter(o => o.statut === "en-ligne");
  const reals = DATA.realisations.filter(r => r.pole === P.id);
  return pageHead({
    eyebrow: esc(P.nom), title: P.titre, lead: esc(P.lead), crumbs: [["Nos pôles", "/#poles"], [esc(P.nom)]], photo: P.photo,
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(P.nom)}">Parler de votre projet ${ICON.arrow}</a>
      ${P.boite ? `<a class="btn btn-glass" href="#boite" data-scroll="boite">La boîte à outils</a>` : ""}
      ${enLigne.filter(o => o.pole === P.id).map(o => lienOutil(o) === P.chemin ? `<a class="btn btn-glass" href="${o.url}" target="_blank" rel="noopener">Ouvrir ${esc(o.nom)} ${ICON.ext}</a>` : `<a class="btn btn-glass" href="${lienOutil(o)}">Découvrir ${esc(o.nom)} ${ICON.arrow}</a>`).join("")}</div>
      <span class="sub-chip">${esc(P.sousDomaine)}</span>`
  }) + `

  <section><div class="wrap two">
    <div>
      <span class="eyebrow">Le contexte en RDC</span>
      <h2 class="h2-md">Ce que nous constatons sur le terrain</h2>
      <p class="lead">${esc(P.contexte.intro)}</p>
      ${P.avec ? `<details class="definition"><summary>Qu'est-ce qu'une AVEC ?</summary><p>${esc(AVEC.definition)}</p></details>` : ""}
    </div>
    <div class="panel">${constats(P.contexte.constats)}</div>
  </div></section>

  ${P.programmes ? `<section class="band"><div class="wrap">
    ${secHead(P.programmesTitre ? P.programmesTitre[0] : "Nos programmes", P.programmesTitre ? P.programmesTitre[1] : "Trois programmes, selon le stade de l'entreprise")}
    <div class="grid-3">${P.programmes.map(([t, q, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p class="sub">${esc(q)}</p><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.entrees ? `<section class="band"><div class="wrap">
    ${secHead("Deux points de départ", "Nous partons toujours de ce qui existe")}
    <div class="grid-2">${P.entrees.map(([t, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
  </div></section>` : ""}

  ${P.chaine ? `<section id="chaine"><div class="wrap">
    ${secHead("Chaîne de valeur", esc(P.chaine.titre), esc(P.chaine.intro))}
    <ol class="chaine">${P.chaine.maillons.map(([t, x, r], i) => `<li class="reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${esc(x)}</p><p class="resultat">${esc(r)}</p></li>`).join("")}</ol>
  </div></section>` : ""}

  <section${(P.programmes || P.entrees) && !P.chaine ? "" : ' class="band"'}><div class="wrap">
    ${secHead("Notre démarche", "Étape par étape", "Chaque étape doit produire un résultat concret avant que l'on passe à la suivante.")}
    ${parcoursList(P.parcours)}
  </div></section>

  ${P.avec ? `<section class="band"><div class="wrap">
    ${secHead("Digitalisation", `Ce qui change avec <span class="serif">AKIBA</span>`, "Le groupe garde ses règles et ses réunions. Seule la tenue des comptes change, et tout le monde peut désormais la vérifier.")}
    <ul class="checks cols">${outil("akiba").points.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <p class="suite"><a class="btn btn-primary" href="/outils/akiba">Découvrir AKIBA ${ICON.arrow}</a></p>
  </div></section>
  <section><div class="wrap">
    ${secHead("Vers le crédit", `Transformer la discipline d'un groupe en <span class="serif">accès au crédit</span>`, "Un groupe qui épargne depuis trois ans reste invisible pour une banque s'il ne peut rien prouver. Notre rôle est de rendre cette régularité lisible.")}
    <ol class="bridge">${AVEC.passerelle.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <p class="suite"><a class="link" href="/financement#intermediation">Comment Ubora Fin finance les groupes ${ICON.arrow}</a></p>
  </div></section>` : ""}

  ${P.intermediation ? `<section id="intermediation"><div class="wrap">
    ${secHead("Notre rôle d'intermédiaire", esc(P.intermediation.titre), esc(P.intermediation.intro))}
    <div class="flux" role="group" aria-label="Circulation des fonds">
      <span>Institutions financières, investisseurs, bailleurs</span><i aria-hidden="true">${ICON.arrow}</i>
      <span class="on">Ubora Fin</span><i aria-hidden="true">${ICON.arrow}</i>
      <span>AVEC</span><i aria-hidden="true">${ICON.arrow}</i><span>Membres</span>
    </div>
    <ol class="bridge">${P.intermediation.etapes.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <div class="grid-3 gains">${P.intermediation.gains.map(([t, x]) => `<div class="fcard reveal"><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>
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

  ${reals.length ? `<section class="band"><div class="wrap">
    ${secHead("Sur le terrain", `Nos réalisations avec ${esc(P.nom)}`, "", `<a class="btn btn-ghost" href="/realisations?pole=${P.id}">Toutes ${ICON.arrow}</a>`)}
    <div class="real-grid">${reals.slice(0, 3).map(realCard).join("")}</div>
  </div></section>` : ""}

  <section><div class="wrap">
    ${outilsLies.length ? `${secHead("Outils et publics", `Les outils du pôle ${esc(P.nom)}`)}
    <div class="tools">${outilsLies.map(outilCard).join("")}</div>` : secHead("Nos publics", "Avec qui nous travaillons")}
    <div class="publics"><b>Pour qui</b>${P.publics.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>

  ${boiteOutils(P.boite, P.boite ? P.boite.titre : P.nom)}

  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageOutils() {
  return pageHead({ eyebrow: "Nos outils", title: `Des outils qui tiennent là où le réseau <span class="serif">lâche</span>.`, crumbs: [["Nos outils"]],
    lead: "Pas de réseau au village ? Des utilisateurs qui n'ont jamais ouvert un tableur ? Nos logiciels sont conçus pour cela, et chacun est livré avec une formation. Choisissez-en un pour le découvrir." }) + `
  <section><div class="wrap">
    ${filtres("Filtrer les outils", [["en-ligne", "En ligne"], ["en-cours", "En préparation"], ...[...new Set(OUTILS.map(o => o.pole))].map(id => [id, pole(id).nom])])}
    <div class="tools">${OUTILS.map(outilCard).join("")}</div>
  </div></section>
  <section class="tight-top"><div class="wrap">${finalCta()}</div></section>`;
}

/* ---------- Page de présentation d'un logiciel (/outils/<id>) ---------- */
function pageOutil(o) {
  const F = o.fiche, p = pole(o.pole);
  const inscription = o.inscription ? (o.inscriptionOuverte
    ? `<a class="btn btn-accent" href="${o.inscription}" target="_blank" rel="noopener">Inscrire mon incubateur ${ICON.ext}</a>`
    : `<a class="btn btn-accent" href="/contact?sujet=${encodeURIComponent(o.nom)}">Demander un accès ${ICON.arrow}</a>`) : "";
  const ouvrir = classe => `<a class="btn ${classe}" href="${o.url}" target="_blank" rel="noopener">${esc(F.ouvrir)} ${ICON.ext}</a>`;
  return pageHead({
    eyebrow: esc(o.nom), title: F.titre, lead: esc(o.resume), crumbs: [["Nos outils", "/outils"], [esc(o.nom)]], ecran: mockFor(o.mock),
    extra: `<div class="btn-row">${inscription}${ouvrir(inscription ? "btn-glass" : "btn-accent")}</div><span class="sub-chip">${esc(o.sousDomaine)}</span>`
  }) + `

  <section><div class="wrap">
    ${secHead("Ce que fait " + esc(o.nom), esc(F.atouts))}
    ${F.fonctions
      ? `<div class="grid-3">${F.fonctions.map(([t, x], i) => `<div class="fcard fonction reveal"><span class="pn">${String(i + 1).padStart(2, "0")}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`).join("")}</div>`
      : `<div class="panel"><ul class="checks cols">${o.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`}
    ${F.phases ? `<div class="flux phases" role="group" aria-label="Le parcours de l'entrepreneur"><b>Le parcours de l'entrepreneur</b>${F.phases.map(x => `<span>${esc(x)}</span>`).join(`<i aria-hidden="true">${ICON.arrow}</i>`)}</div>` : ""}
    <div class="publics"><b>Pour qui</b>${F.pour.map(x => `<span>${esc(x)}</span>`).join("")}</div>
  </div></section>

  ${o.id === "akiba" ? `<section class="band"><div class="wrap">
    ${secHead("Avant, après", `Ce qui change avec <span class="serif">AKIBA</span>`, "Le groupe garde ses règles et ses réunions. Seule la tenue des comptes change, et tout le monde peut désormais la vérifier.")}
    <div class="table-wrap replie"><table class="compare"><thead><tr><th></th><th>Avec le cahier</th><th>Avec AKIBA</th></tr></thead>
      <tbody>${AVEC.avantApres.map(([q, x, y]) => `<tr><th scope="row">${esc(q)}</th><td>${esc(x)}</td><td class="ok">${esc(y)}</td></tr>`).join("")}</tbody></table></div>${plusBtn("Voir toute la comparaison")}
  </div></section>` : ""}

  <section id="acces"><div class="wrap">
    ${secHead("Pour commencer", esc(F.accesTitre || "Trois étapes pour démarrer"))}
    <ol class="bridge">${F.acces.map(([t, x], i) => `<li><span class="bn">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol>
    <div class="btn-row centre">${inscription || ouvrir("btn-primary")}${inscription ? ouvrir("btn-ghost") : `<a class="btn btn-ghost" href="/contact?sujet=${encodeURIComponent(o.nom)}">Nous écrire</a>`}</div>
    <p class="suite">Ce logiciel accompagne le pôle <a class="link" href="${p.chemin}">${esc(p.nom)}</a>.</p>
  </div></section>`;
}

function pageConseil() {
  return pageHead({ eyebrow: "Conseil et programmes", title: `Vos programmes méritent de durer plus longtemps que leur <span class="serif">financement</span>.`, crumbs: [["Conseil et programmes"]],
    lead: "Vous accompagnez des groupes, des entrepreneurs ou des coopératives en RDC ? Nous concevons votre programme, le conduisons avec vous, équipons vos équipes, mesurons les résultats, et nous restons quand le financement s'arrête." }) + `
  <section><div class="wrap grid-2">${CONSEIL.map(s => `<article class="svc reveal" id="${s.id}"><span class="ic">${ICON[s.ico]}</span><div><h2>${esc(s.titre)}</h2><p>${esc(s.texte)}</p><details class="inclus"><summary>Ce que cela comprend</summary><ul class="checks">${s.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details></div></article>`).join("")}</div></section>
  <section id="relais" class="tight-top"><div class="wrap">${relais(false)}</div></section>
  <section class="band"><div class="wrap">
    ${secHead("Nos pôles au service de votre programme", "Vous pouvez aussi mobiliser directement l'un de nos pôles")}
    <div class="poles poles-sm">${POLES.map(p => poleCard(p, false, true)).join("")}</div>
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageFormations() {
  const t = todayISO();
  const sessions = [...DATA.formations].filter(f => f.date >= t).sort((a, b) => a.date.localeCompare(b.date));
  return pageHead({ eyebrow: "Formations", title: `Apprendre à utiliser les outils, puis à s'en servir seul.`, crumbs: [["Formations"]], photo: ["formation", "Un formateur s'adresse à un groupe dans une salle"],
    lead: "Chaque déploiement comprend une formation de prise en main et un suivi. Nous organisons aussi des sessions à Lubumbashi, dans votre province ou en ligne, et notre Académie propose plus de 100 cours en ligne avec certificat." }) + `
  <section id="academie"><div class="wrap">
    <div class="academie">
      <div class="academie-txt">
        <span class="eyebrow">Académie Ubora</span>
        <h2>Se former à son rythme, même sans réseau</h2>
        <p class="lead">Plus de 100 cours regroupés en parcours, écrits à partir de nos documents de terrain : leçons illustrées, exercices corrigés automatiquement, quiz chronométrés, badges et certificats vérifiables. Un cours téléchargé fonctionne sans réseau ; les résultats partent dès que la connexion revient.</p>
        <div class="btn-row"><a class="btn btn-primary" href="/academie">Découvrir Ubora Académie ${ICON.arrow}</a><a class="btn btn-ghost" href="${ACADEMIE.url}" target="_blank" rel="noopener">Ouvrir l'Académie ${ICON.ext}</a></div>
      </div>
      <div class="screen">${mockFor("academie")}<span class="mock-note" aria-hidden="true">Écran illustratif</span></div>
    </div>
  </div></section>
  <section class="tight-top"><div class="wrap">
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
    ${filtres("Filtrer par pôle", [...new Set(CATALOGUE.map(c => c[1]))].map(id => [id, pole(id).nom]))}
    <div class="grid-3">${CATALOGUE.map(([t, pid, x]) => { const p = pole(pid); return `<div class="fcard reveal" data-f="${pid}"><span class="tag" style="background:${p.couleur};color:#fff">${esc(p.nom)}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></div>`; }).join("")}</div>
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
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
function pageEquipe() {
  const membres = DATA.equipe;
  return pageHead({ eyebrow: "Notre équipe", title: `Des gens de terrain, et des <span class="serif">spécialistes</span>.`, crumbs: [["Qui sommes-nous", "/a-propos"], ["Notre équipe"]],
    lead: "Consultants, formateurs, agents de terrain et développeurs : l'équipe qui accompagne les groupes d'épargne, les entrepreneurs et les coopératives, partout en RDC." }) + `
  <section><div class="wrap">${profilDirigeant()}</div></section>
  ${membres.length ? `<section class="band"><div class="wrap">
    ${secHead("L'équipe", "Celles et ceux qui travaillent avec lui")}
    <div class="team-grid">${membres.map(memberCard).join("")}</div>
  </div></section>` : ""}
  <section class="tight-top"><div class="wrap">${teamBand(true)}</div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
}

function pageRealisations(params) {
  const tout = DATA.realisations;
  const filtre = (params && params.get("pole")) || "";
  const liste = filtre ? tout.filter(r => r.pole === filtre) : tout;
  const presents = [...new Set(tout.map(r => r.pole))];
  return pageHead({ eyebrow: "Nos réalisations", title: `Ce que nous avons fait, et ce que cela a <span class="serif">changé</span>.`, crumbs: [["Nos réalisations"]],
    lead: "Des programmes menés avec des ONG, des bailleurs, des institutions financières et des communautés, partout en RDC. Pour chacun : le contexte, ce que nous avons fait et les résultats obtenus." }) + `
  <section><div class="wrap">
    ${presents.length > 1 ? `<nav class="chips filtres" aria-label="Filtrer par pôle"><a class="chip" href="/realisations"${filtre ? "" : ' aria-current="page"'}>Toutes</a>${presents.map(id => `<a class="chip" href="/realisations?pole=${id}"${filtre === id ? ' aria-current="page"' : ""}>${esc(poleReal(id).nom)}</a>`).join("")}</nav>` : ""}
    ${liste.length ? `<div class="real-grid">${liste.map(realCard).join("")}</div>`
      : `<div class="empty"><b>Nos réalisations seront présentées ici prochainement.</b><p>Vous préparez un programme avec des groupes d'épargne, des entrepreneurs ou des coopératives ? Parlons de ce que nous pouvons faire ensemble.</p><a class="btn btn-primary" href="/contact?sujet=${encodeURIComponent("Partenariat")}">Nous écrire</a></div>`}
  </div></section>
  <section><div class="wrap">${finalCta()}</div></section>`;
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
  const besoins = ["Ubora AVEC (groupes d'épargne)", "Ubora PME (entrepreneuriat)", "Ubora Coop (coopératives)", "Ubora Fin (accès au financement)", "Ubora Market (accès au marché)", "Ubora Vert (environnement)", "Ubora Académie (formations)", "Boîte à outils", "Conseil et programmes", "Formation", "Partenariat", "Recrutement", "Autre"];
  const low = sujet.toLowerCase();
  const sel = !low ? "" : low.includes("boîte") || low.startsWith("les outils de") ? "Boîte à outils"
    : besoins.find(b => low.includes(b.split(" (")[0].toLowerCase()) || b.toLowerCase().includes(low)) || "Autre";
  return pageHead({ eyebrow: "Contact", title: `<span lang="sw">Karibu</span>. Parlons de votre <span class="serif">projet</span>.`, crumbs: [["Contact"]],
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
        <label class="full">Objet<select id="c-besoin"><option value="" disabled${sel ? "" : " selected"}>Choisissez un objet</option>${besoins.map(b => `<option${b === sel ? " selected" : ""}>${esc(b)}</option>`).join("")}</select></label>
        <label class="full">Message<textarea id="c-msg" required maxlength="3000" placeholder="Présentez-vous en quelques lignes et dites-nous ce dont vous avez besoin.">${sujet && sujet !== sel ? esc(sujet) : ""}</textarea></label>
        <input class="hp" id="c-site" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="form-err full" id="c-err" role="alert"></p>
        <div class="full"><button class="btn btn-primary" type="submit">Envoyer ${ICON.arrow}</button></div>
      </form>
      <div id="sent" tabindex="-1" hidden></div>
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
    <h2>Cookies et mesure des visites</h2><p>Le site n'utilise aucun cookie. Nous comptons les visites pour savoir quelles pages sont lues : la page consultée, le site d'où vous venez, votre pays et le type d'appareil. Nous n'enregistrons ni votre adresse IP ni rien qui permette de vous reconnaître. Votre navigateur garde seulement votre choix d'affichage clair ou sombre et la date de votre dernière visite.</p>
    <h2>Photos</h2><p>Les photos d'ambiance du site proviennent de la banque d'images Unsplash et sont utilisées selon sa licence. Elles illustrent nos domaines d'intervention et ne représentent pas des bénéficiaires ni des projets d'Ubora. Les photos des pages « Notre équipe » et « Nos réalisations » sont les nôtres.</p>
    <h2>Propriété intellectuelle</h2><p>Le logo, les noms Ubora AVEC, Ubora PME, Ubora Coop, Ubora Fin, Ubora Market, Ubora Vert, Ubora Académie et AKIBA, ainsi que les textes et les documents de ce site, appartiennent à Ubora. Toute reproduction sans autorisation est interdite.</p>
  </div></section>`;
}

function notFound() {
  return pageHead({ eyebrow: "Page introuvable", title: "Cette page n'existe pas, ou plus.", lead: "Le lien est peut-être ancien. Vous pouvez repartir de l'accueil ou nous écrire.",
    extra: `<div class="btn-row"><a class="btn btn-accent" href="/">Retour à l'accueil</a><a class="btn btn-glass" href="/contact">Nous contacter</a></div>` });
}

/* ==========================================================================
   ROUTAGE
   ========================================================================== */
const SOUS_DOMAINES = { avec: "avec", pme: "pme", coop: "cooperatives", fin: "financement", market: "marche", vert: "vert", admin: "admin" };
/* bp. et hub. mènent directement à l'outil ; akiba. est servi à part (GitHub Pages). */
const EXTERNES = { bp: "/generateur/" };
const ANCIENNES = {
  "solutions/ubora-avec": "/avec", "solutions/akiba": "/avec", "solutions/ubora-pme": "/pme", "solutions/ubora-coop": "/cooperatives",
  "solutions/ubora-fin": "/financement", "solutions/ubora-market": "/marche", "solutions/ubora-hub": "/outils/hub", "solutions/uborahub": "/outils/hub",
  "solutions": "/outils", "services": "/conseil", "diagnostic": "/contact", "rediger": "/admin", "hub": "/outils/hub"
};
const DESCR = {
  "": "Ubora RDC, entreprise sociale basée à Lubumbashi : groupes d'épargne (AVEC), incubation d'entrepreneurs et de PME, coopératives, accès au crédit et au marché, partout en RDC.",
  "a-propos": "Qui est Ubora : une entreprise sociale née à Lubumbashi, sa mission, son modèle, ses valeurs et son équipe de terrain.",
  approche: "La méthode Ubora en six temps : écouter, structurer, former, outiller, connecter et suivre, pensée pour les réalités de la RDC.",
  outils: "AKIBA, le générateur de business plan, Ubora Hub et les outils en préparation : des outils numériques conçus pour la RDC.",
  conseil: "Conseil, études, gestion de projets, digitalisation de l'accompagnement et formation d'équipes, pour les ONG, les bailleurs et les institutions en RDC.",
  formations: "Formations d'Ubora en RDC : Académie en ligne (plus de 100 cours avec certificat), prise en main des outils, AVEC, entrepreneuriat et gestion coopérative.",
  actualites: "Les actualités d'Ubora : programmes, déploiements, formations et nouvelles du terrain en RDC.",
  carrieres: "Offres d'emploi, de stage et de consultance chez Ubora, entreprise sociale basée à Lubumbashi.",
  contact: "Contacter Ubora par téléphone, WhatsApp ou e-mail. Siège à Lubumbashi, interventions dans toute la RDC.",
  mentions: "Mentions légales et politique de données personnelles du site d'Ubora.",
  equipe: "L'équipe d'Ubora : consultants, formateurs, agents de terrain et développeurs, basés à Lubumbashi et présents dans toute la RDC.",
  realisations: "Les réalisations d'Ubora en RDC : groupes d'épargne, entrepreneurs, coopératives, accès au financement et au marché. Contexte, actions et résultats."
};
/* Titre et description des pôles pour les moteurs de recherche */
const SEO_POLES = {
  avec: ["Ubora AVEC : accompagner les groupes d'épargne en RDC", "Création, formation et suivi des groupes d'épargne (AVEC), application AKIBA, fonds de roulement par Ubora Fin et lien avec les institutions financières, en RDC."],
  pme: ["Ubora PME : incubation et accélération d'entrepreneurs en RDC", "Idéation, incubation et accélération d'entrepreneurs et de PME en RDC, avec une démarche lean startup adaptée et un générateur de business plan."],
  cooperatives: ["Ubora Coop : créer et gérer une coopérative en RDC", "Structurer, gérer et renforcer la chaîne de valeur des coopératives en RDC : statuts OHADA, collecte, stockage, transformation, vente groupée, paiement."],
  financement: ["Ubora Fin : accès au crédit et microfinance en RDC", "Ubora Fin prépare les emprunteurs, les présente aux institutions financières et prête aux AVEC des fonds levés auprès des financeurs, en RDC."],
  academie: ["Ubora Académie : formations en ligne certifiantes en RDC", "Cours en ligne utilisables sans réseau sur les AVEC, les AGR et l'éducation financière, formation de formateurs et certificats vérifiables, pour tous les pôles d'Ubora."],
  vert: ["Ubora Vert : environnement et recyclage en RDC", "Reboisement, recyclage des déchets, agroécologie, énergie propre : Ubora Vert fait de la protection de l'environnement une source de revenus en RDC."],
  marche: ["Ubora Market : vendre plus, trouver des acheteurs en RDC", "Relier les PME, les coopératives et les entrepreneurs de la RDC à des acheteurs : ventes B2B et B2C, marchés institutionnels et export."]
};
/* Titres complets pour la balise <title> ; TITRES reste court (fil d'Ariane, menus) */
const SEO_TITRES = { "a-propos": "Qui sommes-nous : Ubora, entreprise sociale en RDC", approche: "Notre approche : la méthode Ubora en six temps", outils: "Outils numériques pour les AVEC et les PME en RDC · Ubora", conseil: "Conseil et programmes pour ONG et bailleurs en RDC · Ubora", formations: "Formations AVEC, entrepreneuriat et coopératives · Ubora", actualites: "Actualités d'Ubora : nouvelles du terrain en RDC", realisations: "Nos réalisations en RDC · Ubora, entreprise sociale", equipe: "Notre équipe · Ubora, entreprise sociale à Lubumbashi", carrieres: "Carrières : rejoindre Ubora à Lubumbashi, RDC", contact: "Contacter Ubora à Lubumbashi, RDC", mentions: "Mentions légales · Ubora, entreprise sociale" };
const ROBOTS = "index, follow, max-image-preview:large";
const TITRES = { "": "Ubora RDC : entreprise sociale à Lubumbashi (AVEC, PME, coopératives)", "a-propos": "Qui sommes-nous", approche: "Notre approche", outils: "Nos outils numériques", conseil: "Conseil et programmes", formations: "Formations", actualites: "Actualités", carrieres: "Carrières", contact: "Contact", mentions: "Mentions légales", admin: "Espace équipe", equipe: "Notre équipe", realisations: "Nos réalisations" };

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
  if (sub && !["actualites", "carrieres", "outils"].includes(base)) { html = notFound(); title = "Page introuvable"; }
  else if (P) { html = pagePole(base); [title, desc] = SEO_POLES[P.id] || [P.nom, P.lead]; canon = P.chemin; }
  else switch (base) {
    case "": html = pageHome(); break;
    case "a-propos": html = pageAbout(); break;
    case "approche": html = pageApproche(); break;
    case "outils": {
      const o = sub && outil(sub);
      if (o && o.fiche) { html = pageOutil(o); [title, desc] = o.fiche.seo; }
      else if (sub) { html = notFound(); title = "Page introuvable"; }
      else html = pageOutils();
      break;
    }
    case "conseil": html = pageConseil(); break;
    case "formations": html = pageFormations(); break;
    case "actualites": {
      if (sub) { const n = allNews().find(x => x.slug === sub); html = pageArticle(sub); if (n) { title = n.titre; desc = n.extrait; } else title = "Page introuvable"; }
      else html = pageNews();
      break;
    }
    case "equipe": html = pageEquipe(); break;
    case "realisations": html = pageRealisations(params); break;
    case "carrieres": html = pageCareers(sub); canon = "/carrieres"; break;
    case "contact": html = pageContact(params); break;
    case "mentions": html = pageMentions(); break;
    /* adresse propre à l'espace équipe : sans elle, admin.uborardc.com garderait le contenu de l'accueil déjà dans la page */
    case "admin": html = typeof pageAdmin === "function" ? pageAdmin() : notFound(); canon = "/admin"; break;
    default: html = notFound(); title = "Page introuvable";
  }
  const court = title || TITRES[base] || "Ubora";
  title = title || SEO_TITRES[base] || TITRES[base] || "Ubora";
  desc = desc || DESCR[base] || DESCR[""];
  const found = !html.includes("Page introuvable");
  /* une rubrique encore vide n'est pas proposée aux moteurs de recherche */
  const vide = (base === "actualites" && !sub && !allNews().length) || (base === "realisations" && !DATA.realisations.length);
  const robots = base === "admin" || !found ? "noindex" : vide ? "noindex, follow" : ROBOTS;
  return { html, title: base === "" ? TITRES[""] : /Ubora/.test(title) ? title : title + " · Ubora", court, desc, canon: canon === "/" ? "/" : canon, base, sub, found, robots };
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
    if (memoire.lire("ubora-equipe") || r.canon === derniereVue) return;
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
    if (!r.found && r.base === "actualites" && r.sub && !baseConsultee) { premier = false; app.innerHTML = '<div class="wrap"><div class="empty" style="margin-block:80px">Chargement de l\'article…</div></div>'; return; }
    stopNet();
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
    $$("#menu [data-r]").forEach(a => {
      const on = a.dataset.r === r.base || (a.dataset.r === "poles" && (!!pole(r.base) || r.base === "outils")) || (a.dataset.r === "a-propos" && ["a-propos", "approche", "carrieres", "equipe"].includes(r.base));
      a.classList.toggle("current", on);
      if (a.tagName === "A") on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
    if (!keep) { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); fermerDD(); }
    if (r.base === "") startNet();
    if (r.base === "contact") bindContact();
    if (r.base === "admin" && typeof bindAdmin === "function") bindAdmin();
    $$("[data-scroll]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }); }));
    reveal(); if (!garder) typo(app);
    if (keep) return;
    if (route.deja) app.focus({ preventScroll: true });
    route.deja = true;
    const anchor = location.hash.slice(1);
    if (anchor && !anchor.startsWith("/")) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }));
    else if (!garder) window.scrollTo(0, 0);
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
      $$("#contactForm [aria-invalid]").forEach(x => x.removeAttribute("aria-invalid"));
      const signaler = (msg, id) => { err.textContent = msg; const c = $("#" + id); if (c) { c.setAttribute("aria-invalid", "true"); c.focus(); } };
      if (!v("c-nom") || !v("c-msg")) { signaler("Merci d'indiquer votre nom et votre message.", v("c-nom") ? "c-msg" : "c-nom"); return; }
      if (!v("c-tel") && !v("c-mail")) { signaler("Laissez-nous un téléphone ou une adresse e-mail pour que nous puissions vous répondre.", "c-tel"); return; }
      if (v("c-mail") && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("c-mail"))) { signaler("L'adresse e-mail semble incomplète (exemple : nom@domaine.com).", "c-mail"); return; }
      if (!v("c-besoin")) { signaler("Choisissez l'objet de votre message.", "c-besoin"); return; }
      err.textContent = "";
      const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Envoi en cours…";
      const res = await UboraDB.sendMessage({ nom: v("c-nom"), organisation: v("c-org") || null, telephone: v("c-tel") || null, email: v("c-mail") || null, besoin: v("c-besoin"), message: v("c-msg") });
      const texte = `Bonjour Ubora,\n\n${v("c-msg")}\n\n${v("c-nom")}${v("c-org") ? " (" + v("c-org") + ")" : ""}\nObjet : ${v("c-besoin")}${v("c-tel") ? "\nTél. : " + v("c-tel") : ""}${v("c-mail") ? "\nE-mail : " + v("c-mail") : ""}`;
      f.hidden = true;
      const s = $("#sent"); s.hidden = false;
      s.innerHTML = res.ok
        ? `<div class="sent"><b>Merci, votre message est bien arrivé.</b><p>Nous vous répondons sous deux jours ouvrés. Si c'est urgent, écrivez-nous aussi sur WhatsApp.</p><div class="btn-row"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(texte)}">Envoyer aussi par WhatsApp</a></div></div>`
        : `<div class="sent"><b>Votre message n'a pas pu être enregistré.</b><p>Envoyez-le directement par WhatsApp ou par e-mail : il est déjà rédigé.</p><div class="btn-row"><a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(texte)}">WhatsApp</a><a class="btn btn-ghost" href="mailto:${CONFIG.email}?subject=${encodeURIComponent(v("c-besoin"))}&body=${encodeURIComponent(texte)}">E-mail</a></div></div>`;
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
    if (!e.target.closest(".has-dd")) fermerDD();
    const a = e.target.closest && e.target.closest("a");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/generateur")) return;
    e.preventDefault();
    const [p, h] = href.split("#");
    /* sur un sous-domaine de pôle, seuls les liens vers le pôle lui-même restent sur place ; le reste mène au site principal */
    if (SOUS_DOMAINES[sd]) {
      if (p.split("?")[0] !== "/" + SOUS_DOMAINES[sd]) { location.href = CONFIG.site + href; return; }
      if (h) document.getElementById(h)?.scrollIntoView({ behavior: "smooth" }); else scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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
    b.querySelector(".plus-t").textContent = ouvert ? "Réduire" : b.dataset.plus;
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
    const mail = $("#nlEmail").value.trim(); e.target.reset();
    const r = await UboraDB.subscribe(mail);
    toast(r.ok ? "Merci, votre inscription est enregistrée." : "L'inscription n'a pas abouti. Réessayez un peu plus tard.");
  });
  $("#waFloat").href = waLink("Bonjour Ubora, je souhaite avoir des informations.");
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
  UboraDB.load().catch(() => {}).then(() => {
    baseConsultee = true;
    const ici = resolve(location.pathname, location.search, location.hostname);
    if (ici.base === "actualites" && ici.sub) { route({ keep: true }); return; }
    if (empreinte() === avant) return;
    $("#tickerMove").innerHTML = tickerHTML();
    const r = resolve(location.pathname, location.search, location.hostname);
    if (["", "actualites", "formations", "carrieres", "equipe", "realisations"].includes(r.base) || pole(r.base)) route({ keep: true });
  });
}

if (typeof window !== "undefined" && window.document && !window.UBORA_PRERENDER) boot();
