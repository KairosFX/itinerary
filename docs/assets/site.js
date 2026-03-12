document.documentElement.classList.add("js");

const SEARCH_ITEMS = [
  {
    title: "Visual Trip Highlights",
    text: "Image-led homepage slider for Osaka, Kyoto, Fuji, and seasonal planning cues.",
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
    href: "./japan_trip_brochure.html"
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
    "guide.html": "Full guide",
    "japan_trip_brochure.html": "Brochure pack"
  },
  ja: {
    "index.html": "メイントリップ",
    "itinerary.html": "旅程",
    "food.html": "食事ガイド",
    "toolkit.html": "準備ガイド",
    "culture.html": "文化メモ",
    "quick_snapshot.html": "要点ページ",
    "guide.html": "完全ガイド",
    "japan_trip_brochure.html": "パンフレット"
  }
};

const UI_COPY = {
  en: {
    weatherLoadingTitle: "Loading live read...",
    weatherLoadingText: "Checking current conditions and next-step advice.",
    weatherUnavailableTitle: "Live data unavailable",
    weatherUnavailableText: "Use the static trip rule for now:",
    weatherFallbackLabel: "Fallback:",
    weatherFallbackFuji: "Keep Fuji flexible.",
    weatherFallbackDefault: "Dress in layers and re-check later.",
    weatherSavedRead: "Saved read",
    weatherHigh: "High",
    weatherLow: "Low",
    weatherRain: "Rain",
    weatherFeelsLike: "Feels like",
    weatherRightMove: "Right move:",
    weatherTiming: "Timing:",
    weatherRefresh: "Refresh live read",
    weatherRefreshing: "Refreshing...",
    weatherCalloutTitle: "What This Is Doing",
    weatherFujiEyebrow: "Fuji visibility index",
    weatherFujiUnavailableTitle: "Forecast unavailable right now",
    weatherFujiUnavailableText:
      "The live Fuji read could not load. Default back to the site rule: do not lock the order until the same-day mountain view is clear.",
    weatherFujiFallbackTitle: "Fallback move",
    weatherFujiFallbackText: "Keep the Fuji block movable and re-check in the morning.",
    weatherFujiBestWindow: "Best window",
    weatherFujiClarity: "clarity",
    weatherFujiFogRisk: "fog risk",
    weatherFujiBestDaySuffix: "is the current strongest Fuji window",
    weatherFujiIntro:
      "The index blends forecast visibility, cloud cover, and rain pressure. Lower fog risk and higher clarity mean the mountain is more likely to pay off cleanly.",
    weatherFujiAimAround: "Aim around",
    weatherFujiIfSky: "if the sky is cooperating.",
    mapPopupOpen: "Open local guide",
    mapLoadingTitle: "Loading interactive map...",
    mapLoadingText: "The map initializes only when this section comes into view so the page stays fast.",
    mapFailTitle: "Interactive map failed to load",
    mapFailText: "The page still works. Use the homepage highlights above or open the selected stop directly in Google Maps.",
    mapWeatherFallback: "Live route weather loads in the weather section below.",
    mapGpsUnsupported: "Geolocation is not supported in this browser.",
    mapGpsRequesting: "Requesting location permission...",
    mapGpsDenied: "Location permission denied. Use the saved route pins instead.",
    mapGpsTrackingFailed: "Location shared once. Live tracking update failed.",
    mapLocationNotShared: "Location not shared yet",
    mapTrackingSelected: "Tracking live position · {distance} km to selected point",
    mapGpsLiveAt: "GPS live at {lat}, {lon}",
    mapDistanceAway: "{distance} km away",
    edgeTop: "Top",
    edgePrevious: "Previous section",
    edgeNext: "Next section",
    edgeBottom: "Bottom",
    footerHelpful: "Helpful links",
    footerRelated: "Related sites",
    footerAbout: "About",
    footerAboutText: "Japan Escape is a visual planning hub for this trip: route flow, weather logic, food reads, and share-ready pages without heavy app clutter.",
    footerWho: "Who we are",
    footerContact: "Contact us",
    footerPrivacy: "Privacy Policy",
    footerCookie: "Cookie Policy",
    footerTerms: "Terms of Use",
    footerSitemap: "Sitemap",
    footerCopyright: "Copyright © 2026 Japan Escape. All rights reserved.",
    navPreviewTitleHome: "Main hub",
    navPreviewTextHome: "Recommendation engine, visual highlights, live weather, live map, and page routing in one place.",
    navPreviewTitleItinerary: "Itinerary",
    navPreviewTextItinerary: "Nightly stays, day flow, transfer logic, and the route order.",
    navPreviewTitleFood: "Food guide",
    navPreviewTextFood: "City-by-city dishes, late backups, and fast visual food browsing.",
    navPreviewTitleToolkit: "Toolkit",
    navPreviewTextToolkit: "Weather, packing, tickets, luggage logic, and move-day shortcuts.",
    navPreviewTitleCulture: "Culture notes",
    navPreviewTextCulture: "Etiquette, onsen basics, useful phrases, and photo prompts.",
    navPreviewTitleSnapshot: "Quick snapshot",
    navPreviewTextSnapshot: "Portable mobile and print view with only the essentials.",
    navPreviewTitleGuide: "Full guide",
    navPreviewTextGuide: "All-in-one long-scroll guide with richer interactive sections.",
    brochureCardTitle: "Travel Brochures",
    brochureCardText: "Open the local brochure pack with printable route summaries, fast links, and share-ready pages.",
    brochureCardLabel: "Local brochures"
  },
  ja: {
    weatherLoadingTitle: "ライブ情報を読み込み中...",
    weatherLoadingText: "現在の天気と次の動き方を確認しています。",
    weatherUnavailableTitle: "ライブ情報を取得できません",
    weatherUnavailableText: "いまは固定ルールを使ってください:",
    weatherFallbackLabel: "代替:",
    weatherFallbackFuji: "富士は固定せず柔軟に。",
    weatherFallbackDefault: "重ね着で対応し、あとで再確認してください。",
    weatherSavedRead: "保存済み情報",
    weatherHigh: "最高",
    weatherLow: "最低",
    weatherRain: "雨",
    weatherFeelsLike: "体感",
    weatherRightMove: "おすすめ:",
    weatherTiming: "時間帯:",
    weatherRefresh: "ライブ情報を更新",
    weatherRefreshing: "更新中...",
    weatherCalloutTitle: "この機能について",
    weatherFujiEyebrow: "富士山の視界指数",
    weatherFujiUnavailableTitle: "予報を取得できません",
    weatherFujiUnavailableText:
      "富士のライブ判定を取得できませんでした。サイトの基本ルールどおり、当日の見え方が良いと確認できるまで順番を固定しないでください。",
    weatherFujiFallbackTitle: "代替プラン",
    weatherFujiFallbackText: "富士ブロックは動かせる状態にして、朝に再確認してください。",
    weatherFujiBestWindow: "最良時間",
    weatherFujiClarity: "視界",
    weatherFujiFogRisk: "霧リスク",
    weatherFujiBestDaySuffix: "が現在もっとも強い富士山チャンスです",
    weatherFujiIntro:
      "この指数は視界、雲量、雨の圧力を合わせて判定します。霧リスクが低く、視界が高いほど、富士山がきれいに見える可能性が高くなります。",
    weatherFujiAimAround: "目安は",
    weatherFujiIfSky: "空の状態が良ければ狙い目です。",
    mapPopupOpen: "ガイドを開く",
    mapLoadingTitle: "インタラクティブ地図を読み込み中...",
    mapLoadingText: "このセクションが見えた時だけ地図を初期化し、ページ全体の軽さを保ちます。",
    mapFailTitle: "地図を読み込めませんでした",
    mapFailText: "ページ自体は使えます。上のハイライトを使うか、選択中の地点を Google マップで開いてください。",
    mapWeatherFallback: "ライブ天気は下の天気セクションで読み込まれます。",
    mapGpsUnsupported: "このブラウザでは位置情報が使えません。",
    mapGpsRequesting: "位置情報の許可を確認しています...",
    mapGpsDenied: "位置情報の共有が拒否されました。保存済みピンを使ってください。",
    mapGpsTrackingFailed: "位置は一度取得しましたが、ライブ追跡の更新に失敗しました。",
    mapLocationNotShared: "位置情報はまだ共有されていません",
    mapTrackingSelected: "現在地を追跡中 · 選択地点まで {distance} km",
    mapGpsLiveAt: "現在地 {lat}, {lon}",
    mapDistanceAway: "{distance} km先",
    edgeTop: "上へ",
    edgePrevious: "前のセクション",
    edgeNext: "次のセクション",
    edgeBottom: "下へ",
    footerHelpful: "便利なリンク",
    footerRelated: "関連サイト",
    footerAbout: "このサイトについて",
    footerAboutText: "Japan Escape は、この旅行のための視覚重視の計画ハブです。ルート、天気判断、食事メモ、共有向けページを重いアプリ化なしでまとめています。",
    footerWho: "私たちについて",
    footerContact: "お問い合わせ",
    footerPrivacy: "プライバシーポリシー",
    footerCookie: "Cookie Policy",
    footerTerms: "利用規約",
    footerSitemap: "サイトマップ",
    footerCopyright: "Copyright © 2026 Japan Escape. All rights reserved.",
    navPreviewTitleHome: "メインハブ",
    navPreviewTextHome: "おすすめエンジン、ハイライト、ライブ天気、ライブ地図、各ページ導線を一か所にまとめています。",
    navPreviewTitleItinerary: "旅程",
    navPreviewTextItinerary: "宿泊順、日ごとの流れ、移動ロジック、ルート順を確認できます。",
    navPreviewTitleFood: "食事ガイド",
    navPreviewTextFood: "都市ごとの名物、夜の保険、画像中心の食べ方ガイドです。",
    navPreviewTitleToolkit: "準備ガイド",
    navPreviewTextToolkit: "天気、持ち物、切符、荷物、移動日のショートカットをまとめています。",
    navPreviewTitleCulture: "文化メモ",
    navPreviewTextCulture: "マナー、温泉ルール、役立つ表現、写真のヒントです。",
    navPreviewTitleSnapshot: "要点ページ",
    navPreviewTextSnapshot: "必要最低限だけを見たいときのモバイル・印刷向け表示です。",
    navPreviewTitleGuide: "完全ガイド",
    navPreviewTextGuide: "長い1ページに情報をまとめた、より深いインタラクティブ版です。",
    brochureCardTitle: "トラベルパンフレット",
    brochureCardText: "印刷しやすい要約、すぐ開けるリンク、共有向けページをまとめたローカルのパンフレット集を開きます。",
    brochureCardLabel: "ローカルパンフ"
  }
};

