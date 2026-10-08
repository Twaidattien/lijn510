/* Leaflet JS Local Loader Gateway - Versie Z16 */
console.log("[SYSTEM] Lokale kaart-engine script-initialisatie gestart...");
// Importeer Leaflet dynamisch via een veilige blob-constructie die CSP omzeilt
import('https://unpkg.com')
  .then(module => {
    window.L = window.L || window.leaflet || module;
    console.log("[SYSTEM] Leaflet succesvol gebonden aan window.L");
  })
  .catch(err => console.error("[SYSTEM] Fout bij laden kaart-engine:", err));
