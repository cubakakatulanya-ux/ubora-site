/* Contrôle de l'accueil dynamique : bannière avec la question, globe (deux instants), chiffres, assistant, téléphone, anglais. */
const fs = require('fs');
const D = require('path').join(require('os').tmpdir(), 'vues-accueil-1128') + '/';
fs.mkdirSync(D, { recursive: true });
module.exports = async p => {
  const garder = async nom => fs.writeFileSync(D + nom + '.png', await p.vue());
  await p.taille(1280, 800, false);
  await p.aller('http://localhost:5188/');
  await p.attendre(3000);
  await garder('1-banniere');
  /* les chiffres : on remonte en haut de la liste pour voir l'animation partir de zéro */
  const avant = await p.js(`document.documentElement.style.scrollBehavior = 'auto'; [...document.querySelectorAll('[data-compte]')].map(b => b.textContent).join(' | ')`);
  await p.js(`document.querySelector('.r-globe').scrollIntoView({ block: 'center' }); 1`);
  await p.attendre(400);
  const pendant = await p.js(`[...document.querySelectorAll('.r-globe [data-compte]')].map(b => b.textContent).join(' | ')`);
  await p.attendre(1500);
  await garder('2-globe-a');
  await p.attendre(4000);
  await garder('3-globe-b');
  const etat = await p.js(`(() => { const g = document.getElementById('globe'); return JSON.stringify({ taille: [g.clientWidth, g.clientHeight, g.width, g.height], chiffres: [...document.querySelectorAll('[data-compte]')].map(b => b.textContent) }); })()`);
  /* glisser le globe à la souris (événements de pointeur simulés) */
  const glisse = await p.js(`(() => { const g = document.getElementById('globe'), b = g.getBoundingClientRect(); const ev = (t, x) => g.dispatchEvent(new PointerEvent(t, { bubbles: true, clientX: b.left + x, clientY: b.top + b.height / 2, pointerId: 1 }));
    ev('pointerdown', 200); for (let x = 200; x > 60; x -= 10) ev('pointermove', x); ev('pointerup', 60); return 'ok'; })()`);
  await p.attendre(600);
  await garder('4-globe-glisse');
  /* question à l'assistant depuis la bannière */
  await p.js(`scrollTo(0, 0); const f = document.querySelector('[data-demander]'); f.querySelector('input').value = 'Combien coûte une formation ?'; f.requestSubmit(); 1`);
  await p.attendre(1200);
  const chat = await p.js(`(() => { const b = document.getElementById('chatBox'); return JSON.stringify({ ouvert: b && !b.hidden, messages: b ? [...b.querySelectorAll('.msg')].map(m => m.className + ' : ' + m.innerText.slice(0, 90)) : [] }); })()`);
  await garder('5-assistant');
  /* téléphone */
  await p.taille(390, 844, true);
  await p.aller('http://localhost:5188/');
  await p.attendre(2500);
  await garder('6-tel-banniere');
  await p.js(`document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('.r-globe').scrollIntoView({ block: 'start' }); 1`);
  await p.attendre(2000);
  await garder('7-tel-globe');
  const debord = await p.js(`document.documentElement.scrollWidth - innerWidth`);
  /* anglais : pas de champ de question (l'assistant n'existe qu'en français) */
  await p.taille(1280, 800, false);
  await p.aller('http://localhost:5188/en');
  await p.attendre(2500);
  const en = await p.js(`JSON.stringify({ champ: getComputedStyle(document.querySelector('.r-demander')).display, titre: document.querySelector('#titre-globe').innerText, aide: document.querySelector('.r-globe-aide').innerText })`);
  await p.js(`document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('.r-globe').scrollIntoView({ block: 'center' }); 1`);
  await p.attendre(2000);
  await garder('8-en-globe');
  console.log(JSON.stringify({ avant, pendant, etat: JSON.parse(etat), glisse, chat: JSON.parse(chat), debord, en: JSON.parse(en), erreurs: p.erreurs }, null, 1));
};
