/* Déjà appliqué le 28 novembre 2026 ; gardé comme trace. Usage : node tools/verif/globe-1128.js <dossier du site>/ */
/* Accueil de uborardc.com, sur le modèle de uborardc.org (28 novembre 2026) :
   globe 3D interactif (RDC et Lubumbashi), chiffres qui s'animent, question directe à l'assistant.
   Le principe est repris de uborardc.org (même propriétaire), en vert et pour l'entreprise sociale. */
const fs = require('fs');
const R = process.argv[2];
const patch = (f, paires) => {
  let a = fs.readFileSync(R + f, 'utf8'); const crlf = a.includes('\r\n'); const nl = t => crlf ? t.replace(/\r?\n/g, '\r\n') : t;
  for (let [x, y] of paires) { x = nl(x); y = nl(y); if (!a.includes(x)) throw new Error(f + ' : introuvable : ' + x.slice(0, 80)); a = a.split(x).join(y); }
  fs.writeFileSync(R + f, a);
  console.log(f + ' : ' + paires.length + ' modification(s)');
};

patch('app.js', [
  /* bannière : question directe à l'assistant (version française seulement : l'assistant n'existe pas en anglais) */
  [`      <div class="btn-row"><a class="btn btn-accent" href="#solutions" data-scroll="solutions">Nos solutions \${ICON.arrow}</a><a class="btn btn-glass" href="/contact?sujet=\${encodeURIComponent("Demande de devis")}">Demander un devis</a></div>
    </div>
  </section>`,
   `      <div class="btn-row"><a class="btn btn-accent" href="#solutions" data-scroll="solutions">Nos solutions \${ICON.arrow}</a><a class="btn btn-glass" href="/contact?sujet=\${encodeURIComponent("Demande de devis")}">Demander un devis</a></div>
      <form class="r-demander" data-demander aria-label="Poser une question à l'assistant Ubora">
        <span class="ic" aria-hidden="true">\${ICON.spark}</span>
        <input name="q" maxlength="300" autocomplete="off" placeholder="Posez votre question sur Ubora…" aria-label="Votre question à l'assistant Ubora">
        <button class="btn btn-sm" type="submit">Demander</button>
      </form>
      <p class="r-demander-note">L'assistant répond à partir des informations de ce site.</p>
    </div>
  </section>`],
  /* chiffres qui s'animent : la valeur finale reste écrite dans la page */
  [`    <li><b>\${POLES.length}</b><span>domaines d'intervention</span></li>
    <li><b>\${enLigne}</b><span>applications en ligne</span></li>
    <li><b>140+</b><span>cours à l'Académie</span></li>`,
   `    <li><b data-compte="\${POLES.length}">\${POLES.length}</b><span>domaines d'intervention</span></li>
    <li><b data-compte="\${enLigne}">\${enLigne}</b><span>applications en ligne</span></li>
    <li><b data-compte="140" data-suffixe="+">140+</b><span>cours à l'Académie</span></li>`],
  /* globe 3D, juste après les chiffres */
  [`  </ul></div></section>

  <section id="poles"><div class="wrap">`,
   `  </ul></div></section>

  <section class="r-globe" aria-labelledby="titre-globe"><div class="wrap r-globe-in">
    <div class="r-globe-scene">
      <canvas id="globe" tabindex="0" role="img" aria-label="Globe en relief : la République démocratique du Congo et Lubumbashi, siège d'Ubora. Faites-le tourner avec la souris, le doigt ou les flèches du clavier."></canvas>
      <p class="r-globe-aide" aria-hidden="true">Faites glisser pour tourner le globe</p>
    </div>
    <div class="r-globe-txt">
      <span class="eyebrow">Où nous intervenons</span>
      <h2 id="titre-globe">Basés à Lubumbashi, au service de toute la <span class="serif">RDC</span>.</h2>
      <p>Notre siège est à Lubumbashi, dans le Haut-Katanga. Nous travaillons partout en RDC, sur le terrain et à distance : nos applications fonctionnent même sans réseau.</p>
      <ul class="r-globe-reperes">
        <li><b>Lubumbashi</b><span>notre siège, dans le Haut-Katanga</span></li>
        <li><b data-compte="26">26</b><span>provinces où nous pouvons intervenir</span></li>
      </ul>
    </div>
  </div></section>

  <section id="poles"><div class="wrap">`],
  /* branchements dans le routeur */
  [`    stopNet(); stopDiapo();
    compter(r);`, `    stopNet(); stopDiapo(); stopGlobe();
    compter(r);`],
  [`    if (r.base === "") { startNet(); startDiapo(); }`, `    if (r.base === "") { startNet(); startDiapo(); startGlobe(); bindDemander(); }`],
  [`    reveal(); mouvement(keep || garder || ancre ? 0 : scrollY); relief(keep || garder || ancre ? 0 : scrollY); if (!garder) typo(app);`,
   `    reveal(); mouvement(keep || garder || ancre ? 0 : scrollY); relief(keep || garder || ancre ? 0 : scrollY); compteurs(); if (!garder) typo(app);`],
  /* le code du globe, des compteurs et de la question directe */
  [`  /* réseau animé de l'accueil, discret */`,
   `  /* Chiffres qui s'animent : quand un chiffre entre à l'écran, il monte de zéro à sa valeur (1,3 s).
     La valeur finale est déjà écrite dans la page ; rien ne bouge si le visiteur a demandé moins d'animations. */
  let ioCompte;
  function compteurs() {
    ioCompte?.disconnect();
    if (calme() || !("IntersectionObserver" in window)) return;
    ioCompte = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, fin = +el.dataset.compte, suffixe = el.dataset.suffixe || "";
      ioCompte.unobserve(el);
      if (!fin) return;
      let t0 = 0;
      const pas = t => {
        if (!el.isConnected) return;
        t0 = t0 || t;
        const k = Math.min(1, (t - t0) / 1300);
        el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffixe : "");
        if (k < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    }), { threshold: .6 });
    $$("[data-compte]", app).forEach(el => ioCompte.observe(el));
  }

  /* Question directe à l'assistant depuis la bannière de l'accueil */
  function bindDemander() {
    $$("[data-demander]", app).forEach(f => f.addEventListener("submit", e => {
      e.preventDefault();
      const champ = f.querySelector("input"), q = champ.value.trim();
      if (!q) return champ.focus();
      if (typeof UboraChat === "undefined") { nav("/contact"); return; }
      if ($("#chatBox")?.hidden !== false) UboraChat.toggle();
      UboraChat.send(q);
      champ.value = "";
    }));
  }

  /* Globe 3D de l'accueil : des points répartis sur une sphère (Afrique, Madagascar, RDC en vert vif),
     projection orthographique, Lubumbashi signalé. Il tourne seul lentement, se fait glisser à la souris ou au doigt,
     et répond aux flèches du clavier. Il ne s'anime que s'il est à l'écran ; immobile si le visiteur a demandé moins d'animations. */
  const D2R = Math.PI / 180;
  const AFRIQUE = [[-5.9,35.8],[-1.5,35.2],[3,36.8],[10.2,37.3],[11,35.2],[10.1,33.8],[11.5,33.1],[15.2,32.3],[19.9,30.9],[20.1,32.4],[23.1,32.6],[25,31.7],[29,30.9],[32.3,31.3],[32.5,29.9],[35,24],[37.3,19],[38.5,17.9],[39.5,15.5],[43.3,12.5],[44.5,10.4],[51.2,11.8],[51,10.4],[49.5,8],[48,4.5],[44,1],[41.5,-1.7],[39.7,-4.5],[39.3,-8],[40.5,-10.5],[40.6,-15],[36.5,-19],[35.4,-22],[32.9,-25.9],[32.6,-28.5],[31,-29.8],[27.5,-33.6],[22.5,-34],[20,-34.8],[18.4,-34.2],[17.8,-32],[16.5,-28.6],[14.5,-22.9],[11.8,-17.2],[13.4,-12],[13.1,-9],[12.2,-6],[11.9,-3.5],[9.3,-1],[9.6,2.5],[9.6,3.8],[8.5,4.5],[5.6,4.2],[3,6.4],[-2,4.8],[-7.5,4.4],[-11,6.9],[-13.3,9],[-15.1,11],[-16.8,13.1],[-17.5,14.7],[-16.5,19.5],[-17,21],[-15,24],[-13,27.5],[-9.8,30],[-9.5,32.5],[-6.8,34]];
  const MADAGASCAR = [[49.3,-12],[50.4,-15.5],[49.5,-17.5],[47.1,-24.9],[45.2,-25.6],[44,-25],[43.3,-22],[44.4,-16.2],[47.5,-14.5]];
  const RDC = [[12.2,-6],[12.5,-5.7],[13.1,-4.8],[14.4,-4.9],[15.3,-4.3],[16.2,-2.2],[17.7,-0.5],[18,2],[18.6,3.5],[18.5,4.3],[19.5,5.1],[22.4,4.1],[24.5,5],[27.4,5.1],[29,4.4],[30.8,3.5],[31.2,2.2],[29.9,0.6],[29.6,-1.4],[29,-2.8],[29.2,-4.5],[29.5,-6],[30.5,-8.2],[28.9,-8.5],[28.4,-9.2],[28.6,-10.6],[29.4,-12.4],[29.8,-13.4],[29,-13.4],[27.5,-12.3],[26,-11],[25.3,-11.2],[24,-10.9],[22.3,-11],[22,-9.6],[21.8,-7.3],[20.3,-7],[19.4,-8],[17.6,-8.1],[16.2,-5.9],[13,-5.9]];
  const LUBUMBASHI = [-11.66, 27.48];
  const dedans = (lon, lat, P) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i], [xj, yj] = P[j];
      if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  /* n points répartis régulièrement sur la sphère (spirale de Fibonacci) ; garder() rend la famille du point, ou -1 */
  const fibo = (n, garder) => {
    const out = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, lat = Math.asin(y) / D2R, lon = ((ga * i / D2R) % 360) - 180, t = garder(lon, lat);
      if (t >= 0) out.push([lat * D2R, lon * D2R, t]);
    }
    return out;
  };
  let globeStop = null;
  function stopGlobe() { if (globeStop) globeStop(); }
  function startGlobe() {
    stopGlobe();
    const cv = $("#globe"), ctx = cv && cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    const immobile = calme(), petit = innerWidth < 640;
    const terre = (lon, lat) => dedans(lon, lat, AFRIQUE) || dedans(lon, lat, MADAGASCAR);
    const pts = fibo(petit ? 1300 : 2200, (lon, lat) => terre(lon, lat) ? -1 : 0)
      .concat(fibo(petit ? 20000 : 32000, (lon, lat) => dedans(lon, lat, RDC) ? 2 : terre(lon, lat) ? 1 : -1));
    const COUL = ["rgb(150,196,170)", "rgb(196,232,206)", "rgb(141,203,79)"], TAILLE = [1.4, 1.8, 2.3], BASE = [.32, .8, 1];
    const etiquette = T("Lubumbashi · siège"), pays = T("RDC");
    let W = 0, H = 0, dpr = 1, Rr = 0, lon0 = 22, lat0 = -6, vx = 0, vy = 0, glisse = false, px = 0, py = 0, repos = -1e9, actif = false, raf = 0;
    const norm = x => ((x + 180) % 360 + 360) % 360 - 180;
    const taille = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      Rr = Math.min(W, H) * .43;
    };
    const proj = (lat, lon, c0, s0, l0) => {
      const cl = Math.cos(lat), dl = lon - l0, X = cl * Math.sin(dl), Y = Math.sin(lat), Z = cl * Math.cos(dl);
      return [X, Y * c0 - Z * s0, Y * s0 + Z * c0];
    };
    const dessiner = t => {
      if (!W) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, l0 = lon0 * D2R, c0 = Math.cos(lat0 * D2R), s0 = Math.sin(lat0 * D2R);
      /* halo, puis la sphère éclairée en haut à gauche */
      const g = ctx.createRadialGradient(cx, cy, Rr * .6, cx, cy, Rr * 1.25);
      g.addColorStop(0, "rgba(141,203,79,.14)"); g.addColorStop(.55, "rgba(141,203,79,.07)"); g.addColorStop(1, "rgba(141,203,79,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Rr * 1.25, 0, 7); ctx.fill();
      const d = ctx.createRadialGradient(cx - Rr * .35, cy - Rr * .4, Rr * .1, cx, cy, Rr);
      d.addColorStop(0, "#1E7A50"); d.addColorStop(1, "#06301F");
      ctx.fillStyle = d; ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(190,235,205,.22)"; ctx.lineWidth = 1; ctx.stroke();
      /* les points : la face cachée n'est pas dessinée, ceux du bord sont plus petits et plus pâles */
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = COUL[k];
        for (const p of pts) {
          if (p[2] !== k) continue;
          const q = proj(p[0], p[1], c0, s0, l0); if (q[2] <= .02) continue;
          ctx.globalAlpha = BASE[k] * (.25 + .75 * q[2]);
          const s = TAILLE[k] * (.6 + .4 * q[2]);
          ctx.fillRect(cx + q[0] * Rr - s / 2, cy - q[1] * Rr - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
      /* le nom du pays */
      const c = proj(-3.2 * D2R, 23.5 * D2R, c0, s0, l0);
      if (c[2] > .25) {
        ctx.globalAlpha = Math.min(1, (c[2] - .25) * 2);
        ctx.font = "700 " + Math.round(Rr * .075) + "px Ubuntu, system-ui, sans-serif"; ctx.textAlign = "center";
        ctx.lineWidth = 4; ctx.strokeStyle = "rgba(4,30,19,.75)"; ctx.strokeText(pays, cx + c[0] * Rr, cy - c[1] * Rr);
        ctx.fillStyle = "#fff"; ctx.fillText(pays, cx + c[0] * Rr, cy - c[1] * Rr);
        ctx.globalAlpha = 1;
      }
      /* Lubumbashi : un point jaune et deux ondes */
      const m = proj(LUBUMBASHI[0] * D2R, LUBUMBASHI[1] * D2R, c0, s0, l0);
      if (m[2] > .05) {
        const mx = cx + m[0] * Rr, my = cy - m[1] * Rr;
        ctx.globalAlpha = Math.min(1, m[2] * 3);
        if (!immobile) for (let r = 0; r < 2; r++) {
          const ph = ((t / 2200) + r / 2) % 1;
          ctx.strokeStyle = "rgba(242,183,5," + ((1 - ph) * .9).toFixed(3) + ")"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(mx, my, 4 + ph * Rr * .14, 0, 7); ctx.stroke();
        }
        ctx.fillStyle = "#F2B705"; ctx.beginPath(); ctx.arc(mx, my, 5, 0, 7); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(mx, my, 2, 0, 7); ctx.fill();
        const fs = Math.max(12, Math.round(Rr * .06));
        ctx.font = "500 " + fs + "px Ubuntu, system-ui, sans-serif";
        let lx = mx + Rr * .1; const ly = my + Rr * .16, tw = ctx.measureText(etiquette).width;
        if (lx + tw + 16 > W) lx = W - tw - 16;
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mx + 3, my + 3); ctx.lineTo(lx, ly - fs * .4); ctx.stroke();
        ctx.fillStyle = "rgba(4,30,19,.85)"; ctx.fillRect(lx - 6, ly - fs - 4, tw + 12, fs + 12);
        ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.fillText(etiquette, lx, ly + 1);
        ctx.globalAlpha = 1;
      }
    };
    const boucle = t => {
      if (!glisse) {
        if (t - repos > 2600 && !immobile) {
          /* au repos, le globe oscille doucement autour de l'Afrique centrale */
          const cl = 22 + 26 * Math.sin(t / 9000), cb = -6 + 7 * Math.sin(t / 13000);
          lon0 += norm(cl - lon0) * .015; lat0 += (cb - lat0) * .015;
        } else { lon0 += vx; lat0 += vy; vx *= .94; vy *= .94; }
        lat0 = Math.max(-65, Math.min(65, lat0)); lon0 = norm(lon0);
      }
      dessiner(t);
      raf = actif && !immobile ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => { if (!raf) raf = requestAnimationFrame(boucle); };
    const ici = new AbortController(), o = { signal: ici.signal };
    cv.addEventListener("pointerdown", e => { glisse = true; px = e.clientX; py = e.clientY; vx = vy = 0; try { cv.setPointerCapture(e.pointerId); } catch (x) {} }, o);
    cv.addEventListener("pointermove", e => {
      if (!glisse) return;
      const k = 57.3 / Rr, dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
      lon0 = norm(lon0 - dx * k); lat0 = Math.max(-65, Math.min(65, lat0 + dy * k));
      vx = Math.max(-2.5, Math.min(2.5, -dx * k)); vy = Math.max(-2, Math.min(2, dy * k));
      if (immobile) dessiner(performance.now()); else relancer();
    }, o);
    const lacher = () => { if (glisse) { glisse = false; repos = performance.now(); } };
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(n => cv.addEventListener(n, lacher, o));
    cv.addEventListener("keydown", e => {
      const p = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, 8], ArrowDown: [0, -8] }[e.key]; if (!p) return;
      e.preventDefault(); lon0 = norm(lon0 + p[0]); lat0 = Math.max(-65, Math.min(65, lat0 + p[1])); repos = performance.now(); vx = vy = 0;
      dessiner(performance.now()); relancer();
    }, o);
    taille();
    const ro = window.ResizeObserver ? new ResizeObserver(() => { taille(); dessiner(performance.now()); }) : null;
    ro?.observe(cv);
    const io = window.IntersectionObserver ? new IntersectionObserver(es => { actif = es[0].isIntersecting && !document.hidden; if (actif) { taille(); relancer(); } }) : null;
    if (io) io.observe(cv); else { actif = true; relancer(); }
    document.addEventListener("visibilitychange", () => { actif = !document.hidden && cv.isConnected; if (actif) relancer(); }, o);
    dessiner(0);
    globeStop = () => { cancelAnimationFrame(raf); raf = 0; actif = false; ici.abort(); ro?.disconnect(); io?.disconnect(); globeStop = null; };
  }

  /* réseau animé de l'accueil, discret */`]
]);

