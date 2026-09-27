/* ==========================================================================
   UBORA — Connexion à la base de données (Supabase)
   Les actualités, formations et offres publiées viennent de la base.
   Les formulaires du site (contact, lettre d'information, assistant) y écrivent.
   L'espace équipe (/admin) y lit et y modifie tout le reste.
   La sécurité repose sur les règles d'accès de la base : un visiteur ne peut
   que lire ce qui est publié et déposer un message ; seule l'équipe inscrite
   dans site_admins peut publier ou lire les messages.
   ========================================================================== */

/* Le contenu publié est intégré à chaque page lors de sa génération : la page s'affiche
   tout de suite complète, puis se met à jour si la base contient du nouveau. */
const DATA = (() => {
  const d = { actualites: ACTUALITES, formations: FORMATIONS, offres: OFFRES, equipe: [], realisations: [], source: "fichier" };
  try {
    const el = typeof document !== "undefined" && document.getElementById("ubora-donnees");
    if (el) Object.assign(d, JSON.parse(el.textContent), { source: "page" });
  } catch (e) {}
  return d;
})();

const UboraDB = (() => {
  let client = null;

  const configured = () => !!(typeof SUPABASE !== "undefined" && SUPABASE.url && SUPABASE.anonKey);
  function sb() {
    if (!configured() || typeof window === "undefined" || !window.supabase) return null;
    if (!client) client = window.supabase.createClient(SUPABASE.url, SUPABASE.anonKey, { auth: { persistSession: true, storageKey: "ubora-admin" } });
    return client;
  }

  /* --- Conversion base <-> site --- */
  const fromNews = r => ({ slug: r.slug, date: r.date, categorie: r.categorie, titre: r.titre, extrait: r.extrait, contenu: r.contenu || [] });
  const toNews = o => ({ slug: o.slug, date: o.date, categorie: o.categorie, titre: o.titre, extrait: o.extrait, contenu: o.contenu, exemple: false, publie: o.publie !== false });
  const fromTrain = r => ({ id: r.slug, titre: r.titre, outil: r.outil, date: r.date, duree: r.duree, mode: r.mode, lieu: r.lieu, public: r.public_cible, places: r.places, programme: r.programme || [] });
  const toTrain = o => ({ slug: o.id, titre: o.titre, outil: o.outil, date: o.date, duree: o.duree, mode: o.mode, lieu: o.lieu, public_cible: o.public, places: o.places, programme: o.programme, exemple: false, publie: o.publie !== false });
  const fromJob = r => ({ id: r.slug, titre: r.titre, type: r.type, lieu: r.lieu, departement: r.departement, publie: r.publie_le, cloture: r.cloture, resume: r.resume, missions: r.missions || [], profil: r.profil || [] });
  const toJob = o => ({ slug: o.id, titre: o.titre, type: o.type, lieu: o.lieu, departement: o.departement, publie_le: o.publie, cloture: o.cloture, resume: o.resume, missions: o.missions, profil: o.profil, exemple: false, publie: o.publie_flag !== false });

  const fromMember = r => ({ nom: r.nom, fonction: r.fonction, bio: r.bio || "", photo: r.photo_url || "", linkedin: r.linkedin || "", ordre: r.ordre });
  const toMember = o => ({ nom: o.nom, fonction: o.fonction, bio: o.bio || null, photo_url: o.photo || null, linkedin: o.linkedin || null, ordre: o.ordre ?? 100, publie: o.publie !== false });
  const fromReal = r => ({ slug: r.slug, titre: r.titre, pole: r.pole, periode: r.periode, lieu: r.lieu, partenaire: r.partenaire, resume: r.resume, resultats: r.resultats || [], image: r.image_url || "", ordre: r.ordre });
  const toReal = o => ({ slug: o.slug, titre: o.titre, pole: o.pole, periode: o.periode, lieu: o.lieu, partenaire: o.partenaire, resume: o.resume, resultats: o.resultats, image_url: o.image || null, ordre: o.ordre ?? 100, publie: o.publie !== false });

  const MAP = {
    actualites: { table: "site_actualites", order: "date", from: fromNews, to: toNews },
    formations: { table: "site_formations", order: "date", from: fromTrain, to: toTrain },
    offres: { table: "site_offres", order: "publie_le", from: fromJob, to: toJob },
    equipe: { table: "site_equipe", order: "ordre", asc: true, from: fromMember, to: toMember },
    realisations: { table: "site_realisations", order: "ordre", asc: true, from: fromReal, to: toReal }
  };

  /* --- Contenu public --- */
  async function load() {
    const c = sb(); if (!c) return DATA;
    try {
      const [a, f, o, e, r] = await Promise.all([
        c.from("site_actualites").select("*").eq("publie", true).order("date", { ascending: false }),
        c.from("site_formations").select("*").eq("publie", true).order("date", { ascending: true }),
        c.from("site_offres").select("*").eq("publie", true).order("publie_le", { ascending: false }),
        c.from("site_equipe").select("*").eq("publie", true).order("ordre", { ascending: true }).order("nom", { ascending: true }),
        c.from("site_realisations").select("*").eq("publie", true).order("ordre", { ascending: true }).order("created_at", { ascending: false })
      ]);
      if (!a.error) DATA.actualites = (a.data || []).map(fromNews);
      if (!f.error) DATA.formations = (f.data || []).map(fromTrain);
      if (!o.error) DATA.offres = (o.data || []).map(fromJob);
      if (!e.error) DATA.equipe = (e.data || []).map(fromMember);
      if (!r.error) DATA.realisations = (r.data || []).map(fromReal);
      DATA.source = "base";
    } catch (e) { console.warn("Ubora : base indisponible.", e); }
    return DATA;
  }

  /* --- Formulaires publics --- */
  async function sendMessage(m) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await c.from("site_messages").insert([m]);
    return { ok: !error, error };
  }
  async function logQuestion(q) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await c.from("site_questions").insert([q]);
    return { ok: !error, error };
  }
  async function subscribe(email) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await c.from("site_abonnes").insert([{ email: email.toLowerCase() }]);
    return { ok: !error || error.code === "23505", error };
  }

  /* --- Espace équipe --- */
  async function signIn(email, password) {
    const c = sb(); if (!c) return { ok: false, message: "La base de données est injoignable." };
    const { data, error } = await c.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, message: error.message === "Invalid login credentials" ? "Adresse e-mail ou mot de passe incorrect." : error.message };
    return { ok: true, user: data.user };
  }
  async function signOut() { const c = sb(); if (c) await c.auth.signOut(); }
  async function currentUser() {
    const c = sb(); if (!c) return null;
    const { data } = await c.auth.getSession();
    return data?.session?.user || null;
  }
  async function isAdmin() {
    const c = sb(); if (!c) return false;
    const { data, error } = await c.from("site_admins").select("email").limit(1);
    return !error && data && data.length > 0;
  }
  async function listAll(kind) {
    const c = sb(), m = MAP[kind]; if (!c) return [];
    const { data, error } = await c.from(m.table).select("*").order(m.order, { ascending: !!m.asc });
    if (error) { console.warn(error); return []; }
    return data.map(r => ({ ...m.from(r), _id: r.id, _publie: r.publie }));
  }
  async function save(kind, obj, id) {
    const c = sb(), m = MAP[kind]; if (!c) return { ok: false, message: "Base injoignable." };
    const row = m.to(obj);
    const { error } = id ? await c.from(m.table).update(row).eq("id", id) : await c.from(m.table).insert([row]);
    if (error) return { ok: false, message: error.code === "23505" ? "Un élément porte déjà ce titre. Modifiez-le légèrement." : error.message };
    return { ok: true };
  }
  async function remove(kind, id) {
    const c = sb(), m = MAP[kind]; if (!c) return { ok: false };
    const { error } = await c.from(m.table).delete().eq("id", id);
    return { ok: !error, message: error?.message };
  }
  async function list(table, order = "created_at", limit = 500) {
    const c = sb(); if (!c) return [];
    const { data, error } = await c.from(table).select("*").order(order, { ascending: false }).limit(limit);
    if (error) console.warn(error);
    return data || [];
  }
  /* Photo déjà réduite par l'espace équipe ; renvoie son adresse publique */
  async function uploadImage(blob, dossier) {
    const c = sb(); if (!c) return { ok: false, message: "Base injoignable." };
    const nom = `${dossier}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
    const { error } = await c.storage.from("site-medias").upload(nom, blob, { contentType: "image/jpeg", cacheControl: "31536000", upsert: false });
    if (error) return { ok: false, message: error.message };
    return { ok: true, url: c.storage.from("site-medias").getPublicUrl(nom).data.publicUrl };
  }
  async function removeRow(table, id) {
    if (!["site_messages", "site_abonnes", "site_questions"].includes(table)) return { ok: false };
    const c = sb(); if (!c) return { ok: false };
    const { error } = await c.from(table).delete().eq("id", id);
    return { ok: !error };
  }
  async function setTraite(id, traite) {
    const c = sb(); if (!c) return { ok: false };
    const { error } = await c.from("site_messages").update({ traite }).eq("id", id);
    return { ok: !error };
  }
  async function counts() {
    const c = sb(); if (!c) return {};
    const q = (t, f) => { let r = c.from(t).select("id", { count: "exact", head: true }); if (f) r = f(r); return r; };
    const [m, mn, a, s, f, o, e, re] = await Promise.all([
      q("site_messages"), q("site_messages", r => r.eq("traite", false)), q("site_actualites"),
      q("site_abonnes"), q("site_formations"), q("site_offres"), q("site_equipe"), q("site_realisations")
    ]);
    const qq = await q("site_questions", r => r.eq("repondu", false));
    return { messages: m.count || 0, nonTraites: mn.count || 0, actualites: a.count || 0, abonnes: s.count || 0, formations: f.count || 0, offres: o.count || 0, equipe: e.count || 0, realisations: re.count || 0, questionsSansReponse: qq.count || 0 };
  }

  const mappers = { actualites: fromNews, formations: fromTrain, offres: fromJob, equipe: fromMember, realisations: fromReal };

  return { configured, mappers, load, sendMessage, subscribe, logQuestion, signIn, signOut, currentUser, isAdmin, listAll, save, remove, list, uploadImage, removeRow, setTraite, counts };
})();
