/* Applique le thème choisi par le visiteur avant l'affichage de la page. */
try {
  var t = JSON.parse(localStorage.getItem("ubora_theme"));
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
