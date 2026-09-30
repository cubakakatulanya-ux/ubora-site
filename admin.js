/* ==========================================================================
   UBORA — Espace équipe (uborardc.com/admin)
   Réservé aux adresses inscrites dans la table site_admins de la base.
   Toutes les écritures sont contrôlées par les règles d'accès de la base :
   même en contournant cette page, un visiteur ne peut rien modifier.
   ========================================================================== */

const ONGLETS = [
  ["tableau", "Tableau de bord"], ["messages", "Messages"], ["actualites", "Actualités"],
  ["formations", "Formations"], ["offres", "Offres d'emploi"], ["realisations", "Réalisations"], ["equipe", "Équipe"], ["abonnes", "Abonnés"], ["questions", "Questions"]
];
const SINGULIER = { actualites: "une actualité", formations: "une formation", offres: "une offre", equipe: "un membre de l'équipe", realisations: "une réalisation" };
let adminState = { onglet: "tableau", filtre: "a-traiter" };

const slugify = t => (t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
const lignes = t => (t || "").split("\n").map(s => s.trim()).filter(Boolean);
const dateHeure = d => new Date(d).toLocaleString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function pageAdmin() {
  return `<section class="deep page-head admin-head"><div class="wrap">
      <span class="eyebrow">Espace équipe</span>
      <h1>Gérer le site</h1>
      <p class="lead">Messages reçus, actualités, réalisations, équipe, formations, offres d'emploi et abonnés. Tout ce que vous publiez ici apparaît aussitôt sur le site.</p>
    </div></section>
    <section><div class="wrap"><div id="adminPane"><div class="empty">Chargement…</div></div></div></section>`;
}

async function bindAdmin() {
  const pane = $("#adminPane"); if (!pane) return;
  if (!UboraDB.configured() || !window.supabase) { pane.innerHTML = `<div class="empty"><b>La base de données est injoignable.</b><p>Vérifiez votre connexion, puis rechargez la page.</p></div>`; return; }
  const user = await UboraDB.currentUser();
  if (!user) return renderLogin(pane);
  if (!(await UboraDB.isAdmin())) {
    pane.innerHTML = `<div class="empty"><b>Ce compte n'a pas accès à l'espace équipe.</b><p>Demandez à un administrateur d'ajouter votre adresse ${esc(user.email)}.</p><button class="btn btn-ghost" id="logout">Se déconnecter</button></div>`;
    $("#logout").onclick = async () => { await UboraDB.signOut(); bindAdmin(); };
    return;
  }
  renderDash(pane, user);
}

function renderLogin(pane) {
  pane.innerHTML = `<div class="panel login">
    <h2 class="h2-sm">Connexion</h2>
    <p class="muted">Réservé aux membres de l'équipe Ubora.</p>
    <form class="form one" id="loginForm">
      <label>Adresse e-mail<input id="l-mail" type="email" required autocomplete="username" maxlength="160"></label>
      <label>Mot de passe<input id="l-pass" type="password" required autocomplete="current-password" maxlength="200"></label>
      <p class="form-err" id="loginErr" hidden></p>
      <button class="btn btn-primary" type="submit">Se connecter</button>
    </form>
    <p class="muted small">Mot de passe oublié ? Il se réinitialise depuis le tableau de bord Supabase (Authentication, puis Users).</p>
  </div>`;
  let essais = 0;
  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const btn = e.target.querySelector("button"), err = $("#loginErr");
    if (essais >= 5) { err.hidden = false; err.textContent = "Trop de tentatives. Patientez une minute avant de réessayer."; return; }
    btn.disabled = true; btn.textContent = "Connexion…";
    const r = await UboraDB.signIn($("#l-mail").value.trim(), $("#l-pass").value);
    if (r.ok) { toast("Bienvenue."); bindAdmin(); return; }
    essais++; if (essais >= 5) setTimeout(() => { essais = 0; }, 60000);
    err.hidden = false; err.textContent = r.message; btn.disabled = false; btn.textContent = "Se connecter";
  });
}

