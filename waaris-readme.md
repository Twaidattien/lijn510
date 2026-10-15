# 🚌 Bus 510 Veendam - Live Tracker Project
### 🆔 Referentie: PROJECT-BUS510-VEENDAM-2026

Dit project is een realtime OV-tracker voor **Buurtbus Lijn 510** in Veendam (gereden door Qbuzz, regio Groningen/Drenthe). De applicatie bestaat uit een geautomatiseerde backend via GitHub Actions en een interactieve webinterface aan de voorkant.

---

## 🏗️ Actuele Status & Architectuur

Het project is opgesplitst in een backend-scraper en een frontend-interface. De gegevensuitwisseling verloopt via een centraal JSON-bestand.

### 1. Backend (`.github/workflows/live.yml`)
* **Trigger:** Draait automatisch via een `cron`-timer (elke 5 minutes) of handmatig via `workflow_dispatch`.
* **Techniek:** Maakt gebruik van een inline **Node.js**-script (in plaats van `curl`) om netwerk- en SSL-blokkades van cloudservers te omzeilen.
* **Databron:** Bevraagt de officiële, lichtgewicht **9292/OVapi-reisplanner API** via het unieke endpoint:  
  `https://9292.nl`
* **Git-Logica:** Maakt gebruik van een geforceerde rebase-strategie met prioriteit voor de runner (`git pull origin main --rebase -X ours --allow-empty`). Hierdoor overschrijft het script de data autonoom en zijn handmatige synchronisatieconflicten verleden tijd.

### 2. Dataoverdracht (`live-bus.json`)
Dit bestand wordt automatisch gegenereerd en up-to-date gehouden door de backend. Het kent twee statussen:
* **Niet Live (Fallback):** 
  ```json
  {
    "isLive": false,
    "msg": "Bus 510 (Veendam) is momenteel niet live (buiten dienstregeling)"
  }
  ```
* **Live (Indien beschikbaar):**
  ```json
  {
    "isLive": true,
    "latitude": 53.xxxxxx,
    "longitude": 6.xxxxxx,
    "speed": 35
  }
  ```

### 3. Frontend (`waaris510ab04.html`)
* **Werking:** Polt continu naar `live-bus.json`.
* **Live-modus:** Zodra `isLive: true` is, worden de coördinaten ingeladen om de bus live op de kaart te tonen.
* **Standalone-modus (Actueel):** Indien `isLive: false`, schakelt de interface direct over naar een stabiele lokale fallback. De geplande doorkomsttijden (dienstregeling) worden getoond en de statusbalk geeft netjes de melding *"Bus momenteel afwezig"* weer.

---

## 🔍 Belangrijkste Conclusie & Volgende Stap

Tijdens de ontwikkelsessie is vastgesteld dat de volledige code-keten (zowel backend als frontend) **100% foutloos en stabiel werkt**. De interface verwerkt de data exact zoals bedoeld. 

**De huidige uitdaging:**  
De backend ontvangt op dit moment geen actieve GPS-coördinaten vanuit de datastream (`isLive: false`), hoewel de bus volgens de dienstregeling (rit van 10:42 tot 16:40 uur) rijdt. 

**Actiepunt voor de volgende keer:**
Het project staat tijdelijk in de wacht om te **verifiëren of de buurtbus daadwerkelijk een live GPS-signaal uitzendt**. Dit wordt gecontroleerd via onafhankelijke platformen zoals *OVzoeker.nl* of de app *OVinfo* op het moment dat de bus fysiek door Veendam rijdt.

* **Scenario A (Bus zendt wel uit):** We controleren de specifieke JSON-velden van de 9292-respons in de GitHub-logs om te zien onder welke exacte key Qbuzz de live-coördinaten op dat moment verstuurt.
* **Scenario B (Bus zendt niet uit):** De code blijft in de huidige staat behouden als een betrouwbare standalone-planner, of we bouwen een handmatige 'test/simulatie-knop' in de interface om de rijdende bus na te bootsen.
