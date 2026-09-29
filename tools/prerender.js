/* ==========================================================================
   UBORA — Génération des pages statiques
   Produit une page HTML complète pour chaque adresse du site (lisible par
   Google, Bing et les autres moteurs sans exécuter de JavaScript), ainsi que
   sitemap.xml et robots.txt. Les actualités publiées dans la base sont
   incluses.

   À lancer depuis le dossier du site, après une modification du contenu :
     node tools/prerender.js
   ========================================================================== */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => { const p = path.join(ROOT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

/* Charge le code du site dans un bac à sable, sans navigateur. */
const ctx = { window: { UBORA_PRERENDER: true }, console, URLSearchParams, Date, Intl, Math, JSON };
vm.createContext(ctx);
const S = vm.runInContext(["data.js", "db.js", "admin.js", "app.js"].map(read).join("\n;\n") +
  "\n;({ resolve, typoHTML, menuHTML, footerHTML, tickerHTML, allNews, esc, DATA, POLES, CONFIG, SUPABASE, UboraDB, TITRES })", ctx);

async function chargerBase() {
  const h = { apikey: S.SUPABASE.anonKey, Authorization: "Bearer " + S.SUPABASE.anonKey };
  const get = async (table, order) => {
    const r = await fetch(`${S.SUPABASE.url}/rest/v1/${table}?select=*&publie=eq.true&order=${order}`, { headers: h });
    if (!r.ok) throw new Error(table + " : " + r.status);
    return r.json();
  };
  try {
    const [a, f, o, e, r] = await Promise.all([get("site_actualites", "date.desc"), get("site_formations", "date.asc"), get("site_offres", "publie_le.desc"),
      get("site_equipe", "ordre.asc,nom.asc"), get("site_realisations", "ordre.asc,created_at.desc")]);
    S.DATA.actualites = a.map(S.UboraDB.mappers.actualites);
    S.DATA.formations = f.map(S.UboraDB.mappers.formations);
    S.DATA.offres = o.map(S.UboraDB.mappers.offres);
    S.DATA.equipe = e.map(S.UboraDB.mappers.equipe);
    S.DATA.realisations = r.map(S.UboraDB.mappers.realisations);
    console.log(`Base : ${a.length} actualité(s), ${f.length} formation(s), ${o.length} offre(s), ${e.length} membre(s) de l'équipe, ${r.length} réalisation(s).`);
  } catch (e) {
    console.warn("Base injoignable, pages générées sans le contenu publié :", e.message);
  }
}

const attr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const texte = s => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const fine = s => s.replace(/ ([;:!?»])/g, " $1").replace(/« /g, "« ");
const jsonld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const ORG = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": "https://uborardc.com/#organisation",
  name: "Ubora",
  alternateName: "Ubora, entreprise sociale",
  url: "https://uborardc.com",
  logo: { "@type": "ImageObject", url: "https://uborardc.com/icon-512.png", width: 512, height: 512 },
  image: "https://uborardc.com/partage.jpg",
  slogan: "Des familles qui épargnent, des entrepreneurs qui vendent, des coopératives qui durent.",
  founder: { "@type": "Person", name: "Christian Cubaka Katulanya", jobTitle: "Directeur Gérant", image: "https://uborardc.com/img/equipe/christian-cubaka-800.webp" },
  email: "contact@uborardc.com",
  telephone: "+243998275144",
  description: "Entreprise sociale basée à Lubumbashi : appui aux groupes d'épargne (AVEC), accompagnement des entrepreneurs et des coopératives, accès au financement et au marché, dans toute la RDC.",
  address: { "@type": "PostalAddress", addressLocality: "Lubumbashi", addressRegion: "Haut-Katanga", addressCountry: "CD" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
  areaServed: { "@type": "Country", name: "République démocratique du Congo" },
  contactPoint: [{ "@type": "ContactPoint", telephone: "+243998275144", contactType: "customer service", availableLanguage: ["fr", "sw"] }],
  knowsAbout: ["Associations villageoises d'épargne et de crédit", "inclusion financière", "entrepreneuriat", "coopératives agricoles", "microfinance", "accès au marché", "protection de l'environnement", "recyclage"]
};
const legal = S.CONFIG.legal || {};
ORG.identifier = [["RCCM", legal.rccm], ["Identification nationale", legal.idnat], ["Numéro d'impôt", legal.impot]]
  .filter(([, v]) => v).map(([k, v]) => ({ "@type": "PropertyValue", propertyID: k, value: v }));

function donneesStructurees(chemin, r) {
  const url = S.CONFIG.site + (chemin === "/" ? "/" : chemin);
  if (chemin === "/") return jsonld({ "@context": "https://schema.org", "@graph": [ORG, { "@type": "WebSite", "@id": "https://uborardc.com/#site", url: "https://uborardc.com/", name: "Ubora", alternateName: ["Ubora RDC", "Ubora, entreprise sociale", "uborardc.com"], inLanguage: "fr", publisher: { "@id": ORG["@id"] } }] });
  const miettes = { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: "https://uborardc.com/" }] };
  const graph = [miettes];
  const parts = chemin.split("/").filter(Boolean);
  if (parts[0] === "actualites" && parts[1]) {
    miettes.itemListElement.push({ "@type": "ListItem", position: 2, name: "Actualités", item: "https://uborardc.com/actualites" }, { "@type": "ListItem", position: 3, name: texte(r.title.replace(/ · Ubora$/, "")), item: url });
    const n = S.allNews().find(x => x.slug === parts[1]);
    if (n) graph.push({ "@type": "NewsArticle", headline: n.titre, description: n.extrait, datePublished: n.date, inLanguage: "fr", mainEntityOfPage: url, image: "https://uborardc.com/partage.jpg", author: { "@id": ORG["@id"] }, publisher: { "@id": ORG["@id"] } });
  } else {
    miettes.itemListElement.push({ "@type": "ListItem", position: 2, name: texte(r.title.replace(/ · Ubora$/, "")), item: url });
    const P = S.POLES.find(p => p.chemin === chemin);
    if (P) graph.push({ "@type": "Service", name: P.nom, description: texte(P.lead), url, serviceType: texte(P.carte), areaServed: { "@type": "Country", name: "République démocratique du Congo" }, provider: { "@id": ORG["@id"] } });
  }
  return jsonld({ "@context": "https://schema.org", "@graph": graph });
}

