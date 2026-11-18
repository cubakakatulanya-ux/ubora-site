/* ==========================================================================
   Signale les pages du site à Bing, Yandex, Seznam, Naver (protocole IndexNow).
   À lancer après une publication importante : node tools/indexnow.js
   La clé est le nom du fichier .txt publié à la racine du site.
   IndexNow n'accepte une adresse que si la clé est lisible sur le même hôte :
   les adresses sont donc envoyées hôte par hôte, et un hôte qui ne publie pas
   la clé (application servie ailleurs) est signalé puis laissé de côté.
   ========================================================================== */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const cle = fs.readdirSync(ROOT).find(f => /^[a-f0-9]{32}\.txt$/.test(f)).replace(".txt", "");
const urls = [...fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const parHote = urls.reduce((m, u) => { const h = new URL(u).hostname; (m[h] = m[h] || []).push(u); return m; }, {});

(async () => {
  let echec = false;
  for (const [hote, liste] of Object.entries(parHote)) {
    const ou = `https://${hote}/${cle}.txt`;
    let lisible = false;
    try { lisible = (await (await fetch(ou)).text()).trim() === cle; } catch (e) {}
    if (!lisible) { console.log(`${hote} : clé absente, non envoyé (${liste.length} adresse${liste.length > 1 ? "s" : ""})`); continue; }
    try {
      const r = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: hote, key: cle, keyLocation: ou, urlList: liste })
      });
      console.log(`${hote} : IndexNow ${r.status} ${r.statusText} (${liste.length} adresse${liste.length > 1 ? "s" : ""})`);
      if (!r.ok) echec = true;
    } catch (e) { console.error(`${hote} : IndexNow injoignable (${e.message})`); echec = true; }
  }
  if (echec) process.exit(1);
})();
