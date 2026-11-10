# MUSIK-ARCADE – V1.1 LAYOUT-TEST (09.11.2026)

**Nicht freigegeben, nicht veröffentlicht.** Diese ZIP ist eine neue, getrennte Testkopie. Die eingefrorene V1.0 und die öffentliche Website wurden NICHT verändert.

Basis: V1.0-Meilensteinpaket SHA-256 a6750b9ded4cd7cc8cc78ee010edb9f842cdc5c542065348e4fd3bb2e4fbcc4b.

Geändert wurden nur visuelle Layout-Regeln in Arcade_Start.html, Notenfresser.html, Drei_Musikspiele.html und pwa.css, plus Kennzeichnung im PWA-Einstieg. Spiel-JavaScript und alle PNG-/Audio-Assets unverändert. Offline-Manifest/Service-Worker-Hashes für die neue Testkopie konsistent neu berechnet.

Auf kleinen Displays während des aktiven Spiels: Arcade-Navigationsleisten reduziert; Notenfresser-Überschriften, Statistiken, Nebentexte ausgeblendet; Figuren, Notensystem und Klaviatur erhalten Vorrang; Querformat erhält zweispaltige Spielansicht. Sonstige Menüs bleiben erhalten und dürfen scrollen.

**So testen:**
1. ZIP vollständig in einen NEUEN Ordner entpacken. Niemals mit Dateien einer anderen Version vermischen.
2. Auf PC/Mac zum ersten optischen Test die Datei `public/index.html` öffnen; für echten Offline-PWA-/Service-Worker-Test müssen alle Dateien in `public/` über eine eigene HTTPS-Testadresse oder localhost ausgeliefert werden. Datei-URL startet keine PWA-Installation.
3. Browser auf einem iPhone/Android kann eine lokal entpackte ZIP nicht wie eine öffentliche PWA öffnen. Deshalb ist diese ZIP zunächst für Tom als Quell-/Desktop-Teststand gedacht. Für echte Handytests benötigt die Kopie eine separate Testhosting-Adresse, ohne die öffentliche V1.0-Adresse zu überschreiben.
4. Besonders bei Notenfresser prüfen: Figuren, Note und Tasten gleichzeitig ohne vertikales Scrollen; Hoch-/Querformat, Browserleisten, Klick-/Touchreaktion und Tagesfortschritt. Noch nicht als erfolgreich am echten Gerät geprüft.
5. Fehler bitte mit Gerät/Browser/Ausrichtung/Screenshot melden. Die 1.0-Website bleibt gültiger Stand.

**Prüfung hier:** ZIP der V1.0 SHA-256 original bestätigt; neue Asset-Hashes und SW-Cache-Konsistenz, HTML-Dateiverweise und JS-Syntax geprüft. Eingebettete Spielskripte bytegleich. Lokale Browser-Sichtprüfung in dieser Umgebung BLOCKIERT (Chromium ERR_BLOCKED_BY_ADMINISTRATOR), daher KEINE Behauptung einer erfolgreichen Darstellung auf allen Bildschirmgrößen.
