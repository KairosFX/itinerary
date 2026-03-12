const SEARCH_ITEMS = [
  {
    title: "Recommendation Engine",
    text: "Rank the route around food, scenery, nightlife, budget, weather, and transfer tolerance.",
    href: "./index.html#trip-profile"
  },
  {
    title: "City Preview Deck",
    text: "Open preview images for Osaka, Kyoto, Hakone, Fuji, and Tokyo before locking in the route.",
    href: "./index.html#visual-previews"
  },
  {
    title: "Itinerary Overview",
    text: "Where you stay each night, day flow, and route pacing.",
    href: "./itinerary.html#day-flow"
  },
  {
    title: "Osaka Food Picks",
    text: "Takoyaki, okonomiyaki, kushikatsu, gyoza, and neon-night areas.",
    href: "./food.html#osaka-food"
  },
  {
    title: "Kyoto Food Picks",
    text: "Matcha sweets, soba, tofu, and slower food stops.",
    href: "./food.html#kyoto-food"
  },
  {
    title: "Hakone Food And Early Close Note",
    text: "Ryokan meals, station snacks, and why you buy backup food early.",
    href: "./food.html#hakone-food"
  },
  {
    title: "Fuji Visibility Rule",
    text: "Day 6 stays weather-led. Clear view first, strict order second.",
    href: "./itinerary.html#fuji-visibility"
  },
  {
    title: "Tokyo Finish",
    text: "Shibuya shopping, dinner, and skyline close.",
    href: "./itinerary.html#tokyo-finish"
  },
  {
    title: "Shin-Osaka To Odawara",
    text: "Main shinkansen booking day, luggage note, and timing.",
    href: "./toolkit.html#shinkansen"
  },
  {
    title: "Hakone Freepass",
    text: "When the area pass helps and how Odawara hands off into Hakone.",
    href: "./toolkit.html#hakone-passes"
  },
  {
    title: "IC Cards",
    text: "Low-friction local transit for Osaka, Kyoto, and Tokyo.",
    href: "./toolkit.html#ic-cards"
  },
  {
    title: "Packing And Weather",
    text: "All-year seasonal facts, city weather notes, and what layers to bring.",
    href: "./toolkit.html#weather-packing"
  },
  {
    title: "Station Shortcuts And Luggage",
    text: "Shibuya Hachiko side, major lockers, and what to book before transfer days.",
    href: "./toolkit.html#station-shortcuts"
  },
  {
    title: "Safety Quick Ref",
    text: "Top etiquette and safety reminders in one short skim block.",
    href: "./culture.html#quick-ref"
  },
  {
    title: "Onsen Etiquette",
    text: "Quiet bath basics, towel rule, and photo-free spaces.",
    href: "./culture.html#onsen-etiquette"
  },
  {
    title: "Temple And Train Etiquette",
    text: "Short practical do and do not notes for first-time visitors.",
    href: "./culture.html#etiquette"
  },
  {
    title: "Helpful Japanese Phrases",
    text: "Directions, prices, photos, and asking for help.",
    href: "./culture.html#phrases"
  },
  {
    title: "Photo Prompts",
    text: "Where to stand and when to shoot in Osaka, Kyoto, Hakone, Fuji, and Tokyo.",
    href: "./culture.html#photo-prompts"
  },
  {
    title: "Quick Snapshot",
    text: "Portable mobile or printable essentials page.",
    href: "./quick_snapshot.html"
  },
  {
    title: "Full Interactive Guide",
    text: "The full all-in-one page with cards, galleries, and deeper notes.",
    href: "./guide.html"
  }
];

const TERM_ITEMS = {
  "visibility-led": {
    title: "Visibility-Led",
    text: "For the Fuji block, the clearest mountain view decides the order. If Fuji is visible, go to the strongest viewpoint first and move the rest around it."
  },
  shinkansen: {
    title: "Shinkansen",
    text: "Japan's high-speed bullet train. In this route it matters most for the Shin-Osaka to Odawara move on the Hakone transfer day."
  },
  "ic-card": {
    title: "IC Card",
    text: "A rechargeable tap card like ICOCA, Suica, or PASMO that makes local transit cleaner than buying single tickets over and over."
  },
  ryokan: {
    title: "Ryokan",
    text: "A traditional inn, often with a set meal, tatami room, and a calmer overnight pace that fits Hakone especially well."
  },
  konbini: {
    title: "Konbini",
    text: "Japanese convenience stores. They are the backup plan for onigiri, drinks, desserts, and late food when energy or time gets tight."
  },
  "hachiko-side": {
    title: "Hachiko Side",
    text: "The easiest first-side of Shibuya for the Crossing and a simple meet point if the group wants a low-confusion Tokyo start."
  },
  "hakone-freepass": {
    title: "Hakone Freepass",
    text: "A bundled transport pass for the Hakone area. The area-only version fits this route better than the Tokyo round-trip version."
  },
  "coin-lockers": {
    title: "Coin Lockers",
    text: "Station lockers or luggage counters used to drop bags before sightseeing. Big stations are usually the safest and fastest places to rely on them."
  },
  "yoshida-udon": {
    title: "Yoshida Udon",
    text: "A Mount Fuji area noodle specialty known for firmer noodles and a practical local-lunch feel around the Kawaguchiko and Fujiyoshida side."
  },
  izakaya: {
    title: "Izakaya",
    text: "A casual Japanese pub-style place built around shared plates, drinks, and a flexible dinner pace that works well in Osaka or Tokyo."
  },
  "late-backup": {
    title: "Late Backup",
    text: "The simple fallback plan when the day runs long: convenience-store snacks, ramen, dessert, or one easy meal instead of a complicated last-minute search."
  },
  onsen: {
    title: "Onsen",
    text: "A hot-spring bathing area. The core rules are wash first, keep towels out of the bath, and leave phones away from the water area."
  },
  sumimasen: {
    title: "Sumimasen",
    text: "The most useful all-purpose polite opener. Use it to say excuse me, get attention, or start a quick question."
  },
  "no-photo-signs": {
    title: "No-Photo Signs",
    text: "Many temple halls, shops, and bath areas quietly prohibit photos. Treat posted signs as the final answer."
  },
  "queue-lines": {
    title: "Queue Lines",
    text: "Japan stations and attractions rely on orderly queues. Stand in line cleanly, let people off first, and avoid crowding the doors."
  }
};

