/* ==========================================================================
   UBORA — Espace équipe : administration du contenu (#/admin)
   Nécessite une base Supabase configurée dans data.js (constante SUPABASE)
   et un compte créé dans Supabase → Authentication → Users.
   ========================================================================== */

const KINDS = {
  actualites: { label: "Actualités", singulier: "actualité" },
  formations: { label: "Formations", singulier: "formation" },
  offres: { label: "Offres d'emploi", singulier: "offre" },
  messages: { label: "Messages reçus", singulier: "message" }
};
let adminState = { kind: "actualites", editing: null, rows: [] };

const slugify = t => (t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const lines = t => (t || "").split("\n").map(s => s.trim()).filter(Boolean);

function pageAdmin() {
  return pageHead({
    eyebrow: "Espace équipe", title: 'Administration du <span class="serif">contenu</span>.', crumbs: [["Espace équipe"]],
    lead: "Publiez vos actualités, vos sessions de formation et vos offres d'emploi. Les modifications apparaissent immédiatement sur le site."
  }) + `<section><div class="wrap"><div id="adminPane"><div class="empty">Chargement…</div></div></div></section>`;
}

async function bindAdmin() {
  const pane = $("#adminPane"); if (!pane) return;
  if (!UboraDB.configured()) return renderSetup(pane);
  const user = await UboraDB.currentUser();
  if (!user) return renderLogin(pane);
  renderDash(pane, user);
}

function renderSetup(pane) {
  pane.className = "";
  pane.innerHTML = `<div class="panel" style="max-width:820px">
    <span class="eyebrow">Configuration requise</span>
    <h2 style="font-size:28px;margin:12px 0 16px">Connecter la base de données</h2>
    <p class="muted">Le site fonctionne actuellement avec le contenu écrit dans le fichier <code>data.js</code>. Pour gérer les contenus en ligne, connectez une base Supabase (gratuite) :</p>
    <ol style="margin:18px 0;padding-left:1.3em;display:grid;gap:10px">
      <li>Créez un compte sur <a href="https://supabase.com" target="_blank" rel="noopener">supabase.com</a> puis un nouveau projet.</li>
      <li>Dans <b>SQL Editor</b>, collez le contenu du fichier <code>supabase.sql</code> livré avec le site, puis lancez-le.</li>
      <li>Dans <b>Authentication → Users</b>, créez le compte de l'équipe (e-mail + mot de passe).</li>
      <li>Dans <b>Project Settings → API</b>, copiez l'<b>URL du projet</b> et la clé <b>anon public</b>.</li>
      <li>Collez-les dans <code>data.js</code>, à la constante <code>SUPABASE</code>, puis mettez le site en ligne.</li>
    </ol>
    <p class="muted" style="font-size:14.5px">La clé « anon public » est prévue pour être visible dans un site web : les droits d'écriture restent protégés par les règles de sécurité définies dans <code>supabase.sql</code>. Ne collez jamais la clé <code>service_role</code>.</p>
    <div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="#/rediger">Rédiger une actualité sans base de données</a></div>
  </div>`;
}

function renderLogin(pane) {
  pane.className = "";
  pane.innerHTML = `<div class="panel" style="max-width:460px;margin:0 auto">
    <h2 style="font-size:26px;margin-bottom:6px">Connexion équipe</h2>
    <p class="muted" style="font-size:15px;margin-bottom:20px">Réservé aux membres de l'équipe Ubora.</p>
    <form class="form" id="loginForm" style="grid-template-columns:1fr">
      <label>Adresse e-mail<input id="l-mail" type="email" required autocomplete="username"></label>
      <label>Mot de passe<input id="l-pass" type="password" required autocomplete="current-password"></label>
      <button class="btn btn-primary" type="submit">Se connecter</button>
    </form>
    <p id="loginErr" class="muted" style="margin-top:14px;color:var(--copper)" hidden></p>
    <details class="more-info" style="margin-top:18px"><summary>Première connexion ?</summary>
      <p class="muted" style="font-size:14.5px;margin:10px 0">Créez votre mot de passe avec l'adresse inscrite dans la liste des administrateurs du site. Vous êtes seul à le connaître.</p>
      <form class="form" id="signupForm" style="grid-template-columns:1fr">
        <label>Adresse e-mail<input id="s-mail" type="email" required autocomplete="username"></label>
        <label>Mot de passe à créer (8 caractères minimum)<input id="s-pass" type="password" minlength="8" required autocomplete="new-password"></label>
        <button class="btn btn-ghost" type="submit">Créer mon accès</button>
      </form>
      <p id="signupMsg" class="muted" style="margin-top:12px" hidden></p>
    </details>
  </div>`;
  $("#signupForm").addEventListener("submit", async e => {
    e.preventDefault();
    const r = await UboraDB.signUp($("#s-mail").value.trim(), $("#s-pass").value);
    const p = $("#signupMsg"); p.hidden = false;
    p.textContent = r.ok
      ? (r.session ? "Accès créé, vous êtes connecté." : "Accès créé. Confirmez l'adresse depuis l'e-mail reçu, puis connectez-vous.")
      : "Création impossible : " + r.message;
    if (r.ok && r.session) bindAdmin();
  });
  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const btn = $("#loginForm button"); btn.disabled = true; btn.textContent = "Connexion…";
    const r = await UboraDB.signIn($("#l-mail").value.trim(), $("#l-pass").value);
    if (r.ok) { toast("Bienvenue !"); bindAdmin(); }
    else { const p = $("#loginErr"); p.hidden = false; p.textContent = "Connexion impossible : " + r.message; btn.disabled = false; btn.textContent = "Se connecter"; }
  });
}

