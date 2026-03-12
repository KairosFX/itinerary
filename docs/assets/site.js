document.documentElement.classList.add("js");

const SEARCH_ITEMS = [
  {
    title: "Interactive Route Map",
    text: "Custom Japan route atlas with clickable Osaka, Kyoto, Hakone, Fuji, and Tokyo stop pins.",
    href: "./index.html#route-atlas"
  },
  {
    title: "Recommendation Engine",
    text: "Rank the route around food, scenery, nightlife, budget, weather, and transfer tolerance.",
    href: "./index.html#trip-profile"
  },
  {
    title: "Live Route Weather",
    text: "Check current conditions, packing cues, and same-day timing for Osaka, Kyoto, Hakone, Fuji, and Tokyo.",
    href: "./index.html#trip-weather"
  },
  {
    title: "Live Navigation Map",
    text: "Interactive travel map with GPS locate, route pins, filters, and Google Maps handoff.",
    href: "./index.html#live-map"
  },
  {
    title: "Fuji Fog And Visibility Index",
    text: "Use the live forecast to see which upcoming day has the best clarity for Mount Fuji.",
    href: "./index.html#trip-weather"
  },
  {
    title: "Japan Explorer",
    text: "Search major route hubs and regional add-ons with interactive filters and category notes.",
    href: "./index.html#japan-explorer"
  },
  {
    title: "Official Reads And Brochures",
    text: "Open JNTO articles, travel brochures, and a lightweight flight launcher.",
    href: "./index.html#official-watch"
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

const NAV_TRANSLATIONS = {
  en: {
    "./index.html": "Home",
    "./itinerary.html": "Itinerary",
    "./food.html": "Food",
    "./toolkit.html": "Toolkit",
    "./culture.html": "Culture",
    "./quick_snapshot.html": "Snapshot",
    "./guide.html": "Full Guide"
  },
  ja: {
    "./index.html": "ホーム",
    "./itinerary.html": "旅程",
    "./food.html": "食事",
    "./toolkit.html": "準備",
    "./culture.html": "文化",
    "./quick_snapshot.html": "要点",
    "./guide.html": "完全ガイド"
  }
};

const PAGE_SUBTITLE_TRANSLATIONS = {
  en: {
    "index.html": "Main trip hub",
    "itinerary.html": "Itinerary",
    "food.html": "Food guide",
    "toolkit.html": "Toolkit",
    "culture.html": "Culture notes",
    "quick_snapshot.html": "Snapshot",
    "guide.html": "Full guide"
  },
  ja: {
    "index.html": "メイントリップ",
    "itinerary.html": "旅程",
    "food.html": "食事ガイド",
    "toolkit.html": "準備ガイド",
    "culture.html": "文化メモ",
    "quick_snapshot.html": "要点ページ",
    "guide.html": "完全ガイド"
  }
};

const WEATHER_STOPS = [
  {
    key: "osaka",
    name: "Osaka",
    lat: 34.6937,
    lon: 135.5023,
    guideHref: "./food.html#osaka-food",
    timing: "Best after dark for food streets and low-pressure wandering."
  },
  {
    key: "kyoto",
    name: "Kyoto",
    lat: 35.0116,
    lon: 135.7681,
    guideHref: "./itinerary.html#kyoto-day",
    timing: "Best early when the walking lanes are calmer and cooler."
  },
  {
    key: "hakone",
    name: "Hakone",
    lat: 35.2323,
    lon: 139.1069,
    guideHref: "./itinerary.html#hakone-move",
    timing: "Treat late afternoon as ryokan and reset time if the air turns misty."
  },
  {
    key: "fuji",
    name: "Mt. Fuji Area",
    lat: 35.4974,
    lon: 138.7559,
    guideHref: "./itinerary.html#fuji-visibility",
    timing: "Clearer morning windows usually matter more here than strict lunch timing."
  },
  {
    key: "tokyo",
    name: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    guideHref: "./itinerary.html#tokyo-finish",
    timing: "Late afternoon into night is usually the cleanest Tokyo payoff."
  }
];

const WEATHER_CACHE = new Map();
const WEATHER_STORAGE_KEY = "japan-escape-weather-cache-v1";

const WEATHER_CODE_LABELS = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Showers",
  82: "Heavy showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Storm and hail",
  99: "Severe storm"
};

const DESTINATION_DIRECTORY_ITEMS = [
  {
    key: "osaka",
    name: "Osaka",
    region: "Kansai",
    filter: "kansai",
    prefecture: "Osaka Prefecture",
    image: PREVIEW_GALLERIES.osaka.images[1].src,
    alt: PREVIEW_GALLERIES.osaka.images[1].alt,
    summary: "Food-first, arrival-friendly, and the easiest city in the route for turning travel fatigue into actual momentum.",
    tags: ["food", "night", "easy"],
    highlights: ["Dotonbori", "Shinsekai", "Umeda", "Namba", "Shinsaibashi"],
    bestTime: "After dark, when the signs and casual food lanes are doing most of the work.",
    crowd: "Late afternoon to evening is busiest, but it still tolerates loose wandering better than most cities.",
    guideHref: "./food.html#osaka-food",
    secondaryHref: "./itinerary.html#osaka-start",
    primaryLabel: "Open food notes",
    secondaryLabel: "Open itinerary",
    categories: {
      hotels: "Namba for food, Umeda for rail access, or Shin-Osaka if move-day convenience matters most.",
      shopping: "Shinsaibashi, Amerikamura, and big station-linked malls keep shopping easy even in bad weather.",
      entertainment: "Dotonbori walks, neon streets, retro Shinsekai, and forgiving late-night energy.",
      restaurants: "Takoyaki, kushikatsu, okonomiyaki, ramen, izakaya, and strong convenience-store backup."
    }
  },
  {
    key: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    filter: "kansai",
    prefecture: "Kyoto Prefecture",
    image: PREVIEW_GALLERIES.kyoto.images[1].src,
    alt: PREVIEW_GALLERIES.kyoto.images[1].alt,
    summary: "Culture-heavy, walk-heavy, and best when the city is treated as one concentrated lane rather than a checklist sprint.",
    tags: ["culture", "tea", "photo"],
    highlights: ["Gion", "Higashiyama", "Nishiki Market", "Arashiyama", "Fushimi Inari"],
    bestTime: "Early morning through lunch, before the crowd pressure builds in the temple lanes.",
    crowd: "Midday crowding rises quickly in the iconic areas, so early starts pay off.",
    guideHref: "./food.html#kyoto-food",
    secondaryHref: "./itinerary.html#kyoto-day",
    primaryLabel: "Open food notes",
    secondaryLabel: "Open itinerary",
    categories: {
      hotels: "Stay simple with a Kyoto day trip unless you are building a Kyoto-led version of the route.",
      shopping: "Nishiki Market, craft stores in old-street districts, and calmer tea or ceramics shopping.",
      entertainment: "Temple lanes, lantern streets, river walks, and slower detail rather than nightlife pressure.",
      restaurants: "Matcha sweets, soba, tofu meals, teahouse breaks, and one deliberate sit-down meal."
    }
  },
  {
    key: "hakone",
    name: "Hakone",
    region: "Kanto",
    filter: "kanto",
    prefecture: "Kanagawa",
    image: PREVIEW_GALLERIES.hakone.images[0].src,
    alt: PREVIEW_GALLERIES.hakone.images[0].alt,
    summary: "Onsen reset, scenic overnight, and the best place in the route to slow down the transfer rhythm on purpose.",
    tags: ["onsen", "reset", "lake"],
    highlights: ["Hakone-Yumoto", "Lake Ashi", "Hakone Shrine", "Open-air museum", "Ropeway"],
    bestTime: "Late afternoon into evening if the goal is to settle into the ryokan pace without forcing extra transit.",
    crowd: "Transit hubs are most compressed late morning; evenings are quieter but options close earlier.",
    guideHref: "./food.html#hakone-food",
    secondaryHref: "./itinerary.html#hakone-move",
    primaryLabel: "Open food notes",
    secondaryLabel: "Open itinerary",
    categories: {
      hotels: "Ryokan stays matter most here. Prioritize bath quality, meal timing, and easy bag drop.",
      shopping: "Hakone-Yumoto is the safest practical corridor for snacks, gifts, and last-minute supplies.",
      entertainment: "Lake Ashi, ropeway views, shrine stops, and onsen time instead of late-night city activity.",
      restaurants: "Ryokan dinners, earlier meals, station snacks, and konbini backup before everything narrows."
    }
  },
  {
    key: "fuji",
    name: "Mt. Fuji Area",
    region: "Chubu",
    filter: "chubu",
    prefecture: "Yamanashi / Shizuoka",
    image: PREVIEW_GALLERIES.fuji.images[1].src,
    alt: PREVIEW_GALLERIES.fuji.images[1].alt,
    summary: "Highest photo payoff, highest weather pressure, and the stop where visibility needs to outrank stubborn planning.",
    tags: ["scenic", "weather", "photo"],
    highlights: ["Kawaguchiko", "Chureito", "Oshino Hakkai", "Shimoyoshida", "Lake viewpoints"],
    bestTime: "Morning is usually the cleanest visual lane, especially when cloud cover builds later.",
    crowd: "Popular viewpoints get compressed quickly after the clearest window becomes obvious.",
    guideHref: "./food.html#fuji-food",
    secondaryHref: "./itinerary.html#fuji-visibility",
    primaryLabel: "Open food notes",
    secondaryLabel: "Open itinerary",
    categories: {
      hotels: "Kawaguchiko lakeside stays keep the morning options cleaner than overcomplicated hopping.",
      shopping: "Treat shopping as secondary here. Protect the mountain view first, then buy gifts later.",
      entertainment: "Pagoda angles, lakeside walks, water-village detail, and scenic movement between viewpoints.",
      restaurants: "Yoshida udon, practical cafes, and compact meals that do not steal the clear-weather window."
    }
  },
  {
    key: "tokyo",
    name: "Tokyo",
    region: "Kanto",
    filter: "kanto",
    prefecture: "Tokyo Metropolis",
    image: PREVIEW_GALLERIES.tokyo.images[2].src,
    alt: PREVIEW_GALLERIES.tokyo.images[2].alt,
    summary: "Best used as a district-first finale. Tokyo pays off fastest when the last day stays concentrated instead of sprawling.",
    tags: ["shopping", "night", "finale"],
    highlights: ["Shibuya", "Shinjuku", "Asakusa", "Ginza", "teamLab side trips"],
    bestTime: "Late afternoon into night, when shopping and skyline plans can stack cleanly in one zone.",
    crowd: "Always active, but district-first planning prevents the day from dissolving into transit.",
    guideHref: "./food.html#tokyo-food",
    secondaryHref: "./itinerary.html#tokyo-finish",
    primaryLabel: "Open food notes",
    secondaryLabel: "Open itinerary",
    categories: {
      hotels: "Shibuya and Shinjuku keep the final-day logistics easy and the nightlife options broad.",
      shopping: "Shibuya, Shinjuku, Ginza, and station-linked retail if weather turns against you.",
      entertainment: "Crossing views, skyline decks, arcades, neighborhood wandering, and broader late-night range.",
      restaurants: "Final dinner splurge, dessert backup, ramen, sushi, gyoza, and endless fallback lanes."
    }
  },
  {
    key: "kansai-addons",
    name: "Kansai Add-Ons",
    region: "West Japan",
    filter: "west",
    prefecture: "Nara / Kobe / Himeji",
    image: PREVIEW_GALLERIES.kyoto.images[0].src,
    alt: PREVIEW_GALLERIES.kyoto.images[0].alt,
    summary: "Use this lane when one Kansai city is not enough and you want famous side trips without rebuilding the whole trip.",
    tags: ["nara", "kobe", "himeji"],
    highlights: ["Nara deer park", "Kobe harbor", "Himeji Castle", "Uji", "Arima side trips"],
    bestTime: "Strong as day trips from Osaka or Kyoto if the group wants one extra iconic west-Japan image set.",
    crowd: "Weekend pressure is highest in the classic heritage and deer-park areas.",
    guideHref: "https://www.japan.travel/en/destinations/kansai/",
    secondaryHref: "./guide.html",
    primaryLabel: "Open JNTO region guide",
    secondaryLabel: "Open full guide",
    categories: {
      hotels: "Keep your base in Osaka or Kyoto unless the add-on city becomes the actual goal of the trip.",
      shopping: "Kobe and Uji are the strongest add-on shopping lanes without turning the day into pure retail.",
      entertainment: "Castle reads, harbor fronts, deer-park spectacle, and richer day-trip contrast.",
      restaurants: "Kobe beef splurge, Uji tea sweets, Nara snacks, and calmer regional dining than Osaka nights."
    }
  },
  {
    key: "kanto-addons",
    name: "Kanto Add-Ons",
    region: "Kanto",
    filter: "kanto",
    prefecture: "Yokohama / Nikko / Kamakura",
    image: PREVIEW_GALLERIES.tokyo.images[0].src,
    alt: PREVIEW_GALLERIES.tokyo.images[0].alt,
    summary: "For people who want Tokyo plus one cleaner side idea instead of forcing every famous east-Japan stop into the finale.",
    tags: ["nikko", "yokohama", "kamakura"],
    highlights: ["Nikko temples", "Yokohama waterfront", "Kamakura shrines", "Enoshima coast", "day trips"],
    bestTime: "Best as an add-on when Tokyo is staying longer than one final day or when the group wants less neon and more texture.",
    crowd: "Day-trip routes can bottleneck on weekends, so earlier departures matter more here.",
    guideHref: "https://www.japan.travel/en/destinations/kanto/",
    secondaryHref: "./guide.html",
    primaryLabel: "Open JNTO region guide",
    secondaryLabel: "Open full guide",
    categories: {
      hotels: "Stay in Tokyo and use rail lines outward unless the whole trip is shifting toward Kanto depth.",
      shopping: "Yokohama malls and Tokyo districts cover most of the shopping needs without overcomplicating the route.",
      entertainment: "Temple depth in Nikko, seaside air in Kamakura, and harbor-night contrast in Yokohama.",
      restaurants: "Tokyo remains the strongest food base, with Yokohama and Kamakura as side dishes rather than replacements."
    }
  },
  {
    key: "chubu-addons",
    name: "Chubu Scenic Add-Ons",
    region: "Chubu",
    filter: "chubu",
    prefecture: "Kanazawa / Takayama / Nagano",
    image: PREVIEW_GALLERIES.fuji.images[0].src,
    alt: PREVIEW_GALLERIES.fuji.images[0].alt,
    summary: "Mountain texture, preserved streets, and slower scenic depth if you want more than the core Fuji window.",
    tags: ["kanazawa", "takayama", "nagano"],
    highlights: ["Kanazawa gardens", "Takayama old town", "Nagano temples", "Matsumoto", "alpine reads"],
    bestTime: "Best when the trip wants scenic atmosphere beyond the single Mount Fuji gamble.",
    crowd: "Seasonal peaks matter here, especially around foliage, alpine weekends, and heritage districts.",
    guideHref: "https://www.japan.travel/en/destinations/chubu/",
    secondaryHref: "./guide.html",
    primaryLabel: "Open JNTO region guide",
    secondaryLabel: "Open full guide",
    categories: {
      hotels: "Traditional inns and slower scenic stays work better here than frantic one-night box-checking.",
      shopping: "Crafts, regional sweets, lacquerware, and slower market-style browsing instead of mega-district retail.",
      entertainment: "Garden pacing, old-town walks, mountain windows, and more deliberate scenic texture.",
      restaurants: "Regional noodles, Hida-style beef, local sweets, and slower meals that fit the scenery."
    }
  },
  {
    key: "north-south",
    name: "North And South Extensions",
    region: "Hokkaido / Kyushu / Okinawa",
    filter: "north-south",
    prefecture: "Sapporo / Fukuoka / Naha",
    image: null,
    alt: "",
    summary: "Use this lane when the trip is expanding beyond the Osaka-Tokyo spine and you need one broader read on Japan's biggest regional mood shifts.",
    tags: ["sapporo", "fukuoka", "naha"],
    highlights: ["Sapporo snow and seafood", "Fukuoka food lanes", "Beppu onsen", "Naha base", "Okinawa beaches"],
    bestTime: "Best when the trip is being redesigned around climate, food, or island energy instead of just adding one more stop.",
    crowd: "Season and flight timing matter much more here than on the core Osaka-Tokyo route.",
    guideHref: "https://www.japan.travel/en/destinations/",
    secondaryHref: "https://brochure.japan.travel/en/",
    primaryLabel: "Open JNTO destination hub",
    secondaryLabel: "Open brochure library",
    categories: {
      hotels: "Choose one strong base city first: Sapporo for Hokkaido, Fukuoka for Kyushu, Naha for Okinawa.",
      shopping: "Fukuoka and Sapporo are easiest for city shopping; Okinawa is stronger for resort and beach rhythm.",
      entertainment: "Snow festivals, seafood markets, onsen towns, island beaches, and very different weather moods.",
      restaurants: "Seafood in Hokkaido, tonkotsu ramen in Fukuoka, and island food in Okinawa change the trip immediately."
    }
  }
];

const MAP_POINTS = [
  {
    key: "osaka-route",
    title: "Osaka Base",
    category: "route",
    tags: ["route", "food", "easy"],
    description: "Primary arrival base with the easiest first-night energy in the route.",
    lat: 34.6937,
    lon: 135.5023,
    weatherKey: "osaka",
    guideHref: "./itinerary.html#osaka-start",
    guideLabel: "Open Osaka stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=34.6937,135.5023",
    facts: [
      { label: "Best use", text: "Start here if you want easy food and low-friction arrival energy." },
      { label: "Map logic", text: "Osaka is the route anchor that turns travel fatigue into momentum." }
    ]
  },
  {
    key: "dotonbori-food",
    title: "Dotonbori Food Lane",
    category: "food",
    tags: ["food", "night", "osaka"],
    description: "Best opening food crawl if the group wants signage, easy snacks, and casual movement.",
    lat: 34.6687,
    lon: 135.5013,
    weatherKey: "osaka",
    guideHref: "./food.html#osaka-food",
    guideLabel: "Open Osaka food",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dotonbori%20Osaka",
    facts: [
      { label: "Go for", text: "Takoyaki, fast visual payoff, and easy first-night wandering." },
      { label: "Timing", text: "Best after dark when the canal and signs are carrying the mood." }
    ]
  },
  {
    key: "kyoto-route",
    title: "Kyoto Contrast",
    category: "route",
    tags: ["route", "culture", "walk"],
    description: "The cultural contrast day. Better as one focused lane than a citywide checklist.",
    lat: 35.0116,
    lon: 135.7681,
    weatherKey: "kyoto",
    guideHref: "./itinerary.html#kyoto-day",
    guideLabel: "Open Kyoto stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.0116,135.7681",
    facts: [
      { label: "Best use", text: "Pick one district cluster and keep transit low." },
      { label: "Timing", text: "Earlier is better because crowd pressure builds fast." }
    ]
  },
  {
    key: "nishiki-food",
    title: "Nishiki Market",
    category: "food",
    tags: ["food", "market", "kyoto"],
    description: "Useful for tasting, browsing, and quick food context without overcommitting the day.",
    lat: 35.0042,
    lon: 135.7649,
    weatherKey: "kyoto",
    guideHref: "./food.html#kyoto-food",
    guideLabel: "Open Kyoto food",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Nishiki%20Market%20Kyoto",
    facts: [
      { label: "Go for", text: "Snacks, browsing, and short food context between major walks." },
      { label: "Risk", text: "Can get dense fast later in the day." }
    ]
  },
  {
    key: "hakone-route",
    title: "Hakone Reset",
    category: "route",
    tags: ["route", "onsen", "reset"],
    description: "The scenic overnight that makes the eastbound move feel human.",
    lat: 35.2323,
    lon: 139.1069,
    weatherKey: "hakone",
    guideHref: "./itinerary.html#hakone-move",
    guideLabel: "Open Hakone stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.2323,139.1069",
    facts: [
      { label: "Best use", text: "Let the transfer finish cleanly before adding sightseeing pressure." },
      { label: "Timing", text: "Late afternoon is often the right shift into ryokan mode." }
    ]
  },
  {
    key: "lake-ashi-view",
    title: "Lake Ashi View",
    category: "view",
    tags: ["view", "hakone", "lake"],
    description: "One of the strongest scenic mood signals in the middle of the route.",
    lat: 35.2042,
    lon: 139.0231,
    weatherKey: "hakone",
    guideHref: "./itinerary.html#hakone-move",
    guideLabel: "Open Hakone stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lake%20Ashi%20Hakone",
    facts: [
      { label: "Go for", text: "Lake atmosphere, shrine framing, and softer terrain after the rail move." },
      { label: "Risk", text: "Mist can flatten the view, so keep expectations flexible." }
    ]
  },
  {
    key: "odawara-transit",
    title: "Odawara Handoff",
    category: "transit",
    tags: ["transit", "hakone", "bags"],
    description: "The key transit switch where the long rail move hands off into Hakone.",
    lat: 35.2554,
    lon: 139.1596,
    weatherKey: "hakone",
    guideHref: "./toolkit.html#hakone-passes",
    guideLabel: "Open transit notes",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Odawara%20Station",
    facts: [
      { label: "Best use", text: "Handle tickets and bags here before trying to sightsee." },
      { label: "Map logic", text: "This is the cleanest place to reset the route after the bullet train." }
    ]
  },
  {
    key: "fuji-route",
    title: "Fuji Scenic Block",
    category: "route",
    tags: ["route", "scenic", "weather"],
    description: "The scenic centerpiece of the trip and the one section that needs real weather flexibility.",
    lat: 35.4974,
    lon: 138.7559,
    weatherKey: "fuji",
    guideHref: "./itinerary.html#fuji-visibility",
    guideLabel: "Open Fuji stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.4974,138.7559",
    facts: [
      { label: "Best use", text: "Let the cleanest view decide the order instead of defending a rigid plan." },
      { label: "Timing", text: "Morning often gives the clearest mountain windows." }
    ]
  },
  {
    key: "chureito-view",
    title: "Chureito Viewpoint",
    category: "view",
    tags: ["view", "fuji", "photo"],
    description: "The most iconic Fuji framing on the route when visibility actually cooperates.",
    lat: 35.5013,
    lon: 138.7995,
    weatherKey: "fuji",
    guideHref: "./itinerary.html#fuji-visibility",
    guideLabel: "Open Fuji stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Chureito%20Pagoda",
    facts: [
      { label: "Go for", text: "The classic Fuji composition if the sky is clean enough." },
      { label: "Risk", text: "Do not spend the best visibility window elsewhere if this view is open." }
    ]
  },
  {
    key: "kawaguchiko-food",
    title: "Kawaguchiko Food Base",
    category: "food",
    tags: ["food", "fuji", "practical"],
    description: "Reliable lunch and fallback cafes that do not pull the day too far off the scenic mission.",
    lat: 35.4983,
    lon: 138.7688,
    weatherKey: "fuji",
    guideHref: "./food.html#fuji-food",
    guideLabel: "Open Fuji food",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kawaguchiko%20Station",
    facts: [
      { label: "Best use", text: "Keep the meal practical so the mountain window stays protected." },
      { label: "Food logic", text: "This is for reliability, not for turning the day into a long restaurant stop." }
    ]
  },
  {
    key: "tokyo-route",
    title: "Tokyo Finale",
    category: "route",
    tags: ["route", "night", "shopping"],
    description: "The clean district-first finish. Keep the last day concentrated and it will feel bigger.",
    lat: 35.6762,
    lon: 139.6503,
    weatherKey: "tokyo",
    guideHref: "./itinerary.html#tokyo-finish",
    guideLabel: "Open Tokyo stop",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.6762,139.6503",
    facts: [
      { label: "Best use", text: "Anchor the final day around one skyline slot or one dinner and flex around that." },
      { label: "Map logic", text: "Tokyo works best here when it stays district-first instead of sprawling." }
    ]
  },
  {
    key: "shibuya-food",
    title: "Shibuya Dinner Zone",
    category: "food",
    tags: ["food", "tokyo", "dessert"],
    description: "Strong final dinner and dessert backup without leaving the main final-day district.",
    lat: 35.6595,
    lon: 139.7005,
    weatherKey: "tokyo",
    guideHref: "./food.html#tokyo-food",
    guideLabel: "Open Tokyo food",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya%20Crossing",
    facts: [
      { label: "Go for", text: "Dinner, dessert, and strong fallback lanes if plans change late." },
      { label: "Timing", text: "Late afternoon into night keeps the final-city energy intact." }
    ]
  },
  {
    key: "shibuya-transit",
    title: "Shibuya Station",
    category: "transit",
    tags: ["transit", "tokyo", "station"],
    description: "Useful final-day transit anchor, locker point, and meeting baseline.",
    lat: 35.658,
    lon: 139.7016,
    weatherKey: "tokyo",
    guideHref: "./toolkit.html#station-shortcuts",
    guideLabel: "Open station notes",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya%20Station",
    facts: [
      { label: "Best use", text: "Use this to reduce confusion, especially if shopping and skyline timing are both in play." },
      { label: "Map logic", text: "A clean station strategy prevents the last day from dissolving into exits and bag management." }
    ]
  }
];

const ROUTE_ATLAS_ITEMS = {
  osaka: {
    kicker: "Arrival base",
    title: "Osaka sets the opening mood",
    description:
      "The route starts in Osaka because it turns arrival energy into food, signs, and a low-pressure first-night win instead of immediate logistics friction.",
    href: "./itinerary.html#osaka-start",
    image: PREVIEW_GALLERIES.osaka.images[1].src,
    alt: PREVIEW_GALLERIES.osaka.images[1].alt,
    previewLabel: "Preview Osaka",
    badges: [
      { label: "food", tone: "food" },
      { label: "night", tone: "night" },
      { label: "easy", tone: "easy" }
    ],
    facts: [
      {
        label: "Route role",
        text: "Osaka stabilizes the beginning of the trip so the later scenic sections feel earned instead of rushed."
      },
      {
        label: "Vibe signal",
        text: "Neon, food, and forgiving late options make it the softest landing in the whole plan."
      },
      {
        label: "Best move",
        text: "Keep the first night compact and save the real pace for the next morning."
      }
    ]
  },
  kyoto: {
    kicker: "Contrast day",
    title: "Kyoto changes the texture without changing hotels",
    description:
      "Kyoto is the deliberate contrast stop. The point is one concentrated cultural day that resets the mood without adding another hotel move.",
    href: "./itinerary.html#kyoto-day",
    image: PREVIEW_GALLERIES.kyoto.images[0].src,
    alt: PREVIEW_GALLERIES.kyoto.images[0].alt,
    previewLabel: "Preview Kyoto",
    badges: [
      { label: "culture", tone: "culture" },
      { label: "photo", tone: "photo" },
      { label: "walking", tone: "easy" }
    ],
    facts: [
      {
        label: "Route role",
        text: "Kyoto is here to change the tone, not replace Osaka as the base."
      },
      {
        label: "Best lane",
        text: "One focused district cluster works better than a citywide chase."
      },
      {
        label: "Payoff",
        text: "Temple atmosphere and slower streets create the sharpest contrast in the trip."
      }
    ]
  },
  hakone: {
    kicker: "Scenic pivot",
    title: "Hakone breaks the eastbound move and makes it feel human",
    description:
      "Hakone turns the route's biggest transfer wall into an atmospheric overnight. That one decision keeps the trip from feeling like pure transit math.",
    href: "./itinerary.html#hakone-move",
    image: PREVIEW_GALLERIES.hakone.images[0].src,
    alt: PREVIEW_GALLERIES.hakone.images[0].alt,
    previewLabel: "Preview Hakone",
    badges: [
      { label: "reset", tone: "reset" },
      { label: "onsen", tone: "onsen" },
      { label: "scenic", tone: "photo" }
    ],
    facts: [
      {
        label: "Route role",
        text: "Hakone absorbs the heaviest movement day and converts it into a calmer overnight."
      },
      {
        label: "Best use",
        text: "Protect the transfer first and let any extra sightseeing feel like bonus value."
      },
      {
        label: "Why it works",
        text: "The lake and onsen atmosphere reset the trip before Fuji and Tokyo."
      }
    ]
  },
  fuji: {
    kicker: "Weather play",
    title: "Fuji is the place where flexibility becomes the strategy",
    description:
      "This is the highest photo payoff in the route, but only if you let weather win. Good visibility should overrule any rigid sequence you wrote down earlier.",
    href: "./itinerary.html#fuji-visibility",
    image: PREVIEW_GALLERIES.fuji.images[0].src,
    alt: PREVIEW_GALLERIES.fuji.images[0].alt,
    previewLabel: "Preview Fuji",
    badges: [
      { label: "photo", tone: "photo" },
      { label: "weather", tone: "weather" },
      { label: "flex", tone: "easy" }
    ],
    facts: [
      {
        label: "Route role",
        text: "Fuji is the only stop where conditions should be allowed to change the order."
      },
      {
        label: "Best move",
        text: "Check the sky early and hit the clearest viewpoint first."
      },
      {
        label: "Risk control",
        text: "Keep meals and side stops practical so the scenic window stays protected."
      }
    ]
  },
  tokyo: {
    kicker: "Finale district",
    title: "Tokyo closes the trip cleanly when you keep it district-first",
    description:
      "The trip ends best in one strong Tokyo district. Shibuya gives shopping, dinner, and skyline closure without fragmenting the last day across the whole city.",
    href: "./itinerary.html#tokyo-finish",
    image: PREVIEW_GALLERIES.tokyo.images[2].src,
    alt: PREVIEW_GALLERIES.tokyo.images[2].alt,
    previewLabel: "Preview Tokyo",
    badges: [
      { label: "night", tone: "night" },
      { label: "shopping", tone: "shopping" },
      { label: "easy", tone: "easy" }
    ],
    facts: [
      {
        label: "Route role",
        text: "Tokyo is the pressure-release ending, not another place to overpack with logistics."
      },
      {
        label: "Best move",
        text: "Anchor the day around one skyline slot or one dinner and let the rest flex."
      },
      {
        label: "Payoff",
        text: "Shibuya stacks recognizable city energy fast, which is ideal on the final day."
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

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures and keep the UI usable.
  }
}

function getCurrentPageFile() {
  const file = window.location.pathname.split("/").pop();
  return file || "index.html";
}

function initLocaleSwitch() {
  const topbars = [...document.querySelectorAll(".topbar")];
  if (!topbars.length) {
    return;
  }

  const pageFile = getCurrentPageFile();
  const applyLocale = (locale) => {
    const labels = NAV_TRANSLATIONS[locale] ?? NAV_TRANSLATIONS.en;

    topbars.forEach((topbar) => {
      topbar.querySelectorAll(".nav-links a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && labels[href]) {
          link.textContent = labels[href];
        }
      });

      const subtitle = topbar.querySelector(".brand-copy span");
      if (subtitle) {
        subtitle.textContent = PAGE_SUBTITLE_TRANSLATIONS[locale]?.[pageFile] ?? PAGE_SUBTITLE_TRANSLATIONS.en[pageFile] ?? subtitle.textContent;
      }

      topbar.querySelectorAll("[data-locale-button]").forEach((button) => {
        const isActive = button.dataset.localeButton === locale;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    });

    document.documentElement.lang = locale === "ja" ? "ja" : "en";
    document.documentElement.dataset.locale = locale;
    safeStorageSet("japan-escape-locale", locale);
  };

  topbars.forEach((topbar) => {
    if (topbar.querySelector(".locale-switch")) {
      return;
    }

    const switcher = document.createElement("div");
    switcher.className = "locale-switch";
    switcher.innerHTML = `
      <button class="locale-button" type="button" data-locale-button="en" aria-pressed="false">
        <span aria-hidden="true">🇺🇸</span>
        <strong>EN</strong>
      </button>
      <button class="locale-button" type="button" data-locale-button="ja" aria-pressed="false">
        <span aria-hidden="true">🇯🇵</span>
        <strong>JP</strong>
      </button>
    `;

    switcher.querySelectorAll("[data-locale-button]").forEach((button) => {
      button.addEventListener("click", () => applyLocale(button.dataset.localeButton));
    });

    topbar.append(switcher);
  });

  applyLocale(safeStorageGet("japan-escape-locale") || "en");
}

function isSameDocumentHashLink(anchor) {
  const href = anchor?.getAttribute("href");
  if (!href || !href.includes("#")) {
    return false;
  }

  try {
    const url = new URL(anchor.href, window.location.href);
    return url.pathname === window.location.pathname && Boolean(url.hash);
  } catch {
    return false;
  }
}

function getHashTarget(hash = window.location.hash) {
  if (!hash) {
    return null;
  }

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return document.getElementById(id);
}

function activateTarget(target) {
  document.querySelectorAll(".is-current-target").forEach((element) => element.classList.remove("is-current-target"));

  if (!target) {
    return;
  }

  target.classList.add("is-current-target");
  target.classList.remove("is-targeted");
  void target.offsetWidth;
  target.classList.add("is-targeted");

  window.clearTimeout(target._targetTimer);
  target._targetTimer = window.setTimeout(() => {
    target.classList.remove("is-targeted");
  }, 1250);
}

function initHashHighlights() {
  const syncTarget = () => {
    const target = getHashTarget();
    if (target) {
      activateTarget(target);
    }
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor || !isSameDocumentHashLink(anchor)) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.setTimeout(syncTarget, 80);
    });
  });

  window.addEventListener("hashchange", syncTarget);
  syncTarget();
}

