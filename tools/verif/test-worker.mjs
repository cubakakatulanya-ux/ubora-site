/* Essai du Worker sans Cloudflare : redirections et réponses de quelques adresses.
   node tools/verif/test-worker.mjs */
import w from "../../worker.js";
const env = { ASSETS: { fetch: async req => new Response("fichier " + new URL(req.url).pathname, { status: 200, headers: { "Content-Type": "text/html" } }) } };
const cas = ["/approche", "/solutions", "/equipe", "/realisations", "/poles", "/outils", "/outils/akiba", "/conseil", "/carrieres", "/carrieres/chef-de-projet", "/soutenir", "/formations", "/services", "/solutions/ubora-avec", "http://uborardc.com/avec", "https://www.uborardc.com/contact"];
for (const c of cas) {
  const url = c.startsWith("http") ? c : "https://uborardc.com" + c;
  const r = await w.fetch(new Request(url), env, { waitUntil() {} });
  console.log(c.padEnd(30), r.status, r.headers.get("location") || (await r.text()).slice(0, 40));
}