function renderDash(pane, user) {
  pane.innerHTML = `
    <div class="admin-bar">
      <nav class="chips" aria-label="Rubriques">${ONGLETS.map(([k, v]) => `<button class="chip" data-k="${k}" aria-pressed="${adminState.onglet === k}">${v}</button>`).join("")}</nav>
      <div class="admin-user"><span class="muted small">${esc(user.email)}</span><button class="btn btn-ghost btn-sm" id="logout">Se déconnecter</button></div>
    </div>
    <div id="adminBody"><div class="empty">Chargement…</div></div>`;
  $$(".chip[data-k]", pane).forEach(b => b.onclick = () => { adminState.onglet = b.dataset.k; renderDash(pane, user); });
  $("#logout").onclick = async () => { await UboraDB.signOut(); toast("Vous êtes déconnecté."); bindAdmin(); };
  const o = adminState.onglet;
  if (o === "tableau") renderTableau(pane, user);
  else if (o === "messages") renderMessages();
  else if (o === "abonnes") renderAbonnes();
  else if (o === "questions") renderQuestions();
  else renderListe(o);
}

async function renderTableau(pane, user) {
  const c = await UboraDB.counts();
  const cartes = [
    ["messages", "Messages à traiter", c.nonTraites, `${c.messages} au total`],
    ["actualites", "Actualités", c.actualites, "publiées ou en brouillon"],
    ["formations", "Formations", c.formations, "sessions enregistrées"],
    ["offres", "Offres d'emploi", c.offres, "offres enregistrées"],
    ["realisations", "Réalisations", c.realisations, "publiées ou en brouillon"],
    ["equipe", "Équipe", c.equipe, "membres présentés"],
    ["abonnes", "Abonnés", c.abonnes, "à la lettre d'information"],
    ["questions", "Questions sans réponse", c.questionsSansReponse, "posées à l'assistant"]
  ];
  $("#adminBody").innerHTML = `<div class="admin-kpis">${cartes.map(([k, t, n, s]) => `<button class="kpi-card" data-k="${k}"><span>${t}</span><b>${n ?? 0}</b><small>${s}</small></button>`).join("")}</div>
    <div class="panel admin-help"><b>Bon à savoir</b>
      <ul class="checks"><li>Une actualité, une formation ou une offre décochée « Visible sur le site » reste enregistrée comme brouillon.</li>
      <li>Une formation dont la date est passée disparaît du calendrier public.</li>
      <li>Une offre d'emploi disparaît du site le lendemain de sa date limite.</li>
      <li>Les demandes de boîte à outils arrivent dans les messages, avec l'objet « Boîte à outils ».</li>
      <li>Les photos sont réduites automatiquement avant l'envoi : inutile de les retoucher.</li>
      <li>Équipe et réalisations s'affichent du plus petit au plus grand « ordre d'affichage ».</li></ul></div>`;
  $$(".kpi-card").forEach(b => b.onclick = () => { adminState.onglet = b.dataset.k; renderDash(pane, user); });
}