function initSectionNavs() {
  const navs = [...document.querySelectorAll("[data-section-nav]")];
  if (!navs.length) {
    return;
  }

  navs.forEach((nav) => {
    const links = [...nav.querySelectorAll('a[href*="#"]')].filter(isSameDocumentHashLink);
    const sections = links
      .map((link) => getHashTarget(new URL(link.href, window.location.href).hash))
      .filter(Boolean);

    if (!links.length || !sections.length) {
      return;
    }

    const setActive = (id) => {
      links.forEach((link) => {
        const hash = new URL(link.href, window.location.href).hash;
        link.classList.toggle("is-active", hash === `#${id}`);
      });
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries
              .filter((entry) => entry.isIntersecting)
              .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

            if (visibleEntries[0]) {
              setActive(visibleEntries[0].target.id);
            }
          },
          {
            rootMargin: "-30% 0px -52% 0px",
            threshold: [0.2, 0.4, 0.6, 0.85]
          }
        )
      : null;

    sections.forEach((section) => observer?.observe(section));
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const hash = new URL(link.href, window.location.href).hash;
        if (hash) {
          setActive(hash.replace("#", ""));
        }
      });
    });

    setActive((getHashTarget()?.id) || sections[0].id);
  });
}

function getWeatherLabel(code) {
  return WEATHER_CODE_LABELS[code] ?? "Mixed conditions";
}

