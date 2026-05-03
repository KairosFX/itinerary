# Itinerary

Live site: https://kairosfx.github.io/itinerary/

---

## Features

### Bilingual interface
The site presents content in **English and Japanese** for easier reference during the trip.

---

## Project Goal

The goal of this project is to create a calm, well-structured travel reference that keeps the route, checklist, and practical notes in one place.

It is designed less like a full travel blog and more like a **personal trip companion**.

---

## Tech / Presentation Notes

This project is presented as a brochure-style website focused on clarity, structure, and quick access to useful information.

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

- Radio source: Kairos YouTube playlist, embedded through the YouTube iframe player
- Map tiles/style: OpenFreeMap Positron
- Map renderer: MapLibre GL JS, with license retained at `docs/assets/vendor/maplibre/LICENSE.txt`
- App icons and background media: local project assets under `docs/assets/`

## License

All rights reserved. See `LICENSE`.