async function renderMessages() {
  const el = $("#adminBody");
  const tous = await UboraDB.list("site_messages");
  const rows = adminState.filtre === "a-traiter" ? tous.filter(m => !m.traite) : tous;
  el.innerHTML = `<div class="admin-tools"><div class="seg" role="group" aria-label="Filtre">
      <button data-f="a-traiter" aria-pressed="${adminState.filtre === "a-traiter"}">À traiter (${tous.filter(m => !m.traite).length})</button>
      <button data-f="tous" aria-pressed="${adminState.filtre === "tous"}">Tous (${tous.length})</button></div></div>
    ${!rows.length ? `<div class="empty"><b>Aucun message ${adminState.filtre === "a-traiter" ? "à traiter" : "reçu"}.</b></div>` : `<div class="list-rows">${rows.map(m => {
      const tel = (m.telephone || "").replace(/[^\d]/g, "");
      return `<article class="row-card two-cols${m.traite ? " done" : ""}">
        <div><div class="tags"><span class="tag">${esc(m.besoin || "Message")}</span><span class="tag">${dateHeure(m.created_at)}</span>${m.traite ? '<span class="tag tag-ok">Traité</span>' : ""}</div>
          <h3>${esc(m.nom)}${m.organisation ? ` · ${esc(m.organisation)}` : ""}</h3>
          <div class="meta-line">${m.telephone ? `<span>${ICON.phone}${esc(m.telephone)}</span>` : ""}${m.email ? `<span>${ICON.mail}${esc(m.email)}</span>` : ""}</div>
          <p class="msg-txt">${esc(m.message)}</p></div>
        <div class="stack">${tel ? `<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="https://wa.me/${tel.startsWith("0") ? "243" + tel.slice(1) : tel}">Répondre sur WhatsApp</a>` : ""}
          ${m.email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(m.email)}?subject=${encodeURIComponent("Re : " + (m.besoin || "votre message"))}">Répondre par e-mail</a>` : ""}
          <button class="btn btn-ghost btn-sm" data-traite="${m.id}" data-v="${!m.traite}">${m.traite ? "Remettre à traiter" : "Marquer comme traité"}</button>
          <button class="btn btn-ghost btn-sm danger" data-suppr="${m.id}">Supprimer</button></div>
      </article>`;
    }).join("")}</div>`}`;
  $$(".seg button", el).forEach(b => b.onclick = () => { adminState.filtre = b.dataset.f; renderMessages(); });
  $$("[data-traite]", el).forEach(b => b.onclick = async () => { const r = await UboraDB.setTraite(b.dataset.traite, b.dataset.v === "true"); toast(r.ok ? "Mis à jour." : "La mise à jour a échoué."); renderMessages(); });
  bindSuppr(el, "site_messages", renderMessages);
}

/* Suppression d'un message indésirable, d'un abonné ou d'une question */
function bindSuppr(el, table, apres) {
  $$("[data-suppr]", el).forEach(b => b.onclick = async () => {
    if (!confirm("Supprimer définitivement cet élément ?")) return;
    const r = await UboraDB.removeRow(table, b.dataset.suppr);
    toast(r.ok ? "Supprimé." : "La suppression a échoué."); apres();
  });
}

async function renderAbonnes() {
  const el = $("#adminBody"), rows = await UboraDB.list("site_abonnes");
  el.innerHTML = `<div class="admin-tools"><span class="muted">${rows.length} abonné${rows.length > 1 ? "s" : ""}</span>${rows.length ? `<button class="btn btn-primary btn-sm" id="csv">Exporter en CSV</button>` : ""}</div>
    ${rows.length ? `<div class="panel"><table class="compare admin-table"><thead><tr><th>Adresse e-mail</th><th>Inscription</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.email)}</td><td>${dateHeure(r.created_at)}</td><td><button class="btn btn-ghost btn-sm danger" data-suppr="${r.id}">Désinscrire</button></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty"><b>Aucun abonné pour le moment.</b></div>`}`;
  const b = $("#csv"); if (b) b.onclick = () => {
    const cell = v => /^[=+\-@]/.test(v) ? "'" + v : v;
    const csv = "email;inscription\n" + rows.map(r => `${cell(r.email)};${r.created_at}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = "abonnes-ubora.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  bindSuppr(el, "site_abonnes", renderAbonnes);
}

async function renderQuestions() {
  const el = $("#adminBody"), rows = await UboraDB.list("site_questions");
  el.innerHTML = `<p class="muted admin-intro">Les questions posées à l'assistant du site. Celles restées sans réponse indiquent ce qu'il faudrait ajouter au site.</p>
    ${rows.length ? `<div class="panel"><table class="compare admin-table"><thead><tr><th>Question</th><th>Réponse trouvée</th><th>Date</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.question)}</td><td class="${r.repondu ? "ok" : ""}">${r.repondu ? "Oui" : "Non"}</td><td>${dateHeure(r.created_at)}</td><td><button class="btn btn-ghost btn-sm danger" data-suppr="${r.id}">Effacer</button></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty"><b>Aucune question pour le moment.</b></div>`}`;
  bindSuppr(el, "site_questions", renderQuestions);
}