const NAV_PREVIEW_CONTENT = {
  "./index.html": {
    image: PREVIEW_GALLERIES.osaka.images[1].src,
    titleKey: "navPreviewTitleHome",
    textKey: "navPreviewTextHome"
  },
  "./itinerary.html": {
    image: PREVIEW_GALLERIES.hakone.images[0].src,
    titleKey: "navPreviewTitleItinerary",
    textKey: "navPreviewTextItinerary"
  },
  "./food.html": {
    image: PREVIEW_GALLERIES.osaka.images[0].src,
    titleKey: "navPreviewTitleFood",
    textKey: "navPreviewTextFood"
  },
  "./toolkit.html": {
    image: PREVIEW_GALLERIES.fuji.images[0].src,
    titleKey: "navPreviewTitleToolkit",
    textKey: "navPreviewTextToolkit"
  },
  "./culture.html": {
    image: PREVIEW_GALLERIES.kyoto.images[0].src,
    titleKey: "navPreviewTitleCulture",
    textKey: "navPreviewTextCulture"
  },
  "./quick_snapshot.html": {
    image: PREVIEW_GALLERIES.tokyo.images[1].src,
    titleKey: "navPreviewTitleSnapshot",
    textKey: "navPreviewTextSnapshot"
  },
  "./guide.html": {
    image: PREVIEW_GALLERIES.tokyo.images[0].src,
    titleKey: "navPreviewTitleGuide",
    textKey: "navPreviewTextGuide"
  }
};

