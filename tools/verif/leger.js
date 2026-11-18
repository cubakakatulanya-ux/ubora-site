/* Vérifie l'allègement : ressources chargées par une page publique, lecture de la base sans bibliothèque,
   envoi refusé par la base (données invalides, donc rien n'est enregistré), espace équipe. */
const B = process.env.BASE || "http://localhost:5188";
module.exports = async p => {
  await p.taille(1366, 900, false);
  await p.aller(B + "/?equipe=1"); await p.attendre(5000);
  const accueil = await p.js(`(() => { const r = performance.getEntriesByType("resource").map(e => e.name);
    return { supabase: r.some(u => u.includes("supabase-2.45.4")), admin: r.some(u => u.includes("/admin.js")), lectures: r.filter(u => u.includes("/rest/v1/")).length, total: r.length }; })()`);
  console.log("accueil :", JSON.stringify(accueil));
  const envoi = await p.js(`(async () => {
    const m = await UboraDB.sendMessage({ nom: "", message: "x" });          /* refusé : nom vide, message trop court */
    const a = await UboraDB.subscribe("pas-une-adresse");                    /* refusé : format d'adresse */
    return { message: { ok: m.ok, code: m.error && m.error.code }, abonnement: { ok: a.ok, code: a.error && a.error.code },
      bibliothequeChargee: typeof window.supabase !== "undefined" }; })()`);
  console.log("envois invalides :", JSON.stringify(envoi));
  await p.aller(B + "/admin"); await p.attendre(6000);
  const admin = await p.js(`({ connexion: !!document.querySelector("#loginForm"), injoignable: !!(document.querySelector("#adminPane") || {}).textContent?.includes("injoignable"), bibliotheque: typeof window.supabase, codeEquipe: typeof pageAdmin })`);
  console.log("espace équipe :", JSON.stringify(admin));
  console.log("erreurs :", p.erreurs.length ? p.erreurs.slice(0, 4) : "aucune");
};
