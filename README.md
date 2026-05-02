# Kairos VIII Japan Escape Itinerary

Live site: https://kairosfx.github.io/itinerary/

---

## Features

### Bilingual interface
The site presents content in **English and Japanese** for easier reference during the trip.

### Mobile-friendly travel reference
The site is meant to work as a practical trip companion before departure and while moving between destinations.

### Offline and print references
The site includes an offline snapshot and a printable travel sheet for route, stay, transit, and emergency-reference notes.

---

## Project Goal

The goal of this project is to create a calm, well-structured travel reference that keeps the route, checklist, and practical notes in one place.

It is designed less like a full travel blog and more like a **personal trip companion**.

---

## Security Note

The password screen is a front-end vibe gate, not real security. The password logic ships in public JavaScript, so do not store hotel confirmation numbers, passport details, payment data, or anything truly private in this repository or on the live site.

---

## Tech / Presentation Notes

This project is presented as a lightweight brochure-style website focused on clarity, structure, and quick access to useful information.

## Build

Install dependencies once:

```bash
npm install
```

Generate the minified deploy assets used by `docs/index.html`:

```bash
npm run build
```

Run the full local check pipeline:

```bash
npm run build
npm run perf
```

## Credits

- Radio source: Kairos VIII YouTube playlist, embedded through the YouTube iframe player
- Map tiles/style: OpenFreeMap Positron
- Map renderer: MapLibre GL JS, with license retained at `docs/assets/vendor/maplibre/LICENSE.txt`
- App icons and background media: local project assets under `docs/assets/`

## License

All rights reserved. See `LICENSE`.