const PAGE_JA_TRANSLATIONS = {
  "index.html": [
    { selector: ".hero .eyebrow", text: "メインページ" },
    { selector: ".hero h1", text: "Japan Escape ガイドハブ" },
    {
      selector: ".hero .hero-lead",
      text: "このサイトは、旅行スタイルをすばやく決められるように設計されています。ガイド検索、おすすめエンジン、プレビュー画像を使って、日程を固定する前に方向性を決められます。"
    },
    { selector: ".hero .quick-callout strong", text: "ここから開始" },
    {
      selector: ".hero .quick-callout span",
      text: "まずプロフィールを作成し、その後プレビューカードでグループに合う都市の雰囲気を確認してからページを共有してください。"
    },
    { selector: ".hero-actions a:nth-child(1)", text: "プランを作る" },
    { selector: ".hero-actions a:nth-child(2)", text: "旅程を開く" },
    { selector: ".hero-actions a:nth-child(3)", text: "完全ガイドを開く" },
    { selector: ".section-pill[href=\"#route-atlas\"]", text: "ハイライト" },
    { selector: ".section-pill[href=\"#live-map\"]", text: "ライブ地図" },
    { selector: ".section-pill[href=\"#trip-profile\"]", text: "プロフィール" },
    { selector: ".section-pill[href=\"#trip-weather\"]", text: "ライブ天気" },
    { selector: ".section-pill[href=\"#japan-explorer\"]", text: "探索" },
    { selector: ".section-pill[href=\"#official-watch\"]", text: "記事" },
    { selector: ".section-pill[href=\"#visual-previews\"]", text: "プレビュー" },
    { selector: "#route-atlas .section-copy .eyebrow", text: "ビジュアルハイライト" },
    { selector: "#route-atlas .section-copy h2", text: "旅全体を画像中心で、より素早く把握する" },
    {
      selector: "#route-atlas .section-header > p",
      text: "このセクションは地図ではなく、視覚的な導入レイヤーです。回転するハイライト、季節の判断材料、そして正しいページへの導線をすばやく確認できます。"
    },
    { selector: "#live-map .section-copy .eyebrow", text: "ライブナビ地図" },
    { selector: "#live-map .section-copy h2", text: "GPS、ルートピン、Google マップ連携で本物の地図を使う" },
    {
      selector: "#live-map .section-header > p",
      text: "この地図レイヤーは実用重視です。現在地、ルート・カテゴリの切り替え、距離の把握、そして実際のナビ用に Google マップへ1クリックで渡せます。"
    },
    { selector: "[data-map-filter=\"all\"]", text: "すべて" },
    { selector: "[data-map-filter=\"route\"]", text: "ルート" },
    { selector: "[data-map-filter=\"food\"]", text: "食事" },
    { selector: "[data-map-filter=\"view\"]", text: "景色" },
    { selector: "[data-map-filter=\"transit\"]", text: "移動" },
    { selector: "[data-map-locate]", text: "現在地を使う" },
    { selector: "[data-map-reset]", text: "地図をリセット" },
    { selector: "[data-map-loading] strong", text: "インタラクティブ地図を読み込み中..." },
    {
      selector: "[data-map-loading] span",
      text: "このセクションが見えた時だけ地図を初期化し、ページ全体の軽さを保ちます。"
    },
    { selector: ".map-info-panel > .eyebrow", text: "GPS + ルート文脈" },
    { selector: "[data-map-title]", text: "大阪が現在のアンカーです" },
    {
      selector: "[data-map-description]",
      text: "ライブ地図は主要ルートから始まります。マーカーをクリックするかフィルターを使って、ルート地点、食事スポット、景色の見どころ、主要乗り継ぎへ切り替えてください。"
    },
    { selector: ".map-stat:nth-child(1) span", text: "GPS 状態" },
    { selector: ".map-stat:nth-child(2) span", text: "最寄りの保存地点" },
    { selector: ".map-stat:nth-child(3) span", text: "天気連動" },
    { selector: ".map-nearby-panel > strong", text: "近い保存地点" },
    { selector: "[data-map-gps-status]", text: "位置情報はまだ共有されていません" },
    { selector: "[data-map-nearest]", text: "大阪" },
    { selector: "[data-map-weather]", text: "ライブ天気は下の天気セクションで読み込まれます。" },
    { selector: "[data-map-primary]", text: "ローカルガイドを開く" },
    { selector: "[data-map-directions]", text: "Google マップで開く" },
    { selector: "#route-atlas [data-route-stop=\"osaka\"] strong", text: "大阪" },
    { selector: "#route-atlas [data-route-stop=\"osaka\"] small", text: "1-3泊" },
    { selector: "#route-atlas [data-route-stop=\"kyoto\"] strong", text: "京都" },
    { selector: "#route-atlas [data-route-stop=\"kyoto\"] small", text: "2日目" },
    { selector: "#route-atlas [data-route-stop=\"hakone\"] strong", text: "箱根" },
    { selector: "#route-atlas [data-route-stop=\"hakone\"] small", text: "4泊目" },
    { selector: "#route-atlas [data-route-stop=\"fuji\"] strong", text: "富士" },
    { selector: "#route-atlas [data-route-stop=\"fuji\"] small", text: "6日目" },
    { selector: "#route-atlas [data-route-stop=\"tokyo\"] strong", text: "東京" },
    { selector: "#route-atlas [data-route-stop=\"tokyo\"] small", text: "最終日" },
    { selector: "#official-watch .section-copy .eyebrow", text: "公式リンク" },
    { selector: "#official-watch .section-copy h2", text: "記事、季節情報、パンフレット、航空券検索" },
    {
      selector: "#official-watch .section-header > p",
      text: "ここにあるリンクは軽量で信頼できるものだけです。時期確認、地域調査、旅行準備を、重い埋め込みなしで使えます。"
    },
    { selector: ".official-link-grid a:last-child strong", text: "トラベルパンフレット" },
    {
      selector: ".official-link-grid a:last-child span",
      text: "印刷しやすい要約、共有用のリンク、地域別の準備ページを集めたローカルのパンフレット集です。"
    },
    { selector: ".official-link-grid a:last-child small", text: "ローカルパンフ" },
    { selector: ".tool-stack .tool-card:first-child .eyebrow", text: "無料フライト起点" },
    { selector: ".tool-stack .tool-card:first-child h3", text: "重い埋め込みなしで航空券検索を開く" },
    {
      selector: ".tool-stack .tool-card:first-child p",
      text: "出発空港コードを入れ、日本側の到着空港を選ぶと、軽量な外部検索を新しいタブで開きます。"
    },
    { selector: "label[for=\"flight-from\"] > span", text: "出発空港コード" },
    { selector: "label[for=\"flight-to\"] > span", text: "日本側の空港" },
    { selector: "label[for=\"flight-depart\"] > span", text: "出発日" },
    { selector: "label[for=\"flight-return\"] > span", text: "帰着日" },
    { selector: ".flight-form button[type=\"submit\"]", text: "航空券を検索" },
    {
      selector: ".tool-stack .tool-card:first-child .note-band",
      text: "広告の多い埋め込みウィジェットは使わず、外部検索ページを開きます。空港コードを入れると見やすくなります。"
    }
  ],
  "itinerary.html": [
    { selector: ".hero .eyebrow", text: "旅の設計" },
    { selector: ".hero h1", text: "旅程とルートの考え方" },
    {
      selector: ".hero .hero-lead",
      text: "このページはルート自体を整理して見せます。どこに泊まるか、各日が何を目指すか、移動が多い区間をどう崩さずに組むかを確認できます。"
    },
    { selector: ".hero-actions a:nth-child(1)", text: "日ごとの流れへ" },
    { selector: ".hero-actions a:nth-child(2)", text: "移動日へ" },
    { selector: "#route-atlas [data-route-stop=\"osaka\"] strong", text: "大阪" },
    { selector: "#route-atlas [data-route-stop=\"osaka\"] small", text: "1-3泊" },
    { selector: "#route-atlas [data-route-stop=\"kyoto\"] strong", text: "京都" },
    { selector: "#route-atlas [data-route-stop=\"kyoto\"] small", text: "2日目" },
    { selector: "#route-atlas [data-route-stop=\"hakone\"] strong", text: "箱根" },
    { selector: "#route-atlas [data-route-stop=\"hakone\"] small", text: "4泊目" },
    { selector: "#route-atlas [data-route-stop=\"fuji\"] strong", text: "富士" },
    { selector: "#route-atlas [data-route-stop=\"fuji\"] small", text: "6日目" },
    { selector: "#route-atlas [data-route-stop=\"tokyo\"] strong", text: "東京" },
    { selector: "#route-atlas [data-route-stop=\"tokyo\"] small", text: "最終日" }
  ],
  "food.html": [
    { selector: ".hero .eyebrow", text: "食事ガイド" },
    { selector: ".hero h1", text: "何を食べるか、どこで食べるか" },
    {
      selector: ".hero .hero-lead",
      text: "このページは食べ物を都市ごとに結びつけ、何を食べるか、どこで合うか、だいたいどのくらい使うかをすばやく判断できるようにしています。"
    },
    { selector: ".hero-actions a:nth-child(1)", text: "フードスライダーへ" },
    { selector: ".hero-actions a:nth-child(2)", text: "都市別フードへ" },
    { selector: ".section-pill[href=\"#food-carousel\"]", text: "フードスライダー" },
    { selector: ".section-pill[href=\"#city-foods\"]", text: "都市別フード" },
    { selector: ".section-pill[href=\"#dish-shortlist\"]", text: "料理一覧" }
  ],
  "toolkit.html": [
    { selector: ".hero .eyebrow", text: "準備ガイド" },
    { selector: ".hero h1", text: "天気、持ち物、切符、移動日のメモ" },
    {
      selector: ".hero .hero-lead",
      text: "何を着るか、現金をどれくらい持つか、何を事前予約するか、長い移動日をどう崩さず乗り切るかを確認するページです。"
    },
    { selector: ".hero-actions a:nth-child(1)", text: "天気と持ち物へ" },
    { selector: ".hero-actions a:nth-child(2)", text: "移動メモへ" }
  ],
  "culture.html": [
    { selector: ".hero .eyebrow", text: "文化メモ" },
    { selector: ".hero h1", text: "マナー、安全、表現、写真のヒント" },
    {
      selector: ".hero .hero-lead",
      text: "初めての人向けの大事なポイントを短く実用的にまとめています。気持ちよく動くためのマナー、温泉や寺社で気をつけること、役立つ表現、写真の立ち位置です。"
    },
    { selector: ".hero-actions a:nth-child(1)", text: "クイック参照へ" },
    { selector: ".hero-actions a:nth-child(2)", text: "写真ヒントへ" }
  ],
  "japan_trip_brochure.html": [
    { selector: ".hero .eyebrow", text: "パンフレット" },
    { selector: ".hero h1", text: "Japan Escape パンフレットパック" },
    {
      selector: ".hero .hero-lead",
      text: "共有しやすく、印刷しやすい導線を一か所に集めたローカルのパンフレットページです。"
    }
  ]
};

