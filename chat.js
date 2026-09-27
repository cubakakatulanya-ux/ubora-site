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

    push("Qui est Ubora", "Ubora est une entreprise sociale née à Lubumbashi, qui travaille dans toute la RDC. Nous accompagnons les groupes d'épargne, les entrepreneurs, les coopératives et les institutions financières, avec des outils numériques pensés pour le pays.", "/a-propos", "presentation mission qui sommes nous entreprise sociale societe");
    push("Notre modèle d'entreprise sociale", "Les organisations (ONG, bailleurs, institutions financières, programmes) paient nos prestations. Cela nous permet de proposer des tarifs solidaires aux groupes d'épargne, aux femmes et jeunes entrepreneurs et aux producteurs ruraux. Les excédents sont réinvestis dans nos outils et notre présence sur le terrain.", "/a-propos#modele", "modele social entreprise sociale economique financement tarif solidaire");
    push("Notre méthode", `${METHODE.nom}, en six temps : ${METHODE.etapes.map(e => e.titre.toLowerCase()).join(", ")}. ${METHODE.intro}`, "/approche", "methodologie methode approche etapes demarche accompagnement");
    push("Qu'est-ce qu'une AVEC", AVEC.definition, "/avec", "avec vsla definition association villageoise epargne credit tontine");
    push("Contact", `Téléphone et WhatsApp : ${CONFIG.telephone}. E-mail : ${CONFIG.email}. Siège : ${CONFIG.adresse}. ${CONFIG.horaires}.`, "/contact", "contact telephone numero adresse mail bureau joindre rendez-vous horaires ou situes whatsapp");
    push("Formations", "Nous formons les utilisateurs de nos outils et des formateurs relais, et nous organisons des sessions sur demande, dans votre province ou en ligne.", "/formations", "formation former session calendrier atelier apprendre cours");
    push("Offres d'emploi", "Nos postes ouverts, stages et consultances sont publiés sur la page Carrières. Vous pouvez aussi envoyer une candidature spontanée.", "/carrieres", "emploi recrutement poste stage carriere candidature travailler job cv");
    push("Zone d'intervention", "Notre siège est à Lubumbashi, dans le Haut-Katanga. Nous intervenons partout en RDC, sur place ou à distance.", "/contact", "zone intervention ou province kinshasa lubumbashi katanga kivu lualaba campagne rurale pays");
    push("Tarifs", "Les tarifs dépendent du programme et du nombre de bénéficiaires. Les prestations facturées aux organisations nous permettent des tarifs solidaires pour les groupes d'épargne et les micro-entrepreneurs.", "/contact", "prix tarif cout combien devis payer gratuit budget");
    push("Conseil et programmes", CONSEIL.map(s => s.titre).join(", ") + ", pour les ONG, les bailleurs et les institutions.", "/conseil", "conseil etude projet ong bailleur programme evaluation");

    POLES.forEach(p => push(p.nom, `${p.carte} ${p.lead} Adresse directe : ${p.sousDomaine}.`, p.chemin, p.nom.replace(/\s/g, "") + " " + p.id + " pole " + (p.boite ? "boite outils documents " : "") + p.publics.join(" ")));
    POLES.filter(p => p.boite).forEach(p => push(p.boite.titre, `${p.boite.intro} ${p.boite.statut === "disponible" ? "Elle est disponible sur demande." : "Elle sera bientôt disponible."}`, p.chemin + "#boite", "boite outils documents modeles telecharger " + p.id));
    OUTILS.forEach(o => push(o.nom, `${o.resume} ${o.statut === "en-ligne" ? "En ligne à l'adresse " + o.sousDomaine + "." : "En préparation."}`, o.statut === "en-ligne" ? o.url : "/outils#" + o.id, o.nom.replace(/\s/g, "") + " outil logiciel application"));
    FAQ.forEach(([q, r]) => push(q, r, "/a-propos#faq", "question"));
    DATA.formations.slice(0, 8).forEach(f => push(f.titre, `Session du ${fmtDate(f.date)} · ${f.mode} · ${f.lieu} · ${f.places} places. Public : ${f.public}.`, "/formations", "formation session date calendrier"));
    DATA.offres.forEach(o => push(o.titre, `${o.type} · ${o.lieu}. ${o.resume} Candidatures jusqu'au ${fmtDate(o.cloture)}.`, "/carrieres/" + o.id, "emploi poste recrutement"));
    DATA.actualites.slice(0, 5).forEach(n => push(n.titre, n.extrait, "/actualites/" + n.slug, "actualite nouvelle article"));
    return K;
  }
  let KB = null;

  const SUGGESTIONS = [
    "Qu'est-ce qu'une AVEC ?",
    "Comment obtenir la boîte à outils ?",
    "Accompagnez-vous les entrepreneurs ?",
    "Qu'est-ce qu'une entreprise sociale ?",
    "Travaillez-vous hors de Lubumbashi ?",
    "Comment vous contacter ?"
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
        <input id="chatInput" autocomplete="off" maxlength="300" placeholder="Posez votre question…" aria-label="Votre question">
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
    say("bot", `Karibu. Je réponds à partir de ce qui est écrit sur le site : nos pôles, nos outils, les boîtes à outils, les formations, les offres d'emploi et nos coordonnées. Que cherchez-vous ?`);
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
        say("bot", `Je ne trouve pas de réponse fiable à cette question sur le site. Notre équipe peut vous répondre directement.
          <span class="chat-actions"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink("Bonjour Ubora, ma question : " + q)}">Demander sur WhatsApp</a>
          <a class="btn btn-ghost btn-sm" href="/contact">Formulaire de contact</a></span>`);
        logQuestion(q, false);
        return;
      }
      const [best, ...autres] = res;
      say("bot", `<b>${esc(best.titre)}</b><p>${esc(best.texte)}</p>
        <span class="chat-actions"><a class="btn btn-primary btn-sm" href="${best.lien}"${/^https?:/.test(best.lien) ? ' target="_blank" rel="noopener"' : ""}>Voir la page ${ICON.arrow}</a></span>
        ${autres.length ? `<span class="chat-more">Voir aussi : ${autres.map(o => `<a href="${o.lien}">${esc(o.titre)}</a>`).join(" · ")}</span>` : ""}`);
      logQuestion(q, true);
    }, 260);
  }

  async function logQuestion(question, repondu) {
    try { await UboraDB.logQuestion({ question: question.slice(0, 500), repondu, page: location.pathname }); } catch (e) {}
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
