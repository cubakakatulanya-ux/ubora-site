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

    push("Qui est Ubora", "Ubora est une entreprise sociale née à Lubumbashi, qui travaille dans toute la RDC. Nous accompagnons les groupes d'épargne, les entrepreneurs et les coopératives, nous les relions aux institutions financières et aux acheteurs, et nous agissons pour l'environnement.", "/a-propos", "presentation mission qui sommes nous entreprise sociale societe");
    push("Soutenir nos actions", "Ubora n'est pas une entreprise classique : son objectif est social et ses excédents sont réinvestis. Vous pouvez nous soutenir en nous confiant une mission, en apportant du capital par Ubora Fin, en devenant partenaire ou en faisant connaître nos outils.", "/soutenir", "soutenir soutien aider don donner contribuer partenaire mecene investir capital objectif social");
    push("Notre modèle d'entreprise sociale", "Les organisations (ONG, bailleurs, institutions financières, programmes) paient nos prestations. Cela nous permet de proposer des tarifs solidaires aux groupes d'épargne, aux femmes et jeunes entrepreneurs et aux producteurs ruraux. Par Ubora Fin, nous mobilisons aussi le capital des financeurs au profit des AVEC, sans prêter nous-mêmes. Les excédents sont réinvestis dans nos outils et notre présence sur le terrain.", "/a-propos#modele", "modele social entreprise sociale economique financement tarif solidaire");
    push("Notre méthode", `${METHODE.nom}, en six temps : ${METHODE.etapes.map(e => e.titre.toLowerCase()).join(", ")}. ${METHODE.intro}`, "/approche", "methodologie methode approche etapes demarche accompagnement");
    push("Qu'est-ce qu'une AVEC", AVEC.definition, "/avec", "avec vsla definition association villageoise epargne credit tontine");
    push("Les nouveautés d'AKIBA", "AKIBA tient trois promesses : des opérations transformées en données fiables et vérifiables (registre scellé), une supervision moins coûteuse (l'animateur et l'organisation reçoivent les chiffres à distance, avec un écran Impact), et une passerelle vers les IMF (indice de qualité des données, niveau « prête pour une IMF », dossier et export Excel sans données personnelles). Après chaque réunion, chaque membre reçoit son reçu, imprimé sur une imprimante Bluetooth (bientôt sur un terminal POS), ou envoyé par WhatsApp ; le journal s'imprime aussi sur une période choisie. L'application parle lingala, kiswahili, kikongo, tshiluba et d'autres langues de la RDC, avec un guide audio. La démonstration est libre ; une vraie AVEC s'active avec un code de validation délivré par Ubora.", "/outils#akiba", "akiba nouveau nouveaute mise a jour imf qualite donnees impact excel dossier registre fraude code validation recu recus imprimer impression pos imprimante bluetooth ticket journal langue lingala swahili audio");
    push("Académie Ubora", "L'Académie Ubora propose plus de 100 cours en ligne, regroupés en parcours : AVEC, activités génératrices de revenus, éducation financière, entrepreneuriat, agriculture, coopératives et accompagnement. Exercices corrigés, quiz, badges et certificats vérifiables ; les cours téléchargés fonctionnent sans réseau.", "https://academie.uborardc.com", "academie ecole cours en ligne formation certificat badge quiz pnef education financiere apprendre elearning");
    push("Ubora Vert, l'environnement", "Par Ubora Vert, nous agissons pour l'environnement : reboisement et pépinières, recyclage et valorisation des déchets, agroécologie, énergie propre et sensibilisation. Ces actions créent aussi des revenus pour les communautés.", "/vert", "environnement recyclage dechets reboisement arbre arbres climat vert ecologie plastique compost energie solaire pepiniere");
    push("Après la fin d'un projet", "Quand le projet d'une ONG ou d'un bailleur se termine, Ubora reste. Nous poursuivons le suivi des groupes, des entrepreneurs et des coopératives, et notre modèle économique finance une partie de ces activités de terrain.", "/conseil#relais", "fin projet apres cloture perenniser perennite durabilite ong bailleur relais suite continuer");
    push("Financer les AVEC : le rôle d'Ubora Fin", "Ubora Fin ne prête pas elle-même : elle mobilise le capital d'institutions financières, d'investisseurs d'impact et de bailleurs au profit des AVEC que nous accompagnons, sous forme de fonds de roulement accordé au groupe. Les remboursements sont suivis dans AKIBA.", "/financement#intermediation", "fonds roulement financement pret credit financer groupe avec argent capital investisseur banque imf");
    push("Contact", `Téléphone et WhatsApp : ${CONFIG.telephone}. E-mail : ${CONFIG.email}. Siège : ${CONFIG.adresse}. ${CONFIG.horaires}.`, "/contact", "contact contacter appeler ecrire telephone numero adresse mail bureau joindre rendez-vous horaires ou situes whatsapp");
    push("Formations", "Nous formons les utilisateurs de nos outils et des formateurs relais, et nous organisons des sessions sur demande, dans votre province ou en ligne.", "/formations", "formation former session calendrier atelier apprendre cours");
    push("Offres d'emploi", "Nos postes ouverts, stages et consultances sont publiés sur la page Carrières. Vous pouvez aussi envoyer une candidature spontanée.", "/carrieres", "emploi recrutement poste stage carriere candidature travailler job cv");
    push("Zone d'intervention", "Notre siège est à Lubumbashi, dans le Haut-Katanga. Nous intervenons partout en RDC, sur place ou à distance.", "/contact", "zone intervention ou province kinshasa lubumbashi katanga kivu lualaba campagne rurale pays");
    push("Tarifs", "Les tarifs dépendent du programme et du nombre de bénéficiaires. Les prestations facturées aux organisations nous permettent des tarifs solidaires pour les groupes d'épargne et les micro-entrepreneurs.", "/contact", "prix tarif cout combien devis payer gratuit budget");
    push("Conseil et programmes", CONSEIL.map(s => s.titre).join(", ") + ", pour les ONG, les bailleurs et les institutions.", "/conseil", "conseil etude projet ong bailleur programme evaluation");

    POLES.forEach(p => push(p.nom, `${p.carte} ${p.lead} Adresse directe : ${p.sousDomaine}.`, p.chemin, p.nom.replace(/\s/g, "") + " " + p.id + " pole " + (p.boite ? "boite outils documents " : "") + p.publics.join(" ")));
    POLES.filter(p => p.boite).forEach(p => push(p.boite.titre, `${p.boite.intro} ${p.boite.statut === "disponible" ? "Elle est disponible sur demande." : "Elle sera bientôt disponible."}`, p.chemin + "#boite", "boite outils documents modeles telecharger " + p.id));
    OUTILS.forEach(o => push(o.nom, `${o.resume} ${o.statut === "en-ligne" ? "En ligne à l'adresse " + o.sousDomaine + "." : "En préparation."}`, o.statut === "en-ligne" ? o.url : "/outils#" + o.id, o.nom.replace(/\s/g, "") + " outil logiciel application"));
    FAQ.forEach(([q, r]) => push(q, r, "/a-propos#faq", "question"));
    DATA.formations.filter(f => f.date >= todayISO()).slice(0, 8).forEach(f => push(f.titre, `Session du ${fmtDate(f.date)} · ${f.mode} · ${f.lieu} · ${f.places} places. Public : ${f.public}.`, "/formations", "formation session date calendrier"));
    DATA.offres.filter(o => o.cloture >= todayISO()).forEach(o => push(o.titre, `${o.type} · ${o.lieu}. ${o.resume} Candidatures jusqu'au ${fmtDate(o.cloture)}.`, "/carrieres/" + o.id + "#offre-" + o.id, "emploi poste recrutement"));
    push("Notre équipe", "Consultants, formateurs, agents de terrain et développeurs, basés à Lubumbashi et présents dans toute la RDC.", "/equipe", "equipe personnes qui directeur staff collaborateurs responsable");
    DATA.equipe.forEach(m => push(m.nom, `${m.fonction}. ${m.bio || ""}`, "/equipe", "equipe membre"));
    push("Nos réalisations", "Les programmes que nous avons menés, avec leur contexte, nos actions et les résultats obtenus.", "/realisations", "realisations projets references experience resultats deja fait");
    DATA.realisations.forEach(r => push(r.titre, `${r.resume || ""} ${r.lieu ? "Lieu : " + r.lieu + "." : ""}`, "/realisations", "realisation projet reference"));
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
    if (!KB || KB.src !== DATA.source) { KB = knowledge(); KB.src = DATA.source; }
    const mots = WORDS(q.replace(/\bAVECS?\b/g, "vsla")).filter(w => !STOP.has(w));
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
    btn.title = "Une question ?";
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