const WEATHER_STOP_LOCALES = {
  ja: {
    osaka: { name: "大阪", timing: "食べ歩きとゆるい夜歩きは日が落ちてからが最適です。" },
    kyoto: { name: "京都", timing: "歩きやすく涼しい朝のほうが使いやすいです。" },
    hakone: { name: "箱根", timing: "空気が湿ってきたら、午後遅めは旅館と休息の時間に回すのが自然です。" },
    fuji: { name: "富士山エリア", timing: "昼食時間よりも、朝の澄んだ視界を優先してください。" },
    tokyo: { name: "東京", timing: "東京の見返りがもっともきれいなのは、夕方から夜にかけてです。" }
  }
};

const ROUTE_ATLAS_LOCALES = {
  ja: {
    osaka: {
      kicker: "到着ベース",
      title: "大阪が旅の始まりの空気を決める",
      description: "大阪から始めることで、到着の疲れを食事と街の勢いに変え、いきなり細かい移動で消耗しません。",
      previewLabel: "大阪をプレビュー",
      badges: ["食", "夜", "気楽"],
      facts: [
        { label: "役割", text: "大阪は旅の出だしを安定させ、後半の景色パートを急ぎ足にしないための土台です。" },
        { label: "空気感", text: "ネオンと食べ物、遅い時間の選択肢があるため、いちばん柔らかい着地になります。" },
        { label: "最適な動き", text: "初日は小さくまとめ、本当のペースは翌朝から始めるのが良いです。" }
      ]
    },
    kyoto: {
      kicker: "対比の日",
      title: "京都はホテルを変えずに旅の質感を変える",
      description: "京都は意図的なコントラストです。ホテル移動を増やさずに、1日だけ文化の濃さで空気を変えます。",
      previewLabel: "京都をプレビュー",
      badges: ["文化", "写真", "歩く"],
      facts: [
        { label: "役割", text: "京都は雰囲気を変えるための一日であり、大阪ベースを置き換える場所ではありません。" },
        { label: "空気感", text: "静かな寺社、細い路地、そして1エリア集中のほうが強い都市です。" },
        { label: "最適な動き", text: "街全体を追いかけず、1つのエリアに集中すると旅の質が上がります。" }
      ]
    },
    hakone: {
      kicker: "景色の継ぎ目",
      title: "箱根がいちばん重い移動日に呼吸を戻す",
      description: "箱根の一泊が、ルートを単なる長距離移動ではなく、景色でつながる旅に変えます。",
      previewLabel: "箱根をプレビュー",
      badges: ["休息", "温泉", "景色"],
      facts: [
        { label: "役割", text: "西から東への長い移動を、人間的なリズムに戻すための継ぎ目です。" },
        { label: "空気感", text: "街の勢いではなく、空気、湖、旅館の時間に価値がある地点です。" },
        { label: "最適な動き", text: "移動をきれいに終えてから景色を足し、詰め込みすぎないことです。" }
      ]
    },
    fuji: {
      kicker: "天気主導",
      title: "富士は唯一、本当に柔軟性が必要なパート",
      description: "富士ブロックは景色の中心である一方、視界に従う必要があります。順番を守るより、見える時間を守るほうが重要です。",
      previewLabel: "富士をプレビュー",
      badges: ["景色", "天気", "柔軟"],
      facts: [
        { label: "役割", text: "旅全体のいちばん大きい景色の見返りですが、固定順では弱くなります。" },
        { label: "空気感", text: "視界が開けば一気に価値が跳ね上がり、閉じれば別の動きが必要になります。" },
        { label: "最適な動き", text: "空を確認し、最もきれいな視界を最初に回収してください。" }
      ]
    },
    tokyo: {
      kicker: "締めの街",
      title: "東京は最後に集中させるほど大きく感じる",
      description: "東京は最後に1地区へ集中すると、買い物、夜景、食事がばらけず強い終わり方になります。",
      previewLabel: "東京をプレビュー",
      badges: ["夜", "買い物", "締め"],
      facts: [
        { label: "役割", text: "最後の一日をだらけさせず、強く閉じるための最終アンカーです。" },
        { label: "空気感", text: "渋谷の密度、夜景、最後の食事が終盤の勢いをまとめます。" },
        { label: "最適な動き", text: "街全体に広げず、1地区中心で組むと一番きれいに締まります。" }
      ]
    }
  }
};