async function renderDash(pane, user) {
  pane.className = "";
  pane.innerHTML = `
    <div class="toolbar">
      <div class="chips" role="group" aria-label="Sections">${Object.entries(KINDS).map(([k, v]) => `<button class="chip" data-k="${k}" aria-pressed="${adminState.kind === k}">${v.label}</button>`).join("")}</div>
      <div class="btn-row"><span class="muted" style="font-size:14px;align-self:center">${esc(user.email)}</span><button class="btn btn-ghost btn-sm" id="logout">Se déconnecter</button></div>
    </div>
    <div id="adminBody"><div class="empty">Chargement…</div></div>`;
  $$(".chip[data-k]").forEach(b => b.addEventListener("click", () => { adminState.kind = b.dataset.k; adminState.editing = null; renderDash(pane, user); }));
  $("#logout").addEventListener("click", async () => { await UboraDB.signOut(); toast("Déconnecté"); bindAdmin(); });
  adminState.kind === "messages" ? renderMessages() : renderList();
}

async function renderMessages() {
  const el = $("#adminBody"); const rows = await UboraDB.listMessages();
  el.innerHTML = !rows.length ? `<div class="empty">Aucun message reçu pour l'instant.</div>` : `<div class="list-rows">${rows.map(m => `
    <article class="row-card" style="grid-template-columns:1fr auto">
      <div><div style="margin-bottom:8px"><span class="tag">${esc(m.besoin || "Message")}</span><span class="tag">${new Date(m.created_at).toLocaleString("fr-FR")}</span></div>
        <h3>${esc(m.nom)}${m.organisation ? " · " + esc(m.organisation) : ""}</h3>
        <div class="meta-line">${m.telephone ? `<span>${ICON.phone}${esc(m.telephone)}</span>` : ""}${m.email ? `<span>${ICON.mail}${esc(m.email)}</span>` : ""}</div>
        <p class="muted" style="margin-top:10px;white-space:pre-wrap">${esc(m.message)}</p></div>
      <div style="display:grid;gap:8px">${m.telephone ? `<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="https://wa.me/${m.telephone.replace(/\D/g, "")}">Répondre WhatsApp</a>` : ""}
        ${m.email ? `<a class="btn btn-ghost btn-sm" href="mailto:${esc(m.email)}">Répondre par e-mail</a>` : ""}</div>
    </article>`).join("")}</div>`;
}