const PREVIEW_GALLERIES = {
  osaka: {
    eyebrow: "Preview Deck / Osaka",
    title: "Osaka: bright, forgiving, and easy to start with",
    description:
      "Osaka is the best landing city in the route because it turns arrival energy into food, light, and low-pressure wandering instead of hard logistics. If the group is tired, Osaka still works.",
    href: "./itinerary.html#osaka-start",
    tags: ["Arrival-ready", "Night food", "Late backup"],
    facts: [
      {
        label: "Best first-night logic",
        text: "This is the easiest city in the route for a tired arrival because food, lights, and district energy do the work without demanding precision timing."
      },
      {
        label: "What the photos mean",
        text: "The strongest Osaka images are less about monuments and more about neon, sign density, and the forgiving street feel after dark."
      },
      {
        label: "How to use it",
        text: "Use Osaka for atmosphere and recovery. It should feel loose, not like the trip is already racing."
      }
    ],
    images: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tsutenkaku%2C_Osaka.jpg?width=1600",
        alt: "Tsutenkaku tower in Osaka",
        caption: "Tsutenkaku above the retro Shinsekai side",
        creditLabel: "Tsutenkaku, Osaka",
        creditLink: "https://commons.wikimedia.org/wiki/File:Tsutenkaku,_Osaka.jpg",
        creditText: "David Kernan, CC BY 4.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/D%C5%8Dtonbori_at_night%2C_Osaka_%2819551420339%29.jpg?width=1600",
        alt: "Dotonbori canal at night in Osaka",
        caption: "Dotonbori after dark when the canal and signs are doing the real work",
        creditLabel: "Dotonbori at night, Osaka",
        creditLink: "https://commons.wikimedia.org/wiki/File:D%C5%8Dtonbori_at_night,_Osaka_(19551420339).jpg",
        creditText: "Kristoffer Trolle, CC BY 2.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Osaka_Aquarium_Kaiyukan.jpg?width=1600",
        alt: "Exterior of Osaka Aquarium Kaiyukan",
        caption: "Kaiyukan as the easy weather-proof anchor on the return Osaka day",
        creditLabel: "Osaka Aquarium Kaiyukan",
        creditLink: "https://commons.wikimedia.org/wiki/File:Osaka_Aquarium_Kaiyukan.jpg",
        creditText: "Tokumeigakarinoaoshima, CC BY-SA 4.0"
      }
    ]
  },
  kyoto: {
    eyebrow: "Preview Deck / Kyoto",
    title: "Kyoto: one concentrated cultural contrast instead of a rushed sweep",
    description:
      "Kyoto changes the texture of the trip. The point is not to consume the whole city in one day; it is to get a strong historic contrast to Osaka with a cleaner, more deliberate rhythm.",
    href: "./itinerary.html#kyoto-day",
    tags: ["Culture weight", "Temple rhythm", "Walk-heavy"],
    facts: [
      {
        label: "Why one day still works",
        text: "Kyoto has enough visual and cultural density that one focused lane can completely reset the mood of the trip."
      },
      {
        label: "Where the payoff is",
        text: "The value comes from street atmosphere, temple setting, and pace shift rather than trying to count landmarks."
      },
      {
        label: "How to keep it smooth",
        text: "Pick a cluster and stay there. The day works better when transit is minimized."
      }
    ],
    images: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Kiyomizu-dera_Temple.Kyoto._Japan_%2850361443956%29.jpg?width=1600",
        alt: "Kiyomizu-dera temple in Kyoto",
        caption: "Kiyomizu-dera and the architectural side of Kyoto's historic weight",
        creditLabel: "Kiyomizu-dera Temple, Kyoto, Japan",
        creditLink: "https://commons.wikimedia.org/wiki/File:Kiyomizu-dera_Temple.Kyoto._Japan_(50361443956).jpg",
        creditText: "Bernard Spragg. NZ, CC0 1.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Fushimi_Inari%2C_Kyoto%2C_20240818_1400_4476.jpg?width=1600",
        alt: "Torii gates at Fushimi Inari in Kyoto",
        caption: "Fushimi Inari's torii rhythm and one of the clearest contrasts to Osaka",
        creditLabel: "Fushimi Inari, Kyoto, 20240818 1400 4476.jpg",
        creditLink: "https://commons.wikimedia.org/wiki/File:Fushimi_Inari,_Kyoto,_20240818_1400_4476.jpg",
        creditText: "Jakub Halun, CC BY 4.0"
      }
    ]
  },
  hakone: {
    eyebrow: "Preview Deck / Hakone",
    title: "Hakone: a scenic overnight that makes the eastbound move feel earned",
    description:
      "Hakone is structural, not decorative. It breaks the long run east, introduces onsen and lake atmosphere, and keeps the trip from feeling like a nonstop city transfer machine.",
    href: "./itinerary.html#hakone-move",
    tags: ["Onsen window", "Scenic pivot", "Reset night"],
    facts: [
      {
        label: "Why it belongs",
        text: "Hakone absorbs the heaviest transfer day and converts it into a calmer overnight instead of a pure transit wall."
      },
      {
        label: "What the preview shows",
        text: "The lakeside torii and softer terrain are the visual signal that the trip has shifted out of pure city mode."
      },
      {
        label: "How to use the stop",
        text: "Keep expectations light on arrival. If the move day runs long, the overnight still succeeds."
      }
    ],
    images: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_torii_%40_Hakone_Shrine_%2813776519615%29.jpg?width=1600",
        alt: "Lake torii at Hakone Shrine",
        caption: "Hakone's lakeside torii and the softer pace after the bullet train transfer",
        creditLabel: "Lake torii @ Hakone Shrine",
        creditLink: "https://commons.wikimedia.org/wiki/File:Lake_torii_%40_Hakone_Shrine_(13776519615).jpg",
        creditText: "Guilhem Vellut, CC BY 2.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hakone_Ashi_Lake_Torii.jpg?width=1600",
        alt: "Torii gate on Lake Ashi in Hakone",
        caption: "Lake Ashi's visual identity, which gives Hakone its own strong mood even in a short stay",
        creditLabel: "Hakone Ashi Lake Torii",
        creditLink: "https://commons.wikimedia.org/wiki/File:Hakone_Ashi_Lake_Torii.jpg",
        creditText: "guiadejapon.es, CC BY-SA 4.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Torii_on_Lake_Ashi_%40_Hakone_Shrine_%2813776879364%29.jpg?width=1600",
        alt: "Torii on Lake Ashi near Hakone Shrine",
        caption: "A second Hakone angle to reinforce the lake-and-shrine atmosphere",
        creditLabel: "Torii on Lake Ashi @ Hakone Shrine",
        creditLink: "https://commons.wikimedia.org/wiki/File:Torii_on_Lake_Ashi_%40_Hakone_Shrine_(13776879364).jpg",
        creditText: "Guilhem Vellut, CC BY 2.0"
      }
    ]
  },
  fuji: {
    eyebrow: "Preview Deck / Mt. Fuji Area",
    title: "Mt. Fuji Area: the scenic section that should stay weather-led",
    description:
      "This is the biggest visual payoff in the route, but it also carries the most weather risk. The right move is to protect flexibility and cash in on the clearest view first.",
    href: "./itinerary.html#fuji-visibility",
    tags: ["Photo priority", "Weather risk", "Flexible order"],
    facts: [
      {
        label: "Why the route bends here",
        text: "Fuji is the only stop where good conditions should be allowed to override the original stop order."
      },
      {
        label: "What the preview shows",
        text: "The area is not one single viewpoint. The best version mixes lake, pagoda, and village-water atmosphere if the forecast allows it."
      },
      {
        label: "How to plan it",
        text: "Check visibility the same morning, then let the strongest Fuji-facing stop go first."
      }
    ],
    images: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Chureito_Pagoda.jpg?width=1600",
        alt: "Chureito Pagoda with Mount Fuji",
        caption: "The classic Chureito composition when visibility lines up",
        creditLabel: "Chureito Pagoda",
        creditLink: "https://commons.wikimedia.org/wiki/File:Chureito_Pagoda.jpg",
        creditText: "Manish Prabhune, CC BY-SA 4.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mount_Fuji_from_Lake_Kawaguchi_s2.jpg?width=1600",
        alt: "Mount Fuji seen from Lake Kawaguchi",
        caption: "Kawaguchiko's wider scenic payoff",
        creditLabel: "Mount Fuji from Lake Kawaguchi s2.jpg",
        creditLink: "https://commons.wikimedia.org/wiki/File:Mount_Fuji_from_Lake_Kawaguchi_s2.jpg",
        creditText: "Alpsdake, CC BY-SA 4.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sokonashi_Pond%2C_Oshino_Hakkai.jpg?width=1600",
        alt: "Sokonashi Pond in Oshino Hakkai",
        caption: "Oshino Hakkai adds spring water, ponds, and a different pace from the main overlook stops",
        creditLabel: "Sokonashi Pond, Oshino Hakkai",
        creditLink: "https://commons.wikimedia.org/wiki/File:Sokonashi_Pond,_Oshino_Hakkai.jpg",
        creditText: "Suikotei, CC BY-SA 4.0"
      }
    ]
  },
  tokyo: {
    eyebrow: "Preview Deck / Tokyo",
    title: "Tokyo: finish in one strong district instead of overloading the end",
    description:
      "The final stop should feel decisive. Shibuya gives you the crossing, shopping pressure, dinner options, and skyline close without fragmenting the last day across the whole city.",
    href: "./itinerary.html#tokyo-finish",
    tags: ["Shibuya-first", "Night skyline", "Clean finale"],
    facts: [
      {
        label: "Best last-day strategy",
        text: "Centering the final day in one district protects energy and reduces last-day transit clutter."
      },
      {
        label: "Where the payoff is",
        text: "Shibuya works because it stacks shopping, recognizable street energy, and skyline closure in one compact zone."
      },
      {
        label: "How to close the trip",
        text: "Book the skyline or final dinner anchor first, then let the rest of the district flex around it."
      }
    ],
    images: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shibuya_crossing_%2812214%29.jpg?width=1600",
        alt: "Shibuya Crossing in Tokyo",
        caption: "Current-day Shibuya crossing scale and street energy",
        creditLabel: "Shibuya crossing (12214).jpg",
        creditLink: "https://commons.wikimedia.org/wiki/File:Shibuya_crossing_(12214).jpg",
        creditText: "Syced, CC0 1.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/2025_Shibuya_Crossing.jpg?width=1600",
        alt: "Shibuya Crossing in 2025",
        caption: "Another crossing angle for the final-city mood",
        creditLabel: "2025 Shibuya Crossing.jpg",
        creditLink: "https://commons.wikimedia.org/wiki/File:2025_Shibuya_Crossing.jpg",
        creditText: "Kakidai, CC BY-SA 4.0"
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shibuya_Night_%28HDR%29.jpg?width=1600",
        alt: "Shibuya at night",
        caption: "Night-lit Shibuya, closer to the energy you want before heading to Shibuya Sky",
        creditLabel: "Shibuya Night (HDR).jpg",
        creditLink: "https://commons.wikimedia.org/wiki/File:Shibuya_Night_(HDR).jpg",
        creditText: "Guwashi999, CC BY 2.0"
      }
    ]
  }
};