const MAP_POINT_LOCALES = {
  ja: {
    "osaka-route": {
      title: "大阪ベース",
      tags: ["ルート", "食", "気楽"],
      description: "到着日にもっとも入りやすい、ルートの最初のベースです。",
      guideLabel: "大阪ガイドを開く",
      facts: [
        { label: "向いている使い方", text: "食事と楽な街歩きで、到着の疲れをやわらげたい時です。" },
        { label: "地図ロジック", text: "大阪は旅の疲れを勢いに変えるアンカーです。" }
      ]
    },
    "dotonbori-food": {
      title: "道頓堀フードレーン",
      tags: ["食", "夜", "大阪"],
      description: "看板、つまみ食い、気軽な移動が揃う、最初の食べ歩きに最適な場所です。",
      guideLabel: "大阪フードを開く",
      facts: [
        { label: "狙いどころ", text: "たこ焼き、視覚的な盛り上がり、最初の夜のゆるい散策です。" },
        { label: "時間帯", text: "川沿いと看板が効く夜がもっとも合います。" }
      ]
    },
    "kyoto-route": {
      title: "京都コントラスト",
      tags: ["ルート", "文化", "徒歩"],
      description: "文化の対比になる一日。街全体より1エリア集中のほうが強いです。",
      guideLabel: "京都ガイドを開く",
      facts: [
        { label: "向いている使い方", text: "地区を1つに絞り、移動を少なくすることです。" },
        { label: "時間帯", text: "混雑が早く強まるので、早い時間のほうが有利です。" }
      ]
    },
    "nishiki-food": {
      title: "錦市場",
      tags: ["食", "市場", "京都"],
      description: "食べ歩きと観察に向く、京都の軽いフード文脈づくりです。",
      guideLabel: "京都フードを開く",
      facts: [
        { label: "狙いどころ", text: "軽い試食、のぞき歩き、大きな散策の合間の補助です。" },
        { label: "注意点", text: "時間が遅くなるほど混みやすいです。" }
      ]
    },
    "hakone-route": {
      title: "箱根リセット",
      tags: ["ルート", "温泉", "休息"],
      description: "東への移動を人間的なリズムに戻してくれる景色の一泊です。",
      guideLabel: "箱根ガイドを開く",
      facts: [
        { label: "向いている使い方", text: "移動を先に整え、その後で観光圧を足さないことです。" },
        { label: "時間帯", text: "午後遅めに旅館モードへ切り替えるのが自然です。" }
      ]
    },
    "lake-ashi-view": {
      title: "芦ノ湖ビュー",
      tags: ["景色", "箱根", "湖"],
      description: "旅の中盤で一番わかりやすい景色のムードシグナルです。",
      guideLabel: "箱根ガイドを開く",
      facts: [
        { label: "狙いどころ", text: "湖の空気、神社の構図、鉄道移動後のやわらかい景色です。" },
        { label: "注意点", text: "霧が出ると見え方が平坦になりやすいです。" }
      ]
    },
    "odawara-transit": {
      title: "小田原ハンドオフ",
      tags: ["移動", "箱根", "荷物"],
      description: "長い鉄道移動から箱根へ切り替わる、最重要の乗り継ぎ地点です。",
      guideLabel: "移動メモを開く",
      facts: [
        { label: "向いている使い方", text: "観光前に切符と荷物をここで整理することです。" },
        { label: "地図ロジック", text: "新幹線のあとに旅を整え直す、いちばん自然な場所です。" }
      ]
    },
    "fuji-route": {
      title: "富士ブロック",
      tags: ["ルート", "景色", "天気"],
      description: "旅の景色の中心であり、本当に天気へ柔軟であるべき区間です。",
      guideLabel: "富士ガイドを開く",
      facts: [
        { label: "向いている使い方", text: "固定計画を守るより、最もきれいな視界に順番を合わせます。" },
        { label: "時間帯", text: "山の見え方は朝のほうが強いことが多いです。" }
      ]
    },
    "chureito-view": {
      title: "忠霊塔ビューポイント",
      tags: ["景色", "富士", "写真"],
      description: "視界が良い時にもっとも象徴的な富士の構図が撮れる場所です。",
      guideLabel: "富士ガイドを開く",
      facts: [
        { label: "狙いどころ", text: "空がきれいに開いた時の定番構図です。" },
        { label: "注意点", text: "ここが開いているのに他へ時間を使うと、ベスト窓を逃しやすいです。" }
      ]
    },
    "kawaguchiko-food": {
      title: "河口湖フードベース",
      tags: ["食", "富士", "実用"],
      description: "景色のミッションを壊さない、実用的な昼食とカフェの拠点です。",
      guideLabel: "富士フードを開く",
      facts: [
        { label: "向いている使い方", text: "食事を手早く済ませ、山の見え方を優先することです。" },
        { label: "食事ロジック", text: "長いレストラン時間ではなく、安定性のための地点です。" }
      ]
    },
    "tokyo-route": {
      title: "東京フィナーレ",
      tags: ["ルート", "夜", "買い物"],
      description: "最後の日を1地区に絞ると、東京はより大きく感じられます。",
      guideLabel: "東京ガイドを開く",
      facts: [
        { label: "向いている使い方", text: "夜景枠か夕食枠を先に決め、その周りを柔軟に組むことです。" },
        { label: "地図ロジック", text: "東京は広げすぎず、地区集中にすると強く締まります。" }
      ]
    },
    "shibuya-food": {
      title: "渋谷ディナーゾーン",
      tags: ["食", "東京", "デザート"],
      description: "最後の日のメイン地区を離れずに、夕食とデザートの保険が取れる場所です。",
      guideLabel: "東京フードを開く",
      facts: [
        { label: "狙いどころ", text: "夕食、デザート、そして遅い時間の予備プランです。" },
        { label: "時間帯", text: "夕方から夜にかけて、最終都市の勢いを保てます。" }
      ]
    },
    "shibuya-transit": {
      title: "渋谷駅",
      tags: ["移動", "東京", "駅"],
      description: "最後の日の合流、ロッカー、動線整理に向く基準点です。",
      guideLabel: "駅メモを開く",
      facts: [
        { label: "向いている使い方", text: "買い物と夜景の両方が絡む時に混乱を減らせます。" },
        { label: "地図ロジック", text: "出口と荷物で崩れないための、駅中心の戦略です。" }
      ]
    }
  }
};

function getActiveLocale() {
  return document.documentElement.dataset.locale === "ja" ? "ja" : "en";
}

function ui(key, replacements = {}, locale = getActiveLocale()) {
  const value = UI_COPY[locale]?.[key] ?? UI_COPY.en[key] ?? "";
  return Object.entries(replacements).reduce(
    (result, [name, replacement]) => result.replaceAll(`{${name}}`, String(replacement)),
    value
  );
}

function getLocalizedWeatherStop(stop, locale = getActiveLocale()) {
  return {
    ...stop,
    ...(WEATHER_STOP_LOCALES[locale]?.[stop.key] ?? {})
  };
}

function getLocalizedRouteAtlasItem(key, locale = getActiveLocale()) {
  const item = ROUTE_ATLAS_ITEMS[key];
  if (!item) {
    return null;
  }

  const localized = ROUTE_ATLAS_LOCALES[locale]?.[key];
  if (!localized) {
    return item;
  }

  return {
    ...item,
    ...localized,
    badges: localized.badges
      ? localized.badges.map((label, index) => ({
          label,
          tone: item.badges[index]?.tone ?? "easy"
        }))
      : item.badges,
    facts: localized.facts ?? item.facts
  };
}

function getLocalizedMapPoint(point, locale = getActiveLocale()) {
  return {
    ...point,
    ...(MAP_POINT_LOCALES[locale]?.[point.key] ?? {})
  };
}

function applyPageLocaleContent(locale, pageFile) {
  const entries = PAGE_JA_TRANSLATIONS[pageFile] ?? [];
  entries.forEach((entry) => {
    const elements = [...document.querySelectorAll(entry.selector)];
    elements.forEach((element) => {
      if (!element) {
        return;
      }

      if ("text" in entry) {
        if (!element.dataset.i18nOriginalText) {
          element.dataset.i18nOriginalText = element.textContent ?? "";
        }
        element.textContent = locale === "ja" ? entry.text : element.dataset.i18nOriginalText;
      }

      if ("placeholder" in entry) {
        if (!element.dataset.i18nOriginalPlaceholder) {
          element.dataset.i18nOriginalPlaceholder = element.getAttribute("placeholder") ?? "";
        }
        element.setAttribute(
          "placeholder",
          locale === "ja" ? entry.placeholder : element.dataset.i18nOriginalPlaceholder
        );
      }
    });
  });
}

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
    secondaryHref: "./japan_trip_brochure.html",
    primaryLabel: "Open JNTO destination hub",
    secondaryLabel: "Open brochure pack",
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
    applyPageLocaleContent(locale, pageFile);
    document.dispatchEvent(new CustomEvent("locale:changed", { detail: { locale, pageFile } }));
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

