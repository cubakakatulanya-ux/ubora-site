/* Relief 3D des images (20 novembre 2026), sans bibliothèque :
   - inclinaison en perspective qui suit la souris, avec un reflet de lumière (souris seulement) ;
   - entrée en perspective des cartes au défilement ;
   - écrans d'application présentés de biais, qui flottent ; photos d'en-tête en lent mouvement de profondeur ;
   - rien ne bouge si le visiteur a demandé moins d'animations. */
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..') + '/';
const lire = f => fs.readFileSync(R + f, 'utf8').split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
const patch = (f, paires) => {
  let t = lire(f);
  for (const [a, b] of paires) { if (!t.includes(a)) throw new Error(f + ' introuvable : ' + a.slice(0, 90)); t = t.replace(a, () => b); }
  fs.writeFileSync(R + f, t); console.log(f, ':', paires.length);
};

patch('app.js', [
  [`    reveal(); mouvement(keep || garder || ancre ? 0 : scrollY); if (!garder) typo(app);`,
   `    reveal(); mouvement(keep || garder || ancre ? 0 : scrollY); relief(keep || garder || ancre ? 0 : scrollY); if (!garder) typo(app);`],
  [`  /* Accueil : la photo de la bannière change toutes les six secondes et demie, avec le même mouvement.`,
   `  /* Relief 3D : les photos, les écrans et les cartes s'inclinent en perspective sous la souris, avec un reflet
     de lumière ; au défilement, les cartes se redressent depuis un léger angle. Souris seulement pour l'inclinaison,
     et rien du tout si le visiteur a demandé moins d'animations. */
  let ioRelief;
  function relief(depart = 0) {
    ioRelief?.disconnect();
    if (calme()) return;
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      $$(".r-hero-photo, .pg-hero, .solution:not(.bientot), .r-pole, .pg-carte-photo, .pg-ecran .screen", app).forEach(el => {
        if (el.dataset.relief) return;
        el.dataset.relief = "1"; el.classList.add("r3d-tilt");
        const max = el.matches(".pg-hero") ? 2.5 : el.matches(".r-pole") ? 5 : 7;
        let raf = 0;
        el.addEventListener("pointermove", e => {
          const b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            el.style.setProperty("--ry", ((x - .5) * 2 * max).toFixed(2) + "deg");
            el.style.setProperty("--rx", ((.5 - y) * 2 * max).toFixed(2) + "deg");
            el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
            el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
            el.classList.add("r3d-actif");
          });
        });
        el.addEventListener("pointerleave", () => { cancelAnimationFrame(raf); el.classList.remove("r3d-actif"); ["--rx", "--ry"].forEach(v => el.style.removeProperty(v)); });
      });
    }
    if (!("IntersectionObserver" in window)) return;
    ioRelief = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; ioRelief.unobserve(el); el.classList.add("r3d-vu");
      setTimeout(() => { el.classList.remove("r3d-entree", "r3d-vu"); el.style.removeProperty("--r3d-retard"); }, 1600);
    }), { rootMargin: "0px 0px -6% 0px" });
    $$(".pg-carte, .vitrine-grille > .solution, .r-poles > .r-pole, .r-chiffres li, .r-bande", app).forEach((el, i) => {
      if (el.getBoundingClientRect().top + depart < innerHeight * .95) return;
      el.classList.add("r3d-entree"); el.style.setProperty("--r3d-retard", (i % 4) * 80 + "ms"); ioRelief.observe(el);
    });
  }

  /* Accueil : la photo de la bannière change toutes les six secondes et demie, avec le même mouvement.`]
]);

fs.appendFileSync(R + 'styles.css', `
/* ==========================================================================
   Relief 3D (20 novembre 2026) : perspective, reflet de lumière, profondeur.
   Seulement des transformations (fluides, sans recalcul de mise en page) ;
   aucune animation si le visiteur a demandé moins de mouvement.
   ========================================================================== */
@media (prefers-reduced-motion: no-preference) {
  /* inclinaison sous la souris */
  .r3d-tilt { position: relative; transform-style: preserve-3d; transition: transform .6s cubic-bezier(.2, .8, .2, 1), box-shadow .5s ease; }
  .r3d-tilt.r3d-actif { transition: transform .12s linear, box-shadow .3s ease; transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0); box-shadow: 0 34px 70px -34px rgba(8, 36, 24, .5); will-change: transform; }
  .r3d-tilt.r3d-actif::after { content: ""; position: absolute; inset: 0; z-index: 3; border-radius: inherit; pointer-events: none; background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, .26), rgba(255, 255, 255, 0) 55%); mix-blend-mode: soft-light; }
  .r-hero-photo.r3d-actif .r-hero-badge { transform: translateZ(60px); transition: transform .3s ease; }
  .r-hero-badge { transition: transform .6s cubic-bezier(.2, .8, .2, 1); }
  .r-pole.r3d-actif { transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3px); }
  /* entrée en perspective au défilement */
  .r3d-entree { opacity: 0; transform: perspective(1100px) rotateX(16deg) translateY(40px) scale(.97); transform-origin: 50% 100%; }
  .r3d-entree.r3d-vu { opacity: 1; transform: none; transition: opacity .8s ease var(--r3d-retard, 0ms), transform 1.2s cubic-bezier(.16, .84, .24, 1) var(--r3d-retard, 0ms); }
  /* photos d'en-tête : lent mouvement de profondeur */
  .r-hero-photo img, .pg-hero-photo img { animation: r3d-profondeur 26s ease-in-out infinite alternate; transform-origin: 60% 40%; }
  @keyframes r3d-profondeur { from { transform: scale(1); } to { transform: scale(1.08) translate3d(-1.4%, -1%, 0); } }
  /* écrans des applications : présentés de biais, ils flottent, et se redressent sous la souris */
  .pg-ecran { perspective: 1200px; animation: r3d-flotte 7s ease-in-out infinite alternate; }
  .pg-ecran .screen { transform: rotateY(-14deg) rotateX(5deg); box-shadow: 34px 44px 80px -40px rgba(0, 0, 0, .65); border-radius: 18px; }
  .pg-ecran .screen.r3d-actif { transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); }
  @keyframes r3d-flotte { from { transform: translateY(0); } to { transform: translateY(-10px); } }
  /* vitrine : l'écran de l'application avance légèrement quand la carte s'incline */
  .solution .solution-img { transition: transform .6s cubic-bezier(.2, .8, .2, 1); }
  .solution.r3d-actif .solution-img { transform: translateZ(30px) scale(1.03); }
  .pg-carte-photo { border-radius: 12px; }
  .pg-carte-photo.r3d-actif img { transform: scale(1.04); transition: transform .4s ease; }
}
`);
console.log('styles.css : relief 3D');
