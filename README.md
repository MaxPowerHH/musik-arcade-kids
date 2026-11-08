# Musik-Arcade · PWA-Testversion

**ARCADE-PWA-FULL02-PWA01-20261108**. Vier Musikübungen mit Julia und Tom. Keine Anmeldung, keine echten Schülerdaten, kein echtes Geld. Die Spielmechanik, Grafik und Audio-Dateien der FULL02-Basis sind unverändert; ergänzt sind nur PWA-Rahmen, Icons und Offline-Auslieferung.

**Öffentliche Testfassung:** [Musik-Arcade starten](https://maxpowerhh.github.io/musik-arcade-kids/).

Dieses Repository ist ausschließlich die bereinigte statische Distribution. Es enthält kein Schulplaner-Backend und keine internen Prüfberichte. Die Website ist für den Kindertest freigegeben; ungeprüfte Geräte und Installationswege bleiben unten ausdrücklich benannt.

## Hosting verwalten

1. GitHub Pages ist für dieses eigenständige Repository auf `main` und Root `/` konfiguriert. Freigegebene Änderungen an `main` lösen eine neue Bereitstellung aus. Nicht das Schulplaner-Repository verwenden.
2. Nach Änderungen den erfolgreichen Pages-Build und **Enforce HTTPS** kontrollieren. Den oben angegebenen HTTPS-Link verwenden.
3. Vor Weitergabe auf den vorgesehenen Geräten vollständig testen. Pages ist öffentlich: Ein ungenannter Link ist kein Passwortschutz. Zustimmung und Datenschutzprüfung für die Testgruppe liegen bei den Verantwortlichen.

Alle Laufzeitpfade sind relativ, auch für Projekt-Unterpfade. Keine Domain ist im Spiel oder Service Worker fest einprogrammiert. Es gibt keinen eigenen Deployment-Workflow im Quellcode; GitHub verwaltet den Pages-Build. Nur diese Distributionsdateien veröffentlichen, keine privaten Projektdateien dazukopieren.

## Spielen und installieren

Den HTTPS-Link öffnen, „Heute üben“ wählen. Notenlesen → Hören → Rhythmus → Quiz → Tagesauswertung. Im Spiel mit „Arcade“ pausieren und später im selben Browser fortsetzen.

- iPhone/iPad: in Safari öffnen → Teilen → Zum Home-Bildschirm; je nach System „Als Web-App öffnen“.
- Android: im unterstützten Browser „App installieren“/„Zum Startbildschirm hinzufügen“.
- Windows/Mac: Installationssymbol des unterstützten Browsers; Safari auf unterstützten Macs bietet „Zum Dock hinzufügen“. Sonst normal im Browser spielen.

Installationsangebote hängen vom Browser/System ab. Eine Größenprüfung im Desktop-Browser ersetzt keinen echten Mobilgerätetest. Mac, iOS und Android sowie native App-Installation dieser PWA sind noch nicht als getestet freigegeben.

## Offline, Ton, Fortschritt und Updates

Einmal mit Verbindung öffnen und auf **Offline bereit** warten. Erst dann ohne Netz neu starten. Der Service Worker speichert alle benötigten lokalen Spiel-, Bild-, Icon-, CSS- und JS-Dateien; Downloadfehler oder falsche Hashes verhindern eine unvollständige neue Installation. Ein Gerät kann Browserdaten entfernen; Offline-Verfügbarkeit ist keine dauerhafte Datensicherung. Beim allerersten Besuch ohne Netz kann die App noch nicht funktionieren.

Ton benötigt eine Berührung im Spiel. Bei Stille vorhandene Ton-Taste und Geräte-Lautstärke prüfen. Es gibt keine Mikrofonabfrage. Optionale bestehende MIDI-Bedienung kann je nach Browser nicht verfügbar sein.

Fortschritt liegt nur im Browser/App-Profil dieser Origin, nicht in einem Konto. Browser, installierte App und Geräte können getrennte Speicher haben. Keine Synchronisierung oder automatische Übernahme aus der Datei-Version. Mehrere Tabs nicht gleichzeitig spielen. Mehrere Arcade-Installationen unter demselben Host können dieselben ursprünglichen Speicher-Schlüssel teilen. Browser-/Website-Daten löschen entfernt Fortschritt; bestehende Daten nicht zur Fehlerbehebung löschen.

Eine neue Version wartet, solange alte Arcade-Fenster offen sind. Alle Fenster/App schließen, dann neu öffnen; kein erzwungenes Update mitten im Spiel. Release-Verzeichnisse niemals überschreiben. Bei künftigen Updates neue Version und neue Release-Pfade bauen und veröffentlichen; alte Release-Verzeichnisse behalten, solange sie benötigt werden. Der Worker entfernt nur eigene alte Asset-Caches, niemals Spielstände oder Caches anderer Apps. Es gibt weder Analytics noch externe Fonts/CDNs. GitHub als Hosting-Anbieter verarbeitet dennoch technische Abrufdaten; kein Zugangsschutz und keine Zusage vollständiger Anonymität.

## Startprobleme

PWA/Service Worker brauchen HTTPS oder localhost. `file://` installiert diese PWA nicht. Bei „Offline nicht bereit“ mit Verbindung erneut öffnen und Speicherfreigaben prüfen. Unbekannte Pfade zeigen eine lokale Rückkehrseite. Fehlende oder nicht passende Dateien werden nicht durch eine andere Spielversion ersetzt. Versionskennung, Browser/Gerät, Schritt und Screenshot melden; keine persönlichen Daten senden.

Referenz-SHA-256 der FULL02-ZIP: `645f0573da5ad7bf6af4097322912a4fc04995c89f419059d2d96f0ff7b047bf`. Laufzeit-Hashes: `distribution.json`.

Technische Grundlagen: [PWA-Installation (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable), [Service Worker (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), [Lebenszyklus (web.dev)](https://web.dev/articles/service-worker-lifecycle), [GitHub Pages und HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