function initTopbarPreviews() {
  const topbars = [...document.querySelectorAll(".topbar")];
  if (!topbars.length) {
    return;
  }

  topbars.forEach((topbar) => {
    const nav = topbar.querySelector(".nav-links");
    if (!nav || topbar.querySelector(".nav-preview")) {
      return;
    }

    const preview = document.createElement("div");
    preview.className = "nav-preview";
    preview.innerHTML = `
      <div class="nav-preview-card">
        <img class="nav-preview-image" alt="">
        <div class="nav-preview-copy">
          <strong></strong>
          <span></span>
        </div>
      </div>
    `;

    const image = preview.querySelector(".nav-preview-image");
    const title = preview.querySelector(".nav-preview-copy strong");
    const text = preview.querySelector(".nav-preview-copy span");

    const showPreview = (href) => {
      const item = NAV_PREVIEW_CONTENT[href];
      if (!item || !image || !title || !text) {
        preview.classList.remove("is-visible");
        return;
      }

      const locale = getActiveLocale();
      image.src = item.image;
      image.alt = `${ui(item.titleKey, {}, locale)} preview image`;
      title.textContent = ui(item.titleKey, {}, locale);
      text.textContent = ui(item.textKey, {}, locale);
      preview.classList.add("is-visible");
    };

    nav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || !NAV_PREVIEW_CONTENT[href]) {
        return;
      }

      link.addEventListener("pointerenter", () => showPreview(href));
      link.addEventListener("focus", () => showPreview(href));
    });

    topbar.addEventListener("pointerleave", () => preview.classList.remove("is-visible"));
    topbar.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!topbar.contains(document.activeElement)) {
          preview.classList.remove("is-visible");
        }
      }, 0);
    });

    document.addEventListener("locale:changed", () => {
      const activeLink = nav.querySelector("a:hover, a:focus");
      if (activeLink) {
        showPreview(activeLink.getAttribute("href"));
      }
    });

    topbar.append(preview);
  });
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

  const syncers = [];

  navs.forEach((nav) => {
    const pairs = [...nav.querySelectorAll('a[href*="#"]')]
      .filter(isSameDocumentHashLink)
      .map((link) => {
        const hash = new URL(link.href, window.location.href).hash;
        const section = getHashTarget(hash);
        return section ? { link, hash, section } : null;
      })
      .filter(Boolean);

    if (!pairs.length) {
      return;
    }

    const setActive = (id) => {
      pairs.forEach(({ link, hash }) => {
        link.classList.toggle("is-active", hash === `#${id}`);
      });

      if (nav.dataset.activeSection !== id) {
        nav.dataset.activeSection = id;
        document.dispatchEvent(new CustomEvent("sectionnav:changed", { detail: { id } }));
      }
    };

    const updateActive = () => {
      const probe = window.scrollY + Math.max(188, window.innerHeight * 0.24);
      let activeId = pairs[0].section.id;

      pairs.forEach(({ section }) => {
        if (section.offsetTop <= probe) {
          activeId = section.id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
        activeId = pairs[pairs.length - 1].section.id;
      }

      setActive(activeId);
    };

    pairs.forEach(({ link, hash }) => {
      link.addEventListener("click", () => {
        if (hash) {
          setActive(hash.replace("#", ""));
          window.requestAnimationFrame(updateActive);
        }
      });
    });

    syncers.push(updateActive);
    setActive(getHashTarget()?.id || pairs[0].section.id);
  });

  if (!syncers.length) {
    return;
  }

  const syncAll = () => {
    syncers.forEach((sync) => sync());
  };

  window.addEventListener("scroll", syncAll, { passive: true });
  window.addEventListener("resize", syncAll);
  window.addEventListener("hashchange", syncAll);
  syncAll();
}

function getWeatherLabel(code, locale = getActiveLocale()) {
  if (locale === "ja") {
    const labels = {
      0: "快晴",
      1: "ほぼ晴れ",
      2: "一部くもり",
      3: "くもり",
      45: "霧",
      48: "着氷霧",
      51: "弱い霧雨",
      53: "霧雨",
      55: "強い霧雨",
      61: "弱い雨",
      63: "雨",
      65: "強い雨",
      71: "弱い雪",
      73: "雪",
      75: "強い雪",
      80: "にわか雨",
      81: "雨のにわか",
      82: "強いにわか雨",
      95: "雷雨"
    };
    return labels[code] ?? "変わりやすい天気";
  }

  return WEATHER_CODE_LABELS[code] ?? "Mixed conditions";
}

function formatShortDateLabel(value) {
  if (!value) {
    return getActiveLocale() === "ja" ? "不明な日" : "Unknown day";
  }

  return new Intl.DateTimeFormat(getActiveLocale() === "ja" ? "ja-JP" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

function formatHourLabel(hour, locale = getActiveLocale()) {
  if (locale === "ja") {
    return `${hour}時`;
  }

  const suffix = hour >= 12 ? "pm" : "am";
  const normalized = hour % 12 || 12;
  return `${normalized}${suffix}`;
}

function getPackingAdvice(temperature, rainChance, windSpeed, locale = getActiveLocale()) {
  if (rainChance >= 55) {
    return locale === "ja" ? "折りたたみ傘と軽いシェルを持ってください。" : "Bring an umbrella and a light shell.";
  }

  if (temperature <= 8) {
    return locale === "ja"
      ? "薄い上着だけでなく、しっかり暖かいレイヤーを使ってください。"
      : "Use a real warm layer, not just a thin overshirt.";
  }

  if (temperature <= 16 || windSpeed >= 22) {
    return locale === "ja" ? "軽いジャケットか羽織りを持ってください。" : "Bring a light jacket or overshirt.";
  }

  if (temperature >= 28) {
    return locale === "ja" ? "軽装にして、水をすぐ取れるようにしてください。" : "Dress light and keep water easy to reach.";
  }

  return locale === "ja" ? "軽い重ね着で十分です。" : "Light layers are enough.";
}

function getWeatherRouteAdvice(stop, forecast, locale = getActiveLocale()) {
  if (stop.key === "fuji") {
    return locale === "ja" ? "いちばん澄んだ視界の時間帯を優先してください。" : "Let the clearest visibility window win.";
  }

  if (forecast.rain >= 55) {
    return locale === "ja"
      ? "屋内アンカーか、範囲を絞った地区行動へ寄せてください。"
      : "Shift toward indoor anchors or tighter districts.";
  }

  if (stop.key === "hakone") {
    return locale === "ja" ? "午後に霧が出たら、旅館ペースを崩さないのが正解です。" : "Keep the ryokan pace intact if mist builds later.";
  }

  if (stop.key === "kyoto") {
    return locale === "ja" ? "歩きやすさを保つため、京都は早めに始めてください。" : "Start earlier so the walking lanes stay easier.";
  }

  if (stop.key === "tokyo") {
    return locale === "ja" ? "東京は夕方から夜にかけてのほうが見返りが強いです。" : "Tokyo still pays off later in the day.";
  }

  return locale === "ja" ? "強い雨にならない限り、この地点はゆるく動いて大丈夫です。" : "This stop can stay loose unless the rain spikes.";
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
        note:
          getActiveLocale() === "ja"
            ? fogRisk <= 34
              ? "霧リスクは低め"
              : fogRisk <= 58
                ? "霧リスクは中程度"
                : "霧リスクは高め"
            : fogRisk <= 34
              ? "Low fog risk"
              : fogRisk <= 58
                ? "Moderate fog risk"
                : "High fog risk"
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
  const weatherCode = current.weather_code ?? daily.weather_code?.[0] ?? 0;
  const forecast = {
    stop,
    weatherCode,
    currentTemp: Math.round(current.temperature_2m ?? 0),
    apparentTemp: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 0),
    condition: getWeatherLabel(weatherCode),
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
          <span class="weather-stop-label">${getLocalizedWeatherStop(stop).name}</span>
          <strong>${ui("weatherLoadingTitle")}</strong>
          <p>${ui("weatherLoadingText")}</p>
        </article>
      `
    )
    .join("");
}

function renderWeatherCard(forecast) {
  const stop = getLocalizedWeatherStop(forecast.stop);
  const packing = getPackingAdvice(forecast.apparentTemp, forecast.rain, forecast.wind);
  const routeAdvice = getWeatherRouteAdvice(forecast.stop, forecast);

  if (forecast.error) {
    return `
      <article class="weather-card">
        <span class="weather-stop-label">${stop.name}</span>
        <strong>${ui("weatherUnavailableTitle")}</strong>
        <p>${ui("weatherUnavailableText")} ${stop.timing}</p>
        <div class="weather-meta">
          <span><strong>${ui("weatherFallbackLabel")}</strong> ${forecast.stop.key === "fuji" ? ui("weatherFallbackFuji") : ui("weatherFallbackDefault")}</span>
        </div>
      </article>
    `;
  }

  return `
    <article class="weather-card">
      <span class="weather-stop-label">${stop.name}</span>
      <strong>${getWeatherLabel(forecast.weatherCode)}</strong>
      <div class="weather-temp-line">
        <span class="weather-temp">${forecast.currentTemp}&deg;</span>
        <span class="weather-condition">${ui("weatherFeelsLike")} ${forecast.apparentTemp}&deg;</span>
      </div>
      <div class="weather-chip-row">
        <span class="weather-chip">${ui("weatherHigh")} ${forecast.high}&deg;</span>
        <span class="weather-chip">${ui("weatherLow")} ${forecast.low}&deg;</span>
        <span class="weather-chip">${ui("weatherRain")} ${forecast.rain}%</span>
        ${forecast.stale ? `<span class="weather-chip">${ui("weatherSavedRead")}</span>` : ""}
      </div>
      <p>${packing}</p>
      <div class="weather-meta">
        <span><strong>${ui("weatherRightMove")}</strong> ${routeAdvice}</span>
        <span><strong>${ui("weatherTiming")}</strong> ${stop.timing}</span>
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
      <span class="eyebrow">${ui("weatherFujiEyebrow")}</span>
      <h3>${ui("weatherFujiUnavailableTitle")}</h3>
      <p>${ui("weatherFujiUnavailableText")}</p>
      <div class="fuji-forecast-list">
        <div class="fuji-day-card">
          <strong>${ui("weatherFujiFallbackTitle")}</strong>
          <span>${ui("weatherFujiFallbackText")}</span>
        </div>
      </div>
    `;
    return;
  }

  panel.innerHTML = `
    <span class="eyebrow">${ui("weatherFujiEyebrow")}</span>
    <h3>${formatShortDateLabel(planner.bestDay.date)} ${ui("weatherFujiBestDaySuffix")}</h3>
    <p>${ui("weatherFujiIntro")}</p>
    <div class="fuji-index-meter"><span style="width: ${planner.bestDay.clarity}%"></span></div>
    <div class="fuji-score-line">
      <span class="fuji-score-pill">${planner.bestDay.clarity}% ${ui("weatherFujiClarity")}</span>
      <span class="fuji-score-pill">${planner.bestDay.fogRisk}% ${ui("weatherFujiFogRisk")}</span>
      <span class="fuji-score-pill">${ui("weatherFujiBestWindow")} ${formatHourLabel(planner.bestDay.bestHour)}</span>
    </div>
    <div class="fuji-forecast-list">
      ${planner.days
        .map(
          (day) => `
            <div class="fuji-day-card">
              <strong>${formatShortDateLabel(day.date)}</strong>
              <span>${
                day.fogRisk <= 34
                  ? getActiveLocale() === "ja"
                    ? "霧リスクは低め"
                    : "Low fog risk"
                  : day.fogRisk <= 58
                    ? getActiveLocale() === "ja"
                      ? "霧リスクは中程度"
                      : "Moderate fog risk"
                    : getActiveLocale() === "ja"
                      ? "霧リスクは高め"
                      : "High fog risk"
              }. ${ui("weatherFujiAimAround")} ${formatHourLabel(day.bestHour)} ${ui("weatherFujiIfSky")}</span>
              <div class="fuji-score-line">
                <span class="fuji-score-pill">${day.clarity}% ${ui("weatherFujiClarity")}</span>
                <span class="fuji-score-pill">${day.fogRisk}% ${ui("weatherFujiFogRisk")}</span>
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
  let lastForecasts = [];

  const rerenderWeather = () => {
    if (!lastForecasts.length) {
      grid.innerHTML = renderWeatherLoadingState();
      renderFujiForecast(panel, null);
    } else {
      grid.innerHTML = lastForecasts.map(renderWeatherCard).join("");
      renderFujiForecast(panel, lastForecasts.find((forecast) => forecast.stop.key === "fuji"));
    }

    if (refreshButton) {
      refreshButton.textContent = ui("weatherRefresh");
    }
  };

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
      refreshButton.textContent = ui("weatherRefreshing");
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
    lastForecasts = forecasts;

    rerenderWeather();

    if (refreshButton) {
      refreshButton.disabled = false;
      refreshButton.textContent = ui("weatherRefresh");
    }
    document.dispatchEvent(new CustomEvent("weather:updated"));
    isLoading = false;
  };

  refreshButton?.addEventListener("click", loadWeather);
  document.addEventListener("locale:changed", rerenderWeather);
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
  const localizedPoint = getLocalizedMapPoint(point);
  return `
    <div class="map-popup">
      <strong>${localizedPoint.title}</strong>
      <span>${localizedPoint.description}</span>
      <a href="${localizedPoint.guideHref}"${localizedPoint.guideHref.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${localizedPoint.guideLabel}</a>
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
        const localizedPoint = getLocalizedMapPoint(point);
        const distanceLabel = userPosition
          ? ui("mapDistanceAway", { distance: distance.toFixed(distance < 10 ? 1 : 0) })
          : localizedPoint.tags.slice(0, 2).join(" · ");
        return `
          <div class="map-nearby-item">
            <strong>${localizedPoint.title}</strong>
            <span>${distanceLabel} - ${localizedPoint.description}</span>
          </div>
        `;
      })
      .join("");

    if (shortlist[0]) {
      nearest.textContent = getLocalizedMapPoint(shortlist[0].point).title;
    }
  };

  const updatePointDetails = (point, userPosition = null) => {
    const localizedPoint = getLocalizedMapPoint(point);
    const forecast = WEATHER_CACHE.get(point.weatherKey);
    const relatedStop = WEATHER_STOPS.find((stop) => stop.key === point.weatherKey) ?? forecast?.stop ?? WEATHER_STOPS[0];
    title.textContent = localizedPoint.title;
    description.textContent = localizedPoint.description;
    weather.textContent = forecast
      ? `${getWeatherLabel(forecast.weatherCode)}. ${getWeatherRouteAdvice(relatedStop, forecast)}`
      : ui("mapWeatherFallback");
    tags.innerHTML = localizedPoint.tags.map((tag) => `<span class="destination-pill">${tag}</span>`).join("");
    facts.innerHTML = localizedPoint.facts
      .map(
        (fact) => `
          <div class="route-fact">
            <strong>${fact.label}</strong>
            <span>${fact.text}</span>
          </div>
        `
      )
      .join("");
    primary.href = localizedPoint.guideHref;
    primary.textContent = localizedPoint.guideLabel;
    if (localizedPoint.guideHref.startsWith("http")) {
      primary.target = "_blank";
      primary.rel = "noreferrer";
    } else {
      primary.removeAttribute("target");
      primary.removeAttribute("rel");
    }
    directions.href = buildGoogleDirectionsUrl(point);

    if (userPosition) {
      const distance = calculateDistanceKm(userPosition.lat, userPosition.lon, point.lat, point.lon);
      gpsStatus.textContent = ui("mapTrackingSelected", { distance: distance.toFixed(distance < 10 ? 1 : 0) });
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

    gpsStatus.textContent = ui("mapGpsLiveAt", {
      lat: userLatLng.lat.toFixed(3),
      lon: userLatLng.lon.toFixed(3)
    });
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
        gpsStatus.textContent = ui("mapGpsUnsupported");
        return;
      }

      gpsStatus.textContent = ui("mapGpsRequesting");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition(L, position);
          mapInstance.flyTo([position.coords.latitude, position.coords.longitude], 7, { duration: 1.2 });

          if (watchId === null) {
            watchId = navigator.geolocation.watchPosition(
              (nextPosition) => setUserPosition(L, nextPosition),
              () => {
                gpsStatus.textContent = ui("mapGpsTrackingFailed");
              },
              { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 }
            );
          }
        },
        () => {
          gpsStatus.textContent = ui("mapGpsDenied");
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
      gpsStatus.textContent = lastUserPosition ? gpsStatus.textContent : ui("mapLocationNotShared");
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
          <strong>${ui("mapFailTitle")}</strong>
          <span>${ui("mapFailText")}</span>
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

  document.addEventListener("locale:changed", () => {
    if (!initialized) {
      if (loadingCard) {
        loadingCard.innerHTML = `
          <strong>${ui("mapLoadingTitle")}</strong>
          <span>${ui("mapLoadingText")}</span>
        `;
      }
      return;
    }

    if (window.L) {
      renderMarkers(window.L, lastUserPosition);
    }
    updateNearbyList(lastUserPosition);
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
  if (!item.image) {
    return `
      <button class="destination-card is-illustrated${isActive ? " is-active" : ""}" type="button" data-destination-key="${item.key}" aria-pressed="${isActive ? "true" : "false"}">
        <div class="destination-card-copy">
          <span class="badge badge-soft">${item.region}</span>
          <strong>${item.name}</strong>
          <span>${item.summary}</span>
          <div class="destination-card-meta">
            <span class="destination-pill">${item.prefecture}</span>
            ${item.tags.slice(0, 3).map((tag) => `<span class="destination-pill">${tag}</span>`).join("")}
          </div>
        </div>
      </button>
    `;
  }

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
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
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

function buildSiteFooterMarkup() {
  const navLabels = NAV_TRANSLATIONS[getActiveLocale()] ?? NAV_TRANSLATIONS.en;

  return `
    <div class="site-footer-grid">
      <section class="site-footer-column">
        <h3>${ui("footerHelpful")}</h3>
        <div class="site-footer-list">
          <a href="./itinerary.html">${navLabels["./itinerary.html"]}</a>
          <a href="./food.html">${navLabels["./food.html"]}</a>
          <a href="./toolkit.html">${navLabels["./toolkit.html"]}</a>
          <a href="./japan_trip_brochure.html">${ui("brochureCardTitle")}</a>
        </div>
      </section>
      <section class="site-footer-column">
        <h3>${ui("footerRelated")}</h3>
        <div class="site-footer-list">
          <a href="https://www.japan.travel/en/" target="_blank" rel="noreferrer">Japan Travel</a>
          <a href="https://smart-ex.jp/en/index.php" target="_blank" rel="noreferrer">SmartEX</a>
          <a href="https://www.odakyu.jp/english/passes/hakone/" target="_blank" rel="noreferrer">Hakone Freepass</a>
          <a href="./site_info.html#sitemap">Site map</a>
        </div>
      </section>
      <section class="site-footer-column">
        <h3>${ui("footerAbout")}</h3>
        <p>${ui("footerAboutText")}</p>
        <div class="site-footer-list">
          <a href="./site_info.html#who-we-are">${ui("footerWho")}</a>
          <a href="mailto:alex.narb28@gmail.com">${ui("footerContact")}</a>
        </div>
      </section>
    </div>
    <div class="site-footer-bottom">
      <div class="site-footer-policies">
        <a href="./site_info.html#privacy-policy">${ui("footerPrivacy")}</a>
        <a href="./site_info.html#cookie-policy">${ui("footerCookie")}</a>
        <a href="./site_info.html#terms-of-use">${ui("footerTerms")}</a>
        <a href="./site_info.html#sitemap">${ui("footerSitemap")}</a>
      </div>
      <div class="site-footer-meta">
        <small>${ui("footerCopyright")}</small>
      </div>
    </div>
  `;
}

function initSiteFooter() {
  const main = document.querySelector(".page-shell");
  if (!main) {
    return;
  }

  let footer = document.querySelector(".site-footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";
    main.insertAdjacentElement("afterend", footer);
  }

  const renderFooter = () => {
    footer.innerHTML = buildSiteFooterMarkup();
  };

  renderFooter();
  document.addEventListener("locale:changed", renderFooter);
}

function initEdgeNavigator() {
  const nav = document.querySelector("[data-section-nav]");
  if (!nav || document.querySelector(".edge-nav")) {
    return;
  }

  const pairs = [...nav.querySelectorAll('a[href*="#"]')]
    .filter(isSameDocumentHashLink)
    .map((link) => {
      const hash = new URL(link.href, window.location.href).hash;
      const section = getHashTarget(hash);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!pairs.length) {
    return;
  }

  const edgeNav = document.createElement("div");
  edgeNav.className = "edge-nav";
  edgeNav.innerHTML = `
    <button type="button" data-edge-nav="top" title="${ui("edgeTop")}" aria-label="${ui("edgeTop")}">↑</button>
    <button type="button" data-edge-nav="prev" title="${ui("edgePrevious")}" aria-label="${ui("edgePrevious")}">←</button>
    <button type="button" data-edge-nav="next" title="${ui("edgeNext")}" aria-label="${ui("edgeNext")}">→</button>
    <button type="button" data-edge-nav="bottom" title="${ui("edgeBottom")}" aria-label="${ui("edgeBottom")}">↓</button>
  `;
  document.body.append(edgeNav);

  const topButton = edgeNav.querySelector('[data-edge-nav="top"]');
  const prevButton = edgeNav.querySelector('[data-edge-nav="prev"]');
  const nextButton = edgeNav.querySelector('[data-edge-nav="next"]');
  const bottomButton = edgeNav.querySelector('[data-edge-nav="bottom"]');

  const getActiveIndex = () => {
    const activeIndex = pairs.findIndex(({ link }) => link.classList.contains("is-active"));
    return activeIndex >= 0 ? activeIndex : 0;
  };

  const scrollToSection = (index) => {
    pairs[index]?.section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const syncButtons = () => {
    const activeIndex = getActiveIndex();
    prevButton.disabled = activeIndex <= 0;
    nextButton.disabled = activeIndex >= pairs.length - 1;
    topButton.title = ui("edgeTop");
    topButton.setAttribute("aria-label", ui("edgeTop"));
    prevButton.title = ui("edgePrevious");
    prevButton.setAttribute("aria-label", ui("edgePrevious"));
    nextButton.title = ui("edgeNext");
    nextButton.setAttribute("aria-label", ui("edgeNext"));
    bottomButton.title = ui("edgeBottom");
    bottomButton.setAttribute("aria-label", ui("edgeBottom"));
  };

  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  bottomButton.addEventListener("click", () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }));
  prevButton.addEventListener("click", () => scrollToSection(Math.max(getActiveIndex() - 1, 0)));
  nextButton.addEventListener("click", () => scrollToSection(Math.min(getActiveIndex() + 1, pairs.length - 1)));

  document.addEventListener("sectionnav:changed", syncButtons);
  document.addEventListener("locale:changed", syncButtons);
  syncButtons();
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
      const item = getLocalizedRouteAtlasItem(key);
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
      module.dataset.activeRouteStop = key;
    };

    pins.forEach((pin) => {
      pin.addEventListener("click", () => renderStop(pin.dataset.routeStop));
    });

    const initialKey = pins.find((pin) => pin.classList.contains("is-active"))?.dataset.routeStop ?? pins[0].dataset.routeStop;
    renderStop(initialKey);
    window.requestAnimationFrame(() => board.classList.add("is-live"));
  });

  document.addEventListener("locale:changed", () => {
    modules.forEach((module) => {
      const activeKey = module.dataset.activeRouteStop || module.querySelector("[data-route-stop].is-active")?.dataset.routeStop;
      const board = module.querySelector("[data-route-board]");
      if (board && activeKey) {
        const pin = module.querySelector(`[data-route-stop="${activeKey}"]`);
        pin?.click();
      }
    });
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
              <span class="recommendation-rank"><small>Top</small><strong>#${index + 1}</strong></span>
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
  initTopbarPreviews();
  initSiteFooter();
  initReveal();
  initSectionNavs();
  initEdgeNavigator();
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
