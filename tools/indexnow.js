/* ==========================================================================
   Signale les pages du site à Bing, Yandex, Seznam, Naver (protocole IndexNow).
   À lancer après une publication importante : node tools/indexnow.js
   La clé est le nom du fichier .txt publié à la racine du site.
   ========================================================================== */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const cle = fs.readdirSync(ROOT).find(f => /^[a-f0-9]{32}\.txt$/.test(f)).replace(".txt", "");
const urls = [...fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "uborardc.com", key: cle, keyLocation: `https://uborardc.com/${cle}.txt`, urlList: urls })
}).then(r => console.log(`IndexNow : ${r.status} ${r.statusText} (${urls.length} adresses)`))
  .catch(e => { console.error("IndexNow injoignable :", e.message); process.exit(1); });