async function renderListe(kind) {
  const el = $("#adminBody");
  el.innerHTML = `<div class="empty">Chargement…</div>`;
  const rows = await UboraDB.listAll(kind);
  const sous = r => kind === "actualites" ? `${fmtDate(r.date)} · ${r.categorie}` : kind === "formations" ? `${fmtDate(r.date)} · ${r.mode} · ${r.lieu}`
    : kind === "equipe" ? r.fonction : kind === "realisations" ? [poleReal(r.pole).nom, r.periode, r.lieu].filter(Boolean).join(" · ") : `${r.type} · ${r.lieu} · jusqu'au ${fmtDate(r.cloture)}`;
  el.innerHTML = `<div class="admin-tools"><button class="btn btn-primary" id="adNew">Ajouter ${SINGULIER[kind]}</button></div>
    <div id="adForm"></div>
    ${rows.length ? `<div class="list-rows">${rows.map(r => `<article class="row-card two-cols">
      <div><div class="tags">${r._publie ? '<span class="tag tag-ok">En ligne</span>' : '<span class="tag">Brouillon</span>'}</div><h3>${esc(r.titre || r.nom)}</h3><div class="meta-line"><span>${esc(sous(r))}</span></div></div>
      <div class="stack"><button class="btn btn-ghost btn-sm" data-edit="${r._id}">Modifier</button><button class="btn btn-ghost btn-sm danger" data-del="${r._id}">Supprimer</button></div>
    </article>`).join("")}</div>` : `<div class="empty"><b>Rien pour le moment.</b><p>Cliquez sur « Ajouter » pour publier ${SINGULIER[kind]}.</p></div>`}`;
  $("#adNew").onclick = () => renderForm(kind, null);
  $$("[data-edit]", el).forEach(b => b.onclick = () => renderForm(kind, rows.find(r => r._id === b.dataset.edit)));
  $$("[data-del]", el).forEach(b => b.onclick = async () => {
    if (!confirm("Supprimer définitivement cet élément ?")) return;
    const r = await UboraDB.remove(kind, b.dataset.del);
    toast(r.ok ? "Supprimé." : "La suppression a échoué."); renderListe(kind);
  });
}

