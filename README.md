# Kairos Itinerary

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

## Vercel

Vercel is configured with `vercel.json`:

- Build command: `npm run build`
- Output directory: `docs`
- Production URL path: `/`

The site keeps relative asset paths so the same build can work on Vercel at `/` and GitHub Pages at `/itinerary/`.