async function renderList() {
  const el = $("#adminBody"), kind = adminState.kind;
  el.innerHTML = `<div class="empty">Chargement…</div>`;
  const rows = await UboraDB.listAll(kind);
  adminState.rows = rows;
  const title = r => r.titre;
  const sub = r => kind === "actualites" ? `${fmtDate(r.date)} · ${r.categorie}` : kind === "formations" ? `${fmtDate(r.date)} · ${r.mode} · ${r.lieu}` : `${r.type} · ${r.lieu} · clôture ${fmtDate(r.cloture)}`;
  el.innerHTML = `
    <div class="btn-row" style="margin-bottom:22px">
      <button class="btn btn-primary" id="adNew">+ Nouvelle ${KINDS[kind].singulier}</button>
      ${rows.length ? "" : `<button class="btn btn-ghost" id="adImport">Importer le contenu du fichier (${DATA[kind].length})</button>`}
    </div>
    <div id="adForm"></div>
    ${rows.length ? `<div class="list-rows">${rows.map(r => `
      <article class="row-card" style="grid-template-columns:1fr auto">
        <div><div style="margin-bottom:8px">${r._publie ? '<span class="tag" style="background:var(--green-soft);color:var(--green)">En ligne</span>' : '<span class="tag closed">Brouillon</span>'}${r.exemple ? '<span class="tag ex">Exemple</span>' : ""}</div>
          <h3>${esc(title(r))}</h3><div class="meta-line"><span>${esc(sub(r))}</span></div></div>
        <div style="display:grid;gap:8px"><button class="btn btn-ghost btn-sm" data-edit="${r._id}">Modifier</button><button class="btn btn-ghost btn-sm" data-del="${r._id}">Supprimer</button></div>
      </article>`).join("")}</div>` : `<div class="empty">Aucune ${KINDS[kind].singulier} dans la base pour l'instant.</div>`}`;
  $("#adNew").onclick = () => renderForm(null);
  const imp = $("#adImport"); if (imp) imp.onclick = () => importFile(kind);
  $$("[data-edit]").forEach(b => b.onclick = () => renderForm(rows.find(r => r._id === b.dataset.edit)));
  $$("[data-del]").forEach(b => b.onclick = async () => {
    if (!confirm("Supprimer définitivement cet élément ?")) return;
    const r = await UboraDB.remove(kind, b.dataset.del);
    toast(r.ok ? "Supprimé" : "Échec : " + r.message); renderList();
  });
}

async function importFile(kind) {
  const items = DATA[kind];
  if (!confirm(`Importer ${items.length} élément(s) du fichier data.js dans la base ?`)) return;
  let ok = 0;
  for (const it of items) {
    const obj = kind === "offres" ? { ...it, publie_flag: true } : it;
    const r = await UboraDB.save(kind, obj); if (r.ok) ok++;
  }
  toast(`${ok} élément(s) importé(s)`); renderList();
}