function formatShortDateLabel(value) {
  if (!value) {
    return "Unknown day";
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

function formatHourLabel(hour) {
  const suffix = hour >= 12 ? "pm" : "am";
  const normalized = hour % 12 || 12;
  return `${normalized}${suffix}`;
}

function getPackingAdvice(temperature, rainChance, windSpeed) {
  if (rainChance >= 55) {
    return "Bring an umbrella and a light shell.";
  }

  if (temperature <= 8) {
    return "Use a real warm layer, not just a thin overshirt.";
  }

  if (temperature <= 16 || windSpeed >= 22) {
    return "Bring a light jacket or overshirt.";
  }

  if (temperature >= 28) {
    return "Dress light and keep water easy to reach.";
  }

  return "Light layers are enough.";
}

function getWeatherRouteAdvice(stop, forecast) {
  if (stop.key === "fuji") {
    return "Let the clearest visibility window win.";
  }

  if (forecast.rain >= 55) {
    return "Shift toward indoor anchors or tighter districts.";
  }

  if (stop.key === "hakone") {
    return "Keep the ryokan pace intact if mist builds later.";
  }

  if (stop.key === "kyoto") {
    return "Start earlier so the walking lanes stay easier.";
  }

  if (stop.key === "tokyo") {
    return "Tokyo still pays off later in the day.";
  }

  return "This stop can stay loose unless the rain spikes.";
}

function analyzeFujiForecast(data) {
  const hourly = data.hourly ?? {};
  const times = hourly.time ?? [];
  const visibility = hourly.visibility ?? [];
  const lowCloud = hourly.cloud_cover_low ?? [];
  const cloudCover = hourly.cloud_cover ?? [];
  const rainChance = hourly.precipitation_probability ?? [];
  const weatherCodes = hourly.weather_code ?? [];
  const buckets = new Map();

  times.forEach((time, index) => {
    const date = new Date(time);
    const hour = date.getHours();
    if (hour < 6 || hour > 17) {
      return;
    }

    const dayKey = time.slice(0, 10);
    const visibilityScore = clamp((visibility[index] ?? 9000) / 18000, 0, 1);
    const lowCloudScore = 1 - clamp((lowCloud[index] ?? 58) / 100, 0, 1);
    const cloudScore = 1 - clamp((cloudCover[index] ?? 62) / 100, 0, 1);
    const rainScore = 1 - clamp((rainChance[index] ?? 40) / 100, 0, 1);
    const weatherPenalty = [45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(weatherCodes[index]) ? 0.08 : 0;
    const score = clamp(
      (visibilityScore * 0.42) +
      (lowCloudScore * 0.24) +
      (cloudScore * 0.18) +
      (rainScore * 0.16) -
      weatherPenalty,
      0,
      1
    );

    const bucket = buckets.get(dayKey) ?? [];
    bucket.push({
      hour,
      score,
      visibility: visibility[index] ?? 0,
      rain: rainChance[index] ?? 0,
      cloud: cloudCover[index] ?? 0
    });
    buckets.set(dayKey, bucket);
  });

  const days = [...buckets.entries()]
    .slice(0, 5)
    .map(([date, samples]) => {
      const ranked = [...samples].sort((left, right) => right.score - left.score);
      const topSamples = ranked.slice(0, Math.min(3, ranked.length));
      const averageScore = topSamples.reduce((sum, sample) => sum + sample.score, 0) / Math.max(topSamples.length, 1);
      const bestHour = ranked[0]?.hour ?? 9;
      const fogRisk = Math.round((1 - averageScore) * 100);
      const clarity = Math.round(averageScore * 100);

      return {
        date,
        label: formatShortDateLabel(date),
        clarity,
        fogRisk,
        bestHour,
        note: fogRisk <= 34 ? "Low fog risk" : fogRisk <= 58 ? "Moderate fog risk" : "High fog risk"
      };
    });

  const bestDay = [...days].sort((left, right) => right.clarity - left.clarity)[0] ?? null;
  return { days, bestDay };
}

function buildWeatherUrl(stop) {
  const params = new URLSearchParams({
    latitude: String(stop.lat),
    longitude: String(stop.lon),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m",
    hourly: "precipitation_probability,cloud_cover,cloud_cover_low,visibility,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    forecast_days: "6",
    timezone: "auto"
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function readStoredWeatherCache() {
  try {
    const raw = window.localStorage.getItem(WEATHER_STORAGE_KEY);
    if (!raw) {
      return new Map();
    }

    const payload = JSON.parse(raw);
    if (!Array.isArray(payload?.forecasts)) {
      return new Map();
    }

    return new Map(
      payload.forecasts
        .filter((forecast) => forecast?.stop?.key)
        .map((forecast) => [forecast.stop.key, forecast])
    );
  } catch {
    return new Map();
  }
}

function writeStoredWeatherCache(forecasts) {
  try {
    window.localStorage.setItem(
      WEATHER_STORAGE_KEY,
      JSON.stringify({
        savedAt: new Date().toISOString(),
        forecasts: forecasts.filter((forecast) => forecast?.stop?.key && !forecast.error)
      })
    );
  } catch {
    // Ignore storage failures. Live fetch remains the primary path.
  }
}

async function fetchStopWeather(stop, signal) {
  const response = await fetch(buildWeatherUrl(stop), { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Weather request failed for ${stop.name}`);
  }

  const data = await response.json();
  const current = data.current ?? {};
  const daily = data.daily ?? {};
  const forecast = {
    stop,
    currentTemp: Math.round(current.temperature_2m ?? 0),
    apparentTemp: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0),
    condition: getWeatherLabel(current.weather_code ?? daily.weather_code?.[0]),
    high: Math.round(daily.temperature_2m_max?.[0] ?? current.temperature_2m ?? 0),
    low: Math.round(daily.temperature_2m_min?.[0] ?? current.temperature_2m ?? 0),
    rain: Math.round(daily.precipitation_probability_max?.[0] ?? 0),
    wind: Math.round(current.wind_speed_10m ?? 0),
    humidity: Math.round(current.relative_humidity_2m ?? 0)
  };

  forecast.packing = getPackingAdvice(forecast.apparentTemp, forecast.rain, forecast.wind);
  forecast.routeAdvice = getWeatherRouteAdvice(stop, forecast);
  forecast.timing = stop.timing;
  forecast.fuji = stop.key === "fuji" ? analyzeFujiForecast(data) : null;

  return forecast;
}

async function fetchStopWeatherWithRetry(stop, fallbackForecast = null, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const controller = "AbortController" in window ? new AbortController() : null;
    const timeoutId = controller ? window.setTimeout(() => controller.abort(), 8000) : null;

    try {
      return await fetchStopWeather(stop, controller?.signal);
    } catch (error) {
      if (attempt === maxAttempts - 1) {
        if (fallbackForecast) {
          return { ...fallbackForecast, stop, stale: true };
        }
        throw error;
      }

      await wait(360 * (attempt + 1));
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  if (fallbackForecast) {
    return { ...fallbackForecast, stop, stale: true };
  }

  throw new Error(`Weather retry loop exhausted for ${stop.name}`);
}

function renderWeatherLoadingState() {
  return WEATHER_STOPS
    .map(
      (stop) => `
        <article class="weather-card">
          <span class="weather-stop-label">${stop.name}</span>
          <strong>Loading live read...</strong>
          <p>Checking current conditions and next-step advice.</p>
        </article>
      `
    )
    .join("");
}

function renderWeatherCard(forecast) {
  if (forecast.error) {
    return `
      <article class="weather-card">
        <span class="weather-stop-label">${forecast.stop.name}</span>
        <strong>Live data unavailable</strong>
        <p>Use the static trip rule for now: ${forecast.stop.timing}</p>
        <div class="weather-meta">
          <span><strong>Fallback:</strong> ${forecast.stop.key === "fuji" ? "Keep Fuji flexible." : "Dress in layers and re-check later."}</span>
        </div>
      </article>
    `;
  }

  return `
    <article class="weather-card">
      <span class="weather-stop-label">${forecast.stop.name}</span>
      <strong>${forecast.condition}</strong>
      <div class="weather-temp-line">
        <span class="weather-temp">${forecast.currentTemp}&deg;</span>
        <span class="weather-condition">Feels like ${forecast.apparentTemp}&deg;</span>
      </div>
      <div class="weather-chip-row">
        <span class="weather-chip">High ${forecast.high}&deg;</span>
        <span class="weather-chip">Low ${forecast.low}&deg;</span>
        <span class="weather-chip">Rain ${forecast.rain}%</span>
        ${forecast.stale ? '<span class="weather-chip">Saved read</span>' : ""}
      </div>
      <p>${forecast.packing}</p>
      <div class="weather-meta">
        <span><strong>Right move:</strong> ${forecast.routeAdvice}</span>
        <span><strong>Timing:</strong> ${forecast.timing}</span>
      </div>
    </article>
  `;
}

function renderFujiForecast(panel, forecast) {
  if (!panel) {
    return;
  }

  const planner = forecast?.fuji;
  if (!planner?.bestDay) {
    panel.innerHTML = `
      <span class="eyebrow">Fuji visibility index</span>
      <h3>Forecast unavailable right now</h3>
      <p>The live Fuji read could not load. Default back to the site rule: do not lock the order until the same-day mountain view is clear.</p>
      <div class="fuji-forecast-list">
        <div class="fuji-day-card">
          <strong>Fallback move</strong>
          <span>Keep the Fuji block movable and re-check in the morning.</span>
        </div>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <span class="eyebrow">Fuji visibility index</span>
    <h3>${planner.bestDay.label} is the current strongest Fuji window</h3>
    <p>The index blends forecast visibility, cloud cover, and rain pressure. Lower fog risk and higher clarity mean the mountain is more likely to pay off cleanly.</p>
    <div class="fuji-index-meter"><span style="width: ${planner.bestDay.clarity}%"></span></div>
    <div class="fuji-score-line">
      <span class="fuji-score-pill">${planner.bestDay.clarity}% clarity</span>
      <span class="fuji-score-pill">${planner.bestDay.fogRisk}% fog risk</span>
      <span class="fuji-score-pill">Best window ${formatHourLabel(planner.bestDay.bestHour)}</span>
    </div>
    <div class="fuji-forecast-list">
      ${planner.days
        .map(
          (day) => `
            <div class="fuji-day-card">
              <strong>${day.label}</strong>
              <span>${day.note}. Aim around ${formatHourLabel(day.bestHour)} if the sky is cooperating.</span>
              <div class="fuji-score-line">
                <span class="fuji-score-pill">${day.clarity}% clarity</span>
                <span class="fuji-score-pill">${day.fogRisk}% fog risk</span>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function initWeatherDashboard() {
  const grid = document.querySelector("[data-weather-grid]");
  const panel = document.querySelector("[data-fuji-forecast]");
  const refreshButton = document.querySelector("[data-refresh-weather]");

  if (!grid || !panel) {
    return;
  }

  let isLoading = false;

  const loadWeather = async () => {
    if (isLoading) {
      return;
    }

    const previousCache = new Map(WEATHER_CACHE);
    const storedCache = readStoredWeatherCache();
    isLoading = true;
    grid.innerHTML = renderWeatherLoadingState();
    if (refreshButton) {
      refreshButton.disabled = true;
      refreshButton.textContent = "Refreshing...";
    }

    const results = await Promise.allSettled(
      WEATHER_STOPS.map((stop) =>
        fetchStopWeatherWithRetry(stop, previousCache.get(stop.key) ?? storedCache.get(stop.key) ?? null)
      )
    );
    const forecasts = results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        stop: WEATHER_STOPS[index],
        error: true
      };
    });

    WEATHER_CACHE.clear();
    forecasts.forEach((forecast) => {
      if (!forecast.error) {
        WEATHER_CACHE.set(forecast.stop.key, forecast);
      }
    });
    writeStoredWeatherCache(forecasts);

    grid.innerHTML = forecasts.map(renderWeatherCard).join("");
    renderFujiForecast(panel, forecasts.find((forecast) => forecast.stop.key === "fuji"));

    if (refreshButton) {
      refreshButton.disabled = false;
      refreshButton.textContent = "Refresh live read";
    }
    document.dispatchEvent(new CustomEvent("weather:updated"));
    isLoading = false;
  };

  refreshButton?.addEventListener("click", loadWeather);
  loadWeather();
}

let leafletLoadPromise = null;

function loadLeafletAssets() {
  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (leafletLoadPromise) {
    return leafletLoadPromise;
  }

  leafletLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-leaflet-script]');
    const existingStylesheet = document.querySelector('link[data-leaflet-style]');

    if (!existingStylesheet) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      stylesheet.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      stylesheet.crossOrigin = "";
      stylesheet.dataset.leafletStyle = "true";
      document.head.append(stylesheet);
    }

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.L), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Leaflet failed to load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.defer = true;
    script.dataset.leafletScript = "true";
    script.addEventListener("load", () => resolve(window.L), { once: true });
    script.addEventListener("error", () => reject(new Error("Leaflet failed to load.")), { once: true });
    document.head.append(script);
  });

  return leafletLoadPromise;
}

function buildGoogleDirectionsUrl(point) {
  return `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lon}&travelmode=transit`;
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    (Math.sin(dLat / 2) ** 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * (Math.sin(dLon / 2) ** 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function createMapIcon(L, category) {
  return L.divIcon({
    className: "",
    html: `<span class="map-marker-chip is-${category}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -8]
  });
}

function createMapPopup(point) {
  return `
    <div class="map-popup">
      <strong>${point.title}</strong>
      <span>${point.description}</span>
      <a href="${point.guideHref}"${point.guideHref.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${point.guideLabel}</a>
    </div>
  `;
}

function initLiveMap() {
  const module = document.querySelector("[data-live-map]");
  const mapElement = document.getElementById("live-route-map");
  const loadingCard = module?.querySelector("[data-map-loading]");
  const locateButton = module?.querySelector("[data-map-locate]");
  const resetButton = module?.querySelector("[data-map-reset]");
  const filterButtons = [...document.querySelectorAll("[data-map-filter]")];
  const title = module?.querySelector("[data-map-title]");
  const description = module?.querySelector("[data-map-description]");
  const gpsStatus = module?.querySelector("[data-map-gps-status]");
  const nearest = module?.querySelector("[data-map-nearest]");
  const weather = module?.querySelector("[data-map-weather]");
  const tags = module?.querySelector("[data-map-tags]");
  const facts = module?.querySelector("[data-map-facts]");
  const primary = module?.querySelector("[data-map-primary]");
  const directions = module?.querySelector("[data-map-directions]");
  const nearby = module?.querySelector("[data-map-nearby]");

  if (
    !module ||
    !mapElement ||
    !locateButton ||
    !resetButton ||
    !filterButtons.length ||
    !title ||
    !description ||
    !gpsStatus ||
    !nearest ||
    !weather ||
    !tags ||
    !facts ||
    !primary ||
    !directions ||
    !nearby
  ) {
    return;
  }

  let activeFilter = "all";
  let activePointKey = "osaka-route";
  let mapInstance = null;
  let markerLayer = null;
  let polyline = null;
  let userMarker = null;
  let watchId = null;
  let initialized = false;
  let lastUserPosition = null;

  const getFilteredPoints = () => MAP_POINTS.filter((point) => activeFilter === "all" || point.category === activeFilter);
  const getPointByKey = (key) => MAP_POINTS.find((point) => point.key === key) ?? MAP_POINTS[0];

  const updateNearbyList = (userPosition = null) => {
    const visiblePoints = getFilteredPoints();
    const rankedPoints = userPosition
      ? [...visiblePoints]
          .map((point) => ({
            point,
            distance: calculateDistanceKm(userPosition.lat, userPosition.lon, point.lat, point.lon)
          }))
          .sort((left, right) => left.distance - right.distance)
      : visiblePoints.slice(0, 4).map((point, index) => ({ point, distance: index + 1 }));

    const shortlist = rankedPoints.slice(0, 4);
    nearby.innerHTML = shortlist
      .map(({ point, distance }) => {
        const distanceLabel = userPosition ? `${distance.toFixed(distance < 10 ? 1 : 0)} km away` : point.tags.slice(0, 2).join(" · ");
        return `
          <div class="map-nearby-item">
            <strong>${point.title}</strong>
            <span>${distanceLabel} - ${point.description}</span>
          </div>
        `;
      })
      .join("");

    if (shortlist[0]) {
      nearest.textContent = shortlist[0].point.title;
    }
  };

  const updatePointDetails = (point, userPosition = null) => {
    const forecast = WEATHER_CACHE.get(point.weatherKey);
    title.textContent = point.title;
    description.textContent = point.description;
    weather.textContent = forecast
      ? `${forecast.condition}. ${forecast.routeAdvice}`
      : "Live route weather loads in the weather section below.";
    tags.innerHTML = point.tags.map((tag) => `<span class="destination-pill">${tag}</span>`).join("");
    facts.innerHTML = point.facts
      .map(
        (fact) => `
          <div class="route-fact">
            <strong>${fact.label}</strong>
            <span>${fact.text}</span>
          </div>
        `
      )
      .join("");
    primary.href = point.guideHref;
    primary.textContent = point.guideLabel;
    if (point.guideHref.startsWith("http")) {
      primary.target = "_blank";
      primary.rel = "noreferrer";
    } else {
      primary.removeAttribute("target");
      primary.removeAttribute("rel");
    }
    directions.href = buildGoogleDirectionsUrl(point);

    if (userPosition) {
      const distance = calculateDistanceKm(userPosition.lat, userPosition.lon, point.lat, point.lon);
      gpsStatus.textContent = `Tracking live position · ${distance.toFixed(distance < 10 ? 1 : 0)} km to selected point`;
    }
  };

  const renderMarkers = (L, userPosition = null) => {
    if (!mapInstance || !markerLayer) {
      return;
    }

    markerLayer.clearLayers();
    const visiblePoints = getFilteredPoints();

    visiblePoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lon], { icon: createMapIcon(L, point.category) });
      marker.bindPopup(createMapPopup(point));
      marker.on("click", () => {
        activePointKey = point.key;
        updatePointDetails(point, userPosition);
        updateNearbyList(userPosition);
      });
      marker.addTo(markerLayer);
    });

    if (polyline) {
      polyline.remove();
    }

    const routePoints = MAP_POINTS.filter((point) => point.category === "route").map((point) => [point.lat, point.lon]);
    polyline = L.polyline(routePoints, {
      color: "#9c3d33",
      weight: 4,
      opacity: 0.75,
      dashArray: "10 8"
    }).addTo(mapInstance);

    const activePoint = visiblePoints.find((point) => point.key === activePointKey) ?? visiblePoints[0] ?? MAP_POINTS[0];
    activePointKey = activePoint.key;
    updatePointDetails(activePoint, userPosition);
  };

  const setUserPosition = (L, position) => {
    const userLatLng = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    lastUserPosition = userLatLng;

    if (!userMarker) {
      userMarker = L.circleMarker([userLatLng.lat, userLatLng.lon], {
        radius: 9,
        color: "#1f5f6b",
        weight: 3,
        fillColor: "#ffffff",
        fillOpacity: 0.92
      }).addTo(mapInstance);
    } else {
      userMarker.setLatLng([userLatLng.lat, userLatLng.lon]);
    }

    gpsStatus.textContent = `GPS live at ${userLatLng.lat.toFixed(3)}, ${userLatLng.lon.toFixed(3)}`;
    updateNearbyList(userLatLng);
    updatePointDetails(getPointByKey(activePointKey), userLatLng);
  };

  const attachControls = (L) => {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.mapFilter;
        filterButtons.forEach((candidate) => {
          const isActive = candidate === button;
          candidate.classList.toggle("is-active", isActive);
          candidate.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderMarkers(L, lastUserPosition);
        updateNearbyList(lastUserPosition);
      });
    });

    locateButton.addEventListener("click", () => {
      if (!navigator.geolocation) {
        gpsStatus.textContent = "Geolocation is not supported in this browser.";
        return;
      }

      gpsStatus.textContent = "Requesting location permission...";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition(L, position);
          mapInstance.flyTo([position.coords.latitude, position.coords.longitude], 7, { duration: 1.2 });

          if (watchId === null) {
            watchId = navigator.geolocation.watchPosition(
              (nextPosition) => setUserPosition(L, nextPosition),
              () => {
                gpsStatus.textContent = "Location shared once. Live tracking update failed.";
              },
              { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 }
            );
          }
        },
        () => {
          gpsStatus.textContent = "Location permission denied. Use the saved route pins instead.";
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    });

    resetButton.addEventListener("click", () => {
      mapInstance.setView([35.3, 137.8], 6);
      activeFilter = "all";
      filterButtons.forEach((button) => {
        const isActive = button.dataset.mapFilter === "all";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      renderMarkers(L, lastUserPosition);
      updateNearbyList(lastUserPosition);
      gpsStatus.textContent = lastUserPosition ? gpsStatus.textContent : "Location not shared yet";
    });
  };

  const createMap = async () => {
    if (initialized) {
      return;
    }

    initialized = true;
    try {
      const L = await loadLeafletAssets();
      mapInstance = L.map(mapElement, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([35.3, 137.8], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(mapInstance);

      markerLayer = L.layerGroup().addTo(mapInstance);
      renderMarkers(L);
      updateNearbyList();
      attachControls(L);

      loadingCard?.classList.add("is-hidden");
      mapElement.classList.add("is-ready");
      window.setTimeout(() => mapInstance.invalidateSize(), 120);
    } catch {
      if (loadingCard) {
        loadingCard.innerHTML = `
          <strong>Interactive map failed to load</strong>
          <span>The page still works. Use the route atlas above or open the selected stop directly in Google Maps.</span>
        `;
      }
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            createMap();
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(module);
  } else {
    createMap();
  }

  window.addEventListener("beforeunload", () => {
    if (watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  });

  document.addEventListener("weather:updated", () => {
    updatePointDetails(getPointByKey(activePointKey), lastUserPosition);
  });
}

function renderDirectoryMedia(item, detail = false) {
  if (item.image) {
    return detail
      ? `<img src="${item.image}" alt="${item.alt}">`
      : `<img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async">`;
  }

  return `
    <div class="destination-graphic${detail ? " is-detail" : ""}">
      <span class="weather-label">${item.region}</span>
      <strong>${item.name}</strong>
      <span>${item.prefecture}</span>
    </div>
  `;
}

function renderDirectoryCard(item, isActive) {
  return `
    <button class="destination-card${isActive ? " is-active" : ""}" type="button" data-destination-key="${item.key}" aria-pressed="${isActive ? "true" : "false"}">
      ${renderDirectoryMedia(item)}
      <div class="destination-card-copy">
        <span class="badge badge-soft">${item.region}</span>
        <strong>${item.name}</strong>
        <span>${item.summary}</span>
        <div class="destination-card-meta">
          ${item.tags.slice(0, 3).map((tag) => `<span class="destination-pill">${tag}</span>`).join("")}
        </div>
      </div>
    </button>
  `;
}

function renderDirectoryDetail(item, container) {
  if (!container || !item) {
    return;
  }

  container.innerHTML = `
    <div class="destination-detail-media${item.image ? "" : " is-illustrated"}">
      ${renderDirectoryMedia(item, true)}
    </div>
    <div class="destination-detail-copy">
      <span class="eyebrow">${item.region}</span>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="destination-meta">
        <span class="destination-pill">${item.prefecture}</span>
        ${item.tags.map((tag) => `<span class="destination-pill">${tag}</span>`).join("")}
      </div>
      <div class="destination-facts">
        <div class="route-fact">
          <strong>Best time to use it</strong>
          <span>${item.bestTime}</span>
        </div>
        <div class="route-fact">
          <strong>Crowd read</strong>
          <span>${item.crowd}</span>
        </div>
        <div class="route-fact">
          <strong>Highlights</strong>
          <span>${item.highlights.join(", ")}.</span>
        </div>
      </div>
      <div class="destination-category-grid">
        <div class="destination-category">
          <strong>Hotels</strong>
          <span>${item.categories.hotels}</span>
        </div>
        <div class="destination-category">
          <strong>Shopping</strong>
          <span>${item.categories.shopping}</span>
        </div>
        <div class="destination-category">
          <strong>Entertainment</strong>
          <span>${item.categories.entertainment}</span>
        </div>
        <div class="destination-category">
          <strong>Restaurants</strong>
          <span>${item.categories.restaurants}</span>
        </div>
      </div>
      <div class="route-spotlight-actions">
        <a class="button-primary" href="${item.guideHref}"${item.guideHref.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${item.primaryLabel}</a>
        <a class="button-secondary" href="${item.secondaryHref}"${item.secondaryHref.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${item.secondaryLabel}</a>
      </div>
    </div>
  `;
}

function initDestinationExplorer() {
  const explorer = document.querySelector("[data-destination-explorer]");
  const grid = document.getElementById("destination-grid");
  const detail = document.getElementById("destination-detail");
  const searchInput = document.getElementById("destination-search");
  const filterButtons = [...document.querySelectorAll("[data-region-filter]")];

  if (!explorer || !grid || !detail || !searchInput || !filterButtons.length) {
    return;
  }

  let activeFilter = "all";
  let activeKey = DESTINATION_DIRECTORY_ITEMS[0]?.key ?? null;

  const getFilteredItems = () => {
    const query = searchInput.value.trim().toLowerCase();
    return DESTINATION_DIRECTORY_ITEMS.filter((item) => {
      const filterMatch = activeFilter === "all" || item.filter === activeFilter;
      const haystack = `${item.name} ${item.region} ${item.prefecture} ${item.summary} ${item.highlights.join(" ")} ${item.tags.join(" ")} ${Object.values(item.categories).join(" ")}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      return filterMatch && queryMatch;
    });
  };

  const renderExplorer = () => {
    const items = getFilteredItems();
    if (!items.length) {
      grid.innerHTML = `
        <div class="note-band">
          No direct match. Try broader terms like Kansai, Nikko, island, ramen, night, or scenery.
        </div>
      `;
      return;
    }

    if (!items.find((item) => item.key === activeKey)) {
      activeKey = items[0].key;
    }

    grid.innerHTML = items.map((item) => renderDirectoryCard(item, item.key === activeKey)).join("");
    renderDirectoryDetail(items.find((item) => item.key === activeKey), detail);

    grid.querySelectorAll("[data-destination-key]").forEach((card) => {
      const activate = () => {
        if (activeKey === card.dataset.destinationKey) {
          return;
        }
        activeKey = card.dataset.destinationKey;
        renderExplorer();
      };

      card.addEventListener("click", activate);
      card.addEventListener("focus", activate);
      card.addEventListener("mouseenter", activate);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.regionFilter;
      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      renderExplorer();
    });
  });

  searchInput.addEventListener("input", renderExplorer);
  renderExplorer();
}

function formatSkyscannerDate(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return `${year.slice(-2)}${month}${day}`;
}

function getDefaultTravelDate(offsetDays) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function initFlightForms() {
  const forms = [...document.querySelectorAll("[data-flight-form]")];
  if (!forms.length) {
    return;
  }

  forms.forEach((form) => {
    const departInput = form.elements.depart;
    const returnInput = form.elements.return;

    if (departInput instanceof HTMLInputElement && !departInput.value) {
      departInput.value = getDefaultTravelDate(42);
    }

    if (returnInput instanceof HTMLInputElement && !returnInput.value) {
      returnInput.value = getDefaultTravelDate(49);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const from = String(form.elements.from?.value || "").trim().toLowerCase();
      const to = String(form.elements.to?.value || "").trim().toLowerCase();
      const depart = formatSkyscannerDate(String(form.elements.depart?.value || ""));
      const returnDate = formatSkyscannerDate(String(form.elements.return?.value || ""));

      if (!from || !to || !depart) {
        return;
      }

      const url = returnDate
        ? `https://www.skyscanner.com/transport/flights/${from}/${to}/${depart}/${returnDate}/`
        : `https://www.skyscanner.com/transport/flights/${from}/${to}/${depart}/`;

      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function initSliders() {
  const sliders = [...document.querySelectorAll("[data-slider]")];
  if (!sliders.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  sliders.forEach((slider) => {
    const slides = [...slider.querySelectorAll("[data-slide]")];
    const dotsRoot = slider.querySelector("[data-slider-dots]");
    const prevButton = slider.querySelector("[data-slider-prev]");
    const nextButton = slider.querySelector("[data-slider-next]");
    const interval = Number(slider.dataset.sliderInterval || 0);

    if (!slides.length || !dotsRoot || !prevButton || !nextButton) {
      return;
    }

    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let timerId = null;

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    const renderDots = () => {
      dotsRoot.innerHTML = slides
        .map(
          (_, index) => `
            <button class="slider-dot${index === activeIndex ? " is-active" : ""}" type="button" data-slider-dot="${index}" aria-label="Go to slide ${index + 1}" aria-pressed="${index === activeIndex ? "true" : "false"}"></button>
          `
        )
        .join("");

      dotsRoot.querySelectorAll("[data-slider-dot]").forEach((dot) => {
        dot.addEventListener("click", () => {
          activeIndex = Number(dot.dataset.sliderDot);
          renderSlides();
          restartAutoPlay();
        });
      });
    };

    const renderSlides = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
      });
      renderDots();
    };

    const stopAutoPlay = () => {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    const restartAutoPlay = () => {
      stopAutoPlay();
      if (prefersReducedMotion || interval < 2500 || slides.length < 2) {
        return;
      }

      timerId = window.setInterval(() => {
        activeIndex = (activeIndex + 1) % slides.length;
        renderSlides();
      }, interval);
    };

    prevButton.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
      renderSlides();
      restartAutoPlay();
    });

    nextButton.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % slides.length;
      renderSlides();
      restartAutoPlay();
    });

    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", restartAutoPlay);
    slider.addEventListener("focusin", stopAutoPlay);
    slider.addEventListener("focusout", restartAutoPlay);

    renderSlides();
    restartAutoPlay();
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

function renderRouteBadges(items = []) {
  return items
    .map((item) => `<span class="best-for-chip is-${item.tone}">${item.label}</span>`)
    .join("");
}

function initRouteModules() {
  const modules = [...document.querySelectorAll("[data-route-module]")];
  if (!modules.length) {
    return;
  }

  modules.forEach((module) => {
    const board = module.querySelector("[data-route-board]");
    const pins = [...module.querySelectorAll("[data-route-stop]")];
    const kicker = module.querySelector("[data-route-kicker]");
    const title = module.querySelector("[data-route-title]");
    const description = module.querySelector("[data-route-description]");
    const image = module.querySelector("[data-route-image]");
    const badges = module.querySelector("[data-route-badges]");
    const facts = module.querySelector("[data-route-facts]");
    const previewButton = module.querySelector("[data-route-preview]");
    const link = module.querySelector("[data-route-link]");

    if (!board || !pins.length || !kicker || !title || !description || !image || !badges || !facts || !previewButton || !link) {
      return;
    }

    const renderStop = (key) => {
      const item = ROUTE_ATLAS_ITEMS[key];
      if (!item) {
        return;
      }

      pins.forEach((pin) => {
        const isActive = pin.dataset.routeStop === key;
        pin.classList.toggle("is-active", isActive);
        pin.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      kicker.textContent = item.kicker;
      title.textContent = item.title;
      description.textContent = item.description;
      image.src = item.image;
      image.alt = item.alt;
      badges.innerHTML = renderRouteBadges(item.badges);
      facts.innerHTML = item.facts
        .map(
          (fact) => `
            <div class="route-fact">
              <strong>${fact.label}</strong>
              <span>${fact.text}</span>
            </div>
          `
        )
        .join("");
      previewButton.dataset.previewGallery = key;
      previewButton.textContent = item.previewLabel;
      link.href = item.href;
    };

    pins.forEach((pin) => {
      pin.addEventListener("click", () => renderStop(pin.dataset.routeStop));
    });

    const initialKey = pins.find((pin) => pin.classList.contains("is-active"))?.dataset.routeStop ?? pins[0].dataset.routeStop;
    renderStop(initialKey);
    window.requestAnimationFrame(() => board.classList.add("is-live"));
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
  initLocaleSwitch();
  initReveal();
  initSectionNavs();
  initHashHighlights();
  initSearch();
  initTermGroups();
  initRouteModules();
  initRecommendationEngine();
  initLiveMap();
  initWeatherDashboard();
  initDestinationExplorer();
  initFlightForms();
  initSliders();
  initPreviewModal();
});