const RECOMMENDATION_ITEMS = [
  {
    id: "osaka-arrival-lane",
    title: "Osaka arrival lane",
    text: "Keep the opening nights simple and let food plus neon energy carry the landing.",
    href: "./itinerary.html#osaka-start",
    page: "Itinerary",
    city: "osaka",
    tags: ["Easy landing", "Food-heavy", "Night energy"],
    traits: {
      food: 0.78,
      scenery: 0.12,
      night: 0.92,
      relaxed: 0.72,
      dense: 0.25,
      convenience: 0.95,
      shopping: 0.3,
      onsen: 0,
      culture: 0.18,
      photo: 0.68
    },
    budgetFit: { value: 0.82, balanced: 0.92, comfort: 0.74 },
    weatherFit: { clear: 0.82, mixed: 0.9, cloudy: 0.94 },
    partyFit: { solo: 0.85, couple: 0.9, group: 0.83 },
    weatherRisk: 0.15,
    mobileFit: 0.85
  },
  {
    id: "kyoto-contrast-day",
    title: "Kyoto culture contrast",
    text: "Use one focused day to change the texture of the trip without adding hotel friction.",
    href: "./itinerary.html#kyoto-day",
    page: "Itinerary",
    city: "kyoto",
    tags: ["Culture-heavy", "Walk day", "Historic contrast"],
    traits: {
      food: 0.45,
      scenery: 0.68,
      night: 0.1,
      relaxed: 0.48,
      dense: 0.52,
      convenience: 0.6,
      shopping: 0.12,
      onsen: 0,
      culture: 0.95,
      photo: 0.78
    },
    budgetFit: { value: 0.78, balanced: 0.86, comfort: 0.8 },
    weatherFit: { clear: 0.9, mixed: 0.78, cloudy: 0.62 },
    partyFit: { solo: 0.75, couple: 0.82, group: 0.7 },
    weatherRisk: 0.55,
    mobileFit: 0.55
  },
  {
    id: "hakone-reset-night",
    title: "Hakone reset night",
    text: "Break the long eastbound run with lake air, onsen energy, and a softer overnight.",
    href: "./itinerary.html#hakone-move",
    page: "Itinerary",
    city: "hakone",
    tags: ["Onsen-ready", "Scenic pivot", "Reset pace"],
    traits: {
      food: 0.32,
      scenery: 0.8,
      night: 0.08,
      relaxed: 0.9,
      dense: 0.1,
      convenience: 0.55,
      shopping: 0.05,
      onsen: 0.96,
      culture: 0.38,
      photo: 0.72
    },
    budgetFit: { value: 0.52, balanced: 0.8, comfort: 0.95 },
    weatherFit: { clear: 0.88, mixed: 0.82, cloudy: 0.7 },
    partyFit: { solo: 0.7, couple: 0.88, group: 0.76 },
    weatherRisk: 0.42,
    mobileFit: 0.58
  },
  {
    id: "fuji-visibility-play",
    title: "Fuji visibility playbook",
    text: "Keep the scenic day flexible and cash in on the strongest view first.",
    href: "./itinerary.html#fuji-visibility",
    page: "Itinerary",
    city: "fuji",
    tags: ["Photo payoff", "Weather-led", "Flexible order"],
    traits: {
      food: 0.2,
      scenery: 0.98,
      night: 0.05,
      relaxed: 0.55,
      dense: 0.3,
      convenience: 0.4,
      shopping: 0.08,
      onsen: 0.18,
      culture: 0.32,
      photo: 0.98
    },
    budgetFit: { value: 0.72, balanced: 0.85, comfort: 0.88 },
    weatherFit: { clear: 0.98, mixed: 0.82, cloudy: 0.34 },
    partyFit: { solo: 0.74, couple: 0.86, group: 0.8 },
    weatherRisk: 0.92,
    mobileFit: 0.48
  },
  {
    id: "tokyo-finish-burst",
    title: "Tokyo finish burst",
    text: "Concentrate the ending in Shibuya for shopping, dinner, and skyline closure.",
    href: "./itinerary.html#tokyo-finish",
    page: "Itinerary",
    city: "tokyo",
    tags: ["Shopping finish", "Night payoff", "Finale"],
    traits: {
      food: 0.65,
      scenery: 0.42,
      night: 0.88,
      relaxed: 0.35,
      dense: 0.78,
      convenience: 0.78,
      shopping: 0.95,
      onsen: 0.05,
      culture: 0.28,
      photo: 0.82
    },
    budgetFit: { value: 0.65, balanced: 0.86, comfort: 0.92 },
    weatherFit: { clear: 0.82, mixed: 0.88, cloudy: 0.89 },
    partyFit: { solo: 0.8, couple: 0.84, group: 0.88 },
    weatherRisk: 0.18,
    mobileFit: 0.78
  },
  {
    id: "osaka-food-radar",
    title: "Osaka food radar",
    text: "Lean into the easiest street food, late backup, and comfort-meal city in the route.",
    href: "./food.html#osaka-food",
    page: "Food Guide",
    city: "osaka",
    tags: ["Street food", "Value wins", "Late backup"],
    traits: {
      food: 0.98,
      scenery: 0.08,
      night: 0.82,
      relaxed: 0.72,
      dense: 0.24,
      convenience: 0.9,
      shopping: 0.28,
      onsen: 0,
      culture: 0.2,
      photo: 0.52
    },
    budgetFit: { value: 0.92, balanced: 0.92, comfort: 0.66 },
    weatherFit: { clear: 0.88, mixed: 0.92, cloudy: 0.95 },
    partyFit: { solo: 0.86, couple: 0.9, group: 0.92 },
    weatherRisk: 0.1,
    mobileFit: 0.82
  },
  {
    id: "hakone-ryokan-layer",
    title: "Hakone ryokan layer",
    text: "Use the calmer meal rhythm and early-close logic so Hakone works instead of surprising you.",
    href: "./food.html#hakone-food",
    page: "Food Guide",
    city: "hakone",
    tags: ["Ryokan dinner", "Onsen town", "Practical backup"],
    traits: {
      food: 0.6,
      scenery: 0.48,
      night: 0.02,
      relaxed: 0.85,
      dense: 0.1,
      convenience: 0.62,
      shopping: 0,
      onsen: 0.84,
      culture: 0.28,
      photo: 0.34
    },
    budgetFit: { value: 0.48, balanced: 0.76, comfort: 0.95 },
    weatherFit: { clear: 0.78, mixed: 0.84, cloudy: 0.86 },
    partyFit: { solo: 0.6, couple: 0.86, group: 0.72 },
    weatherRisk: 0.14,
    mobileFit: 0.64
  },
  {
    id: "shinkansen-move-day-prep",
    title: "Shinkansen move-day prep",
    text: "Protect the hardest transfer with the cleanest instructions, luggage notes, and screenshot-ready steps.",
    href: "./toolkit.html#shinkansen",
    page: "Toolkit",
    city: null,
    tags: ["Easy transfers", "Move-day anchor", "Screenshot first"],
    traits: {
      food: 0.1,
      scenery: 0.1,
      night: 0,
      relaxed: 0.64,
      dense: 0.36,
      convenience: 0.98,
      shopping: 0.05,
      onsen: 0,
      culture: 0.05,
      photo: 0.08
    },
    budgetFit: { value: 0.9, balanced: 0.94, comfort: 0.85 },
    weatherFit: { clear: 0.9, mixed: 0.94, cloudy: 0.96 },
    partyFit: { solo: 0.82, couple: 0.84, group: 0.95 },
    weatherRisk: 0.05,
    mobileFit: 0.98
  },
  {
    id: "culture-and-phrases",
    title: "Culture and phrases layer",
    text: "Smooth the trip with etiquette, bath basics, and fast phrases that reduce friction on the ground.",
    href: "./culture.html#phrases",
    page: "Culture Notes",
    city: "kyoto",
    tags: ["Etiquette", "Phrases", "Travel smoother"],
    traits: {
      food: 0.08,
      scenery: 0.2,
      night: 0.05,
      relaxed: 0.62,
      dense: 0.22,
      convenience: 0.74,
      shopping: 0.05,
      onsen: 0.22,
      culture: 0.98,
      photo: 0.18
    },
    budgetFit: { value: 0.92, balanced: 0.92, comfort: 0.9 },
    weatherFit: { clear: 0.94, mixed: 0.96, cloudy: 0.96 },
    partyFit: { solo: 0.85, couple: 0.88, group: 0.9 },
    weatherRisk: 0.02,
    mobileFit: 0.88
  },
  {
    id: "quick-snapshot-backup",
    title: "Quick snapshot backup",
    text: "Keep the most portable version ready for weak signal, group chat, or move-day panic.",
    href: "./quick_snapshot.html",
    page: "Quick Snapshot",
    city: null,
    tags: ["Low signal", "Group-share", "Fast mobile"],
    traits: {
      food: 0.05,
      scenery: 0.05,
      night: 0.05,
      relaxed: 0.78,
      dense: 0.25,
      convenience: 0.94,
      shopping: 0.1,
      onsen: 0.1,
      culture: 0.2,
      photo: 0.08
    },
    budgetFit: { value: 0.94, balanced: 0.94, comfort: 0.9 },
    weatherFit: { clear: 0.95, mixed: 0.96, cloudy: 0.98 },
    partyFit: { solo: 0.88, couple: 0.9, group: 0.98 },
    weatherRisk: 0.01,
    mobileFit: 0.99
  },
  {
    id: "full-interactive-guide",
    title: "Full interactive guide",
    text: "Open the richer all-in-one page if the group wants one deeper visual document instead of separate tabs.",
    href: "./guide.html",
    page: "Full Guide",
    city: null,
    tags: ["Deep dive", "Image-heavy", "All layers"],
    traits: {
      food: 0.75,
      scenery: 0.82,
      night: 0.72,
      relaxed: 0.42,
      dense: 0.72,
      convenience: 0.38,
      shopping: 0.52,
      onsen: 0.42,
      culture: 0.82,
      photo: 0.92
    },
    budgetFit: { value: 0.74, balanced: 0.86, comfort: 0.88 },
    weatherFit: { clear: 0.92, mixed: 0.86, cloudy: 0.78 },
    partyFit: { solo: 0.72, couple: 0.85, group: 0.82 },
    weatherRisk: 0.35,
    mobileFit: 0.44
  },
  {
    id: "station-shortcuts",
    title: "Station shortcuts and lockers",
    text: "Use the station-side notes to make Tokyo arrivals, locker drops, and exits less messy.",
    href: "./toolkit.html#station-shortcuts",
    page: "Toolkit",
    city: "tokyo",
    tags: ["Easy exits", "Lockers", "Shibuya side"],
    traits: {
      food: 0.1,
      scenery: 0.1,
      night: 0.52,
      relaxed: 0.5,
      dense: 0.5,
      convenience: 0.96,
      shopping: 0.72,
      onsen: 0.05,
      culture: 0.08,
      photo: 0.2
    },
    budgetFit: { value: 0.92, balanced: 0.94, comfort: 0.9 },
    weatherFit: { clear: 0.95, mixed: 0.96, cloudy: 0.96 },
    partyFit: { solo: 0.78, couple: 0.84, group: 0.96 },
    weatherRisk: 0.02,
    mobileFit: 0.9
  }
];