function field(label, inner) { return `<label class="full">${label}${inner}</label>`; }
function renderForm(row) {
  const kind = adminState.kind, el = $("#adForm"), r = row || {};
  const cats = ["Solutions", "Programme", "Coopératives", "Événement", "Partenariat", "Formation", "Recrutement"];
  const outils = [["general", "Gestion & entrepreneuriat"], ...SOLUTIONS.map(s => [s.id, s.nom])];
  let body = "";
  if (kind === "actualites") body = `
    ${field("Titre", `<input id="f-titre" value="${esc(r.titre || "")}" required>`)}
    <label>Catégorie<select id="f-cat">${cats.map(c => `<option ${c === r.categorie ? "selected" : ""}>${c}</option>`).join("")}</select></label>
    <label>Date<input id="f-date" type="date" value="${r.date || todayISO()}" required></label>
    ${field("Chapeau (résumé)", `<textarea id="f-extrait" style="min-height:70px" required>${esc(r.extrait || "")}</textarea>`)}
    ${field("Contenu — un paragraphe par ligne, « ### » pour un intertitre, « - » pour une puce", `<textarea id="f-contenu" style="min-height:200px" required>${esc((r.contenu || []).join("\n"))}</textarea>`)}`;
  if (kind === "formations") body = `
    ${field("Titre", `<input id="f-titre" value="${esc(r.titre || "")}" required>`)}
    <label>Outil concerné<select id="f-outil">${outils.map(([v, l]) => `<option value="${v}" ${v === r.outil ? "selected" : ""}>${l}</option>`).join("")}</select></label>
    <label>Date<input id="f-date" type="date" value="${r.date || todayISO()}" required></label>
    <label>Durée<input id="f-duree" value="${esc(r.duree || "1 jour")}"></label>
    <label>Format<select id="f-mode">${["Présentiel", "En ligne", "Hybride"].map(m => `<option ${m === r.mode ? "selected" : ""}>${m}</option>`).join("")}</select></label>
    <label>Lieu<input id="f-lieu" value="${esc(r.lieu || "Lubumbashi")}"></label>
    <label>Places<input id="f-places" type="number" min="1" value="${r.places || 20}"></label>
    ${field("Public visé", `<input id="f-public" value="${esc(r.public || "")}">`)}
    ${field("Programme — une ligne par point", `<textarea id="f-programme" style="min-height:140px">${esc((r.programme || []).join("\n"))}</textarea>`)}`;
  if (kind === "offres") body = `
    ${field("Intitulé du poste", `<input id="f-titre" value="${esc(r.titre || "")}" required>`)}
    <label>Type<select id="f-type">${["CDI", "CDD", "Stage", "Consultance", "Bénévolat"].map(t => `<option ${t === r.type ? "selected" : ""}>${t}</option>`).join("")}</select></label>
    <label>Département<input id="f-dep" value="${esc(r.departement || "")}"></label>
    <label>Lieu<input id="f-lieu" value="${esc(r.lieu || "Lubumbashi")}"></label>
    <label>Date de publication<input id="f-date" type="date" value="${r.publie || todayISO()}"></label>
    <label>Date limite<input id="f-cloture" type="date" value="${r.cloture || ""}" required></label>
    ${field("Résumé du poste", `<textarea id="f-resume" style="min-height:70px"></textarea>`)}
    ${field("Missions — une par ligne", `<textarea id="f-missions" style="min-height:120px">${esc((r.missions || []).join("\n"))}</textarea>`)}
    ${field("Profil recherché — un par ligne", `<textarea id="f-profil" style="min-height:120px">${esc((r.profil || []).join("\n"))}</textarea>`)}`;

  el.innerHTML = `<div class="panel" style="margin-bottom:26px">
    <h3 style="font-size:22px;margin-bottom:18px">${row ? "Modifier" : "Nouvelle " + KINDS[kind].singulier}</h3>
    <form class="form" id="adSave">${body}
      <label class="full" style="display:flex;gap:10px;align-items:center;font-weight:600"><input type="checkbox" id="f-publie" ${row ? (row._publie ? "checked" : "") : "checked"} style="width:auto"> Visible sur le site</label>
      <div class="full btn-row"><button class="btn btn-primary" type="submit">Enregistrer</button><button class="btn btn-ghost" type="button" id="adCancel">Annuler</button></div>
    </form></div>`;
  if (kind === "offres") $("#f-resume").value = r.resume || "";
  $("#adCancel").onclick = () => { el.innerHTML = ""; };
  $("#adSave").addEventListener("submit", async e => {
    e.preventDefault();
    const v = id => { const n = $("#f-" + id); return n ? n.value.trim() : ""; };
    const titre = v("titre");
    let obj;
    if (kind === "actualites") obj = { slug: row?.slug || slugify(titre), titre, categorie: v("cat"), date: v("date"), extrait: v("extrait"), contenu: lines($("#f-contenu").value), exemple: false, publie: $("#f-publie").checked };
    if (kind === "formations") obj = { id: row?.id || slugify(titre), titre, outil: v("outil"), date: v("date"), duree: v("duree"), mode: v("mode"), lieu: v("lieu"), places: +v("places") || 20, public: v("public"), programme: lines($("#f-programme").value), exemple: false, publie: $("#f-publie").checked };
    if (kind === "offres") obj = { id: row?.id || slugify(titre), titre, type: v("type"), departement: v("dep"), lieu: v("lieu"), publie: v("date"), cloture: v("cloture"), resume: v("resume"), missions: lines($("#f-missions").value), profil: lines($("#f-profil").value), exemple: false, publie_flag: $("#f-publie").checked };
    const btn = $("#adSave button"); btn.disabled = true; btn.textContent = "Enregistrement…";
    const res = await UboraDB.save(kind, obj, row?._id);
    if (res.ok) { toast("Enregistré"); el.innerHTML = ""; renderList(); await UboraDB.load(); renderTicker(); }
    else { toast("Échec : " + res.message); btn.disabled = false; btn.textContent = "Enregistrer"; }
  });
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