function champ(label, inner, full) { return `<label${full ? ' class="full"' : ""}>${label}${inner}</label>`; }
function champImage(label, url) {
  return `<div class="full"><span class="lbl">${label}</span>
    <div class="apercu"><img alt="" id="f-apercu"${url ? ` src="${esc(url)}"` : " hidden"}>
      <input id="f-image" type="file" accept="image/jpeg,image/png,image/webp">
      ${url ? `<label class="check"><input type="checkbox" id="f-sansimage"> Retirer l'image</label>` : ""}</div></div>`;
}
/* Réduit la photo dans le navigateur (1 200 pixels au plus, JPEG) avant l'envoi */
async function preparerImage(file, max = 1200) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("choisissez une image JPG, PNG ou WebP.");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ko(new Error("image illisible.")); i.src = url; });
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    const ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise(ok => c.toBlob(ok, "image/jpeg", 0.86));
  } finally { URL.revokeObjectURL(url); }
}
function renderForm(kind, row) {
  const el = $("#adForm"), r = row || {};
  const cats = ["Terrain", "Programme", "Coopératives", "Événement", "Partenariat", "Formation", "Recrutement"];
  const cibles = [["", "Général"], ...POLES.map(p => [p.id, p.nom])];
  let body = "";
  if (kind === "actualites") body = `
    ${champ("Titre", `<input id="f-titre" value="${esc(r.titre || "")}" required maxlength="160">`, true)}
    ${champ("Catégorie", `<select id="f-cat">${cats.map(c => `<option${c === r.categorie ? " selected" : ""}>${c}</option>`).join("")}</select>`)}
    ${champ("Date", `<input id="f-date" type="date" value="${r.date || todayISO()}" required>`)}
    ${champ("Chapeau (deux ou trois phrases)", `<textarea id="f-extrait" rows="3" required maxlength="400">${esc(r.extrait || "")}</textarea>`, true)}
    ${champ("Texte : un paragraphe par ligne, ### devant un intertitre, - devant un élément de liste", `<textarea id="f-contenu" rows="10" required>${esc((r.contenu || []).join("\n"))}</textarea>`, true)}`;
  if (kind === "formations") body = `
    ${champ("Titre", `<input id="f-titre" value="${esc(r.titre || "")}" required maxlength="160">`, true)}
    ${champ("Pôle", `<select id="f-outil">${cibles.map(([v, l]) => `<option value="${v}"${v === (r.outil || "") ? " selected" : ""}>${l}</option>`).join("")}</select>`)}
    ${champ("Date", `<input id="f-date" type="date" value="${r.date || todayISO()}" required>`)}
    ${champ("Durée", `<input id="f-duree" value="${esc(r.duree || "1 jour")}" maxlength="60">`)}
    ${champ("Format", `<select id="f-mode">${["Présentiel", "En ligne", "Hybride"].map(m => `<option${m === r.mode ? " selected" : ""}>${m}</option>`).join("")}</select>`)}
    ${champ("Lieu", `<input id="f-lieu" value="${esc(r.lieu || "Lubumbashi")}" maxlength="120">`)}
    ${champ("Places", `<input id="f-places" type="number" min="1" max="500" value="${r.places || 20}">`)}
    ${champ("Public visé", `<input id="f-public" value="${esc(r.public || "")}" maxlength="200">`, true)}
    ${champ("Programme : un point par ligne", `<textarea id="f-programme" rows="5">${esc((r.programme || []).join("\n"))}</textarea>`, true)}`;
  if (kind === "offres") body = `
    ${champ("Intitulé du poste", `<input id="f-titre" value="${esc(r.titre || "")}" required maxlength="160">`, true)}
    ${champ("Type de contrat", `<select id="f-type">${["CDI", "CDD", "Stage", "Consultance", "Bénévolat"].map(t => `<option${t === r.type ? " selected" : ""}>${t}</option>`).join("")}</select>`)}
    ${champ("Service", `<input id="f-dep" value="${esc(r.departement || "")}" maxlength="80">`)}
    ${champ("Lieu", `<input id="f-lieu" value="${esc(r.lieu || "Lubumbashi")}" maxlength="120">`)}
    ${champ("Date de publication", `<input id="f-date" type="date" value="${r.publie || todayISO()}">`)}
    ${champ("Date limite de candidature", `<input id="f-cloture" type="date" value="${r.cloture || ""}" required>`)}
    ${champ("Résumé du poste", `<textarea id="f-resume" rows="3" maxlength="500">${esc(r.resume || "")}</textarea>`, true)}
    ${champ("Missions : une par ligne", `<textarea id="f-missions" rows="5">${esc((r.missions || []).join("\n"))}</textarea>`, true)}
    ${champ("Profil recherché : un élément par ligne", `<textarea id="f-profil" rows="5">${esc((r.profil || []).join("\n"))}</textarea>`, true)}`;
  if (kind === "equipe") body = `
    ${champ("Nom et prénom", `<input id="f-titre" value="${esc(r.nom || "")}" required maxlength="120">`)}
    ${champ("Fonction", `<input id="f-fonction" value="${esc(r.fonction || "")}" required maxlength="120">`)}
    ${champ("Présentation courte (facultatif)", `<textarea id="f-bio" rows="3" maxlength="600">${esc(r.bio || "")}</textarea>`, true)}
    ${champ("Profil LinkedIn (facultatif)", `<input id="f-linkedin" type="url" value="${esc(r.linkedin || "")}" maxlength="300" placeholder="https://www.linkedin.com/in/…">`)}
    ${champ("Ordre d'affichage", `<input id="f-ordre" type="number" min="0" max="999" value="${r.ordre ?? 100}">`)}
    ${champImage("Photo (carrée de préférence)", r.photo)}`;
  if (kind === "realisations") body = `
    ${champ("Titre", `<input id="f-titre" value="${esc(r.titre || "")}" required maxlength="160">`, true)}
    ${champ("Pôle", `<select id="f-pole">${[...POLES.map(p => [p.id, p.nom]), ["conseil", "Conseil et programmes"]].map(([v, l]) => `<option value="${v}"${v === r.pole ? " selected" : ""}>${l}</option>`).join("")}</select>`)}
    ${champ("Période", `<input id="f-periode" value="${esc(r.periode || "")}" maxlength="40" placeholder="Par exemple : 2024-2025">`)}
    ${champ("Lieu", `<input id="f-lieu" value="${esc(r.lieu || "")}" maxlength="120" placeholder="Province, ville ou territoire">`)}
    ${champ("Partenaire ou commanditaire", `<input id="f-partenaire" value="${esc(r.partenaire || "")}" maxlength="160">`)}
    ${champ("Ce que nous avons fait", `<textarea id="f-resume" rows="4" maxlength="1200">${esc(r.resume || "")}</textarea>`, true)}
    ${champ("Résultats : un par ligne, avec des chiffres si possible", `<textarea id="f-resultats" rows="4">${esc((r.resultats || []).join("\n"))}</textarea>`, true)}
    ${champ("Ordre d'affichage", `<input id="f-ordre" type="number" min="0" max="999" value="${r.ordre ?? 100}">`)}
    ${champImage("Photo (format paysage de préférence)", r.image)}`;
  el.innerHTML = `<div class="panel admin-form">
    <h3>${row ? "Modifier" : "Ajouter " + SINGULIER[kind]}</h3>
    <form class="form" id="adSave">${body}
      <label class="full check"><input type="checkbox" id="f-publie"${row ? (row._publie ? " checked" : "") : " checked"}> Visible sur le site</label>
      <p class="form-err full" id="f-err" hidden></p>
      <div class="full btn-row"><button class="btn btn-primary" type="submit">Enregistrer</button><button class="btn btn-ghost" type="button" id="adCancel">Annuler</button></div>
    </form></div>`;
  $("#adCancel").onclick = () => { el.innerHTML = ""; };
  const fi = $("#f-image");
  if (fi) fi.onchange = () => { const f = fi.files[0], im = $("#f-apercu"); if (f) { im.src = URL.createObjectURL(f); im.hidden = false; } };
  $("#adSave").addEventListener("submit", async e => {
    e.preventDefault();
    const v = id => { const n = $("#f-" + id); return n ? n.value.trim() : ""; };
    const titre = v("titre"), err = $("#f-err");
    const faute = t => { err.hidden = false; err.textContent = t; };
    if (!titre) return faute(kind === "equipe" ? "Le nom est obligatoire." : "Le titre est obligatoire.");
    if (kind === "equipe" && !v("fonction")) return faute("Indiquez la fonction.");
    if (kind === "equipe" && v("linkedin") && !/^https:\/\//.test(v("linkedin"))) return faute("Le lien LinkedIn doit commencer par https://");
    const publie = $("#f-publie").checked;
    let obj;
    if (kind === "equipe" || kind === "realisations") {
      let image = kind === "equipe" ? row?.photo : row?.image;
      if ($("#f-sansimage")?.checked) image = "";
      const fichier = fi && fi.files[0];
      if (fichier) {
        const b = e.target.querySelector("button[type=submit]"); b.disabled = true; b.textContent = "Envoi de la photo…";
        try {
          const up = await UboraDB.uploadImage(await preparerImage(fichier), kind);
          if (!up.ok) throw new Error(up.message);
          image = up.url;
        } catch (x) { b.disabled = false; b.textContent = "Enregistrer"; return faute("La photo n'a pas pu être envoyée : " + x.message); }
      }
      if (kind === "equipe") obj = { nom: titre, fonction: v("fonction"), bio: v("bio"), linkedin: v("linkedin"), ordre: +v("ordre") || 100, photo: image, publie };
      else obj = { slug: row?.slug || slugify(titre), titre, pole: v("pole"), periode: v("periode"), lieu: v("lieu"), partenaire: v("partenaire"), resume: v("resume"), resultats: lignes($("#f-resultats").value), ordre: +v("ordre") || 100, image, publie };
    }
    if (kind === "actualites") obj = { slug: row?.slug || slugify(titre), titre, categorie: v("cat"), date: v("date"), extrait: v("extrait"), contenu: lignes($("#f-contenu").value), publie };
    if (kind === "formations") obj = { id: row?.id || slugify(titre + "-" + v("date")), titre, outil: v("outil") || "general", date: v("date"), duree: v("duree"), mode: v("mode"), lieu: v("lieu"), places: +v("places") || 20, public: v("public"), programme: lignes($("#f-programme").value), publie };
    if (kind === "offres") {
      if (!v("cloture")) { err.hidden = false; err.textContent = "Indiquez une date limite de candidature."; return; }
      obj = { id: row?.id || slugify(titre), titre, type: v("type"), departement: v("dep"), lieu: v("lieu"), publie: v("date"), cloture: v("cloture"), resume: v("resume"), missions: lignes($("#f-missions").value), profil: lignes($("#f-profil").value), publie_flag: publie };
    }
    const btn = e.target.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Enregistrement…";
    const res = await UboraDB.save(kind, obj, row?._id);
    if (res.ok) { toast("Enregistré."); el.innerHTML = ""; renderListe(kind); await UboraDB.load(); }
    else { err.hidden = false; err.textContent = res.message; btn.disabled = false; btn.textContent = "Enregistrer"; }
  });
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
