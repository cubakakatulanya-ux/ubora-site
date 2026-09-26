/* ==========================================================================
   UBORA — Assistant du site
   Répond à partir du contenu du site (services, solutions, formations,
   offres, actualités, méthode, contact). Aucune donnée n'est envoyée à un
   service tiers : tout est calculé dans le navigateur du visiteur.
   Les questions sans réponse sont enregistrées dans la base (site_questions)
   pour améliorer le site, et le visiteur est orienté vers WhatsApp.
   ========================================================================== */

const UboraChat = (() => {
  let open = false, built = false;

  const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const WORDS = t => norm(t).split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const STOP = new Set(["les", "des", "une", "vous", "nous", "pour", "avec", "que", "qui", "quoi", "comment", "est", "sont", "quel", "quelle", "quels", "quelles", "dans", "sur", "par", "aux", "plus", "votre", "vos", "notre", "nos", "ubora", "faire", "puis", "avez", "etes", "ils", "elle", "cette", "ce", "la", "le", "un", "du", "de", "et", "ou"]);

  /* --- Base de connaissances construite à partir du contenu du site --- */
  function knowledge() {
    const K = [];
    const push = (titre, texte, lien, mots) => K.push({ titre, texte, lien, mots: WORDS(titre + " " + texte + " " + (mots || "")) });

    push("Qui est Ubora", "Ubora est une entreprise sociale basée à Lubumbashi et active dans toute la RDC. Nous bâtissons la résilience économique des PME, des coopératives, des groupes d'épargne et des institutions financières, par l'accompagnement humain et des outils numériques adaptés au terrain.", "#/a-propos", "presentation mission qui sommes nous entreprise sociale societe");
    push("Notre approche et notre méthode", `${METHODE.nom} : ${METHODE.accroche} ${METHODE.etapes.map(e => e.titre).join(", ")}. ${METHODE.intro}`, "#/approche", "methodologie methode approche etapes demarche accompagnement");
    push("L'appui aux AVEC", `Notre approche phare : constituer, former et digitaliser les Associations Villageoises d'Épargne et de Crédit, puis connecter les groupes aux institutions financières. ${AVEC.definition}`, "#/avec", "avec vsla groupe epargne credit villageoise tontine mususa caisse");
    push("Contact", `Téléphone et WhatsApp : ${CONFIG.telephone}. E-mail : ${CONFIG.email}. Siège : ${CONFIG.adresse}. ${CONFIG.zone}. Horaires : ${CONFIG.horaires}.`, "#/contact", "contact telephone numero adresse mail bureau joindre rendez-vous horaires ou situes");
    push("Diagnostic gratuit", "Un questionnaire gratuit de huit questions mesure la maturité de votre entreprise en formalisation, finance, gestion et digital, puis propose des recommandations.", "#/diagnostic", "diagnostic gratuit evaluation test maturite score");
    push("Formations", "Nous formons les utilisateurs de nos outils : prise en main, formateurs relais, accompagnement terrain et support. Le calendrier des sessions est en ligne.", "#/formations", "formation former session calendrier atelier apprendre cours");
    push("Offres d'emploi", "Nos postes ouverts, stages et consultances sont publiés sur la page Carrières, avec les missions, le profil recherché et la date limite.", "#/carrieres", "emploi recrutement poste stage carriere candidature travailler job");
    push("Zone d'intervention", `Notre siège est à Lubumbashi (Haut-Katanga). Nous intervenons partout en RDC, sur le terrain et à distance.`, "#/contact", "zone intervention ou province kinshasa lubumbashi katanga kivu campagne rurale pays");
    push("Tarifs", "Nos tarifs dépendent du programme et du volume. Les prestations aux organisations financent un accès à tarif solidaire pour les groupes d'épargne et les micro-entrepreneurs. Demandez un devis adapté.", "#/contact", "prix tarif cout combien devis payer gratuit budget");

    SOLUTIONS.forEach(s => push(s.nom, `${s.tagline}. ${s.resume} Pour : ${s.pour.join(", ")}.`, "#/solutions/" + s.id, s.nom.replace(/\s/g, "") + " " + (s.app || "") + " outil logiciel application"));
    SERVICES.forEach(s => push(s.titre, `${s.court} ${s.points.slice(0, 4).join(", ")}.`, s.lien || "#/services#" + s.id, "service expertise accompagnement"));
    FAQ.forEach(([q, r]) => push(q, r, "#/a-propos#faq", "question"));
    DATA.formations.slice(0, 8).forEach(f => push(f.titre, `Session du ${fmtDate(f.date)} · ${f.mode} · ${f.lieu} · ${f.places} places. Public : ${f.public}.`, "#/formations", "formation session date calendrier"));
    DATA.offres.forEach(o => push(o.titre, `${o.type} · ${o.lieu}. ${o.resume} Candidatures jusqu'au ${fmtDate(o.cloture)}.`, "#/carrieres/" + o.id, "emploi poste recrutement"));
    DATA.actualites.slice(0, 5).forEach(n => push(n.titre, n.extrait, "#/actualites/" + n.slug, "actualite nouvelle article"));
    return K;
  }
  let KB = null;

  const SUGGESTIONS = [
    "Qu'est-ce qu'une AVEC ?",
    "Que fait Ubora AVEC ?",
    "Quelles formations proposez-vous ?",
    "Comment vous contacter ?",
    "Travaillez-vous hors de Lubumbashi ?",
    "Recrutez-vous en ce moment ?"
  ];

  /* --- Recherche --- */
  function answer(q) {
    KB = KB || knowledge();
    const mots = WORDS(q).filter(w => !STOP.has(w));
    if (!mots.length) return null;
    const scored = KB.map(k => {
      let score = 0;
      mots.forEach(m => {
        if (k.mots.includes(m)) score += 3;
        else if (k.mots.some(w => w.startsWith(m) || m.startsWith(w))) score += 1.5;
      });
      if (norm(k.titre).includes(norm(q).trim())) score += 4;
      return { ...k, score };
    }).filter(k => k.score >= 3).sort((a, b) => b.score - a.score);
    return scored.length ? scored.slice(0, 3) : null;
  }

  /* --- Interface --- */
  function build() {
    if (built) return;
    built = true;
    const box = document.createElement("div");
    box.className = "chat";
    box.id = "chatBox";
    box.hidden = true;
    box.innerHTML = `
      <div class="chat-head">
        <span class="chat-id"><span class="dot"></span> Assistant Ubora</span>
        <button class="chat-x" id="chatClose" aria-label="Fermer l'assistant">&times;</button>
      </div>
      <div class="chat-log" id="chatLog" role="log" aria-live="polite"></div>
      <div class="chat-sugg" id="chatSugg">${SUGGESTIONS.map(s => `<button type="button">${esc(s)}</button>`).join("")}</div>
      <form class="chat-form" id="chatForm">
        <input id="chatInput" autocomplete="off" placeholder="Posez votre question…" aria-label="Votre question">
        <button class="btn btn-primary btn-sm" type="submit" aria-label="Envoyer">${ICON.arrow}</button>
      </form>`;
    document.body.appendChild(box);

    const btn = document.createElement("button");
    btn.className = "chat-fab";
    btn.id = "chatFab";
    btn.setAttribute("aria-label", "Ouvrir l'assistant Ubora");
    btn.innerHTML = `${ICON.spark}<span>Une question ?</span>`;
    document.body.appendChild(btn);

    btn.addEventListener("click", toggle);
    $("#chatClose").addEventListener("click", toggle);
    $("#chatForm").addEventListener("submit", e => { e.preventDefault(); send($("#chatInput").value); });
    $$("#chatSugg button").forEach(b => b.addEventListener("click", () => send(b.textContent)));
    say("bot", `Karibu ! Je réponds à partir du contenu du site : nos expertises, nos solutions Ubora, l'appui aux AVEC, les formations, les offres d'emploi et nos coordonnées. Que cherchez-vous ?`);
  }

  function say(who, html) {
    const log = $("#chatLog");
    const el = document.createElement("div");
    el.className = "msg " + who;
    el.innerHTML = html;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function send(q) {
    q = (q || "").trim(); if (!q) return;
    $("#chatInput").value = "";
    say("me", esc(q));
    const sugg = $("#chatSugg"); if (sugg) sugg.hidden = true;
    const res = answer(q);
    setTimeout(() => {
      if (!res) {
        say("bot", `Je n'ai pas trouvé de réponse sûre à cette question dans le contenu du site. Notre équipe vous répondra directement :
          <span class="chat-actions"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink("Bonjour Ubora, ma question : " + q)}">Demander sur WhatsApp</a>
          <a class="btn btn-ghost btn-sm" href="#/contact">Formulaire de contact</a></span>`);
        logQuestion(q, false);
        return;
      }
      const [best, ...autres] = res;
      say("bot", `<b>${esc(best.titre)}</b><p>${esc(best.texte)}</p>
        <span class="chat-actions"><a class="btn btn-primary btn-sm" href="${best.lien}">Voir la page ${ICON.arrow}</a></span>
        ${autres.length ? `<span class="chat-more">Voir aussi : ${autres.map(o => `<a href="${o.lien}">${esc(o.titre)}</a>`).join(" · ")}</span>` : ""}`);
      logQuestion(q, true);
    }, 260);
  }

  async function logQuestion(question, repondu) {
    try { await UboraDB.logQuestion({ question, repondu, page: location.hash || "#/" }); } catch (e) {}
  }

  function toggle() {
    build();
    open = !open;
    $("#chatBox").hidden = !open;
    $("#chatFab").classList.toggle("on", open);
    if (open) setTimeout(() => $("#chatInput").focus(), 60);
  }

  return { build, toggle, send };
})();

document.addEventListener("DOMContentLoaded", () => UboraChat.build());
if (document.readyState !== "loading") UboraChat.build();
