/* ==========================================================================
   UBORA — Connexion à la base de données (Supabase)
   --------------------------------------------------------------------------
   Tant que SUPABASE.url est vide, le site fonctionne avec le contenu écrit
   dans data.js. Dès que les identifiants sont renseignés, actualités,
   formations et offres d'emploi viennent de la base et se modifient depuis
   la page d'administration (#/admin).
   ========================================================================== */

const DATA = { actualites: ACTUALITES, formations: FORMATIONS, offres: OFFRES, source: "fichier" };

const UboraDB = (() => {
  let client = null, ready = false;

  const configured = () => !!(typeof SUPABASE !== "undefined" && SUPABASE.url && SUPABASE.anonKey);
  function sb() {
    if (!configured() || !window.supabase) return null;
    if (!client) client = window.supabase.createClient(SUPABASE.url, SUPABASE.anonKey);
    return client;
  }

  /* --- Conversion base <-> site --- */
  const fromNews = r => ({ slug: r.slug, date: r.date, categorie: r.categorie, titre: r.titre, extrait: r.extrait, contenu: r.contenu || [], exemple: !!r.exemple });
  const toNews = o => ({ slug: o.slug, date: o.date, categorie: o.categorie, titre: o.titre, extrait: o.extrait, contenu: o.contenu, exemple: !!o.exemple, publie: o.publie !== false });
  const fromTrain = r => ({ id: r.slug, titre: r.titre, outil: r.outil, date: r.date, duree: r.duree, mode: r.mode, lieu: r.lieu, public: r.public_cible, places: r.places, programme: r.programme || [], exemple: !!r.exemple });
  const toTrain = o => ({ slug: o.id, titre: o.titre, outil: o.outil, date: o.date, duree: o.duree, mode: o.mode, lieu: o.lieu, public_cible: o.public, places: o.places, programme: o.programme, exemple: !!o.exemple, publie: o.publie !== false });
  const fromJob = r => ({ id: r.slug, titre: r.titre, type: r.type, lieu: r.lieu, departement: r.departement, publie: r.publie_le, cloture: r.cloture, resume: r.resume, missions: r.missions || [], profil: r.profil || [], exemple: !!r.exemple });
  const toJob = o => ({ slug: o.id, titre: o.titre, type: o.type, lieu: o.lieu, departement: o.departement, publie_le: o.publie, cloture: o.cloture, resume: o.resume, missions: o.missions, profil: o.profil, exemple: !!o.exemple, publie: o.publie_flag !== false });

  const MAP = {
    actualites: { table: "site_actualites", order: "date", from: fromNews, to: toNews },
    formations: { table: "site_formations", order: "date", from: fromTrain, to: toTrain },
    offres: { table: "site_offres", order: "publie_le", from: fromJob, to: toJob }
  };

  /* --- Chargement du contenu public --- */
  async function load() {
    const c = sb();
    if (!c) return DATA;
    try {
      const [a, f, o] = await Promise.all([
        c.from("site_actualites").select("*").eq("publie", true).order("date", { ascending: false }),
        c.from("site_formations").select("*").eq("publie", true).order("date", { ascending: true }),
        c.from("site_offres").select("*").eq("publie", true).order("publie_le", { ascending: false })
      ]);
      if (a.data && a.data.length) DATA.actualites = a.data.map(fromNews);
      if (f.data && f.data.length) DATA.formations = f.data.map(fromTrain);
      if (o.data && o.data.length) DATA.offres = o.data.map(fromJob);
      if (!a.error && !f.error && !o.error) { DATA.source = "base"; ready = true; }
      else console.warn("Ubora : lecture partielle de la base", a.error || f.error || o.error);
    } catch (e) { console.warn("Ubora : base indisponible, contenu du fichier utilisé.", e); }
    return DATA;
  }

  /* --- Écritures publiques (formulaires du site) --- */
  async function sendMessage(m) {
    const c = sb(); if (!c) return { ok: false, offline: true };
    const { error } = await c.from("site_messages").insert([m]);
    return { ok: !error, error };
  }
  async function subscribe(email) {
    const c = sb(); if (!c) return { ok: false, offline: true };
    const { error } = await c.from("site_abonnes").insert([{ email }]);
    return { ok: !error || error.code === "23505", error };
  }

  /* --- Administration --- */
  async function signIn(email, password) {
    const c = sb(); if (!c) return { ok: false, message: "Base de données non configurée." };
    const { data, error } = await c.auth.signInWithPassword({ email, password });
    return error ? { ok: false, message: error.message } : { ok: true, user: data.user };
  }
  async function signUp(email, password) {
    const c = sb(); if (!c) return { ok: false, message: "Base de données non configurée." };
    const { data, error } = await c.auth.signUp({ email, password });
    return error ? { ok: false, message: error.message } : { ok: true, session: !!data.session };
  }
  async function signOut() { const c = sb(); if (c) await c.auth.signOut(); }
  async function currentUser() {
    const c = sb(); if (!c) return null;
    const { data } = await c.auth.getSession();
    return data?.session?.user || null;
  }
  async function listAll(kind) {
    const c = sb(), m = MAP[kind]; if (!c) return [];
    const { data, error } = await c.from(m.table).select("*").order(m.order, { ascending: false });
    if (error) { console.warn(error); return []; }
    return data.map(r => ({ ...m.from(r), _id: r.id, _publie: r.publie }));
  }
  async function save(kind, obj, id) {
    const c = sb(), m = MAP[kind]; if (!c) return { ok: false, message: "Base non configurée." };
    const row = m.to(obj);
    const q = id ? c.from(m.table).update(row).eq("id", id) : c.from(m.table).insert([row]);
    const { error } = await q;
    return error ? { ok: false, message: error.message } : { ok: true };
  }
  async function remove(kind, id) {
    const c = sb(), m = MAP[kind]; if (!c) return { ok: false };
    const { error } = await c.from(m.table).delete().eq("id", id);
    return { ok: !error, message: error?.message };
  }
  async function listMessages() {
    const c = sb(); if (!c) return [];
    const { data } = await c.from("site_messages").select("*").order("created_at", { ascending: false }).limit(200);
    return data || [];
  }

  return { configured, load, sendMessage, subscribe, signIn, signUp, signOut, currentUser, listAll, save, remove, listMessages, get ready() { return ready; } };
})();
