/* ==========================================================================
   Pilote un navigateur Edge sans fenêtre (protocole DevTools) pour vérifier le site.
   Usage : node tools/verif/pilote.js tools/verif/<scenario>.js
   Le scénario exporte une fonction async (p) => { ... } qui reçoit :
     p.taille(largeur, hauteur, mobile)   p.aller(url)   p.attendre(ms)
     p.js(expression)  -> valeur (les promesses sont attendues)
     p.vue()           -> capture PNG (Buffer) de l'écran visible
     p.erreurs         -> erreurs JavaScript et de console relevées
   Node 24 (WebSocket intégré). Aucun paquet à installer.
   ========================================================================== */
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(f => fs.existsSync(f));
const attendre = ms => new Promise(r => setTimeout(r, ms));

async function lancer() {
  const port = 9300 + Math.floor(Math.random() * 500);
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "pilote-"));
  const nav = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "--no-first-run", "--disable-extensions", "--hide-scrollbars", "--mute-audio", "about:blank"], { stdio: "ignore" });
  let cible;
  for (let k = 0; k < 60 && !cible; k++) {
    await attendre(500);
    try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page"); } catch (e) {}
  }
  if (!cible) throw new Error("Edge ne répond pas");
  const ws = new WebSocket(cible.webSocketDebuggerUrl);
  await new Promise((ok, ko) => { ws.onopen = ok; ws.onerror = ko; });
  let n = 0; const attente = new Map(), ecoute = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && attente.has(m.id)) { const { ok, ko } = attente.get(m.id); attente.delete(m.id); m.error ? ko(new Error(m.error.message)) : ok(m.result); }
    else if (m.method) ecoute.forEach(f => f(m));
  };
  const cmd = (method, params = {}) => new Promise((ok, ko) => { const id = ++n; attente.set(id, { ok, ko }); ws.send(JSON.stringify({ id, method, params })); });
  const p = { erreurs: [] };
  ecoute.push(m => {
    if (m.method === "Runtime.exceptionThrown") p.erreurs.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") p.erreurs.push(m.params.args.map(a => a.value || a.description || "").join(" "));
  });
  await cmd("Page.enable"); await cmd("Runtime.enable");
  p.taille = async (l, h, mobile) => cmd("Emulation.setDeviceMetricsOverride", { width: l, height: h, deviceScaleFactor: 1, mobile: !!mobile });
  p.aller = async url => {
    const charge = new Promise(r => { const f = m => { if (m.method === "Page.loadEventFired") { ecoute.splice(ecoute.indexOf(f), 1); r(); } }; ecoute.push(f); });
    await cmd("Page.navigate", { url });
    await Promise.race([charge, attendre(30000)]);
  };
  p.attendre = attendre;
  p.js = async expr => {
    const r = await cmd("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text);
    return r.result.value;
  };
  p.vue = async () => Buffer.from((await cmd("Page.captureScreenshot", { format: "png" })).data, "base64");
  p.fermer = () => { try { ws.close(); } catch (e) {} nav.kill(); try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} };
  return p;
}

(async () => {
  const scenario = require(path.resolve(process.argv[2]));
  const p = await lancer();
  try { await scenario(p); }
  catch (e) { console.log("ERREUR", e.message); }
  finally { p.fermer(); process.exit(0); }
})();