fs.appendFileSync(R + 'styles.css', (t => t.replace(/\r?\n/g, '\r\n'))(`
/* ==========================================================================
   Accueil dynamique, sur le modèle de uborardc.org (28 novembre 2026) :
   question directe à l'assistant, globe 3D, chiffres animés (le code est dans app.js)
   ========================================================================== */
.r-demander { display: flex; align-items: center; gap: 8px; max-width: 520px; margin-top: 22px; padding: 6px 6px 6px 16px;
  border: 1px solid rgba(255, 255, 255, .26); border-radius: 999px; background: rgba(255, 255, 255, .08);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.r-demander:focus-within { border-color: rgba(169, 230, 191, .8); background: rgba(255, 255, 255, .12); }
.r-demander .ic { display: inline-flex; color: #A9E6BF; }
.r-demander .ic svg { width: 18px; height: 18px; }
.r-demander input { flex: 1; min-width: 0; border: 0; background: transparent; color: #fff; font: inherit; font-size: 15px; padding: 8px 0; outline: none; }
.r-demander input::placeholder { color: rgba(255, 255, 255, .7); }
.r-demander .btn { flex: none; background: #fff; color: #0F4A31; border-color: #fff; border-radius: 999px; }
.r-demander .btn:hover { background: #EAF6EC; border-color: #EAF6EC; }
.r-demander-note { margin: 8px 0 0 18px; font-size: 12.5px; color: rgba(255, 255, 255, .72); }
html[lang="en"] .r-demander, html[lang="en"] .r-demander-note { display: none; }

.r-globe { padding-block: clamp(40px, 6vw, 72px); color: #fff;
  background: radial-gradient(120% 90% at 22% 50%, #135C3B 0%, #0A3A26 58%, #062A1B 100%); }
.r-globe-in { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
.r-globe-scene { display: grid; justify-items: center; gap: 6px; }
#globe { display: block; width: min(100%, 460px); aspect-ratio: 1; max-width: 100%; cursor: grab; touch-action: pan-y; border-radius: 50%; }
#globe:active { cursor: grabbing; }
#globe:focus-visible { outline: 2px solid #A9E6BF; outline-offset: 6px; }
.r-globe-aide { margin: 0; font-size: 12.5px; color: rgba(255, 255, 255, .62); }
.r-globe .eyebrow { color: #A9E6BF; }
.r-globe h2 { color: #fff; margin: 8px 0 14px; }
.r-globe h2 .serif { color: #A9E6BF; }
.r-globe-txt > p { margin: 0 0 22px; max-width: 46ch; color: rgba(255, 255, 255, .82); line-height: 1.6; }
.r-globe-reperes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(255, 255, 255, .16); }
.r-globe-reperes li { display: grid; gap: 4px; padding: 16px 18px 0 0; }
.r-globe-reperes li + li { padding-left: 18px; border-left: 1px solid rgba(255, 255, 255, .16); }
.r-globe-reperes b { font-size: clamp(22px, 2.4vw, 30px); font-weight: 300; line-height: 1.1; color: #fff; }
.r-globe-reperes span { font-size: 13.5px; color: rgba(255, 255, 255, .7); }
@media (max-width: 860px) {
  .r-globe-in { grid-template-columns: minmax(0, 1fr); }
  .r-globe-scene { order: 2; }
  #globe { width: min(100%, 340px); }
}
@media (max-width: 520px) {
  .r-demander { padding-left: 12px; }
  .r-demander-note { margin-left: 12px; }
}
`));
console.log('styles.css : couche « accueil dynamique »');