function initReveal() {
  const revealElements = [...document.querySelectorAll(".reveal")];
  if (!revealElements.length || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;
  document.documentElement.style.setProperty("--scroll-progress", progress);
}

function renderSearchResults(items, resultsElement) {
  resultsElement.innerHTML = items
    .map(
      (item) => `
        <a class="search-result" href="${item.href}">
          <strong>${item.title}</strong>
          <span>${item.text}</span>
        </a>
      `
    )
    .join("");
}

function initSearch() {
  const input = document.getElementById("site-search");
  const resultsElement = document.getElementById("site-search-results");
  if (!input || !resultsElement) {
    return;
  }

  renderSearchResults(SEARCH_ITEMS.slice(0, 6), resultsElement);

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      renderSearchResults(SEARCH_ITEMS.slice(0, 6), resultsElement);
      return;
    }

    const filtered = SEARCH_ITEMS.filter((item) => {
      const haystack = `${item.title} ${item.text}`.toLowerCase();
      return haystack.includes(query);
    }).slice(0, 8);

    if (!filtered.length) {
      resultsElement.innerHTML = `
        <div class="search-result">
          <strong>No direct match</strong>
          <span>Try terms like Fuji, shinkansen, gyoza, onsen, Kyoto, or quick snapshot.</span>
        </div>
      `;
      return;
    }

    renderSearchResults(filtered, resultsElement);
  });
}

