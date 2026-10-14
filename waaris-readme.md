# BUS510 - Veendam Live Tracker

Dit project bevat de broncode en configuratie voor de live tracker van **Buurtbus Lijn 510** (Veendam - Wildervank). Het systeem koppelt de GPS-data van de bussen aan de actuele dienstregeling via de Ovapi-server.

## 📌 Projectgegevens
* **Projectnaam:** PROJECT-BUS510-VEENDAM-2026
* **Actieve versie:** `waaris510ab04.html`
* **Doelgroep:** Chauffeurs (vrijwilligers), beheerders en reizigers.

## 🛠️ Systeemarchitectuur & Werking
De applicatie laadt een lokale statische routestructuur en polt vervolgens live databestanden om actieve ritten te tonen.

1. **Interface (`waaris510ab04.html`):** De frontend die de haltelijst (van Station Veendam tot Wildervank Westerhave) toont met bijbehorende doorkomsttijden.
2. **Data-stream (`live-bus.json`):** Dit bestand wordt continu gepolld om de GPS-locaties en ritnummers van actieve bussen op te vragen.
3. **API-Koppeling (Ovapi):** De backend haalt realtime reisinformatie op via de Ovapi-servers.

## 📉 Statusmeldingen & Logfunctionaliteit
Onderaan het scherm bevindt zich een realtime consolelog om de status van de verbinding te controleren:

* **`Stream verbinding OK. Status: Geen actieve ritten.`**  
  De verbinding met de datastream werkt correct, maar er rijden op dit moment geen bussen (bijvoorbeeld buiten de dienstregeling om, zoals in de avonduren na 16:40 uur).
* **`Bus momenteel afwezig / Ovapi server onbereikbaar of onderhoud`**  
  Dit duidt op een serverstoring aan de kant van Ovapi of netwerkproblemen in de bus. Het systeem valt in dit geval automatisch terug naar de stand-alone lokale modus (`Standalone lokale modus actief`).

## 📋 Dienstregeling Lijn 510 (Maandag t/m Zaterdag)
* **Heenrit (Veendam -> Wildervank):** Eerste reguliere vertrek om **10:42 uur** vanaf halte 1 (Jonkerloods). *Let op: op maandagmorgen rijdt de bus pas vanaf **12:42 uur**.*
* **Laatste rit:** Rit 1414 arriveert om **16:40 uur** weer bij Station Veendam. Buiten deze tijden zal de tracker standaard de status "Geen actieve ritten" tonen.

## 🔧 Beheer & Foutopsporing
Wanneer de live-tracker niet correct synchroniseert tijdens een actieve dienst:
1. Controleer in de consolelog of `live-bus.json` succesvol gepolld kan worden.
2. Controleer of de boordcomputer in de 8-persoonsbus een actieve GPS-fix heeft en data verstuurt.
3. Herlaad de pagina (`F5`) om de streamverbinding met de server handmatig te herstarten.
