# entruempelung-site

Statische, lauffähige Website (HTML, CSS, JavaScript – ohne Frameworks/Build-Tools) für eine neu gegründete Entrümpelungsfirma. Alle Texte in de-DE.

## Nutzung

- Einfach `index.html` im Browser öffnen (Doppelklick). Es ist kein Server notwendig.
- Mobile‑first, vollständig responsiv mit Breakpoints bei `640px` und `960px`.
- Bilder werden als performante Inline‑Platzhalter eingebunden, damit alles auch offline sofort sichtbar ist. Zusätzlich liegen geforderte Bilddateien unter `assets/img/` als Platzhalter vor.
 - SEO‑Metas (OG/Twitter) und JSON‑LD (`LocalBusiness`) sind enthalten.

## Features

- Sticky Header mit Transparenz, färbt sich beim Scrollen.
- Mobile Navigation mit Hamburger‑Menü (`aria-expanded`, `aria-controls`).
- Hero mit `<picture>` und Fallback‑Platzhalter, Services/Timeline mit Bild‑Thumbnails (Hover‑Zoom).
- Reveal‑on‑Scroll via `IntersectionObserver`, respektiert `prefers-reduced-motion`.
- Sichtbare `:focus-visible`‑Styles und zugängliche Komponenten (`<details>` für FAQ).
- „Nach oben“-Button erscheint beim Scrollen.

## Struktur

```
/
├─ index.html
├─ impressum.html
├─ datenschutz.html
├─ styles.css
├─ script.js
├─ /assets/img/
│   ├─ hero-portrait.jpg
│   ├─ hero-landscape.jpg
│   ├─ service-1.jpg
│   ├─ service-2.jpg
│   ├─ service-3.jpg
│   ├─ service-4.jpg
│   ├─ service-5.jpg
│   └─ team.jpg
└─ README.md
```

## Anpassung

- Farben/Abstände in `styles.css` über CSS‑Variablen (`--brand`, `--ink`, `--bg`, `--muted`, `--radius`, `--shadow`).
- Texte, Leistungen, FAQ und Formular frei erweiterbar in `index.html`.
- Rechtstexte in `impressum.html` und `datenschutz.html` exemplarisch – bitte durch Ihre echten Unternehmensdaten ersetzen.

### E‑Mail & Telefon anpassen
- In `script.js` am Anfang die Konstanten ändern:
  - `const CONTACT_EMAIL = "kontaktbeispiel.de";` (ersetzen, z. B. `"kontakt@ihre-domain.de"`)
  - `const CONTACT_PHONE = "+49 000 000000";` (Ihre Rufnummer im internationalen Format)
- Diese Werte befüllen automatisch `tel:`/`mailto:`‑Buttons und den Mailto‑Fallback im Formular.

### Mailto‑Fallback (ohne Backend)
- Beim erfolgreichen Absenden des Formulars öffnet sich der Standard‑Mailclient via `mailto:` mit vorausgefülltem Betreff und Inhalt.
- Zusätzlich erscheint eine On‑Page‑Bestätigung (Toast) und eine Statusmeldung im Formular.

### Optional: FormSubmit/Formspree integrieren
- Variante FormSubmit: Action des Formulars setzen, z. B. `action="https://formsubmit.co/YOUR@EMAIL" method="POST"` und `name`‑Attribute beibehalten. `_redirect` kann auf eine Danke‑Seite zeigen.
- Variante Formspree: Action auf Ihre Endpoint‑URL setzen. Beide Varianten erfordern keine eigene Server‑Logik.
- Hinweis: In diesem Projekt ist beides bewusst auskommentiert – Sie können die Kommentarzeilen im Formular aktivieren und `action` ergänzen.

## Deployment

- Lokal: `index.html` doppelklicken.
- GitHub Pages: Repository erstellen, Inhalte pushen, unter Settings → Pages Branch `main`/`master` + root wählen.
- Netlify: Neues Projekt, „Deploy site“ → Ordner hochladen (kein Build nötig) oder mit Git verbinden. `index.html` als Startdatei reicht.

## Hinweise zu Bildern

- Für die sofortige lokale Funktionsfähigkeit sind sichtbare Platzhalterbilder (Data‑URIs) eingebunden.
- Die Dateien unter `assets/img/` sind Platzhalter und können durch echte Fotos ersetzt werden (gleichnamig belassen oder `index.html` anpassen).
