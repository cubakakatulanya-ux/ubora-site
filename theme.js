/* Chargé en tête de chaque page, avant l'affichage. */

/* Les sous-domaines d'outils mènent tout de suite à l'outil, sans afficher le site. */
(function () {
  var outils = { bp: "/generateur/", hub: "https://uborahub.com" };
  var sd = location.hostname.split(".")[0];
  if (location.hostname.split(".").length > 2 && outils[sd] && location.pathname === "/") location.replace(outils[sd]);
})();

/* Thème choisi par le visiteur. */
try {
  var t = JSON.parse(localStorage.getItem("ubora_theme_2026"));
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