async function main() {
  await chargerBase();

  const version = crypto.createHash("sha1").update(["styles.css", "data.js", "db.js", "admin.js", "app.js", "chat.js"].map(read).join("")).digest("hex").slice(0, 10);
  const shell = read("tools/shell.html");
  const menu = S.menuHTML(), footer = S.footerHTML(), ticker = S.tickerHTML();

  const chemins = ["/", ...S.POLES.map(p => p.chemin), "/approche", "/a-propos", "/outils", "/conseil", "/formations", "/actualites", "/realisations", "/equipe", "/carrieres", "/contact", "/mentions",
    ...S.allNews().map(n => "/actualites/" + n.slug)];
  const pages = [];

  const donnees = `<script type="application/json" id="ubora-donnees">${JSON.stringify({ actualites: S.DATA.actualites, formations: S.DATA.formations, offres: S.DATA.offres, equipe: S.DATA.equipe, realisations: S.DATA.realisations }).replace(/</g, String.fromCharCode(92) + "u003c")}</script>`;

  for (const chemin of chemins) {
    const r = S.resolve(chemin, "", "uborardc.com");
    if (r.redirect) continue;
    const canon = S.CONFIG.site + (chemin === "/" ? "/" : chemin);
    const robots = "index, follow, max-image-preview:large";
    const html = shell
      .replace(/{{TITLE}}/g, attr(fine(texte(r.title))))
      .replace(/{{DESC}}/g, attr(fine(texte(r.desc))))
      .replace(/{{CANON}}/g, canon)
      .replace("{{ROBOTS}}", robots)
      .replace("{{OGTYPE}}", chemin.startsWith("/actualites/") ? "article" : "website")
      .replace("{{JSONLD}}", donneesStructurees(chemin, r))
      .replace("{{DONNEES}}", () => donnees)
      .replace(/{{VERSION}}/g, version)
      .replace("{{MENU}}", () => S.typoHTML(menu))
      .replace("{{TICKER}}", () => S.typoHTML(ticker))
      .replace("{{FOOTER}}", () => S.typoHTML(footer))
      .replace("{{APP}}", () => S.typoHTML(r.html));
    const fichier = chemin === "/" ? "index.html" : chemin.slice(1) + ".html";
    write(fichier, html);
    pages.push(chemin);
  }

  /* Plan du site */
  const prio = c => c === "/" ? "1.0" : S.POLES.some(p => p.chemin === c) ? "0.9" : c === "/realisations" ? "0.8" : c.startsWith("/actualites/") ? "0.6" : "0.7";
  /* seule la date des articles est connue avec certitude ; les autres pages n'en indiquent pas */
  const modif = c => { const n = S.allNews().find(x => "/actualites/" + x.slug === c); return n ? `<lastmod>${n.date}</lastmod>` : ""; };
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(c => `  <url><loc>${S.CONFIG.site}${c === "/" ? "/" : c}</loc>${modif(c)}<priority>${prio(c)}</priority></url>`).join("\n")}
</urlset>
`);

  write("robots.txt", `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${S.CONFIG.site}/sitemap.xml
`);

  console.log(`${pages.length} pages générées (version ${version}), sitemap.xml et robots.txt mis à jour.`);
}

main().catch(e => { console.error(e); process.exit(1); });