function initTermGroups() {
  const groups = [...document.querySelectorAll("[data-term-group]")];
  if (!groups.length) {
    return;
  }

  groups.forEach((group) => {
    const panel = group.querySelector("[data-term-panel]");
    const buttons = [...group.querySelectorAll("[data-term]")];
    if (!panel || !buttons.length) {
      return;
    }

    const renderTerm = (key) => {
      const item = TERM_ITEMS[key];
      if (!item) {
        return;
      }

      buttons.forEach((button) => {
        const isActive = button.dataset.term === key;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      panel.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.text}</span>
      `;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => renderTerm(button.dataset.term));
    });

    const initial = buttons.find((button) => button.classList.contains("is-active")) || buttons[0];
    renderTerm(initial.dataset.term);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeRangeValue(value) {
  return clamp((Number(value) - 1) / 4, 0, 1);
}

function updateRangeOutputs(scope = document) {
  scope.querySelectorAll("[data-range-output]").forEach((input) => {
    const output = document.getElementById(input.dataset.rangeOutput);
    if (output) {
      output.textContent = input.value;
    }
  });
}

function updateToggleChips(scope = document) {
  scope.querySelectorAll(".toggle-chip").forEach((chip) => {
    const input = chip.querySelector("input");
    chip.classList.toggle("is-active", Boolean(input?.checked));
  });
}

function getRecommendationProfile(form) {
  const food = normalizeRangeValue(form.elements["food-priority"].value);
  const scenery = normalizeRangeValue(form.elements["scenery-priority"].value);
  const night = normalizeRangeValue(form.elements["night-priority"].value);
  const relaxed = normalizeRangeValue(form.elements["relaxed-priority"].value);

  return {
    food,
    scenery,
    night,
    relaxed,
    dense: 1 - relaxed,
    weather: form.elements["weather-mode"].value,
    budget: form.elements["budget-mode"].value,
    party: form.elements["party-mode"].value,
    onsen: form.elements["pref-onsen"].checked ? 1 : 0,
    shopping: form.elements["pref-shopping"].checked ? 1 : 0,
    easyTransfers: form.elements["pref-easy"].checked ? 1 : 0,
    culture: form.elements["pref-culture"].checked ? 1 : 0,
    photo: clamp((scenery * 0.72) + (night * 0.28), 0, 1)
  };
}

function scoreRecommendation(item, profile) {
  const weightedReasons = [
    {
      value: item.traits.food * (0.8 + profile.food * 3.2),
      reason: "Matches a food-heavy version of the trip."
    },
    {
      value: item.traits.scenery * (0.8 + profile.scenery * 3.1),
      reason: "Supports the scenery and photo weight you picked."
    },
    {
      value: item.traits.night * (0.6 + profile.night * 2.8),
      reason: "Fits the city-energy level you want at night."
    },
    {
      value: item.traits.relaxed * (0.6 + profile.relaxed * 2.6),
      reason: "Keeps more breathing room in the route."
    },
    {
      value: item.traits.dense * (0.5 + profile.dense * 2),
      reason: "Still works if you want a tighter schedule."
    },
    {
      value: item.traits.photo * (0.5 + profile.photo * 2.4),
      reason: "Has strong visual payoff."
    },
    {
      value: item.traits.convenience * (profile.easyTransfers ? 2.6 : 0.8),
      reason: "Reduces transfer friction."
    },
    {
      value: item.traits.shopping * (profile.shopping ? 2.3 : 0.35),
      reason: "Supports a shopping-heavy finish."
    },
    {
      value: item.traits.onsen * (profile.onsen ? 2.5 : 0.2),
      reason: "Covers the onsen or ryokan ask."
    },
    {
      value: item.traits.culture * (profile.culture ? 2.4 : 0.45),
      reason: "Pushes the trip deeper into culture and etiquette context."
    }
  ];

  let score = weightedReasons.reduce((sum, part) => sum + part.value, 0);
  score += (item.budgetFit[profile.budget] ?? 0.75) * 2.2;
  score += (item.weatherFit[profile.weather] ?? 0.75) * (1.2 + profile.scenery);
  score += (item.partyFit[profile.party] ?? 0.75) * 1.5;
  score += (item.mobileFit ?? 0.7) * (profile.easyTransfers ? 0.7 : 0.2);

  const bonusReasons = [];

  if (profile.food > 0.7 && profile.night > 0.55 && item.city === "osaka") {
    score += 1.1;
    bonusReasons.push({
      value: 1.1,
      reason: "Captures your food-plus-nightlife bias right at the start."
    });
  }

  if (profile.scenery > 0.78 && profile.weather !== "cloudy" && item.city === "fuji") {
    score += 1.4;
    bonusReasons.push({
      value: 1.4,
      reason: "The forecast can support a stronger Fuji gamble."
    });
  }

  if (profile.weather === "cloudy" && item.weatherRisk > 0.7) {
    score -= 1.2;
  }

  if (profile.weather === "cloudy" && item.weatherRisk < 0.35) {
    score += 0.75;
    bonusReasons.push({
      value: 0.75,
      reason: "Still holds up if the weather underperforms."
    });
  }

  if (profile.onsen && profile.relaxed > 0.55 && item.city === "hakone") {
    score += 1.05;
    bonusReasons.push({
      value: 1.05,
      reason: "Fits a softer reset with onsen time."
    });
  }

  if (profile.shopping && profile.night > 0.5 && item.city === "tokyo") {
    score += 0.95;
    bonusReasons.push({
      value: 0.95,
      reason: "Supports a shopping-heavy city finish."
    });
  }

  if (profile.culture && item.city === "kyoto") {
    score += 0.9;
    bonusReasons.push({
      value: 0.9,
      reason: "Matches the extra culture depth you switched on."
    });
  }

  if (profile.easyTransfers && item.traits.convenience > 0.85) {
    score += 0.8;
    bonusReasons.push({
      value: 0.8,
      reason: "Keeps movement cleaner on the ground."
    });
  }

  if (profile.relaxed > 0.72 && item.traits.relaxed > 0.78) {
    score += 0.7;
    bonusReasons.push({
      value: 0.7,
      reason: "Preserves breathing room instead of forcing a packed day."
    });
  }

  if (profile.budget === "value" && (item.budgetFit.value ?? 0) > 0.85) {
    score += 0.55;
    bonusReasons.push({
      value: 0.55,
      reason: "Stays efficient for a value-biased plan."
    });
  }

  const reasons = [...weightedReasons, ...bonusReasons]
    .filter((entry) => entry.value > 0.85)
    .sort((left, right) => right.value - left.value)
    .slice(0, 3)
    .map((entry) => entry.reason);

  return {
    item,
    score,
    reasons
  };
}

function getModeCopy(profile) {
  if (profile.food > 0.72 && profile.night > 0.62) {
    return {
      title: "Neon food run",
      description: "The route should open with Osaka confidence, protect late backups, and end with a strong Shibuya close rather than overthinking daytime density."
    };
  }

  if (profile.scenery > 0.78 && profile.weather === "clear") {
    return {
      title: "Clear-sky scenic push",
      description: "You can lean harder into the scenic middle, but the right version still keeps Fuji flexible until the forecast is actually paying off."
    };
  }

  if (profile.relaxed > 0.7 && profile.onsen) {
    return {
      title: "Soft-landing onsen profile",
      description: "This version of the trip should reduce friction, protect slower transitions, and let Hakone do more of the emotional reset work."
    };
  }

  if (profile.culture && profile.scenery > 0.5) {
    return {
      title: "Temple and texture route",
      description: "Kyoto and the cultural layer matter more here, so the trip should feel deliberate, readable, and less driven by pure city intensity."
    };
  }

  if (profile.easyTransfers && profile.food > 0.5) {
    return {
      title: "Easy-transfer food-first plan",
      description: "The best version keeps the route forgiving, leans on Osaka and practical guide layers, and makes the hardest move-days easy to screenshot and share."
    };
  }

  return {
    title: "Balanced city plus scenery profile",
    description: "This version keeps Osaka and Tokyo lively, uses Kyoto as contrast, and leaves enough slack for Fuji weather without turning the route rigid."
  };
}

function getWeatherAdvice(profile) {
  if (profile.weather === "clear" && profile.scenery > 0.65) {
    return "Cash in on clear Fuji views early.";
  }

  if (profile.weather === "cloudy") {
    return "Treat Fuji as bonus, not obligation.";
  }

  return "Keep Fuji movable and re-check same morning.";
}

function getShareAdvice(profile, topItem) {
  if (topItem.page === "Food Guide" || profile.food > 0.78) {
    return "Home page + food guide";
  }

  if (profile.easyTransfers) {
    return "Itinerary + snapshot";
  }

  if (profile.culture) {
    return "Home page + culture notes";
  }

  if (topItem.page === "Toolkit") {
    return "Toolkit + snapshot";
  }

  if (topItem.page === "Full Guide") {
    return "Main page + full guide";
  }

  return "Main page + itinerary";
}

function buildMatchScale(scoredItems) {
  const maxScore = scoredItems[0]?.score ?? 1;
  const minScore = scoredItems[scoredItems.length - 1]?.score ?? 0;
  const range = Math.max(maxScore - minScore, 1);

  return (score) => Math.round(68 + ((score - minScore) / range) * 30);
}

function renderRecommendations(scoredItems, elements) {
  const topItems = scoredItems.slice(0, 4);
  const toMatch = buildMatchScale(scoredItems);

  elements.list.innerHTML = topItems
    .map((entry, index) => {
      const match = toMatch(entry.score);
      const tags = entry.item.tags
        .slice(0, 3)
        .map((tag) => `<span class="recommendation-chip">${tag}</span>`)
        .join("");
      const reasons = entry.reasons
        .map((reason) => `<li>${reason}</li>`)
        .join("");

      return `
        <article class="recommendation-card">
          <div class="recommendation-head">
            <div class="recommendation-title-block">
              <span class="recommendation-rank">${String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>${entry.item.title}</strong>
                <span>${entry.item.page} · ${entry.item.text}</span>
              </div>
            </div>
            <span class="match-pill">${match}% match</span>
          </div>
          <div class="recommendation-tags">${tags}</div>
          <ul class="recommendation-reasons">${reasons}</ul>
          <div class="recommendation-score"><span style="width: ${match}%"></span></div>
          <a class="recommendation-link" href="${entry.item.href}">Open ${entry.item.page}</a>
        </article>
      `;
    })
    .join("");
}

function updateCitySignals(scoredItems) {
  const cityTotals = {
    osaka: 0,
    kyoto: 0,
    hakone: 0,
    fuji: 0,
    tokyo: 0
  };

  scoredItems.slice(0, 6).forEach((entry, index) => {
    if (!entry.item.city || !(entry.item.city in cityTotals)) {
      return;
    }

    const weight = 1.2 - index * 0.12;
    cityTotals[entry.item.city] += entry.score * weight;
  });

  const maxValue = Math.max(...Object.values(cityTotals), 1);
  let strongestCity = "osaka";
  let strongestValue = 0;

  Object.entries(cityTotals).forEach(([city, value]) => {
    const normalized = Math.round((value / maxValue) * 100);
    const fill = document.querySelector(`[data-city-fill="${city}"]`);
    const score = document.querySelector(`[data-city-score="${city}"]`);
    const row = document.querySelector(`[data-city-row="${city}"]`);

    if (fill) {
      fill.style.width = `${normalized}%`;
    }

    if (score) {
      score.textContent = String(normalized);
    }

    if (row) {
      row.classList.toggle("is-active", normalized >= 90);
    }

    if (normalized > strongestValue) {
      strongestCity = city;
      strongestValue = normalized;
    }
  });

  document.querySelectorAll("[data-preview-city]").forEach((card) => {
    card.classList.toggle("is-suggested", card.dataset.previewCity === strongestCity);
  });

  return strongestCity;
}

function initRecommendationEngine() {
  const form = document.getElementById("recommendation-form");
  const list = document.getElementById("recommendation-list");
  const mode = document.getElementById("recommendation-mode");
  const description = document.getElementById("recommendation-description");
  const lead = document.getElementById("recommendation-lead");
  const weather = document.getElementById("recommendation-weather");
  const share = document.getElementById("recommendation-share");
  const resetButton = document.getElementById("reset-recommendations");

  if (!form || !list || !mode || !description || !lead || !weather || !share) {
    return;
  }

  const renderEngine = () => {
    const profile = getRecommendationProfile(form);
    const scoredItems = RECOMMENDATION_ITEMS.map((item) => scoreRecommendation(item, profile)).sort(
      (left, right) => right.score - left.score
    );
    const topItem = scoredItems[0]?.item;
    const modeCopy = getModeCopy(profile);

    mode.textContent = modeCopy.title;
    description.textContent = `${modeCopy.description} Highest current pull: ${topItem?.title ?? "Route overview"}.`;
    lead.textContent = topItem?.title ?? "Route overview";
    weather.textContent = getWeatherAdvice(profile);
    share.textContent = getShareAdvice(profile, topItem ?? { page: "Itinerary" });

    renderRecommendations(scoredItems, { list });
    updateCitySignals(scoredItems);
  };

  updateRangeOutputs(form);
  updateToggleChips(form);
  renderEngine();

  form.addEventListener("input", () => {
    updateRangeOutputs(form);
    updateToggleChips(form);
    renderEngine();
  });

  form.addEventListener("change", () => {
    updateToggleChips(form);
    renderEngine();
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      form.reset();
      window.requestAnimationFrame(() => {
        updateRangeOutputs(form);
        updateToggleChips(form);
        renderEngine();
      });
    });
  }
}

function initPreviewModal() {
  const modal = document.getElementById("preview-modal");
  const previewImage = document.getElementById("preview-image");
  const previewThumbs = document.getElementById("preview-thumbs");
  const previewEyebrow = document.getElementById("preview-eyebrow");
  const previewTitle = document.getElementById("preview-title");
  const previewDescription = document.getElementById("preview-description");
  const previewMeta = document.getElementById("preview-meta");
  const previewFacts = document.getElementById("preview-facts");
  const previewCredit = document.getElementById("preview-credit");
  const previewLink = document.getElementById("preview-link");
  const closeButton = modal?.querySelector(".preview-close");

  if (
    !modal ||
    !previewImage ||
    !previewThumbs ||
    !previewEyebrow ||
    !previewTitle ||
    !previewDescription ||
    !previewMeta ||
    !previewFacts ||
    !previewCredit ||
    !previewLink ||
    !closeButton
  ) {
    return;
  }

  let activeGalleryKey = null;
  let activeGalleryIndex = 0;
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    [...modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
      (element) => !element.hidden
    );

  const updatePreviewStage = (index) => {
    const gallery = PREVIEW_GALLERIES[activeGalleryKey];
    if (!gallery) {
      return;
    }

    const image = gallery.images[index];
    if (!image) {
      return;
    }

    activeGalleryIndex = index;
    previewImage.src = image.src;
    previewImage.alt = image.alt;
    previewCredit.innerHTML = `<strong>Current image:</strong> ${image.caption}<br><a href="${image.creditLink}" target="_blank" rel="noreferrer">Source file</a> - ${image.creditLabel} - ${image.creditText}`;

    [...previewThumbs.querySelectorAll("[data-preview-thumb]")].forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === index;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const openPreview = (key) => {
    const gallery = PREVIEW_GALLERIES[key];
    if (!gallery) {
      return;
    }

    lastFocusedElement = document.activeElement;
    activeGalleryKey = key;
    activeGalleryIndex = 0;

    previewEyebrow.textContent = gallery.eyebrow;
    previewTitle.textContent = gallery.title;
    previewDescription.textContent = gallery.description;
    previewMeta.innerHTML = gallery.tags
      .map((tag) => `<span class="preview-chip">${tag}</span>`)
      .join("");
    previewFacts.innerHTML = gallery.facts
      .map(
        (fact) => `
          <div class="preview-fact">
            <strong>${fact.label}</strong>
            <span>${fact.text}</span>
          </div>
        `
      )
      .join("");
    previewLink.href = gallery.href;
    previewThumbs.innerHTML = gallery.images
      .map(
        (image, index) => `
          <button class="preview-thumb${index === 0 ? " is-active" : ""}" type="button" data-preview-thumb="${index}" aria-pressed="${index === 0 ? "true" : "false"}">
            <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async">
          </button>
        `
      )
      .join("");

    updatePreviewStage(0);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();

    [...previewThumbs.querySelectorAll("[data-preview-thumb]")].forEach((thumb) => {
      thumb.addEventListener("click", () => updatePreviewStage(Number(thumb.dataset.previewThumb)));
    });
  };

  const closePreview = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  document.querySelectorAll("[data-preview-gallery]").forEach((button) => {
    button.addEventListener("click", () => openPreview(button.dataset.previewGallery));
  });

  document.querySelectorAll("[data-preview-city]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) {
        return;
      }

      openPreview(card.dataset.previewCity);
    });
  });

  document.querySelectorAll("[data-close-preview]").forEach((button) => {
    button.addEventListener("click", closePreview);
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closePreview();
      return;
    }

    if (event.key === "Tab") {
      const focusable = getFocusableElements();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.key === "ArrowRight") {
      const gallery = PREVIEW_GALLERIES[activeGalleryKey];
      if (!gallery) {
        return;
      }

      updatePreviewStage((activeGalleryIndex + 1) % gallery.images.length);
      return;
    }

    if (event.key === "ArrowLeft") {
      const gallery = PREVIEW_GALLERIES[activeGalleryKey];
      if (!gallery) {
        return;
      }

      updatePreviewStage((activeGalleryIndex - 1 + gallery.images.length) % gallery.images.length);
    }
  });
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("DOMContentLoaded", () => {
  updateScrollProgress();
  initReveal();
  initSearch();
  initTermGroups();
  initRecommendationEngine();
  initPreviewModal();
});
